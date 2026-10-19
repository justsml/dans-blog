import { PostCollections } from "../../shared/postsCache";
import { isPublishedPost } from "../../shared/editorialRules";
export function GET() {
  return Response.json([
    { slug: "home" },
    { slug: "open-source-journal" },
    ...PostCollections._allPosts
      .filter(isPublishedPost)
      .map((post) => ({
        slug: post.slug,
        sourceDir: post.sourcePostId,
        locale: post.locale,
      })),
  ]);
}
