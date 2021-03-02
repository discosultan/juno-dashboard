import { Link, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Logo from 'components/Logo';

const styles = {
  drawer: {
    width: '184px',
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
          selected={location.pathname.startsWith('/backtest')}
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
          selected={location.pathname.startsWith('/optimize')}
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
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
          {darkMode ? 'Dark' : 'Light'} Mode
        </ListItem>
      </List>
    </Drawer>
  );
}
