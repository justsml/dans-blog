import gsap from "gsap";

/**
 * QuizSlideManager - Transforms SSR-rendered quiz into single-question view
 * with GSAP-powered 3D transitions, navigation dots, and progress bar.
 * 
 * This runs client-side only, after React hydration completes.
 */
export function initQuizSlideManager(quizSection: HTMLElement) {
  if (!quizSection) return;

  // Find the quiz-ui container (holds all challenges)
  const quizUI = quizSection.querySelector(".quiz-ui") as HTMLElement;
  if (!quizUI) return;

  // Get all challenge elements
  const challenges = [...quizUI.querySelectorAll<HTMLElement>(".challenge")];
  if (challenges.length === 0) return;

  const totalQuestions = challenges.length;
  let currentIndex = 0;
  let isTransitioning = false;
  const answeredQuestions = new Map<number, boolean>();

  // --- Build UI ---

  // Unified top bar: progress + navigation + score
  const topBar = document.createElement("div");
  topBar.className = "quiz-top-bar";
  topBar.innerHTML = `
    <div class="quiz-top-bar-inner">
      <button class="quiz-nav-arrow quiz-nav-prev" aria-label="Previous question" disabled>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="quiz-counter">
        <span class="quiz-counter-current">1</span><span class="quiz-counter-sep">/</span><span class="quiz-counter-total">${totalQuestions}</span>
      </div>
      <div class="quiz-progress-track-compact">
        <div class="quiz-progress-fill-compact" style="width: ${(1 / totalQuestions) * 100}%"></div>
      </div>
      <div class="quiz-score-compact">
        <span class="quiz-score-label">Score</span>
        <span class="quiz-score-value">0/${totalQuestions}</span>
      </div>
      <button class="quiz-nav-arrow quiz-nav-next" aria-label="Next question">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <div class="quiz-dots-bar">
      ${Array.from({ length: totalQuestions }, (_, i) => 
        `<button class="quiz-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Go to question ${i + 1}"></button>`
      ).join("")}
    </div>
  `;

  // Slide container
  const slideContainer = document.createElement("div");
  slideContainer.className = "quiz-questions-container";

  // Wrap each challenge in a slide
  challenges.forEach((challenge, index) => {
    const slide = document.createElement("div");
    slide.className = `quiz-question-slide ${index === 0 ? "active" : ""}`;
    slide.dataset.questionIndex = String(index);
    
    if (index === 0) {
      slide.style.cssText = "position: relative; opacity: 1; pointer-events: auto;";
    } else {
      slide.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; opacity: 0; pointer-events: none;";
    }
    
    // Move challenge into slide
    slide.appendChild(challenge);
    slideContainer.appendChild(slide);
  });

  // Replace quiz-ui contents
  quizUI.innerHTML = "";
  quizUI.appendChild(topBar);
  quizUI.appendChild(slideContainer);

  // --- State & Update Functions ---

  const updateProgress = () => {
    const correctCount = [...answeredQuestions.values()].filter(v => v).length;
    const fill = progressBar.querySelector(".quiz-progress-fill") as HTMLElement;
    const text = progressBar.querySelector(".quiz-progress-text") as HTMLElement;
    const score = progressBar.querySelector(".quiz-score-text") as HTMLElement;
    if (fill) fill.style.width = `${((currentIndex + 1) / totalQuestions) * 100}%`;
    if (text) text.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
    if (score) score.textContent = `Score: ${correctCount}/${totalQuestions}`;
  };

  const updateDots = () => {
    nav.querySelectorAll(".quiz-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
      dot.classList.remove("correct", "incorrect");
      if (answeredQuestions.has(i)) {
        dot.classList.add(answeredQuestions.get(i) ? "correct" : "incorrect");
      }
    });
  };

  const updateNavButtons = () => {
    const prevBtn = nav.querySelector(".quiz-nav-prev") as HTMLButtonElement;
    const nextBtn = nav.querySelector(".quiz-nav-next") as HTMLButtonElement;
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

    const slides = slideContainer.querySelectorAll(".quiz-question-slide");
    const currentSlide = slides[fromIndex] as HTMLElement;
    const nextSlide = slides[targetIndex] as HTMLElement;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentSlide, {
          autoAlpha: 0,
          pointerEvents: "none",
          position: "absolute",
          rotationX: dir === "next" ? 10 : -10,
        });
        gsap.set(nextSlide, {
          position: "relative",
          rotationX: 0,
        });
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");
        isTransitioning = false;
        updateNavButtons();
        updateDots();
        updateProgress();
        
        // Scroll to top of quiz
        progressBar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // Prepare next slide for animation
    gsap.set(nextSlide, {
      position: "absolute",
      pointerEvents: "auto",
      autoAlpha: 0,
      rotationX: dir === "next" ? -10 : 10,
      y: dir === "next" ? 40 : -40,
      scale: 0.95,
    });

    // Exit current
    tl.to(currentSlide, {
      duration: 0.35,
      autoAlpha: 0,
      rotationX: dir === "next" ? 15 : -15,
      y: dir === "next" ? -30 : 30,
      scale: 0.95,
      ease: "power2.in",
    })
    // Enter next
    .to(nextSlide, {
      duration: 0.5,
      autoAlpha: 1,
      rotationX: 0,
      y: 0,
      scale: 1,
      ease: "power3.out",
    }, 0.1);

    updateNavButtons();
  };

  // --- Event Listeners ---

  const prevBtn = nav.querySelector(".quiz-nav-prev") as HTMLButtonElement;
  const nextBtn = nav.querySelector(".quiz-nav-next") as HTMLButtonElement;
  
  prevBtn?.addEventListener("click", () => goToQuestion(currentIndex - 1, "prev"));
  nextBtn?.addEventListener("click", () => goToQuestion(currentIndex + 1, "next"));

  nav.querySelectorAll(".quiz-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt((dot as HTMLElement).dataset.index || "0", 10);
      goToQuestion(targetIndex, targetIndex > currentIndex ? "next" : "prev");
    });
  });

  // Listen for correct answer events from Challenge components
  window.addEventListener("quiz-answer-correct", ((e: Event) => {
    const detail = (e as CustomEvent).detail;
    answeredQuestions.set(detail.index, true);
    updateDots();
    updateProgress();
    
    // Auto-advance after delay
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        goToQuestion(currentIndex + 1, "next");
      }
    }, 1500);
  }) as EventListener);

  // Track incorrect answers via mutation observer
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains("challenge")) {
          const slide = target.closest(".quiz-question-slide");
          if (slide) {
            const idx = parseInt((slide as HTMLElement).dataset.questionIndex || "0", 10);
            if (target.classList.contains("correct")) {
              answeredQuestions.set(idx, true);
            } else if (target.classList.contains("incorrect")) {
              answeredQuestions.set(idx, false);
            }
            updateDots();
            updateProgress();
          }
        }
      }
    }
  });

  challenges.forEach(c => {
    observer.observe(c, { attributes: true, attributeFilter: ["class"] });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      goToQuestion(currentIndex + 1, "next");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goToQuestion(currentIndex - 1, "prev");
    }
  });

  // Initial state
  updateNavButtons();
  updateDots();
  updateProgress();
}
