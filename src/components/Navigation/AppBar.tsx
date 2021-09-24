import { Link as RouterLink } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5TwoToneIcon from "@mui/icons-material/Brightness5TwoTone";

const styles = {
  toolbar: {
    // Dense toolbar is always of that height.
    minHeight: 48,
  },
  right: {
    flexGrow: 1,
  },
};

const links = [
  {
    to: "/backtest",
    label: "Backtest",
  },
  {
    to: "/optimize",
    label: "Optimize",
  },
];

type AppBarProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export default function AppBar({ darkMode, setDarkMode }: AppBarProps) {
  return (
    <>
      <MuiAppBar sx={{ marginRight: 2 }}>
        <Toolbar variant="dense">
          {links.map((link) => (
            <Link key={link.to} component={RouterLink} to={link.to} sx={{ marginRight: 2 }}>
              <Typography color="textPrimary" variant="h6">
                {link.label}
              </Typography>
            </Link>
          ))}

          <div style={styles.right}></div>

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
      <div style={styles.toolbar} />
    </>
  );
}
