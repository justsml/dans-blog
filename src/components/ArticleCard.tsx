import { InfoLabel } from "../components/ui/infoLabel";
import { slugify } from "../shared/pathHelpers";
import { getComputedDates } from "../shared/dateUtils";
import type { ArticlePost } from "../types";

export const ArticleCard = ({
  article,
  width,
  className,
  ...htmxArgs
}: {
  className?: string;
  article: ArticlePost;
  width?: number;
  "hx-url"?: string;
  "hx-trigger"?: string;
  "hx-swap"?: string;
}) => {
  // console.log('🚀 ~ article', article);
  const slug = article.slug;
  const {
    title,
    subTitle,
    draft,
    cover_mobile,
    date,
    modified,
    category,
    subCategory,
    tags,
  } = article.data;

  const isTile = className?.includes("tile");

  // console.log('🚀 htmxArgs', htmxArgs);
  const { createdAgo, modifiedAgo } = getComputedDates({ date, modified });

  const icon = cover_mobile;
  const popularity = article.data.popularity ?? 0;
  // console.log(cover_icon);
  const image =
    typeof icon === "string" ? (
      <img
        src={icon}
        alt={title}
        loading="lazy"
        decoding="async"
        width={width}
        height={width}
      />
    ) : (
      icon && (
        <img
          src={icon.src}
          alt={title}
          loading="lazy"
          decoding="async"
          width={icon.width}
          height={icon.height}
        />
      )
    );

  let categoryClass = `category-${slugify(category)}`;
  if (draft) {
    categoryClass += " draft";
  }

  const myClass = isTile ? "article-tile" : "article-card";
  const editorialClass =
    !isTile && popularity >= 0.95
      ? " article-card--feature article-card--popular"
      : !isTile && popularity >= 0.7
        ? " article-card--popular"
        : "";
  const viewTransitionName = `article-${`${slug}`.replace(/^\/*|\/*$/g, "")}`;

  return (
    <a
      href={`/${slug}/`}
      className={
        myClass +
        editorialClass +
        " " +
        categoryClass +
        (className ? ` ${className}` : "")
      }
      // title={(draft ? 'DRAFT: ' : '') + title}
      data-created={date}
      data-modified={modified}
      {...htmxArgs}
    >
      <span
        className="small-label"
        title={tags && tags.join(", ")}
        dangerouslySetInnerHTML={{
          __html:
            category +
            (category === "Quiz" ? `: <sup>${subCategory}</sup>` : ``),
        }}
      ></span>
      {isTile ? (
        <h4 style={{ viewTransitionName }} className="post-title">
          {title}
        </h4>
      ) : (
        <h2 style={{ viewTransitionName }} className="post-title">
          {title}
        </h2>
      )}
      <p dangerouslySetInnerHTML={{ __html: subTitle.replace(/`([^`]+)`/g, "<code>$1</code>") }} />
      {image && <span className="article-card__media">{image}</span>}
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
      />
    </a>
  );
};
