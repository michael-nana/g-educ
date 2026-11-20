import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';
import { offlineDownloads } from '../../../services/offline-downloads';
import { useAppDialog } from '../../../components/ui/AppDialog';
import { colors } from '../../../theme/colors';

const PDFJS_VERSION = '3.11.174';

export default function PdfReader() {
  const { showDialog } = useAppDialog();
  const { id, url, title, localUri, lessonId } = useLocalSearchParams<{ id: string; url?: string; title?: string; localUri?: string; lessonId?: string }>();
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const validUrl = typeof url === 'string' && url.startsWith('https://');
  const validLocalFile = typeof localUri === 'string' && localUri.startsWith('file://');

  useEffect(() => {
    let active = true;
    setBase64('');
    setError('');
    setLoading(true);
    setPageCount(null);
    if (validLocalFile) {
      const file = new File(localUri);
      if (!file.exists) {
        setLoading(false);
        setError('Le PDF téléchargé est introuvable sur cet appareil.');
        return () => { active = false; };
      }
      file.base64().then((content) => { if (active) setBase64(content); })
        .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : 'Impossible de lire le PDF téléchargé.'); })
        .finally(() => { if (active) setLoading(false); });
      return () => { active = false; };
    }
    if (!validUrl) {
      setLoading(false);
      setError('Le lien sécurisé du document est invalide.');
      return () => { active = false; };
    }
    fetch(url).then(async response => {
      if (!response.ok) throw new Error(`Le serveur a répondu avec le code ${response.status}.`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      let binary = '';
      const chunkSize = 0x8000;
      for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
      }
      if (active) setBase64(globalThis.btoa(binary));
    }).catch(reason => {
      if (active) setError(reason instanceof Error ? reason.message : 'Vérifie ta connexion et réessaie.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, url, localUri]);

  const html = useMemo(() => base64 ? `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><style>*{box-sizing:border-box}body{margin:0;background:#f4f4f1;color:#111;font:14px sans-serif}#pages{padding:10px 0}canvas{display:block;width:100%;height:auto;margin:0 auto 12px;background:white;box-shadow:0 2px 10px #0002}.message{text-align:center;padding:24px}</style></head><body><main id="pages"><div class="message">Rendu du document…</div></main><script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js"></script><script>pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js';const data=Uint8Array.from(atob(${JSON.stringify(base64)}),c=>c.charCodeAt(0));pdfjsLib.getDocument({data}).promise.then(async pdf=>{document.getElementById('pages').replaceChildren();window.ReactNativeWebView.postMessage(JSON.stringify({type:'loaded',pages:pdf.numPages}));for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n);const base=page.getViewport({scale:1});const viewport=page.getViewport({scale:Math.max(1,Math.min(2,innerWidth/base.width))});const canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;document.getElementById('pages').appendChild(canvas);await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise}}).catch(e=>window.ReactNativeWebView.postMessage(JSON.stringify({type:'error',message:e.message||'PDF illisible'})));</script></body></html>` : '', [base64]);

  async function downloadByChoice() {
    if (!validUrl) return;
    setSaving(true);
    try {
      if (lessonId) {
        await offlineDownloads.download({
          key: id,
          lessonId,
          title: title || 'Document PDF',
          kind: 'PDF',
          url,
          mimeType: 'application/pdf',
        });
        showDialog('Téléchargement terminé', 'Ce PDF est maintenant disponible dans Cours > Hors-ligne.');
        return;
      }
      const safeName = (title || 'cours').replace(/[\\/:*?"<>|]/g, '_').trim().replace(/\.pdf$/i, '') || 'cours';
      const cachedFile = new File(Paths.cache, `${safeName}-${id}.pdf`);
      const file = await File.downloadFileAsync(url, cachedFile, { idempotent: true });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, { mimeType: 'application/pdf', dialogTitle: 'Enregistrer ou partager le PDF' });
      } else {
        showDialog('Partage indisponible', `Le PDF temporaire est disponible ici : ${file.uri}`);
      }
    } catch (reason) {
      showDialog('Téléchargement impossible', reason instanceof Error ? reason.message : 'Réessaie quand la connexion sera meilleure.');
    } finally { setSaving(false); }
  }

  function onWebMessage(event: { nativeEvent: { data: string } }) {
    try {
      const message = JSON.parse(event.nativeEvent.data) as { type: string; pages?: number; message?: string };
      if (message.type === 'loaded') setPageCount(message.pages ?? null);
      if (message.type === 'error') setError(message.message || 'Le fichier PDF ne peut pas être affiché.');
    } catch { setError('Le lecteur PDF a rencontré une erreur.'); }
  }

  return <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
    <View style={styles.header}>
      <Pressable accessibilityRole="button" accessibilityLabel="Retour au cours" onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
      <View style={styles.headerCopy}><Text numberOfLines={1} style={styles.title}>{title || 'Lecture du document'}</Text><Text style={styles.caption}>LECTEUR DE DOCUMENT · PDF{pageCount ? ` · ${pageCount} PAGES` : ''}</Text></View>
      {!validLocalFile && <Pressable accessibilityRole="button" accessibilityLabel={lessonId ? 'Enregistrer hors ligne' : 'Télécharger le PDF'} disabled={saving || !validUrl} onPress={downloadByChoice} style={[styles.download, (saving || !validUrl) && styles.disabled]}><Text style={styles.downloadText}>{saving ? '…' : lessonId ? '↓ Hors ligne' : '↓ Télécharger'}</Text></Pressable>}
    </View>
    {error ? <View style={styles.center}><Text style={styles.errorTitle}>Impossible d’afficher ce document</Text><Text style={styles.errorText}>{error}</Text><Pressable style={styles.retry} onPress={() => router.back()}><Text style={styles.retryText}>Retour</Text></Pressable></View>
      : <View style={styles.viewer}>
        {base64 ? <WebView originWhitelist={['*']} source={{ html }} onMessage={onWebMessage} javaScriptEnabled domStorageEnabled style={styles.pdf} /> : null}
        {loading && <View style={styles.loading}><ActivityIndicator color={colors.ink} size="large" /><Text style={styles.loadingText}>Ouverture du cours…</Text></View>}
      </View>}
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, header: { minHeight: 66, paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface }, back: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }, backText: { color: colors.ink, fontSize: 29, lineHeight: 31, marginTop: -3 }, headerCopy: { flex: 1 }, title: { color: colors.ink, fontSize: 14, fontWeight: '700' }, caption: { color: colors.textSecondary, fontSize: 8, fontWeight: '800', letterSpacing: 1, marginTop: 4 }, download: { height: 40, paddingHorizontal: 12, borderRadius: 14, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' }, downloadText: { color: '#fff', fontSize: 12, fontWeight: '700' }, disabled: { opacity: .45 }, viewer: { flex: 1 }, pdf: { flex: 1, backgroundColor: colors.background }, loading: { ...StyleSheet.absoluteFill, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: 12 }, loadingText: { color: colors.textSecondary, fontSize: 12 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 }, errorTitle: { color: colors.ink, fontSize: 17, fontWeight: '700', textAlign: 'center' }, errorText: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 8 }, retry: { backgroundColor: colors.ink, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, marginTop: 17 }, retryText: { color: '#fff', fontSize: 12, fontWeight: '700' } });
