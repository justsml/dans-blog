import clsx from "clsx";
import { slugify } from "../../shared/pathHelpers";
import type { QuizPost } from "../../types";
import { useEffect, useState } from "react";
import { QuestionStore } from "../../components/QuizUI/QuestionStore.ts";

export const QuizCard = ({
  article,
  className,
}: {
  className?: string;
  article: QuizPost;
}) => {
  // console.log('🚀 ~ article', article);
  const slug = article.slug;
  const {
    index: idx,
    title,
    subCategory,
    label,
    draft,
    date,
    modified,
    tags,
  } = article.data;
  // console.log('🚀 htmxArgs', htmxArgs);
  // const { createdAgo, modifiedAgo } = getComputedDates({ date, modified });
  const [countCorrect, setCountCorrect] = useState(0);
  const [countTotal, setCountTotal] = useState(0);
  const [countTries, setCountTries] = useState(0);

  let categoryClass = `cat-${slugify(subCategory)}`;
  if (draft) {
    categoryClass += " draft";
  }

  const quizClass = "quiz-card";

  const questionCount = article.data.questionCount ?? countTotal;

  useEffect(() => {
    const qStore = QuestionStore(slug);
    setCountCorrect(qStore.correct());
    setCountTotal(qStore.total());
    setCountTries(qStore.sumOfTries());
  }, [slug, countCorrect]);

  const allCorrect = countCorrect === questionCount;

  // console.log("QuizCard %o", { countCorrect, countTotal, countTries, questionCount });

  const ratioCompleted = countCorrect / questionCount;
  const isStarted = countTries > 0 || countCorrect > 0;

  return (
    <div
      style={{
        "--quiz-index": idx,
        "--percent-completed": Number.isNaN(ratioCompleted)
          ? 0
          : ratioCompleted,
      }}
      className={clsx(quizClass, categoryClass, className, {
        completed: allCorrect,
        started: isStarted,
      })}

      // onMouseLeave={() => (boundingRef.current = null)}
      // onMouseEnter={(ev) => {
      //   boundingRef.current = ev.currentTarget.getBoundingClientRect();
      // }}
      // onMouseMove={(ev) => {
      //   if (!boundingRef.current) return;
      //   const x = ev.clientX - boundingRef.current.left;
      //   const y = ev.clientY - boundingRef.current.top;
      //   const xPercentage = x / boundingRef.current.width;
      //   const yPercentage = y / boundingRef.current.height;
      //   const xRotation = (xPercentage - 0.5) * 20;
      //   const yRotation = (0.5 - yPercentage) * 20;

      //   ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
      //   ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
      //   ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
      //   ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
      // }}
    >
      <a
        href={`/${slug}/`}
        className="quiz-card-inner"
        data-created={date}
        data-modified={modified}
      >
        <label className="small-label" title={tags && tags.join(", ")}>
          <b>{subCategory}</b>
        </label>
        <h2
          className="post-title"
          aria-description={title.replace("Quiz: ", "")}
        >
          {label}
        </h2>

        {allCorrect ? (
          <div className="quiz-status">
            <span className="status-icon">✅&#160;</span>
            <span className="status-text">&#160;Completed</span>
          </div>
        ) : isStarted ? (
          <p title={"in " + (countTries ?? 0) + " tries"}>
            {(countCorrect ?? 0) < 1 ? "Zero" : countCorrect} correct of{" "}
            {questionCount}
          </p>
        ) : (
          <p>{questionCount} questions - click to begin!</p>
        )}
        {/* <p>{tags && tags.join(", ")}</p> */}
        {/* <InfoLabel
          text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
        /> */}
      </a>
    </div>
  );
};
