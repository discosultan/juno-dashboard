import useSymbolCandles from 'components/useSymbolCandles';
import Chart from './Chart';
import { Statistics, TradingParams } from 'models';

type TradingChartsProps = {
  input: {
    exchange: string;
    start: string;
    end: string;
    trainingSymbols: string[];
    validationSymbols?: string[];
    trading: TradingParams;
  };
  output: {
    symbolStats: { [symbol: string]: Statistics };
  };
};

export default function TradingCharts({ input, output }: TradingChartsProps) {
  const symbolCandles = useSymbolCandles({
    exchange: input.exchange,
    start: input.start,
    end: input.end,
    symbols: input.trainingSymbols.concat(input.validationSymbols ?? []),
    interval: input.trading.trader.interval,
  });
  const symbolStats = output.symbolStats;

  return (
    <>
      {input.trainingSymbols
        .filter((symbol) => symbol in symbolCandles)
        .map((symbol) => (
          <Chart
            key={symbol}
            symbol={symbol}
            candles={symbolCandles[symbol]}
            stats={symbolStats[symbol].core}
            positions={symbolStats[symbol].positions}
          />
        ))
        .concat(
          (input.validationSymbols ?? [])
            .filter((symbol) => symbol in symbolCandles)
            .map((symbol) => (
              <Chart
                key={symbol}
                symbol={`${symbol} (v)`}
                candles={symbolCandles[symbol]}
                stats={symbolStats[symbol].core}
                positions={symbolStats[symbol].positions}
              />
            )),
        )}
    </>
  );
}
