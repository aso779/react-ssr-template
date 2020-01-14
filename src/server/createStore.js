import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../common/reducers";

export default (req, history) => {
  const axiosInstance = axios.create({
    baseURL: IS_DEVELOPMENT
      ? "http://dev.api"
      : "http://prod.api",
    headers: { cookie: req.get("cookie") || "" }
  });

  return createStore(
    reducers(history),
    {},
    applyMiddleware(
      routerMiddleware(history),
      thunk.withExtraArgument(axiosInstance)
    )
  );
};
