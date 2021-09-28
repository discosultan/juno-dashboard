import { Link as RouterLink } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5TwoToneIcon from "@mui/icons-material/Brightness5TwoTone";

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
      <MuiAppBar position="static">
        <Toolbar variant="dense">
          {links.map((link) => (
            <Link key={link.to} component={RouterLink} to={link.to} sx={{ marginRight: 2 }}>
              <Typography color="textPrimary" variant="h6">
                {link.label}
              </Typography>
            </Link>
          ))}

          <Box flexGrow={1} />

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
    </>
  );
}
