import { InfoLabel } from "../components/ui/infoLabel";
import { slugify } from "../shared/pathHelpers";
import { CalendarIcon } from "./icons/CalendarIcon";
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
    tags,
  } = article.data;


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

  return (
    <a
      href={`/${slug}/`}
      className={"article-card " + categoryClass + (className ? ` ${className}` : "")}
      title={(draft ? 'DRAFT: ' : '') + title}
      data-created={date}
      data-modified={modified}
      {...htmxArgs}
    >
      <label className="small-label" title={tags && tags.join(', ')}>{category}</label>
      <h2>{title}</h2>
      {image}
      <p>{subTitle}</p>
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
      >
        <CalendarIcon className="icon" width={20} height={20} strokeWidth={1} />
      </InfoLabel>
    </a>
  );
};
