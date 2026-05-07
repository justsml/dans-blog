declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => unknown;
    __pagefindAssetsPromise?: Promise<void>;
    __pagefindInitPromise?: Promise<void>;
  }
}

const SEARCH_SELECTOR = "#search.pagefind-init, #search.pagefind-ui";
const SEARCH_ERROR_CLASS = "search-fallback";

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
        });

        searchRoot.dataset.pagefindReady = "true";
        delete searchRoot.dataset.pagefindError;
        searchRoot.classList.remove("pagefind-init");
        searchRoot.querySelector(`.${SEARCH_ERROR_CLASS}`)?.remove();
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
