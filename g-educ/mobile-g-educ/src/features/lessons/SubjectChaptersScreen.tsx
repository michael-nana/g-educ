import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import type { Lesson } from '../../services/types';
import { colors } from '../../theme/colors';
import { useAppDialog } from '../../components/ui/AppDialog';
import { useAuth } from '../../state/AuthProvider';

/* ---------- Utilitaires ---------- */
function isLessonComplete(lesson: Lesson) {
  return Boolean(lesson.myProgress?.completedAt)
    || (lesson.type === 'VIDEO'
      ? (lesson.myProgress?.progressPercent ?? 0) >= 80
      : (lesson.myProgress?.progressPercent ?? 0) >= 100);
}

function lessonPercent(lesson: Lesson) {
  return Math.max(0, Math.min(lesson.myProgress?.progressPercent ?? 0, 100));
}

function nodeIcon(type?: string): keyof typeof Ionicons.glyphMap {
  if (type === 'PDF') return 'document-outline';
  if (type === 'VIDEO') return 'videocam-outline';
  return 'document-text-outline';
}

function typeLabel(type?: string) {
  if (type === 'PDF') return 'PDF';
  if (type === 'VIDEO') return 'Vidéo';
  return 'Texte';
}

function openLesson(lesson: Lesson) {
  router.push({ pathname: '/(student)/lesson/[id]', params: { id: lesson.id } });
}

