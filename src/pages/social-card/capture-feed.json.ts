import { PostCollections } from "../../shared/postsCache";
import { isRoutablePost } from "../../shared/editorialRules";

// Include legacy draft-labelled posts that still have public routes. Private
// drafts (hidden or unpublished) never enter this capture inventory.
export function GET() {
  return Response.json({
    items: [
      ...PostCollections.getFeedItems().filter(
        (item) => item.slug === "open-source-journal",
      ),
      ...PostCollections._posts.filter(isRoutablePost).map((post) => ({
        sourcePath: post.id,
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.subTitle,
        categories: [post.data.category],
        category: post.data.category,
        questionCount:
          post.data.category === "Quiz"
            ? (post.body?.match(/<Challenge\b/g)?.length ?? 0)
            : undefined,
        slug: post.slug,
        link: `/${post.slug}/`,
      })),
    ],
  });
}
