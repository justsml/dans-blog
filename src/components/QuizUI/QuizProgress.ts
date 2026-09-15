import type { Option } from "./types.ts";

const KEY_PREFIX = "quiz-";

export type QuizQuestionInfo = {
  title?: string;
  group: string;
  question: string;
  index: number;
};

export type QuizQuestionProgress = QuizQuestionInfo & {
  isCorrect: boolean | undefined;
  tries: number;
};

export type QuizProgressSnapshot = {
  storageKey: string;
  total: number;
  correct: number;
  tries: number;
  questions: QuizQuestionProgress[];
};

export type QuizAnswerResult = {
  isCorrect: boolean;
  question: QuizQuestionProgress;
  snapshot: QuizProgressSnapshot;
};

export type QuizProgress = ReturnType<typeof createQuizProgress>;

export function createQuizProgress(slug: string) {
  const normalizedSlug = normalizeQuizSlug(slug);
  const storageKey = `${KEY_PREFIX}${normalizedSlug}`;
  const storage = getStorage();
  const legacyValue = storage?.getItem(normalizedSlug);
  const storedValue = storage?.getItem(storageKey) ?? legacyValue ?? "[]";
  const questions = parseStoredQuestions(storedValue);

  // Each hydrated question owns a controller. Re-read the shared persisted
  // state before reads and writes so an older controller cannot erase answers
  // recorded by a different question (or resurrect progress after reset).
  const refresh = () => {
    if (!storage) return;
    const latest = parseStoredQuestions(storage.getItem(storageKey) ?? "[]");
    questions.splice(0, questions.length, ...latest);
  };

  const save = () => {
    storage?.setItem(storageKey, JSON.stringify(questions));
  };

  if (legacyValue != null && storage?.getItem(storageKey) == null) {
    save();
    storage?.removeItem(normalizedSlug);
  }

  const getSnapshot = (): QuizProgressSnapshot => {
    refresh();
    const knownQuestions = questions.filter(Boolean);

    return {
      storageKey,
      total: questions.length,
      correct: knownQuestions.filter((question) => question.isCorrect).length,
      tries: knownQuestions.reduce(
        (sum, question) => sum + (question.tries ?? 0),
        0,
      ),
      questions: questions.map((question) => ({ ...question })),
    };
  };

  return {
    storageKey,
    questions,

    getSnapshot,

    getQuestion(index: number) {
      refresh();
      return questions[index];
    },

    registerQuestion(question: QuizQuestionInfo) {
      assertQuestionIndex(question);
      refresh();

      if (!questions[question.index]) {
        questions[question.index] = {
          ...question,
          isCorrect: undefined,
          tries: 0,
        };
        save();
      }

      return getSnapshot();
    },

    answerQuestion(questionIndex: number, option: Option): QuizAnswerResult {
      if (!option) throw Error("Missing option arg");
      if (questionIndex == null) throw Error("Missing question.index");
      refresh();
      if (!questions[questionIndex]) {
        throw Error(`Question ${questionIndex} not found`);
      }

      const question = questions[questionIndex];
      const isCorrect = Boolean(option.isAnswer);
      question.isCorrect = isCorrect;
      question.tries++;
      save();

      return {
        isCorrect,
        question,
        snapshot: getSnapshot(),
      };
    },

    reset() {
      storage?.removeItem(storageKey);
      storage?.removeItem(normalizedSlug);
      questions.splice(0);
    },
  };
}

export function clearAllQuizProgress() {
  const storage = getStorage();
  if (!storage) return;

  Object.keys(storage).forEach((key) => {
    if (key.startsWith(KEY_PREFIX)) {
      storage.removeItem(key);
    }
  });
}

function normalizeQuizSlug(slug: string) {
  return slug.replace(/^\/|\/$/gm, "");
}

function getStorage() {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

function parseStoredQuestions(storedValue: string): QuizQuestionProgress[] {
  try {
    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function assertQuestionIndex(question: QuizQuestionInfo) {
  if (!question) throw Error("Missing question arg");
  if (question.index == null) throw Error("Missing question.index");
}
