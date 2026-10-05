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
