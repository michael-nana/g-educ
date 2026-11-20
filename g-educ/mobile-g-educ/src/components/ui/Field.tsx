import { StyleSheet, Text, TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { colors, radius } from '../../theme/colors';
type Props = TextInputProps & { label: string; error?: string; containerStyle?: ViewStyle };
export function Field({ label, error, containerStyle, ...props }: Props) {
  return <View style={[styles.wrap, containerStyle]}><Text style={styles.label}>{label}</Text><TextInput {...props} placeholderTextColor={colors.muted} selectionColor={colors.ink} style={[styles.input, props.multiline && styles.multiline, error && styles.invalid, props.style]} />{error && <Text style={styles.error}>{error}</Text>}</View>;
}
const styles = StyleSheet.create({ wrap: { marginBottom: 17 }, label: { fontSize: 12, fontWeight: '700', color: colors.ink, marginBottom: 8, letterSpacing: 0.1 }, input: { minHeight: 54, paddingHorizontal: 16, backgroundColor: '#FAFAF8', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, fontSize: 15, color: colors.ink }, multiline: { height: 108, paddingTop: 14, textAlignVertical: 'top' }, invalid: { borderColor: colors.danger }, error: { color: colors.danger, fontSize: 12, marginTop: 6 } });
