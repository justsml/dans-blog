import type { Option } from "./types.ts";
import {
  clearAllQuizProgress,
  createQuizProgress,
  type QuizQuestionInfo,
} from "./QuizProgress.ts";

export type QuestionInfo = QuizQuestionInfo;
type IdxOnly = { index: number };

export const QuestionStore = (slug: string) => {
  const progress = createQuizProgress(slug);

  return {
    __slug: progress.storageKey,
    __questions: progress.questions,

    total: () => progress.getSnapshot().total,
    correct: () => progress.getSnapshot().correct,
    sumOfTries: () => progress.getSnapshot().tries,

    reset: progress.reset,

    /** Adds Question & returns the # for that page (slug) */
    addQuestion: (question: QuestionInfo) => {
      return progress.registerQuestion(question).total;
    },

    isCorrect: ({ index }: IdxOnly) => {
      return progress.getQuestion(index)?.isCorrect;
    },

    getTries: ({ index }: IdxOnly) => {
      return progress.getQuestion(index)?.tries;
    },

    answerQuestion: (question: IdxOnly, option: Option) => {
      if (!question || !option) throw Error("Missing question and/or option args");
      if (question.index == null) throw Error("Missing question.index");

      return progress.answerQuestion(question.index, option).isCorrect;
    },
  };
};

export const _clearAllQuizData = () => {
  clearAllQuizProgress();
};
