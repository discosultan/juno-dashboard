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
import Generations from './Generations';
import { EvolutionStats, GenerationsInfo, OptimizeParams } from './models';

export default function Dashboard() {
  const [gensInfo, setGensInfo] = useState<GenerationsInfo | null>(null);
  const [selectedGenInfo, setSelectedGenInfo] = useState<TradingResultValueProps | null>(null);
  const [history, setHistory] = useLocalStorageState<HistoryItem<GenerationsInfo>[]>(
    'optimization_dashboard_history',
    [],
  );
  const [error, setError] = useState<Error | null>(null);

  function processGensInfo(gensInfo: GenerationsInfo): void {
    setGensInfo(gensInfo);
    setSelectedGenInfo(null);
  }

  async function optimize(args: OptimizeParams): Promise<void> {
    try {
      const evolution = await fetchJson<EvolutionStats>('POST', '/optimize', args);
      const gensInfo = {
        args: {
          ...args,
          seed: evolution.seed,
        },
        gens: evolution.generations,
      };

      const historyItem = {
        time: new Date().toISOString(),
        value: gensInfo,
      };
      if (history.length === 10) {
        setHistory([historyItem, ...history.slice(0, history.length - 1)]);
      } else {
        setHistory([historyItem, ...history]);
      }

      processGensInfo(gensInfo);
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
                id="optimization-history"
                label="Optimization History"
                value={gensInfo}
                history={history}
                format={(gensInfo) => gensInfo?.args.context.strategy?.type ?? 'Any'}
                onChange={(gensInfo) => gensInfo && processGensInfo(gensInfo)}
              />
            </Box>
            <Divider />
            <Box p={1}>
              <Controls onOptimize={optimize} />
            </Box>
          </>
        }
        right={
          <>
            {selectedGenInfo ? (
              <TradingResult value={selectedGenInfo} onClose={() => setSelectedGenInfo(null)} />
            ) : (
              gensInfo && (
                <Generations
                  value={gensInfo}
                  onSelect={(gensInfo, gen, ind) =>
                    setSelectedGenInfo({
                      args: gensInfo.args,
                      config: {
                        trader: ind.individual.chromosome.trader,
                        strategy: ind.individual.chromosome.strategy,
                        stopLoss: ind.individual.chromosome.stopLoss,
                        takeProfit: ind.individual.chromosome.takeProfit,
                      },
                      symbolStats: ind.symbolStats,
                      title: `gen ${gen.nr}`,
                    })
                  }
                />
              )
            )}
          </>
        }
      />
      <ErrorSnack error={error} setError={setError} />
    </>
  );
}
