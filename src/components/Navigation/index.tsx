import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/styles";
import { ReactNode } from "react";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";

type NavigationProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  children?: ReactNode;
};

export default function Navigation({ darkMode, setDarkMode, children }: NavigationProps) {
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <Box display="flex" flexDirection="row">
      <AppDrawer darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </Box>
  ) : (
    <Box display="flex" flexDirection="column">
      <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </Box>
  );
}
