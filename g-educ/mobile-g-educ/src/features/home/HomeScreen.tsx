import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { Panel } from '../../components/ui/Panel';
import { Screen } from '../../components/ui/Screen';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../state/AuthProvider';
import { colors } from '../../theme/colors';

/* ---------- Utilitaires ---------- */
function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Année scolaire en cours : à partir de septembre, 2026 → « 2026-2027 ». */
function schoolYear(now: Date) {
  const y = now.getFullYear();
  return now.getMonth() >= 8 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

function upcomingRange(now: Date) {
  const from = new Date(now);
  from.setUTCHours(0, 0, 0, 0);
  const to = new Date(from);
  to.setUTCDate(to.getUTCDate() + 90);
  return [from.toISOString().slice(0, 10), to.toISOString().slice(0, 10)] as const;
}

function getInitials(name?: string | null) {
  const letters = (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
  return letters || 'É';
}

const goCourses = () => router.push('/(student)/(tabs)/courses');
const goProgress = () => router.push('/(student)/progress');
const goPlanning = () => router.push('/(student)/(tabs)/planning');

function ProgressRing({ percent }: { percent: number }) {
  const size = 42;
  const count = 36;
  const dotSize = 3.5;
  const radius = 17;
  const value = Math.max(0, Math.min(percent, 100));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
      accessibilityLabel={`Progression ${value} pour cent`}
      style={s.progressRing}
    >
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const left = size / 2 + Math.cos(angle) * radius - dotSize / 2;
        const top = size / 2 + Math.sin(angle) * radius - dotSize / 2;
        const active = (index / count) * 100 < value;
        return <View key={index} style={{ position: 'absolute', left, top, width: dotSize, height: dotSize, borderRadius: dotSize / 2, backgroundColor: active ? colors.ink : colors.soft }} />;
      })}
      <Text style={s.progressRingLabel}>{Math.round(value)}%</Text>
    </View>
  );
}

