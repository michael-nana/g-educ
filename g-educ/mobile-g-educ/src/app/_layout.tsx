import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../state/AuthProvider';
import { AppDialogProvider } from '../components/ui/AppDialog';
import { colors } from '../theme/colors';
export default function RootLayout(){return <AuthProvider><AppDialogProvider><StatusBar style="dark"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:colors.background}}}><Stack.Screen name="(auth)"/><Stack.Screen name="(student)"/></Stack></AppDialogProvider></AuthProvider>}

