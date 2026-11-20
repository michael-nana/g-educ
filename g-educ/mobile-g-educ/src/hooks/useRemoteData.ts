import { useCallback, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { offlineCache } from '../services/offline-cache';

export function useRemoteData<T>(load: () => Promise<T>, _deps: readonly unknown[] = [], cacheKey?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const network = await NetInfo.fetch();
      if (network.isConnected === false || network.isInternetReachable === false) {
        const cached = cacheKey ? await offlineCache.readValue<T>(cacheKey) : null;
        if (cached !== null) {
          setData(cached);
          return;
        }
        throw new Error('Aucune connexion et aucune copie hors ligne de ces données.');
      }
      const fresh = await load();
      setData(fresh);
      if (cacheKey) void offlineCache.write(cacheKey, fresh).catch(() => undefined);
    } catch (err) {
      const cached = cacheKey ? await offlineCache.readValue<T>(cacheKey) : null;
      if (cached !== null) setData(cached);
      else setError(err instanceof Error ? err.message : 'Impossible de charger les données.');
    } finally {
      setLoading(false);
    }
  }, [load, cacheKey]);

  useEffect(() => { void Promise.resolve().then(reload); }, [reload]);
  return { data, loading, error, reload, setData };
}
