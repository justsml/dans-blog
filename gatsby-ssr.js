require("dotenv").config();
import { JssProvider } from "react-jss";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import React from "react";
// import csso from "csso";
// import minifier from "./src/utils/minifier";
import getPageContext from "./src/getPageContext";
import createStore from "./src/state/store";
import { minifiedFontFace } from "./src/styles/gfonts-open-sans-snippet";

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const pageContext = getPageContext();
  const store = createStore();

  replaceBodyHTMLString(
    renderToString(
      <Provider store={store}>
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          {React.cloneElement(bodyComponent, {
            pageContext
          })}
        </JssProvider>
      </Provider>
    )
  );

  // const minifiedCss = csso.minify(pageContext.sheetsRegistry.toString()).css;

  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      dangerouslySetInnerHTML={{
        __html: minifiedFontFace + "\n" + pageContext.sheetsRegistry.toString()
      }}
    />
  ]);
};

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  const unregisterJs = `
(function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(workers => {
      if (workers && workers.length > 0) {
        workers.forEach(sw => sw.unregister());
      }
    });
  }
})();
`;
  setHeadComponents([
    <script key="ssr-sw-unregister" dangerouslySetInnerHTML={{ __html: unregisterJs }} />
  ]);
  // exports.onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([]);
};
