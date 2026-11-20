import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { File } from 'expo-file-system';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { Screen } from '../../components/ui/Screen';
import { useRemoteData } from '../../hooks/useRemoteData';
import { authService } from '../../services/auth.service';
import { studentService } from '../../services/student.service';
import { offlineDownloads, type OfflineDownload } from '../../services/offline-downloads';
import { useAppDialog } from '../../components/ui/AppDialog';
import { useAuth } from '../../state/AuthProvider';
import { colors } from '../../theme/colors';

type Tab = 'all' | 'active' | 'offline';

const TABS: { value: Tab; label: string; icon?: keyof typeof Ionicons.glyphMap }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'active', label: 'En cours' },
  { value: 'offline', label: 'Hors-ligne', icon: 'download-outline' },
];

/* ---------- Symbole de la matière ---------- */
function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function iconFor(name: string): keyof typeof Ionicons.glyphMap {
  const n = normalize(name);
  if (n.includes('math')) return 'calculator-outline';
  if (n.includes('phys') || n.includes('chim')) return 'flask-outline';
  if (n.includes('svt') || n.includes('vie') || n.includes('biolog')) return 'leaf-outline';
  if (n.includes('philo')) return 'bulb-outline';
  if (n.includes('fran') || n.includes('lettre')) return 'book-outline';
  if (n.includes('angl') || n.includes('lang')) return 'chatbubbles-outline';
  if (n.includes('hist') || n.includes('geo')) return 'globe-outline';
  return 'school-outline';
}

/* ---------- Anneau de progression (sans dÃ©pendance) ---------- */
function ProgressRing({ percent, size = 32, stroke = 3.5 }: { percent: number; size?: number; stroke?: number }) {
  const deg = Math.max(0, Math.min(percent, 100)) * 3.6;
  const half = size / 2;
  const right = Math.min(deg, 180);
  const left = Math.max(deg - 180, 0);

  const circle = {
    position: 'absolute' as const,
    top: 0,
    width: size,
    height: size,
    borderRadius: half,
    borderWidth: stroke,
    borderColor: 'transparent',
    borderTopColor: colors.ink,
    borderRightColor: colors.ink,
  };

  return (
    <View
      style={{ width: size, height: size }}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percent) }}
    >
      {/* piste */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: stroke,
          borderColor: colors.soft,
        }}
      />

      {/* moitiÃ© droite (0 â†’ 180Â°) */}
      <View style={{ position: 'absolute', top: 0, left: half, width: half, height: size, overflow: 'hidden' }}>
        <View style={[circle, { left: -half, transform: [{ rotate: `${right - 135}deg` }] }]} />
      </View>

      {/* moitiÃ© gauche (180Â° â†’ 360Â°) */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: half, height: size, overflow: 'hidden' }}>
        <View style={[circle, { left: 0, transform: [{ rotate: `${left + 45}deg` }] }]} />
      </View>
    </View>
  );
}

