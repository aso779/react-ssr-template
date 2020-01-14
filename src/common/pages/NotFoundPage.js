import React from "react";
import loadable from "@loadable/component";
const NotFound = loadable(() => import("../components/NotFound"));

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <NotFound />;
};

export default {
  component: NotFoundPage
};
