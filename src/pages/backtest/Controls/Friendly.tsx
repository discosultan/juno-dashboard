import { useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Select from "components/Select";
import TextArea from "components/TextArea";
import { Exchanges, Intervals, MissedCandlePolicies, Symbols } from "info";
import { BacktestInput } from "../models";
import { onTextAreaChange } from "./utils";

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

      <DatePicker
        label="Start"
        value={input.start}
        renderInput={(params) => <TextField {...params} />}
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
        renderInput={(params) => <TextField {...params} />}
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

      <Select
        label="Interval"
        options={Intervals}
        value={input.trading.trader.interval}
        onChange={(_, v) =>
          setInput({
            ...input,
            trading: {
              ...input.trading,
              trader: {
                ...input.trading.trader,
                interval: v,
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
    </>
  );
}
