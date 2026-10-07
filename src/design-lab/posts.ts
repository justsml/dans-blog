import { PostCollections } from "../shared/postsCache";
import { getListedArchivePosts, sortArchivePosts } from "../shared/archivePagination";
import type { ArticlePost } from "../types";

export function getLabPosts() {
  return sortArchivePosts(
    getListedArchivePosts(PostCollections.getPostsForLocale("en") as ArticlePost[]),
    { field: "date", direction: "desc" },
  ).filter((post) => !post.data.hidden && !post.data.draft && post.data.publish !== false);
}

export const getLabSample = () => getLabPosts().slice(0, 9);
