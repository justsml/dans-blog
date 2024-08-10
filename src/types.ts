
export type ArticlePost = {
  slug: string;
  collection?: string;

  data: {
    title: string;
    subTitle: string;
    cover_icon: ImageMetadata;
    cover_mobile: ImageMetadata;
    date: string;
    modified: string;
    category: string;
    subCategory?: string;
    tags: string[];
  };
};
