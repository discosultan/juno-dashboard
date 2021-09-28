import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import WarningIcon from "@mui/icons-material/Warning";
import Underline from "components/Underline";
import ContentBox from "components/ContentBox";

export default function NotFound() {
  return (
    <ContentBox>
      <br />
      <Box textAlign="center">
        <WarningIcon fontSize="large" />
      </Box>
      <Typography align="center" variant="h5">
        This resource could not be found.
      </Typography>
      <Underline />
      <br />
    </ContentBox>
  );
}
