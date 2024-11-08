"use client";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { QuizContext } from "./QuizContext";
import type { Option } from "./types";
import classNames from "classnames";

import { slugify } from "../../shared/pathHelpers.ts";
import { QuestionStore } from "./QuestionStore.ts";
import clsx from "clsx";
import getGlobal from "@stdlib/utils-global";

const global = getGlobal();

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
  index: number;
  // hints?: string[];
}) {
  let questionStore: ReturnType<typeof QuestionStore> | null = null;

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

  // const [clean]

  const reset = () => {
    setIsCorrect(undefined);
    setChallengeClass("untouched");
    setShowExplanation(false);
  };

  useEffect(() => {
    if (!questionStore) 
      questionStore = QuestionStore(global?.location.pathname);
    
  }, [global?.location?.pathname]);

  useEffect(() => {
    if (!questionStore) 
      questionStore = QuestionStore(global?.location.pathname);

    if (questionStore) {
      const idx = questionStore.addQuestion({
        title,
        group,
        question,
        index: questionIndex,
      });
      // console.log("Added question to store:", questionIndex, group, title);
    } else {
      // console.error("QuestionStore is not initialized");
    }
  }, [questionStore, title, group, question, options, explanation]);

  // Check if we already answered this question
  useEffect(() => {
    const isCorrect =
      questionStore?.isCorrect({
        index: questionIndex,
      }) ?? undefined;

    setIsCorrect(isCorrect);
    setChallengeClass(
      isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "",
    );
  }, []);

  const logEvent = (name: string, data: unknown) => {
    // @ts-ignore
    const posthog = global?.posthog;
    if (posthog) {
      posthog.capture(name, data);
    }
  };

  const handleAnswer = (option: Option) => {
    console.log("Answering question:", title, question, option);
    if (!questionStore) questionStore = QuestionStore(global?.location.pathname);
    questionStore?.answerQuestion(
      {
        index: questionIndex,
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
    setTimeout(updateCounts, 20);
  };

  useEffect(() => {
    const hasAnimation =
      challengeClass.includes("shake") || challengeClass.includes("pulse");

    if (challengeClass && hasAnimation) {
      const cssBefore = challengeClass
        .split(" ")
        .filter((c) => !["shake", "pulse"].includes(c));
      setTimeout(() => {
        setChallengeClass(cssBefore.join(" "));
      }, 1000);
    }
  }, [challengeClass]);

  useEffect(() => {
    if (challengeRef.current) {
      const e = challengeRef.current.querySelector("div.explanation")?.innerHTML;
      if (e) setExplanationText(e);
    }
  }, [explanationText]);

  const sequenceNum = (questionIndex ?? 0) + 1;

  let correctCount = options.filter((o) => o.isAnswer).length;

  if (correctCount === 0) {
    console.error("No correct answers found for question:",
      question,
      title,
      options,
    );
  }

  // Sorta supported, **only need to select one correct answer**
  // if (correctCount >= 2) {
  //   console.error("NotYetSupported: Multiple correct answers found for question:",
  //     question,
  //     title,
  //     options,
  //   );
  // }

  const _options = options
    .map((option) => {
      const isCurrentOptionCorrectAnswer = isCorrect && option.isAnswer;
      // Bail out of wrong answers once answered
      if (isCorrect && !option.isAnswer) return null;
      // if (challengeClass.includes("answerAnimationEnded")) {
      //   return null;
      // }

      return (
        <a
          key={option.text}
          className={classNames("option", {
            "correct-answer": isCurrentOptionCorrectAnswer,
            // "slideOutRight": isCorrect && !option.isAnswer,
          })}
          onClick={() => !isCorrect && handleAnswer(option)}
          // onTransitionEnd={(e) => {
          //   if (isCorrect && !option.isAnswer) {
          //     document.removeChild(e.currentTarget!)
          //     // setChallengeClass(challengeClass.concat(" answerAnimationEnded"));
          //   }
          // }}
        >
          <label>{option.text}</label>
        </a>
      );
    })
    .filter(Boolean);

  return (
    <div
      id={`qq-${sequenceNum}`}
      className={clsx("challenge", challengeClass)}
      ref={challengeRef}
    >
      <div className="quiz-header">
        <div className="quiz-question-count">
          <a href={`#qq-${sequenceNum}`}>{sequenceNum}.</a>
          &#160;
        </div>
        <h2 className="quiz-title" id={slugify(title)}>
          {group}
        </h2>
      </div>

      <div className="quiz-question">{question || children}</div>
      <aside className="quiz-hint-toggle">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className={clsx("hint-toggle", { open: showExplanation })}
        >
          {showExplanation ? "Hide" : "Show"} Explainer{" "}
        </button>
      </aside>
      <section
        className={clsx("quiz-body-panel", "card-container", {
          "card-flip": showExplanation,
        })}
        style={{
          height: `${80 * _options.length}px`,
          transition: "height 0.2s ease-in-out",
        }}
      >
        <section className="quiz-options card card-front">
          {_options}
        </section>
        <section className={"explanation card card-back "}>
          <p
            className="help-box"
            dangerouslySetInnerHTML={{ __html: explanationText }}
          ></p>
        </section>
      </section>
    </div>
  );
}
