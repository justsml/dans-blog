import { QuestionStore } from "./QuestionStore";
import {
  initQuizSlideManager,
  type QuizSlideManagerController,
} from "./QuizSlideManager";

type QuestionStoreInstance = ReturnType<typeof QuestionStore>;

export type QuizRuntimeController = {
  destroy: () => void;
  getQuestionStore: () => QuestionStoreInstance;
  updateCounts: () => boolean;
};

type QuizRuntimeOptions = {
  quiz?: HTMLElement | null;
};

let activeRuntime: QuizRuntimeController | null = null;
let activeQuiz: HTMLElement | null = null;
let lifecycleListenersInstalled = false;

if (typeof window !== "undefined" && !window.__updateCounts) {
  window.__updateCounts = () => false;
}

export function bootQuizRuntime({
  quiz = document.querySelector<HTMLElement>(".quiz-ui"),
}: QuizRuntimeOptions = {}) {
  installLifecycleCleanup();

  if (!quiz) {
    destroyQuizRuntime();
    return null;
  }

  if (activeRuntime && activeQuiz === quiz) {
    return activeRuntime;
  }

  destroyQuizRuntime();

  const runtime = createQuizRuntime(quiz);
  activeRuntime = runtime;
  activeQuiz = quiz;
  return runtime;
}

export function destroyQuizRuntime() {
  activeRuntime?.destroy();
  activeRuntime = null;
  activeQuiz = null;
}

function createQuizRuntime(quiz: HTMLElement): QuizRuntimeController {
  const abortController = new AbortController();
  const questionStore = QuestionStore(window.location.pathname);
  let refreshInterval: number | null = null;
  let refreshCount = 0;
  let slideManager: QuizSlideManagerController | null = null;
  let destroyed = false;

  const updateCounts = () => updateQuizCounts(questionStore);

  window.__updateCounts = updateCounts;
  quiz.dataset.quizLogicInitialized = "true";

  const resetQuiz = () => {
    questionStore.reset();
    history.replaceState(null, "", `${window.location.pathname}#qq-1`);
    window.location.reload();
  };

  const resetButton = document.querySelector("button.reset-quiz");
  resetButton?.addEventListener("click", resetQuiz, {
    signal: abortController.signal,
  });

  startQuizRefreshLoop();

  quiz.addEventListener(
    "mousedown",
    () => {
      stopQuizRefreshLoop();
    },
    { once: true, signal: abortController.signal },
  );

  quiz.addEventListener(
    "click",
    () => {
      stopQuizRefreshLoop();
      updateCounts();
    },
    { signal: abortController.signal },
  );

  deferWork(() => {
    if (destroyed) return;
    slideManager = initQuizSlideManager(
      quiz.closest("section") as HTMLElement,
      {
        onReset: resetQuiz,
      },
    );
  }, 200);

  function startQuizRefreshLoop() {
    refreshCount = 0;
    refreshInterval = window.setInterval(() => {
      refreshCount++;
      updateCounts();

      if (refreshCount > 12) {
        stopQuizRefreshLoop();
      }
    }, 100);
  }

  function stopQuizRefreshLoop() {
    if (refreshInterval == null) return;
    window.clearInterval(refreshInterval);
    refreshInterval = null;
  }

  return {
    destroy: () => {
      destroyed = true;
      stopQuizRefreshLoop();
      abortController.abort();
      slideManager?.destroy();
      slideManager = null;
      if (window.__updateCounts === updateCounts) {
        window.__updateCounts = () => false;
      }
      delete quiz.dataset.quizLogicInitialized;
    },
    getQuestionStore: () => questionStore,
    updateCounts,
  };
}

function updateQuizCounts(questionStore: QuestionStoreInstance) {
  const quizUI = document.querySelectorAll(".quiz-ui");
  const questions = document.querySelectorAll("main .challenge");
  const isQuizPage = quizUI.length > 0;

  if (!isQuizPage || questions.length <= 0) return false;

  const scoreEls = document.querySelectorAll(".score");
  const scoreEl = scoreEls[0] as HTMLElement | undefined;
  const scoreWrapper = document.querySelector(".score-wrapper");
  const scoreLabel = document.querySelector(".score label");
  const correct = document.querySelectorAll("main .challenge.correct");
  const congratsMsg = document.querySelector(".congrats-message");

  if (!scoreEl) return false;

  const tries = questionStore.sumOfTries() || getAnswerCount();
  const isPerfect =
    questions.length === correct.length && tries === questions.length;

  if (scoreEl?.parentNode?.nodeName !== "BODY") {
    document.body.appendChild(scoreEl);
  }

  if (isPerfect) {
    scoreEl?.classList.add("perfect");
    quizUI[0].classList.add("perfect");
  }

  if (scoreEls.length >= 2) console.error("Multiple score elements found");
  if (!scoreLabel) {
    console.error("Expected score label, not found");
    return false;
  }
  if (correct.length > 0) scoreEls[0].classList.add("active");

  if (questions.length === correct.length) {
    scoreEl.classList.add("all-correct");
    if (congratsMsg) {
      const winningMessage = isPerfect ? "WOW! Perfect!" : "All correct!";
      const hTag = isPerfect ? "h2" : "h3";
      congratsMsg.innerHTML = `<${hTag}>${winningMessage} ${correct.length} / ${questions.length} ${tries > 0 ? `<sup>(${tries} tries)</sup>` : ""}</${hTag}>`;
    }
    scoreWrapper?.classList.toggle("pulse");
    scoreEl?.classList.add("success");
  } else {
    scoreLabel.innerHTML = `${correct.length} / ${questions.length} ${tries > 0 ? `<sup>(${tries} tries)</sup>` : ""}`;
  }
  return true;
}

function getAnswerCount() {
  return [...document.querySelectorAll("[data-answer-count]")].reduce(
    (acc, q) => {
      const tries = parseInt(q.getAttribute("data-answer-count") || "0", 10);
      return acc + tries;
    },
    0,
  );
}

function deferWork(work: () => void | Promise<void>, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(
      () => {
        void work();
      },
      { timeout },
    );
    return;
  }

  globalThis.setTimeout(() => {
    void work();
  }, 350);
}

function installLifecycleCleanup() {
  if (lifecycleListenersInstalled) return;
  lifecycleListenersInstalled = true;
  document.addEventListener("astro:before-swap", destroyQuizRuntime);
}
