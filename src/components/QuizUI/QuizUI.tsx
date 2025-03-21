import { ListTodoIcon, RefreshCcwIcon } from "lucide-react";
import "./index.css";
import "./icons.css";
import React from "react";

export default function QuizUI({ children }: any) {
  return (
    <section className="full-section full-width"
      style={{
        "--ec-codePadInl": "0.75rem",
      }}>
      <div className="quiz-ui">{children}</div>

      <div className="score screenshot-hidden">
        <button className="btn reset-quiz">
          <RefreshCcwIcon className="icon" />
          <span>Reset</span>
        </button>
        <div className="score-wrapper">
          <span>Quiz Score: </span>
          <label></label>
        </div>
        <div className="congrats-message">
          <h3>Congrats! Quiz completed.</h3>
        </div>
        <div className="view-all-link">
          <a href="/challenges/" className="btn-view-all">
            <ListTodoIcon className="icon" />
            <span>All Quizzes</span>
          </a>
        </div>
      </div>
    </section>
  );
}
