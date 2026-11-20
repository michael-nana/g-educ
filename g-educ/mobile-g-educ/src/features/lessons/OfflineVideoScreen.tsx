import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { Panel } from '../../components/ui/Panel';
import { Screen } from '../../components/ui/Screen';
import { VideoPlayer } from './VideoPlayer';

export default function OfflineVideoScreen() {
  const { title, uri } = useLocalSearchParams<{ title?: string; uri?: string }>();
  const validFile = typeof uri === 'string' && uri.startsWith('file://');

  return <Screen back title={title ?? 'Vidéo téléchargée'} subtitle="Disponible hors ligne">
    {validFile ? <VideoPlayer url={uri} /> : <Panel><Text>Le fichier vidéo téléchargé est introuvable.</Text></Panel>}
  </Screen>;
}
