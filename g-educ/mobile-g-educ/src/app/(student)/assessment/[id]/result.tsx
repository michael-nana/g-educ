import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { Screen } from '../../../../components/ui/Screen';
import { Panel } from '../../../../components/ui/Panel';
import { colors } from '../../../../theme/colors';

type Result = { score?: number; maxScore?: number };
export default function ResultScreen() {
  const { result } = useLocalSearchParams<{ result?: string }>();
  let data: Result = {};
  try { data = JSON.parse(result ?? '{}') as Result; } catch { /* Keep the fallback result. */ }
  const percent = typeof data.score === 'number' && typeof data.maxScore === 'number' && data.maxScore > 0 ? Math.round(data.score / data.maxScore * 100) : null;
  return <Screen title="Résultat" subtitle="Voici le résultat de ta tentative."><Panel><Text style={{ fontSize: 30, fontWeight: '700', color: colors.ink }}>{percent === null ? '—' : percent + ' %'}</Text><Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 8 }}>{typeof data.score === 'number' && typeof data.maxScore === 'number' ? data.score + ' / ' + data.maxScore + ' points' : 'Tentative enregistrée.'}</Text></Panel></Screen>;
}
