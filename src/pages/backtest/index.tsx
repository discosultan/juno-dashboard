import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import ContentBox from "components/ContentBox";
import Sessions from "components/Sessions";
import Controls from "./Controls";
import { Session } from "models";
import { useRustApi } from "api";
import { BacktestInput, BacktestOutput } from "./models";
import { timeMs } from "time";

export default function Dashboard() {
  const history = useHistory();
  const [sessions, setSessions] = useLocalStorageState<Session<BacktestInput, BacktestOutput>[]>(
    "backtest_dashboard_sessions",
    [],
  );
  const { fetchApi } = useRustApi();

  async function backtest(args: BacktestInput): Promise<void> {
    const session: Session<BacktestInput, BacktestOutput> = {
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

      const result = await fetchApi<BacktestOutput>("POST", "/backtest", undefined, args);

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
        <ContentBox title="Backtesting Sessions">
          <Sessions
            sessions={sessions}
            onFormat={(session) => session.input.trading.strategy?.type ?? "Any"}
            onSelect={(session) => history.push(`/backtest/${session.id}`)}
          />
        </ContentBox>
      </Grid>

      <Grid item xs={12} sm={8}>
        <ContentBox title="Configure Backtest Input">
          <Controls onBacktest={backtest} />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
