"use client";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { QuizContext } from "./QuizContext";
import type { Option } from "./types";
import {
  BoxIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import classNames from "classnames";

import { CheckedBoxIcon } from "../icons/CheckedBoxIcon";
import { RefreshCwIcon } from "lucide-react";
import { slugify } from "../../shared/pathHelpers.ts";
import { QuestionStore } from "./QuestionStore.ts";
import "./index.css";
import "./icons.css";

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
  // hints = [],
}: {
  children: ReactNode[] | ReactNode;
  title: string;
  group: string;
  question: string;
  options: Option[];
  explanation?: string;
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

  const [questionIndex, setQuestionIndex] = useState<number>(0);

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
      setQuestionIndex(questionIndex);
      console.log("Added question to store:", questionIndex, group, title);
    } else {
      console.error("QuestionStore is not initialized");
    }
  }, [questionStore, title, group, question, options, explanation]);

  // Check if we already answered this question
  useEffect(() => {
    const isCorrect = questionStore?.isCorrect({
      question,
      title,
    });

    if (isCorrect !== null) {
      console.log("Found cached answer:", isCorrect);
      setIsCorrect(isCorrect);
      setChallengeClass(isCorrect ? "correct" : "incorrect");
    }
  }, []);


  const logEvent = (name: string, data: unknown) => {
    // @ts-ignore
    const posthog = window?.posthog;
    if (posthog) {
      posthog.capture(name, data);
    }
  }

  const handleAnswer = (option: Option) => {
    questionStore?.answerQuestion({
      title: title,
      question: question || "",
    }, option);
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
      questionIndex
    });
    setTimeout(updateCounts, 200);
  };

  useEffect(() => {
    const hasAnimation = challengeClass.includes("shake") || challengeClass.includes("pulse");

    if (challengeClass && hasAnimation) {
      const [answer] = challengeClass.split(" ");
      setTimeout(() => {
        setChallengeClass(answer);
      }, 1000);
    }
  }, [challengeClass]);

  useEffect(() => {
    if (challengeRef.current) {
      const e = challengeRef.current.querySelector(".explanation")?.innerHTML;
      if (e) setExplanationText(e);
    }
  }, [explanationText]);


  return (
    <div className={"challenge " + challengeClass} ref={challengeRef}>
      <h2 className="title" id={slugify(title)}>
        {questionIndex + 1}.&#160;
        {title}
      </h2>
      <div className="question">{question || children}</div>
      <section className="options">
        {options.map((option) => {
          const isCurrentOptionCorrectAnswer = isCorrect && option.isAnswer;
          return (
          <a
            key={option.text}
            className={classNames("option", {'correctly-answered': isCurrentOptionCorrectAnswer})}
            onClick={() => !isCorrect && handleAnswer(option)}
          >
            {isCurrentOptionCorrectAnswer ? (
              <CheckedBoxIcon className="icon" />
            ) : (
              <BoxIcon className="icon" />
            )}
            <label>{option.text}</label>
          </a>
        )})}
      </section>
      <div className="toolbar">
        <button className="btn btn-reset" onClick={() => reset()}>
          <RefreshCwIcon className="icon" />
          <div>Reset</div>
        </button>
        <button
          className="btn btn-hint"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          <QuestionMarkCircledIcon className="icon" />
          <div>{showExplanation ? "Hide" : "Show"} Explanation</div>
        </button>
      </div>
      {explanationText && (
        <div className="explanation">
          {showExplanation && (
            <p dangerouslySetInnerHTML={{ __html: explanationText }}></p>
          )}
        </div>
      )}
    </div>
  );
}
