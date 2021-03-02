import { Dispatch, SetStateAction } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useLocalStorageStateImpl from 'use-local-storage-state';
import DatePicker from 'components/DatePicker';
import { Intervals, MissedCandlePolicies, Symbols } from 'info';
import { BacktestInput } from '../models';
import TextArea from 'components/TextArea';

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  return useLocalStorageStateImpl(`backtest_controls_${key}`, defaultValue);
}

type ControlsProps = {
  onBacktest: (args: BacktestInput) => void;
};

export default function Controls({ onBacktest }: ControlsProps) {
  const [exchange, setExchange] = useLocalStorageState('exchange', 'binance');
  const [symbols, setSymbols] = useLocalStorageState('symbols', [
    'eth-btc',
    'ltc-btc',
    'xrp-btc',
    'xmr-btc',
    'ada-btc',
  ]);
  const [interval, setInterval] = useLocalStorageState('interval', '1d');
  const [start, setStart] = useLocalStorageState('start', '2018-01-01');
  const [end, setEnd] = useLocalStorageState('end', '2021-01-01');
  const [missedCandlePolicy, setMissedCandlePolicy] = useLocalStorageState(
    'missedCandlePolicy',
    MissedCandlePolicies[0],
  );
  const [strategy, setStrategy] = useLocalStorageState(
    'strategyParams',
    '{\n  "type": "FourWeekRule",\n  "period": 28,\n  "ma": "kama",\n  "maPeriod": 14\n}',
  );
  const [stopLoss, setStopLoss] = useLocalStorageState(
    'stopLossParams',
    '{\n  "type": "Basic",\n  "upThreshold": 0.1,\n  "downThreshold": 0.1\n}',
  );
  const [takeProfit, setTakeProfit] = useLocalStorageState(
    'takeProfitParams',
    '{\n  "type": "Basic",\n  "upThreshold": 0.1,\n  "downThreshold": 0.1\n}',
  );

  return (
    <form noValidate autoComplete="off">
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
        id="symbols"
        label="Symbols"
        fullWidth
        select
        SelectProps={{
          multiple: true,
          value: symbols,
          onChange: (e) => setSymbols(e.target.value as string[]),
        }}
      >
        {Symbols.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker label="Start" value={start} onChange={(e: any) => setStart(e.target.value)} />
      <DatePicker label="End" value={end} onChange={(e: any) => setEnd(e.target.value)} />

      <TextArea label="Strategy" value={strategy} onChange={(e) => setStrategy(e.target.value)} />
      <TextArea label="Stop Loss" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
      <TextArea
        label="Take Profit"
        value={takeProfit}
        onChange={(e) => setTakeProfit(e.target.value)}
      />

      <TextField
        id="interval"
        fullWidth
        select
        label="Interval"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
      >
        {Intervals.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="missedCandlePolicy"
        fullWidth
        select
        label="Missed Candle Policy"
        value={missedCandlePolicy}
        onChange={(e) => setMissedCandlePolicy(e.target.value)}
      >
        {MissedCandlePolicies.map((policy) => (
          <MenuItem key={policy} value={policy}>
            {policy}
          </MenuItem>
        ))}
      </TextField>

      <br />
      <br />
      <Button
        fullWidth
        variant="contained"
        onClick={() =>
          onBacktest({
            trading: {
              trader: {
                interval,
                missedCandlePolicy,
              },
              strategy: JSON.parse(strategy),
              stopLoss: JSON.parse(stopLoss),
              takeProfit: JSON.parse(takeProfit),
            },
            exchange,
            symbols,
            start,
            end,
            quote: 1.0,
          })
        }
      >
        Backtest
      </Button>
    </form>
  );
}
