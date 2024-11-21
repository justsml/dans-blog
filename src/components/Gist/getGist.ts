import { diskCache } from "../../shared/diskCache";
import querystring from "node:querystring";

const GITHUB_TOKEN =
  import.meta.env.VITE_GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN;

interface LoadGistOptions {
  username: string;
  secretToken: string;
  truncate: boolean;
  includeDefaultCss: boolean;
  ignoreErrors?: boolean;
}

type PluginOptions = {
  /* the default gist user */
  username?: string;
  /* the github secret access token */
  secretToken?: string;
  /* a string that represents the github default gist css url */
  gistCssUrlAddress?: string;
  /* reduce output size 15-35% */
  truncate?: boolean;
  /* flag indicating whether the github default gist css should be included */
  includeDefaultCss?: boolean;
  /* flag indicating whether the github default gist css should be included */
  gistDefaultCssInclude?: boolean;
  /* flag indicating whether the github default gist css should be preloaded */
  gistCssPreload?: boolean;
};

const baseUrl = "https://gist.github.com";


export const getGist = async (
  fullUrl: string,
  { username, secretToken, truncate, includeDefaultCss }: LoadGistOptions = {
    username: "",
    secretToken: "",
    truncate: true,
    includeDefaultCss: true,
  },
) => {
  let loadedFromCache = true;
  let gist: unknown = await diskCache.get(fullUrl);
  if (!gist) {
    loadedFromCache = false;
    gist = await loadGist(fullUrl, {
      username,
      secretToken,
      truncate,
      includeDefaultCss,
      gistDefaultCssInclude: false,
    }).catch((error: unknown) => {
      console.error("\n\n\n🚨 Failed to load gist", error);
      return null;
    });
    if (!gist) {
      throw new Error(`Failed to load gist: ${fullUrl}`);
    }
    diskCache.set(fullUrl, gist);
  }
  return gist;
};


function removeGistClasses(html: string) {
  return html
    ?.replaceAll(/\bgist-file\b/g, "")
    .replaceAll(/\bgist-meta\b/g, "")
    .replaceAll(/\bgist-data\b/g, "")
    .replaceAll(/\bgist-embed-wrapper\b/g, "")
    .replaceAll(/\bgist-embed\b/g, "")
    .replaceAll(`class="gist"`, "");
}
/**
 * Handles the markdown AST.
 */
async function loadGist(path: string, options: PluginOptions = {}) {
  // get the query string and build the url
  const query = getQuery(path);
  const url = buildUrl(path, options, query.file);

  // console.log("loadGist", url);
  // call the gist and update the node type and value
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      // "application/vnd.github.v3.html+json",
      Authorization: `Bearer ${options.secretToken ?? GITHUB_TOKEN}`,
    },
  }).catch(handleError(url));
  const content = response ? await response.json() : {};
  const disableStyles = options.includeDefaultCss === false;
  console.warn("content", content.div);
  // let html = content.div;
  // const truncate = Boolean(query.truncate) || Boolean(options.truncate);
  // const hasLines = query.lines.length > 0;
  // const hasHighlights = query.highlights.length > 0;

  // if (hasHighlights || hasLines) {
  //   const $ = cheerio.load(html);
  //   const file = query.file
  //     ? query.file
  //         .replace(/^\./, "")
  //         .replace(/[^a-zA-Z0-9_]+/g, "-")
  //         .toLowerCase()
  //     : "";
  //   const selectorPrefix = truncate ? "#LC" : `#file-${file}-LC`;

  //   // highlight the specify lines, if any
  //   if (hasHighlights) {
  //     query.highlights.forEach((line: any) => {
  //       $(`${selectorPrefix}${line}`).addClass("highlighted");
  //     });
  //   }

  //   // remove the specific lines, if any
  //   if (hasLines) {
  //     const codeLines = parse(`1-${$("table tr").length}`);
  //     codeLines.forEach((line: any) => {
  //       if (query.lines.includes(line)) return;

  //       $(`${selectorPrefix}${line}`).parent().remove();
  //     });
  //   }

  //   html = $.html({ decodeEntities: false, normalizeWhitespace: true });
  // }
  const level = options.truncate ? 2 : 0;

  if (options.truncate) content.div = truncateGist(content.div, level);
  if (disableStyles) content.div = removeGistClasses(content.div);

  return content;
}