/* ---------- Ã‰cran ---------- */
export default function CoursesScreen() {
  const { showDialog } = useAppDialog();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('all');
  const hasFocused = useRef(false);
  const [offlineItems, setOfflineItems] = useState<OfflineDownload[]>([]);
  const [offlineLoading, setOfflineLoading] = useState(false);
  const [offlineError, setOfflineError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [progressOverview, classes] = await Promise.all([
      studentService.progressOverview(),
      authService.classes(),
    ]);
    return { progressOverview, classes };
  }, []);

  const { data, loading, error, reload } = useRemoteData(load, [], user?.id ? `student-${user.id}-courses` : undefined);
  const schoolClass = data?.classes.find((item) => item.id === user?.classId);
  const reloadOffline = useCallback(async () => {
    setOfflineLoading(true);
    setOfflineError(null);
    try { setOfflineItems(await offlineDownloads.list()); }
    catch { setOfflineError('Impossible de lire les téléchargements enregistrés sur cet appareil.'); }
    finally { setOfflineLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => {
    if (tab === 'offline') {
      void reloadOffline();
    } else if (hasFocused.current) {
      void reload();
    } else {
      hasFocused.current = true;
    }
  }, [reload, reloadOffline, tab]));

  async function deleteOfflineItem(item: OfflineDownload) {
    showDialog('Supprimer le téléchargement ?', item.title, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => {
        void offlineDownloads.remove(item.key).then(() => setOfflineItems((current) => current.filter((entry) => entry.key !== item.key)));
      } },
    ]);
  }

  async function openOfflineItem(item: OfflineDownload) {
    if (item.kind === 'PDF') {
      try {
        const file = new File(item.uri);
        if (!await File.canPreview(file)) throw new Error('Aucun lecteur PDF compatible n’est disponible sur cet appareil.');
        await File.preview(file, { title: item.title, mimeType: 'application/pdf' });
      } catch (error) {
        showDialog('Ouverture impossible', error instanceof Error ? error.message : 'Impossible d’ouvrir ce PDF téléchargé.');
      }
    } else {
      router.push({ pathname: '/(student)/offline/[id]', params: { id: item.key, title: item.title, uri: item.uri } });
    }
  }

  const visible = useMemo(
    () =>
      (data?.progressOverview.subjects ?? []).filter((item) => {
        const matchesSearch = item.subject.name
          .toLocaleLowerCase('fr')
          .includes(search.trim().toLocaleLowerCase('fr'));
        const matchesTab = tab !== 'active' || (item.progressPercent > 0 && item.progressPercent < 100);
        return matchesSearch && matchesTab;
      }),
    [data?.progressOverview.subjects, search, tab],
  );

  return (
    <Screen>
      {/* ---------- En-tÃªte ---------- */}
      <View style={s.header}>
        <Text style={s.title}>Cours</Text>
        <View style={s.classBadge}>
          <Text style={s.classLabel} numberOfLines={1}>
            {schoolClass?.label ?? 'Ma classe'}
          </Text>
        </View>
      </View>

      {/* ---------- Recherche ---------- */}
      <View style={s.search}>
        <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Chercher une matière"
          placeholderTextColor={colors.muted}
          selectionColor={colors.ink}
          returnKeyType="search"
          style={s.searchInput}
        />
        {!!search && (
          <Pressable onPress={() => setSearch('')} accessibilityLabel="Effacer la recherche" hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* ---------- Filtres ---------- */}
      <View style={s.chips} accessibilityRole="tablist">
        {TABS.map(({ value, label, icon }) => {
          const on = tab === value;
          return (
            <Pressable
              key={value}
              onPress={() => setTab(value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              style={[s.chip, on && s.chipOn]}
            >
              {icon && <Ionicons name={icon} size={15} color={on ? '#fff' : colors.ink} />}
              <Text style={[s.chipText, on && s.chipTextOn]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* ---------- Liste ---------- */}
      {tab === 'offline' ? (
        offlineLoading ? <LoadingState /> : offlineError ? <ErrorState message={offlineError} onRetry={() => void reloadOffline()} /> : offlineItems.length ? (
          <View style={s.offlineList}>{offlineItems.map((item) => (
            <View key={item.key} style={s.offlineRow}>
              <Pressable onPress={() => openOfflineItem(item)} accessibilityRole="button" style={({ pressed }) => [s.offlineOpen, pressed && s.pressed]}>
                <View style={s.offlineIcon}><Ionicons name={item.kind === 'PDF' ? 'document-text-outline' : 'videocam-outline'} size={20} color="#fff" /></View>
                <View style={s.copy}>
                  <Text numberOfLines={2} style={s.name}>{item.title}</Text>
                  <Text style={s.meta}>{item.kind === 'PDF' ? 'PDF' : 'Vidéo'} · {item.sizeBytes ? `${Math.max(1, Math.round(item.sizeBytes / 1024 / 1024))} Mo` : 'Enregistré sur cet appareil'}</Text>
                </View>
                <Ionicons name="play-circle-outline" size={23} color={colors.ink} />
              </Pressable>
              <Pressable onPress={() => void deleteOfflineItem(item)} accessibilityRole="button" accessibilityLabel={`Supprimer ${item.title} des téléchargements`} hitSlop={8} style={s.deleteOffline}>
                <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>
          ))}</View>
        ) : <EmptyState title="Aucun cours téléchargé" body="Télécharge un PDF ou une vidéo depuis une leçon. Tu la retrouveras ici sans connexion." />
      ) : loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : visible.length ? (
        <View>
          {visible.map((item, index) => {
            const lessonCount = item.totalLessons;
            const completed = item.completedLessons;
            const progress = item.progressPercent;
            const chapterCount = item.totalChapters;

            return (
              <Pressable
                key={item.classSubjectId}
                onPress={() =>
                  router.push({
                    pathname: '/(student)/subject/[id]',
                    params: { id: item.classSubjectId, name: item.subject.name },
                  })
                }
                accessibilityRole="button"
                style={({ pressed }) => [
                  s.row,
                  index < visible.length - 1 && s.rowLine,
                  pressed && s.pressed,
                ]}
              >
                <View style={[s.icon, s.iconOn]}>
                  <Ionicons name={iconFor(item.subject.name)} size={23} color="#fff" />
                </View>

                <View style={s.copy}>
                  <Text style={s.name} numberOfLines={1}>
                    {item.subject.name}
                  </Text>
                  <Text style={s.meta}>
                    {chapterCount
                      ? `${chapterCount} chapitre${chapterCount === 1 ? '' : 's'} · ${completed}/${lessonCount} leçons terminées · ${progress} %`
                      : 'Aucun chapitre disponible'}
                  </Text>
                </View>

                <ProgressRing percent={progress} />
              </Pressable>
            );
          })}
        </View>
      ) : (
        <EmptyState
          title={
            search
              ? 'Aucune matière trouvée'
              : tab === 'active'
                ? 'Aucune matière en cours'
                : 'Aucune matière disponible'
          }
          body={
            search
              ? 'Essaie un autre nom de matière.'
              : 'Les matières de ta classe apparaîtront ici dès que leur programme sera publié.'
          }
        />
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: { fontSize: 32, fontWeight: '700', letterSpacing: -1.2, color: colors.ink },
  classBadge: {
    maxWidth: 150,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.ink,
  },
  classLabel: { color: '#fff', fontSize: 12, fontWeight: '700' },

  search: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F3F3EF',
  },
  searchInput: { flex: 1, color: colors.ink, fontSize: 13, paddingVertical: 0 },

  chips: { flexDirection: 'row', gap: 8, marginTop: 14, marginBottom: 10 },
  chip: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
  },
  chipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.ink },
  chipTextOn: { color: '#fff', fontWeight: '700' },

  offlineList: { gap: 9 },
  offlineRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  offlineOpen: { flex: 1, minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 11 },
  offlineIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  deleteOffline: { width: 36, height: 40, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  rowLine: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  pressed: { opacity: 0.7 },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3EF',
  },
  iconOn: { backgroundColor: colors.ink },
  copy: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.ink },
  meta: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },
});
