import { expect, test } from "bun:test";
import { getTocSections, shouldShowToc } from "./articleHeadings";

test("ToC uses rendered anchors and groups only h3 under the preceding h2", () => {
  expect(getTocSections([
    { depth: 1, slug: "title", text: "Title" },
    { depth: 3, slug: "orphan", text: "Orphan" },
    { depth: 2, slug: "検索", text: "検索" },
    { depth: 3, slug: "検索-1", text: "検索" },
    { depth: 4, slug: "detail", text: "Detail" },
    { depth: 2, slug: "end", text: "End" },
  ])).toEqual([
    { depth: 2, slug: "検索", text: "検索", children: [{ depth: 3, slug: "検索-1", text: "検索" }] },
    { depth: 2, slug: "end", text: "End", children: [] },
  ]);
});

test("ToC requires both enough reading time and enough main sections", () => {
  const sections = getTocSections(Array.from({ length: 4 }, (_, index) => ({ depth: 2, slug: `${index}`, text: `${index}` })));
  expect(shouldShowToc(8, sections)).toBe(true);
  expect(shouldShowToc(7, sections)).toBe(false);
  expect(shouldShowToc(8, sections.slice(1))).toBe(false);
});
