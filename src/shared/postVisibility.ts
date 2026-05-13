export type PostVisibilityData = {
  publish?: boolean | number | string | null;
  hidden?: boolean | number | string | null;
  unlisted?: boolean | number | string | null;
  draft?: boolean | number | string | null;
};

/**
 * Editorial visibility model:
 *
 * - Published/indexed: omit these flags or set publish:true.
 * - Unlisted: set unlisted:true for URL-accessible posts hidden from lists.
 * - Draft: set draft:true. Drafts remain directly routable and render with a
 *   notice, but are omitted from lists and feeds.
 * - Private/hidden: set publish:false and/or hidden:true.
 * - Archived/legacy-but-routable: keep publish:true and add historical framing
 *   in the post body instead of using hidden/draft flags.
 */
type PostWithData<TData extends PostVisibilityData = PostVisibilityData> = {
  data?: TData | null;
};

export const isPublishedPostData = (
  data?: PostVisibilityData | null,
) => normalizePostFlag(data?.publish) !== false;

export const isVisiblePostData = (
  data?: PostVisibilityData | null,
) =>
  isPublishedPostData(data) &&
  normalizePostFlag(data?.hidden) !== true &&
  normalizePostFlag(data?.draft) !== true;

export const isRoutablePostData = (
  data?: PostVisibilityData | null,
) =>
  isPublishedPostData(data) &&
  normalizePostFlag(data?.hidden) !== true;

export const isPublishedPost = <TPost extends PostWithData>(post?: TPost | null) =>
  isPublishedPostData(post?.data);

export const isVisiblePost = <TPost extends PostWithData>(post?: TPost | null) =>
  isVisiblePostData(post?.data);

export const isRoutablePost = <TPost extends PostWithData>(post?: TPost | null) =>
  isRoutablePostData(post?.data);

function normalizePostFlag(
  value?: boolean | number | string | null,
): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) return true;
    if (["false", "0", "no", "off", ""].includes(normalized)) return false;
  }
  return undefined;
}
