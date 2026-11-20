import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { colors } from '../../theme/colors';

/* ---------- Dates (en UTC, comme l'ancienne version) ---------- */
const DAY = 86_400_000;
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

function getPeriod(now: Date) {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const today = now.getUTCDate();

  const todayMs = Date.UTC(year, month, today);
  const monthStartMs = Date.UTC(year, month, 1);
  const weekdayIndex = (new Date(todayMs).getUTCDay() + 6) % 7; // 0 = lundi
  const weekStartMs = todayMs - weekdayIndex * DAY;

  return {
    // on remonte jusqu'au lundi pour que la semaine en cours soit toujours complète
    from: iso(Math.min(monthStartMs, weekStartMs)),
    to: iso(todayMs),
    year,
    month,
    today,
    todayMs,
    weekStartMs,
    daysInMonth: new Date(Date.UTC(year, month + 1, 0)).getUTCDate(),
    firstWeekday: (new Date(monthStartMs).getUTCDay() + 6) % 7,
  };
}

const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const plural = (n: number, one: string, many: string) => (n > 1 ? many : one);

/* ---------- Écran ---------- */
export default function StreakScreen() {
  const { celebrate, from, to } = useLocalSearchParams<{ celebrate?: string; from?: string; to?: string }>();
  const celebration = celebrate === '1';
  const fromValue = Math.max(0, Number(from) || 0);
  const toValue = Math.max(0, Number(to) || 0);
  const animatedCount = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(1)).current;
  const [celebrationCount, setCelebrationCount] = useState(0);

  useEffect(() => {
    if (!celebration) return;
    animatedCount.setValue(fromValue);
    setCelebrationCount(fromValue);
    const listener = animatedCount.addListener(({ value }) => setCelebrationCount(Math.round(value)));
    const animation = Animated.parallel([
      Animated.timing(animatedCount, { toValue: toValue, duration: 900, useNativeDriver: false }),
      Animated.loop(Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.22, duration: 220, useNativeDriver: true }),
        Animated.spring(flameScale, { toValue: 1, useNativeDriver: true, friction: 4 }),
      ]), { iterations: 3 }),
    ]);
    animation.start();
    return () => {
      animatedCount.removeListener(listener);
      animation.stop();
      flameScale.setValue(1);
    };
  }, [celebration, fromValue, toValue, animatedCount, flameScale]);

  const load = useCallback(async () => {
    const period = getPeriod(new Date());
    const [streak, activity] = await Promise.all([
      studentService.streak(),
      studentService.activity(period.from, period.to),
    ]);
    return { ...period, streak, activity };
  }, []);

  const { data, loading, error, reload } = useRemoteData(load, []);

  const activeDays = new Set(data?.activity.activeDays ?? []);
  const current = data?.streak.currentStreak ?? 0;
  const displayedCurrent = celebration ? celebrationCount : current;
  const longest = data?.streak.longestStreak ?? 0;

  /* Semaine en cours */
  const week = data
    ? Array.from({ length: 7 }, (_, i) => {
        const ms = data.weekStartMs + i * DAY;
        return {
          label: WEEKDAYS[i],
          active: activeDays.has(iso(ms)),
          today: ms === data.todayMs,
          future: ms > data.todayMs,
        };
      })
    : [];
  const todayDone = week.some((d) => d.today && d.active);

  /* Mois en cours */
  const monthKey = data ? `${data.year}-${String(data.month + 1).padStart(2, '0')}` : '';
  const monthDays = data
    ? Array.from({ length: data.daysInMonth }, (_, i) => {
        const day = i + 1;
        return {
          day,
          active: activeDays.has(`${monthKey}-${String(day).padStart(2, '0')}`),
          future: day > data.today,
          today: day === data.today,
        };
      })
    : [];
  const monthActive = monthDays.filter((d) => d.active).length;
  const monthName = data
    ? capitalize(
        new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' }).format(
          new Date(Date.UTC(data.year, data.month, 15)),
        ),
      )
    : '';

  /* Lignes de 7 jours alignées sur les jours de la semaine */
  const cells: ({ day: number; active: boolean; future: boolean; today: boolean } | null)[] = data
    ? [...Array.from({ length: data.firstWeekday }, () => null), ...monthDays]
    : [];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7));

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="light" />

      {/* ---------- Barre du haut ---------- */}
      <View style={s.top}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour"
          style={s.round}
        >
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <Text style={s.topTitle}>Ma flamme</Text>
        <View style={s.round} />
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator color="#fff" />
        </View>
      ) : error || !data ? (
        <View style={s.center}>
          <Text style={s.errorText}>{error ?? 'Aucune activité à afficher.'}</Text>
          <Pressable onPress={reload} accessibilityRole="button" style={s.retry}>
            <Text style={s.retryText}>Réessayer</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* ---------- Flamme + grand chiffre ---------- */}
          <View style={s.hero}>
            <View pointerEvents="none" style={s.glow}>
              <View style={[s.glowCircle, s.glow1]} />
              <View style={[s.glowCircle, s.glow2]} />
              <View style={[s.glowCircle, s.glow3]} />
            </View>

            <Animated.View style={{ transform: [{ scale: flameScale }] }}>
              <Ionicons name="flame" size={72} color={colors.accent} />
            </Animated.View>
            <Text
              style={s.number}
              accessibilityLabel={`${displayedCurrent} ${plural(displayedCurrent, 'jour', 'jours')} d’affilée`}
            >
              {displayedCurrent}
            </Text>
            {celebration && <Text style={s.celebrationLabel}>Série augmentée !</Text>}
            <Text style={s.numberLabel}>{plural(displayedCurrent, 'jour', 'jours')} d’affilée</Text>
            <Text style={s.record}>
              Ton record : {longest} {plural(longest, 'jour', 'jours')}
            </Text>
          </View>

          {/* ---------- Semaine en cours ---------- */}
          <View style={s.card}>
            <View style={s.weekRow}>
              {week.map((d, i) => (
                <View key={i} style={s.weekCol}>
                  <Text style={s.weekLabel}>{d.label}</Text>
                  <View
                    style={[
                      s.dayCircle,
                      d.active && s.dayCircleOn,
                      !d.active && (d.today || d.future) && s.dayCircleDashed,
                      !d.active && !d.today && !d.future && s.dayCircleMissed,
                    ]}
                  >
                    {d.active && <Ionicons name="flame" size={17} color="#fff" />}
                  </View>
                </View>
              ))}
            </View>

            <Text style={s.hint}>
              {todayDone ? (
                'Bien joué : ta flamme est allumée aujourd’hui.'
              ) : (
                <>
                  Une leçon, un exercice ou un quiz aujourd’hui pour passer à{' '}
                  <Text style={s.hintStrong}>{current + 1}</Text>.
                </>
              )}
            </Text>
          </View>

          {/* ---------- Mois ---------- */}
          <View style={s.monthHead}>
            <Text style={s.monthTitle}>{monthName}</Text>
            <Text style={s.monthCount}>
              {monthActive} {plural(monthActive, 'jour actif', 'jours actifs')}
            </Text>
          </View>

          <View style={s.grid}>
            {rows.map((row, r) => (
              <View key={r} style={s.gridRow}>
                {row.map((cell, c) => (
                  <View
                    key={c}
                    style={[
                      s.square,
                      cell && (cell.active ? s.squareOn : cell.future ? s.squareFuture : s.squareOff),
                      !cell && s.squareBlank,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>

          <View style={s.legend}>
            <View style={[s.legendDot, { backgroundColor: colors.accent }]} />
            <Text style={s.legendText}>Jour actif</Text>
            <View style={[s.legendDot, { backgroundColor: '#2A2A2A' }]} />
            <Text style={s.legendText}>Jour sans activité</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const GLOW = 300;

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  errorText: { color: '#C4C4C4', fontSize: 13, textAlign: 'center' },
  retry: { paddingVertical: 11, paddingHorizontal: 22, borderRadius: 999, backgroundColor: '#fff' },
  retryText: { color: colors.ink, fontSize: 13, fontWeight: '700' },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E2E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { fontSize: 12, color: '#A5A5A5' },

  content: { paddingHorizontal: 20, paddingBottom: 32 },

  /* Flamme */
  hero: { alignItems: 'center', paddingTop: 34, paddingBottom: 26 },
  glow: { position: 'absolute', top: -20, width: GLOW, height: GLOW },
  glowCircle: { position: 'absolute', backgroundColor: colors.accent },
  glow1: { width: 300, height: 300, borderRadius: 150, left: 0, top: 0, opacity: 0.05 },
  glow2: { width: 210, height: 210, borderRadius: 105, left: 45, top: 45, opacity: 0.08 },
  glow3: { width: 120, height: 120, borderRadius: 60, left: 90, top: 90, opacity: 0.14 },
  number: {
    marginTop: 6,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: 120,
    lineHeight: 132,
    letterSpacing: -4,
    color: '#fff',
  },
  numberLabel: { marginTop: 4, fontSize: 15, fontWeight: '600', color: '#fff' },
  celebrationLabel: { marginTop: -3, marginBottom: 4, fontSize: 12, fontWeight: '800', color: colors.accent },
  record: { marginTop: 6, fontSize: 12, color: '#8E8E8E' },

  /* Semaine */
  card: { padding: 16, borderRadius: 22, backgroundColor: '#161616' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  weekCol: { alignItems: 'center', gap: 8, flex: 1 },
  weekLabel: { fontSize: 10, fontWeight: '700', color: '#7A7A7A' },
  dayCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  dayCircleOn: { backgroundColor: colors.accent },
  dayCircleMissed: { backgroundColor: '#262626' },
  dayCircleDashed: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#4A4A4A' },
  hint: { marginTop: 16, textAlign: 'center', fontSize: 12, lineHeight: 18, color: '#A5A5A5' },
  hintStrong: { color: '#fff', fontWeight: '800' },

  /* Mois */
  monthHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 14,
  },
  monthTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  monthCount: { fontSize: 11, color: '#8E8E8E' },
  grid: { gap: 6 },
  gridRow: { flexDirection: 'row', gap: 6 },
  square: { flex: 1, aspectRatio: 1, borderRadius: 7 },
  squareOn: { backgroundColor: colors.accent },
  squareOff: { backgroundColor: '#2A2A2A' },
  squareFuture: { backgroundColor: '#1A1A1A' },
  squareBlank: { backgroundColor: 'transparent' },

  legend: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 16 },
  legendDot: { width: 9, height: 9, borderRadius: 5 },
  legendText: { fontSize: 10, color: '#8E8E8E', marginRight: 10 },
});
