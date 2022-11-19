import { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
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
  const [darkMode, setDarkMode] = useLocalStorageState("darkMode", {
    defaultValue: useMediaQuery("(prefers-color-scheme: dark)"),
  });

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
                  <Routes>
                    <Route path="/" element={<BacktestDashboard />} />

                    <Route path="/backtest" element={<BacktestDashboard />} />
                    <Route path="/backtest/:session" element={<BacktestSession />} />

                    <Route path="/optimize" element={<OptimizationDashboard />} />
                    <Route path="/optimize/:session" element={<OptimizationSession />} />
                    <Route
                      path="/optimize/:session/:generation/:individual"
                      element={<OptimizationIndividual />}
                    />

                    <Route element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Box>
            </Navigation>
          </Router>
        </ErrorProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
