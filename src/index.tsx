import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import AuthContextProvider from "./state/AuthContextProvider";
import { Provider } from "react-redux";
import store from "./store/index";

Sentry.init({
  dsn: "https://1e479594dfba47a9a4b7f2243ce7a1c8@o1184201.ingest.sentry.io/6301735",
  // integrations: [new BrowserTracing()],

  // // Set tracesSampleRate to 1.0 to capture 100%
  // // of transactions for performance monitoring.
  // // We recommend adjusting this value in production
  // tracesSampleRate: 0.2,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
