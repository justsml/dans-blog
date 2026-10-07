// Search snippets want ~120-155 characters; most subtitles are a short tagline. Pair the subtitle with the
// article's first prose paragraph so every post gets a full, unique description.

const SKIP_LINE = /^(import|export)\s|^\s*(<|\{|#|!\[|>|[-*+]\s|\d+\.\s|\||:::)/;

export function firstProseParagraph(body: string | undefined): string {
  if (!body) return "";
  const withoutFences = body.replace(/^(```|~~~)[\s\S]*?^\1\s*$/gm, "");
  for (const block of withoutFences.split(/\n\s*\n/)) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length || lines.some((line) => SKIP_LINE.test(line))) continue;
    const text = lines.join(" ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/(\*\*|__|\*|_|~~)(?=\S)([\s\S]*?\S)\1/g, "$2")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    // Skip stubs like "That was right." that read badly as a snippet on their own.
    if (text.length >= 40) return text;
  }
  return "";
}

export function postMetaDescription(subTitle: string | undefined, body: string | undefined): string {
  const lead = (subTitle ?? "").trim();
  const prose = firstProseParagraph(body);
  if (!prose || lead.length >= 120) return lead || prose;
  if (!lead) return prose;
  return `${lead}${/[.!?…]$/.test(lead) ? "" : "."} ${prose}`;
}
