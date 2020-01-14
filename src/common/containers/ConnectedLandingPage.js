import { connect } from "react-redux";
import loadable from "@loadable/component";

const LandingPage = loadable(() => import("../pages/LandingPage"));

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

function loadData(store, match, req) {}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingPage)
};
