// Boot stub for the background lens. The WebGL chunk loads only once the page is idle, so it never
// competes with first paint, and not at all for Save-Data visitors.
type Connection = { saveData?: boolean };

const saveData = (navigator as Navigator & { connection?: Connection }).connection?.saveData;

if (!saveData) {
  const load = () => void import("./scrollLensGL").then((lens) => lens.start());
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 600));
  if (document.readyState === "complete") idle();
  else addEventListener("load", idle, { once: true });
}
