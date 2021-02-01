import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import useLocalStorageState from 'use-local-storage-state';
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

  function processGensInfo(gensInfo: GenerationsInfo): void {
    setGensInfo(gensInfo);
    setSelectedGenInfo(null);
  }

  async function optimize(args: OptimizeParams): Promise<void> {
    const evolution = await fetchJson<EvolutionStats>(
      'POST',
      `/optimize/${args.strategy}/${args.stopLoss}/${args.takeProfit}`,
      args,
    );
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
  }

  return (
    <SplitPane
      left={
        <>
          <Box p={1}>
            <History
              id="optimization-history"
              label="Optimization History"
              value={gensInfo}
              history={history}
              format={(gensInfo) => gensInfo?.args.strategy ?? ''}
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
                      trader: ind.ind.chromosome.trader,
                      strategy: {
                        type: gensInfo.args.strategy,
                        ...ind.ind.chromosome.strategy,
                      },
                      stopLoss: {
                        type: gensInfo.args.stopLoss,
                        ...ind.ind.chromosome.stopLoss,
                      },
                      takeProfit: {
                        type: gensInfo.args.takeProfit,
                        ...ind.ind.chromosome.takeProfit,
                      },
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
  );
}