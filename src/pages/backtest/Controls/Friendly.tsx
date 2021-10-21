import { useState } from "react";
import Stack from "@mui/material/Stack";
import Select from "components/controls/Select";
import TextArea from "components/controls/TextArea";
import { Exchanges, Intervals, MissedCandlePolicies, Symbols } from "info";
import { BacktestInput } from "../models";
import { onTextAreaChange } from "./utils";
import TimestampPicker from "components/controls/TimestampPicker";
import IntervalSelect from "components/controls/IntervalSelect";

type FriendlyProps = {
  input: BacktestInput;
  setInput: (input: BacktestInput) => void;
};

export default function Friendly({ input, setInput }: FriendlyProps) {
  const [strategy, setStrategy] = useState(JSON.stringify(input.trading.strategy, null, 2));
  const [stopLoss, setStopLoss] = useState(JSON.stringify(input.trading.stopLoss, null, 2));
  const [takeProfit, setTakeProfit] = useState(JSON.stringify(input.trading.takeProfit, null, 2));

  return (
    <Stack spacing={1} direction="column">
      <Select
        label="Exchange"
        options={Exchanges}
        value={input.exchange}
        onChange={(_, v) =>
          setInput({
            ...input,
            exchange: v,
          })
        }
      />

      <Select
        multiple
        autocomplete
        label="Symbols"
        options={Symbols}
        value={input.symbols}
        onChange={(_, v) =>
          setInput({
            ...input,
            symbols: v,
          })
        }
      />

      <Stack direction="row" spacing={1}>
        <TimestampPicker
          label="Start"
          value={input.start}
          onChange={(value) =>
            setInput({
              ...input,
              start: value,
            })
          }
        />
        <TimestampPicker
          label="End"
          value={input.end}
          onChange={(value) =>
            setInput({
              ...input,
              end: value,
            })
          }
        />
      </Stack>

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

      <IntervalSelect
        label="Interval"
        options={Intervals}
        value={input.trading.trader.interval}
        onChange={(value) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              trader: {
                ...input.trading.trader,
                interval: value,
              },
            },
          })
        }
      />

      <Select
        label="Missed Candle Policy"
        options={MissedCandlePolicies}
        value={input.trading.trader.missedCandlePolicy}
        onChange={(_, v) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              trader: {
                ...input.trading.trader,
                missedCandlePolicy: v,
              },
            },
          })
        }
      />
    </Stack>
  );
}
