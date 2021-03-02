import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import Brightness5TwoToneIcon from '@material-ui/icons/Brightness5TwoTone';

const useStyles = makeStyles((theme) => ({
  appBarItem: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    // Dense toolbar is always of that height.
    minHeight: 48,
  },
  right: {
    flexGrow: 1,
  },
}));

type AppBarProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export default function AppBar({ darkMode, setDarkMode }: AppBarProps) {
  const classes = useStyles();

  return (
    <>
      <MuiAppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <Link component={RouterLink} to="/backtest" className={classes.appBarItem}>
            <Typography color="textPrimary" variant="h6">
              Backtest
            </Typography>
          </Link>
          <Link component={RouterLink} to="/optimize" className={classes.appBarItem}>
            <Typography color="textPrimary" variant="h6">
              Optimize
            </Typography>
          </Link>

          <div className={classes.right}></div>

          {darkMode ? <Brightness4OutlinedIcon /> : <Brightness5TwoToneIcon />}
          <Switch
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            color="default"
            name="darkMode"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
        </Toolbar>
      </MuiAppBar>

      {/* Dummy toolbar to add toolbar's worth of space to the top. */}
      <div className={classes.toolbar} />
    </>
  );
}
