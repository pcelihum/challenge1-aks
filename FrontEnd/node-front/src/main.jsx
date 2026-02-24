import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c3aed" },   // violeta
    secondary: { main: "#22d3ee" }, // cyan
    background: {
      default: "#070A12",
      paper: "rgba(255,255,255,0.06)",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700 },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);