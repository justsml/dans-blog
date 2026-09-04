import { slugify } from "../shared/pathHelpers";
import { getReadingTimeMinutes } from "../shared/readingTime";
import type { ArticlePost } from "../types";
import { DEFAULT_LOCALE, getLocalizedPostPath, type Locale } from "../shared/i18n";
import "./ArticleCard.css";

export const ArticleCard = ({
  article,
  width,
  locale = DEFAULT_LOCALE,
  className,
  ...htmxArgs
}: {
  className?: string;
  article: ArticlePost;
  width?: number;
  locale?: Locale;
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
  const readingTimeMinutes = getReadingTimeMinutes(article.body);
  const publishedDate = date ? new Date(date) : undefined;
  const dateLabel = publishedDate?.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
  const hrefLocale = article.locale === locale ? locale : DEFAULT_LOCALE;

  return (
    <a
      href={getLocalizedPostPath(article.baseSlug ?? slug, hrefLocale)}
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
      <span className="article-card__meta" title={tags && tags.join(", ")}>
        {publishedDate && <time dateTime={publishedDate.toISOString()}>{dateLabel}</time>}
        <span>{readingTimeMinutes} min read</span>
        <span className="article-card__category">
          <span className="article-card__category-label">Category</span> {category}
          {category === "Quiz" && subCategory ? `: ${subCategory}` : ""}
        </span>
      </span>
    </a>
  );
};
