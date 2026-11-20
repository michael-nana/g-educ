import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { colors } from '../../theme/colors';
import { createClientId } from '../../utils/ids';
import { useAppDialog } from '../../components/ui/AppDialog';

/* ---------- Dates (heure locale) ---------- */
const STRIP_DAYS = 21; // 3 semaines à partir du lundi de la semaine en cours
const RANGE_DAYS = 90;

function localKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function mondayOf(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const hhmm = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

type Entry = {
  id: string;
  kind: 'session' | 'event';
  title: string;
  start: Date;
  end?: Date;
  completed: boolean;
};

/* ---------- Champ du formulaire ---------- */
function SheetField({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={s.fieldWrap}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#B8B8BC"
        selectionColor={colors.ink}
        style={s.fieldInput}
        {...props}
      />
    </View>
  );
}

/* ---------- Écran ---------- */
export default function PlanningScreen() {
  const { showDialog } = useAppDialog();
  const now = new Date();
  const todayKey = localKey(now);
  const weekStart = useMemo(() => mondayOf(new Date()), []);
  const stripDays = useMemo(
    () => Array.from({ length: STRIP_DAYS }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const [selected, setSelected] = useState(todayKey);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(todayKey);
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('17:30');

  const load = useCallback(async () => {
    const from = localKey(mondayOf(new Date()));
    const to = localKey(addDays(new Date(), RANGE_DAYS));
    const [sessions, events] = await Promise.all([
      studentService.sessions(from, to),
      studentService.events(from, to),
    ]);
    return { sessions, events };
  }, []);

  const { data, loading, error, reload } = useRemoteData(load, []);

  /* Toutes les entrées (séances + événements), triées par heure */
  const entries = useMemo<Entry[]>(() => {
    const sessions: Entry[] = (data?.sessions ?? []).map((item) => ({
      id: item.id,
      kind: 'session',
      title: item.title,
      start: new Date(item.startsAt),
      end: new Date(item.endsAt),
      completed: Boolean(item.completedAt),
    }));
    const events: Entry[] = (data?.events ?? []).map((item) => ({
      id: item.id,
      kind: 'event',
      title: item.title,
      start: new Date(item.startsAt),
      completed: false,
    }));
    return [...sessions, ...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [data]);

  const busyDays = useMemo(() => new Set(entries.map((e) => localKey(e.start))), [entries]);
  const dayEntries = entries.filter((e) => localKey(e.start) === selected);

  /* Prochain événement scolaire (bandeau) */
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const nextEvent = entries.find((e) => e.kind === 'event' && e.start >= startOfToday);

  /* Séance « en cours / à venir » mise en avant (noir) */
  const highlightId =
    selected === todayKey
      ? dayEntries.find(
          (e) => e.kind === 'session' && !e.completed && (e.end ?? e.start).getTime() >= now.getTime(),
        )?.id
      : undefined;

  const selectedDate = new Date(`${selected}T12:00:00`);
  const monthLabel = capitalize(
    new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(selectedDate),
  );

  /* ---------- Actions ---------- */
  function openForm() {
    setDay(selected);
    setOpen(true);
  }

  async function createSession() {
    if (!title.trim()) {
      showDialog('Titre requis', 'Donne un titre à ta séance de révision.');
      return;
    }

    const startsAt = new Date(`${day}T${startTime}:00`);
    const endsAt = new Date(`${day}T${endTime}:00`);

    if (
      Number.isNaN(startsAt.getTime()) ||
      Number.isNaN(endsAt.getTime()) ||
      endsAt <= startsAt
    ) {
      showDialog('Horaire invalide', 'Vérifie la date et les heures de début et de fin.');
      return;
    }

    setBusy(true);
    try {
      await studentService.createSession({
        clientId: createClientId(),
        title: title.trim(),
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
      });
      setTitle('');
      setOpen(false);
      if (stripDays.some((d) => localKey(d) === day)) setSelected(day);
      await reload();
    } catch (e) {
      showDialog('Création impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    } finally {
      setBusy(false);
    }
  }

  async function completeSession(id: string) {
    try {
      await studentService.updateSession(id, { completedAt: new Date().toISOString() });
      await reload();
    } catch (e) {
      showDialog('Mise à jour impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    }
  }

  async function removeSession(id: string) {
    try {
      await studentService.deleteSession(id);
      await reload();
    } catch (e) {
      showDialog('Suppression impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    }
  }

  function openActions(entry: Entry) {
    if (entry.kind !== 'session') return;

    showDialog(entry.title, 'Que veux-tu faire ?', [
      ...(entry.completed
        ? []
        : [{ text: 'Marquer comme terminée', onPress: () => void completeSession(entry.id) }]),
      { text: 'Supprimer', style: 'destructive' as const, onPress: () => void removeSession(entry.id) },
      { text: 'Annuler', style: 'cancel' as const },
    ]);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* ---------- En-tête ---------- */}
        <View style={s.header}>
          <View>
            <Text style={s.month}>{monthLabel}</Text>
            <Text style={s.title}>Planning</Text>
          </View>
          <Pressable
            onPress={openForm}
            accessibilityRole="button"
            accessibilityLabel="Planifier une révision"
            style={s.add}
          >
            <Ionicons name="add" size={26} color="#fff" />
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.ink} style={s.loader} />
        ) : error ? (
          <View style={s.errorBox}>
            <Text style={s.errorText}>{error}</Text>
            <Pressable onPress={reload} accessibilityRole="button" style={s.retry}>
              <Text style={s.retryText}>Réessayer</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* ---------- Jours ---------- */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={s.stripScroll}
              contentContainerStyle={s.strip}
            >
              {stripDays.map((date) => {
                const key = localKey(date);
                const on = key === selected;
                const isToday = key === todayKey;
                const label = capitalize(
                  new Intl.DateTimeFormat('fr-FR', { weekday: 'short' })
                    .format(date)
                    .replace('.', ''),
                );

                return (
                  <Pressable
                    key={key}
                    onPress={() => setSelected(key)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    accessibilityLabel={new Intl.DateTimeFormat('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    }).format(date)}
                    style={[s.pill, on && s.pillOn, !on && isToday && s.pillToday]}
                  >
                    <Text style={[s.pillLabel, on && s.pillLabelOn]}>{label}</Text>
                    <Text style={[s.pillNumber, on && s.pillNumberOn]}>{date.getDate()}</Text>
                    <View style={[s.pillDot, busyDays.has(key) && s.pillDotOn]} />
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* ---------- Prochain événement ---------- */}
            {nextEvent && (
              <Pressable
                onPress={() => {
                  const key = localKey(nextEvent.start);
                  if (stripDays.some((d) => localKey(d) === key)) setSelected(key);
                }}
                accessibilityRole="button"
                style={s.banner}
              >
                <Ionicons name="school-outline" size={16} color={colors.accent} />
                <Text style={s.bannerText} numberOfLines={1}>
                  {nextEvent.title} ·{' '}
                  {new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric' }).format(
                    nextEvent.start,
                  )}
                </Text>
              </Pressable>
            )}

            {/* ---------- Journée ---------- */}
            {dayEntries.length ? (
              <View style={s.list}>
                {dayEntries.map((entry) => {
                  const hot = entry.id === highlightId;
                  const minutes = entry.end
                    ? Math.round((entry.end.getTime() - entry.start.getTime()) / 60000)
                    : 0;
                  const sub =
                    entry.kind === 'event'
                      ? 'Événement scolaire'
                      : entry.completed
                        ? 'Terminée'
                        : `Révision · ${minutes} min`;

                  return (
                    <View key={`${entry.kind}-${entry.id}`} style={s.row}>
                      <View style={s.times}>
                        <Text style={s.timeStart}>{hhmm.format(entry.start)}</Text>
                        {entry.end && <Text style={s.timeEnd}>{hhmm.format(entry.end)}</Text>}
                      </View>

                      <Pressable
                        onPress={() => openActions(entry)}
                        disabled={entry.kind === 'event'}
                        accessibilityRole={entry.kind === 'session' ? 'button' : undefined}
                        accessibilityHint={entry.kind === 'session' ? 'Ouvre les actions de la séance' : undefined}
                        style={({ pressed }) => [
                          s.card,
                          hot && s.cardHot,
                          entry.kind === 'event' && s.cardEvent,
                          entry.completed && s.cardDone,
                          pressed && s.pressed,
                        ]}
                      >
                        <View style={s.cardCopy}>
                          <Text style={[s.cardTitle, hot && s.cardTitleHot]} numberOfLines={2}>
                            {entry.title}
                          </Text>
                          <Text style={[s.cardSub, hot && s.cardSubHot]}>{sub}</Text>
                        </View>
                        {entry.kind === 'session' && (
                          <Ionicons
                            name={entry.completed ? 'checkmark-circle' : 'ellipsis-horizontal'}
                            size={entry.completed ? 20 : 18}
                            color={hot ? '#fff' : entry.completed ? colors.accent : colors.textSecondary}
                          />
                        )}
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={s.empty}>
                <Text style={s.emptyTitle}>Rien de prévu ce jour-là</Text>
                <Text style={s.emptyBody}>Planifie une séance pour organiser tes révisions.</Text>
                <Pressable onPress={openForm} accessibilityRole="button" style={s.emptyButton}>
                  <Text style={s.emptyButtonText}>Planifier une révision</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* ---------- Formulaire ---------- */}
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.backdrop}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
            accessibilityLabel="Fermer"
          />

          <View style={s.sheet}>
            <View style={s.grabber} />
            <Text style={s.sheetTitle}>Planifier une révision</Text>

            <SheetField
              label="Sujet"
              value={title}
              onChangeText={setTitle}
              placeholder="Ex. Réviser les fractions"
            />
            <SheetField
              label="Date (AAAA-MM-JJ)"
              value={day}
              onChangeText={setDay}
              placeholder="2026-11-18"
              autoCapitalize="none"
            />

            <View style={s.twoCols}>
              <View style={s.col}>
                <SheetField
                  label="Début (HH:MM)"
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="17:00"
                  autoCapitalize="none"
                />
              </View>
              <View style={s.col}>
                <SheetField
                  label="Fin (HH:MM)"
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="17:30"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <Pressable
              onPress={createSession}
              disabled={busy}
              accessibilityRole="button"
              accessibilityState={{ disabled: busy, busy }}
              style={({ pressed }) => [s.submit, pressed && s.pressed]}
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={s.submitText}>Ajouter au planning</Text>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28 },
  pressed: { opacity: 0.75 },
  loader: { marginTop: 40 },

  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  month: { fontSize: 11, color: colors.textSecondary, marginBottom: 2 },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: -1.3, color: colors.ink },
  add: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Jours */
  stripScroll: { marginHorizontal: -20, marginTop: 20 },
  strip: { paddingHorizontal: 20, gap: 8 },
  pill: {
    width: 54,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    borderRadius: 18,
    backgroundColor: '#F3F3EF',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  pillOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  pillToday: { borderColor: colors.ink },
  pillLabel: { fontSize: 10, color: colors.textSecondary },
  pillLabelOn: { color: '#B9B9B9' },
  pillNumber: { fontSize: 19, fontWeight: '700', color: colors.ink, marginTop: 4 },
  pillNumberOn: { color: '#fff' },
  pillDot: { width: 5, height: 5, borderRadius: 3, marginTop: 5, backgroundColor: 'transparent' },
  pillDotOn: { backgroundColor: colors.accent },

  /* Bandeau */
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F6D9CB',
    backgroundColor: '#FFF0E9',
  },
  bannerText: { flex: 1, fontSize: 12, fontWeight: '600', color: colors.ink },

  /* Journée */
  list: { marginTop: 22, gap: 14 },
  row: { flexDirection: 'row', gap: 14 },
  times: { width: 44, paddingTop: 14 },
  timeStart: { fontSize: 13, fontWeight: '700', color: colors.ink },
  timeEnd: { fontSize: 10, color: colors.textSecondary, marginTop: 3 },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 72,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F3F3EF',
  },
  cardHot: { backgroundColor: colors.ink },
  cardEvent: { backgroundColor: '#FFF0E9' },
  cardDone: { opacity: 0.6 },
  cardCopy: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  cardTitleHot: { color: '#fff' },
  cardSub: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },
  cardSubHot: { color: '#B9B9B9' },

  empty: {
    marginTop: 26,
    alignItems: 'center',
    padding: 24,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#E0E0DB',
  },
  emptyTitle: { fontSize: 14, fontWeight: '700', color: colors.ink },
  emptyBody: { fontSize: 12, color: colors.textSecondary, marginTop: 6, textAlign: 'center' },
  emptyButton: {
    marginTop: 16,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: colors.ink,
  },
  emptyButtonText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  errorBox: { alignItems: 'center', gap: 14, marginTop: 40 },
  errorText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },
  retry: { paddingVertical: 11, paddingHorizontal: 22, borderRadius: 999, backgroundColor: colors.ink },
  retryText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  /* Formulaire */
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    padding: 20,
    paddingBottom: 28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fff',
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0DB',
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.5, color: colors.ink, marginBottom: 16 },
  fieldWrap: { marginBottom: 12 },
  fieldLabel: { fontSize: 11, color: colors.textSecondary, marginBottom: 6 },
  fieldInput: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F3F3EF',
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
  },
  twoCols: { flexDirection: 'row', gap: 10 },
  col: { flex: 1 },
  submit: {
    height: 54,
    borderRadius: 27,
    marginTop: 8,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
