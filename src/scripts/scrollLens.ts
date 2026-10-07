// Boot stub for the background lens. The CSS prism beam paints the background from first paint, so the
// WebGL chunk waits for the reader's first scroll, pointer move, touch or key press: creating a GL context
// costs ~250ms on software renderers just to learn there is no GPU. Save-Data visitors never load it.
type Connection = { saveData?: boolean };

const saveData = (navigator as Navigator & { connection?: Connection }).connection?.saveData;
const INTENT = ["scroll", "pointermove", "pointerdown", "touchstart", "keydown"] as const;

if (!saveData) {
  const load = () => void import("./scrollLensGL").then((lens) => lens.start());
  const onIntent = () => {
    for (const type of INTENT) removeEventListener(type, onIntent);
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 800 });
    else setTimeout(load, 200);
  };
  for (const type of INTENT) addEventListener(type, onIntent, { passive: true });
}
