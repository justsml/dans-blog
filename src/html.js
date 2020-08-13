/* eslint  react/prop-types: 0 */
import React from "react";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.headComponents}
          {css}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
          <meta name="apple-mobile-web-app-title" content="Dan Levy's Blog" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-57x57.png" sizes="57x57" key="57" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-60x60.png" sizes="60x60" key="60" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-72x72.png" sizes="72x72" key="72" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-76x76.png" sizes="76x76" key="76" />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-114x114.png"
            sizes="114x114"
            key="114"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-120x120.png"
            sizes="120x120"
            key="120"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-144x144.png"
            sizes="144x144"
            key="144"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-152x152.png"
            sizes="152x152"
            key="152"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/apple-icon-180x180.png"
            sizes="180x180"
            key="180"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
            key="16"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
            key="32"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/icons/favicon-96x96.png"
            key="96"
          />
          <link
            rel="stylesheet"
            key="open-sans-font"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&amp;display=swap"
          />
        </head>
        <body {...this.props.bodyAttributes}>
          <noscript>You need to enable JavaScript to run this app!</noscript>
          {this.props.preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}

          <script src="https://platform.twitter.com/widgets.js" charSet="utf-8" async defer />
          <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer />
        </body>
      </html>
    );
  }
};
