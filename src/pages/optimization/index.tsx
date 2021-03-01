import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useLocalStorageState from 'use-local-storage-state';
import { v4 as uuidv4 } from 'uuid';
import ErrorSnack from 'components/ErrorSnack';
import { fetchJson } from 'fetch';
import Controls from './Controls';
import { EvolutionStats, GenerationsInfo, OptimizeParams } from './models';
import ContentBox from 'components/ContentBox';
import Sessions from 'components/Sessions';
import { Session } from 'models';

export default function Dashboard() {
  const history = useHistory();
  const [sessions, setSessions] = useLocalStorageState<Session<OptimizeParams, GenerationsInfo>[]>(
    'optimization_dashboard_sessions',
    [],
  );
  const [error, setError] = useState<Error | null>(null);

  async function optimize(args: OptimizeParams): Promise<void> {
    const session: Session<OptimizeParams, GenerationsInfo> = {
      id: uuidv4(),
      start: new Date().toISOString(),
      status: 'pending',
      input: args,
    };

    try {
      if (sessions.length === 10) {
        sessions.shift();
      }
      sessions.push(session);
      setSessions(sessions);

      const evolution = await fetchJson<EvolutionStats>('POST', '/optimize', args);
      const gensInfo = {
        args: {
          ...args,
          seed: evolution.seed,
        },
        gens: evolution.generations,
      };

      session.status = 'fulfilled';
      session.output = gensInfo;
      setSessions(sessions);
    } catch (error) {
      session.status = 'rejected';
      setSessions(sessions);

      setError(error);
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <ContentBox title="Optimization Sessions">
            <Sessions
              sessions={sessions}
              onFormat={(session) => session.input.context.strategy?.type ?? 'Any'}
              onSelect={(session) => history.push(`/optimize/${session.id}`)}
            />
          </ContentBox>
        </Grid>

        <Grid item xs={12} sm={8}>
          <ContentBox title="Configure Optimization Args">
            <Controls onOptimize={optimize} />
          </ContentBox>
        </Grid>
      </Grid>

      <ErrorSnack error={error} setError={setError} />
    </>
  );
}