/* ---------- Écran ---------- */
export default function ChapterScreen() {
  const { showDialog } = useAppDialog();
  const { user } = useAuth();
  // id = chapitre, subjectId = matière de la classe (classSubjectId), name = nom de la matière
  const { id, subjectId, name } = useLocalSearchParams<{
    id: string;
    subjectId: string;
    name?: string;
  }>();

  const load = useCallback(async () => {
    const [chapters, lessons] = await Promise.all([
      studentService.chapters(subjectId),
      studentService.lessons({ classSubjectId: subjectId }),
    ]);
    return { chapters, lessons };
  }, [subjectId]);

  const { data, loading, error, reload } = useRemoteData(load, [subjectId], user?.id ? `student-${user.id}-chapter-${id}` : undefined);

  const chapterIndex = data?.chapters.findIndex((c) => c.id === id) ?? -1;
  const chapter = chapterIndex >= 0 ? data?.chapters[chapterIndex] : undefined;
  const lessons = (data?.lessons ?? []).filter((l) => l.chapterId === id);

  const total = lessons.length;
  const done = lessons.filter(isLessonComplete).length;
  const currentId = lessons.find((l) => !isLessonComplete(l))?.id;

  return (
    <SafeAreaView style={s.safe}>
      {/* ---------- Barre du haut ---------- */}
      <View style={s.top}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour"
          style={s.round}
        >
          <Ionicons name="arrow-back" size={18} color={colors.ink} />
        </Pressable>

        <Text style={s.topTitle} numberOfLines={1}>
          {name || 'Matière'}
        </Text>

        <Pressable
          onPress={() => showDialog('Bientôt disponible', 'Le téléchargement des chapitres arrivera prochainement.')}
          accessibilityRole="button"
          accessibilityLabel="Télécharger le chapitre"
          style={s.round}
        >
          <Ionicons name="download-outline" size={18} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : !chapter ? (
          <EmptyState title="Chapitre introuvable" body="Ce chapitre n’est plus disponible." />
        ) : (
          <>
            {/* ---------- Titre + progression ---------- */}
            <Text style={s.kicker}>Chapitre {chapterIndex + 1}</Text>
            <Text style={s.title}>{chapter.title}</Text>

            <View style={s.progressRow}>
              <View
                style={s.track}
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: total, now: done }}
              >
                <View style={[s.fill, { width: total ? `${(done / total) * 100}%` : '0%' }]} />
              </View>
              <Text style={s.progressText}>
                {done} sur {total}
              </Text>
            </View>

            {/* ---------- Leçons (frise verticale) ---------- */}
            {lessons.length ? (
              <View style={s.timeline}>
                {lessons.map((lesson, index) => {
                  const complete = isLessonComplete(lesson);
                  const current = lesson.id === currentId;
                  const percent = lessonPercent(lesson);
                  const last = index === lessons.length - 1;

                  const meta = complete
                    ? 'Terminée · tu peux la revoir'
                    : percent > 0
                      ? `${percent} % vu`
                      : 'À découvrir';

                  return (
                    <View key={lesson.id} style={s.item}>
                      {/* Rond + trait */}
                      <View style={s.rail}>
                        <View style={[s.node, complete && s.nodeDone, current && s.nodeCurrent]}>
                          <Ionicons
                            name={complete ? 'checkmark' : nodeIcon(lesson.type)}
                            size={complete ? 18 : 17}
                            color={complete ? '#fff' : colors.ink}
                          />
                        </View>
                        {!last && <View style={s.line} />}
                      </View>

                      {/* Contenu */}
                      <View style={s.itemBody}>
                        {current ? (
                          <Pressable
                            onPress={() => openLesson(lesson)}
                            accessibilityRole="button"
                            accessibilityLabel={`Reprendre : ${lesson.title}`}
                            style={({ pressed }) => [s.currentCard, pressed && s.pressed]}
                          >
                            <View style={s.currentCopy}>
                              <Text style={s.currentLabel}>Leçon · {typeLabel(lesson.type)}</Text>
                              <Text style={s.currentTitle} numberOfLines={3}>
                                {lesson.title}
                              </Text>
                              <Text style={s.currentMeta}>{meta}</Text>
                            </View>
                            <View style={s.play}>
                              <Ionicons name="play" size={16} color={colors.ink} style={s.playIcon} />
                            </View>
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => openLesson(lesson)}
                            accessibilityRole="button"
                            style={({ pressed }) => [s.plain, pressed && s.pressed]}
                          >
                            <View style={s.plainCopy}>
                              <Text style={s.label}>Leçon · {typeLabel(lesson.type)}</Text>
                              <Text style={s.lessonTitle} numberOfLines={2}>
                                {lesson.title}
                              </Text>
                              <Text style={s.meta}>{meta}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
                          </Pressable>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <EmptyState
                title="Aucune leçon publiée"
                body="Les leçons de ce chapitre apparaîtront ici dès leur publication."
              />
            )}
          </>
        )}
      </ScrollView>

      {/* ---------- Téléchargement ---------- */}
      {!loading && !error && !!chapter && (
        <View style={s.footer}>
          <Pressable
            onPress={() => showDialog('Bientôt disponible', 'Le téléchargement des chapitres arrivera prochainement.')}
            accessibilityRole="button"
            style={({ pressed }) => [s.download, pressed && s.pressed]}
          >
            <Text style={s.downloadText}>Télécharger le chapitre</Text>
            <View style={s.downloadPill}>
              <Text style={s.downloadPillText}>Bientôt</Text>
            </View>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const NODE = 40;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  pressed: { opacity: 0.75 },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { flex: 1, textAlign: 'center', fontSize: 12, color: colors.textSecondary },

  content: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 24 },
  kicker: {
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 20,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '700',
    letterSpacing: -1.2,
    color: colors.ink,
  },

  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 20, marginBottom: 30 },
  track: { flex: 1, height: 5, borderRadius: 3, backgroundColor: colors.soft, overflow: 'hidden' },
  fill: { height: 5, borderRadius: 3, backgroundColor: colors.ink },
  progressText: { fontSize: 13, fontWeight: '700', color: colors.ink },

  /* Frise */
  timeline: {},
  item: { flexDirection: 'row', gap: 14 },
  rail: { width: NODE, alignItems: 'center' },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3EF',
  },
  nodeDone: { backgroundColor: colors.ink },
  nodeCurrent: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.ink },
  line: { flex: 1, width: 2, marginVertical: 4, backgroundColor: '#E6E6E2' },
  itemBody: { flex: 1, paddingBottom: 18 },

  plain: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: NODE, paddingTop: 1 },
  plainCopy: { flex: 1 },
  label: { fontSize: 10, color: colors.textSecondary },
  lessonTitle: { fontSize: 15, fontWeight: '700', color: colors.ink, marginTop: 3 },
  meta: { fontSize: 11, color: colors.textSecondary, marginTop: 3 },

  currentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.ink,
  },
  currentCopy: { flex: 1 },
  currentLabel: { fontSize: 10, color: '#B9B9B9' },
  currentTitle: { fontSize: 17, lineHeight: 22, fontWeight: '700', color: '#fff', marginTop: 4 },
  currentMeta: { fontSize: 11, color: '#B9B9B9', marginTop: 6 },
  play: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { marginLeft: 2 },

  /* Pied */
  footer: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  download: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  downloadText: { fontSize: 13, fontWeight: '600', color: colors.ink },
  downloadPill: {
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: colors.ink,
  },
  downloadPillText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
