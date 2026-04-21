import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";

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

async function ensurePagefindInitialized() {
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

export const SearchButton = () => {
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      // Small delay to prevent interference with other click handlers
      setTimeout(() => {
        const $searchBar = document.querySelector(".searchBar");
        if (!$searchBar || $searchBar.classList.contains("collapsed")) return;
        
        const searchContainer = $searchBar.querySelector(".pagefind-ui");
        const target = e.target as HTMLElement;
        
        // Don't close if clicking on search input, results, or any search-related elements
        if (searchContainer && !searchContainer.contains(target)) {
          // Also check if we're clicking on the search button itself
          const searchButton = target.closest('.btnSearchToggle');
          const navMenu = target.closest('.NavigationMenuRoot');
          
          // Don't close if clicking search button or nav menu
          if (!searchButton && !navMenu) {
            $searchBar.classList.add("collapsed");
            document.body.classList.remove("search-panel-open");
          }
        }
      }, 10);
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const $searchBar = document.querySelector(".searchBar");
        if ($searchBar && !$searchBar.classList.contains("collapsed")) {
          $searchBar.classList.add("collapsed");
          document.body.classList.remove("search-panel-open");
        }
      }
    };

    // Add event listeners
    document.addEventListener("click", handleBackdropClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleBackdropClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const $searchBar = document.querySelector(".searchBar");
    if (!$searchBar) return console.warn(`Missing '.searchBar' element`);
    
    const isCurrentlyCollapsed = $searchBar.classList.contains("collapsed");
    
    if (isCurrentlyCollapsed) {
      // Close any open nav menu panels before opening search
      // Dispatch custom event to close nav panels
      document.dispatchEvent(new CustomEvent('closeNavPanels'));
      
      await ensurePagefindInitialized();
      $searchBar.classList.remove("collapsed");
      document.body.classList.add("search-panel-open");
      
      // Auto-focus the search input after animation
      setTimeout(() => {
        const searchInput = $searchBar.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }, 350);
    } else {
      $searchBar.classList.add("collapsed");
      document.body.classList.remove("search-panel-open");
    }
  };

  return (
    <Button
      title="Toggle search panel"
      type="button"
      className={"btnSearchToggle p-1"}
      variant={"ghost"}
      onClick={handleToggle}
    >
      <SearchIcon />
    </Button>
  );
};
