import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import proxy from "http-proxy-middleware";
import { createMemoryHistory } from "history";
import { matchRoutes } from "react-router-config";
import Routes from "../Routes";
import renderer from "./renderer";
import createStore from "./createStore";

const app = express();
const port = 3000;

const apiProxy = proxy("/api", {
  target: IS_DEVELOPMENT
    ? "http://dev.api"
    : "http://prod.api"
});

app.use("/api", apiProxy);
app.use(express.static("public"));
app.use(express.static("dist"));
app.get("*", (req, res) => {
  const history = createMemoryHistory({
    initialEntries: [req.url]
  });

  const store = createStore(req, history);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route, match }) => {
      return route.loadData ? route.loadData(store, match, req) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise(resolve => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context, history);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
