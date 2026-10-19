// Click-to-fullscreen for article body images. One delegated listener survives ClientRouter swaps;
// images are re-marked on every page load, and the <dialog> is recreated when a swap removes it.
const ARTICLE = "main.article";
const SKIP = "a, button, label, aside, nav, .banner-wrapper, .hero-image, .share-counter-links";
const MIN_WIDTH = 120;
const MARK = "data-zoomable";

let dialog: HTMLDialogElement | undefined;
let installed = false;

const isCandidate = (img: HTMLImageElement) => !!img.closest(ARTICLE) && !img.closest(SKIP);

function evaluate(img: HTMLImageElement) {
  const zoomable = isCandidate(img) && img.getBoundingClientRect().width >= MIN_WIDTH;
  img.toggleAttribute(MARK, zoomable);
  if (zoomable) {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-haspopup", "dialog");
  } else {
    img.removeAttribute("tabindex");
    img.removeAttribute("role");
    img.removeAttribute("aria-haspopup");
  }
}

export function markZoomableImages() {
  for (const img of document.querySelectorAll<HTMLImageElement>(`${ARTICLE} img`)) {
    if (!isCandidate(img)) continue;
    if (img.complete) evaluate(img);
    else img.addEventListener("load", () => evaluate(img), { once: true });
  }
}

function getDialog() {
  if (dialog?.isConnected) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "image-zoom";
  dialog.append(document.createElement("img"));
  // Any click (backdrop or image) closes; pinch and pan gestures don't emit clicks.
  dialog.addEventListener("click", () => dialog?.close());
  document.body.append(dialog);
  return dialog;
}

function open(source: HTMLImageElement) {
  const zoom = getDialog();
  const img = zoom.querySelector("img")!;
  img.removeAttribute("srcset");
  img.src = source.currentSrc || source.src;
  // Let the browser pick a larger srcset candidate for the full-viewport view.
  if (source.srcset) {
    img.srcset = source.srcset;
    img.sizes = "100vw";
  }
  img.alt = source.alt;
  zoom.setAttribute("aria-label", source.alt || "Image");
  zoom.showModal();
}

const zoomTarget = (target: EventTarget | null) =>
  target instanceof HTMLImageElement && target.hasAttribute(MARK) && isCandidate(target) ? target : null;

export function installImageZoom() {
  if (installed || typeof document === "undefined") return;
  installed = true;

  document.addEventListener("click", (event) => {
    const img = zoomTarget(event.target);
    if (!img || event.defaultPrevented) return;
    event.preventDefault();
    open(img);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const img = zoomTarget(event.target);
    if (!img) return;
    event.preventDefault();
    open(img);
  });

  // A navigation while open would otherwise leave the old document's dialog modal state behind.
  document.addEventListener("astro:before-swap", () => dialog?.close());
}
