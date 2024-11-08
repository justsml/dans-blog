import { Option } from "./types.ts";

const KEY_PREFIX = "quiz-";


export type QuestionInfo = { title?: string; group: string; question: string, index: number }
type QuestionAnswerInfo = { isCorrect: boolean | undefined, tries: number };
// type QuestionData = { [key: string]: boolean };
type QuestionList = Array<QuestionInfo & QuestionAnswerInfo>;
type IdxOnly = { index: number };

export const QuestionStore = (slug: string) => {
  const questions: QuestionList = JSON.parse(localStorage.getItem(slug) ?? '[]');
  const save = () => localStorage.setItem(slug, JSON.stringify(questions));
  const reset = () => localStorage.setItem(slug, '[]');

  return {
    total: () => questions.length,
    correct: () => questions.filter((q: any) => q.isCorrect).length,

    reset,

    /** Adds Question & returns the # for that page (slug) */
    addQuestion: (question: QuestionInfo) => {
      if (!question) Error("Missing question arg");
      if (question.index == null) Error("Missing question.index");
      if (questions[question.index]) {
        // already exists
        return questions.length;
      }
      questions[question.index] = { ...question, isCorrect: undefined, tries: 0 };
      save();
      return questions.length;
    },

    isCorrect: ({index}: {index: number}) => {
      return questions?.[index].isCorrect;
    },

    answerQuestion: (question: IdxOnly, option: Option) => {
      if (!question || !option) throw Error("Missing question and/or option args");
      if (question.index == null) throw Error("Missing question.index");

      if (!questions[question.index]) throw Error(`Question ${question.index} not found`);
      const isCorrect = option.isAnswer;
      
      questions[question.index].isCorrect = isCorrect;
      questions[question.index].tries++;
      save();
      return option.isAnswer;
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
