/**
 * Structured quiz parser.
 *
 * Extracts quiz content from MDX into typed JSON so each Challenge
 * can be translated with precise field-level instructions.
 *
 * Structure:
 *   - intro: prose before <QuizUI>
 *   - challenges[]: structured Challenge components
 *   - outro: prose after </QuizUI>
 */

export interface QuizOption {
  text: string;
  hint?: string;
  isAnswer?: true;
}

export interface TextFragment {
  type: "prose" | "code";
  content: string;
  language?: string; // for code blocks
}

export interface QuizSlot {
  fragments: TextFragment[];
  raw: string;
}

export interface QuizChallenge {
  index: number;
  group: string;
  title: string;
  clientVisible: string;
  options: QuizOption[];
  question: QuizSlot;
  explanation: QuizSlot;
  raw: string;
}

export interface ParsedQuiz {
  intro: string;
  challenges: QuizChallenge[];
  outro: string;
}

/**
 * Parse raw MDX body into structured quiz data.
 */
export function parseQuiz(body: string): ParsedQuiz {
  const lines = body.split("\n");

  let quizStart = -1;
  let quizEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "<QuizUI>") quizStart = i;
    if (lines[i].trim() === "</QuizUI>") quizEnd = i;
  }

  if (quizStart === -1 || quizEnd === -1) {
    throw new Error("Could not find <QuizUI> or </QuizUI> tags");
  }

  const intro = lines.slice(0, quizStart).join("\n").trim();
  const outro = lines.slice(quizEnd + 1).join("\n").trim();

  const challengeBlocks: string[] = [];
  let currentBlock: string[] = [];
  let inChallenge = false;
  let challengeDepth = 0;

  for (let i = quizStart + 1; i < quizEnd; i++) {
    const line = lines[i];

    if (line.match(/^\s*<Challenge\b/)) {
      inChallenge = true;
      challengeDepth = 1;
      currentBlock = [line];
      continue;
    }

    if (inChallenge) {
      currentBlock.push(line);
      const opens = (line.match(/<Challenge\b/g) || []).length;
      const closes = (line.match(/<\/Challenge>/g) || []).length;
      challengeDepth += opens - closes;

      if (challengeDepth <= 0) {
        challengeBlocks.push(currentBlock.join("\n"));
        inChallenge = false;
        challengeDepth = 0;
        currentBlock = [];
      }
    }
  }

  const challenges = challengeBlocks.map((block, idx) =>
    parseChallengeBlock(block, idx),
  );

  return { intro, challenges, outro };
}

