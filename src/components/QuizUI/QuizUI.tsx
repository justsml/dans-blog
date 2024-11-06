import { useState } from "react";
import type { Answer } from "./types";
import { QuizContext } from "./QuizContext";
import { RefreshCcwIcon } from "lucide-react";
import "./index.css";
import "./icons.css";

export default function QuizUI({ children }: any) {
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        currentChallenge,
        setCurrentChallenge,
        totalQuestions,
        setTotalQuestions,
        correctAnswers,
        setCorrectAnswers,
      }}
    >
      <div className="quiz-ui">{children}</div>

      <div className="score">
        <div className="congrats-message">
          <h3>Congrats! Quiz completed.</h3>
        </div>
        <div className="score-wrapper">
          Quiz Score:{" "}
          <label>
            {correctAnswers}/{totalQuestions}
          </label>
        </div>
        <button className="btn reset-quiz">
          <RefreshCcwIcon width={32} height={32} />
          <span>Reset</span>
        </button>
      </div>
    </QuizContext.Provider>
  );
}
