import { InfoLabel } from "../components/ui/infoLabel";
import { slugify } from "../shared/pathHelpers";
import { CalendarIcon } from "./icons/CalendarIcon";
import type { ArticlePost } from "../types";
import { getComputedDates } from "../shared/dateUtils";

export const ArticleCard = ({
  article,
  width,
}: {
  article: ArticlePost;
  width?: number;
}) => {
  const slug = article.slug;
  const {
    title,
    subTitle,
    cover_mobile,
    date,
    modified,
    category,
    tags,
  } = article.data;


  const { createdAgo, modifiedAgo } = getComputedDates({date, modified});

  const icon = cover_mobile;
  // console.log(cover_icon);
  const image =
    typeof icon === "string" ? (
      <img src={icon} alt={title} width={width} height={width} />
    ) : (
      <img src={icon.src} alt={title} width={icon.width} height={icon.height} />
    );

  const categoryClass = `category-${slugify(category)}`;

  return (
    <a
      href={`/${slug}`}
      className={"article-card " + categoryClass}
      title={title}
      data-created={date}
      data-modified={modified}
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
