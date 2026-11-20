import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen } from '../../components/ui/Screen';
import { Panel } from '../../components/ui/Panel';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { colors, radius } from '../../theme/colors';

export default function AssessmentsScreen() {
  const [kindFilter, setKindFilter] = useState<'TOUS' | 'EXERCICE' | 'QUIZ'>('TOUS');
  const load = useCallback(async () => {
    const [assessments, attempts] = await Promise.all([studentService.assessments(), studentService.attempts()]);
    return { assessments, attempts };
  }, []);
  const { data, loading, error, reload } = useRemoteData(load, []);
  const hasFocused = useRef(false);
  useFocusEffect(useCallback(() => { if (hasFocused.current) void reload(); else hasFocused.current = true; }, [reload]));
  const completedIds = new Set(data?.attempts.map(attempt => attempt.assessmentId) ?? []);
  const available = data?.assessments.filter(item => !completedIds.has(item.id) && (kindFilter === 'TOUS' || item.kind === kindFilter)) ?? [];
  return (
    <Screen title="Challenge" subtitle="Choisis un exercice ou un quiz et relève le défi.">
      <View style={styles.hero}><View style={styles.heroTop}><Text style={styles.heroEyebrow}>À TOI DE JOUER</Text><Text style={styles.heroGlyph}>✳</Text></View><Text style={styles.heroTitle}>Chaque réponse{ '\n' }te fait progresser.</Text><Text style={styles.heroSub}>Prends le temps de montrer ce que tu as appris.</Text></View>
      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>À faire</Text><Text style={styles.small}>{loading ? '…' : String(available.length) + ' disponible(s)'}</Text></View>
      <View style={styles.filters}>{(['TOUS', 'EXERCICE', 'QUIZ'] as const).map(kind => <Pressable key={kind} onPress={() => setKindFilter(kind)} style={[styles.filter, kindFilter === kind && styles.filterActive]}><Text style={[styles.filterText, kindFilter === kind && styles.filterTextActive]}>{kind === 'TOUS' ? 'Tous' : kind === 'EXERCICE' ? 'Exercices' : 'Quiz'}</Text></Pressable>)}</View>
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : <>
        {available.length ? available.map((assessment, index) => <Pressable key={assessment.id} onPress={() => router.push({ pathname: '/(student)/assessment/[id]', params: { id: assessment.id } })} style={({ pressed }) => [styles.assessmentCard, pressed && styles.pressed]}>
          <View style={[styles.assessmentMark, index === 0 && styles.assessmentMarkActive]}><Text style={[styles.assessmentMarkText, index === 0 && styles.assessmentMarkTextActive]}>{assessment.kind === 'QUIZ' ? 'Q' : 'E'}</Text></View>
          <View style={styles.assessmentCopy}><Text numberOfLines={2} style={styles.assessmentTitle}>{assessment.title}</Text><Text style={styles.assessmentMeta}>{assessment.kind === 'EXERCICE' ? assessment.exerciseFormat === 'PDF' ? 'Exercice · énoncé PDF' : 'Exercice · réponse rédigée' : 'Quiz · choix de réponses'}{assessment.durationSeconds ? '  ·  ' + Math.round(assessment.durationSeconds / 60) + ' min' : ''}</Text></View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>) : <Panel><EmptyState title="Rien à faire pour le moment" body={kindFilter === 'TOUS' ? 'Les exercices et quiz publiés apparaîtront ici.' : `Aucun ${kindFilter === 'EXERCICE' ? 'exercice' : 'quiz'} disponible pour le moment.`} /></Panel>}

        <View style={[styles.sectionHead, { marginTop: 16 }]}><Text style={styles.sectionTitle}>Terminés</Text><Text style={styles.small}>Quiz et exercices envoyés</Text></View>
        {data?.attempts.length ? data.attempts.slice(0, 5).map(attempt => <Pressable key={attempt.id} onPress={() => router.push({ pathname: '/(student)/attempts/[id]', params: { id: attempt.id } })} style={styles.resultCard}>
          <View style={styles.resultIcon}><Text style={styles.resultCheck}>✓</Text></View><View style={styles.resultCopy}><Text numberOfLines={1} style={styles.assessmentTitle}>{attempt.assessment.title}</Text><Text style={styles.assessmentMeta}>{new Date(attempt.submittedAt).toLocaleDateString()}</Text></View><Text style={styles.score}>{attempt.score}<Text style={styles.maxScore}>/{attempt.maxScore}</Text></Text>
        </Pressable>) : <Panel><Text style={styles.emptyHistory}>Tes résultats apparaîtront ici après une évaluation.</Text></Panel>}
      </>}
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { backgroundColor: colors.ink, borderRadius: 24, padding: 20, minHeight: 183, justifyContent: 'space-between', overflow: 'hidden', marginBottom: 21 }, heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, heroEyebrow: { color: '#AFAFAF', fontSize: 9, fontWeight: '700', letterSpacing: 1.3 }, heroGlyph: { color: colors.accent, fontSize: 22 }, heroTitle: { color: '#fff', fontSize: 24, lineHeight: 27, letterSpacing: -0.6, fontWeight: '700' }, heroSub: { color: '#B8B8B8', fontSize: 11, lineHeight: 16 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 11 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '700', letterSpacing: -0.4 }, small: { color: colors.textSecondary, fontSize: 10 }, filters: { flexDirection: 'row', gap: 8, marginBottom: 12 }, filter: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, filterActive: { backgroundColor: colors.ink, borderColor: colors.ink }, filterText: { color: colors.textSecondary, fontSize: 11, fontWeight: '700' }, filterTextActive: { color: '#fff' },
  assessmentCard: { minHeight: 79, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 12, marginBottom: 9, flexDirection: 'row', alignItems: 'center', gap: 11 }, assessmentMark: { width: 43, height: 45, borderRadius: 14, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }, assessmentMarkActive: { backgroundColor: colors.ink }, assessmentMarkText: { fontSize: 15, fontWeight: '800', color: colors.textSecondary }, assessmentMarkTextActive: { color: '#fff' }, assessmentCopy: { flex: 1 }, assessmentTitle: { color: colors.ink, fontSize: 13, fontWeight: '700' }, assessmentMeta: { color: colors.textSecondary, fontSize: 10, marginTop: 5 }, chevron: { color: colors.textSecondary, fontSize: 23 },
  resultCard: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, minHeight: 67, paddingHorizontal: 13, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 11 }, resultIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: '#EAF1EB', alignItems: 'center', justifyContent: 'center' }, resultCheck: { fontSize: 15, color: colors.success, fontWeight: '800' }, resultCopy: { flex: 1 }, score: { fontSize: 16, color: colors.ink, fontWeight: '800' }, maxScore: { fontSize: 10, color: colors.textSecondary, fontWeight: '500' }, emptyHistory: { color: colors.textSecondary, fontSize: 12, textAlign: 'center', lineHeight: 18 }, pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
});
