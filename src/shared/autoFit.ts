// autoFit.ts
const REM_TO_PX = 16;
export interface AutoFitOptions {
  /**
   * Step size for increasing or decreasing font size.
   */
  step: number;
  /**
   * Maximum number of steps to attempt before giving up.
   */
  stepLimit: number;

  /** Starting font size, must include full css value (w/) units) */
  fontSize?: string;

  scrollParent?: HTMLElement | string;
}

function getLongestLineSize(code: HTMLPreElement | HTMLElement) {
  if (code.tagName !== "PRE")
    throw new Error("AutoFit: Element must be a <pre> tag");
  const lines: HTMLElement[] = [
    ...code.querySelectorAll(".ec-line"),
  ] as HTMLElement[];
  const longestLine = Array.from(lines).reduce((currentHigh, el) =>
    el.innerText.length > currentHigh ? el.innerText.length : currentHigh,
  0);
  // const lines = code.innerText.split("\n");
  // const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b));
  return longestLine;
}

/**
 * Auto-fits text to its container by scaling up or down until it fits
 * or the step limit is reached.
 * @param selector - CSS selectors for elements to auto-fit
 * @param options - Configuration options for step size and step limit
 */
export function autoFit(
  selector: string | HTMLElement | NodeListOf<HTMLElement>,
  options: AutoFitOptions,
): void {
  const { step, stepLimit } = options;

  const elements = Array.isArray(selector)
    ? selector
    : typeof selector === "object"
      ? [selector]
      : document.querySelectorAll<HTMLElement>(selector);

  if (!elements.length) {
    console.warn(`No elements found for selectors: "${selector}"`);
    return;
  }

  console.log("Auto-fitting text:", elements);
  /**
   * IDEA:
   * FIND LONGEST LINE IN TEXT
   * SET FONT SIZE USING `CH` UNITS - TO FIT LONGEST LINE!
   */
  [...elements].forEach((element: HTMLElement) => {
    const txt = element.innerText;
    const longestLine = getLongestLineSize(element);
    const len = longestLine ?? 40;
    console.log("Line length:", len, len > 80 ? txt.length >= 1 && txt.slice(0, Math.min(txt.length, 0)) : "");
    if (len < 100 && len > 0) {
      // Set font size to fit longest line
      const fontSize = `${Math.min(1, 100 / len)}ch`;
      element.style.setProperty('--ec-codeFontSize', fontSize);
      return;
    }
  });
}

// Example usage:
// autoFit(".auto-fit-text", { step: 0.05, stepLimit: 20 });
