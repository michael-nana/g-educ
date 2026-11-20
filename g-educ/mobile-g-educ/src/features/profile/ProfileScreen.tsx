import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Screen } from '../../components/ui/Screen';
import { Panel } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { ErrorState, LoadingState } from '../../components/ui/Feedback';
import { useAuth } from '../../state/AuthProvider';
import { studentService } from '../../services/student.service';
import { tokenStorage } from '../../services/storage';
import { useRemoteData } from '../../hooks/useRemoteData';
import { colors } from '../../theme/colors';
import { useAppDialog } from '../../components/ui/AppDialog';

const SERIF = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

type SectionKey = 'edit' | 'notifications' | 'class' | 'privacy' | null;

function academicYear() {
  const now = new Date();
  const y = now.getFullYear();
  return now.getMonth() >= 8 ? `${y}–${y + 1}` : `${y - 1}–${y}`;
}

export default function ProfileScreen() {
  const { showDialog } = useAppDialog();
  const { user, signOut, refreshUser } = useAuth();
  const [open, setOpen] = useState<SectionKey>(null);
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [schoolName, setSchoolName] = useState(user?.schoolName ?? '');
  const [classId, setClassId] = useState('');
  const [classNote, setClassNote] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [notifications, preferences, classes] = await Promise.all([
      studentService.notifications(),
      studentService.notificationPreferences(),
      studentService.classes(),
    ]);
    const [streak, lessonProgress, attempts] = await Promise.allSettled([
      studentService.streak(),
      studentService.progressLessons(),
      studentService.attempts(),
    ]);
    return {
      notifications: notifications.data,
      unreadCount: notifications.unreadCount,
      preferences,
      classes,
      streak: streak.status === 'fulfilled' ? streak.value : null,
      lessonProgress: lessonProgress.status === 'fulfilled' ? lessonProgress.value : null,
      attempts: attempts.status === 'fulfilled' ? attempts.value : null,
    };
  }, []);
  const { data, loading, error, reload } = useRemoteData(load, []);

  useEffect(() => {
    let active = true;
    tokenStorage.getPush().then((token) => { if (active) setDeviceToken(token ?? ''); });
    return () => { active = false; };
  }, []);

  const stats = {
    streak: data?.streak?.currentStreak ?? null,
    record: data?.streak?.longestStreak ?? null,
    lessons: data?.lessonProgress?.filter((item) => Boolean(item.completedAt)
      || (item.lesson.type === 'VIDEO'
        ? item.progressPercent >= 80
        : item.progressPercent >= 100)).length ?? null,
    quizAverage: (() => {
      const quizAttempts = data?.attempts?.filter((item) => item.assessment.kind === 'QUIZ') ?? [];
      if (!quizAttempts.length) return null;
      const total = quizAttempts.reduce((sum, item) => sum + (item.maxScore > 0 ? (item.score / item.maxScore) * 100 : 0), 0);
      return Math.round(total / quizAttempts.length);
    })(),
  };

  const className = data?.classes.find((c) => c.id === user?.classId)?.label;
  const subtitle = [className, academicYear()].filter(Boolean).join(' · ');
  const unreadCount = data?.unreadCount ?? 0;

  const toggle = (key: Exclude<SectionKey, null>) => setOpen((current) => (current === key ? null : key));

  async function saveProfile() {
    setBusy(true);
    try {
      await studentService.updateProfile({ displayName, schoolName });
      await refreshUser();
      showDialog('Profil enregistré', 'Tes informations ont été mises à jour.');
    } catch (e) {
      showDialog('Enregistrement impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    } finally { setBusy(false); }
  }

  async function updatePreference(key: 'eventsEnabled' | 'streakReminder' | 'forumEnabled', value: boolean) {
    try {
      await studentService.updateNotificationPreferences({ [key]: value });
      await reload();
    } catch (e) {
      showDialog('Mise à jour impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    }
  }

  async function requestClassChange() {
    if (!classId || !classNote.trim()) {
      showDialog('Informations manquantes', 'Choisis une classe et indique le motif de ta demande.');
      return;
    }
    setBusy(true);
    try {
      await studentService.requestClassChange(classId, classNote.trim());
      setClassNote('');
      showDialog('Demande envoyée', 'Ta demande sera examinée par l’administration.');
    } catch (e) {
      showDialog('Envoi impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    } finally { setBusy(false); }
  }

  async function changePassword() {
    if (!currentPassword || newPassword.length < 8) {
      showDialog('Mot de passe invalide', 'Saisis ton mot de passe actuel et un nouveau mot de passe d’au moins 8 caractères.');
      return;
    }
    setBusy(true);
    try {
      await studentService.changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      showDialog('Mot de passe modifié', 'Ton nouveau mot de passe est actif.');
    } catch (e) {
      showDialog('Modification impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    } finally { setBusy(false); }
  }

  async function enablePush() {
    try {
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        showDialog('Appareil non pris en charge', 'Les notifications push sont disponibles dans les applications iOS et Android.');
        return;
      }
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Notifications G-EDUC',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      const permission = await Notifications.getPermissionsAsync();
      const status = permission.status === 'granted' ? 'granted' : (await Notifications.requestPermissionsAsync()).status;
      if (status !== 'granted') {
        showDialog('Autorisation refusée', 'Autorise les notifications dans les réglages de ton appareil.');
        return;
      }
      const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
      if (!projectId) {
        showDialog('Configuration requise', 'Ajoute le projectId EAS dans app.json pour créer le jeton push.');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      await studentService.registerDevice({
        token,
        platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
        appVersion: Constants.expoConfig?.version,
      });
      await tokenStorage.savePush(token);
      setDeviceToken(token);
      showDialog('Notifications activées', 'Cet appareil est enregistré.');
    } catch (e) {
      showDialog('Activation impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    }
  }

  async function disablePush() {
    if (!deviceToken) return;
    try {
      await studentService.removeDevice(deviceToken);
      await tokenStorage.clearPush();
      setDeviceToken('');
      showDialog('Appareil retiré', 'Les notifications push sont désactivées pour cet appareil.');
    } catch (e) {
      showDialog('Suppression impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
    }
  }

  function deleteAccount() {
    showDialog('Supprimer mon compte ?', 'Cette action anonymise et supprime ton accès au compte.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer', style: 'destructive',
        onPress: async () => {
          try {
            await studentService.deleteAccount();
            await tokenStorage.clearPush();
            await signOut().catch(() => undefined);
            router.replace('/(auth)/login');
          } catch (e) {
            showDialog('Suppression impossible', e instanceof Error ? e.message : 'Réessaie plus tard.');
          }
        },
      },
    ]);
  }

  function logout() {
    showDialog('Se déconnecter', 'Veux-tu fermer ta session ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion', style: 'destructive',
        onPress: async () => { await signOut(); router.replace('/(auth)/login'); },
      },
    ]);
  }

  return (
    <Screen>
      {/* En-tête */}
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Profil</Text>
        <Pressable
          onPress={() => toggle('edit')}
          style={[styles.moreBtn, open === 'edit' && styles.moreBtnActive]}
          accessibilityRole="button"
          accessibilityLabel="Modifier mon profil"
        >
          <Ionicons name="ellipsis-horizontal" size={16} color={open === 'edit' ? '#fff' : colors.ink} />
        </Pressable>
      </View>

      {/* Identité */}
      <View style={styles.identity}>
        <View>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {(user?.displayName?.[0] ?? 'É').toUpperCase()}
              {(user?.displayName?.[1] ?? '').toUpperCase()}
            </Text>
          </View>
          <View style={styles.avatarBadge}>
            <Ionicons name="flame" size={9} color="#fff" />
          </View>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.name}>{user?.displayName}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Modifier mon profil (via le bouton ···) */}
      {open === 'edit' && (
        <Panel style={styles.expand}>
          <Field label="Nom affiché" value={displayName} onChangeText={setDisplayName} />
          <Field label="Établissement" value={schoolName} onChangeText={setSchoolName} />
          <Button onPress={saveProfile} loading={busy}>Enregistrer les modifications</Button>
        </Panel>
      )}

      {/* Statistiques */}
      <View style={styles.stats}>
        <StatCard dark value={stats.streak === null ? '—' : String(stats.streak)} label="jours de flamme" onPress={() => router.push('/(student)/streak')} />
        <StatCard value={stats.record === null ? '—' : String(stats.record)} label="record" />
        <StatCard value={stats.lessons === null ? '—' : String(stats.lessons)} label="leçons finies" />
        <StatCard value={stats.quizAverage === null ? '—' : `${stats.quizAverage} %`} label="moyenne aux quiz" />
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuRow
          icon="notifications-outline" label="Notifications"
          badge={unreadCount} open={open === 'notifications'} onPress={() => toggle('notifications')}
        />
        {open === 'notifications' && (
          <View style={styles.expand}>
            {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : <>
              <Panel>
                <PreferenceRow label="Événements scolaires" enabled={Boolean(data?.preferences.eventsEnabled)} onChange={(v) => updatePreference('eventsEnabled', v)} />
                <PreferenceRow label="Rappels de flamme" enabled={Boolean(data?.preferences.streakReminder)} onChange={(v) => updatePreference('streakReminder', v)} />
                <PreferenceRow label="Notifications du forum" enabled={Boolean(data?.preferences.forumEnabled)} onChange={(v) => updatePreference('forumEnabled', v)} last />
              </Panel>

              <Panel style={styles.gap}>
                <Text style={styles.body}>Reçois les alertes scolaires sur cet appareil.</Text>
                <Button variant="light" onPress={deviceToken ? disablePush : enablePush}>
                  {deviceToken ? 'Retirer cet appareil' : 'Activer sur cet appareil'}
                </Button>
              </Panel>

              <View style={styles.subHeading}>
                <Text style={styles.subTitle}>Récentes</Text>
                <Pressable onPress={() => router.push('/(student)/notifications')} accessibilityRole="button">
                  <Text style={styles.link}>Voir tout</Text>
                </Pressable>
              </View>
              {data?.notifications.length ? data.notifications.slice(0, 3).map((item) => (
                <Panel key={item.id} style={!item.readAt ? { ...styles.notice, ...styles.noticeUnread } : styles.notice}>
                  <View style={styles.noticeRow}>
                    <View style={[styles.noticeDot, item.readAt && styles.noticeDotRead]} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.noticeTitle}>{item.title}</Text>
                      <Text style={styles.noticeBody}>{item.body}</Text>
                      {!item.readAt && (
                        <Pressable onPress={() => studentService.readNotification(item.id).then(reload)}>
                          <Text style={styles.readLink}>Marquer comme lue  ↗</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Panel>
              )) : <Panel><Text style={styles.body}>Aucune notification pour le moment.</Text></Panel>}
            </>}
          </View>
        )}

        <MenuRow
          icon="download-outline" label="Hors-ligne et stockage"
          onPress={() => showDialog('Hors-ligne et stockage', 'Retrouve tes fichiers téléchargés dans Cours > Hors-ligne.')}
        />

        <MenuRow icon="swap-horizontal-outline" label="Changer de classe" open={open === 'class'} onPress={() => toggle('class')} />
        {open === 'class' && (
          <Panel style={styles.expand}>
            <Text style={styles.body}>Choisis une nouvelle classe et explique ta demande à l’administration.</Text>
            {data?.classes.filter((item) => item.id !== user?.classId).map((item) => (
              <Pressable key={item.id} onPress={() => setClassId(item.id)} style={styles.classOption}>
                <View style={[styles.radio, classId === item.id && styles.radioSelected]}>
                  {classId === item.id && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.classLabel, classId === item.id && styles.classLabelSelected]}>{item.label}</Text>
              </Pressable>
            ))}
            <Field label="Motif de la demande" value={classNote} onChangeText={setClassNote} multiline placeholder="Explique brièvement ta demande" />
            <Button onPress={requestClassChange} loading={busy}>Envoyer la demande</Button>
          </Panel>
        )}

        <MenuRow icon="lock-closed-outline" label="Confidentialité" open={open === 'privacy'} onPress={() => toggle('privacy')} />
        {open === 'privacy' && (
          <View style={styles.expand}>
            <Panel>
              <Text style={styles.subTitle}>Sécurité</Text>
              <Field label="Mot de passe actuel" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry autoCapitalize="none" />
              <Field label="Nouveau mot de passe" value={newPassword} onChangeText={setNewPassword} secureTextEntry autoCapitalize="none" />
              <Button onPress={changePassword} loading={busy}>Modifier le mot de passe</Button>
            </Panel>
            <Button variant="light" onPress={deleteAccount} style={styles.gap}>
              <Text style={{ color: colors.danger }}>Supprimer mon compte</Text>
            </Button>
          </View>
        )}

        <MenuRow icon="log-out-outline" label="Se déconnecter" muted hideChevron last onPress={logout} />
      </View>

      <Text style={styles.footer}>G-EDUC · Apprendre, progresser, réussir.</Text>
    </Screen>
  );
}

function StatCard({ value, label, dark, onPress }: { value: string; label: string; dark?: boolean; onPress?: () => void }) {
  const content = <>
      <Text style={[styles.statValue, dark && styles.statValueDark]}>{value}</Text>
      <Text style={[styles.statLabel, dark && styles.statLabelDark]}>{label}</Text>
    </>;
  return onPress
    ? <Pressable onPress={onPress} accessibilityRole="button" style={[styles.statCard, dark && styles.statCardDark]}>{content}</Pressable>
    : <View style={[styles.statCard, dark && styles.statCardDark]}>{content}</View>;
}

function MenuRow({
  icon, label, onPress, open, badge, muted, hideChevron, last,
}: {
  icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void;
  open?: boolean; badge?: number; muted?: boolean; hideChevron?: boolean; last?: boolean;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={[styles.menuRow, !last && !open && styles.menuDivider]}>
      <Ionicons name={icon} size={16} color={muted ? colors.textSecondary : colors.ink} />
      <Text style={[styles.menuLabel, muted && styles.menuLabelMuted]}>{label}</Text>
      {!!badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
      {!hideChevron && <Ionicons name={open ? 'chevron-down' : 'chevron-forward'} size={14} color={colors.muted} />}
    </Pressable>
  );
}

function PreferenceRow({ label, enabled, onChange, last }: { label: string; enabled: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <View style={[styles.preferenceRow, !last && styles.preferenceDivider]}>
      <Text style={styles.preferenceLabel}>{label}</Text>
      <Switch value={enabled} onValueChange={onChange} trackColor={{ true: colors.ink }} thumbColor="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  pageTitle: { color: colors.ink, fontSize: 30, fontWeight: '800', letterSpacing: -0.8 },
  moreBtn: {
    width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E7E7E1',
  },
  moreBtnActive: { backgroundColor: colors.ink, borderColor: colors.ink },

  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: '#fff', fontSize: 18, fontWeight: '800' },
  avatarBadge: {
    position: 'absolute', right: -2, bottom: -2, width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.accent, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  identityCopy: { flex: 1 },
  name: { color: colors.ink, fontSize: 17, fontWeight: '800' },
  subtitle: { marginTop: 3, color: colors.textSecondary, fontSize: 11 },

  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  statCard: { width: '48%', flexGrow: 1, minHeight: 92, padding: 14, borderRadius: 20, backgroundColor: colors.soft, justifyContent: 'space-between' },
  statCardDark: { backgroundColor: colors.ink },
  statValue: { color: colors.ink, fontFamily: SERIF, fontStyle: 'italic', fontSize: 34, lineHeight: 38 },
  statValueDark: { color: '#fff' },
  statLabel: { color: colors.textSecondary, fontSize: 10 },
  statLabelDark: { color: '#B8B8B8' },

  menu: { marginBottom: 8 },
  menuRow: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 13 },
  menuDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E7E7E1' },
  menuLabel: { flex: 1, color: colors.ink, fontSize: 13, fontWeight: '500' },
  menuLabelMuted: { color: colors.textSecondary },
  badge: { minWidth: 18, height: 18, paddingHorizontal: 5, borderRadius: 9, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },

  expand: { marginTop: 4, marginBottom: 12 },
  gap: { marginTop: 10 },

  preferenceRow: { minHeight: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  preferenceDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  preferenceLabel: { fontSize: 12, color: colors.ink, fontWeight: '500' },

  subHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  subTitle: { fontSize: 13, fontWeight: '700', color: colors.ink, marginBottom: 6 },
  link: { fontSize: 10, color: colors.ink, fontWeight: '700' },

  notice: { marginBottom: 8 },
  noticeUnread: { borderColor: '#CFCFC8' },
  noticeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  noticeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 5 },
  noticeDotRead: { backgroundColor: colors.border },
  noticeTitle: { fontSize: 13, color: colors.ink, fontWeight: '700' },
  noticeBody: { fontSize: 11, color: colors.textSecondary, lineHeight: 16, marginTop: 5 },
  readLink: { color: colors.ink, fontSize: 10, fontWeight: '700', marginTop: 9 },

  body: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 8 },

  classOption: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  radio: { height: 18, width: 18, borderRadius: 9, borderWidth: 1, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.ink },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.ink },
  classLabel: { flex: 1, color: colors.textSecondary, fontSize: 12 },
  classLabelSelected: { color: colors.ink, fontWeight: '700' },

  footer: { textAlign: 'center', color: colors.textSecondary, fontSize: 10, marginTop: 18, marginBottom: 7 },
});
