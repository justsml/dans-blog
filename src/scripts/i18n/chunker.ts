/**
 * Document chunking strategies for incremental translation.
 *
 * Supports:
 *   - Paragraph mode:  "1p", "6p"  (groups N paragraphs)
 *   - Sentence mode:   "1s", "5s"  (groups N sentences)
 *   - Token mode:      "500t", "1000t" (groups by ~N tokens)
 *
 * Code fences and block-level MDX components are treated as atomic
 * segments so they are never split in half.
 */

import { encode } from "gpt-tokenizer";

export type ChunkStrategy = { mode: "paragraph"; size: number } | { mode: "sentence"; size: number } | { mode: "token"; size: number };

export interface Segment {
  type: "text" | "code" | "mdx";
  content: string;
}

export interface Chunk {
  index: number;
  segments: Segment[];
  text: string;
  totalChunks?: number;
}

const CHUNK_PATTERN = /^(\d+)([pst])$/i;

export function parseChunkSize(input: string): ChunkStrategy {
  const match = input.trim().match(CHUNK_PATTERN);
  if (!match) {
    throw new Error(
      `Invalid chunk size "${input}". Use formats like "1p", "5s", or "1000t".`,
    );
  }
  const size = parseInt(match[1], 10);
  const mode = match[2].toLowerCase() as "p" | "s" | "t";
  if (size < 1) throw new Error(`Chunk size must be >= 1, got ${size}`);

  if (mode === "p") return { mode: "paragraph", size };
  if (mode === "s") return { mode: "sentence", size };
  return { mode: "token", size };
}

/**
 * Split raw MDX body into atomic segments.
 * Code fences and block-level MDX components are kept whole.
 */
export function extractSegments(body: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = body;

  // Matches:
  // 1. Code fence blocks (```...```)
  // 2. Block-level MDX components (<Component ...> ... </Component>)
  const pattern = /(```[\s\S]*?```)|(<[A-Z][a-zA-Z0-9]*\b[^>]*>[\s\S]*?<\/\2>)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // We need to handle the MDX component regex more carefully.
  // The backreference \2 won't work as intended in this pattern.
  // Let's use a simpler approach: scan line by line for code fences,
  // and use a separate heuristic for MDX components.

  return extractSegmentsHeuristic(body);
}

function extractSegmentsHeuristic(body: string): Segment[] {
  const lines = body.split("\n");
  const segments: Segment[] = [];
  let buffer: string[] = [];
  let inCodeFence = false;
  let codeFenceDelimiter = "";

  function flushBuffer(type: Segment["type"] = "text") {
    if (buffer.length === 0) return;
    const content = buffer.join("\n");
    segments.push({ type, content });
    buffer = [];
  }

  // Pre-scan to identify MDX component line ranges
  const mdxRanges: Array<{ start: number; end: number }> = [];
  let mdxStart = -1;
  let mdxName = "";
  let mdxDepth = 0;

  // Wrapper components that should not swallow their children.
  // Their open/close tags are emitted as text so inner components
  // (e.g. <Challenge>) remain atomic MDX segments.
  const WRAPPER_COMPONENTS = new Set(["QuizUI"]);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip lines inside code fences for MDX detection
    const fenceMatch = line.match(/^(\s*)(```+)\s*\w*\s*$/);
    if (fenceMatch) {
      if (mdxStart === -1) {
        // toggle code fence (we don't care about nested fences here)
        continue;
      }
    }

    if (mdxStart === -1) {
      // Look for component start: <Name or <Name ...
      const startMatch = line.match(/^\s*<([a-zA-Z][a-zA-Z0-9]*)(?:\s|>|$)/);
      if (startMatch) {
        mdxName = startMatch[1];

        // Skip wrapper components — emit their tags as text
        if (WRAPPER_COMPONENTS.has(mdxName)) {
          // Check if it's a one-line self-closing tag
          const hasSelfClose = /\/>\s*$/.test(line);
          if (hasSelfClose) {
            // One-line wrapper, treat as atomic MDX
            mdxRanges.push({ start: i, end: i });
          }
          // Otherwise just ignore the open/close tags and let inner
          // components be detected normally
          continue;
        }

        mdxStart = i;
        mdxDepth = 1;

        // Check if it's a one-line self-closing or inline closing
        const hasClose = new RegExp(`</${mdxName}>`).test(line);
        const hasSelfClose = />\s*$/.test(line) && /\/>\s*$/.test(line);
        if (hasClose || hasSelfClose) {
          mdxRanges.push({ start: mdxStart, end: i });
          mdxStart = -1;
          mdxName = "";
          mdxDepth = 0;
        }
      }
      continue;
    }

    // Inside a component block
    // Count same-component openings on this line
    const openRe = new RegExp(`<${mdxName}\\b`, "g");
    const closeRe = new RegExp(`</${mdxName}>`, "g");
    const opens = (line.match(openRe) || []).length;
    const closes = (line.match(closeRe) || []).length;
    mdxDepth += opens - closes;

    // Also detect self-close on this line for the same component
    const selfCloseRe = new RegExp(`<${mdxName}\\b[^>]*\\/>`);
    if (selfCloseRe.test(line)) {
      // A self-closing tag counts as both open and close
      mdxDepth -= 1; // already counted as open above
    }

    if (mdxDepth <= 0) {
      mdxRanges.push({ start: mdxStart, end: i });
      mdxStart = -1;
      mdxName = "";
      mdxDepth = 0;
    }
  }

  // If unclosed at end, treat as text
  if (mdxStart !== -1) {
    mdxRanges.push({ start: mdxStart, end: lines.length - 1 });
  }

  // Build a set of line indices that belong to MDX components
  const mdxLineSet = new Set<number>();
  for (const range of mdxRanges) {
    for (let i = range.start; i <= range.end; i++) {
      mdxLineSet.add(i);
    }
  }

  // Second pass: extract segments
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // MDX component lines take priority — keep code fences inside components
    // as part of the MDX segment so <Challenge> blocks stay atomic
    if (mdxLineSet.has(i)) {
      if (buffer.length > 0 && !mdxLineSet.has(i - 1)) {
        flushBuffer("text");
      }
      buffer.push(line);
      if (!mdxLineSet.has(i + 1)) {
        flushBuffer("mdx");
      }
      continue;
    }

    // Code fence detection (only outside MDX components)
    const fenceMatch = line.match(/^(\s*)(```+)(\s*\w*)\s*$/);
    if (fenceMatch) {
      if (!inCodeFence) {
        flushBuffer("text");
        inCodeFence = true;
        codeFenceDelimiter = fenceMatch[2];
        buffer.push(line);
      } else if (fenceMatch[2].startsWith(codeFenceDelimiter)) {
        buffer.push(line);
        flushBuffer("code");
        inCodeFence = false;
        codeFenceDelimiter = "";
      } else {
        buffer.push(line);
      }
      continue;
    }

    if (inCodeFence) {
      buffer.push(line);
      continue;
    }

    buffer.push(line);
  }

  flushBuffer("text");
  return segments;
}

