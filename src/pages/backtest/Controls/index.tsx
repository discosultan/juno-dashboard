import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useLocalStorageStateImpl from "use-local-storage-state";
import { BacktestInput } from "../models";
import Friendly from "./Friendly";
import Raw from "./Raw";
import { strpinterval, strptimestamp } from "../../../time";

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, object] {
  return useLocalStorageStateImpl(`backtest_controls_${key}`, { defaultValue });
}

type ControlsProps = {
  onBacktest: (args: BacktestInput) => void;
};

export default function Controls({ onBacktest }: ControlsProps) {
  const [input, setInput] = useLocalStorageState<BacktestInput>("input", {
    trading: {
      trader: {
        interval: strpinterval("1d"),
        missedCandlePolicy: "Ignore",
      },
      strategy: {
        type: "FourWeekRule",
        period: 28,
        ma: {
          type: "Ema",
          period: 14,
        },
      },
      stopLoss: {
        type: "Basic",
        upThreshold: 0.1,
        downThreshold: 0.1,
      },
      takeProfit: {
        type: "Basic",
        upThreshold: 0.1,
        downThreshold: 0.1,
      },
    },
    exchange: "binance",
    symbols: ["eth-btc", "ltc-btc", "xrp-btc", "xmr-btc", "ada-btc"],
    start: strptimestamp("2018-01-01"),
    end: strptimestamp("2021-01-01"),
    quote: 1.0,
  });
  const [activeTab, setActiveTab] = useLocalStorageState<0 | 1>("tab", 0);

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(_, tab) => setActiveTab(tab)}
        aria-label="configuration mode"
      >
        <Tab label="Friendly" id="controls-tab-0" />
        <Tab label="Raw" id="controls-tab-1" />
      </Tabs>

      <form noValidate autoComplete="off">
        <br />
        {activeTab === 0 ? (
          <Friendly input={input} setInput={setInput} />
        ) : (
          <Raw input={input} setInput={setInput} />
        )}
        <br />
        <br />
        <Button fullWidth variant="contained" onClick={() => onBacktest(input)}>
          Backtest
        </Button>
      </form>
    </>
  );
}
