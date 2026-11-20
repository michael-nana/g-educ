import { useCallback, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/Feedback';
import { Screen } from '../../components/ui/Screen';
import { useRemoteData } from '../../hooks/useRemoteData';
import { studentService } from '../../services/student.service';
import { colors } from '../../theme/colors';
import { useAppDialog } from '../../components/ui/AppDialog';
import { router } from 'expo-router';

const SERIF = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
  if (d.toDateString() === yesterday.toDateString()) return 'Hier';
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// Adapte selon les types réels renvoyés par ton API
function iconFor(item: any): { name: keyof typeof Ionicons.glyphMap; tone: 'dark' | 'flame' | 'light' } {
  const t = String(item.type ?? '').toLowerCase();
  if (t.includes('streak') || t.includes('flamme')) return { name: 'flame', tone: 'flame' };
  if (t.includes('reply') || t.includes('answer') || t.includes('question')) return { name: 'chatbubble-ellipses-outline', tone: 'dark' };
  if (t.includes('course') || t.includes('lesson') || t.includes('lecon')) return { name: 'document-text-outline', tone: 'light' };
  if (t.includes('publish')) return { name: 'checkmark', tone: 'light' };
  return { name: 'school-outline', tone: 'dark' };
}

export default function NotificationsScreen() {
  const { showDialog } = useAppDialog();
  const [busyId, setBusyId] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [reminders, setReminders] = useState(true);
  const load = useCallback(() => studentService.notifications(1, 20), []);
  const { data, loading, error, reload, setData } = useRemoteData(load, []);

  const groups = useMemo(() => {
    const map = new Map<string, NonNullable<typeof data>['data']>();
    (data?.data ?? []).forEach((item) => {
      const key = dayLabel(item.createdAt);
      map.set(key, [...(map.get(key) ?? []), item]);
    });
    return Array.from(map.entries());
  }, [data]);

  async function markRead(id: string) {
    setBusyId(id);
    try {
      await studentService.readNotification(id);
      setData((current) => current ? {
        ...current,
        unreadCount: Math.max(0, current.unreadCount - 1),
        data: current.data.map((item) => item.id === id ? { ...item, readAt: new Date().toISOString() } : item),
      } : current);
    } catch (reason) {
      showDialog('Action impossible', reason instanceof Error ? reason.message : 'Réessaie plus tard.');
    } finally {
      setBusyId('');
    }
  }

  async function markAllRead() {
    try {
      await studentService.readAllNotifications();
      setData((current) => current ? {
        ...current,
        unreadCount: 0,
        data: current.data.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() })),
      } : current);
    } catch (reason) {
      showDialog('Action impossible', reason instanceof Error ? reason.message : 'Réessaie plus tard.');
    }
  }

  async function loadMore() {
    if (!data || loadingMore || data.pagination.page >= data.pagination.totalPages) return;
    setLoadingMore(true);
    try {
      const nextPage = await studentService.notifications(data.pagination.page + 1, data.pagination.limit);
      setData((current) => current ? { ...nextPage, data: [...current.data, ...nextPage.data] } : nextPage);
    } catch (reason) {
      showDialog('Chargement impossible', reason instanceof Error ? reason.message : 'Réessaie plus tard.');
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <Screen>
      {/* Barre du haut */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Retour">
          <Ionicons name="arrow-back" size={16} color={colors.ink} />
        </Pressable>
        {!!data?.unreadCount && (
          <Pressable onPress={markAllRead} accessibilityRole="button">
            <Text style={styles.markAll}>Tout lire</Text>
          </Pressable>
        )}
      </View>

      {/* Titre + compteur italique */}
      <Text style={styles.pageTitle}>
        Notifications
        {!!data?.unreadCount && <Text style={styles.pageCount}> {data.unreadCount}</Text>}
      </Text>

      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : !data?.data.length ? (
        <EmptyState title="Aucune notification" body="Tes nouvelles notifications apparaîtront ici." />
      ) : <>
        {groups.map(([label, items]) => (
          <View key={label} style={styles.group}>
            <Text style={styles.groupLabel}>{label}</Text>
            {items.map((item, index) => {
              const unread = !item.readAt;
              const icon = iconFor(item);
              return (
                <Pressable
                  key={item.id}
                  onPress={() => unread && busyId !== item.id && markRead(item.id)}
                  accessibilityRole="button"
                  style={[styles.row, index < items.length - 1 && styles.rowDivider]}
                >
                  <View style={[
                    styles.icon,
                    icon.tone === 'dark' && styles.iconDark,
                    icon.tone === 'flame' && styles.iconFlame,
                    icon.tone === 'light' && styles.iconLight,
                  ]}>
                    <Ionicons
                      name={icon.name}
                      size={16}
                      color={icon.tone === 'dark' ? '#FFFFFF' : icon.tone === 'flame' ? colors.accent : colors.textSecondary}
                    />
                  </View>

                  <View style={styles.copy}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
                  </View>

                  <View style={styles.meta}>
                    <Text style={styles.time}>{timeLabel(item.createdAt)}</Text>
                    {unread && <View style={styles.unreadDot} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}

        {data.pagination.page < data.pagination.totalPages && (
          <Button variant="light" onPress={loadMore} loading={loadingMore} style={styles.more}>Charger plus</Button>
        )}
      </>}

      {/* Rappels de révision */}
      <View style={styles.reminder}>
        <View style={styles.copy}>
          <Text style={styles.reminderTitle}>Rappels de révision</Text>
          <Text style={styles.reminderBody}>Fonctionnent aussi sans connexion</Text>
        </View>
        <Switch
          value={reminders}
          onValueChange={setReminders}
          trackColor={{ false: '#D9D9D3', true: colors.ink }}
          thumbColor="#FFFFFF"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  backBtn: {
    width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E1',
  },
  markAll: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },

  pageTitle: { color: colors.ink, fontSize: 30, fontWeight: '800', letterSpacing: -0.8, marginBottom: 18 },
  pageCount: { color: colors.accent, fontFamily: SERIF, fontStyle: 'italic', fontWeight: '400', fontSize: 22 },

  group: { marginBottom: 18 },
  groupLabel: { color: colors.muted, fontSize: 10, fontWeight: '600', marginBottom: 6 },

  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 11, paddingVertical: 12 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E1' },

  icon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  iconDark: { backgroundColor: colors.ink },
  iconFlame: { backgroundColor: '#FFF0E9' },
  iconLight: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E1' },

  copy: { flex: 1 },
  title: { color: colors.ink, fontSize: 13, fontWeight: '700', lineHeight: 17 },
  body: { marginTop: 3, color: colors.textSecondary, fontSize: 11, lineHeight: 15 },

  meta: { alignItems: 'flex-end', gap: 6, minWidth: 34 },
  time: { color: colors.muted, fontSize: 9 },
  unreadDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },

  more: { marginTop: 4, marginBottom: 14 },

  reminder: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6,
    padding: 14, borderRadius: 18, backgroundColor: colors.soft,
  },
  reminderTitle: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  reminderBody: { marginTop: 2, color: colors.textSecondary, fontSize: 10 },
});