/**
 * Group segments into chunks based on the selected strategy.
 */
export function chunkSegments(segments: Segment[], strategy: ChunkStrategy): Chunk[] {
  if (strategy.mode === "paragraph") {
    return chunkByParagraph(segments, strategy.size);
  }
  if (strategy.mode === "sentence") {
    return chunkBySentence(segments, strategy.size);
  }
  return chunkByToken(segments, strategy.size);
}

function chunkByParagraph(segments: Segment[], size: number): Chunk[] {
  // Flatten segments into paragraphs, keeping code/mdx atomic
  const paragraphs: Segment[] = [];

  for (const seg of segments) {
    if (seg.type !== "text") {
      paragraphs.push(seg);
      continue;
    }
    // Split text segments by blank lines
    const parts = seg.content.split(/\n\s*\n/);
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed) paragraphs.push({ type: "text", content: trimmed });
    }
  }

  const chunks: Chunk[] = [];
  let current: Segment[] = [];
  let count = 0;

  for (const para of paragraphs) {
    current.push(para);
    // Count both text paragraphs and MDX components toward the chunk limit.
    // This ensures quiz <Challenge> components each get their own chunk
    // when using paragraph mode.
    if (para.type === "text" || para.type === "mdx") count++;

    if (count >= size) {
      chunks.push(createChunk(chunks.length, current));
      current = [];
      count = 0;
    }
  }

  if (current.length > 0) {
    chunks.push(createChunk(chunks.length, current));
  }

  return chunks;
}

function chunkBySentence(segments: Segment[], size: number): Chunk[] {
  const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
  const chunks: Chunk[] = [];
  let current: Segment[] = [];
  let sentenceCount = 0;

  for (const seg of segments) {
    if (seg.type !== "text") {
      current.push(seg);
      continue;
    }

    const sentences = Array.from(segmenter.segment(seg.content)).map((s) => s.segment);
    let buffer = "";
    let localCount = 0;

    for (const sentence of sentences) {
      buffer += sentence;
      localCount++;

      if (localCount >= size) {
        if (buffer.trim()) current.push({ type: "text", content: buffer.trim() });
        chunks.push(createChunk(chunks.length, current));
        current = [];
        buffer = "";
        localCount = 0;
        sentenceCount = 0;
      }
    }

    if (buffer.trim()) {
      current.push({ type: "text", content: buffer.trim() });
      sentenceCount += localCount;
    }

    if (sentenceCount >= size) {
      chunks.push(createChunk(chunks.length, current));
      current = [];
      sentenceCount = 0;
    }
  }

  if (current.length > 0) {
    chunks.push(createChunk(chunks.length, current));
  }

  return chunks;
}

function chunkByToken(segments: Segment[], maxTokens: number): Chunk[] {
  const chunks: Chunk[] = [];
  let current: Segment[] = [];
  let currentTokens = 0;

  for (const seg of segments) {
    const segTokens = seg.type === "code" || seg.type === "mdx"
      ? encode(seg.content).length
      : encode(seg.content).length;

    // If a single segment exceeds maxTokens, we have to include it anyway
    if (currentTokens + segTokens > maxTokens && current.length > 0) {
      chunks.push(createChunk(chunks.length, current));
      current = [];
      currentTokens = 0;
    }

    current.push(seg);
    currentTokens += segTokens;
  }

  if (current.length > 0) {
    chunks.push(createChunk(chunks.length, current));
  }

  return chunks;
}

function createChunk(index: number, segments: Segment[]): Chunk {
  return {
    index,
    segments,
    text: segments.map((s) => s.content).join("\n\n"),
  };
}

/**
 * Reassemble translated chunks back into a single MDX body string.
 */
export function reassembleChunks(chunks: Chunk[]): string {
  return chunks.map((c) => c.text).join("\n\n");
}
