import { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import useLocalStorageState from "use-local-storage-state";

import background from "assets/crystal-corner.png";
import Loading from "components/Loading";
import Navigation from "components/Navigation";
import NotFound from "components/NotFound";
import ErrorProvider from "components/ErrorProvider";

const BacktestDashboard = lazy(() => import("pages/backtest/index"));
const BacktestSession = lazy(() => import("pages/backtest/Session"));

const OptimizationDashboard = lazy(() => import("pages/optimize/index"));
const OptimizationSession = lazy(() => import("pages/optimize/Session"));
const OptimizationIndividual = lazy(() => import("pages/optimize/Individual"));

const styles = {
  main: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "100% 0",
    backgroundSize: "450px 450px",
  },
};

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorageState(
    "darkMode",
    useMediaQuery("(prefers-color-scheme: dark)"),
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
        components: {
          MuiTextField: {
            defaultProps: {
              variant: "standard",
            },
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
      </LocalizationProvider>
    </ThemeProvider>
  );
}
