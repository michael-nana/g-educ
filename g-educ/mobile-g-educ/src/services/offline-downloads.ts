import { Directory, File, Paths } from 'expo-file-system';

export type OfflineContentKind = 'PDF' | 'VIDEO';

export interface OfflineDownload {
  key: string;
  lessonId: string;
  title: string;
  kind: OfflineContentKind;
  uri: string;
  mimeType: string;
  sizeBytes: number;
  downloadedAt: string;
}

type OfflineDownloadInput = Omit<OfflineDownload, 'uri' | 'sizeBytes' | 'downloadedAt'> & { url: string };

const offlineDirectory = new Directory(Paths.document, 'g-educ-offline');
const indexFile = new File(offlineDirectory, 'index.json');

async function ensureDirectory() {
  if (!offlineDirectory.exists) offlineDirectory.create({ idempotent: true, intermediates: true });
}

async function readIndex(): Promise<OfflineDownload[]> {
  await ensureDirectory();
  if (!indexFile.exists) return [];
  try {
    const parsed = JSON.parse(await indexFile.text()) as OfflineDownload[];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.uri === 'string') : [];
  } catch {
    return [];
  }
}

async function writeIndex(items: OfflineDownload[]) {
  await ensureDirectory();
  if (!indexFile.exists) indexFile.create({ intermediates: true });
  await indexFile.write(JSON.stringify(items));
}

function filenameFor(key: string, kind: OfflineContentKind) {
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100);
  return `${safeKey}.${kind === 'PDF' ? 'pdf' : 'mp4'}`;
}

export const offlineDownloads = {
  async list(): Promise<OfflineDownload[]> {
    const items = await readIndex();
    const existing = items.filter((item) => new File(item.uri).exists);
    if (existing.length !== items.length) await writeIndex(existing);
    return existing.sort((a, b) => b.downloadedAt.localeCompare(a.downloadedAt));
  },

  async find(key: string) {
    return (await this.list()).find((item) => item.key === key) ?? null;
  },

  async download(input: OfflineDownloadInput): Promise<OfflineDownload> {
    if (!input.url.startsWith('https://')) throw new Error('Le lien de téléchargement est invalide.');
    await ensureDirectory();
    const destination = new File(offlineDirectory, filenameFor(input.key, input.kind));
    const downloaded = await File.downloadFileAsync(input.url, destination, { idempotent: true });
    const entry: OfflineDownload = {
      key: input.key,
      lessonId: input.lessonId,
      title: input.title,
      kind: input.kind,
      uri: downloaded.uri,
      mimeType: input.mimeType,
      sizeBytes: downloaded.size ?? 0,
      downloadedAt: new Date().toISOString(),
    };
    const items = await readIndex();
    await writeIndex([entry, ...items.filter((item) => item.key !== entry.key)]);
    return entry;
  },

  async remove(key: string) {
    const items = await readIndex();
    const removed = items.find((item) => item.key === key);
    if (removed) {
      const file = new File(removed.uri);
      if (file.exists) file.delete();
    }
    await writeIndex(items.filter((item) => item.key !== key));
  },
};
