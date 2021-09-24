import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import ExploreIcon from "@mui/icons-material/Explore";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Logo from "components/Logo";

const styles = {
  drawer: {
    width: "184px",
  },
};

type AppDrawerProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export default function AppDrawer({ darkMode, setDarkMode }: AppDrawerProps) {
  const location = useLocation();

  return (
    <Drawer variant="permanent" anchor="left" style={styles.drawer}>
      <Box p={1}>
        <Logo />
      </Box>

      <Divider />

      <List>
        <ListItem
          button
          component={Link}
          to="/backtest"
          selected={location.pathname.startsWith("/backtest")}
        >
          <ListItemIcon>
            <FastRewindIcon />
          </ListItemIcon>
          <ListItemText primary="Backtest" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/optimize"
          selected={location.pathname.startsWith("/optimize")}
        >
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Optimize" />
        </ListItem>
      </List>

      <Divider />

      <Box flexGrow={1} />

      <Divider />

      <List>
        <ListItem>
          <Brightness4Icon />
          <Switch
            checked={darkMode}
            onChange={(event) => setDarkMode(event.target.checked)}
            color="default"
            name="darkMode"
            inputProps={{ "aria-label": "toggle dark mode" }}
          />
          {darkMode ? "Dark" : "Light"} Mode
        </ListItem>
      </List>
    </Drawer>
  );
}
