import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import useLocalStorageState from 'use-local-storage-state';
import { Generation, GenerationsInfo, IndividualStats, OptimizeParams } from './models';
import ContentBox from 'components/ContentBox';
import { Session } from 'models';
import Code from 'components/Code';
import NotFound from 'components/NotFound';
import TradingCharts from 'components/TradingCharts';
import TradingTable from 'components/TradingTable';

export default function Individual() {
  const params = useParams<{ session: string; generation: string; individual: string }>();
  const [sessions] = useLocalStorageState<Session<OptimizeParams, GenerationsInfo>[]>(
    'optimization_dashboard_sessions',
    [],
  );

  const session = sessions.find((session) => session.id === params.session);

  const generationsInfo = session?.output;
  const generation = generationsInfo?.gens[parseInt(params.generation)];
  const individual = generation?.hallOfFame[parseInt(params.individual)];

  return generationsInfo && generation && individual ? (
    <IndividualImpl
      generationsInfo={generationsInfo}
      generation={generation}
      individual={individual}
    />
  ) : (
    <NotFound />
  );
}

type IndividualImplProps = {
  generationsInfo: GenerationsInfo;
  generation: Generation;
  individual: IndividualStats;
};

function IndividualImpl({ generationsInfo, generation, individual }: IndividualImplProps) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ContentBox title="Individual Input">
          <Code code={JSON.stringify(individual.individual.chromosome, null, 4)} />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individual Trading Results">
          <TradingTable
            args={generationsInfo.args}
            title={`gen ${generation.nr}`}
            symbolStats={individual.symbolStats}
          />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individual Trading Charts">
          <TradingCharts
            args={generationsInfo.args}
            config={individual.individual.chromosome}
            symbolStats={individual.symbolStats}
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
