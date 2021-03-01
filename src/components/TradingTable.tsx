import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CoreStatistics, ExtendedStatistics, Statistics } from 'models';

type FlattenedStatistics = CoreStatistics & ExtendedStatistics;

type TradingTableProps = {
  args: {
    trainingSymbols: string[];
    validationSymbols?: string[];
  };
  symbolStats: {
    [symbol: string]: Statistics;
  };
  title: string;
};

export default function TradingTable({ args, symbolStats, title }: TradingTableProps) {
  // Flatten a complex statistics object.
  const flatSymbolStats = Object.entries(symbolStats).reduce((acc, [symbol, stats]) => {
    acc[symbol] = {
      ...stats.core,
      ...stats.extended,
    };
    return acc;
  }, {} as { [symbol: string]: FlattenedStatistics });
  const ignoreKeys = ['positions', 'gReturns'];

  const symbols = args.trainingSymbols.concat(args.validationSymbols ?? []);

  const stats = Object.values(flatSymbolStats);

  function renderStats() {
    if (stats.length === 0) return <></>;

    const keys = Object.keys(stats[0]).filter(
      (key) => !ignoreKeys.includes(key),
    ) as (keyof FlattenedStatistics)[];
    const keyTotals = keys.map((key) =>
      symbols.reduce((acc, symbol) => {
        const value = flatSymbolStats[symbol][key];
        return typeof value === 'number' ? acc + value : acc;
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
            {args.trainingSymbols.map((symbol) => (
              <TableCell key={symbol} align="right">
                {symbol}
              </TableCell>
            ))}
            {(args.validationSymbols ?? []).map((symbol) => (
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
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toString() : value.toFixed(8);
  }
  throw new Error(`Not implemented for ${value}.`);
}
