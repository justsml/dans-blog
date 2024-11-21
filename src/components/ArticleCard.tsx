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
  'hx-url'?: string;
  'hx-trigger'?: string;
  'hx-swap'?: string;

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
  const { createdAgo, modifiedAgo } = getComputedDates({date, modified});

  const icon = cover_mobile;
  // console.log(cover_icon);
  const image =
    typeof icon === "string" ? (
      <img src={icon} alt={title} width={width} height={width} />
    ) : (
      icon && <img src={icon.src} alt={title} width={icon.width} height={icon.height} />
    );

  let categoryClass = `category-${slugify(category)}`;
  if (draft) {
    categoryClass += " draft";
  }

  const myClass = isTile ? "article-tile" : "article-card";

  return (
    <a
      style={{ viewTransitionName: `article-${slug}` }}
      href={`/${slug}/`}
      className={myClass + " " + categoryClass + (className ? ` ${className}` : "")}
      // title={(draft ? 'DRAFT: ' : '') + title}
      data-created={date}
      data-modified={modified}
      {...htmxArgs}
    >
      <label className="small-label" title={tags && tags.join(', ')} dangerouslySetInnerHTML={{
        __html: category + (category === "Quiz" ? `: <sup>${subCategory}</sup>` : ``)
      }}></label>
      {isTile ? <h4 className="post-title">{title}</h4> : <h2 className="post-title">{title}</h2>}
      {image}
      <p>{subTitle}</p>
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
      />
      
    </a>
  );
};
