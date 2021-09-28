import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OptimizeInput, OptimizeOutput } from "./models";
import { Statistics } from "models";

const styles = {
  row: {
    cursor: "pointer",
  },
};

type GenerationsTableProps = {
  input: OptimizeInput;
  output: OptimizeOutput;
  onSelect: (generation: number, individual: number) => void;
};

export default function GenerationsTable({ input, output, onSelect }: GenerationsTableProps) {
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
                  style={styles.row}
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
