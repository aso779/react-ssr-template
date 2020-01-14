import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyle from "./theme/GlobalStyle";
import ScrollToTop from "./components/ScrollToTop";

const App = ({ route }) => {
  return (
    <>
      <ScrollToTop>
        <div id="wrap" className="wrap">
          <GlobalStyle />
          <Header />
          {renderRoutes(route.routes)}
        </div>
        <Footer />
      </ScrollToTop>
    </>
  );
};

export default {
  component: App
};
