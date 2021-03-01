import useSymbolCandles from 'components/useSymbolCandles';
import Chart from './Chart';
import { Statistics, TradingParams } from 'models';

type TradingChartsProps = {
  args: {
    exchange: string;
    start: string;
    end: string;
    trainingSymbols: string[];
    validationSymbols?: string[];
  };
  config: TradingParams;
  symbolStats: {
    [symbol: string]: Statistics;
  };
};

export default function TradingCharts({ args, config, symbolStats }: TradingChartsProps) {
  const symbolCandles = useSymbolCandles({
    exchange: args.exchange,
    start: args.start,
    end: args.end,
    symbols: args.trainingSymbols.concat(args.validationSymbols ?? []),
    interval: config.trader.interval,
  });

  return (
    <>
      {args.trainingSymbols
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
          (args.validationSymbols ?? [])
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
