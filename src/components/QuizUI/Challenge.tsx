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
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

import "./index.css";
import { CheckedBoxIcon } from "../icons/CheckedBoxIcon";
import { RefreshCwIcon } from "lucide-react";
import classNames from "classnames";
import { slugify } from "../../shared/pathHelpers";

/**
 * Challenge component
 */
export default function Challenge({
  children,
  title,
  question,
  options,
  explanation,
  // hints = [],
}: {
  children: ReactNode[] | ReactNode;
  title: string;
  question?: string;
  options: Option[];
  explanation?: string;
  // hints?: string[];
}) {
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

  const handleAnswer = (option: Option) => {
    if (option.isAnswer) {
      setIsCorrect(true);
      setChallengeClass("correct pulse");
    } else {
      setIsCorrect(false);
      setChallengeClass("incorrect shake");
    }
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

  // hints ||= [];
  explanation ||= "";

  return (
    <div className={"challenge " + challengeClass} ref={challengeRef}>
      <h2 className="title" id={slugify(title)}>
        {isCorrect === undefined && (
          <QuestionMarkCircledIcon className="icon" />
        )}

        {isCorrect && <CheckCircledIcon className="icon" />}
        {isCorrect === false && <CrossCircledIcon className="icon" />}

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
