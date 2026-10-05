import { isRoutablePostData, type PostVisibilityData } from "./editorialRules";

type BuildEnvironment = Record<string, string | undefined>;

/** Netlify sets CONTEXT for every build, including draft pull requests. */
export function isContentPreviewBuild(env: BuildEnvironment = process.env) {
  if (env.CONTEXT === "production") return false;
  return env.CONTEXT === "deploy-preview" || env.BLOG_CONTENT_PREVIEW === "1";
}

export function isPostRoutableInBuild(
  post: { data?: PostVisibilityData | null },
  preview = isContentPreviewBuild(),
) {
  return preview || isRoutablePostData(post.data);
}
