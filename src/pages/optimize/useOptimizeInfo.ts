import { useEffect, useState } from 'react';
import { RUST_API_URL } from 'api';
import { useError } from 'error';
import { fetchJson } from 'fetch';

type OptimizeInfo = {
  evaluationStatistics: string[];
  evaluationAggregations: string[];
};

let optimizeInfoCache: OptimizeInfo | null = null;

export default function useOptimizeInfo(): OptimizeInfo | null {
  const [optimizeInfo, setOptimizeInfo] = useState<OptimizeInfo | null>(null);
  const [, setError] = useError();

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setOptimizeInfo(await fetchOptimizeInfo(abortController.signal));
      } catch (error) {
        console.error(error);
        setError(error);
      }
    })();
    return () => abortController.abort();
  }, [setError]);

  return optimizeInfo;
}

async function fetchOptimizeInfo(signal: AbortSignal): Promise<OptimizeInfo> {
  if (optimizeInfoCache === null) {
    optimizeInfoCache = await fetchJson<OptimizeInfo>(
      'GET',
      RUST_API_URL + '/optimize',
      undefined,
      signal,
    );
  }
  return optimizeInfoCache;
}
