import { slugify } from "../../shared/pathHelpers.ts";

const KEY_PREFIX = "quiz-";

export const QuestionStore = {
  getQuestion: ({
    question,
    title,
    slug = document.location.pathname,
  }: {
    slug: string;
    title: string;
    question: string;
  }) => {
    const key = slugify(KEY_PREFIX + slug + "-" + title + "-" + question);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { isCorrect: null };
  },

  setQuestion: ({
    question,
    title,
    slug = document.location.pathname,
    isCorrect,
  }: {
    slug: string;
    title: string;
    question: string;
    isCorrect: boolean;
  }) => {
    const key = slugify(KEY_PREFIX + slug + "-" + title + "-" + question);
    localStorage.setItem(key, JSON.stringify({ isCorrect }));
    return isCorrect;
  },

  resetBySlug: (slug: string) => {
    const key = slugify(KEY_PREFIX + slug);
    console.info(`Resetting quiz data for ${key}`, localStorage.getItem(key));
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(key)) localStorage.removeItem(k);
    });
  }
};

export const _clearAllQuizData = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
