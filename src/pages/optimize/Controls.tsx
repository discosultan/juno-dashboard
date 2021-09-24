import { Dispatch, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useLocalStorageStateImpl from "use-local-storage-state";
import DatePicker from "@mui/lab/DatePicker";
import Select from "components/Select";
import TextArea from "components/TextArea";
import { Exchanges, Intervals, MissedCandlePolicies, Symbols } from "info";
import useOptimizeInfo from "pages/optimize/useOptimizeInfo";
import { OptimizeInput } from "./models";

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, object] {
  return useLocalStorageStateImpl(`optimization_controls_${key}`, defaultValue);
}

type ControlsProps = {
  onOptimize: (args: OptimizeInput) => void;
};

export default function Controls({ onOptimize }: ControlsProps) {
  const [exchange, setExchange] = useLocalStorageState("exchange", "binance");
  const [trainingSymbols, setTrainingSymbols] = useLocalStorageState("trainingSymbols", [
    "eth-btc",
    "ltc-btc",
    "xrp-btc",
    "xmr-btc",
  ]);
  const [validationSymbols, setValidationSymbols] = useLocalStorageState("validationSymbols", [
    "ada-btc",
  ]);
  const [intervals, setIntervals] = useLocalStorageState("intervals", ["1d"]);
  const [missedCandlePolicies, setMissedCandlePolicies] = useLocalStorageState(
    "missedCandlePolicies",
    [MissedCandlePolicies[0]],
  );
  const [start, setStart] = useLocalStorageState("start", "2018-01-01");
  const [end, setEnd] = useLocalStorageState("end", "2021-01-01");
  const [evaluationStatistic, setEvaluationStatistic] = useLocalStorageState(
    "evaluationStatistic",
    "Profit",
  );
  const [evaluationAggregation, setEvaluationAggregation] = useLocalStorageState(
    "evaluationAggregation",
    "Linear",
  );
  const [generations, setGenerations] = useLocalStorageState("generations", 32);
  const [populationSize, setPopulationSize] = useLocalStorageState("populationSize", 32);
  const [hallOfFameSize, setHallOfFameSize] = useLocalStorageState("hallOfFameSize", 1);
  const [randomizeSeed, setRandomizeSeed] = useLocalStorageState("randomizeSeed", true);
  const [seed, setSeed] = useLocalStorageState("seed", 0);
  const [strategyContext, setStrategyContext] = useLocalStorageState("strategyContext", "");
  const [stopLossContext, setStopLossContext] = useLocalStorageState("stopLossContext", "");
  const [takeProfitContext, setTakeProfitContext] = useLocalStorageState("takeProfitContext", "");

  const optimizeInfo = useOptimizeInfo();

  return (
    <form noValidate autoComplete="off">
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

      <Select
        label="Exchange"
        options={Exchanges}
        value={exchange}
        onChange={(_, v) => setExchange(v)}
      />

      <Select
        multiple
        autocomplete
        label="Training Symbols"
        options={Symbols}
        value={trainingSymbols}
        onChange={(_, v) => setTrainingSymbols(v)}
      />
      <Select
        multiple
        autocomplete
        label="Validation Symbols"
        options={Symbols}
        value={validationSymbols}
        onChange={(_, v) => setValidationSymbols(v)}
      />

      <Select
        multiple
        label="Intervals"
        options={Intervals}
        value={intervals}
        onChange={(_, v) => setIntervals(v)}
      />

      <Select
        multiple
        label="Missed Candle Policies"
        options={MissedCandlePolicies}
        value={missedCandlePolicies}
        onChange={(_, v) => setMissedCandlePolicies(v)}
      />

      <DatePicker
        label="Start"
        value={start}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e: any) => setStart(e.target.value)}
      />
      <DatePicker
        label="End"
        value={end}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e: any) => setEnd(e.target.value)}
      />

      {optimizeInfo?.evaluationStatistics && (
        <Select
          label="Evaluation Statistic"
          options={optimizeInfo.evaluationStatistics}
          value={evaluationStatistic}
          onChange={(_, v) => setEvaluationStatistic(v)}
        />
      )}
      {optimizeInfo?.evaluationAggregations && (
        <Select
          label="Evaluation Aggregation"
          options={optimizeInfo.evaluationAggregations}
          value={evaluationAggregation}
          onChange={(_, v) => setEvaluationAggregation(v)}
        />
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
              strategy: strategyContext.trim() === "" ? undefined : JSON.parse(strategyContext),
              stopLoss: stopLossContext.trim() === "" ? undefined : JSON.parse(stopLossContext),
              takeProfit:
                takeProfitContext.trim() === "" ? undefined : JSON.parse(takeProfitContext),
            },
          })
        }
      >
        Optimize
      </Button>
    </form>
  );
}
