export type ArticleHeading = { depth: number; slug: string; text: string };
export type TocSection = ArticleHeading & { children: ArticleHeading[] };

export function getTocSections(headings: ArticleHeading[]): TocSection[] {
  const sections: TocSection[] = [];
  for (const heading of headings) {
    if (heading.depth === 2) sections.push({ ...heading, children: [] });
    else if (heading.depth === 3) sections.at(-1)?.children.push(heading);
  }
  return sections;
}

export function shouldShowToc(readingTimeMinutes: number, sections: TocSection[]): boolean {
  return readingTimeMinutes >= 8 && sections.length >= 4;
}
