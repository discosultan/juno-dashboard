import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import { Session } from "models";

type SessionsProps<TInput, TOutput> = {
  sessions: Session<TInput, TOutput>[];
  onSelect: (session: Session<TInput, TOutput>) => void;
  onFormat: (session: Session<TInput, TOutput>) => string;
};

export default function Sessions<TInput, TOutput>({
  sessions,
  onSelect,
  onFormat,
}: SessionsProps<TInput, TOutput>) {
  return sessions.length ? (
    <Grid container spacing={1}>
      {sessions.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card key={item.id}>
            <CardActionArea onClick={() => onSelect(item)}>
              <CardContent>
                <Typography gutterBottom variant="body1" color="textPrimary" component="h1">
                  {item.start} ({onFormat(item)})
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Status: {item.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" color="textSecondary">
      It is quiet here.
    </Typography>
  );
}
