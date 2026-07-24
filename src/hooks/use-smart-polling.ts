'use client';

import { useCallback, useEffect, useState } from 'react';

const MAX_DELAY_MS = 10 * 60_000;

type SmartPollingOptions<T> = {
  initialData: T;
  fetcher: () => Promise<T>;
  intervalMs: number;
  refreshOnMount?: boolean;
};

export function useSmartPolling<T>({
  initialData,
  fetcher,
  intervalMs,
  refreshOnMount = true,
}: SmartPollingOptions<T>) {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failureCount, setFailureCount] = useState(0);
  const [lastSuccessAt, setLastSuccessAt] = useState<string | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);

  const refresh = useCallback(() => {
    setRefreshNonce((value) => value + 1);
  }, []);

  useEffect(() => {
    let disposed = false;
    let active = false;
    let failures = 0;
    let timer: number | null = null;

    function clearTimer() {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function schedule() {
      clearTimer();
      if (disposed || document.hidden) return;
      const delay = Math.min(intervalMs * 2 ** failures, MAX_DELAY_MS);
      timer = window.setTimeout(() => {
        void run();
      }, delay);
    }

    async function run() {
      if (disposed || active || document.hidden) return;
      active = true;
      setIsRefreshing(true);

      try {
        const nextData = await fetcher();
        if (disposed) return;
        failures = 0;
        setData(nextData);
        setFailureCount(0);
        setLastSuccessAt(new Date().toISOString());
      } catch {
        if (disposed) return;
        failures += 1;
        setFailureCount(failures);
      } finally {
        active = false;
        if (!disposed) {
          setIsRefreshing(false);
          schedule();
        }
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        clearTimer();
      } else {
        void run();
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    if (refreshOnMount || refreshNonce > 0) void run();
    else schedule();

    return () => {
      disposed = true;
      clearTimer();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [fetcher, intervalMs, refreshNonce, refreshOnMount]);

  return {
    data,
    isRefreshing,
    failureCount,
    isStale: failureCount > 0,
    isOffline: failureCount >= 5,
    lastSuccessAt,
    refresh,
  };
}
