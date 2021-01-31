import { useEffect, useState } from 'react';
import { fetchJson } from 'fetch';

type OptimizeInfo = {
  evaluationStatistics: string[],
  evaluationAggregations: string[],
};

let optimizeInfoCache: OptimizeInfo | null = null;

export default function useOptimizeInfo() {
  const [optimizeInfo, setOptimizeInfo] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    (async () => setOptimizeInfo(await fetchOptimizeInfo(abortController.signal)))();
    return () => abortController.abort();
  }, []);

  return optimizeInfo;
}

async function fetchOptimizeInfo(signal: AbortSignal): Promise<OptimizeInfo> {
  if (optimizeInfoCache === null) {
    optimizeInfoCache = await fetchJson<OptimizeInfo>('GET', '/optimize', null, signal);
  }
  return optimizeInfoCache;
}
