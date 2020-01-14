import React from "react";
import App from "./common/App";
import ConnectedLandingPage from "./common/containers/ConnectedLandingPage";
import NotFoundPage from "./common/pages/NotFoundPage";

export default [
  {
    ...App,
    routes: [
      {
        ...ConnectedLandingPage,
        path: "/",
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
