import { describe, expect, test } from "bun:test";
import { getWidePosts } from "./pagination";

const post = (popularity?: number) => ({ data: { popularity } });
const batch = (scores: number[]) => scores.map((score) => post(score));

describe("getWidePosts", () => {
  test("widens every qualifying post, including the lead, without a batch limit", () => {
    const posts = batch([0.955, 1, 0.955, 0.91, 0.955, 0.8, 0.9, 0.955, 0.955]);
    expect([...getWidePosts(posts)]).toEqual([
      posts[0], posts[1], posts[2], posts[3], posts[4], posts[7], posts[8],
    ]);
  });

  test("requires a score strictly above 0.9", () => {
    expect(getWidePosts([post(), post(0), post(0.8), post(0.9)]).size).toBe(0);
  });
});
