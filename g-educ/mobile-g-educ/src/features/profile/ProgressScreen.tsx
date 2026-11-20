import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { Panel } from '../../components/ui/Panel';
import { Screen } from '../../components/ui/Screen';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { colors } from '../../theme/colors';

export default function ProgressScreen() {
  const load = useCallback(async () => {
    return studentService.progressOverview();
  }, []);
  const { data, loading, error, reload } = useRemoteData(load, []);

  const summary = useMemo(() => {
    return {
      lessonCount: data?.summary.totalLessons ?? 0,
      completed: data?.summary.completedLessons ?? 0,
      percent: data?.summary.progressPercent ?? 0,
      averageScore: data?.summary.quizAverageScore ?? null,
    };
  }, [data]);

  return <Screen back title="Ma progression" subtitle="Un aperçu de tes matières, chapitres et évaluations.">
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : !data?.subjects.length ? (
      <EmptyState title="Aucune matière disponible" body="Ta progression apparaîtra ici lorsque les matières de ta classe seront publiées." />
    ) : <>
      <Panel style={styles.summary}>
        <Text style={styles.eyebrow}>PROGRESSION DES COURS</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCopy}>
            <Text style={styles.summaryPercent}>{summary.percent}%</Text>
            <Text style={styles.summaryCaption}>{summary.completed} leçon{summary.completed === 1 ? '' : 's'} terminée{summary.completed === 1 ? '' : 's'} sur {summary.lessonCount}</Text>
          </View>
          <View style={styles.scoreCard}>
            <Ionicons name="checkmark-done-outline" size={17} color="#fff" />
            <Text style={styles.scoreValue}>{summary.averageScore === null ? '—' : `${summary.averageScore}%`}</Text>
            <Text style={styles.scoreCaption}>Moyenne des quiz</Text>
          </View>
        </View>
        <View style={styles.track}><View style={[styles.fill, { width: `${summary.percent}%` }]} /></View>
      </Panel>

      <Text style={styles.sectionTitle}>Par matière et par chapitre</Text>
      {data.subjects.map((subject) => {
        const chapters = subject.chapters;
        return <View key={subject.classSubjectId} style={styles.subjectBlock}>
          <View style={styles.subjectHead}>
            <View style={styles.subjectCopy}>
              <Text style={styles.subjectName}>{subject.subject.name}</Text>
              <Text style={styles.subjectMeta}>{subject.completedLessons}/{subject.totalLessons} leçons · {subject.progressPercent}%</Text>
            </View>
            {subject.averageScore !== null && <Text style={styles.subjectScore}>Évals. {subject.averageScore}%</Text>}
          </View>
          <View style={styles.track}><View style={[styles.fill, { width: `${subject.progressPercent}%` }]} /></View>
          {chapters.length ? chapters.map((chapter, index) => (
            <Pressable key={chapter.id} onPress={() => router.push({ pathname: '/(student)/chapter/[id]', params: { id: chapter.id, subjectId: subject.classSubjectId, name: subject.subject.name } })} style={({ pressed }) => [styles.chapterRow, pressed && styles.pressed]} accessibilityRole="button">
              <View style={[styles.chapterIndex, chapter.totalLessons > 0 && chapter.completedLessons === chapter.totalLessons && styles.chapterIndexDone]}>
                <Text style={[styles.chapterIndexText, chapter.totalLessons > 0 && chapter.completedLessons === chapter.totalLessons && styles.chapterIndexTextDone]}>{String(index + 1).padStart(2, '0')}</Text>
              </View>
              <View style={styles.chapterCopy}>
                <Text numberOfLines={1} style={styles.chapterName}>{chapter.title}</Text>
                <Text style={styles.chapterMeta}>{chapter.completedLessons}/{chapter.totalLessons} leçons · {chapter.progressPercent}%{chapter.averageScore === null ? '' : ` · ${chapter.averageScore}% aux évaluations`}</Text>
                <View style={styles.trackSmall}><View style={[styles.fill, { width: `${chapter.progressPercent}%` }]} /></View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </Pressable>
          )) : <Text style={styles.emptyChapter}>Aucun chapitre publié.</Text>}
        </View>;
      })}
    </>}
  </Screen>;
}

const styles = StyleSheet.create({
  summary: { backgroundColor: colors.ink, borderColor: colors.ink, marginBottom: 24 },
  eyebrow: { color: '#B8B8B8', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 13, marginBottom: 15 },
  summaryCopy: { flex: 1 },
  summaryPercent: { color: '#fff', fontSize: 38, lineHeight: 43, fontWeight: '800' },
  summaryCaption: { color: '#D0D0D0', fontSize: 10, marginTop: 4 },
  scoreCard: { minWidth: 104, padding: 11, borderRadius: 14, backgroundColor: '#353535', alignItems: 'flex-start', gap: 3 },
  scoreValue: { color: '#fff', fontSize: 19, fontWeight: '800' },
  scoreCaption: { color: '#D0D0D0', fontSize: 9 },
  track: { height: 6, borderRadius: 4, backgroundColor: '#E9E9E5', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4, backgroundColor: colors.ink },
  sectionTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', marginBottom: 12 },
  subjectBlock: { marginBottom: 18, padding: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  subjectHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  subjectCopy: { flex: 1 },
  subjectName: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  subjectMeta: { color: colors.textSecondary, fontSize: 10, marginTop: 3 },
  subjectScore: { color: colors.ink, fontSize: 10, fontWeight: '700' },
  chapterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  pressed: { opacity: 0.7 },
  chapterIndex: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.soft },
  chapterIndexDone: { backgroundColor: colors.ink },
  chapterIndexText: { color: colors.ink, fontSize: 10, fontWeight: '800' },
  chapterIndexTextDone: { color: '#fff' },
  chapterCopy: { flex: 1 },
  chapterName: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  chapterMeta: { color: colors.textSecondary, fontSize: 9, marginTop: 4 },
  trackSmall: { height: 4, borderRadius: 3, backgroundColor: colors.soft, overflow: 'hidden', marginTop: 7 },
  emptyChapter: { color: colors.textSecondary, fontSize: 10, paddingVertical: 12 },
});
