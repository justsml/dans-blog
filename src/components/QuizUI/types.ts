import type { ReactNode } from "react";

export type OptionSelection = unknown; //number | null;
/** @deprecated */
export type Answer = { option: OptionSelection; correct: boolean };
export type Option = { text: string; isAnswer: boolean; hint?: string };

export interface ChallengeProps {
  children: ReactNode;
}

export interface QuestionProps {
  children: ReactNode;
}

export interface OptionsProps {
  children: ReactNode;
}

export interface OptionProps {
  children: ReactNode;
  onClick?: () => void;
  answer?: boolean;
  hint?: string;
}

export interface HintProps {
  children: ReactNode;
}

export interface ExplainProps {
  children: ReactNode;
}

export interface QuizQuestion {
  title: string;
  group: string;

  question: string;
  options: Option[];
  explanation?: string;
}
