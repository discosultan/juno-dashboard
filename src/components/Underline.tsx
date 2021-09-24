import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles<Theme>((theme) => ({
  underline: {
    width: "73px",
    height: "4px",
    margin: "0 auto",
    display: "block",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Underline() {
  const classes = useStyles();

  return <span className={classes.underline}></span>;
}
