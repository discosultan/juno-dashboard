import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Underline from "components/Underline";
import ContentBox from "components/ContentBox";

export default function NotFound() {
  return (
    <ContentBox>
      <br />
      <Box textAlign="center">
        <CircularProgress />
      </Box>
      <Typography align="center" variant="h5">
        Loading...
      </Typography>
      <Underline />
      <br />
    </ContentBox>
  );
}
