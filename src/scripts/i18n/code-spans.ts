/** Mask inline Markdown code without swallowing later paragraphs or JSX blocks. */
export function maskInlineCodeSpans(contents: string): string {
  const chars = contents.split("");
  for (let start = 0; start < chars.length; start++) {
    if (chars[start] !== "`") continue;
    let escapes = 0;
    for (let i = start - 1; i >= 0 && chars[i] === "\\"; i--) escapes++;
    if (escapes % 2) continue;
    let length = 1;
    while (chars[start + length] === "`") length++;
    let found = -1;
    for (let end = start + length; end < chars.length; end++) {
      if (chars[end] === "\n") {
        let next = end + 1;
        while (chars[next] === " " || chars[next] === "\t") next++;
        if (chars[next] === "\n") break;
      }
      if (chars[end] !== "`") continue;
      let run = 1;
      while (chars[end + run] === "`") run++;
      if (run === length) { found = end + run; break; }
      end += run - 1;
    }
    if (found < 0) { start += length - 1; continue; }
    for (let i = start; i < found; i++) if (chars[i] !== "\n") chars[i] = " ";
    start = found - 1;
  }
  return chars.join("");
}
