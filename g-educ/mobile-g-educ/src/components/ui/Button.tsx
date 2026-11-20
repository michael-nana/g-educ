import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { colors, radius } from '../../theme/colors';

type Props = PropsWithChildren<{ onPress: () => void; disabled?: boolean; loading?: boolean; variant?: 'dark' | 'light'; style?: ViewStyle }>;
export function Button({ children, onPress, disabled, loading, variant = 'dark', style }: Props) {
  const dark = variant === 'dark';
  return (
    <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.button, dark ? styles.dark : styles.light, pressed && styles.pressed, (disabled || loading) && styles.disabled, style]}>
      {loading ? <ActivityIndicator color={dark ? '#fff' : colors.ink} /> : <Text style={[styles.label, dark ? styles.darkLabel : styles.lightLabel]}>{children}</Text>}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { minHeight: 54, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  dark: { backgroundColor: colors.ink, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 9, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  light: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  darkLabel: { color: '#fff' },
  lightLabel: { color: colors.ink },
  pressed: { transform: [{ scale: 0.985 }], opacity: 0.88 },
  disabled: { opacity: 0.55 },
});