/**
 * Validates the query options are valid.
 */
function isValid(query: querystring.ParsedUrlQuery | { file: any } | null) {
  if (query == null) return false;
  if (query.file == null) {
    //  && query.highlights == null && query.lines == null
    return false;
  }

  // leaving this for future enhancements to the query object

  return true;
}

/**
 * Builds the query object.
 * This methods looks for anything that is after ? or # in the gist: directive.
 * ? is interpreted as a query string.
 * # is interpreted as a filename.
 */
function getQuery(value: string): Record<string, any> {
  // console.info("getQuery", value);
  const hash = value.includes("#");

  // this will give us
  // a) qs with length 0 - no file, no querystring
  // b) qs with length 1 - either a #file or a ?querystring
  // c) qs with length 2 - a #file and a ?querystring
  // d) qs with length > 2 - malformed
  const [, ...qs] = value.split(/[?#]/);

  // a) and d) are easy
  if (qs.length === 0) return { highlights: [], lines: [] };
  if (qs.length > 2) {
    throw new Error("Malformed query. Check your '<Gist>' url format");
  }

  let query;

  // b) is tricky, could be a #file or a ?querystring
  if (qs.length === 1) {
    if (hash) {
      query = { file: qs[0] };
    } else if (qs[0].includes("=")) {
      query = querystring.parse(qs[0]);
    } else {
      throw new Error("Malformed query. Check your '<Gist>' url format");
    }
  } else {
    query = { file: qs[0], ...querystring.parse(qs[1]) };
  }

  // at this point we have an object such as
  // {
  //   file?: string,
  //   highlights?: string || string[],
  //   lines?: string || string[]
  // }
  // so we validate
  if (!isValid(query)) {
    throw new Error("Malformed query. Check your '<Gist>' url format");
  }

  return query;
}

/**
 * Builds the gist url.
 *
 * @param value the gist value
 * @param options the plugin options
 * @param file the file to load
 */
function buildUrl(value: string, options: PluginOptions, file: null) {
  let url = `${baseUrl}/`;
  const [gist] = value.split(/[?#]/);
  const [inlineUsername, id] =
    gist.indexOf("/") > 0 ? gist.split("/") : [null, gist];
  const username = inlineUsername || options.username;
  if (username == null || username.trim().length === 0)
    throw new Error("Missing username information");
  if (id == null || id.trim().length === 0)
    throw new Error("Missing gist id information");

  url += `${username}/${id}.json`;
  if (file != null) url += `?file=${file}`;

  return url;
}

const handleError = (url: string) => (error: any) => {
  console.error(
    `\n\n\n\n\n🚨 Failed to load GitHub Gist: ${url}\n\n\n\n`,
    error,
  );
  return null;
};

/**
 * Shrinks size of HTML returned by the GitHub/Gist API.
 * @param {string} html input HTML
 * @param {number} [level=false] only for tests, omits attribution comment.
 * @returns {string} the mangled/truncated HTML.
 */
function truncateGist(html: string, level: 0 | 1 | 2 = 0): string {
  // DANGER: This could mangle your content!
  if (level >= 2) {
    html = replaceAll(html, /\bfile-[^\s]*-L/gim, "L");
    html = replaceAll(html, /\bblob-code\b/gm, "b-c");
    html = replaceAll(html, /\bblob-num\b/gm, "b-n");
    html = replaceAll(html, /\bblob-/gm, "b-");
    html = replaceAll(html, /\bmarkdown-body/gm, "md-b");
  }
  if (level >= 1) {
    html = replaceAll(html, /\bdata-line-number=/gm, "data-ln=");
    html = replaceAll(html, /([^\s]*)-line-number/gm, "$1-ln");
    html = replaceAll(html, /([^\s]*)-file-line/gm, "$1-fln");
  }
  // Remove whitespace at the beginning of lines
  html = replaceAll(html, /^\s+</gm, "<");
  // Remove extra blank lines
  html = replaceAll(html, /^\s+$\n/gim, "\n");
  return html;
}

const replaceAll = (str: string, pattern: RegExp, replace: string): string => {
  if (!str) throw new Error("Missing Gist data for: " + pattern + " " + replace);
  const result = str.replace(pattern, replace);
  if (result === str) return result;
  return replaceAll(result, pattern, replace);
};

