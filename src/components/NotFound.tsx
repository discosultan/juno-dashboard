import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import Underline from 'components/Underline';
import ContentBox from 'components/ContentBox';

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
