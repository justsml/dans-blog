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
export {
  isPublishedPost,
  isPublishedPostData,
  isRoutablePost,
  isRoutablePostData,
  isVisiblePost,
  isVisiblePostData,
  normalizePostFlag,
  type PostVisibilityData,
} from "./editorialRules";
