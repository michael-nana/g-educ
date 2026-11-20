import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../theme/colors';

export type AppDialogButton = {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
};

type DialogState = { title: string; message?: string; buttons: AppDialogButton[] } | null;
type DialogContextValue = { showDialog: (title: string, message?: string, buttons?: AppDialogButton[]) => void };

const DialogContext = createContext<DialogContextValue | null>(null);

export function AppDialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState<DialogState>(null);

  const showDialog = useCallback((title: string, message?: string, buttons?: AppDialogButton[]) => {
    setDialog({ title, message, buttons: buttons?.length ? buttons : [{ text: 'Compris', style: 'default' }] });
  }, []);

  const closeDialog = useCallback(() => setDialog(null), []);
  const contextValue = useMemo(() => ({ showDialog }), [showDialog]);
  const hasDestructiveAction = dialog?.buttons.some((button) => button.style === 'destructive') ?? false;
  const normalizedTitle = dialog?.title.toLocaleLowerCase('fr') ?? '';
  const isPositive = ['termin', 'cré', 'enregistr', 'envoy', 'activ', 'modifi', 'retir'].some((word) => normalizedTitle.includes(word));
  const isError = ['impossible', 'invalide', 'refus', 'requis', 'manqu'].some((word) => normalizedTitle.includes(word));
  const icon = hasDestructiveAction ? 'warning-outline' : isPositive ? 'checkmark' : isError ? 'close-circle-outline' : 'information-outline';

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Modal
        visible={dialog !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeDialog}
      >
        {dialog && <View style={styles.backdrop}>
          <Pressable accessibilityLabel="Fermer la fenêtre" onPress={closeDialog} style={StyleSheet.absoluteFill} />
          <View accessibilityViewIsModal style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name={icon} size={23} color={colors.ink} />
            </View>
            <Text accessibilityRole="header" style={styles.title}>{dialog.title}</Text>
            {!!dialog.message && <Text style={styles.message}>{dialog.message}</Text>}
            <ScrollView style={styles.actions} contentContainerStyle={styles.actionContent} showsVerticalScrollIndicator={false}>
              {dialog.buttons.map((button, index) => {
                const cancel = button.style === 'cancel';
                const destructive = button.style === 'destructive';
                const single = dialog.buttons.length === 1;
                return <Pressable
                  key={`${button.text}-${index}`}
                  accessibilityRole="button"
                  onPress={() => {
                    closeDialog();
                    button.onPress?.();
                  }}
                  style={({ pressed }) => [
                    styles.action,
                    cancel && styles.actionSecondary,
                    destructive && styles.actionDestructive,
                    pressed && styles.actionPressed,
                  ]}
                >
                  {!single && <Ionicons name={destructive ? 'trash-outline' : cancel ? 'close-outline' : 'arrow-forward'} size={17} color={cancel ? colors.textSecondary : '#fff'} />}
                  <Text style={[styles.actionText, cancel && styles.actionTextSecondary]}>{button.text}</Text>
                </Pressable>;
              })}
            </ScrollView>
          </View>
        </View>}
      </Modal>
    </DialogContext.Provider>
  );
}

export function useAppDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useAppDialog doit être utilisé dans AppDialogProvider.');
  return context;
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.58)' },
  card: { width: '100%', maxWidth: 380, maxHeight: '88%', padding: 24, borderRadius: 28, backgroundColor: colors.surface, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 28, shadowOffset: { width: 0, height: 14 }, elevation: 14 },
  iconWrap: { width: 52, height: 52, borderRadius: 26, marginBottom: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.soft },
  title: { width: '100%', color: colors.ink, fontSize: 19, lineHeight: 25, fontWeight: '800', textAlign: 'center' },
  message: { width: '100%', color: colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  actions: { width: '100%', flexGrow: 0, marginTop: 20 },
  actionContent: { gap: 9, paddingBottom: 1 },
  action: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, paddingHorizontal: 16, borderRadius: radius.md, backgroundColor: colors.ink },
  actionSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  actionDestructive: { backgroundColor: '#222' },
  actionPressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  actionText: { color: '#fff', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  actionTextSecondary: { color: colors.ink },
});
