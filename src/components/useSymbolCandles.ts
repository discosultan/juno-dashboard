import { useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Candle } from "models";
import { fetchJson } from "fetch";
import { useError } from "error";
import { PYTHON_API_URL } from "api";

const candleCache: { [key: string]: Candle[] } = {};

type SymbolCandleParams = {
  exchange: string;
  interval: number;
  start: number;
  end: number;
  symbols: string[];
};

type SymbolCandles = { [symbol: string]: Candle[] };

export default function useSymbolCandles(args: SymbolCandleParams): SymbolCandles {
  const [symbolCandles, setSymbolCandles] = useState({});
  const [, setError] = useError();

  useDeepCompareEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setSymbolCandles(await fetchCandles(args, abortController.signal));
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    })();
    return () => abortController.abort();
  }, [args, setError]);

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
    const tasks = [];
    for (const missingSymbol of missingSymbols) {
      tasks.push(fetchSymbolCandles(args, missingSymbol, signal));
    }
    const missingCandles = await Promise.all(tasks);
    for (let i = 0; i < missingSymbols.length; i++) {
      const symbol = missingSymbols[i];
      const candles = missingCandles[i];
      result[symbol] = candles;
      candleCache[composeKey(args, symbol)] = candles;
    }
  }

  return result;
}

async function fetchSymbolCandles(
  args: SymbolCandleParams,
  symbol: string,
  signal: AbortSignal,
): Promise<Candle[]> {
  return await fetchJson<Candle[]>(
    "POST",
    PYTHON_API_URL + "/candles",
    undefined,
    {
      exchange: args.exchange,
      interval: args.interval,
      start: args.start,
      end: args.end,
      symbol,
    },
    signal,
  );
}

function composeKey(args: SymbolCandleParams, symbol: string): string {
  return `${args.exchange}_${args.interval}_${symbol}_${args.start}_${args.end}`;
}
