import { ensurePagefindInitialized } from "./pagefindLoader";

const SEARCH_BAR_SELECTOR = ".searchBar";
const SEARCH_INPUT_SELECTOR = 'input[type="text"]';
const SEARCH_BUTTON_SELECTOR = ".btnSearchToggle";
const SEARCH_CLEAR_SELECTOR = ".pagefind-ui__search-clear";
const NAV_MENU_SELECTOR = ".static-nav";
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
  searchPanel.inert = false;
  searchPanel.classList.remove(COLLAPSED_CLASS);
  document.querySelectorAll(SEARCH_BUTTON_SELECTOR).forEach(button => button.setAttribute("aria-expanded", "true"));
  document.body.classList.add(SEARCH_PANEL_OPEN_CLASS);
  const isSearchReady = await ensurePagefindInitialized();
  if (isSearchReady && isSearchPanelOpen()) {
    restoreSearchPanelQuery(searchPanel);
    installSearchQueryPersistence(searchPanel);
    installSearchClear(searchPanel);
    focusSearchPanelInput(searchPanel);
  }
  return true;
}

export function closeSearchPanel() {
  const searchPanel = getSearchPanelElement();
  if (!searchPanel) return false;

  const restoreFocus = searchPanel.contains(document.activeElement);
  searchPanel.inert = true;
  searchPanel.classList.add(COLLAPSED_CLASS);
  document.querySelectorAll(SEARCH_BUTTON_SELECTOR).forEach(button => button.setAttribute("aria-expanded", "false"));
  if (restoreFocus) document.querySelector<HTMLButtonElement>(SEARCH_BUTTON_SELECTOR)?.focus({ preventScroll: true });
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

  const reposition = () => {
    const panel = getSearchPanelElement();
    if (panel && isSearchPanelOpen()) positionSearchPanel(panel);
  };
  window.addEventListener("resize", reposition, { passive: true, signal: abortController.signal });
  window.visualViewport?.addEventListener("resize", reposition, { passive: true, signal: abortController.signal });
  window.visualViewport?.addEventListener("scroll", reposition, { passive: true, signal: abortController.signal });

  document.addEventListener(
    "click",
    (event) => {
      if ((event.target as Element | null)?.closest(".search-panel-close")) closeSearchPanel();
      else setTimeout(() => closeSearchPanelFromOutsideClick(event), 10);
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

  const searchContainer = searchPanel;
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
  const viewportWidth = document.documentElement.clientWidth;
  const viewport = window.visualViewport;
  const offset = viewport?.offsetTop ?? 0;
  const mobile = viewportWidth <= 700;
  const top = mobile ? Math.max(offset + 8, Math.min(Math.round(menuBox?.bottom ?? 64), offset + 72)) : Math.max(44, Math.round(menuBox?.bottom ?? 92));
  const rightGap = mobile ? 8 : Math.max(16, Math.round(viewportWidth - (menuBox?.right ?? viewportWidth - 16)));
  const width = mobile ? viewportWidth - 16 : Math.min(544, Math.max(320, Math.round(menuBox?.width ?? 544)), viewportWidth - rightGap - 16);
  const height = Math.max(120, (viewport?.height ?? window.innerHeight) + offset - top - 8);
  searchPanel.style.setProperty("--search-panel-top", `${top}px`);
  searchPanel.style.setProperty("--search-panel-right-gap", `${rightGap}px`);
  searchPanel.style.setProperty("--search-panel-width", `${width}px`);
  searchPanel.style.setProperty("--search-panel-height", `${height}px`);
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

function installSearchClear(searchPanel: HTMLElement) {
  if (searchPanel.dataset.clearReady === "true") return;

  searchPanel.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const clearButton = target?.closest<HTMLButtonElement>(SEARCH_CLEAR_SELECTOR);
    if (!clearButton) return;

    clearSearchQuery(searchPanel);
    focusSearchPanelInput(searchPanel);
  });

  searchPanel.dataset.clearReady = "true";
}

function clearSearchQuery(searchPanel: HTMLElement) {
  localStorage.removeItem(SEARCH_QUERY_STORAGE_KEY);

  const searchInput =
    searchPanel.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR);
  if (!searchInput || searchInput.value === "") return;

  searchInput.value = "";
  searchInput.dispatchEvent(new Event("input", { bubbles: true }));
}
