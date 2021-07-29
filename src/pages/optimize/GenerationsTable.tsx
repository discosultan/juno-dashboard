import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { OptimizeInput, OptimizeOutput } from "./models";
import { Statistics } from "models";

const useStyles = makeStyles((_theme) => ({
  row: {
    cursor: "pointer",
  },
}));

type GenerationsTableProps = {
  input: OptimizeInput;
  output: OptimizeOutput;
  onSelect: (generation: number, individual: number) => void;
};

export default function GenerationsTable({ input, output, onSelect }: GenerationsTableProps) {
  const classes = useStyles();
  const symbols = input.trainingSymbols.concat(input.validationSymbols);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="generations table">
        <TableHead>
          <TableRow>
            <TableCell>gen</TableCell>
            {input.trainingSymbols.map((symbol) => (
              <TableCell key={symbol} align="right">
                {symbol}
              </TableCell>
            ))}
            {input.validationSymbols.map((symbol) => (
              <TableCell key={symbol} align="right">
                {symbol} (v)
              </TableCell>
            ))}
            <TableCell align="right">fitness</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* We reverse gens to show the latest on top */}
          {output.generations
            .slice(0)
            .reverse()
            .map((gen, i) =>
              gen.hallOfFame.map((ind, j) => (
                <TableRow
                  key={i * input.hallOfFameSize + j}
                  hover
                  className={classes.row}
                  onClick={() => onSelect(i, j)}
                >
                  <TableCell component="th" scope="row">
                    {gen.nr}
                  </TableCell>
                  {symbols.map((symbol) => (
                    <TableCell key={symbol} align="right">
                      {getEvaluationStat(
                        ind.symbolStats[symbol],
                        input.evaluationStatistic,
                      ).toFixed(8)}
                    </TableCell>
                  ))}
                  <TableCell align="right">{ind.individual.fitness.toFixed(8)}</TableCell>
                </TableRow>
              )),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function getEvaluationStat(stats: Statistics, evaluationStatistic: string): number {
  evaluationStatistic = evaluationStatistic.charAt(0).toLowerCase() + evaluationStatistic.slice(1);
  // @ts-ignore
  return stats.core[evaluationStatistic] ?? stats.extended[evaluationStatistic];
}
