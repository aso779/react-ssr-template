import "core-js/stable/promise";
import "regenerator-runtime/runtime";
import React from "react";
import { hydrate } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { loadableReady } from "@loadable/component";
import { renderRoutes } from "react-router-config";
import Routes from "../Routes";
import { ThemeProvider } from "styled-components";
import theme from "../common/theme/defaultTheme";
import axios from "axios";
import reducers from "../common/reducers";

const axiosInstance = axios.create({
  baseURL: "/api"
});

const history = createBrowserHistory();

const composeEnhancers = IS_DEVELOPMENT
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const store = createStore(
  reducers(history),
  window.INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk.withExtraArgument(axiosInstance)
    )
  )
);

loadableReady(() => {
  const root = document.getElementById("root");
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>{renderRoutes(Routes)}</ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    root
  );
});
