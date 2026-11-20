import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authService } from '../../services/auth.service';
import { colors } from '../../theme/colors';

const COUNTRY_CODE = '+226';
const FLAG = '🇧🇫';
const LOCAL_LENGTH = 8;
const TOTAL_STEPS = 3;

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

export default function Register() {
  const [digits, setDigits] = useState('');
  const [focused, setFocused] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = digits.length === LOCAL_LENGTH && !busy;

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(auth)/login');
  }

  async function submit() {
    if (!canSubmit) return;

    setBusy(true);
    setError('');

    const phone = `${COUNTRY_CODE}${digits}`;

    try {
      await authService.requestRegistrationOtp(phone);
      router.push({ pathname: '/(auth)/verify-otp', params: { phone } });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Envoi du code impossible.');
    } finally {
      setBusy(false);
    }
  }

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
            accessibilityLabel={`Étape 1 sur ${TOTAL_STEPS}`}
          >
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <View key={i} style={[s.segment, i === 0 && s.segmentOn]} />
            ))}
          </View>
        </View>

        {/* Contenu */}
        <View style={s.body}>
          <Text style={s.title}>
            Quel est ton <Text style={s.italic}>numéro</Text> ?
          </Text>

          <Text style={s.subtitle}>
            On t’envoie un code par SMS pour vérifier que c’est bien toi.
          </Text>

          <View style={[s.field, focused && s.fieldFocused, !!error && s.fieldError]}>
            <Text style={s.flag}>{FLAG}</Text>
            <Text style={s.prefix}>{COUNTRY_CODE}</Text>
            <View style={s.divider} />
            <TextInput
              value={formatLocal(digits)}
              onChangeText={(t) => {
                setDigits(cleanDigits(t));
                if (error) setError('');
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmitEditing={submit}
              placeholder="70 12 34 56"
              placeholderTextColor="#B8B8BC"
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              autoComplete="tel-national"
              returnKeyType="done"
              selectionColor={colors.ink}
              autoFocus
              maxLength={LOCAL_LENGTH + 3}
              style={s.input}
              accessibilityLabel="Numéro de téléphone"
            />
          </View>

          {error ? (
            <Text style={s.error} accessibilityRole="alert">
              {error}
            </Text>
          ) : (
            <Text style={s.help}>Ton numéro n’est jamais montré aux autres élèves.</Text>
          )}
        </View>

        {/* Bouton */}
        <View style={s.footer}>
          <Pressable
            onPress={submit}
            disabled={!canSubmit}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit, busy }}
            style={({ pressed }) => [
              s.button,
              !canSubmit && s.buttonOff,
              pressed && canSubmit && s.buttonPressed,
            ]}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.buttonText}>Recevoir le code</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1, paddingHorizontal: 20 },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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

  body: { flex: 1, paddingTop: 36 },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -1.2,
    lineHeight: 36,
    color: colors.ink,
  },
  italic: {
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: 10,
    marginBottom: 28,
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
  },
  fieldFocused: { borderColor: colors.ink },
  fieldError: { borderColor: colors.danger },
  flag: { fontSize: 20 },
  prefix: { marginLeft: 8, fontSize: 15, fontWeight: '700', color: colors.ink },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: '#E6E6E2',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.ink,
    padding: 0,
  },

  help: { marginTop: 12, fontSize: 11, lineHeight: 16, color: colors.textSecondary },
  error: { marginTop: 12, fontSize: 12, lineHeight: 17, color: colors.danger },

  footer: { paddingTop: 12, paddingBottom: 12 },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOff: { opacity: 0.35 },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});