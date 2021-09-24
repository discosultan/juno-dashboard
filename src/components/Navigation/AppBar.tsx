import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import MuiAppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import Switch from "@mui/material/Switch";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5TwoToneIcon from "@mui/icons-material/Brightness5TwoTone";
import { Theme } from "@mui/system";

const useStyles = makeStyles<Theme>((theme) => ({
  appBarItem: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    // TODO: improve typing.
    zIndex: (theme!.zIndex as any).drawer + 1,
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
            inputProps={{ "aria-label": "toggle dark mode" }}
          />
        </Toolbar>
      </MuiAppBar>

      {/* Dummy toolbar to add toolbar's worth of space to the top. */}
      <div className={classes.toolbar} />
    </>
  );
}
