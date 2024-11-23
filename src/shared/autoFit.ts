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
  fontMax?: string;

  scrollParent?: HTMLElement | string;
}

function getLongestLineSize(code: HTMLPreElement | HTMLElement) {
  if (code.tagName !== "PRE")
    throw new Error("AutoFit: Element must be a <pre> tag");
  const lines: HTMLElement[] = [
    ...code.querySelectorAll(".ec-line"),
  ] as HTMLElement[];
  const longestLine = Array.from(lines).reduce(
    (currentHigh, el) =>
      el.innerText.length > currentHigh ? el.innerText.length : currentHigh,
    0,
  );
  // const lines = code.innerText.split("\n");
  // const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b));
  return longestLine;
}

const getWidthDiff = (el: HTMLElement) => ({
  value: el.scrollWidth - el.clientWidth,
  percent: (el.scrollWidth / el.clientWidth) * 100,
});
const getHeightDiff = (el: HTMLElement) => ({
  value: el.scrollHeight - el.clientHeight,
  percent: (el.scrollHeight / el.clientHeight) * 100,
});

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
  let fontMax = parseFloat(options.fontMax+'')
  if (isNaN(fontMax)) {
    fontMax = 3.5;
    console.error(`Bad fallback! Font size must be a number, got: ${options.fontMax} w/ step: ${step}`);
  }
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

  [...elements].forEach((el: HTMLElement) => {
    // const computedStyle = window.getComputedStyle(el);
    const fontSizeValue = fontMax ?? 2.25; // parseFloat(computedStyle.fontSize);
    const fontSizeUnit = "rem";
    let fontSize: number = parseFloat(`${fontSizeValue}`);
    let scrollContainer: HTMLElement | null | undefined;
    let steps = 0;
    const challengeId = el.closest<HTMLElement>(".challenge")?.id;
    console.log("Challenge ID:", challengeId);
    const applyFontSize = (el: HTMLElement, fontSize: number) => {
      let previousFontSize =
        parseFloat(el.style.getPropertyValue("--ec-codeFontSize")) ?? fontMax;
        if (!previousFontSize || isNaN(previousFontSize)) {
          previousFontSize = fontMax;
        }
      el.dataset.fontSizes ??= '';
      el.dataset.fontSizes += `${parseFloat(`${previousFontSize}`).toFixed(3)},`;
      // el.style.setProperty("--previousFontSize", previousFontSize);
      el.style.setProperty("--ec-codeFontSize", fontSize + fontSizeUnit);
    };

    scrollContainer = el; //.closest<HTMLElement>("pre");

    // Start at lowest font size
    applyFontSize(el, fontMax ?? 0.7);

    
    const widthDiff = getWidthDiff(el);
    const heightDiff = getHeightDiff(el);
    
    const fits = (el = scrollContainer!): boolean =>
      steps < stepLimit &&
      heightDiff.value === 0 && widthDiff.value === 0
    // if (widthDiff.percent > 100 || getHeightDiff(el).percent > 100) {
    //   console.log("Element too large:", getWidthDiff(el), getHeightDiff(el));
    //   // Scale down until it fits or the step limit is reached
    //   while (!fits() && steps < stepLimit) {
    //     fontSize -= step;
    //     // element.style.fontSize = `${fontSize}${fontSizeUnit}`;
    //     applyFontSize(el, fontSize);
    //     steps++;
    //     console.log("decr.fontSize %s %o", fontSize, el.style);
    //   }
    // }

    if (heightDiff.percent >= 100 && widthDiff.percent >= 100) {
      // Scale up to maximize size that still fits
      while (!fits() && fontSize > 0.5 && steps < stepLimit) {
        fontSize -= step;
        applyFontSize(el, fontSize);
        steps++;
        console.log("incr.fontSize %s %o", fontSize, el.style.cssText);
        if (fits()) {
          console.log("winner.fontSize", fontSize, el.style.cssText);
          break;
        }
      }
    } else {
      console.log("Element too large:", widthDiff, heightDiff);
    }
    if (steps >= stepLimit) {
      console.warn(
        `Step limit (${stepLimit}) reached while trying to auto-fit text for element:`,
        el,
      );
    }
  });
  //   [...elements].forEach((element: HTMLElement) => {
  //   const txt = element.innerText;
  //   const longestLine = getLongestLineSize(element);
  //   const len = longestLine ?? 40;
  //   console.log("Line length:", len, len > 80 ? txt.length >= 1 && txt.slice(0, Math.min(txt.length, 0)) : "");
  //   if (len < 100 && len > 0) {
  //     // Set font size to fit longest line
  //     const fontSize = `${Math.min(1, 100 / len)}ch`;
  //     element.style.setProperty('--ec-codeFontSize', fontSize);
  //     return;
  //   }
  // });
}

// Example usage:
// autoFit(".auto-fit-text", { step: 0.05, stepLimit: 20 });
