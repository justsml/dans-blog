declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => unknown;
    __pagefindAssetsPromise?: Promise<void>;
    __pagefindInitPromise?: Promise<void>;
  }
}

const SEARCH_SELECTOR = "#search.pagefind-init, #search.pagefind-ui";
const SEARCH_ERROR_CLASS = "search-fallback";
const RESULT_SELECTOR = ".pagefind-ui__result";
const RESULT_LINK_SELECTOR = ".pagefind-ui__result-link";
const RESULT_INNER_SELECTOR = ".pagefind-ui__result-inner";
const RESULT_SECTION_CLASS = "pagefind-ui__result-section";

type PagefindResult = {
  url?: string;
  meta?: {
    section?: string;
    url?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

const resultSectionsByPath = new Map<string, string>();

function loadStyleOnce(href: string) {
  if (document.querySelector(`link[data-search-style="${href}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.searchStyle = href;
  document.head.appendChild(link);
}

function loadScriptOnce(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-search-script="${src}"]`,
    );
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.searchScript = src;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
    document.body.appendChild(script);
  });
}

async function ensurePagefindLoaded() {
  if (!window.__pagefindAssetsPromise) {
    window.__pagefindAssetsPromise = (async () => {
      loadStyleOnce("/pagefind/pagefind-ui.css");
      await loadScriptOnce("/pagefind/pagefind-ui.js");
    })();
  }

  await window.__pagefindAssetsPromise;
}

export async function ensurePagefindInitialized() {
  const searchRoot = document.querySelector<HTMLElement>("#search");
  if (!searchRoot) return false;

  if (searchRoot.dataset.pagefindReady === "true") return true;

  if (!window.__pagefindInitPromise) {
    window.__pagefindInitPromise = (async () => {
      try {
        await ensurePagefindLoaded();

        if (!window.PagefindUI) {
          throw new Error(
            "Pagefind UI loaded, but window.PagefindUI was not available.",
          );
        }

        const pageSize = Number.parseInt(
          searchRoot.dataset.pageSize || "25",
          10,
        );
        const showImages = searchRoot.dataset.showImages === "true";

        new window.PagefindUI({
          element: SEARCH_SELECTOR,
          bundlePath: searchRoot.dataset.bundlePath || "/pagefind/",
          showImages,
          pageSize,
          processResult: rememberResultSection,
        });

        searchRoot.dataset.pagefindReady = "true";
        delete searchRoot.dataset.pagefindError;
        searchRoot.classList.remove("pagefind-init");
        searchRoot.querySelector(`.${SEARCH_ERROR_CLASS}`)?.remove();
        installSearchResultSectionDecorator(searchRoot);
      } catch (error) {
        window.__pagefindAssetsPromise = undefined;
        renderSearchLoadError(searchRoot, error);
      }
    })().finally(() => {
      window.__pagefindInitPromise = undefined;
    });
  }

  await window.__pagefindInitPromise;
  return searchRoot.dataset.pagefindReady === "true";
}

function renderSearchLoadError(searchRoot: HTMLElement, error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unknown search loading error.";
  const sentence = message.endsWith(".") ? message : `${message}.`;
  searchRoot.dataset.pagefindReady = "false";
  searchRoot.dataset.pagefindError = message;

  searchRoot.replaceChildren();
  searchRoot.classList.remove("pagefind-init");

  const wrapper = document.createElement("div");
  wrapper.className = SEARCH_ERROR_CLASS;
  wrapper.setAttribute("role", "alert");

  const title = document.createElement("p");
  title.className = "search-fallback__title";
  title.textContent = "Search could not load.";

  const body = document.createElement("p");
  body.className = "search-fallback__body";
  body.textContent = `${sentence} Refresh the page and try again. If this is local development, restart the Astro dev server when Vite reports stale optimized dependencies.`;

  wrapper.append(title, body);
  searchRoot.append(wrapper);
}

function rememberResultSection(result: PagefindResult) {
  const section = sanitizeSection(result.meta?.section);
  const path = normalizeResultPath(result.meta?.url ?? result.url);
  if (section && path) {
    resultSectionsByPath.set(path, section);
  }
  return result;
}

function installSearchResultSectionDecorator(searchRoot: HTMLElement) {
  if (searchRoot.dataset.resultSectionsReady === "true") return;

  const decorate = () => decorateSearchResults(searchRoot);
  const observer = new MutationObserver(decorate);
  observer.observe(searchRoot, { childList: true, subtree: true });
  decorate();

  searchRoot.dataset.resultSectionsReady = "true";
}

function decorateSearchResults(searchRoot: HTMLElement) {
  searchRoot.querySelectorAll<HTMLElement>(RESULT_SELECTOR).forEach((result) => {
    const link = result.querySelector<HTMLAnchorElement>(RESULT_LINK_SELECTOR);
    const path = normalizeResultPath(link?.href);
    const section = sanitizeSection(
      (path && resultSectionsByPath.get(path)) || inferSectionFromPath(path),
    );
    if (!section) return;

    const sectionSlug = slugifySection(section);
    result.dataset.searchSection = sectionSlug;

    const inner = result.querySelector<HTMLElement>(RESULT_INNER_SELECTOR);
    if (!inner) return;

    const title = inner.querySelector<HTMLElement>(".pagefind-ui__result-title");
    const existingBadge = inner.querySelector<HTMLElement>(
      `.${RESULT_SECTION_CLASS}`,
    );
    if (existingBadge) {
      if (existingBadge.textContent !== section) {
        existingBadge.textContent = section;
      }
      if (title && title.nextElementSibling !== existingBadge) {
        title.after(existingBadge);
      }
      return;
    }

    const badge = document.createElement("span");
    badge.className = RESULT_SECTION_CLASS;
    badge.textContent = section;
    if (title) {
      title.after(badge);
    } else {
      inner.prepend(badge);
    }
  });
}

function normalizeResultPath(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const url = new URL(value, window.location.href);
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return value.split("#")[0]?.split("?")[0]?.replace(/\/+$/, "") || "/";
  }
}

function sanitizeSection(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
}

function slugifySection(section: string) {
  return section
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "pages";
}

function inferSectionFromPath(path: string) {
  const unlocalizedPath = path.replace(
    /^\/(?:ar|de|es|fr|he|hi|it|ja|ru|zh)(?=\/)/,
    "",
  );

  if (unlocalizedPath.startsWith("/consulting")) return "Consulting";
  if (unlocalizedPath.startsWith("/open-source-journal")) return "Open Source";
  if (unlocalizedPath.startsWith("/challenges")) return "Challenges";
  if (unlocalizedPath.startsWith("/category")) return "Categories";
  if (unlocalizedPath.startsWith("/pages")) return "Archive";
  if (unlocalizedPath.startsWith("/about")) return "About";
  if (unlocalizedPath.startsWith("/contact")) return "Contact";
  if (unlocalizedPath === "/") return "Home";
  return "Article";
}
