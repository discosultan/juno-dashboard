import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import useLocalStorageState from 'use-local-storage-state';
import ErrorSnack from 'components/ErrorSnack';
import History, { HistoryItem } from 'components/History';
import SplitPane from 'components/SplitPane';
import TradingResult, { TradingResultValueProps } from 'components/TradingResult';
import { fetchJson } from 'fetch';
import Controls from './Controls';
import { Statistics } from 'models';
import { BacktestParams } from './models';

type BacktestResult = {
  symbolStats: { [symbol: string]: Statistics };
};

export default function Dashboard() {
  const [tradingResult, setTradingResult] = useState<TradingResultValueProps | null>(null);
  const [history, setHistory] = useLocalStorageState<HistoryItem<TradingResultValueProps>[]>(
    'backtest_dashboard_history',
    [],
  );
  const [error, setError] = useState<Error | null>(null);

  async function backtest(args: BacktestParams): Promise<void> {
    try {
      const result = await fetchJson<BacktestResult>(
        'POST',
        `/backtest/${args.strategy}/${args.stopLoss}/${args.takeProfit}`,
        args,
      );

      const tradingResult: TradingResultValueProps = {
        args: {
          exchange: args.exchange,
          start: args.start,
          end: args.end,
          trainingSymbols: args.symbols,
          validationSymbols: [],
        },
        config: {
          strategy: {
            type: args.strategy,
            ...args.strategyParams,
          },
          stopLoss: {
            type: args.stopLoss,
            ...args.stopLossParams,
          },
          takeProfit: {
            type: args.takeProfit,
            ...args.takeProfitParams,
          },
          trader: {
            interval: args.interval,
            missedCandlePolicy: args.missedCandlePolicy,
          },
        },
        symbolStats: result.symbolStats,
        title: args.strategy,
      };

      const historyItem = {
        time: new Date().toISOString(),
        value: tradingResult,
      };
      if (history.length === 10) {
        setHistory([historyItem, ...history.slice(0, history.length - 1)]);
      } else {
        setHistory([historyItem, ...history]);
      }

      setTradingResult(tradingResult);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <SplitPane
        left={
          <>
            <Box p={1}>
              <History
                id="backtest-history"
                label="Backtest History"
                value={tradingResult}
                history={history}
                format={(tradingResult) =>
                  (tradingResult && tradingResult.config.strategy.type) || ''
                }
                onChange={(tradingResult) => setTradingResult(tradingResult)}
              />
            </Box>
            <Divider />
            <Box p={1}>
              <Controls onBacktest={backtest} />
            </Box>
          </>
        }
        right={tradingResult && <TradingResult value={tradingResult} />}
      />
      <ErrorSnack error={error} setError={setError} />
    </>
  );
}
