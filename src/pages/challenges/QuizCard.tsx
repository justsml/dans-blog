import clsx from "clsx";
import { InfoLabel } from "../../components/ui/infoLabel";
import { slugify } from "../../shared/pathHelpers";
import { getComputedDates } from "../../shared/dateUtils";
import type { QuizPost } from "../../types";
// import { brightColors } from "../../content/colors.ts";
import { useEffect } from "react";

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

  useEffect(() => {
    const prevUserData = localStorage.getItem(`quiz-${slug}`);
    if (prevUserData) {
      const userData = JSON.parse(prevUserData);
      console.log("🚀 ~ userData", userData);
    }
  }
  , [slug]);

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

  return (
    <div
      className={
        quizClass + " " + categoryClass + (className ? ` ${className}` : "")
      }
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
        <label
          className="small-label"
          title={tags && tags.join(", ")}
          dangerouslySetInnerHTML={{
            __html: `<strong>${subCategory}</strong>`,
          }}
        ></label>
        <h2 className="post-title">{title.replace("Quiz: ", "")}</h2>

        <p>{questionCount} questions</p>
        <InfoLabel
          text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
        />
      </a>
    </div>
  );
};
