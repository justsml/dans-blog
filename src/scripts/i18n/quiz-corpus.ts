import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ACTIVE_LOCALES, type Locale } from "../../shared/i18n";
import { collectSourcePosts } from "./corpus-inventory";
import { parseQuiz, type ParsedQuiz } from "./quiz-parser";

export interface QuizCorpusEntry {
  slug: string;
  locale: Locale;
  path: string;
  route: string;
  source: ParsedQuiz;
  quiz: ParsedQuiz;
}

function readQuiz(path: string): ParsedQuiz {
  try { return parseQuiz(readFileSync(path, "utf8")); }
  catch (cause) { throw new Error(`Unable to parse ${path}`, { cause }); }
}

/** Fail on a missing locale instead of silently reducing translation coverage. */
export function loadQuizCorpus(repoRoot = process.cwd()): QuizCorpusEntry[] {
  return collectSourcePosts({ repoRoot }).flatMap((post) => {
    const contents = readFileSync(post.path, "utf8");
    if (!/<Challenge\b/.test(contents)) return [];
    const source = parseQuiz(contents);
    return (["en", ...ACTIVE_LOCALES] as const).map((locale) => {
      const path = locale === "en" ? post.path : join(post.postDir, locale, "index.mdx");
      if (!existsSync(path)) throw new Error(`Missing quiz translation: ${path}`);
      return {
        slug: post.slug, locale, path,
        route: `/${locale === "en" ? "" : `${locale}/`}${post.slug}/`,
        source, quiz: locale === "en" ? source : readQuiz(path),
      };
    });
  });
}
