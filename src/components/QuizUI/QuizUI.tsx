import { useState } from "react";
import type { Answer } from "./types";
import { QuizContext } from "./QuizContext";

import "./QuizUI.css";

/**
 Usage Example
 ```tsx
 <QuizUI>
  <Challenge>
    <Question>
      What is 2+2?
    </Question>
    <Options>
      <Option hint="You ok?">NaN</Option>
      <Option>3</Option>
      <Option answer={true}>4</Option>
      <Option hint="Too much...">5</Option>
    </Options>
    <Hints>
      <Hint>Think about it</Hint>
      <Hint>It's a number</Hint>
    </Hints>
    <Explanation>
      4 - 2 = 2
    </Explanation>
  </Challenge>
  <Challenge>
    <Question>
      What is the capital of France?
    </Question>
    <Options>
      <Option hint="Not quite">Berlin</Option>
      <Option answer={true}>Paris</Option>
      <Option hint="Try again">Madrid</Option>
      <Option hint="Nope">Rome</Option>
    </Options>
    <Hints>
      <Hint>It's a famous city</Hint>
      <Hint>It's known for the Eiffel Tower</Hint>
    </Hints>
  </Challenge>
</QuizUI>
```
*/
export default function QuizUI({ children }: any) {
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);

  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  // useEffect(() => {
  //   const int = setInterval(() => {
  //     const questions = document.querySelectorAll("main .challenge");
  //     const correct = document.querySelectorAll("main .challenge.correct");
  //     setTotalQuestions(questions.length);
  //     setCorrectAnswers(correct.length);

  //   }, 1000);

  //   return () => {
  //     clearInterval(int);
  //   };
  // }, []);

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
        <div className="score-wrapper">
          Quiz Score:{" "}
          <label>
            {correctAnswers}/{totalQuestions}
          </label>
        </div>
      </div>
    </QuizContext.Provider>
  );
}
