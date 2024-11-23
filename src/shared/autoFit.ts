// autoFit.ts

export interface AutoFitOptions {
  step: number; // Increment or decrement step size for scaling
  stepLimit: number; // Maximum number of steps to attempt
}

/**
 * Auto-fits text to its container by scaling up or down until it fits
 * or the step limit is reached.
 * @param selectors - CSS selectors for elements to auto-fit
 * @param options - Configuration options for step size and step limit
 */
export function autoFit(selectors: string, options: AutoFitOptions): void {
  const { step, stepLimit } = options;

  const elements = document.querySelectorAll<HTMLElement>(selectors);
  if (!elements.length) {
    console.warn(`No elements found for selectors: "${selectors}"`);
    return;
  }

  elements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element);
    const fontSizeValue = parseFloat(computedStyle.fontSize);
    const fontSizeUnit = computedStyle.fontSize.replace(`${fontSizeValue}`, "").trim();
    let fontSize = fontSizeValue;
    let steps = 0;

    const fits = (): boolean =>
      element.scrollWidth <= element.clientWidth &&
      element.scrollHeight <= element.clientHeight;

    // Scale down until it fits or the step limit is reached
    while (!fits() && steps < stepLimit) {
      fontSize -= step;
      element.style.fontSize = `${fontSize}${fontSizeUnit}`;
      steps++;
    }

    // Scale up to maximize size that still fits
    while (fits() && steps < stepLimit) {
      fontSize += step;
      element.style.fontSize = `${fontSize}${fontSizeUnit}`;
      steps++;
      if (!fits()) {
        fontSize -= step; // Revert to the last valid size
        element.style.fontSize = `${fontSize}${fontSizeUnit}`;
        break;
      }
    }

    if (steps >= stepLimit) {
      console.warn(
        `Step limit (${stepLimit}) reached while trying to auto-fit text for element:`,
        element
      );
    }
  });
}

// Example usage:
// autoFit(".auto-fit-text", { step: 0.05, stepLimit: 20 });
