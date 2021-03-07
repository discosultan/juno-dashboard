import { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'components/DatePicker';
import { Intervals, MissedCandlePolicies, Symbols } from 'info';
import { BacktestInput } from '../models';
import TextArea from 'components/TextArea';
import { onTextAreaChange } from './utils';

type FriendlyProps = {
  input: BacktestInput;
  setInput: (input: BacktestInput) => void;
};

export default function Friendly({ input, setInput }: FriendlyProps) {
  const [strategy, setStrategy] = useState(JSON.stringify(input.trading.strategy, null, 2));
  const [stopLoss, setStopLoss] = useState(JSON.stringify(input.trading.stopLoss, null, 2));
  const [takeProfit, setTakeProfit] = useState(JSON.stringify(input.trading.takeProfit, null, 2));

  return (
    <>
      <TextField
        id="exchange"
        fullWidth
        select
        label="Exchange"
        value={input.exchange}
        onChange={(e) =>
          setInput({
            ...input,
            exchange: e.target.value,
          })
        }
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
          value: input.symbols,
          onChange: (e) =>
            setInput({
              ...input,
              symbols: e.target.value as string[],
            }),
        }}
      >
        {Symbols.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label="Start"
        value={input.start}
        onChange={(e: any) =>
          setInput({
            ...input,
            start: e.target.value,
          })
        }
      />
      <DatePicker
        label="End"
        value={input.end}
        onChange={(e: any) =>
          setInput({
            ...input,
            end: e.target.value,
          })
        }
      />

      <TextArea
        label="Strategy"
        value={strategy}
        onChange={onTextAreaChange(setStrategy, (strategy) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              strategy,
            },
          }),
        )}
      />
      <TextArea
        label="Stop Loss"
        value={stopLoss}
        onChange={onTextAreaChange(setStopLoss, (stopLoss) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              stopLoss,
            },
          }),
        )}
      />
      <TextArea
        label="Take Profit"
        value={takeProfit}
        onChange={onTextAreaChange(setTakeProfit, (takeProfit) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              takeProfit,
            },
          }),
        )}
      />

      <TextField
        id="interval"
        fullWidth
        select
        label="Interval"
        value={input.trading.trader.interval}
        onChange={(e) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              trader: {
                ...input.trading.trader,
                interval: e.target.value,
              },
            },
          })
        }
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
        value={input.trading.trader.missedCandlePolicy}
        onChange={(e) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              trader: {
                ...input.trading.trader,
                missedCandlePolicy: e.target.value,
              },
            },
          })
        }
      >
        {MissedCandlePolicies.map((policy) => (
          <MenuItem key={policy} value={policy}>
            {policy}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
