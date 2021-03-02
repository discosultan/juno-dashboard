import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import useLocalStorageState from 'use-local-storage-state';
import { BacktestInput, BacktestOutput } from './models';
import ContentBox from 'components/ContentBox';
import { Session as SessionModel } from 'models';
import Code from 'components/Code';
import NotFound from 'components/NotFound';
import TradingCharts from 'components/TradingCharts';
import TradingTable from 'components/TradingTable';

export default function Session() {
  const params = useParams<{ session: string }>();
  const [sessions] = useLocalStorageState<SessionModel<BacktestInput, BacktestOutput>[]>(
    'backtest_dashboard_sessions',
    [],
  );

  const session = sessions.find((session) => session.id === params.session);

  return session?.output ? (
    <SessionImpl input={session.input} output={session.output} />
  ) : (
    <NotFound />
  );
}

type SessionImplProps = {
  input: BacktestInput;
  output: BacktestOutput;
};
function SessionImpl({ input, output }: SessionImplProps) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ContentBox title="Backtest Input">
          <Code code={JSON.stringify(input, null, 4)} />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Backtest Trading Results">
          <TradingTable
            title={input.trading.strategy.type}
            input={{
              trainingSymbols: input.symbols,
            }}
            output={output}
          />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Backtest Trading Charts">
          <TradingCharts
            input={{
              trainingSymbols: input.symbols,
              ...input,
            }}
            output={output}
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
