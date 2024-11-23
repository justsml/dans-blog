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

function getParentScrollContainer(element: HTMLElement): HTMLElement | null {
  let scrollContainer: HTMLElement = element;
  while (scrollContainer?.parentElement != null) {
    if (
      scrollContainer &&
      scrollContainer.scrollHeight > 0 &&
      scrollContainer.scrollWidth > 0 &&
      (scrollContainer.scrollHeight > scrollContainer.clientHeight ||
        scrollContainer.scrollWidth > scrollContainer.clientWidth)
    ) {
      return scrollContainer;
    } else {
      // Move up a node
      scrollContainer = scrollContainer.parentElement!;
    }
  }
  return null;
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
/**
 * IDEA:
 * FIND LONGEST LINE IN TEXT
 * SET FONT SIZE USING `CH` UNITS - TO FIT LONGEST LINE!
 */
  [...elements].forEach((element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const fontSizeValue = parseFloat(computedStyle.fontSize) / REM_TO_PX;
    const fontSizeUnit = "rem";
    let fontSize = fontSizeValue;
    let scrollContainer: HTMLElement | null | undefined;
    let steps = 0;

    scrollContainer = element; //.closest<HTMLElement>("pre");
    const fits = (el = scrollContainer!): boolean =>
      el?.scrollWidth <= el?.clientWidth &&
      el?.scrollHeight <= el?.clientHeight;

    // Scale down until it fits or the step limit is reached
    while (!fits() && steps < stepLimit) {
      fontSize -= step;
      element.style.fontSize = `${fontSize}${fontSizeUnit}`;
      steps++;
      console.log("decr.fontSize", fontSize, element);
    }

    // Scale up to maximize size that still fits
    while (fits() && steps < stepLimit) {
      fontSize += step;
      element.style.fontSize = `${fontSize}${fontSizeUnit}`;
      steps++;
      console.log("incr.fontSize", fontSize, element);
      if (!fits()) {
        fontSize -= step; // Revert to the last valid size
        element.style.fontSize = `${fontSize}${fontSizeUnit}`;
        console.log("winner.fontSize", fontSize, element);
        break;
      }
    }

    if (steps >= stepLimit) {
      console.warn(
        `Step limit (${stepLimit}) reached while trying to auto-fit text for element:`,
        element,
      );
    }
  });
}

// Example usage:
// autoFit(".auto-fit-text", { step: 0.05, stepLimit: 20 });
