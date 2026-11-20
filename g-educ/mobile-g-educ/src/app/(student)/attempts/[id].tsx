import { useLocalSearchParams, router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../../components/ui/Screen';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { ErrorState, LoadingState } from '../../../components/ui/Feedback';
import { studentService } from '../../../services/student.service';
import { useRemoteData } from '../../../hooks/useRemoteData';
import { colors } from '../../../theme/colors';

export default function AttemptReview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => studentService.attempt(id), [id]);
  const { data, loading, error, reload } = useRemoteData(load, [id]);
  const passed = data?.maxScore && data.assessment.passingPercent != null ? (data.score / data.maxScore) * 100 >= data.assessment.passingPercent : false;
  return <Screen title={data?.assessment.title ?? 'Correction'} subtitle="Relis tes réponses, puis termine pour enregistrer ton parcours.">
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : data ? <>
      <Panel style={styles.scorePanel}><Text style={styles.score}>{data.score} / {data.maxScore}</Text><Text style={styles.points}>points obtenus</Text><View style={[styles.badge, passed ? styles.pass : styles.review]}><Text style={[styles.badgeText, passed ? styles.passText : styles.reviewText]}>{data.assessment.kind === 'EXERCICE' ? 'EXERCICE TERMINÉ' : passed ? 'QUIZ RÉUSSI' : 'QUIZ TERMINÉ'}</Text></View></Panel>
      {data.answers.map((answer, index) => <Panel key={answer.id}>
        <Text style={styles.question}>{index + 1}. {answer.question.statement}</Text>
        <Text style={[styles.status, { color: answer.isCorrect ? colors.success : colors.danger }]}>{answer.isCorrect ? 'Bonne réponse' : 'À revoir'}{answer.pointsAwarded != null ? ` · ${answer.pointsAwarded} point(s)` : ''}</Text>
        {data.assessment.kind === 'EXERCICE' ? <><Text style={styles.responseLabel}>Ta réponse</Text><Text style={styles.option}>{answer.responseText || 'Aucune réponse saisie'}</Text><Text style={styles.responseLabel}>Réponse attendue</Text><Text style={[styles.option, { color: colors.success }]}>{answer.question.options.find(option => option.isCorrect)?.label ?? 'Consulte la correction avec ton enseignant.'}</Text></> : answer.question.options.map(option => { const selected = answer.options.some(item => item.option.id === option.id); return <Text key={option.id} style={[styles.option, { color: option.isCorrect ? colors.success : selected ? colors.danger : colors.textSecondary, fontWeight: option.isCorrect || selected ? '700' : '400' }]}>{selected ? '● ' : '○ '}{option.label}{option.isCorrect ? '  ✓' : ''}</Text>; })}
        {answer.question.explanation && <Text style={styles.explanation}>{answer.question.explanation}</Text>}
      </Panel>)}
      <Button onPress={() => router.dismissTo('/(student)/(tabs)/quiz')} style={{ marginTop: 8 }}>Terminer et revenir aux Challenges</Button>
    </> : <ErrorState message="Cette tentative est introuvable." />}
  </Screen>;
}
const styles = StyleSheet.create({ scorePanel: { alignItems: 'center', paddingVertical: 23, marginBottom: 12 }, score: { fontSize: 32, fontWeight: '800', color: colors.ink }, points: { color: colors.textSecondary, fontSize: 11, marginTop: 3 }, badge: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginTop: 13 }, pass: { backgroundColor: '#EAF1EB' }, review: { backgroundColor: colors.soft }, badgeText: { fontSize: 9, fontWeight: '800', letterSpacing: .8 }, passText: { color: colors.success }, reviewText: { color: colors.ink }, question: { fontSize: 14, fontWeight: '700', color: colors.ink }, status: { fontSize: 10, fontWeight: '700', marginTop: 7 }, responseLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: .7, marginTop: 12 }, option: { fontSize: 12, marginTop: 6 }, explanation: { fontSize: 12, lineHeight: 18, color: colors.ink, marginTop: 10, paddingTop: 9, borderTopWidth: 1, borderTopColor: colors.border } });
