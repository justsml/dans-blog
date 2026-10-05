type RequestState = {
  loader: HTMLElement;
  list: HTMLElement;
  previous: Set<Element>;
  moveFocus: boolean;
};
type PagingDetail = { elt: HTMLElement; xhr: XMLHttpRequest; failed?: boolean };
const requests = new WeakMap<XMLHttpRequest, RequestState>();
function detail(event: Event) { return (event as CustomEvent<PagingDetail>).detail; }
function announce(list: HTMLElement, text: string) {
  const status = list.parentElement?.querySelector<HTMLElement>("[data-article-loading-status]");
  if (status) status.textContent = text;
}
document.addEventListener("htmx:beforeRequest", (event) => {
  const { elt, xhr } = detail(event);
  if (!elt.matches(".article-list-loader")) return;
  const list = elt.closest<HTMLElement>(".article-list");
  if (!list) return;
  requests.set(xhr, { loader: elt, list, previous: new Set(list.querySelectorAll(".article-card")), moveFocus: elt.contains(document.activeElement) });
  list.setAttribute("aria-busy", "true");
  const error = elt.querySelector<HTMLElement>(".article-list-loader__error");
  if (error) error.hidden = true;
  announce(list, elt.dataset.loading ?? "");
});
document.addEventListener("htmx:afterSwap", (event) => {
  const { xhr } = detail(event);
  const state = requests.get(xhr);
  if (!state) return;
  requests.delete(xhr);
  const cards = [...state.list.querySelectorAll<HTMLAnchorElement>(".article-card")];
  const added = cards.filter((card) => !state.previous.has(card));
  state.list.removeAttribute("aria-busy");
  announce(state.list, (state.loader.dataset.announcement ?? "").replace("{count}", String(added.length)).replace("{total}", String(cards.length)));
  // Keyboard users continue at the newly appended batch, without scrolling jumps.
  if (state.moveFocus && added[0]) added[0].focus({ preventScroll: true });
});
document.addEventListener("htmx:afterRequest", (event) => {
  const { xhr, failed } = detail(event);
  const state = requests.get(xhr);
  if (!state) return;
  state.list.removeAttribute("aria-busy");
  if (!failed) return; // A delayed successful swap still owns the request state.
  requests.delete(xhr);
  const error = state.loader.querySelector<HTMLElement>(".article-list-loader__error");
  if (error) { error.textContent = state.loader.dataset.failure ?? ""; error.hidden = false; }
  const idle = state.loader.querySelector<HTMLElement>(".article-list-loader__idle");
  if (idle) idle.textContent = state.loader.dataset.retry ?? "";
  announce(state.list, ""); // The visible alert announces the failure once.
});

// Preserve a bounded pair of enhanced lists for Back/Forward within this session.
// Keeping this in memory avoids storing article HTML in persistent browser storage.
type ArchiveSnapshot = { html: string; scroll: number; focusHref?: string; status: string };
const archiveSnapshots = new Map<string, ArchiveSnapshot>();
let returnSnapshot: ArchiveSnapshot | undefined;
type ArchiveNavigation = Event & { from: URL; to: URL; navigationType: string; newDocument: Document; sourceElement?: Element };
document.addEventListener("astro:before-preparation", event => {
  const navigation = event as ArchiveNavigation;
  const list = document.querySelector<HTMLElement>("main.home-page .article-list");
  if (!list || list.hasAttribute("aria-busy")) return;
  const html = list.innerHTML;
  if (html.length > 250_000) return; // At most 500KB of HTML across two routes.
  const active = document.activeElement;
  const focusHref = active instanceof HTMLAnchorElement && list.contains(active) ? active.getAttribute("href") ?? undefined : undefined;
  const key = navigation.from.pathname;
  archiveSnapshots.delete(key);
  archiveSnapshots.set(key, { html, scroll: window.scrollY, focusHref, status: list.parentElement?.querySelector("[data-article-loading-status]")?.textContent ?? "" });
  while (archiveSnapshots.size > 2) archiveSnapshots.delete(archiveSnapshots.keys().next().value!);
});
document.addEventListener("astro:before-swap", event => {
  const navigation = event as ArchiveNavigation;
  returnSnapshot = undefined;
  if (navigation.navigationType !== "traverse") return;
  const saved = archiveSnapshots.get(navigation.to.pathname);
  const list = navigation.newDocument.querySelector<HTMLElement>("main.home-page .article-list");
  if (!saved || !list) return;
  list.innerHTML = saved.html;
  returnSnapshot = saved;
});
document.addEventListener("astro:page-load", () => {
  const saved = returnSnapshot;
  returnSnapshot = undefined;
  if (!saved) return;
  const list = document.querySelector<HTMLElement>("main.home-page .article-list");
  if (!list) return;
  announce(list, saved.status);
  requestAnimationFrame(() => {
    if (saved.focusHref) [...list.querySelectorAll<HTMLAnchorElement>(".article-card")].find(card => card.getAttribute("href") === saved.focusHref)?.focus({ preventScroll: true });
    window.scrollTo({ top: saved.scroll, behavior: "instant" });
  });
});
