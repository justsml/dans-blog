export type PostVisibilityData = {
  publish?: boolean | number | string | null;
  hidden?: boolean | number | string | null;
  unlisted?: boolean | number | string | null;
  draft?: boolean | number | string | null;
};

type PostWithData<TData extends PostVisibilityData = PostVisibilityData> = {
  data?: TData | null;
};

export const isPublishedPostData = (
  data?: PostVisibilityData | null,
) => normalizePostFlag(data?.publish) !== false;

export const isVisiblePostData = (
  data?: PostVisibilityData | null,
) => isPublishedPostData(data) && normalizePostFlag(data?.hidden) !== true;

export const isRoutablePostData = (
  data?: PostVisibilityData | null,
) =>
  isVisiblePostData(data) &&
  normalizePostFlag(data?.unlisted) !== true &&
  normalizePostFlag(data?.draft) !== true;

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
