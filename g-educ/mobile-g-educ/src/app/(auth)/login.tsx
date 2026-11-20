import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
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
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../state/AuthProvider';
import { colors, radius } from '../../theme/colors';

const COUNTRY_CODE = '+226';
const FLAG = '🇧🇫';
const LOCAL_LENGTH = 8;

/** Garde uniquement les chiffres, retire un éventuel +226 collé, limite à 8 chiffres. */
function cleanDigits(text: string) {
  let digits = text.replace(/\D/g, '');
  if (digits.startsWith('226') && digits.length > LOCAL_LENGTH) digits = digits.slice(3);
  return digits.slice(0, LOCAL_LENGTH);
}

/** 70123456 → 70 12 34 56 */
function formatLocal(digits: string) {
  return digits.replace(/(\d{2})(?=\d)/g, '$1 ');
}

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [digits, setDigits] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState<'phone' | 'password' | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const phoneValid = digits.length === LOCAL_LENGTH;

  async function submit() {
    if (busy) return;

    if (!phoneValid) {
      setError('Saisis ton numéro à 8 chiffres.');
      return;
    }
    if (!password) {
      setError('Saisis ton mot de passe.');
      return;
    }

    setError('');
    setBusy(true);

    try {
      await signIn(`${COUNTRY_CODE}${digits}`, password);
      router.replace('/(student)/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Connexion impossible. Réessaie.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={s.flex}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ---------- Haut de page, sur le fond noir ---------- */}
          <View style={s.hero}>
            <View style={s.heroTop}>
              <Text style={s.brand}>
  G<Text style={s.brandDash}>-</Text>educ
</Text>
              <View style={s.badge}>
                <Text style={s.badgeText}>ESPACE ÉLÈVE</Text>
              </View>
            </View>

            <View style={s.heroCopy}>
              <Text style={s.kicker}>TON PARCOURS, À TON RYTHME</Text>
              <Text style={s.heroTitle}>
                Apprendre{'\n'}avec <Text style={s.heroItalic}>méthode<Text style={s.brandDash}>.</Text></Text>
              </Text>
              <Text style={s.heroSubtitle}>
                Cours, révisions et progrès réunis au même endroit.
              </Text>
            </View>

            <View pointerEvents="none" style={s.orbit}>
              <View style={s.orbitInner} />
            </View>
          </View>

          {/* ---------- Carte de connexion ---------- */}
          <View style={s.card}>
            <Text style={s.title}>
              Content de te <Text style={s.titleItalic}>revoir.</Text>
            </Text>
            <Text style={s.caption}>Connecte-toi pour continuer ton parcours.</Text>

            {/* Téléphone */}
            <View style={[s.field, focus === 'phone' && s.fieldFocus]}>
              <Text style={s.flag}>{FLAG}</Text>
              <Text style={s.prefix}>{COUNTRY_CODE}</Text>
              <View style={s.divider} />

              <View style={s.fieldBody}>
                <Text style={s.fieldLabel}>Numéro de téléphone</Text>
                <TextInput
                  value={formatLocal(digits)}
                  onChangeText={(t) => {
                    setDigits(cleanDigits(t));
                    if (error) setError('');
                  }}
                  onFocus={() => setFocus('phone')}
                  onBlur={() => setFocus(null)}
                  placeholder="70 12 34 56"
                  placeholderTextColor="#B8B8BC"
                  keyboardType="number-pad"
                  autoComplete="tel-national"
                  textContentType="telephoneNumber"
                  selectionColor={colors.ink}
                  maxLength={LOCAL_LENGTH + 3}
                  style={s.input}
                  accessibilityLabel="Numéro de téléphone"
                />
              </View>

              {phoneValid && (
                <View style={s.valid}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              )}
            </View>

            {/* Mot de passe */}
            <View style={[s.field, focus === 'password' && s.fieldFocus]}>
              <Ionicons name="lock-closed-outline" size={19} color={colors.ink} />

              <View style={[s.fieldBody, s.passwordBody]}>
                <Text style={s.fieldLabel}>Mot de passe</Text>
                <TextInput
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (error) setError('');
                  }}
                  onFocus={() => setFocus('password')}
                  onBlur={() => setFocus(null)}
                  placeholder="Saisis ton mot de passe"
                  placeholderTextColor="#B8B8BC"
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  textContentType="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={submit}
                  selectionColor={colors.ink}
                  style={s.input}
                  accessibilityLabel="Mot de passe"
                />
              </View>

              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                }
                style={s.eye}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={colors.ink}
                />
                <Text style={s.eyeText}>{showPassword ? 'Masquer' : 'Afficher'}</Text>
              </Pressable>
            </View>

            <View style={s.forgotRow}>
              <Link href="/(auth)/forgot-password" style={s.forgot}>
                Mot de passe oublié ?
              </Link>
            </View>

            {!!error && (
              <View style={s.errorBox} accessibilityRole="alert">
                <Text style={s.errorText}>{error}</Text>
              </View>
            )}

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
                <>
                  <Text style={s.buttonText}>Se connecter</Text>
                  <Ionicons name="arrow-forward" size={17} color="#fff" />
                </>
              )}
            </Pressable>

            <View style={s.separator}>
              <View style={s.line} />
              <Text style={s.separatorText}>NOUVEAU SUR G-EDUC ?</Text>
              <View style={s.line} />
            </View>

            <Link href="/(auth)/register" style={s.register}>
              Créer un compte élève  ↗
            </Link>
          </View>

          <Text style={s.footer}>Un espace simple pour apprendre et progresser.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: 16, paddingBottom: 20 },

  /* Haut de page (directement sur le fond noir) */
  hero: {
    flexGrow: 1,
    minHeight: 250,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 28,
    gap: 32,
    justifyContent: 'space-between',
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  badge: {
    borderWidth: 1,
    borderColor: '#414141',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  badgeText: { color: '#D0D0D0', fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  heroCopy: { zIndex: 1, maxWidth: 300 },
  kicker: {
    color: '#A5A5A5',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    lineHeight: 39,
    letterSpacing: -1.4,
    fontWeight: '700',
  },
  heroItalic: {
    color: '#B8B8B8',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  heroSubtitle: { color: '#B9B9B9', fontSize: 12, lineHeight: 18, marginTop: 10, maxWidth: 250 },
  orbit: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#292929',
    right: -57,
    top: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitInner: { width: 120, height: 120, borderRadius: 100, borderWidth: 1, borderColor: '#333' },

  /* Carte */
  card: {
    padding: 22,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E9E9E5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.8, color: colors.ink },
  titleItalic: {
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.ink,
  },
  caption: { color: colors.textSecondary, fontSize: 12, marginTop: 6, marginBottom: 20 },

  /* Champs */
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 64,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
  },
  fieldFocus: { borderColor: colors.ink },
  fieldBody: { flex: 1 },
  passwordBody: { marginLeft: 2 },
  fieldLabel: { fontSize: 10, color: colors.textSecondary },
  input: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    paddingVertical: 2,
    paddingHorizontal: 0,
    letterSpacing: 0.3,
  },
  flag: { fontSize: 20 },
  prefix: { fontSize: 14, fontWeight: '700', color: colors.ink },
  divider: { width: 1, height: 28, backgroundColor: '#E6E6E2' },
  valid: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#F2F2EF',
  },
  eyeText: { fontSize: 11, fontWeight: '700', color: colors.ink },

  forgotRow: { alignItems: 'flex-end', marginTop: 2, marginBottom: 18 },
  forgot: { color: colors.ink, fontSize: 12, fontWeight: '700' },

  errorBox: {
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#F1D5D2',
    padding: 11,
    marginBottom: 14,
  },
  errorText: { color: colors.danger, fontSize: 12, lineHeight: 17 },

  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  separator: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 14 },
  line: { height: 1, flex: 1, backgroundColor: colors.border },
  separatorText: { color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  register: {
    color: colors.ink,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: 4,
  },

  footer: {
    textAlign: 'center',
    color: '#8C8C8C',
    fontSize: 10,
    marginTop: 18,
  },
  brandDash: { color: '#FF3B30' },
});