/* ---------- Écran ---------- */
export default function HomeScreen() {
  const { user } = useAuth();

  const load = useCallback(async () => {
    const range = upcomingRange(new Date());
    const [progressOverview, progress, streak, classes, sessions, events] = await Promise.allSettled([
      studentService.progressOverview(),
      studentService.progressLessons(),
      studentService.streak(),
      authService.classes(),
      studentService.sessions(...range),
      studentService.events(...range),
    ]);

    return {
      progressOverview: progressOverview.status === 'fulfilled' ? progressOverview.value : null,
      progress: progress.status === 'fulfilled' ? progress.value : [],
      streak: streak.status === 'fulfilled' ? streak.value : null,
      classes: classes.status === 'fulfilled' ? classes.value : [],
      sessions: sessions.status === 'fulfilled' ? sessions.value : [],
      events: events.status === 'fulfilled' ? events.value : [],
    };
  }, []);

  const { data, loading, error, reload } = useRemoteData(load, []);

  // Recharge quand on revient sur l'écran (pas au tout premier affichage)
  const hasFocused = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (hasFocused.current) void reload();
      else hasFocused.current = true;
    }, [reload]),
  );

  const now = new Date();
  const dateLabel = capitalize(
    new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })
      .format(now)
      .replace('.', ''),
  );
  const firstName = user?.displayName?.split(' ')[0];
  const streak = data?.streak?.currentStreak ?? 0;
  const studentClass = data?.classes.find((item) => item.id === user?.classId);
  const nextSession = data?.sessions.find((item) => !item.completedAt);
  const nextDeadline = data?.events.find((item) => item.type === 'DEVOIR' || item.type === 'EXAMEN');
  const lastLesson = data?.progress[0];
  const percent = lastLesson ? Math.max(0, Math.min(lastLesson.progressPercent, 100)) : 0;

  return (
    <Screen>
      {/* ---------- En-tête ---------- */}
      <View style={s.header}>
        <Pressable
          onPress={() => router.push('/(student)/(tabs)/profile')}
          accessibilityRole="button"
          accessibilityLabel="Ouvrir mon profil"
          style={s.avatar}
        >
          <Text style={s.avatarText}>{getInitials(user?.displayName)}</Text>
        </Pressable>

        <View style={s.headerText}>
          <Text style={s.headerMeta}>{studentClass?.label ?? 'Classe'} - {schoolYear(now)}</Text>
          <Text style={s.headerName} numberOfLines={1}>
            Bonjour{firstName ? `, ${firstName}` : '.'}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push('/(student)/streak')}
          accessibilityRole="button"
          style={s.streak}
          accessibilityLabel={`Série en cours : ${streak} jour${streak > 1 ? 's' : ''}`}
        >
          <Ionicons name="flame" size={16} color={colors.accent} />
          <Text style={s.streakText}>{streak}</Text>
        </Pressable>
      </View>

      {/* ---------- Titre ---------- */}
      <Text style={s.title}>
        On reprend <Text style={s.titleItalic}>où tu t’es arrêté</Text>
      </Text>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <>
          {/* ---------- Carte « Reprendre » ---------- */}
          <Pressable
            onPress={() =>
              lastLesson
                ? router.push({
                    pathname: '/(student)/lesson/[id]',
                    params: { id: lastLesson.lesson.id },
                  })
                : goCourses()
            }
            accessibilityRole="button"
            style={s.hero}
          >
            <View pointerEvents="none" style={s.orbit}>
              <View style={s.orbitInner} />
            </View>

            <View style={s.heroTop}>
              <Ionicons name="book-outline" size={14} color="#B9B9B9" />
              <Text style={s.heroCaption} numberOfLines={1}>
                {lastLesson ? (lastLesson.lesson.chapter?.title ?? 'Leçon') : 'Ton espace d’apprentissage'}
              </Text>
            </View>

            <Text style={s.heroTitle} numberOfLines={3}>
              {lastLesson ? lastLesson.lesson.title : 'Choisis ta première leçon'}
            </Text>

            <View style={s.heroBottom}>
              <View style={s.heroProgress}>
                {lastLesson && (
                  <>
                    <View style={s.track}>
                      <View style={[s.fill, { width: `${Math.max(4, percent)}%` }]} />
                    </View>
                    <View style={s.heroLabels}>
                      <Text style={s.heroLabel}>{percent} % vu</Text>
                      <Text style={s.heroLabel}>{100 - percent} % restant</Text>
                    </View>
                  </>
                )}
              </View>

              <View style={s.play}>
                <Ionicons name="play" size={20} color={colors.ink} style={s.playIcon} />
              </View>
            </View>
          </Pressable>

          {/* ---------- Aujourd’hui ---------- */}
          <View style={s.sectionHead}>
            <Text style={s.sectionTitle}>Aujourd’hui</Text>
            <Text style={s.sectionAside}>{dateLabel}</Text>
          </View>

          <View style={s.todayRow}>
            <Pressable onPress={goPlanning} accessibilityRole="button" style={[s.todayCard, s.todayCardSoft]}>
              <View style={s.todayLabelRow}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={s.todayLabel}>Révisions</Text>
              </View>
              <Text style={s.todayTitle} numberOfLines={2}>
                {nextSession
                  ? `${nextSession.title} · ${new Date(nextSession.startsAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
                  : 'Aucune révision planifiée'}
              </Text>
            </Pressable>

            <Pressable onPress={goPlanning} accessibilityRole="button" style={[s.todayCard, s.todayCardLine]}>
              <View style={s.todayLabelRow}>
                <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                <Text style={s.todayLabel}>Échéances</Text>
              </View>
              <Text style={s.todayTitle} numberOfLines={2}>
                {nextDeadline
                  ? `${nextDeadline.type === 'EXAMEN' ? 'Examen' : 'Devoir'} · ${nextDeadline.title} · ${new Date(nextDeadline.startsAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`
                  : 'Aucune échéance à venir'}
              </Text>
            </Pressable>
          </View>

          {/* ---------- Mes matières ---------- */}
          <View style={s.sectionHead}>
            <Text style={s.sectionTitle}>Mes matières</Text>
            <Pressable onPress={goProgress} accessibilityRole="button">
              <Text style={s.seeAll}>Suivi détaillé  ↗</Text>
            </Pressable>
          </View>

          {data?.progressOverview?.subjects.length ? (
            <View style={s.subjects}>
              {data.progressOverview.subjects.slice(0, 4).map((item) => {
                return (
                  <Pressable key={item.classSubjectId} onPress={goCourses} accessibilityRole="button" style={s.subject}>
                    <ProgressRing percent={item.progressPercent} />
                    <View style={s.subjectInfo}>
                      <Text style={s.subjectName} numberOfLines={1}>
                        {item.subject.name}
                      </Text>
                      <Text style={s.subjectMeta}>
                        {item.totalLessons
                          ? `${item.completedLessons}/${item.totalLessons} leçons terminées`
                          : item.totalChapters
                            ? `${item.totalChapters} chapitre${item.totalChapters === 1 ? '' : 's'} · leçons à venir`
                            : 'Aucun chapitre publié'}
                      </Text>
                      <View style={s.subjectTrack}>
                        <View style={[s.subjectFill, { width: `${item.progressPercent}%` }]} />
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <Panel>
              <EmptyState
                title="Tes matières arrivent ici"
                body="Les matières de ta classe s’afficheront dès que ton programme sera configuré."
              />
            </Panel>
          )}
        </>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  /* En-tête */
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  headerText: { flex: 1 },
  headerMeta: { fontSize: 11, color: colors.textSecondary },
  headerName: { fontSize: 15, fontWeight: '700', color: colors.ink, marginTop: 1 },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#FFF0E9',
  },
  streakText: { fontSize: 13, fontWeight: '800', color: colors.accent },

  /* Titre */
  title: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -1.1,
    color: colors.ink,
    marginBottom: 20,
  },
  titleItalic: {
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.ink,
  },

  /* Carte noire */
  hero: {
    minHeight: 200,
    padding: 20,
    marginBottom: 28,
    overflow: 'hidden',
    borderRadius: 26,
    backgroundColor: colors.ink,
    justifyContent: 'space-between',
    gap: 16,
  },
  orbit: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: '#262626',
    right: -60,
    top: -50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#303030',
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  heroCaption: { flex: 1, color: '#B9B9B9', fontSize: 11 },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heroBottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 16 },
  heroProgress: { flex: 1, justifyContent: 'flex-end', minHeight: 40 },
  track: { height: 4, borderRadius: 2, backgroundColor: '#3A3A3A', overflow: 'hidden' },
  fill: { height: 4, borderRadius: 2, backgroundColor: '#fff' },
  heroLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  heroLabel: { color: '#B9B9B9', fontSize: 10 },
  play: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { marginLeft: 3 },

  /* Sections */
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  sectionAside: { fontSize: 11, color: colors.textSecondary },
  seeAll: { fontSize: 11, fontWeight: '700', color: colors.ink },

  /* Aujourd’hui */
  todayRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  todayCard: { flex: 1, minHeight: 104, padding: 14, borderRadius: 18, justifyContent: 'space-between' },
  todayCardSoft: { backgroundColor: '#F3F3EF' },
  todayCardLine: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  todayLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  todayLabel: { fontSize: 10, color: colors.textSecondary },
  todayTitle: { fontSize: 14, lineHeight: 19, fontWeight: '700', color: colors.ink },

  /* Matières */
  subjects: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  subject: {
    flexGrow: 1,
    flexBasis: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressRing: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  progressRingLabel: { fontSize: 10, fontWeight: '800', color: colors.ink },
  subjectInfo: { flex: 1 },
  subjectName: { fontSize: 13, fontWeight: '700', color: colors.ink },
  subjectMeta: { fontSize: 10, color: colors.textSecondary, marginTop: 3 },
  subjectTrack: { height: 3, borderRadius: 2, marginTop: 6, backgroundColor: colors.soft, overflow: 'hidden' },
  subjectFill: { height: '100%', borderRadius: 2, backgroundColor: colors.ink },
});
