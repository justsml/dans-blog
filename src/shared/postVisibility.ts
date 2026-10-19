/**
 * Editorial visibility model:
 *
 * - Published: omit `draft` or set draft:false.
 * - Draft: set draft:true. Drafts are built only for content previews (where
 *   they also appear on the home page); production builds skip them entirely,
 *   so they never reach lists, feeds, search, or the sitemap.
 */
export {
  isDraftPost,
  isDraftPostData,
  isPublishedPost,
  isPublishedPostData,
  normalizePostFlag,
  type PostVisibilityData,
} from "./editorialRules";
