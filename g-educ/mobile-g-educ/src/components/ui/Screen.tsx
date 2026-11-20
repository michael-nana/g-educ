import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/colors';

type Props = PropsWithChildren<{ title?: string; subtitle?: string; right?: ReactNode; scroll?: boolean; back?: boolean }>;
export function Screen({ children, title, subtitle, right, scroll = true, back = false }: Props) {
  const content = (
    <View style={styles.content}>
      {(title || subtitle || right) && (
        <View style={styles.heading}>
          {back && <Pressable accessibilityRole="button" accessibilityLabel="Retour" onPress={() => router.canGoBack() ? router.back() : router.replace('/(student)/(tabs)')} style={styles.back}><Text style={styles.backArrow}>‹</Text></Pressable>}
          <View style={styles.headingCopy}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {right}
        </View>
      )}
      {children}
    </View>
  );
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1 },
  content: { paddingHorizontal: spacing.xl, paddingTop: 18, paddingBottom: 36, width: '100%', maxWidth: 640, alignSelf: 'center' },
  heading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, marginBottom: 23 },
  back: { width: 40, height: 40, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  backArrow: { color: colors.ink, fontSize: 29, lineHeight: 31, marginTop: -3 },
  headingCopy: { flex: 1 },
  eyebrow: { color: colors.textSecondary, fontSize: 9, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: '700', letterSpacing: -1.3, lineHeight: 37, color: colors.ink },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 7, lineHeight: 20 },
});
