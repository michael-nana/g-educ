import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
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

const CODE_LENGTH = 6;
const TOTAL_STEPS = 3;
const RESEND_SECONDS = 60;
const VALID_MINUTES = 5;

/** +22670123456 → +226 70 12 34 56 */
function formatPhone(phone: string) {
  const match = phone.match(/^\+226(\d{8})$/);
  if (!match) return phone;
  return `+226 ${match[1].replace(/(\d{2})(?=\d)/g, '$1 ')}`;
}

/** 42 → 0:42 */
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function VerifyOtp() {
  const { phone = '' } = useLocalSearchParams<{ phone: string }>();

  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  // Compte à rebours avant de pouvoir renvoyer le code
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const verify = useCallback(
    async (value: string) => {
      setBusy(true);
      setError('');
      setNotice('');

      try {
        const result = await authService.verifyRegistrationOtp(phone, value);
        router.push({
          pathname: '/(auth)/complete-registration',
          params: { phone, verificationToken: result.verificationToken },
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Code invalide.');
        setCode('');
      } finally {
        setBusy(false);
      }
    },
    [phone],
  );

  // Vérifie automatiquement dès que les 6 chiffres sont saisis
  useEffect(() => {
    if (code.length === CODE_LENGTH && !busy) void verify(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  async function resend() {
    if (seconds > 0) return;

    setError('');
    setNotice('');

    try {
      await authService.requestRegistrationOtp(phone);
      setCode('');
      setSeconds(RESEND_SECONDS);
      setNotice('Un nouveau code vient de t’être envoyé.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Envoi impossible.');
    }
  }

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(auth)/register');
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
            accessibilityLabel={`Étape 2 sur ${TOTAL_STEPS}`}
          >
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <View key={i} style={[s.segment, i < 2 && s.segmentOn]} />
            ))}
          </View>
        </View>

        <View style={s.body}>
          <Text style={s.title}>
            Entre le <Text style={s.italic}>code</Text>
          </Text>

          <Text style={s.subtitle}>
            Envoyé au <Text style={s.phone}>{formatPhone(phone)}</Text>
          </Text>

          {/* 6 cases ; le vrai champ est invisible et couvre toute la rangée */}
          <View style={s.boxes}>
            {Array.from({ length: CODE_LENGTH }, (_, i) => {
              const digit = code[i];
              const isCurrent = focused && !busy && i === Math.min(code.length, CODE_LENGTH - 1);

              return (
                <View
                  key={i}
                  style={[s.box, digit ? s.boxFilled : isCurrent && s.boxCurrent]}
                >
                  <Text style={s.digit}>{digit ?? ''}</Text>
                </View>
              );
            })}

            <TextInput
              value={code}
              onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, CODE_LENGTH))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              maxLength={CODE_LENGTH}
              editable={!busy}
              autoFocus
              caretHidden
              style={s.hiddenInput}
              accessibilityLabel="Code à six chiffres"
            />
          </View>

          {/* Validité + renvoi */}
          <View style={s.meta}>
            <Text style={s.metaText}>Valable {VALID_MINUTES} minutes</Text>

            {seconds > 0 ? (
              <Text style={s.metaStrong}>Renvoyer dans {formatTime(seconds)}</Text>
            ) : (
              <Pressable onPress={resend} accessibilityRole="button">
                <Text style={s.metaLink}>Renvoyer le code</Text>
              </Pressable>
            )}
          </View>

          {busy && (
            <View style={s.busy}>
              <ActivityIndicator color={colors.ink} />
              <Text style={s.metaText}>Vérification…</Text>
            </View>
          )}

          {!!error && (
            <Text style={s.error} accessibilityRole="alert">
              {error}
            </Text>
          )}
          {!!notice && <Text style={s.notice}>{notice}</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1, paddingHorizontal: 20 },

  top: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingTop: 8 },
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
  phone: { color: colors.ink, fontWeight: '700' },

  boxes: { flexDirection: 'row', gap: 8 },
  box: {
    flex: 1,
    height: 62,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E6E6E2',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCurrent: { borderColor: colors.ink },
  boxFilled: { backgroundColor: colors.ink, borderColor: colors.ink },
  digit: { color: '#fff', fontSize: 26, fontWeight: '700' },
  hiddenInput: { ...StyleSheet.absoluteFill, opacity: 0 },

  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  metaText: { fontSize: 11, color: colors.textSecondary },
  metaStrong: { fontSize: 11, fontWeight: '700', color: colors.ink },
  metaLink: { fontSize: 12, fontWeight: '700', color: colors.ink },

  busy: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 24 },
  error: { marginTop: 20, fontSize: 12, lineHeight: 17, color: colors.danger },
  notice: { marginTop: 20, fontSize: 12, lineHeight: 17, color: colors.textSecondary },
});
