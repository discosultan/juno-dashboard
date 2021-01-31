import { useEffect, useState } from 'react';
import { fetchJson } from 'fetch';
import { Candle } from 'models';

const candleCache: { [key: string]: Candle[] } = {};

type SymbolCandleParams = {
  exchange: string;
  interval: string;
  start: string;
  end: string;
  symbols: string[];
};

type SymbolCandles = { [symbol: string]: Candle[] };

export default function useSymbolCandles(args: SymbolCandleParams): SymbolCandles {
  const [symbolCandles, setSymbolCandles] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setSymbolCandles(await fetchCandles(args, abortController.signal));
    })();
    return () => abortController.abort();
  }, [args]);

  return symbolCandles;
}

async function fetchCandles(args: SymbolCandleParams, signal: AbortSignal): Promise<SymbolCandles> {
  const result: SymbolCandles = {};
  const missingSymbols: string[] = [];

  for (const symbol of args.symbols) {
    const candles = candleCache[composeKey(args, symbol)];
    if (candles === undefined) {
      missingSymbols.push(symbol);
    } else {
      result[symbol] = candles;
    }
  }

  if (missingSymbols.length > 0) {
    const missingCandles = await fetchJson<SymbolCandles>(
      'POST',
      '/candles',
      {
        exchange: args.exchange,
        interval: args.interval,
        start: args.start,
        end: args.end,
        symbols: missingSymbols,
      },
      signal,
    );
    for (const [symbol, candles] of Object.entries(missingCandles)) {
      result[symbol] = candles;
      candleCache[composeKey(args, symbol)] = candles;
    }
  }

  return result;
}

function composeKey(args: SymbolCandleParams, symbol: string): string {
  return `${args.exchange}_${args.interval}_${symbol}_${args.start}_${args.end}`;
}
