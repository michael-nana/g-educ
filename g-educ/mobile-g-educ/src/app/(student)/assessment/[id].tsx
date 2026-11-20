import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Screen } from '../../../components/ui/Screen';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { EmptyState, ErrorState, LoadingState } from '../../../components/ui/Feedback';
import { studentService } from '../../../services/student.service';
import { useRemoteData } from '../../../hooks/useRemoteData';
import { colors } from '../../../theme/colors';

export default function AssessmentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useCallback(() => studentService.assessment(id), [id]);
  const { data, loading, error, reload } = useRemoteData(load, [id]);
  const [correctionLoading, setCorrectionLoading] = useState(false);
  const [correctionError, setCorrectionError] = useState('');
  const duration = data?.durationSeconds ? Math.ceil(data.durationSeconds / 60) : data?.durationMinutes;
  const pdfExercise = data?.kind === 'EXERCICE' && data.exerciseFormat === 'PDF';
  async function showCorrection() {
    setCorrectionLoading(true);
    setCorrectionError('');
    try {
      const correction = await studentService.exerciseCorrection(id);
      router.push({ pathname: '/(student)/pdf/[id]', params: { id: `${id}-correction`, url: correction.downloadUrl, title: correction.name } });
    } catch (reason) {
      setCorrectionError(reason instanceof Error ? reason.message : 'La correction ne peut pas être ouverte.');
    } finally {
      setCorrectionLoading(false);
    }
  }
  return <Screen back title={data?.title ?? 'Évaluation'} subtitle={data?.chapter?.title ?? 'Prépare-toi, puis lance le quiz.'}>
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={reload} /> : !data ? <EmptyState title="Introuvable" body="Cette évaluation n’est plus disponible." /> : <>
      <View style={styles.hero}><Text style={styles.eyebrow}>{data.kind === 'EXERCICE' ? 'EXERCICE' : 'QUIZ'}</Text><Text style={styles.title}>{data.title}</Text><Text style={styles.copy}>{data.kind === 'EXERCICE' ? 'Lis l’énoncé et rédige ta réponse.' : 'Prends le temps de lire chaque question. Tes réponses seront corrigées après l’envoi.'}</Text></View>
      {!pdfExercise && <View style={styles.stats}><Panel style={styles.stat}><Text style={styles.value}>{data.questions?.length ?? 0}</Text><Text style={styles.label}>QUESTIONS</Text></Panel><Panel style={styles.stat}><Text style={styles.value}>{duration ? `${duration} min` : 'Libre'}</Text><Text style={styles.label}>DURÉE</Text></Panel>{data.passingPercent != null && <Panel style={styles.stat}><Text style={styles.value}>{data.passingPercent}%</Text><Text style={styles.label}>RÉUSSITE</Text></Panel>}</View>}
      {!!data.instructions && <Panel><Text style={styles.instructionTitle}>Consignes</Text><Text style={styles.instructions}>{data.instructions}</Text></Panel>}
      {pdfExercise ? <>
        <Panel style={{ marginTop: 12 }}><Text style={styles.instructionTitle}>Exercice dans ton cahier</Text><Text style={styles.instructions}>Lis l’énoncé PDF, puis traite l’exercice dans ton cahier. Ouvre la correction quand tu as terminé.</Text></Panel>
        <Button disabled={!data.exercisePdf?.downloadUrl} onPress={() => data.exercisePdf && router.push({ pathname: '/(student)/pdf/[id]', params: { id: `${id}-exercise`, url: data.exercisePdf.downloadUrl, title: data.exercisePdf.name } })} style={{ marginTop: 14 }}>Lire l’énoncé PDF</Button>
        <Button loading={correctionLoading} onPress={showCorrection} style={{ marginTop: 10 }}>Voir la correction maintenant</Button>
        {!!correctionError && <Text style={styles.error}>{correctionError}</Text>}
      </> : <Button onPress={() => router.push({ pathname: '/(student)/assessment/[id]/attempt', params: { id } })} style={{ marginTop: 14 }}>{data.kind === 'EXERCICE' ? 'Commencer l’exercice' : 'Commencer le quiz'}</Button>}
    </>}
  </Screen>;
}
const styles = StyleSheet.create({ hero: { backgroundColor: colors.ink, padding: 20, borderRadius: 22, marginBottom: 12 }, eyebrow: { color: '#B7B7B7', fontSize: 9, fontWeight: '800', letterSpacing: 1 }, title: { color: '#fff', fontSize: 21, fontWeight: '800', marginTop: 16 }, copy: { color: '#C1C1C1', fontSize: 12, lineHeight: 18, marginTop: 8 }, stats: { flexDirection: 'row', gap: 8, marginBottom: 12 }, stat: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7, paddingVertical: 14 }, value: { color: colors.ink, fontSize: 17, fontWeight: '800' }, label: { color: colors.textSecondary, fontSize: 8, fontWeight: '800', letterSpacing: .6, marginTop: 5 }, instructionTitle: { color: colors.ink, fontSize: 14, fontWeight: '700', marginBottom: 6 }, instructions: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 }, error: { color: colors.danger, marginTop: 10, fontSize: 12 } });
