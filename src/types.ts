
export type ArticlePost = {
  id: string;
  body?: string;
  slug: string;
  collection?: string;

  data: {
    title: string;
    subTitle: string;
    draft?: boolean;
    cover_icon: ImageMetadata;
    cover_mobile: ImageMetadata;
    date: string;
    modified: string;
    category: string;
    subCategory?: string;
    tags: string[];
  };
};
