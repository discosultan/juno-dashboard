import { useNavigate, useParams } from "react-router";
import Grid from "@mui/material/Grid";
import useLocalStorageState from "use-local-storage-state";
import GenerationsTable from "./GenerationsTable";
import { OptimizeOutput, OptimizeInput } from "./models";
import ContentBox from "components/ContentBox";
import { Session as SessionModel } from "models";
import Code from "components/Code";
import NotFound from "components/NotFound";

export default function Session() {
  const params = useParams();
  if (!params.session) {
    throw new Error("Missing session param.");
  }

  const [sessions] = useLocalStorageState<SessionModel<OptimizeInput, OptimizeOutput>[]>(
    "optimization_dashboard_sessions",
    [],
  );

  const session = sessions.find((session) => session.id === params.session);

  return session?.output ? (
    <SessionImpl session={params.session} input={session.input} output={session.output} />
  ) : (
    <NotFound />
  );
}

type SessionImplProps = {
  session: string;
  input: OptimizeInput;
  output: OptimizeOutput;
};

function SessionImpl({ session, input, output }: SessionImplProps) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ContentBox title="Optimization Input">
          <Code code={JSON.stringify(input, null, 2)} />
        </ContentBox>
      </Grid>

      <Grid item xs={12}>
        <ContentBox title="Individuals">
          <GenerationsTable
            input={input}
            output={output}
            onSelect={(generation, individual) =>
              navigate(`/optimize/${session}/${generation}/${individual}`)
            }
          />
        </ContentBox>
      </Grid>
    </Grid>
  );
}
