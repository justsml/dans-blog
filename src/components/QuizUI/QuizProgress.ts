import getGlobal from "@stdlib/utils-global";
import type { Option } from "./types.ts";

const KEY_PREFIX = "quiz-";

const global = getGlobal();

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
  const storage = global?.localStorage as Storage | undefined;
  const legacyValue = storage?.getItem(normalizedSlug);
  const storedValue = storage?.getItem(storageKey) ?? legacyValue ?? "[]";
  const questions = parseStoredQuestions(storedValue);

  const save = () => {
    storage?.setItem(storageKey, JSON.stringify(questions));
  };

  if (legacyValue != null && storage?.getItem(storageKey) == null) {
    save();
    storage?.removeItem(normalizedSlug);
  }

  const getSnapshot = (): QuizProgressSnapshot => {
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
      return questions[index];
    },

    registerQuestion(question: QuizQuestionInfo) {
      assertQuestionIndex(question);

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
      if (!questions[questionIndex]) {
        throw Error(`Question ${questionIndex} not found`);
      }

      const question = questions[questionIndex];
      question.isCorrect = option.isAnswer;
      question.tries++;
      save();

      return {
        isCorrect: option.isAnswer,
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
  const storage = global?.localStorage as Storage | undefined;
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
