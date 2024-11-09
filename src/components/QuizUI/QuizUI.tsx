import { RefreshCcwIcon } from "lucide-react";
import "./index.css";
import "./icons.css";

export default function QuizUI({ children }: any) {

  return (
    <section>
      <div className="quiz-ui">{children}</div>

      <div className="score">
        <div className="congrats-message">
          <h3>Congrats! Quiz completed.</h3>
        </div>
        <div className="score-wrapper">
          Quiz Score:{" "}
          <label></label>
        </div>
        <button className="btn reset-quiz">
          <RefreshCcwIcon width={32} height={32} />
          <span>Reset</span>
        </button>
      </div>
    </section>
  );
}