function parseChallengeBlock(raw: string, fallbackIndex: number): QuizChallenge {
  const openTagMatch = raw.match(/<Challenge\s+([^>]*)>/s);
  if (!openTagMatch) throw new Error("Could not parse Challenge opening tag");

  const propsText = openTagMatch[1];

  const indexMatch = propsText.match(/index=\{(\d+)\}/);
  const index = indexMatch ? parseInt(indexMatch[1], 10) : fallbackIndex;

  const groupMatch = propsText.match(/group="([^"]*)"/);
  const group = groupMatch ? groupMatch[1] : "";

  const titleMatch = propsText.match(/title="([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : "";

  const clientDirectiveMatch = propsText.match(
    /\b(client:[A-Za-z-]+=(?:"[^"]*"|\{\{[\s\S]*?\}\}|\{[\s\S]*?\}))/,
  );
  const clientVisible = clientDirectiveMatch ? clientDirectiveMatch[1] : "";

  const options = parseOptions(propsText);
  const question = parseSlot(raw, "question");
  const explanation = parseSlot(raw, "explanation");

  return { index, group, title, clientVisible, options, question, explanation, raw };
}

function parseOptions(propsText: string): QuizOption[] {
  const optionsMatch = propsText.match(/options=\{\[([\s\S]*?)\]\}/);
  if (!optionsMatch) return [];

  const optionsText = optionsMatch[1];
  const options: QuizOption[] = [];

  // Match each option object with optional hint and isAnswer
  const optionRegex = /\{[\s\S]*?text:\s*(["'\x60])(.*?)\1[\s\S]*?\}/gs;
  let match: RegExpExecArray | null;

  while ((match = optionRegex.exec(optionsText)) !== null) {
    const fullOption = match[0];
    const text = match[2];
    const isAnswer = fullOption.includes("isAnswer: true");

    // Extract hint if present
    const hintMatch = fullOption.match(/hint:\s*(['"`])(.*?)\1/);
    const hint = hintMatch ? hintMatch[2] : undefined;

    const opt: QuizOption = { text };
    if (isAnswer) opt.isAnswer = true;
    if (hint) opt.hint = hint;
    options.push(opt);
  }

  return options;
}

function parseSlot(raw: string, slotName: string): QuizSlot {
  const slotRegex = new RegExp(
    `<slot\\s+name=['"]${slotName}['"]>([\\s\\S]*?)<\\/slot>`,
    "s",
  );
  const match = raw.match(slotRegex);
  if (!match) return { fragments: [], raw: "" };

  const slotContent = unwrapSlotContainer(match[1].trim(), slotName);
  const fragments = parseSlotFragments(slotContent);
  return { fragments, raw: slotContent };
}

function unwrapSlotContainer(content: string, slotName: string): string {
  const className = slotName === "question" ? "question" : "explanation";
  const lines = content.split("\n");
  const firstContentLine = lines.findIndex((line) => line.trim() !== "");
  const lastContentLine = lines.findLastIndex((line) => line.trim() !== "");

  if (firstContentLine === -1 || lastContentLine === -1) return content;

  const first = lines[firstContentLine].trim();
  const last = lines[lastContentLine].trim();

  if (first !== `<div className="${className}">` || last !== "</div>") {
    return content;
  }

  return lines.slice(firstContentLine + 1, lastContentLine).join("\n").trim();
}

function parseSlotFragments(content: string): TextFragment[] {
  const fragments: TextFragment[] = [];
  const lines = content.split("\n");
  let proseBuffer: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";

  function flushProse() {
    if (proseBuffer.length === 0) return;
    const text = proseBuffer.join("\n").trim();
    if (text) fragments.push({ type: "prose", content: text });
    proseBuffer = [];
  }

  function flushCode() {
    if (codeBuffer.length === 0) return;
    fragments.push({ type: "code", content: codeBuffer.join("\n"), language: codeLanguage });
    codeBuffer = [];
    codeLanguage = "";
  }

  for (const line of lines) {
    const fenceMatch = line.match(/^(\s*)```+(\w*)\s*$/);

    if (fenceMatch) {
      if (!inCodeBlock) {
        flushProse();
        inCodeBlock = true;
        codeLanguage = fenceMatch[2];
      } else {
        flushCode();
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    proseBuffer.push(line);
  }

  flushProse();
  flushCode();
  return fragments;
}

/** Flatten a slot's fragments into translatable prose strings and preserved code blocks. */
export function slotToTranslatable(slot: QuizSlot): { prose: string[]; codeBlocks: Array<{ language: string; code: string }> } {
  const prose: string[] = [];
  const codeBlocks: Array<{ language: string; code: string }> = [];

  for (const frag of slot.fragments) {
    if (frag.type === "prose") prose.push(frag.content);
    else if (frag.type === "code") codeBlocks.push({ language: frag.language || "", code: frag.content });
  }

  return { prose, codeBlocks };
}

/** Build a slot back from translated prose + original code blocks. */
export function slotFromTranslatable(
  originalSlot: QuizSlot,
  translatedProse: string[],
): QuizSlot {
  const fragments: TextFragment[] = [];
  let proseIdx = 0;

  for (const frag of originalSlot.fragments) {
    if (frag.type === "prose") {
      const translated = normalizeMarkdownIndentation(translatedProse[proseIdx] ?? frag.content);
      proseIdx++;
      fragments.push({ type: "prose", content: translated });
    } else {
      fragments.push(frag);
    }
  }

  return { fragments, raw: "" };
}

/** Reassemble a translated quiz back into MDX. */
export function assembleQuiz(quiz: ParsedQuiz): string {
  const parts: string[] = [];
  if (quiz.intro) { parts.push(quiz.intro); parts.push(""); }
  parts.push("<QuizUI>"); parts.push("");
  for (const challenge of quiz.challenges) {
    parts.push(assembleChallenge(challenge));
    parts.push("");
  }
  parts.push("</QuizUI>");
  if (quiz.outro) { parts.push(""); parts.push(quiz.outro); }
  return parts.join("\n");
}

function assembleChallenge(challenge: QuizChallenge): string {
  const lines: string[] = [];
  lines.push(`<Challenge`);
  if (challenge.clientVisible) {
    lines.push(`  ${challenge.clientVisible}`);
  }
  lines.push(`  index={${challenge.index}}`);
  lines.push(`  group="${escapeQuotes(challenge.group)}"`);
  lines.push(`  title="${escapeQuotes(challenge.title)}"`);

  lines.push(`  options={[`);
  for (const opt of challenge.options) {
    const parts: string[] = [`text: '${escapeSingleQuotes(opt.text)}'`];
    if (opt.isAnswer) parts.push("isAnswer: true");
    if (opt.hint) parts.push(`hint: '${escapeSingleQuotes(opt.hint)}'`);
    lines.push(`    {${parts.join(", ")}},`);
  }
  lines.push(`  ]}`);
  lines.push(`>`);

  lines.push(`  <slot name="question">`);
  lines.push(`  <div className="question">`);
  lines.push(...assembleSlotLines(challenge.question));
  lines.push(`  </div>`);
  lines.push(`  </slot>`);

  lines.push(`  <slot name='explanation'>`);
  lines.push(`  <div className="explanation">`);
  lines.push(...assembleSlotLines(challenge.explanation));
  lines.push(`  </div>`);
  lines.push(`  </slot>`);
  lines.push(`</Challenge>`);

  return lines.join("\n");
}

function assembleSlotLines(slot: QuizSlot): string[] {
  const lines: string[] = [];
  for (const frag of slot.fragments) {
    if (frag.type === "prose") {
      lines.push(...indentSlotContent(normalizeMarkdownIndentation(frag.content)));
    } else if (frag.type === "code") {
      const code = normalizeCodeContent(frag.content);
      lines.push(`    \`\`\`${frag.language || ""}`);
      if (code) lines.push(...indentSlotContent(code));
      lines.push("    ```");
    }
  }
  return lines;
}

function indentSlotContent(content: string): string[] {
  if (!content) return [];
  return content.split("\n").map((line) => (
    line.trim() === "" ? line : `    ${line}`
  ));
}

export function normalizeMarkdownIndentation(content: string): string {
  const lines = content
    .replace(/\r\n?/g, "\n")
    .split("\n");

  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^[ \t]*/)?.[0] ?? "")
    .filter((indent) => indent.length > 0);
  const commonIndent = indents.reduce(
    (common, indent) => commonPrefix(common, indent),
    indents[0] ?? "",
  );

  const dedented = commonIndent
    ? lines.map((line) => line.startsWith(commonIndent) ? line.slice(commonIndent.length) : line)
    : lines;

  return dedented
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");
}

function commonPrefix(a: string, b: string) {
  let index = 0;
  while (index < a.length && index < b.length && a[index] === b[index]) {
    index++;
  }
  return a.slice(0, index);
}

function normalizeCodeContent(content: string): string {
  let lines = content.split("\n");

  while (
    lines.length >= 2
    && /^\s*```[\w-]*\s*$/.test(lines[0] ?? "")
    && /^\s*```\s*$/.test(lines[lines.length - 1] ?? "")
  ) {
    lines = lines.slice(1, -1);
  }

  return lines.join("\n").replace(/^\n+|\n+$/g, "");
}

function escapeQuotes(str: string): string {
  return str.replace(/"/g, '\\"');
}
function escapeSingleQuotes(str: string): string {
  return str.replace(/'/g, "\\'");
}
