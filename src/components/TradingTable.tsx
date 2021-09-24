import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CoreStatistics, ExtendedStatistics, Statistics } from "models";

type FlattenedStatistics = CoreStatistics & ExtendedStatistics;

type TradingTableProps = {
  title: string;
  input: {
    trainingSymbols: string[];
    validationSymbols?: string[];
  };
  output: {
    symbolStats: { [symbol: string]: Statistics };
  };
};

export default function TradingTable({ title, input, output }: TradingTableProps) {
  const symbolStats = output.symbolStats;

  // Flatten a complex statistics object.
  const flatSymbolStats = Object.entries(symbolStats).reduce((acc, [symbol, stats]) => {
    acc[symbol] = {
      ...stats.core,
      ...stats.extended,
    };
    return acc;
  }, {} as { [symbol: string]: FlattenedStatistics });
  const ignoreKeys = ["positions", "gReturns"];

  const symbols = input.trainingSymbols.concat(input.validationSymbols ?? []);

  const stats = Object.values(flatSymbolStats);

  function renderStats() {
    if (stats.length === 0) return <></>;

    const keys = Object.keys(stats[0]).filter(
      (key) => !ignoreKeys.includes(key),
    ) as (keyof FlattenedStatistics)[];
    const keyTotals = keys.map((key) =>
      symbols.reduce((acc, symbol) => {
        const value = flatSymbolStats[symbol][key];
        return typeof value === "number" ? acc + value : acc;
      }, 0),
    );

    return keys.map((key, i) => (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {key}
        </TableCell>
        {symbols.map((symbol) => (
          <TableCell key={symbol} align="right">
            {fmtUnknown(flatSymbolStats[symbol][key])}
          </TableCell>
        ))}
        <TableCell>{fmtUnknown(keyTotals[i])}</TableCell>
      </TableRow>
    ));
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            {input.trainingSymbols.map((symbol) => (
              <TableCell key={symbol} align="right">
                {symbol}
              </TableCell>
            ))}
            {(input.validationSymbols ?? []).map((symbol) => (
              <TableCell key={symbol} align="right">
                {symbol} (v)
              </TableCell>
            ))}
            <TableCell>total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderStats()}</TableBody>
      </Table>
    </TableContainer>
  );
}

function fmtUnknown(value: any): string {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? value.toString() : value.toFixed(8);
  }
  throw new Error(`Not implemented for ${value}.`);
}
