import { describe, expect, test } from "bun:test";
import { getWidePosts } from "./pagination";

const post = (popularity?: number) => ({ data: { popularity } });
const batch = (scores: number[]) => scores.map((score) => post(score));

describe("getWidePosts", () => {
  test("widens just enough popular posts to fill whole rows of three", () => {
    const posts = batch([0.8, 1, 0.85, 0.9, 0.8, 0.8, 0.8, 0.8]);
    expect([...getWidePosts(posts)]).toEqual([posts[1]]);
    expect(getWidePosts(batch([0.8, 0.9, 0.8, 0.8, 0.8, 0.8, 0.8])).size).toBe(2);
    expect(getWidePosts(batch(Array(9).fill(0.8))).size).toBe(3);
  });

  test("keeps date order for ties and skips the featured card", () => {
    const posts = batch([1, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8]);
    expect([...getWidePosts(posts, 1)]).toEqual([posts[1]]);
  });

  test("never widens unscored posts", () => {
    expect(getWidePosts([post(), post(0)]).size).toBe(0);
  });
});
