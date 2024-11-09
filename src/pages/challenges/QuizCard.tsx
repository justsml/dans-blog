import clsx from "clsx";
import { InfoLabel } from "../../components/ui/infoLabel";
import { slugify } from "../../shared/pathHelpers";
import { getComputedDates } from "../../shared/dateUtils";
import type { QuizPost } from "../../types";
// import { brightColors } from "../../content/colors.ts";
import { useEffect, useRef } from "react";
import { QuestionStore } from "../../components/QuizUI/QuestionStore.ts";

export const QuizCard = ({
  article,
  width,
  className,
  subCategoryList,
  subCategoryCounts,
}: {
  className?: string;
  article: QuizPost;
  width?: number;
  subCategoryList: string[];
  subCategoryCounts: Record<string, number>;
}) => {
  // console.log('🚀 ~ article', article);
  const slug = article.slug;
  const {
    index: idx,
    title,
    subCategory,
    draft,
    // cover_mobile,
    date,
    modified,
    tags,
  } = article.data;
  // console.log('🚀 htmxArgs', htmxArgs);
  const { createdAgo, modifiedAgo } = getComputedDates({ date, modified });

  // Load prev user data

  // useEffect(() => {
  //   const prevUserData = localStorage.getItem(`quiz-${slug}`);
  //   if (prevUserData) {
  //     const userData = JSON.parse(prevUserData);
  //     // console.log("🚀 ~ userData", userData);
  //   }
  // }, [slug]);

  // const icon = cover_mobile;
  // // console.log(cover_icon);
  // const image =
  //   typeof icon === "string" ? (
  //     <img src={icon} alt={title} width={width} height={width} />
  //   ) : (
  //     icon && (
  //       <img
  //         src={icon.src}
  //         alt={title}
  //         width={icon.width}
  //         height={icon.height}
  //       />
  //     )
  //   );

  let categoryClass = `cat-${slugify(subCategory)}`;
  if (draft) {
    categoryClass += " draft";
  }

  const quizClass = "quiz-card";

  const questionCount = article.data.questionCount;

  // const boundingRef = useRef<DOMRect | null>(null);
  const counts: Record<string, number> = {}

  useEffect(() => {
    const qStore = QuestionStore(slug);
    console.log('🚀 ~ qStore', qStore.correct(), slug, qStore);
    counts.correct = qStore.correct();
    counts.total = qStore.total();
    counts.tries = qStore.sumOfTries();
  }, [slug, counts.correct, counts.total, counts.tries]);

  return (
    <div
      className={clsx(quizClass, categoryClass, className)}

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
        // style={{ "borderColor": categoryColor, borderWidth: "4px" }}
        // style={{ "--highlight-color": brightColors[Math.floor(idx % 8)] }}
        // title={(draft ? 'DRAFT: ' : '') + title}
        data-created={date}
        data-modified={modified}
      >
        <label className="small-label" title={tags && tags.join(", ")}>
          <b>{subCategory}</b>
        </label>
        <h2 className="post-title">{title.replace("Quiz: ", "")}</h2>

        <p title={'in ' + (counts['tries'] ?? 0) + ' tries'}>
          {counts['correct'] ?? 0} correct / {questionCount} questions
        </p>
        <p>
          {tags && tags.join(", ")}
        </p>
        <InfoLabel
          text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
        />
      </a>
    </div>
  );
};
