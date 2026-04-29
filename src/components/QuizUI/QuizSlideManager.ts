import gsap from "gsap";

/**
 * QuizSlideManager - CSS-first single-question quiz view.
 *
 * CRITICAL: Never modify DOM inside .quiz-ui until React hydration is complete.
 * Nav/score bars are appended to the parent section, not inside .quiz-ui.
 * Islands are hidden via display:none only after hydration signals completion.
 */
export function initQuizSlideManager(quizSection: HTMLElement) {
  if (!quizSection) return;

  const quizUI = quizSection.querySelector(".quiz-ui") as HTMLElement;
  if (!quizUI) return;

  const islands = [...quizUI.querySelectorAll<HTMLElement>("astro-island")].filter(
    (island) => island.querySelector(".challenge")
  );
  if (islands.length === 0) return;

  const challenges = islands.map((island) => island.querySelector<HTMLElement>(".challenge")!);
  const totalQuestions = challenges.length;
  let currentIndex = 0;
  let isTransitioning = false;
  const answeredQuestions = new Map<number, boolean>();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const tl = gsap.timeline({ onComplete: () => container.remove() });
    particles.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const vel = Math.random() * 180 + 80;
      tl.to(p, { x: Math.cos(angle) * vel, y: Math.sin(angle) * vel - Math.random() * 100 + 300, rotation: Math.random() * 720 - 360, opacity: 0, duration: Math.random() * 0.6 + 0.8, ease: "power2.out" }, 0);
    });
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
    </div>
    <div class="quiz-score-bar-congrats" style="display:none"></div>
  `;

  // --- Wait for React hydration, then activate slide system ---
  function activate() {
    // Insert nav bar BEFORE .quiz-ui (outside it, no DOM changes inside)
    quizSection.insertBefore(topBar, quizUI);

    // Insert score bar AFTER .quiz-ui
    if (quizUI.nextSibling) {
      quizSection.insertBefore(scoreBar, quizUI.nextSibling);
    } else {
      quizSection.appendChild(scoreBar);
    }

    // Hide all islands except the first
    islands.forEach((island, i) => {
      if (i !== 0) {
        island.style.display = "none";
      }
    });

    // Mark quiz as slide-enabled
    quizUI.classList.add("quiz-slides-active");

    // Move nav & score bars to body to avoid contain:content creating a new containing block
    // This ensures position:fixed is relative to the viewport
    document.body.appendChild(topBar);
    document.body.appendChild(scoreBar);

    // Show/hide nav & score bars based on quiz section visibility
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        topBar.classList.toggle("quiz-nav-bar--hidden", !visible);
        scoreBar.classList.toggle("quiz-score-bar--hidden", !visible);
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );
    visibilityObserver.observe(quizSection);

    // --- State Updates ---
    const syncAnswers = () => {
      challenges.forEach((c, i) => {
        if (c.classList.contains("correct")) answeredQuestions.set(i, true);
        else if (c.classList.contains("incorrect")) answeredQuestions.set(i, false);
      });
    };

    const updateProgress = () => {
      const correctCount = [...answeredQuestions.values()].filter((v) => v).length;
      const fill = scoreBar.querySelector(".quiz-score-bar-fill") as HTMLElement;
      const currentNum = scoreBar.querySelector(".quiz-score-bar-current") as HTMLElement;
      const scoreValue = scoreBar.querySelector(".quiz-score-bar-value") as HTMLElement;
      if (fill) fill.style.width = `${((currentIndex + 1) / totalQuestions) * 100}%`;
      if (currentNum) currentNum.textContent = String(currentIndex + 1);
      if (scoreValue) scoreValue.textContent = `${correctCount}/${totalQuestions}`;

      const congrats = scoreBar.querySelector(".quiz-score-bar-congrats") as HTMLElement;
      if (congrats && answeredQuestions.size === totalQuestions) {
        const isPerfect = correctCount === totalQuestions;
        congrats.style.display = "block";
        congrats.textContent = isPerfect ? `Perfect! ${correctCount}/${totalQuestions}` : `All done! ${correctCount}/${totalQuestions}`;
        scoreBar.classList.toggle("quiz-score-bar--perfect", isPerfect);
        scoreBar.classList.toggle("quiz-score-bar--success", !isPerfect);
      } else if (congrats) {
        congrats.style.display = "none";
        scoreBar.classList.remove("quiz-score-bar--perfect", "quiz-score-bar--success");
      }
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
      const prevBtn = topBar.querySelector(".quiz-nav-prev") as HTMLButtonElement;
      const nextBtn = topBar.querySelector(".quiz-nav-next") as HTMLButtonElement;
      if (prevBtn) prevBtn.disabled = currentIndex === 0 || isTransitioning;
      if (nextBtn) nextBtn.disabled = currentIndex === totalQuestions - 1 || isTransitioning;
    };

    // --- Transition ---
    const goToQuestion = (targetIndex: number, direction?: "next" | "prev") => {
      if (isTransitioning || targetIndex === currentIndex || targetIndex < 0 || targetIndex >= totalQuestions) return;
      isTransitioning = true;
      const dir = direction || (targetIndex > currentIndex ? "next" : "prev");
      const fromIndex = currentIndex;
      currentIndex = targetIndex;

      const currentIsland = islands[fromIndex];
      const nextIsland = islands[targetIndex];

      const onComplete = () => {
        currentIsland.style.display = "none";
        nextIsland.style.display = "";
        isTransitioning = false;
        syncAnswers();
        updateNavButtons();
        updateDots();
        updateProgress();
        topBar.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (prefersReducedMotion) {
        onComplete();
        return;
      }

      // Show next island for animation
      nextIsland.style.display = "";

      const tl = gsap.timeline({ onComplete });

      gsap.set(nextIsland, { autoAlpha: 0, y: dir === "next" ? 40 : -40, scale: 0.95 });

      tl.to(currentIsland, {
        duration: 0.35,
        autoAlpha: 0,
        y: dir === "next" ? -30 : 30,
        scale: 0.95,
        ease: "power2.in",
      }).to(nextIsland, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
      }, 0.1);

      updateNavButtons();
    };

    // --- Event Listeners ---
    const prevBtn = topBar.querySelector(".quiz-nav-prev") as HTMLButtonElement;
    const nextBtn = topBar.querySelector(".quiz-nav-next") as HTMLButtonElement;
    prevBtn?.addEventListener("click", () => goToQuestion(currentIndex - 1, "prev"));
    nextBtn?.addEventListener("click", () => goToQuestion(currentIndex + 1, "next"));

    topBar.querySelectorAll(".quiz-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetIndex = parseInt((dot as HTMLElement).dataset.index || "0", 10);
        goToQuestion(targetIndex, targetIndex > currentIndex ? "next" : "prev");
      });
    });

    window.addEventListener("quiz-answer-correct", ((e: Event) => {
      const detail = (e as CustomEvent).detail;
      answeredQuestions.set(detail.index, true);
      updateDots();
      updateProgress();
      const activeChallenge = islands[currentIndex]?.querySelector(".challenge") as HTMLElement;
      if (activeChallenge) triggerConfetti(activeChallenge);
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) goToQuestion(currentIndex + 1, "next");
      }, 1500);
    }) as EventListener);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("challenge")) {
            const island = target.closest("astro-island");
            if (island) {
              const idx = islands.indexOf(island as HTMLElement);
              if (idx !== -1) {
                if (target.classList.contains("correct")) answeredQuestions.set(idx, true);
                else if (target.classList.contains("incorrect")) answeredQuestions.set(idx, false);
                updateDots();
                updateProgress();
              }
            }
          }
        }
      }
    });

    challenges.forEach((c) => observer.observe(c, { attributes: true, attributeFilter: ["class"] }));

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const rect = quizSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          goToQuestion(currentIndex + 1, "next");
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const rect = quizSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          goToQuestion(currentIndex - 1, "prev");
        }
      }
    });

    syncAnswers();
    updateNavButtons();
    updateDots();
    updateProgress();
  }

  // Wait for all astro-island elements to finish hydrating before modifying DOM.
  // Hydration is signaled by the island having rendered React content.
  // We poll with a reasonable timeout.
  let attempts = 0;
  const maxAttempts = 50; // 50 * 100ms = 5s max wait

  function checkHydration() {
    attempts++;
    // Check if all islands have been hydrated by looking for React internals
    // After hydration, React adds __reactFiber$ or __reactInternalInstance$ properties
    const allHydrated = islands.every((island) => {
      const challenge = island.querySelector(".challenge");
      if (!challenge) return false;
      // React attaches internal properties after hydration
      return Object.keys(challenge).some((key) => key.startsWith("__reactFiber$") || key.startsWith("__reactInternalInstance$"));
    });

    if (allHydrated || attempts >= maxAttempts) {
      activate();
    } else {
      setTimeout(checkHydration, 100);
    }
  }

  checkHydration();
}
