import React, { Dispatch, SetStateAction } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useLocalStorageStateImpl from 'use-local-storage-state';
import DatePicker from 'components/DatePicker';
import TextArea from 'components/TextArea';
import { Intervals, MissedCandlePolicies, Symbols } from 'info';
import useOptimizeInfo from 'pages/optimization/useOptimizeInfo';
import { OptimizeParams } from './models';

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  return useLocalStorageStateImpl(`optimization_controls_${key}`, defaultValue);
}

type ControlsProps = {
  onOptimize: (args: OptimizeParams) => void;
};

export default function Controls({ onOptimize }: ControlsProps) {
  const [exchange, setExchange] = useLocalStorageState('exchange', 'binance');
  const [trainingSymbols, setTrainingSymbols] = useLocalStorageState('trainingSymbols', [
    'eth-btc',
    'ltc-btc',
    'xrp-btc',
    'xmr-btc',
  ]);
  const [validationSymbols, setValidationSymbols] = useLocalStorageState('validationSymbols', [
    'ada-btc',
  ]);
  const [intervals, setIntervals] = useLocalStorageState('intervals', ['1d']);
  const [
    missedCandlePolicies,
    setMissedCandlePolicies,
  ] = useLocalStorageState('missedCandlePolicies', [MissedCandlePolicies[0]]);
  const [start, setStart] = useLocalStorageState('start', '2018-01-01');
  const [end, setEnd] = useLocalStorageState('end', '2021-01-01');
  const [evaluationStatistic, setEvaluastionStatistic] = useLocalStorageState(
    'evaluationStatistic',
    'Profit',
  );
  const [evaluationAggregation, setEvaluastionAggregation] = useLocalStorageState(
    'evaluationAggregation',
    'Linear',
  );
  const [generations, setGenerations] = useLocalStorageState('generations', 32);
  const [populationSize, setPopulationSize] = useLocalStorageState('populationSize', 32);
  const [hallOfFameSize, setHallOfFameSize] = useLocalStorageState('hallOfFameSize', 1);
  const [randomizeSeed, setRandomizeSeed] = useLocalStorageState('randomizeSeed', true);
  const [seed, setSeed] = useLocalStorageState('seed', 0);
  const [strategyContext, setStrategyContext] = useLocalStorageState('strategyContext', '{\n}');
  const [stopLossContext, setStopLossContext] = useLocalStorageState('stopLossContext', '{\n}');
  const [takeProfitContext, setTakeProfitContext] = useLocalStorageState(
    'takeProfitContext',
    '{\n}',
  );

  const optimizeInfo = useOptimizeInfo();

  return (
    <form noValidate autoComplete="off">
      <Typography variant="h6" gutterBottom>
        Configure Optimization Args
      </Typography>

      <TextArea
        label="Strategy Context"
        value={strategyContext}
        onChange={(e) => setStrategyContext(e.target.value)}
      />
      <TextArea
        label="Stop Loss Context"
        value={stopLossContext}
        onChange={(e) => setStopLossContext(e.target.value)}
      />
      <TextArea
        label="Take Profit Context"
        value={takeProfitContext}
        onChange={(e) => setTakeProfitContext(e.target.value)}
      />

      <TextField
        id="exchange"
        fullWidth
        select
        label="Exchange"
        value={exchange}
        onChange={(e) => setExchange(e.target.value)}
      >
        <MenuItem value={'binance'}>Binance</MenuItem>
      </TextField>

      <TextField
        id="training-symbols"
        label="Training Symbols"
        fullWidth
        select
        SelectProps={{
          multiple: true,
          value: trainingSymbols,
          onChange: (e) => setTrainingSymbols(e.target.value as string[]),
        }}
      >
        {Symbols.map((symbol) => (
          <MenuItem key={symbol} value={symbol}>
            {symbol}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="validation-symbols"
        label="Validation Symbols"
        fullWidth
        select
        SelectProps={{
          multiple: true,
          value: validationSymbols,
          onChange: (e) => setValidationSymbols(e.target.value as string[]),
        }}
      >
        {Symbols.map((symbol) => (
          <MenuItem key={symbol} value={symbol}>
            {symbol}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="intervals"
        label="Intervals"
        fullWidth
        select
        SelectProps={{
          multiple: true,
          value: intervals,
          onChange: (e) => setIntervals(e.target.value as string[]),
        }}
      >
        {Intervals.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="missedCandlePolicies"
        label="Missed Candle Policies"
        fullWidth
        select
        SelectProps={{
          multiple: true,
          value: missedCandlePolicies,
          onChange: (e) => setMissedCandlePolicies(e.target.value as string[]),
        }}
      >
        {MissedCandlePolicies.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker label="Start" value={start} onChange={(e: any) => setStart(e.target.value)} />
      <DatePicker label="End" value={end} onChange={(e: any) => setEnd(e.target.value)} />

      {optimizeInfo?.evaluationStatistics && (
        <TextField
          id="evaluationStatistic"
          fullWidth
          select
          label="Evaluation Statistic"
          value={evaluationStatistic}
          onChange={(e) => setEvaluastionStatistic(e.target.value)}
        >
          {optimizeInfo.evaluationStatistics.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      )}
      {optimizeInfo?.evaluationAggregations && (
        <TextField
          id="evaluationAggregation"
          fullWidth
          select
          label="Evaluation Aggregation"
          value={evaluationAggregation}
          onChange={(e) => setEvaluastionAggregation(e.target.value)}
        >
          {optimizeInfo.evaluationAggregations.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        id="generations"
        fullWidth
        label="Number Of Generations"
        type="number"
        inputProps={{ min: 0 }}
        value={generations}
        onChange={(e) => setGenerations(parseInt(e.target.value))}
      />
      <TextField
        id="populationSize"
        fullWidth
        label="Population Size"
        type="number"
        inputProps={{ min: 2 }}
        value={populationSize}
        onChange={(e) => setPopulationSize(parseInt(e.target.value))}
      />
      <TextField
        id="hallOfFameSize"
        fullWidth
        label="Hall of Fame Size"
        type="number"
        inputProps={{ min: 1 }}
        value={hallOfFameSize}
        onChange={(e) => setHallOfFameSize(parseInt(e.target.value))}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={randomizeSeed}
            onChange={(e) => setRandomizeSeed(e.target.checked)}
            name="randomizeSeed"
            color="primary"
          />
        }
        label="Randomize Seed"
      />
      <TextField
        id="seed"
        disabled={randomizeSeed}
        fullWidth
        label="Seed"
        type="number"
        inputProps={{ min: 0 }}
        value={seed}
        onChange={(e) => setSeed(parseInt(e.target.value))}
      />

      <br />
      <br />
      <Button
        fullWidth
        variant="contained"
        onClick={() =>
          onOptimize({
            exchange,
            trainingSymbols,
            validationSymbols,
            start,
            end,
            quote: 1.0,
            evaluationStatistic,
            evaluationAggregation,
            populationSize,
            generations,
            hallOfFameSize,
            seed: randomizeSeed ? null : seed,
            context: {
              trader: {
                intervals,
                missedCandlePolicies,
              },
              strategy: strategyContext.trim() === '' ? undefined : JSON.parse(strategyContext),
              stopLoss: stopLossContext.trim() === '' ? undefined : JSON.parse(stopLossContext),
              takeProfit:
                takeProfitContext.trim() === '' ? undefined : JSON.parse(takeProfitContext),
            },
          })
        }
      >
        Optimize
      </Button>
    </form>
  );
}