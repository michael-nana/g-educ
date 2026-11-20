import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authService } from '../../services/auth.service';
import { useAppDialog } from '../../components/ui/AppDialog';
import type { ClassItem } from '../../services/types';
import { colors } from '../../theme/colors';

const TOTAL_STEPS = 3;

/* ---------- Regroupement des classes (Collège / Lycée) ---------- */
type Group = 'college' | 'seconde' | 'premiere' | 'terminale' | 'autres';

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function detect(text: string): Group | null {
  const t = normalize(text);
  if (!t) return null;
  if (/^[3-6]\s?(e|eme|ieme)\b/.test(t) || /^(sixieme|cinquieme|quatrieme|troisieme)/.test(t))
    return 'college';
  if (/^(2nde|2de|2nd|seconde)/.test(t)) return 'seconde';
  if (/^(1ere|1re|premiere)/.test(t)) return 'premiere';
  if (/^(tle|terminale|term)/.test(t)) return 'terminale';
  return null;
}

function groupOf(item: ClassItem): Group {
  return detect(item.label) ?? detect(item.level ?? '') ?? 'autres';
}

function sortByLabel(a: ClassItem, b: ClassItem) {
  return a.label.localeCompare(b.label, 'fr', { numeric: true });
}

function getInitials(name: string) {
  const parts = name.trim().split(/[\s_.\-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '');
  return letters.join('') || '?';
}

/* ---------- Pastille de classe ---------- */
function ClassChip({
  item,
  selected,
  basis,
  onPress,
}: {
  item: ClassItem;
  selected: boolean;
  basis: `${number}%`;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={item.label}
      style={[s.chip, { flexBasis: basis }, selected && s.chipOn]}
    >
      {selected && <Ionicons name="checkmark" size={15} color="#fff" />}
      <Text style={[s.chipText, selected && s.chipTextOn]} numberOfLines={1}>
        {item.label}
      </Text>
    </Pressable>
  );
}

/* ---------- Écran ---------- */
export default function CompleteRegistration() {
  const { showDialog } = useAppDialog();
  const { phone, verificationToken } = useLocalSearchParams<{
    phone: string;
    verificationToken: string;
  }>();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classId, setClassId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    authService
      .classes()
      .then(setClasses)
      .catch((e) => setError(e instanceof Error ? e.message : 'Classes indisponibles.'))
      .finally(() => setLoadingClasses(false));
  }, []);

  const groups = useMemo(() => {
    const result: Record<Group, ClassItem[]> = {
      college: [],
      seconde: [],
      premiere: [],
      terminale: [],
      autres: [],
    };
    classes.forEach((item) => result[groupOf(item)].push(item));
    (Object.keys(result) as Group[]).forEach((g) => result[g].sort(sortByLabel));
    return result;
  }, [classes]);

  const selected = classes.find((c) => c.id === classId);
  const hasLycee =
    groups.seconde.length + groups.premiere.length + groups.terminale.length > 0;

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(auth)/register');
  }

  async function submit() {
    if (!classId) {
      setError('Sélectionne une classe pour continuer.');
      return;
    }
    if (!name.trim()) {
      setError('Choisis un pseudo.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir 8 caractères minimum.');
      return;
    }

    setBusy(true);
    setError('');

    try {
      await authService.register({
        phone,
        password,
        verificationToken,
        displayName: name.trim(),
        schoolName: undefined,
        classId,
      });

      showDialog('Compte créé', 'Tu peux maintenant te connecter.', [
        { text: 'Continuer', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Inscription impossible.');
    } finally {
      setBusy(false);
    }
  }

  function renderChips(items: ClassItem[], basis: `${number}%`) {
    return items.map((item) => (
      <ClassChip
        key={item.id}
        item={item}
        basis={basis}
        selected={classId === item.id}
        onPress={() => {
          setClassId(item.id);
          setError('');
        }}
      />
    ));
  }

  const lyceeRows: { label: string; items: ClassItem[] }[] = [
    { label: 'Seconde', items: groups.seconde },
    { label: 'Première', items: groups.premiere },
    { label: 'Terminale', items: groups.terminale },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={s.flex}
      >
        {/* Retour + progression */}
        <View style={s.top}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Retour"
            style={s.back}
          >
            <Ionicons name="arrow-back" size={18} color={colors.ink} />
          </Pressable>

          <View
            style={s.progress}
            accessibilityRole="progressbar"
            accessibilityLabel={`Étape 3 sur ${TOTAL_STEPS}`}
          >
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <View key={i} style={[s.segment, s.segmentOn]} />
            ))}
          </View>
        </View>

        <ScrollView
          style={s.flex}
          contentContainerStyle={s.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.title}>
            Tu es en <Text style={s.italic}>quelle classe</Text> ?
          </Text>

          {/* Pseudo + mot de passe */}
          <View style={s.card}>
            <View style={s.cardRow}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{getInitials(name)}</Text>
              </View>
              <View style={s.cardField}>
                <Text style={s.cardLabel}>Ton pseudo</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex. awa_ki"
                  placeholderTextColor="#B8B8BC"
                  autoComplete="name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={colors.ink}
                  style={s.cardInput}
                />
              </View>
            </View>

            <View style={s.cardDivider} />

            <View style={s.cardRow}>
              <View style={s.lock}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.ink} />
              </View>
              <View style={s.cardField}>
                <Text style={s.cardLabel}>Mot de passe</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="8 caractères minimum"
                  placeholderTextColor="#B8B8BC"
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={colors.ink}
                  style={s.cardInput}
                />
              </View>
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                }
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          {/* Classes */}
          {loadingClasses ? (
            <ActivityIndicator color={colors.ink} style={s.loader} />
          ) : (
            <View accessibilityRole="radiogroup">
              {groups.college.length > 0 && (
                <>
                  <Text style={s.section}>Collège</Text>
                  <View style={s.chips}>{renderChips(groups.college, '22%')}</View>
                </>
              )}

              {hasLycee && (
                <>
                  <Text style={s.section}>Lycée</Text>
                  {lyceeRows
                    .filter((row) => row.items.length > 0)
                    .map((row) => (
                      <View key={row.label} style={s.lyceeRow}>
                        <Text style={s.rowLabel}>{row.label}</Text>
                        <View style={[s.chips, s.flex]}>{renderChips(row.items, '28%')}</View>
                      </View>
                    ))}
                </>
              )}

              {groups.autres.length > 0 && (
                <>
                  <Text style={s.section}>Autres classes</Text>
                  <View style={s.chips}>{renderChips(groups.autres, '28%')}</View>
                </>
              )}
            </View>
          )}

          {!!error && (
            <Text style={s.error} accessibilityRole="alert">
              {error}
            </Text>
          )}
        </ScrollView>

        {/* Bouton */}
        <View style={s.footer}>
          <Pressable
            onPress={submit}
            disabled={busy}
            accessibilityRole="button"
            accessibilityState={{ disabled: busy, busy }}
            style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.buttonText}>
                {selected ? `Entre en ${selected.label}` : 'Créer mon compte'}
              </Text>
            )}
          </Pressable>
          <Text style={s.caption}>Tu ne vois que les contenus de ta classe.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  back: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E6E6E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: { flex: 1, flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#ECECE8' },
  segmentOn: { backgroundColor: colors.ink },

  content: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 24 },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -1.2,
    lineHeight: 36,
    color: colors.ink,
    marginBottom: 22,
  },
  italic: {
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.ink,
  },

  card: {
    backgroundColor: '#F6F6F3',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 62 },
  cardDivider: { height: 1, backgroundColor: '#E8E8E3' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  lock: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardField: { flex: 1 },
  cardLabel: { fontSize: 10, color: colors.textSecondary },
  cardInput: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
    paddingVertical: 2,
    paddingHorizontal: 0,
  },

  loader: { marginTop: 32 },
  section: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
    marginTop: 26,
    marginBottom: 12,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexGrow: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
  },
  chipOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.ink },
  chipTextOn: { color: '#fff', fontWeight: '700' },

  lyceeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  rowLabel: { width: 66, fontSize: 11, color: colors.textSecondary },

  error: { marginTop: 20, fontSize: 12, lineHeight: 17, color: colors.danger },

  footer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 12 },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  caption: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 11,
    color: colors.textSecondary,
  },
});
