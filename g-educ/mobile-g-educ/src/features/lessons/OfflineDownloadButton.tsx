import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { offlineDownloads, type OfflineContentKind } from '../../services/offline-downloads';
import { useAppDialog } from '../../components/ui/AppDialog';

type Props = {
  downloadKey: string;
  lessonId: string;
  title: string;
  kind: OfflineContentKind;
  url?: string | null;
  mimeType?: string | null;
};

export function OfflineDownloadButton({ downloadKey, lessonId, title, kind, url, mimeType }: Props) {
  const { showDialog } = useAppDialog();
  const [available, setAvailable] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    offlineDownloads.find(downloadKey).then((item) => {
      if (active) setAvailable(Boolean(item));
    }).catch(() => undefined);
    return () => { active = false; };
  }, [downloadKey]);

  async function download() {
    if (!url) return;
    setBusy(true);
    try {
      await offlineDownloads.download({
        key: downloadKey,
        lessonId,
        title,
        kind,
        url,
        mimeType: mimeType ?? (kind === 'PDF' ? 'application/pdf' : 'video/mp4'),
      });
      setAvailable(true);
      showDialog('Téléchargement terminé', 'Ce contenu est maintenant disponible dans Cours > Hors-ligne.');
    } catch (error) {
      showDialog('Téléchargement impossible', error instanceof Error ? error.message : 'Vérifie ta connexion et réessaie.');
    } finally {
      setBusy(false);
    }
  }

  return <Button variant="light" onPress={download} loading={busy} disabled={busy || available || !url}>
    {available ? 'Disponible hors ligne ✓' : 'Télécharger pour hors ligne'}
  </Button>;
}
