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
    </section>
  );
}
