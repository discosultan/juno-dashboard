import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  // TODO: Remove in MUI v5.
  // https://stackoverflow.com/a/64135466
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import useLocalStorageState from 'use-local-storage-state';
import Loading from 'components/Loading';
import Navigation from 'components/Navigation';

const BacktestDashboard = lazy(() => import('pages/backtest/index'));
const OptimizationDashboard = lazy(() => import('pages/optimization/index'));
const OptimizationSession = lazy(() => import('pages/optimization/Session'));
const OptimizationIndividual = lazy(() => import('pages/optimization/Individual'));

const styles = {
  main: {
    width: '100%',
    minHeight: 'calc(100vh - 72px)',
    backgroundImage: 'url(crystal-corner.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 0',
    backgroundSize: '450px 450px',
  },
};

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorageState(
    'darkMode',
    useMediaQuery('(prefers-color-scheme: dark)'),
  );

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode}>
            <Box component="main" style={styles.main} p={1}>
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route path="/backtest" component={BacktestDashboard} />
                  <Route
                    path="/optimize/:session/:generation/:individual"
                    component={OptimizationIndividual}
                  />
                  <Route path="/optimize/:session" component={OptimizationSession} />
                  <Route path="/optimize" component={OptimizationDashboard} />
                </Switch>
              </Suspense>
            </Box>
          </Navigation>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
