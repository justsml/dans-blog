import { slugify } from "../../shared/pathHelpers.ts";
import { Option, QuizQuestion } from "./types.ts";
import { toBoolean } from "../../shared/parsingUtils.ts";

declare global {
  interface Window {
    __questions?: QuizQuestion[];
    __answers?: Record<string, boolean>;
    __questionCountBySlug?: Record<string, number>;
    __questionsByKeys?: Record<string, QuizQuestion>;
    __questionStoreBySlug?: Record<string, QuestionStore>;
  }
  interface GlobalThis {
    __questions: QuizQuestion[];
    __answers: Record<string, boolean>;
    __questionCountBySlug?: Record<string, number>;
    __questionsByKeys?: Record<string, QuizQuestion>;
  }
}

const KEY_PREFIX = "quiz-";

// const questionCountBySlug: Record<string, number> = {};
// const questionsByKeys: Record<string, QuizQuestion> = {};
// const questions: QuizQuestion[] = [];
// const answers: Record<string, boolean> = {};

if (typeof window !== "undefined") {
  window.__questionStoreBySlug ??= {};
  window.__questionCountBySlug ??= {};
  window.__questionsByKeys ??= {};
  window.__questions ??= [];
  window.__answers ??= {};
} else {
  // @ts-expect-error
  globalThis.__questionCountBySlug ??= {};
  // @ts-expect-error
  globalThis.__questionsByKeys ??= {};
  // @ts-expect-error
  globalThis.__questions ??= [];
  // @ts-expect-error
  globalThis.__answers ??= {};
}

export type QuestionStore = ReturnType<typeof QuestionStore>;
export type TitleQuestionPair = { title: string; question: string };
export const QuestionStore = (slug: string) => {
  const questionCountBySlug = window.__questionCountBySlug!;
  const questionsByKeys = window.__questionsByKeys!;
  const questions = window.__questions!;
  const answers = window.__answers!;

  const slugKey = slugify(KEY_PREFIX + slug);
  /* Warning: May return a very long string */
  const getQKey = (q: TitleQuestionPair) =>
    slugify(KEY_PREFIX + slug + "-" + q.title + "-" + q.question);

  // Load answers from localStorage
  const data = localStorage.getItem(slugKey);
  if (data) {
    console.info(`Loading previous quiz state for ${slugKey}`, answers);
    Object.assign(answers, JSON.parse(data));
  }
  return {
    countBySlug: () => questionCountBySlug[slug] ?? 0,
    countCorrectBySlug: () => Object.entries(answers).filter(
      ([key, answer]) => key.startsWith(slugKey) && answer,
    ).length,

    /** Adds Question & returns the # for that page (slug) */
    addQuestion: (question: QuizQuestion) => {
      const key = getQKey(question);
      let count = 0;
      if (!questionsByKeys[key]) {
        questionCountBySlug[slug!] ??= 0;
        count = questionCountBySlug[slug!]++;
        questionsByKeys[key] = question;
        questions.push(question);
      } else {
        console.warn("Question already exists", question);
      }
      return count;
    },

    isCorrect: ({title, question}: Partial<TitleQuestionPair>) => {
      const key = getQKey({question: question!, title: title!});
      return answers[key];
    },

    answerQuestion: (question: TitleQuestionPair, option: Option) => {
      const key = getQKey(question);
      answers[key] = option.isAnswer;
      localStorage.setItem(slugKey, JSON.stringify(answers));
      return option.isAnswer;
    },

    /** @deprecated */
    getQuestion: ({ question, title }: QuizQuestion) => {
      const key = slugify(KEY_PREFIX + slug + "-" + title + "-" + question);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : { isCorrect: null };
    },

    /** @deprecated */
    setQuestion: ({
      question,
      title,
      isCorrect,
    }: {
      title: string;
      question: string;
      isCorrect: boolean;
    }) => {
      const key = slugify(KEY_PREFIX + slug + "-" + title + "-" + question);
      localStorage.setItem(key, JSON.stringify({ isCorrect }));
      return isCorrect;
    },

    /** @deprecated */
    resetBySlug: () => {
      console.info(`Resetting quiz data for ${slugKey}`, localStorage.getItem(slugKey));
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(slugKey)) localStorage.removeItem(k);
      });
    },
  };
};

export const _clearAllQuizData = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
