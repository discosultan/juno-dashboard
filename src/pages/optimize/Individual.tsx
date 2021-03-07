import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import useLocalStorageState from 'use-local-storage-state';
import { Generation, IndividualStats, OptimizeInput, OptimizeOutput } from './models';
import ContentBox from 'components/ContentBox';
import { Session } from 'models';
import Code from 'components/Code';
import NotFound from 'components/NotFound';
import TradingCharts from 'components/TradingCharts';
import TradingTable from 'components/TradingTable';

export default function Individual() {
  const params = useParams<{ session: string; generation: string; individual: string }>();
  const [sessions] = useLocalStorageState<Session<OptimizeInput, OptimizeOutput>[]>(
    'optimization_dashboard_sessions',
    [],
  );

  const session = sessions.find((session) => session.id === params.session);

  const optimizeOutput = session?.output;
  const generation = optimizeOutput?.generations[parseInt(params.generation)];
  const individual = generation?.hallOfFame[parseInt(params.individual)];

  return session && optimizeOutput && generation && individual ? (
    <IndividualImpl input={session.input} generation={generation} individual={individual} />
  ) : (
    <NotFound />
  );
}

type IndividualImplProps = {
  input: OptimizeInput;
  generation: Generation;
  individual: IndividualStats;
};

function IndividualImpl({ input, generation, individual }: IndividualImplProps) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ContentBox title="Individual Input">
          <Code code={JSON.stringify(individual.individual.chromosome, null, 2)} />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individual Trading Results">
          <TradingTable
            title={`gen ${generation.nr}`}
            input={input}
            output={individual}
          />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individual Trading Charts">
          <TradingCharts
            input={{
              trading: individual.individual.chromosome,
              ...input,
            }}
            output={individual}
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
