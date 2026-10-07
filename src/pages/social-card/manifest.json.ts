import { PostCollections } from "../../shared/postsCache";
import { isVisiblePost } from "../../shared/editorialRules";
export function GET() {
  return Response.json([
    { slug: "home" },
    { slug: "open-source-journal" },
    ...PostCollections._allPosts
      .filter(isVisiblePost)
      .map((post) => ({
        slug: post.slug,
        sourceDir: post.sourcePostId,
        locale: post.locale,
      })),
  ]);
}
