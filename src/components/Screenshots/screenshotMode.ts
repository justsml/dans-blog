import type { Page } from "playwright";

export const SCREENSHOT_MODE_CLASS = "screenshot-mode";
export const SCREENSHOT_HIDDEN_CLASS = "screenshot-hidden";

const SCREENSHOT_HIDDEN_STYLE_ID = "screenshot-hidden-style";

export async function applyScreenshotMode(
  page: Page,
  classModifier?: string,
) {
  await page.evaluate(
    ({ classModifier, hiddenClass, modeClass, styleId }) => {
      document.body.classList.add(modeClass);
      if (classModifier) document.body.classList.add(classModifier);

      if (document.getElementById(styleId)) return;

      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .${modeClass} {
          scroll-behavior: auto !important;
        }

        .${modeClass} .${hiddenClass},
        .${modeClass}.${hiddenClass} {
          display: none !important;
        }

        .${modeClass} .quiz-nav-bar,
        .${modeClass} .quiz-score-bar,
        .${modeClass} .quiz-completion-card {
          display: none !important;
        }

        .${modeClass} .challenge,
        .${modeClass} .challenge * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.append(style);
    },
    {
      classModifier,
      hiddenClass: SCREENSHOT_HIDDEN_CLASS,
      modeClass: SCREENSHOT_MODE_CLASS,
      styleId: SCREENSHOT_HIDDEN_STYLE_ID,
    },
  );
}
