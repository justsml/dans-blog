import { PostCollections } from "../shared/postsCache";
import { sortArchivePosts } from "../shared/archivePagination";
import type { ArticlePost } from "../types";

export function getLabPosts() {
  return sortArchivePosts(
    PostCollections.getPostsForLocale("en") as ArticlePost[],
    { field: "date", direction: "desc" },
  );
}

export const getLabSample = () => getLabPosts().slice(0, 9);
