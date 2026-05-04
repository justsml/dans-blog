/**
 * QuizSlideManager - CSS-first single-question quiz view.
 *
 * CRITICAL: Never modify DOM inside .quiz-ui until React hydration is complete.
 * Nav/score bars are appended to the parent section, not inside .quiz-ui.
 * Islands are hidden via display:none only after hydration signals completion.
 */
export type QuizSlideManagerController = {
  destroy: () => void;
};

type QuizSlideManagerOptions = {
  onReset?: () => void | Promise<void>;
};

export function initQuizSlideManager(
  quizSection: HTMLElement,
  { onReset }: QuizSlideManagerOptions = {},
): QuizSlideManagerController | null {
  if (!quizSection) return null;

  const quizUI = quizSection.querySelector(".quiz-ui") as HTMLElement;
  if (!quizUI) return null;

  const islands = [
    ...quizUI.querySelectorAll<HTMLElement>("astro-island"),
  ].filter((island) => island.querySelector(".challenge"));
  if (islands.length === 0) return null;

  const challenges = islands.map(
    (island) => island.querySelector<HTMLElement>(".challenge")!,
  );
  const totalQuestions = challenges.length;
  let currentIndex = 0;
  let isTransitioning = false;
  let completionCardShown = false;
  let totalAttemptCount = 0;
  const answeredQuestions = new Map<number, boolean>();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const cleanupHandlers: Array<() => void> = [];
  let destroyed = false;
  let hydrationTimer: number | null = null;
  let visibilityObserver: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  const listen = (
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions | boolean,
  ) => {
    target.addEventListener(type, listener, options);
    cleanupHandlers.push(() =>
      target.removeEventListener(type, listener, options),
    );
  };

  const revealSelectors = [
    ".quiz-header",
    ".quiz-question",
    ".quiz-options .option",
    ".quiz-hint-toggle",
  ];

  const animateElement = (
    element: Element | null,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
  ) => {
    if (!element || prefersReducedMotion) return Promise.resolve();
    return element.animate(keyframes, options).finished.catch(() => undefined);
  };

  const animateElements = (
    elements: Element[],
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions & { stagger?: number },
  ) =>
    Promise.all(
      elements.map((element, index) =>
        animateElement(element, keyframes, {
          ...options,
          delay: (options.delay ?? 0) + index * (options.stagger ?? 0),
        }),
      ),
    );

  const getRevealTargets = (island: HTMLElement) => {
    const challenge = island.querySelector<HTMLElement>(".challenge");
    if (!challenge) return [];

    return revealSelectors.flatMap((selector) => [
      ...challenge.querySelectorAll<HTMLElement>(selector),
    ]);
  };

  const showIsland = (island: HTMLElement) => {
    island.classList.add("quiz-slide", "quiz-slide--active");
    island.classList.remove("quiz-slide--hidden");
    island.style.removeProperty("display");
  };

  const hideIsland = (island: HTMLElement) => {
    island.classList.add("quiz-slide", "quiz-slide--hidden");
    island.classList.remove("quiz-slide--active");
    island.style.removeProperty("display");
  };

  function triggerConfetti(originElement: HTMLElement) {
    if (prefersReducedMotion) return;
    const rect = originElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const container = document.createElement("div");
    container.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;`;
    document.body.appendChild(container);

    const colors = ["#82ff9d", "#4ecdc4", "#ffffff", "#ffd93d", "#6bcb77"];
    const particles: HTMLElement[] = [];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 6 + 4;
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? "50%" : "0"};left:${cx}px;top:${cy}px;will-change:transform,opacity;`;
      container.appendChild(p);
      particles.push(p);
    }

    particles.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const vel = Math.random() * 180 + 80;
      p.animate(
        [
          { transform: "translate3d(0, 0, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate3d(${Math.cos(angle) * vel}px, ${Math.sin(angle) * vel - Math.random() * 100 + 300}px, 0) rotate(${Math.random() * 720 - 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: (Math.random() * 0.6 + 0.8) * 1000,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        },
      );
    });

    window.setTimeout(() => container.remove(), 1500);
  }

  // --- Build Nav Bar ---
  const topBar = document.createElement("div");
  topBar.className = "quiz-nav-bar";
  topBar.innerHTML = `
    <button class="quiz-nav-arrow quiz-nav-prev" aria-label="Previous question" disabled>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <div class="quiz-nav-dots">
      ${Array.from({ length: totalQuestions }, (_, i) => `<button class="quiz-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Go to question ${i + 1}"></button>`).join("")}
    </div>
    <button class="quiz-nav-arrow quiz-nav-next" aria-label="Next question">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  `;

  // --- Build Score Bar ---
  const scoreBar = document.createElement("div");
  scoreBar.className = "quiz-score-bar";
  scoreBar.innerHTML = `
    <div class="quiz-score-bar-inner">
      <div class="quiz-score-bar-counter">
        <span class="quiz-score-bar-current">1</span><span class="quiz-score-bar-sep">/</span><span class="quiz-score-bar-total">${totalQuestions}</span>
      </div>
      <div class="quiz-score-bar-progress">
        <div class="quiz-score-bar-fill" style="width: ${(1 / totalQuestions) * 100}%"></div>
      </div>
      <div class="quiz-score-bar-result">
        <span class="quiz-score-bar-label">Score</span>
        <span class="quiz-score-bar-value">0/${totalQuestions}</span>
      </div>
      <button class="quiz-reset-button" type="button" aria-label="Reset quiz progress">
        Retake quiz
      </button>
    </div>
    <div class="quiz-score-bar-congrats" style="display:none"></div>
  `;

  const completionCard = document.createElement("div");
  completionCard.className = "quiz-completion-card";
  completionCard.setAttribute("role", "status");
  completionCard.setAttribute("aria-live", "polite");
  completionCard.setAttribute("hidden", "");
  completionCard.innerHTML = `
    <div class="quiz-completion-card__shine"></div>
    <div class="quiz-completion-card__eyebrow">Celebration unlocked</div>
    <div class="quiz-completion-card__title">Quiz Completed</div>
    <div class="quiz-completion-card__misses"></div>
  `;

  // --- Wait for React hydration, then activate slide system ---
  function activate() {
    if (destroyed) return;
    // Insert nav bar BEFORE .quiz-ui (outside it, no DOM changes inside)
    quizSection.insertBefore(topBar, quizUI);

    // Insert score bar AFTER .quiz-ui
    if (quizUI.nextSibling) {
      quizSection.insertBefore(scoreBar, quizUI.nextSibling);
    } else {
      quizSection.appendChild(scoreBar);
    }

    islands.forEach((island, i) => {
      if (i === 0) showIsland(island);
      else hideIsland(island);
    });

    // Mark quiz as slide-enabled
    quizUI.classList.add("quiz-slides-active");

    // Move nav & score bars to body to avoid contain:content creating a new containing block
    // This ensures position:fixed is relative to the viewport
    document.body.appendChild(topBar);
    document.body.appendChild(scoreBar);
    document.body.appendChild(completionCard);

    // Show/hide nav & score bars based on quiz section visibility
    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        topBar.classList.toggle("quiz-nav-bar--hidden", !visible);
        scoreBar.classList.toggle("quiz-score-bar--hidden", !visible);
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" },
    );
    visibilityObserver.observe(quizSection);

    // --- State Updates ---
    const syncAnswers = () => {
      totalAttemptCount = 0;
      challenges.forEach((c, i) => {
        if (c.classList.contains("correct")) answeredQuestions.set(i, true);
        else if (c.classList.contains("incorrect"))
          answeredQuestions.set(i, false);
        totalAttemptCount += Number(c.dataset.answerCount || "0");
      });
    };

    const updateProgress = () => {
      const correctCount = [...answeredQuestions.values()].filter(
        (v) => v,
      ).length;
      const missCount = getMissCount(correctCount);
      const fill = scoreBar.querySelector(
        ".quiz-score-bar-fill",
      ) as HTMLElement;
      const currentNum = scoreBar.querySelector(
        ".quiz-score-bar-current",
      ) as HTMLElement;
      const scoreValue = scoreBar.querySelector(
        ".quiz-score-bar-value",
      ) as HTMLElement;
      const resetButton = scoreBar.querySelector(
        ".quiz-reset-button",
      ) as HTMLButtonElement | null;
      if (fill)
        fill.style.width = `${((currentIndex + 1) / totalQuestions) * 100}%`;
      if (currentNum) currentNum.textContent = String(currentIndex + 1);
      if (scoreValue)
        scoreValue.textContent = `${correctCount}/${totalQuestions}`;
      if (resetButton)
        resetButton.disabled =
          totalAttemptCount === 0 && answeredQuestions.size === 0;

      const congrats = scoreBar.querySelector(
        ".quiz-score-bar-congrats",
      ) as HTMLElement;
      if (congrats && correctCount === totalQuestions) {
        const isPerfect = missCount === 0;
        congrats.style.display = "block";
        congrats.textContent = isPerfect
          ? `Perfect! ${correctCount}/${totalQuestions}`
          : `All done! ${correctCount}/${totalQuestions} (${missCount} missed)`;
        scoreBar.classList.toggle("quiz-score-bar--perfect", isPerfect);
        scoreBar.classList.toggle("quiz-score-bar--success", !isPerfect);
      } else if (congrats) {
        congrats.style.display = "none";
        scoreBar.classList.remove(
          "quiz-score-bar--perfect",
          "quiz-score-bar--success",
        );
      }
    };

    const getWrongAnswerCount = () =>
      [...answeredQuestions.values()].filter((answer) => !answer).length;

    const getMissCount = (
      correctCount = [...answeredQuestions.values()].filter(Boolean).length,
    ) => Math.max(totalAttemptCount - correctCount, getWrongAnswerCount());

    const isQuestionCorrect = (index: number) =>
      answeredQuestions.get(index) === true;

    const isQuizCorrectlyCompleted = () =>
      Array.from({ length: totalQuestions }, (_, index) =>
        isQuestionCorrect(index),
      ).every(Boolean);

    const findNextUnansweredIndex = (fromIndex: number) => {
      for (let offset = 1; offset <= totalQuestions; offset++) {
        const candidateIndex = (fromIndex + offset) % totalQuestions;
        if (!isQuestionCorrect(candidateIndex)) return candidateIndex;
      }

      return null;
    };

    const showCompletionCard = () => {
      if (completionCardShown || !isQuizCorrectlyCompleted()) return;

      completionCardShown = true;
      const missCount = getMissCount();
      const misses = completionCard.querySelector(
        ".quiz-completion-card__misses",
      );
      if (misses) {
        misses.textContent =
          missCount === 0
            ? "0 misses. Clean sweep."
            : `${missCount} ${missCount === 1 ? "miss" : "misses"} / wrong ${missCount === 1 ? "answer" : "answers"}`;
      }

      completionCard.removeAttribute("hidden");

      animateElement(
        completionCard,
        [
          {
            opacity: 0,
            transform: "translateY(28px) scale(0.94) rotateX(-8deg)",
          },
          { opacity: 1, transform: "translateY(0) scale(1) rotateX(0)" },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          fill: "both",
        },
      );

      animateElements(
        [
          ...completionCard.querySelectorAll(
            ".quiz-completion-card__eyebrow, .quiz-completion-card__title, .quiz-completion-card__misses",
          ),
        ],
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          delay: 120,
          duration: 340,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
          stagger: 70,
        },
      );
    };

    const advanceToNextUnanswered = (answeredIndex: number) => {
      const nextUnansweredIndex = findNextUnansweredIndex(answeredIndex);

      if (nextUnansweredIndex == null) {
        showCompletionCard();
        return;
      }

      if (nextUnansweredIndex === currentIndex) return;

      window.setTimeout(() => {
        goToQuestion(
          nextUnansweredIndex,
          nextUnansweredIndex > currentIndex ? "next" : "prev",
        );
      }, 950);
    };

    const updateDots = () => {
      topBar.querySelectorAll(".quiz-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
        dot.classList.remove("correct", "incorrect");
        if (answeredQuestions.has(i)) {
          dot.classList.add(answeredQuestions.get(i) ? "correct" : "incorrect");
        }
      });
    };

    const updateNavButtons = () => {
      const prevBtn = topBar.querySelector(
        ".quiz-nav-prev",
      ) as HTMLButtonElement;
      const nextBtn = topBar.querySelector(
        ".quiz-nav-next",
      ) as HTMLButtonElement;
      if (prevBtn) prevBtn.disabled = currentIndex === 0 || isTransitioning;
      if (nextBtn)
        nextBtn.disabled =
          currentIndex === totalQuestions - 1 || isTransitioning;
    };

    // --- Deep-linking ---
    const updateHash = (index = currentIndex) => {
      const seq = index + 1;
      const hash = `#qq-${seq}`;
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    };

    const resolveIndexFromHash = (hash: string) => {
      const questionMatch = hash.match(/^#qq-(\d+)$/);
      if (questionMatch) {
        const targetIdx = parseInt(questionMatch[1], 10) - 1;
        return targetIdx >= 0 && targetIdx < totalQuestions ? targetIdx : null;
      }

      if (!hash || hash === "#") return null;

      const rawId = decodeURIComponent(hash.slice(1));
      if (!rawId) return null;

      for (let idx = 0; idx < challenges.length; idx++) {
        const challenge = challenges[idx];
        if (challenge.id === rawId) return idx;

        const escapedId =
          typeof CSS !== "undefined" && typeof CSS.escape === "function"
            ? CSS.escape(rawId)
            : rawId.replace(/["\\#.:()[\],>+~*='` ]/g, "\\$&");
        if (challenge.querySelector(`#${escapedId}`)) {
          return idx;
        }
      }

      return null;
    };

    const navigateToHash = () => {
      const targetIdx = resolveIndexFromHash(window.location.hash);
      if (targetIdx == null) return false;
      if (targetIdx === currentIndex) {
        updateHash(targetIdx);
        return true;
      }

      goToQuestion(targetIdx, targetIdx > currentIndex ? "next" : "prev");
      return true;
    };

    // --- Transition ---
    const goToQuestion = (targetIndex: number, direction?: "next" | "prev") => {
      if (
        isTransitioning ||
        targetIndex === currentIndex ||
        targetIndex < 0 ||
        targetIndex >= totalQuestions
      )
        return;
      isTransitioning = true;
      const dir = direction || (targetIndex > currentIndex ? "next" : "prev");
      const fromIndex = currentIndex;
      currentIndex = targetIndex;

      const currentIsland = islands[fromIndex];
      const nextIsland = islands[targetIndex];
      const currentChallenge =
        currentIsland.querySelector<HTMLElement>(".challenge");
      const nextChallenge = nextIsland.querySelector<HTMLElement>(".challenge");
      const transitionChallenges = [currentChallenge, nextChallenge].filter(
        (challenge): challenge is HTMLElement => Boolean(challenge),
      );
      const currentRevealTargets = getRevealTargets(currentIsland);
      const nextRevealTargets = getRevealTargets(nextIsland);
      const previousQuizStyles = {
        position: quizUI.style.position,
        height: quizUI.style.height,
        minHeight: quizUI.style.minHeight,
        overflow: quizUI.style.overflow,
      };

      const onComplete = () => {
        quizUI.style.position = previousQuizStyles.position;
        quizUI.style.height = previousQuizStyles.height;
        quizUI.style.minHeight = previousQuizStyles.minHeight;
        quizUI.style.overflow = previousQuizStyles.overflow;

        hideIsland(currentIsland);
        showIsland(nextIsland);
        [currentIsland, nextIsland].forEach((island) => {
          island.style.removeProperty("position");
          island.style.removeProperty("top");
          island.style.removeProperty("left");
          island.style.removeProperty("width");
          island.style.removeProperty("z-index");
          island.style.removeProperty("opacity");
          island.style.removeProperty("transform");
          island.style.removeProperty("filter");
        });
        transitionChallenges.forEach((challenge) => {
          challenge.style.removeProperty("opacity");
          challenge.style.removeProperty("transform");
          challenge.style.removeProperty("filter");
        });
        [...currentRevealTargets, ...nextRevealTargets].forEach((target) => {
          target.style.removeProperty("opacity");
          target.style.removeProperty("transform");
          target.style.removeProperty("clip-path");
        });

        isTransitioning = false;
        syncAnswers();
        updateNavButtons();
        updateDots();
        updateProgress();
        updateHash();
        quizSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      const quizRect = quizUI.getBoundingClientRect();
      const currentRect = currentIsland.getBoundingClientRect();
      const currentHeight = currentRect.height;
      const islandTop = Math.max(0, currentRect.top - quizRect.top);
      showIsland(nextIsland);
      nextIsland.style.opacity = "0";
      const nextHeight = nextIsland.getBoundingClientRect().height;
      const lockedHeight = Math.max(
        currentHeight + islandTop,
        nextHeight + islandTop,
        quizRect.height,
      );

      quizUI.style.position = "relative";
      quizUI.style.height = `${lockedHeight}px`;
      quizUI.style.minHeight = `${lockedHeight}px`;
      quizUI.style.overflow = "visible";

      [currentIsland, nextIsland].forEach((island) => {
        island.style.position = "absolute";
        island.style.top = `${islandTop}px`;
        island.style.left = "0";
        island.style.width = "100%";
      });

      currentIsland.style.zIndex = "1";
      currentIsland.style.opacity = "1";
      currentIsland.style.transform = "translateY(0) scale(1)";
      nextIsland.style.zIndex = "2";
      nextIsland.style.opacity = "1";
      nextIsland.style.transform = "translateY(0) scale(1)";
      if (nextChallenge) {
        nextChallenge.style.opacity = "0.98";
        nextChallenge.style.transform = "translateY(0) scale(0.995)";
      }
      nextRevealTargets.forEach((target) => {
        target.style.opacity = "0";
        target.style.transform = `translateY(${dir === "next" ? 14 : -14}px)`;
        target.style.clipPath =
          dir === "next" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)";
      });

      void Promise.all([
        animateElements(
          currentRevealTargets,
          [
            { opacity: 1, transform: "translateY(0)" },
            {
              opacity: 0,
              transform: `translateY(${dir === "next" ? -8 : 8}px)`,
            },
          ],
          {
            duration: 160,
            easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
            fill: "both",
            stagger: 18,
          },
        ),
        animateElement(
          currentChallenge,
          [
            { opacity: 1, transform: "scale(1)", filter: "brightness(1)" },
            {
              opacity: 0,
              transform: "scale(0.992)",
              filter: "brightness(0.82)",
            },
          ],
          {
            delay: 60,
            duration: 220,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        ),
        animateElement(
          nextChallenge,
          [
            {
              opacity: 0.98,
              transform: "scale(0.995)",
              filter: "brightness(0.96)",
            },
            { opacity: 1, transform: "scale(1)", filter: "brightness(1)" },
          ],
          {
            delay: 80,
            duration: 220,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        ),
        animateElements(
          nextRevealTargets,
          [
            {
              opacity: 0,
              transform: `translateY(${dir === "next" ? 14 : -14}px)`,
              clipPath:
                dir === "next" ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
              clipPath: "inset(0% 0% 0% 0%)",
            },
          ],
          {
            delay: 160,
            duration: 340,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
            stagger: 45,
          },
        ),
      ]).then(onComplete);

      updateNavButtons();
    };

    // --- Event Listeners ---
    const prevBtn = topBar.querySelector(".quiz-nav-prev") as HTMLButtonElement;
    const nextBtn = topBar.querySelector(".quiz-nav-next") as HTMLButtonElement;
    if (prevBtn) {
      listen(prevBtn, "click", () => goToQuestion(currentIndex - 1, "prev"));
    }
    if (nextBtn) {
      listen(nextBtn, "click", () => goToQuestion(currentIndex + 1, "next"));
    }

    topBar.querySelectorAll(".quiz-dot").forEach((dot) => {
      listen(dot, "click", () => {
        const targetIndex = parseInt(
          (dot as HTMLElement).dataset.index || "0",
          10,
        );
        goToQuestion(targetIndex, targetIndex > currentIndex ? "next" : "prev");
      });
    });

    const resetButton = scoreBar.querySelector(
      ".quiz-reset-button",
    ) as HTMLButtonElement | null;
    if (resetButton) {
      listen(resetButton, "click", async () => {
        if (onReset) {
          await onReset();
          return;
        }

        const { QuestionStore } = await import("./QuestionStore");
        QuestionStore(window.location.pathname).reset();
        history.replaceState(null, "", `${window.location.pathname}#qq-1`);
        window.location.reload();
      });
    }

    listen(window, "quiz-answer-correct", ((e: Event) => {
      const detail = (e as CustomEvent).detail;
      answeredQuestions.set(detail.index, true);
      updateDots();
      updateProgress();
      const activeChallenge = islands[currentIndex]?.querySelector(
        ".challenge",
      ) as HTMLElement;
      if (activeChallenge) triggerConfetti(activeChallenge);
    }) as EventListener);

    listen(window, "quiz-question-answered", ((e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail?.index !== "number") return;

      answeredQuestions.set(detail.index, Boolean(detail.isCorrect));
      if (typeof detail.totalTries === "number") {
        totalAttemptCount = detail.totalTries;
      } else if (typeof detail.tries === "number") {
        challenges[detail.index].dataset.answerCount = String(detail.tries);
        totalAttemptCount = challenges.reduce(
          (sum, challenge) =>
            sum + Number(challenge.dataset.answerCount || "0"),
          0,
        );
      }
      updateDots();
      updateProgress();
      advanceToNextUnanswered(detail.index);
    }) as EventListener);

    mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("challenge")) {
            const island = target.closest("astro-island");
            if (island) {
              const idx = islands.indexOf(island as HTMLElement);
              if (idx !== -1) {
                if (target.classList.contains("correct"))
                  answeredQuestions.set(idx, true);
                else if (target.classList.contains("incorrect"))
                  answeredQuestions.set(idx, false);
                updateDots();
                updateProgress();
              }
            }
          }
        }
      }
    });

    challenges.forEach((c) =>
      mutationObserver?.observe(c, {
        attributes: true,
        attributeFilter: ["class"],
      }),
    );

    listen(document, "keydown", ((e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      if (
        keyboardEvent.key === "ArrowRight" ||
        keyboardEvent.key === "ArrowDown"
      ) {
        const rect = quizSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          keyboardEvent.preventDefault();
          goToQuestion(currentIndex + 1, "next");
        }
      } else if (
        keyboardEvent.key === "ArrowLeft" ||
        keyboardEvent.key === "ArrowUp"
      ) {
        const rect = quizSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          keyboardEvent.preventDefault();
          goToQuestion(currentIndex - 1, "prev");
        }
      }
    }) as EventListener);

    syncAnswers();
    updateNavButtons();
    updateDots();
    updateProgress();

    // Listen for hash changes (back/forward nav)
    listen(window, "hashchange", () => {
      navigateToHash();
    });

    // Navigate to initial hash if present
    if (!navigateToHash()) {
      updateHash();
    }
  }

  // Wait for all astro-island elements to finish hydrating before modifying DOM.
  // Hydration is signaled by the island having rendered React content.
  // We poll with a reasonable timeout.
  let attempts = 0;
  const maxAttempts = 50; // 50 * 100ms = 5s max wait

  function checkHydration() {
    if (destroyed) return;
    attempts++;
    // Check if all islands have been hydrated by looking for React internals
    // After hydration, React adds __reactFiber$ or __reactInternalInstance$ properties
    const allHydrated = islands.every((island) => {
      const challenge = island.querySelector(".challenge");
      if (!challenge) return false;
      // React attaches internal properties after hydration
      return Object.keys(challenge).some(
        (key) =>
          key.startsWith("__reactFiber$") ||
          key.startsWith("__reactInternalInstance$"),
      );
    });

    if (allHydrated || attempts >= maxAttempts) {
      activate();
    } else {
      hydrationTimer = window.setTimeout(checkHydration, 100);
    }
  }

  checkHydration();
  return {
    destroy: () => {
      destroyed = true;
      if (hydrationTimer != null) {
        window.clearTimeout(hydrationTimer);
        hydrationTimer = null;
      }
      cleanupHandlers.splice(0).forEach((cleanup) => cleanup());
      visibilityObserver?.disconnect();
      mutationObserver?.disconnect();
      topBar.remove();
      scoreBar.remove();
      completionCard.remove();
      quizUI.classList.remove("quiz-slides-active");
      islands.forEach((island) => {
        island.classList.remove(
          "quiz-slide",
          "quiz-slide--active",
          "quiz-slide--hidden",
        );
        island.style.removeProperty("display");
        island.style.removeProperty("position");
        island.style.removeProperty("top");
        island.style.removeProperty("left");
        island.style.removeProperty("width");
        island.style.removeProperty("z-index");
        island.style.removeProperty("opacity");
        island.style.removeProperty("transform");
        island.style.removeProperty("filter");
      });
    },
  };
}
