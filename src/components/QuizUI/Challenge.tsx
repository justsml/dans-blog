"use client";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { QuizContext } from "./QuizContext";
import type { Option } from "./types";
import { BoxIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

import { CheckedBoxIcon } from "../icons/CheckedBoxIcon";
import { RefreshCwIcon } from "lucide-react";
import { slugify } from "../../shared/pathHelpers.ts";
import { QuestionStore } from "./QuestionStore.ts";
import "./index.css";
import "./icons.css";
import clsx from "clsx";

/**
 * Challenge component
 */
export default function Challenge({
  children,
  title,
  group,
  question,
  options,
  explanation,
  index: questionIndex,
  // hints = [],
}: {
  children: ReactNode[] | ReactNode;
  title: string;
  group: string;
  question: string;
  options: Option[];
  explanation?: string;
  index?: number;
  // hints?: string[];
}) {
  let questionStore: QuestionStore | null = null;

  const { setTotalQuestions, setCorrectAnswers } = useContext(QuizContext);

  const challengeRef = useRef<HTMLDivElement>(null);
  const [challengeClass, setChallengeClass] = useState<string>("untouched");

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  // const [selectedOption, setSelectedOption] = useState<OptionSelection>({ text: "" });
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [explanationText, setExplanationText] = useState<string>(explanation!);

  const updateCounts = () => {
    const questions = document.querySelectorAll("main .challenge");
    const correct = document.querySelectorAll("main .challenge.correct");
    setTotalQuestions(questions?.length);
    setCorrectAnswers(correct?.length);
  };

  const reset = () => {
    setIsCorrect(undefined);
    setChallengeClass("untouched");
    setShowExplanation(false);
  };

  useEffect(() => {
    if (!window.__questionStoreBySlug) window.__questionStoreBySlug = {};

    // console.log("QuestionStore INIT @ path:", document.location.pathname);
    let q = window.__questionStoreBySlug?.[document.location.pathname];
    if (!q) {
      q = QuestionStore(document.location.pathname);
      window.__questionStoreBySlug[document.location.pathname] = q;
    }

    questionStore = q;
  }, [window.location.pathname]);

  // Add Question to store

  useEffect(() => {
    if (questionStore) {
      const questionIndex = questionStore.addQuestion({
        title,
        group,
        question,
        options,
        explanation,
      });
      console.log("Added question to store:", questionIndex, group, title);
    } else {
      console.error("QuestionStore is not initialized");
    }
  }, [questionStore, title, group, question, options, explanation]);

  // Check if we already answered this question
  useEffect(() => {
    const isCorrect =
      questionStore?.isCorrect({
        question,
        title,
      }) ?? undefined;

    console.log("Checking if we already answered this question:", isCorrect);
    console.log("Found cached answer:", isCorrect);
    setIsCorrect(isCorrect);
    setChallengeClass(
      isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "",
    );
  }, []);

  const logEvent = (name: string, data: unknown) => {
    // @ts-ignore
    const posthog = window?.posthog;
    if (posthog) {
      posthog.capture(name, data);
    }
  };

  const handleAnswer = (option: Option) => {
    questionStore?.answerQuestion(
      {
        title: title,
        question: question || "",
      },
      option,
    );
    if (option.isAnswer) {
      setIsCorrect(true);
      setChallengeClass("correct pulse");
    } else {
      setIsCorrect(false);
      setChallengeClass("incorrect shake");
    }
    logEvent("QuizAnswer", {
      isCorrect: option.isAnswer,
      option,
      question: question || "",
      title: title,
      questionIndex,
    });
    setTimeout(updateCounts, 200);
  };

  useEffect(() => {
    const hasAnimation =
      challengeClass.includes("shake") || challengeClass.includes("pulse");

    if (challengeClass && hasAnimation) {
      const [answer] = challengeClass.split(" ");
      setTimeout(() => {
        setChallengeClass(answer);
      }, 1000);
    }
  }, [challengeClass]);

  useEffect(() => {
    if (challengeRef.current) {
      const e = challengeRef.current.querySelector("div.explanation")?.innerHTML;
      if (e) setExplanationText(e);
    }
  }, [explanationText]);
clsx("challenge", challengeClass);
  return (
    <div className={"challenge " + challengeClass} ref={challengeRef}>
      <div className="quiz-header">
        <div className="quiz-question-count">{(questionIndex ?? 0) + 1}.&#160;</div>
        <h2 className="quiz-title" id={slugify(title)}>
          {title}
        </h2>
      </div>
      <div className="quiz-question">{question || children}</div>
      {explanationText && (
        <section className="quiz-hint">
          <button
            className="hint-toggle"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? "Hide" : "Show"} Explanation
          </button>
        </section>
      )}
      <section className="quiz-body-panel card-container">
        <section className={"explanation card card-back " + (showExplanation ? "open" : "closed")}>
          {showExplanation && (
            <p dangerouslySetInnerHTML={{ __html: explanationText }}></p>
          )}
        </section>
        <section className="quiz-options card card-front">
          {options.map((option) => {
            const isCurrentOptionCorrectAnswer = isCorrect && option.isAnswer;
            return (
              <a
                key={option.text}
                className={classNames("option", {
                  "correct-answer": isCurrentOptionCorrectAnswer,
                })}
                onClick={() => !isCorrect && handleAnswer(option)}
              >
                <label>{option.text}</label>
              </a>
            );
          })}
        </section>
      </section>
    </div>
  );
}
