import { Directory, File, Paths } from 'expo-file-system';

const cacheDirectory = new Directory(Paths.document, 'g-educ-offline', 'cache');

function fileFor(key: string) {
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 150);
  return new File(cacheDirectory, `${safeKey}.json`);
}

export const offlineCache = {
  async readValue<T>(key: string): Promise<T | null> {
    try {
      const file = fileFor(key);
      if (!file.exists) return null;
      const cached = JSON.parse(await file.text()) as { value?: T };
      return cached.value ?? null;
    } catch {
      return null;
    }
  },
  async write<T>(key: string, value: T): Promise<void> {
    if (!cacheDirectory.exists) cacheDirectory.create({ idempotent: true, intermediates: true });
    const file = fileFor(key);
    if (!file.exists) file.create({ intermediates: true });
    await file.write(JSON.stringify({ savedAt: new Date().toISOString(), value }));
  },
};
