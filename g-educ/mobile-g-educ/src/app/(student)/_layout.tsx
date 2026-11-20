import { Redirect, Stack } from 'expo-router';
import { LoadingState } from '../../components/ui/Feedback';
import { useAuth } from '../../state/AuthProvider';
import { colors } from '../../theme/colors';

export default function StudentLayout() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState />;
  if (!user) return <Redirect href="/(auth)/login" />;
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="lesson/[id]" />
    <Stack.Screen name="subject/[id]" />
    <Stack.Screen name="chapter/[id]" />
    <Stack.Screen name="progress" />
    <Stack.Screen name="offline/[id]" />
    <Stack.Screen name="streak" />
    <Stack.Screen name="notifications" />
    <Stack.Screen name="pdf/[id]" />
    <Stack.Screen name="assessment/[id]" />
    <Stack.Screen name="assessment/[id]/attempt" />
    <Stack.Screen name="assessment/[id]/result" />
    <Stack.Screen name="attempts/[id]" />
  </Stack>;
}
