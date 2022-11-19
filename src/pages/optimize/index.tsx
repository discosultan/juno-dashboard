import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import Controls from "./Controls";
import { OptimizeOutput, OptimizeInput } from "./models";
import ContentBox from "components/ContentBox";
import Sessions from "components/Sessions";
import { Session } from "models";
import { useRustApi } from "api";
import { timeMs } from "time";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useLocalStorageState<Session<OptimizeInput, OptimizeOutput>[]>(
    "optimization_dashboard_sessions",
    { defaultValue: [] },
  );
  const { fetchApi } = useRustApi();

  async function optimize(args: OptimizeInput): Promise<void> {
    const session: Session<OptimizeInput, OptimizeOutput> = {
      id: uuidv4(),
      start: timeMs(),
      status: "pending",
      input: args,
    };

    try {
      if (sessions.length === 10) {
        sessions.pop();
      }
      sessions.unshift(session);
      setSessions(sessions);

      const result = await fetchApi<OptimizeOutput>("POST", "/optimize", undefined, args);

      session.status = "fulfilled";
      session.output = result;
      setSessions(sessions);
    } catch (error) {
      session.status = "rejected";
      setSessions(sessions);
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <ContentBox title="Optimization Sessions">
          <Sessions
            sessions={sessions}
            onFormat={(session) => session.input.context.strategy?.type ?? "Any"}
            onSelect={(session) => navigate(`/optimize/${session.id}`)}
          />
        </ContentBox>
      </Grid>

      <Grid item xs={12} sm={8}>
        <ContentBox title="Configure Optimization Args">
          <Controls onOptimize={optimize} />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
