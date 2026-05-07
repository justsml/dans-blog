let lifecycleInstalled = false;

export function installPostEnhancementLifecycle() {
  if (lifecycleInstalled || typeof document === "undefined") return;
  lifecycleInstalled = true;

  window.__checkForEmptyShareCounts = checkForEmptyShareCounts;
  window.__superHackFix_patchOptionsListWithActualHeight =
    patchOptionsListWithActualHeight;

  document.addEventListener("astro:page-load", bootPostEnhancements);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPostEnhancements, {
      once: true,
    });
  } else {
    bootPostEnhancements();
  }
}

export function bootPostEnhancements() {
  checkForEmptyShareCounts();
  deferUntilAfterStartup(bootBannerEffects);
  bootQuizEnhancements();
}

async function bootBannerEffects() {
  const banner = document.querySelector(".banner-wrapper, .hero-image");
  if (!banner || typeof window === "undefined") return;

  const { initBannerEffects } = await import("../scripts/bannerEffects");
  initBannerEffects("scanline", {
    distortionStrength: 0.5,
    scrollSensitivity: 0.125,
  });
}

async function bootQuizEnhancements() {
  const quiz = document.querySelector<HTMLElement>(".quiz-ui");
  if (!quiz) return;

  deferWork(async () => {
    const { bootQuizRuntime } = await import("../components/QuizUI/QuizRuntime");
    bootQuizRuntime({ quiz });
  }, 2500);
}

function deferUntilAfterStartup(work: () => void | Promise<void>) {
  let hasRun = false;
  let fallbackTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
  const run = () => {
    if (hasRun) return;
    hasRun = true;
    if (fallbackTimer) globalThis.clearTimeout(fallbackTimer);
    deferWork(work, 12000);
  };

  for (const eventName of ["pointerdown", "keydown", "scroll", "touchstart"]) {
    window.addEventListener(eventName, run, { once: true, passive: true });
  }

  fallbackTimer = globalThis.setTimeout(run, 12000);
}

function deferWork(work: () => void | Promise<void>, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      void work();
    }, { timeout });
    return;
  }

  globalThis.setTimeout(() => {
    void work();
  }, 350);
}

function patchOptionsListWithActualHeight(
  quizOptions: HTMLElement[] | null = null,
) {
  const optionPanels =
    quizOptions ?? [...document.querySelectorAll<HTMLElement>(".quiz-options")];

  optionPanels.forEach((optionPanel) => {
    try {
      const childHeights = Array.from(optionPanel.querySelectorAll("a")).map(
        (child) => child.getBoundingClientRect().height,
      );
      const sumHeight = childHeights.reduce((a, b) => a + b, 0);
      if (optionPanel.parentElement) {
        optionPanel.parentElement.style.height = `${sumHeight}px`;
      }
    } catch (error) {
      console.error("Error patching options list", error);
    }
  });

  return optionPanels;
}

function checkForEmptyShareCounts() {
  const shareCounters = document.querySelector(".share-counters");
  const emptySpans = shareCounters?.querySelectorAll("span:empty");

  if (emptySpans && emptySpans.length >= 3) {
    shareCounters?.classList.add("hidden", "empty", "no-share-counts");
  }

  return {
    shareCounters,
    emptySpans,
  };
}
