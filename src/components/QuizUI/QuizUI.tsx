import { RefreshCcwIcon } from "lucide-react";
import "./index.css";
import "./icons.css";

export default function QuizUI({ children }: any) {

  return (
    <section className="full-section full-width">
      <div className="quiz-ui">{children}</div>

      <div className="score">
        <div className="congrats-message">
          <h3><a href="/challenges/">Congrats! Quiz completed.</a></h3>
        </div>
        <div className="score-wrapper">
          Quiz Score:{" "}
          <label></label>
        </div>
        <button className="btn reset-quiz">
          <RefreshCcwIcon width={22} height={22} style={{width: '1.25rem', height: '1.25rem' }} />
          <span>Reset</span>
        </button>
      </div>
    </section>
  );
}
