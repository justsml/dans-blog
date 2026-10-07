import { PostCollections } from "../../shared/postsCache";
import { isRoutablePost } from "../../shared/editorialRules";
export function GET() {
  return Response.json([
    { slug: "home" },
    { slug: "open-source-journal" },
    ...PostCollections._allPosts
      .filter(isRoutablePost)
      .map((post) => ({
        slug: post.slug,
        sourceDir: post.sourcePostId,
        locale: post.locale,
      })),
  ]);
}
