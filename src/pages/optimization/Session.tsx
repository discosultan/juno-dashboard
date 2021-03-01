// import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import useLocalStorageState from 'use-local-storage-state';
import GenerationsTable from './GenerationsTable';
import { GenerationsInfo, OptimizeParams } from './models';
import ContentBox from 'components/ContentBox';
import { Session as SessionModel } from 'models';
import Code from 'components/Code';
import NotFound from 'components/NotFound';

export default function Session() {
  const params = useParams<{ session: string }>();
  const [sessions] = useLocalStorageState<SessionModel<OptimizeParams, GenerationsInfo>[]>(
    'optimization_dashboard_sessions',
    [],
  );

  const session = sessions.find((session) => session.id === params.session);

  return session?.output ? (
    <SessionImpl session={params.session} generationsInfo={session.output} />
  ) : (
    <NotFound />
  );
}

type SessionImplProps = {
  session: string;
  generationsInfo: GenerationsInfo;
};

function SessionImpl({ session, generationsInfo }: SessionImplProps) {
  const history = useHistory();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ContentBox title="Optimization Input">
          <Code code={JSON.stringify(generationsInfo.args, null, 4)} />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individuals">
          <GenerationsTable
            generationsInfo={generationsInfo}
            onSelect={(generation, individual) =>
              history.push(`/optimize/${session}/${generation}/${individual}`)
            }
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
