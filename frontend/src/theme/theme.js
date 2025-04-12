// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#006400",
      light: "#338a33",
      dark: "#004d00",
    },
    secondary: {
      main: "#ff5722",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          width: 320,
        },
      },
    },
  },
});
