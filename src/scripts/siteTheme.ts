const media = matchMedia("(prefers-color-scheme: dark)");
function preference() {
  try { const saved = localStorage.getItem("danlevy.theme"); return saved === "light" || saved === "dark" ? saved : "system"; }
  catch { return "system"; }
}
function apply(value = preference()) {
  const resolved = value === "system" ? (media.matches ? "dark" : "light") : value;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.querySelectorAll<HTMLSelectElement>("[data-paper-theme-select]").forEach(select => { select.value = value; });
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (meta) meta.content = resolved === "dark" ? "#202725" : "#e8e3d9";
}
document.addEventListener("change", event => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement) || !target.matches("[data-paper-theme-select]")) return;
  try { localStorage.setItem("danlevy.theme", target.value); } catch { /* Selection works without persistent storage. */ }
  apply(target.value);
});
media.addEventListener("change", () => { if (preference() === "system") apply(); });
window.addEventListener("storage", event => { if (event.key === "danlevy.theme") apply(); });
function initialize() {
  apply();
  // Existing archive fragments remain enhanced after Astro document navigation.
  const htmx = (window as Window & { htmx?: { process(element: HTMLElement): void } }).htmx;
  htmx?.process(document.body);
}
// Apply the preference to the incoming root before Astro replaces its attributes.
document.addEventListener("astro:before-swap", event => {
  const incoming = (event as Event & { newDocument: Document }).newDocument;
  const value = preference();
  const resolved = value === "system" ? (media.matches ? "dark" : "light") : value;
  incoming.documentElement.dataset.theme = resolved;
  incoming.documentElement.classList.toggle("dark", resolved === "dark");
});
document.addEventListener("astro:page-load", initialize);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
else initialize();
