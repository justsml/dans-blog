import { ensurePagefindInitialized } from "./pagefindLoader";

const SEARCH_BAR_SELECTOR = ".searchBar";
const SEARCH_INPUT_SELECTOR = 'input[type="text"]';
const SEARCH_BUTTON_SELECTOR = ".btnSearchToggle";
const NAV_MENU_SELECTOR = ".NavigationMenuRoot";
const SEARCH_PANEL_OPEN_CLASS = "search-panel-open";
const COLLAPSED_CLASS = "collapsed";
const FOCUS_DELAY_MS = 350;

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

  await ensurePagefindInitialized();
  searchPanel.classList.remove(COLLAPSED_CLASS);
  document.body.classList.add(SEARCH_PANEL_OPEN_CLASS);
  focusSearchPanelInput(searchPanel);
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
  const abortController = new AbortController();

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

  return () => abortController.abort();
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
  }, FOCUS_DELAY_MS);
}
