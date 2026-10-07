import { surfaces } from "./surfaces";

const themeMedia = matchMedia("(prefers-color-scheme: dark)");
function preference() {
  try { return localStorage.getItem("design-lab-theme") || "system"; }
  catch { return "system"; }
}
function applyTheme(value = preference()) {
  document.documentElement.dataset.theme = value === "system" ? (themeMedia.matches ? "dark" : "light") : value;
}
themeMedia.addEventListener("change", () => { if (preference() === "system") applyTheme(); });
let listeners: AbortController | undefined;
function initialize() {
  listeners?.abort();
  listeners = new AbortController();
  const { signal } = listeners;
  const surfaceSelect = document.querySelector<HTMLSelectElement>("#surface-select");
  const surfaceDescription = document.querySelector<HTMLElement>("#surface-description");
  function describeSurface() {
    const surface = surfaces.find(({ id }) => id === document.documentElement.dataset.surface);
    if (surfaceDescription) surfaceDescription.textContent = surface ? (document.body.classList.contains("article-page") ? surface.article : surface.home) : "The original, untextured background.";
  }
  if (surfaceSelect) surfaceSelect.value = document.documentElement.dataset.surface ?? "cotton";
  describeSurface();
  surfaceSelect?.addEventListener("change", () => {
    document.documentElement.dataset.surface = surfaceSelect.value;
    try { localStorage.setItem("design-lab-surface", surfaceSelect.value); } catch { /* The current page still updates. */ }
    const url = new URL(location.href);
    url.searchParams.set("surface", surfaceSelect.value);
    history.replaceState(history.state, "", url);
    describeSurface();
  }, { signal });
  applyTheme();
  const theme = document.querySelector<HTMLSelectElement>("#theme-select");
  if (theme) theme.value = preference();
  theme?.addEventListener("change", () => {
    try { localStorage.setItem("design-lab-theme", theme.value); } catch { /* Session still works without storage. */ }
    applyTheme(theme.value);
  }, { signal });
  const input = document.querySelector<HTMLInputElement>("#article-search");
  const filters = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
  const articles = document.querySelectorAll<HTMLElement>("[data-article]");
  const status = document.querySelector<HTMLElement>("#filter-status");
  let category = "All";
  function update() {
    const query = input?.value.trim().toLocaleLowerCase() ?? "";
    let count = 0;
    for (const article of articles) {
      const matches = (category === "All" || article.dataset.category === category) && (article.dataset.search ?? "").includes(query);
      article.hidden = !matches;
      if (matches) count++;
    }
    if (status) status.textContent = count ? `${count} ${count === 1 ? "article" : "articles"}${query ? ` matching “${input?.value.trim()}”` : ""}` : "No matching notes. Try another topic or search.";
  }
  input?.addEventListener("input", update, { signal });
  for (const button of filters) button.addEventListener("click", () => {
    category = button.dataset.filter ?? "All";
    for (const filter of filters) filter.setAttribute("aria-pressed", String(filter === button));
    update();
  }, { signal });
}
document.addEventListener("astro:page-load", initialize);
