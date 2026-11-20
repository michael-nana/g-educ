import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Field } from '../../components/ui/Field';
import { Panel } from '../../components/ui/Panel';
import { Screen } from '../../components/ui/Screen';
import { authService } from '../../services/auth.service';
import { colors } from '../../theme/colors';

export default function ForgotPassword() {
  const [phone, setPhone] = useState(''); const [code, setCode] = useState(''); const [password, setPassword] = useState(''); const [requested, setRequested] = useState(false); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function request() { setBusy(true); try { await authService.forgotPassword(phone); setRequested(true); setMessage('Le code a été envoyé. Vérifie tes messages.'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Envoi impossible.'); } finally { setBusy(false); } }
  async function reset() { setBusy(true); try { await authService.resetPassword(phone, code, password); setMessage('Mot de passe modifié. Tu peux te connecter.'); } catch (e) { setMessage(e instanceof Error ? e.message : 'Réinitialisation impossible.'); } finally { setBusy(false); } }
  return <Screen title="Nouveau mot de passe" subtitle="Nous allons t’aider à retrouver l’accès à ton compte.">
    <Panel style={styles.info}><View style={styles.infoMark}><Text style={styles.infoMarkText}>?</Text></View><Text style={styles.infoText}>{requested ? 'Entre le code reçu puis choisis un nouveau mot de passe.' : 'Saisis le numéro associé à ton compte. Tu recevras un code de vérification.'}</Text></Panel>
    <Field label="Numéro de téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+226 70 12 34 56" />
    {requested && <><Field label="Code reçu" value={code} onChangeText={setCode} keyboardType="number-pad" placeholder="000000" maxLength={6}/><Field label="Nouveau mot de passe" value={password} onChangeText={setPassword} secureTextEntry placeholder="8 caractères minimum" autoComplete="new-password"/></>}
    {!!message && <Text style={styles.message}>{message}</Text>}
    <Button onPress={requested ? reset : request} loading={busy}>{requested ? 'Enregistrer mon mot de passe  →' : 'Envoyer un code  →'}</Button>
  </Screen>;
}
const styles = StyleSheet.create({ info: { flexDirection: 'row', alignItems: 'center', gap: 12 }, infoMark: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' }, infoMarkText: { color: '#fff', fontSize: 17, fontWeight: '700' }, infoText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, message: { color: colors.textSecondary, backgroundColor: colors.surface, padding: 13, borderRadius: 12, fontSize: 12, marginBottom: 14 } });
