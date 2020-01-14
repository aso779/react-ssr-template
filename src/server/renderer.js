import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import { StaticRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Context as ResponsiveContext } from "react-responsive";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../Routes";
import theme from "../common/theme/defaultTheme";
import { ChunkExtractor } from "@loadable/server";
import path from "path";

export default (req, store, context, history) => {
  const statsFile = path.resolve("./build/loadable-stats.json");
  const extractor = new ChunkExtractor({ statsFile });
  const sheet = new ServerStyleSheet();
  const jsx = extractor.collectChunks(
    sheet.collectStyles(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>{renderRoutes(Routes)}</ThemeProvider>
          </StaticRouter>
        </ConnectedRouter>
      </Provider>
    )
  );

  const content = renderToString(
    <ResponsiveContext.Provider value={{ width: 1440 }}>
      {jsx}
    </ResponsiveContext.Provider>
  );
  const scriptTags = extractor.getScriptTags();
  const tagManagerHead = IS_DEVELOPMENT
    ? ""
    : ` <!-- Google Tag Manager -->
            <!-- End Google Tag Manager -->`;
  const tagManagerBody = IS_DEVELOPMENT
    ? ""
    : `<!-- Google Tag Manager (noscript) -->
            <!-- End Google Tag Manager (noscript) -->`;
  const facebookPixelHead = IS_DEVELOPMENT
    ? ""
    : ` <!-- Facebook Pixel Code -->
            <!-- End Facebook Pixel Code -->`;
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();
  const linkTags = extractor.getLinkTags();
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            ${tagManagerHead}
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
<!--            <link href="https://fonts.googleapis.com/css?" rel="stylesheet"> -->
            ${linkTags}
            ${styleTags}
<!--            <meta property="og:image" content=""/>-->
            ${facebookPixelHead}
        </head>
        <body>
            ${tagManagerBody}
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            ${scriptTags}
        </body>
    </html>
    `;
};
