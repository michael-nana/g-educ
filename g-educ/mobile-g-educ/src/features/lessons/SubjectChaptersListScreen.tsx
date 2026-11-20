import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { Screen } from '../../components/ui/Screen';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import type { Lesson } from '../../services/types';
import { colors } from '../../theme/colors';
import { useAuth } from '../../state/AuthProvider';

function isComplete(lesson: Lesson) {
  return Boolean(lesson.myProgress?.completedAt)
    || (lesson.type === 'VIDEO'
      ? (lesson.myProgress?.progressPercent ?? 0) >= 80
      : (lesson.myProgress?.progressPercent ?? 0) >= 100);
}

function openChapter(chapterId: string, subjectId: string, name: string) {
  router.push({
    pathname: '/(student)/chapter/[id]',
    params: { id: chapterId, subjectId, name },
  });
}

export default function SubjectChaptersListScreen() {
  const { user } = useAuth();
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const subjectName = name || 'Matière';
  const load = useCallback(async () => {
    const [chapters, lessons, progress] = await Promise.all([
      studentService.chapters(id),
      studentService.lessons({ classSubjectId: id }),
      studentService.progressLessons(),
    ]);
    return { chapters, lessons, progress };
  }, [id]);
  const { data, loading, error, reload } = useRemoteData(load, [id], user?.id ? `student-${user.id}-subject-${id}` : undefined);
  const chapters = data?.chapters ?? [];
  const lessons = data?.lessons ?? [];
  const unfinished = data?.progress.find((item) =>
    item.lesson.chapter.classSubjectId === id && !item.completedAt && item.progressPercent < (item.lesson.type === 'VIDEO' ? 80 : 100),
  );
  const resumeChapter = chapters.find((chapter) => chapter.id === unfinished?.lesson.chapter.id);

  return (
    <Screen back title={subjectName} subtitle="Chapitres et progression">
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : !chapters.length ? (
        <EmptyState title="Aucun chapitre disponible" body="Les chapitres publiés pour cette matière apparaîtront ici." />
      ) : <>
        {resumeChapter && <Pressable
          onPress={() => openChapter(resumeChapter.id, id, subjectName)}
          style={({ pressed }) => [styles.resume, pressed && styles.pressed]}
        >
          <View style={styles.resumeTop}>
            <Ionicons name="play-circle-outline" size={16} color="#C4C4C4" />
            <Text style={styles.resumeLabel}>REPRENDRE OÙ TU EN ÉTAIS</Text>
            <Ionicons name="arrow-forward" size={15} color="#fff" />
          </View>
          <Text style={styles.resumeTitle} numberOfLines={1}>{resumeChapter.title}</Text>
        </Pressable>}

        <Text style={styles.section}>Chapitres</Text>
        <View style={styles.list}>
          {chapters.map((chapter, index) => {
            const chapterLessons = lessons.filter((lesson) => lesson.chapterId === chapter.id);
            const completed = chapterLessons.filter(isComplete).length;
            const done = chapterLessons.length > 0 && completed === chapterLessons.length;
            const types = [...new Set(chapterLessons.map((lesson) => lesson.type))];
            return (
              <Pressable
                key={chapter.id}
                onPress={() => openChapter(chapter.id, id, subjectName)}
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                accessibilityRole="button"
              >
                <View style={[styles.index, done && styles.indexDone]}>
                  {done ? <Ionicons name="checkmark-done" size={18} color="#fff" /> : <Text style={styles.indexText}>{String(index + 1).padStart(2, '0')}</Text>}
                </View>
                <View style={styles.copy}>
                  <Text style={styles.title} numberOfLines={2}>{chapter.title}</Text>
                  <Text style={styles.meta}>{done ? 'Terminé · tu peux le revoir' : `${completed}/${chapterLessons.length} leçon${chapterLessons.length === 1 ? '' : 's'} terminée${chapterLessons.length === 1 ? '' : 's'}`}</Text>
                  <View style={styles.types}>
                    {types.map((type) => <View key={type} style={styles.typeBadge}>
                      <Ionicons name={type === 'PDF' ? 'document-outline' : type === 'VIDEO' ? 'videocam-outline' : 'document-text-outline'} size={12} color={colors.ink} />
                      <Text style={styles.typeText}>{type === 'PDF' ? 'PDF' : type === 'VIDEO' ? 'Vidéo' : 'Texte'}</Text>
                    </View>)}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              </Pressable>
            );
          })}
        </View>
      </>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  resume: { padding: 17, marginBottom: 22, borderRadius: 20, backgroundColor: colors.ink },
  resumeTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  resumeLabel: { flex: 1, color: '#C4C4C4', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  resumeTitle: { marginTop: 14, color: '#fff', fontSize: 16, fontWeight: '800' },
  section: { marginBottom: 10, color: colors.ink, fontSize: 16, fontWeight: '800' },
  list: { gap: 9 },
  card: { minHeight: 80, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  index: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.soft },
  indexDone: { backgroundColor: colors.ink },
  indexText: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  copy: { flex: 1 },
  title: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: '700' },
  meta: { marginTop: 4, color: colors.textSecondary, fontSize: 9 },
  types: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 7 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 7, backgroundColor: colors.soft },
  typeText: { color: colors.ink, fontSize: 8, fontWeight: '700' },
});
