import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Screen } from '../../../../components/ui/Screen';
import { Panel } from '../../../../components/ui/Panel';
import { Button } from '../../../../components/ui/Button';
import { ErrorState, LoadingState } from '../../../../components/ui/Feedback';
import { studentService } from '../../../../services/student.service';
import { useRemoteData } from '../../../../hooks/useRemoteData';
import { createClientId } from '../../../../utils/ids';
import { colors } from '../../../../theme/colors';
import { useAppDialog } from '../../../../components/ui/AppDialog';

export default function AttemptScreen() {
  const { showDialog } = useAppDialog();
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => studentService.assessment(id), [id]);
  const { data, loading, error } = useRemoteData(load, [id]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [clientId] = useState(createClientId);
  const [startedAt] = useState(() => new Date().toISOString());
  const [submitError, setSubmitError] = useState('');
  const [busy, setBusy] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const submitting = useRef(false);
  const expired = useRef(false);
  const submitRef = useRef<(automatic?: boolean) => Promise<void>>(async () => undefined);
  const questions = data?.questions ?? [];
  const isExercise = data?.kind === 'EXERCICE';
  const answered = questions.filter(q => isExercise ? Boolean(responses[q.id]?.trim()) : (answers[q.id] ?? []).length > 0).length;
  async function submit(automatic = false) {
    if (submitting.current) return;
    if (!automatic && answered < questions.length) { setSubmitError(`Réponds à toutes les questions (${answered}/${questions.length}).`); return; }
    submitting.current = true; setBusy(true); setSubmitError('');
    try {
      const result = await studentService.submitAttempt(id, { clientId, startedAt, answers: questions.map(q => ({ questionId: q.id, optionIds: isExercise ? [] : answers[q.id] ?? [], ...(isExercise ? { responseText: responses[q.id] ?? '' } : {}) })) });
      router.replace({ pathname: '/(student)/attempts/[id]', params: { id: result.id } });
    } catch (e) { submitting.current = false; setBusy(false); setSubmitError(e instanceof Error ? e.message : 'Envoi impossible.'); }
  }
  submitRef.current = submit;
  useEffect(() => {
    if (!data?.durationSeconds) return;
    setRemainingSeconds(data.durationSeconds);
    const timer = setInterval(() => setRemainingSeconds(value => value === null ? data.durationSeconds! : Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [data?.durationSeconds]);
  useEffect(() => { if (remainingSeconds === 0 && !expired.current) { expired.current = true; setSubmitError('Temps écoulé : envoi de tes réponses…'); void submitRef.current(true); } }, [remainingSeconds]);
  function choose(questionId: string, optionId: string, multiple: boolean) {
    setAnswers(old => { const selected = old[questionId] ?? []; const next = multiple ? selected.includes(optionId) ? selected.filter(x => x !== optionId) : [...selected, optionId] : [optionId]; return { ...old, [questionId]: next }; });
  }
  if (loading) return <Screen><LoadingState /></Screen>;
  if (error || !data) return <Screen><ErrorState message={error ?? 'Évaluation introuvable'} /></Screen>;
  return <Screen back title={data.title} subtitle={`${answered}/${questions.length} ${isExercise ? 'réponses rédigées' : 'questions répondues'}`}>
    {remainingSeconds !== null && <View style={styles.timer}><Text style={styles.timerLabel}>TEMPS RESTANT</Text><Text style={styles.timerValue}>{String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:{String(remainingSeconds % 60).padStart(2, '0')}</Text></View>}
    {!!data.instructions && <Panel style={styles.instructions}><Text style={styles.instructionLabel}>CONSIGNES</Text><Text style={styles.instructionText}>{data.instructions}</Text></Panel>}
    {questions.map((q, i) => <Panel key={q.id} style={styles.questionCard}><View style={styles.questionTop}><Text style={styles.number}>{isExercise ? 'EXERCICE' : `QUESTION ${String(i + 1).padStart(2, '0')}`}</Text><Text style={styles.kind}>{isExercise ? 'Réponse libre' : q.type === 'QCM_MULTIPLE' ? 'Plusieurs choix' : q.type === 'VRAI_FAUX' ? 'Vrai ou faux' : 'Un choix'}</Text></View><Text style={styles.statement}>{q.statement}</Text>{isExercise ? <TextInput value={responses[q.id] ?? ''} onChangeText={value => setResponses(current => ({ ...current, [q.id]: value }))} multiline textAlignVertical="top" placeholder="Écris ta réponse ici…" placeholderTextColor={colors.textSecondary} style={styles.responseInput} accessibilityLabel="Ta réponse" /> : q.options?.map(option => { const active = (answers[q.id] ?? []).includes(option.id); return <Pressable key={option.id} accessibilityRole="checkbox" accessibilityState={{ checked: active }} onPress={() => choose(q.id, option.id, q.type === 'QCM_MULTIPLE')} style={[styles.option, active && styles.optionSelected]}><View style={[styles.marker, active && styles.markerSelected]}>{active && <View style={styles.markerDot} />}</View><Text style={[styles.optionText, active && styles.optionTextSelected]}>{option.label}</Text></Pressable>; })}</Panel>)}
    {!!submitError && <Text style={styles.error}>{submitError}</Text>}
    <Button onPress={() => showDialog(isExercise ? 'Envoyer l’exercice ?' : 'Soumettre le quiz ?', isExercise ? 'Ta réponse sera enregistrée et corrigée.' : 'Tes réponses seront corrigées et enregistrées.', [{ text: 'Continuer', style: 'cancel' }, { text: 'Envoyer', onPress: submit }])} loading={busy}>{isExercise ? 'Envoyer ma réponse' : 'Voir ma correction'}</Button>
  </Screen>;
}
const styles = StyleSheet.create({ timer: { backgroundColor: colors.ink, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, timerLabel: { color: '#B7B7B7', fontSize: 9, fontWeight: '800', letterSpacing: .9 }, timerValue: { color: '#fff', fontSize: 18, fontWeight: '800', fontVariant: ['tabular-nums'] }, instructions: { marginBottom: 12, backgroundColor: colors.soft }, instructionLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, instructionText: { color: colors.ink, fontSize: 12, lineHeight: 18, marginTop: 7 }, questionCard: { marginBottom: 12 }, questionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, number: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: .8 }, kind: { color: colors.ink, fontSize: 9, fontWeight: '700' }, statement: { fontSize: 15, lineHeight: 22, color: colors.ink, fontWeight: '700', marginBottom: 8 }, responseInput: { minHeight: 130, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, padding: 13, color: colors.ink, fontSize: 13, lineHeight: 19, marginTop: 8 }, option: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, paddingHorizontal: 12, paddingVertical: 12, marginTop: 8 }, optionSelected: { backgroundColor: colors.ink, borderColor: colors.ink }, marker: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center' }, markerSelected: { borderColor: '#fff' }, markerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }, optionText: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 17 }, optionTextSelected: { color: '#fff' }, error: { color: colors.danger, fontSize: 12, marginBottom: 12 } });
