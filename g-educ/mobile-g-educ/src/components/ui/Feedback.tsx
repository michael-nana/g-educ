import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../theme/colors';

export function LoadingState() {
  return <View style={styles.loading}><ActivityIndicator size="small" color={colors.ink} /><Text style={styles.muted}>Chargement en cours…</Text></View>;
}
export function EmptyState({ title, body }: { title: string; body: string }) {
  return <View style={styles.empty}><View style={styles.emptyMark}><Text style={styles.emptyMarkText}>G</Text></View><Text style={styles.title}>{title}</Text><Text style={styles.muted}>{body}</Text></View>;
}
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <View style={styles.error}><View style={styles.errorMark}><Text style={styles.errorMarkText}>!</Text></View><View style={styles.errorCopy}><Text style={styles.errorTitle}>Impossible de charger</Text><Text style={styles.errorText}>{message}</Text>{onRetry && <Pressable onPress={onRetry} style={styles.retryButton}><Text style={styles.retry}>Réessayer  ↗</Text></Pressable>}</View></View>;
}
const styles = StyleSheet.create({
  loading: { minHeight: 108, alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, marginBottom: 12 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 15, gap: 7 }, emptyMark: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }, emptyMarkText: { color: colors.ink, fontFamily: 'Georgia', fontSize: 20, fontStyle: 'italic' },
  title: { fontSize: 14, fontWeight: '700', color: colors.ink, textAlign: 'center' }, muted: { fontSize: 11, color: colors.textSecondary, textAlign: 'center', lineHeight: 17, maxWidth: 270 },
  error: { flexDirection: 'row', alignItems: 'flex-start', gap: 11, padding: 14, backgroundColor: colors.dangerSoft, borderWidth: 1, borderColor: '#F0D5D2', borderRadius: radius.md, marginBottom: 12 }, errorMark: { height: 27, width: 27, borderRadius: 10, backgroundColor: '#F7DBD8', alignItems: 'center', justifyContent: 'center' }, errorMarkText: { color: colors.danger, fontSize: 14, fontWeight: '800' }, errorCopy: { flex: 1 }, errorTitle: { color: colors.danger, fontWeight: '700', fontSize: 12 }, errorText: { color: '#873D38', fontSize: 11, lineHeight: 16, marginTop: 4 }, retryButton: { alignSelf: 'flex-start', marginTop: 8 }, retry: { fontSize: 11, color: colors.ink, fontWeight: '700' },
});
