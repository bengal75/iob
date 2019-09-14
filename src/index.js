import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
    lightMossGreen: "#bad9b5",
    tartyRed: "#f44e5c",
    copperOrange: "#cd724d",
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

const listenForPromptEvent = updateDeferredPrompt => {
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    updateDeferredPrompt(e);
  });
};

const WrappedApp = () => {
  const [deferredPrompt, updateDeferredPrompt] = useState(null);
  useEffect(() => listenForPromptEvent(updateDeferredPrompt), []);
  return (
    <BrowserRouter>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App installEvent={{ deferredPrompt, updateDeferredPrompt }} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<WrappedApp />, document.getElementById("root"));
serviceWorker.register();
