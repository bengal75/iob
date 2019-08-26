import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  colour: {
    // Coolors Exported Palette - coolors.co/7155d6-bdabfc-fbfbfb-7c65ce-504087
    darkSlateBlue: "#504087",
    slateBlue: "#7155d6",
    toolbox: "#7c65ce",
    paleViolet: "#bdabfc",
    snow: "#fbfbfb",
  },
  palette: {
    primary: { main: "#504087" },
    secondary: { main: "#7155d6" },
    background: {
      paper: "#fff",
      default: "#fbfbfb",
    },
  },
  navDrawerWidth: 240,
});

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.register();
