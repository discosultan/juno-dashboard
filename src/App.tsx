import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
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

import background from 'assets/crystal-corner.png';
import Loading from 'components/Loading';
import Navigation from 'components/Navigation';
import NotFound from 'components/NotFound';
import ErrorProvider from 'components/ErrorProvider';

const BacktestDashboard = lazy(() => import('pages/backtest/index'));
const BacktestSession = lazy(() => import('pages/backtest/Session'));

const OptimizationDashboard = lazy(() => import('pages/optimize/index'));
const OptimizationSession = lazy(() => import('pages/optimize/Session'));
const OptimizationIndividual = lazy(() => import('pages/optimize/Individual'));

const styles = {
  main: {
    width: '100%',
    minHeight: 'calc(100vh - 72px)',
    backgroundImage: `url(${background})`,
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
        <ErrorProvider>
          <Router>
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode}>
              <Box component="main" style={styles.main} p={1}>
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route exact path="/" render={() => <Redirect to="/backtest" />} />

                    <Route exact path="/backtest" component={BacktestDashboard} />
                    <Route exact path="/backtest/:session" component={BacktestSession} />

                    <Route exact path="/optimize" component={OptimizationDashboard} />
                    <Route exact path="/optimize/:session" component={OptimizationSession} />
                    <Route
                      exact
                      path="/optimize/:session/:generation/:individual"
                      component={OptimizationIndividual}
                    />

                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </Box>
            </Navigation>
          </Router>
        </ErrorProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
