import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, radius } from '../../theme/colors';
export function Panel({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.panel, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  panel: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: 19, marginBottom: 13, borderWidth: 1, borderColor: '#ECECE8', shadowColor: '#111', shadowOpacity: 0.035, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 1 },
});
