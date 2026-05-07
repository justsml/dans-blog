import { ensurePagefindInitialized } from "./pagefindLoader";

const SEARCH_BAR_SELECTOR = ".searchBar";
const SEARCH_INPUT_SELECTOR = 'input[type="text"]';
const SEARCH_BUTTON_SELECTOR = ".btnSearchToggle";
const SEARCH_CLEAR_SELECTOR = ".pagefind-ui__search-clear";
const NAV_MENU_SELECTOR = ".NavigationMenuRoot";
const SEARCH_PANEL_OPEN_CLASS = "search-panel-open";
const COLLAPSED_CLASS = "collapsed";
const FOCUS_DELAY_MS = 0;
const SEARCH_QUERY_STORAGE_KEY = "danlevy.search.query";
let dismissalInstalled = false;

type ToggleSearchPanelOptions = {
  dispatchCloseNavPanels?: boolean;
};

export function getSearchPanelElement() {
  return document.querySelector<HTMLElement>(SEARCH_BAR_SELECTOR);
}

export function isSearchPanelOpen() {
  const searchPanel = getSearchPanelElement();
  return Boolean(searchPanel && !searchPanel.classList.contains(COLLAPSED_CLASS));
}

export async function openSearchPanel({
  dispatchCloseNavPanels = true,
}: ToggleSearchPanelOptions = {}) {
  const searchPanel = getSearchPanelElement();
  if (!searchPanel) {
    console.warn(`Missing '${SEARCH_BAR_SELECTOR}' element`);
    return false;
  }

  if (dispatchCloseNavPanels) {
    document.dispatchEvent(new CustomEvent("closeNavPanels"));
  }

  positionSearchPanel(searchPanel);
  searchPanel.classList.remove(COLLAPSED_CLASS);
  document.body.classList.add(SEARCH_PANEL_OPEN_CLASS);
  const isSearchReady = await ensurePagefindInitialized();
  if (isSearchReady) {
    restoreSearchPanelQuery(searchPanel);
    installSearchQueryPersistence(searchPanel);
    installSearchClearAndClose(searchPanel);
    focusSearchPanelInput(searchPanel);
  }
  return true;
}

export function closeSearchPanel() {
  const searchPanel = getSearchPanelElement();
  if (!searchPanel) return false;

  searchPanel.classList.add(COLLAPSED_CLASS);
  document.body.classList.remove(SEARCH_PANEL_OPEN_CLASS);
  return true;
}

export async function toggleSearchPanel(options?: ToggleSearchPanelOptions) {
  if (isSearchPanelOpen()) return closeSearchPanel();
  return openSearchPanel(options);
}

export function installSearchPanelDismissal() {
  if (dismissalInstalled) return () => {};
  dismissalInstalled = true;

  const abortController = new AbortController();

  window.addEventListener("resize", () => {
    const searchPanel = getSearchPanelElement();
    if (searchPanel && !searchPanel.classList.contains(COLLAPSED_CLASS)) {
      positionSearchPanel(searchPanel);
    }
  }, { passive: true, signal: abortController.signal });

  document.addEventListener(
    "click",
    (event) => {
      setTimeout(() => closeSearchPanelFromOutsideClick(event), 10);
    },
    { signal: abortController.signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") closeSearchPanel();
    },
    { signal: abortController.signal },
  );

  document.addEventListener(
    "closeSearchPanel",
    () => closeSearchPanel(),
    { signal: abortController.signal },
  );

  return () => {
    dismissalInstalled = false;
    abortController.abort();
  };
}

function closeSearchPanelFromOutsideClick(event: MouseEvent) {
  const searchPanel = getSearchPanelElement();
  if (!searchPanel || searchPanel.classList.contains(COLLAPSED_CLASS)) return;

  const searchContainer = searchPanel.querySelector(".pagefind-ui");
  const target = event.target as HTMLElement | null;
  if (!target || !searchContainer || searchContainer.contains(target)) return;
  if (target.closest(SEARCH_BUTTON_SELECTOR) || target.closest(NAV_MENU_SELECTOR)) {
    return;
  }

  closeSearchPanel();
}

function focusSearchPanelInput(searchPanel: HTMLElement) {
  setTimeout(() => {
    const searchInput =
      searchPanel.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR);
    searchInput?.focus();
    searchInput?.select();
  }, FOCUS_DELAY_MS);
}

function positionSearchPanel(searchPanel: HTMLElement) {
  const menuRoot = document.querySelector<HTMLElement>(NAV_MENU_SELECTOR);
  const menuBox = menuRoot?.getBoundingClientRect();
  const top = Math.max(44, Math.round(menuBox?.bottom ?? 92));
  const rightGap = Math.max(8, Math.round(window.innerWidth - (menuBox?.right ?? window.innerWidth - 16)));
  const width = Math.min(544, Math.max(320, Math.round(menuBox?.width ?? 544)));
  searchPanel.style.setProperty("--search-panel-top", `${top}px`);
  searchPanel.style.setProperty("--search-panel-right-gap", `${rightGap}px`);
  searchPanel.style.setProperty("--search-panel-width", `${width}px`);
}

function installSearchQueryPersistence(searchPanel: HTMLElement) {
  if (searchPanel.dataset.queryPersistenceReady === "true") return;

  searchPanel.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target || target.matches(SEARCH_INPUT_SELECTOR) === false) return;
    const query = target.value.trim();
    if (query) {
      localStorage.setItem(SEARCH_QUERY_STORAGE_KEY, target.value);
    } else {
      localStorage.removeItem(SEARCH_QUERY_STORAGE_KEY);
    }
  });

  searchPanel.dataset.queryPersistenceReady = "true";
}

function restoreSearchPanelQuery(searchPanel: HTMLElement) {
  const savedQuery = localStorage.getItem(SEARCH_QUERY_STORAGE_KEY);
  if (!savedQuery) return;

  setTimeout(() => {
    const searchInput =
      searchPanel.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR);
    if (!searchInput || searchInput.value === savedQuery) return;

    searchInput.value = savedQuery;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  }, 0);
}

function installSearchClearAndClose(searchPanel: HTMLElement) {
  if (searchPanel.dataset.clearAndCloseReady === "true") return;

  searchPanel.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const clearButton = target?.closest<HTMLButtonElement>(SEARCH_CLEAR_SELECTOR);
    if (!clearButton) return;

    clearSearchQuery(searchPanel);
    setTimeout(() => closeSearchPanel(), 0);
  });

  searchPanel.dataset.clearAndCloseReady = "true";
}

function clearSearchQuery(searchPanel: HTMLElement) {
  localStorage.removeItem(SEARCH_QUERY_STORAGE_KEY);

  const searchInput =
    searchPanel.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR);
  if (!searchInput || searchInput.value === "") return;

  searchInput.value = "";
  searchInput.dispatchEvent(new Event("input", { bubbles: true }));
}
