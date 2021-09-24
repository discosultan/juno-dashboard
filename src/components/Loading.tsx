import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
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
