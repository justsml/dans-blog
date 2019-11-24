import cheerio from "cheerio";
import { forceCheck } from "react-lazyload";
// import { navigateTo } from 'gatsby-link';

export const extractTagContent = (selector, html) => {
  const $ = cheerio.load(html);
  return $(selector)
    .text()
    .trim();
};

export const removeBySelector = (selector, html) => {
  const $ = cheerio.load(html);
  // console.info(`$('${selector}')`, $(selector))
  $(selector)
    .first()
    .remove();
  return cleanupCheerioHtml($.html());
};

const cleanupCheerioHtml = html => {
  return html
    .replace(`<html><head></head><body>`, "")
    .replace(`</body></html>`, "")
    .trim();
};

export const stripHtml = html =>
  html && html.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim, "");

export const isHtml = text => /^---/.test(text) || text.split(/<[^>]+>/).length > 1;
export const isMarkdown = text => /^---/.test(text) || /^#/.test(text) >= 1;

export const extractBlockquote = html => html && html.match(/<blockquote>[^<]*<\/blockquote>/gim);
export const extractH1 = html =>
  html && /(<\/?h1>)/gim.test(html) ? html.split(/(<\/?h1>)/gim)[0] : "";
export const extractH2 = html =>
  html && /(<\/?h2>)/gim.test(html) ? html.split(/(<\/?h2>)/gim)[0] : "";
export const extractH3 = html =>
  html && /(<\/?h3>)/gim.test(html) ? html.split(/(<\/?h3>)/gim)[0] : "";

export function featureNavigator(e) {
  e && e.preventDefault();

  if (this.props.navigatorPosition === "is-aside") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-featured");

      setTimeout(() => {
        this.props.setNavigatorPosition("resizing-featured");
        setTimeout(() => {
          this.props.setNavigatorPosition("is-featured");
          this.props.setNavigatorShape("open");

          // uncomment following lines if you want to count featuring Navigator as a visit
          // to index page ('/'), you have to also uncomment import { navigateTo }...
          /*
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
          */
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-featured");
      }, 0);
    }
  }
}

export function moveNavigatorAside(e) {
  const target = e ? e.currentTarget : null;
  const dataShape = target ? target.getAttribute("data-shape") : null;
  const navigatorShape = dataShape ? dataShape : "open";

  if (this.props.navigatorPosition === "is-featured") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-aside");

      setTimeout(() => {
        if (typeof window !== `undefined`) {
          if (window.location.pathname !== "/") {
            this.props.setNavigatorPosition("resizing-aside");
            this.props.setNavigatorShape(navigatorShape);
            setTimeout(() => {
              this.props.setNavigatorPosition("is-aside");
              setTimeout(forceCheck, 600);
            });
          }
        }
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-aside");
      }, 100);
    }
  }
}
