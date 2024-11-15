import { RefreshCcwIcon } from "lucide-react";
import "./index.css";
import "./icons.css";

export default function QuizUI({ children }: any) {

  return (
    <section className="full-section full-width">
      <div className="quiz-ui">{children}</div>

      <div className="score">
        <button className="btn reset-quiz">
          <RefreshCcwIcon width={22} height={22} style={{width: '1.25rem', height: '1.25rem' }} />
          <span>Reset</span>
        </button>
        <div className="score-wrapper">
          Quiz Score:{" "}
          <label></label>
        </div>
        <div>
          <div className="congrats-message">
            <h3>Congrats! Quiz completed.</h3>
            <p><a href="/challenges/">View All Challenges</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
