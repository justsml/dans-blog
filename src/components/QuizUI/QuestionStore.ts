import getGlobal from "@stdlib/utils-global";
import { Option } from "./types.ts";

const KEY_PREFIX = "quiz-";

const global = getGlobal();

export type QuestionInfo = {
  title?: string;
  group: string;
  question: string;
  index: number;
};
type QuestionAnswerInfo = { isCorrect: boolean | undefined; tries: number };
// type QuestionData = { [key: string]: boolean };
type QuestionList = Array<QuestionInfo & QuestionAnswerInfo>;
type IdxOnly = { index: number };

export const QuestionStore = (slug: string) => {
  slug = slug.replace(/^\/|\/$/gm, "");
  const questions: QuestionList = JSON.parse(
    global?.localStorage?.getItem(slug) ?? "[]",
  );
  const save = () =>
    global?.localStorage.setItem(slug, JSON.stringify(questions));
  const reset = () => global?.localStorage.setItem(slug, "[]");

  return {
    __slug: slug,
    __questions: questions,

    total: () => questions.length,
    correct: () => questions.filter((q: any) => q.isCorrect).length,
    sumOfTries: () => questions.reduce((acc, q) => acc + (q?.tries ?? 0), 0),

    reset,

    /** Adds Question & returns the # for that page (slug) */
    addQuestion: (question: QuestionInfo) => {
      if (!question) Error("Missing question arg");
      if (question.index == null) Error("Missing question.index");
      if (questions[question.index]) {
        // already exists
        return questions.length;
      }
      questions[question.index] = {
        ...question,
        isCorrect: undefined,
        tries: 0,
      };
      save();
      return questions.length;
    },

    isCorrect: ({ index }: { index: number }) => {
      return questions?.[index].isCorrect;
    },

    answerQuestion: (question: IdxOnly, option: Option) => {
      if (!question || !option)
        throw Error("Missing question and/or option args");
      if (question.index == null) throw Error("Missing question.index");

      if (!questions[question.index])
        throw Error(`Question ${question.index} not found`);
      const isCorrect = option.isAnswer;

      questions[question.index].isCorrect = isCorrect;
      questions[question.index].tries++;
      save();
      return option.isAnswer;
    },
  };
};

export const _clearAllQuizData = () => {
  Object.keys(global?.localStorage).forEach((key) => {
    if (key.startsWith(KEY_PREFIX)) {
      global?.localStorage.removeItem(key);
    }
  });
};
