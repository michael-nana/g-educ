import NetInfo from '@react-native-community/netinfo';
import { Directory, File, Paths } from 'expo-file-system';
import { createClientId } from '../utils/ids';
import { offlineCache } from './offline-cache';
import { studentService } from './student.service';
import type { Lesson } from './types';

type PendingLessonProgress = {
  lessonId: string;
  progressPercent: number;
  lastPositionSeconds?: number;
  clientId: string;
  updatedAt: string;
};

type ProgressSyncResponse = Awaited<ReturnType<typeof studentService.saveLessonProgress>>;
type SyncResult = { synced: number; pending: number; failed?: boolean; lessonPending?: boolean; lastSync?: { clientId: string; response: ProgressSyncResponse } };

const syncDirectory = new Directory(Paths.document, 'g-educ-offline', 'sync');
const inFlight = new Map<string, Promise<SyncResult>>();
let queueMutations = Promise.resolve();

function safeName(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
}

function queueFile(userId: string) {
  return new File(syncDirectory, `${safeName(userId)}-progress.json`);
}

function serializeQueueMutation<T>(action: () => Promise<T>): Promise<T> {
  const result = queueMutations.then(action);
  queueMutations = result.then(() => undefined, () => undefined);
  return result;
}

async function readQueue(userId: string): Promise<PendingLessonProgress[]> {
  try {
    const file = queueFile(userId);
    if (!file.exists) return [];
    const parsed = JSON.parse(await file.text()) as PendingLessonProgress[];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.lessonId === 'string') : [];
  } catch {
    return [];
  }
}

async function writeQueue(userId: string, items: PendingLessonProgress[]) {
  if (!syncDirectory.exists) syncDirectory.create({ idempotent: true, intermediates: true });
  const file = queueFile(userId);
  if (!file.exists) file.create({ intermediates: true });
  await file.write(JSON.stringify(items));
}

async function updateCachedProgress(userId: string, item: PendingLessonProgress) {
  const key = `student-${userId}-lesson-${item.lessonId}`;
  const lesson = await offlineCache.readValue<Lesson>(key);
  if (!lesson) return;
  const previous = lesson.myProgress;
  await offlineCache.write(key, {
    ...lesson,
    myProgress: {
      progressPercent: Math.max(previous?.progressPercent ?? 0, item.progressPercent),
      lastPositionSeconds: item.lastPositionSeconds ?? previous?.lastPositionSeconds,
      completedAt: previous?.completedAt ?? null,
    },
  });
}

async function syncQueue(userId: string): Promise<SyncResult> {
  const network = await NetInfo.fetch();
  if (network.isConnected === false || network.isInternetReachable === false) {
    return { synced: 0, pending: (await readQueue(userId)).length };
  }

  let synced = 0;
  let lastSync: SyncResult['lastSync'];
  while (true) {
    const item = (await readQueue(userId))[0];
    if (!item) break;
    let response: ProgressSyncResponse;
    try {
      response = await studentService.saveLessonProgress(item.lessonId, {
        progressPercent: item.progressPercent,
        ...(item.lastPositionSeconds !== undefined && { lastPositionSeconds: item.lastPositionSeconds }),
        clientId: item.clientId,
      });
    } catch {
      return { synced, pending: (await readQueue(userId)).length, failed: true, ...(lastSync && { lastSync }) };
    }
    lastSync = { clientId: item.clientId, response };
    await serializeQueueMutation(async () => {
      const current = await readQueue(userId);
      await writeQueue(userId, current.filter((queued) => queued.lessonId !== item.lessonId || queued.updatedAt !== item.updatedAt));
    });
    synced += 1;
  }
  return { synced, pending: (await readQueue(userId)).length, ...(lastSync && { lastSync }) };
}

export const offlineSync = {
  async enqueueLessonProgress(userId: string, lessonId: string, progressPercent: number, lastPositionSeconds?: number) {
    const queued = await serializeQueueMutation(async () => {
      const items = await readQueue(userId);
      const previous = items.find((item) => item.lessonId === lessonId);
      const next: PendingLessonProgress = {
        lessonId,
        progressPercent: Math.max(previous?.progressPercent ?? 0, progressPercent),
        ...(lastPositionSeconds !== undefined
          ? { lastPositionSeconds }
          : previous?.lastPositionSeconds !== undefined && { lastPositionSeconds: previous.lastPositionSeconds }),
        clientId: previous?.clientId ?? createClientId(),
        updatedAt: `${new Date().toISOString()}-${createClientId()}`,
      };
      await writeQueue(userId, [next, ...items.filter((item) => item.lessonId !== lessonId)]);
      return next;
    });
    await updateCachedProgress(userId, queued);
    let result = await this.syncPending(userId);
    let lessonPending = (await readQueue(userId)).some((item) => item.lessonId === lessonId);
    if (lessonPending && !result.failed) {
      result = await this.syncPending(userId);
      lessonPending = (await readQueue(userId)).some((item) => item.lessonId === lessonId);
    }
    return { ...result, lessonPending, ...(result.lastSync?.clientId !== queued.clientId && { lastSync: undefined }) };
  },

  async syncPending(userId: string): Promise<SyncResult> {
    const current = inFlight.get(userId);
    if (current) return current;
    const task = syncQueue(userId).catch(async () => ({ synced: 0, pending: (await readQueue(userId)).length, failed: true }));
    inFlight.set(userId, task);
    try {
      return await task;
    } finally {
      if (inFlight.get(userId) === task) inFlight.delete(userId);
    }
  },

  start(userId: string) {
    void this.syncPending(userId);
    return NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable !== false) void this.syncPending(userId);
    });
  },
};
