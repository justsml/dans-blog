const WORDS_PER_MINUTE = 225;

/** Estimate reading time from Markdown/MDX source without a runtime dependency. */
export function getReadingTimeMinutes(source?: string): number {
  if (!source) return 1;

  const readableText = source
    .replace(/^---[\s\S]*?---/u, " ")
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/[{}#*_>`~|-]/gu, " ");

  const words = readableText.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
