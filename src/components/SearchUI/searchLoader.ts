declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => unknown;
    __pagefindAssetsPromise?: Promise<void>;
    __pagefindInitPromise?: Promise<void>;
  }
}

const SEARCH_SELECTOR = "#search.pagefind-init, #search.pagefind-ui";

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
    if (document.querySelector(`script[data-search-script="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.searchScript = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
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
  if (!searchRoot) return;

  if (searchRoot.dataset.pagefindReady === "true") return;

  if (!window.__pagefindInitPromise) {
    window.__pagefindInitPromise = (async () => {
      await ensurePagefindLoaded();

      if (!window.PagefindUI) return;

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
      searchRoot.classList.remove("pagefind-init");
    })().finally(() => {
      window.__pagefindInitPromise = undefined;
    });
  }

  await window.__pagefindInitPromise;
}

