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

/** Hide JSX quiz props before checking Markdown and HTML prose. */
export function maskQuizAttributes(contents: string) {
  const tags = /<(Challenge)\b/g;
  let match: RegExpExecArray | null;
  let result = "";
  let previous = 0;
  while ((match = tags.exec(contents))) {
    let quote = "";
    let braces = 0;
    let end = tags.lastIndex;
    for (; end < contents.length; end++) {
      const char = contents[end];
      if (quote) {
        if (char === "\\") end++;
        else if (char === quote) quote = "";
      } else if (char === "\"" || char === "'" || char === "`") quote = char;
      else if (char === "{") braces++;
      else if (char === "}") braces--;
      else if (char === ">" && braces === 0) break;
    }
    if (end === contents.length) break;
    result += contents.slice(previous, tags.lastIndex)
      + contents.slice(tags.lastIndex, end).replace(/[^\n]/g, " ");
    previous = end;
    tags.lastIndex = end + 1;
  }
  return result + contents.slice(previous);
}
