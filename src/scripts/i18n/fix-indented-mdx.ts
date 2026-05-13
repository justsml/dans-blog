#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type FixResult = {
  blockCount: number;
  changedLineCount: number;
  output: string;
};

const args = process.argv.slice(2);
const write = args.includes("--write");
const check = args.includes("--check");
const help = args.includes("--help") || args.includes("-h");
const targets = args.filter((arg) => !arg.startsWith("--"));

if (help) {
  console.log(`Usage: bun src/scripts/i18n/fix-indented-mdx.ts [--write|--check] [file-or-dir ...]

Indents Markdown content inside quiz slot containers:
  <div className="question">
  <div className="explanation">

By default this is a dry run. Pass --write to update files, or --check to fail
when files would change. If no target is passed, scans src/content/posts.`);
  process.exit(0);
}

const targetPaths = targets.length > 0 ? targets : ["src/content/posts"];
const files = targetPaths.flatMap(collectMdxFiles).sort();

let changedFiles = 0;
let changedLines = 0;
let changedBlocks = 0;

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const result = fixIndentedMdx(source);

  if (result.output === source) continue;

  changedFiles += 1;
  changedLines += result.changedLineCount;
  changedBlocks += result.blockCount;

  if (write) {
    writeFileSync(file, result.output);
  }

  console.log(
    `${write ? "fixed" : "would fix"} ${file} (${result.changedLineCount} lines in ${result.blockCount} blocks)`,
  );
}

const mode = write ? "updated" : "would update";
console.log(`${mode} ${changedFiles} file(s), ${changedLines} line(s), ${changedBlocks} block(s)`);

if (check && changedFiles > 0) {
  process.exit(1);
}

function collectMdxFiles(target: string): string[] {
  if (!existsSync(target)) {
    throw new Error(`Path does not exist: ${target}`);
  }

  const stats = statSync(target);
  if (stats.isFile()) {
    return target.endsWith(".mdx") ? [target] : [];
  }

  if (!stats.isDirectory()) return [];

  const files: string[] = [];
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "dist") {
      continue;
    }

    const child = join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMdxFiles(child));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(child);
    }
  }

  return files;
}

function fixIndentedMdx(source: string): FixResult {
  const hasTrailingNewline = source.endsWith("\n");
  const lines = source.split("\n");
  if (hasTrailingNewline) lines.pop();

  let inTargetDiv = false;
  let inTargetFence = false;
  let blockHadChange = false;
  let blockCount = 0;
  let changedLineCount = 0;
  let targetBlockLines: string[] = [];
  const output: string[] = [];

  const flushTargetBlock = () => {
    const fixedLines = fixTargetBlock(targetBlockLines);
    fixedLines.forEach((fixedLine, index) => {
      if (fixedLine !== targetBlockLines[index]) {
        blockHadChange = true;
        changedLineCount += 1;
      }
    });
    output.push(...fixedLines);
    targetBlockLines = [];
  };

  for (const line of lines) {
    if (!inTargetDiv && /^\s*<div className=(["'])(question|explanation)\1>\s*$/.test(line)) {
      inTargetDiv = true;
      inTargetFence = false;
      blockHadChange = false;
      output.push(line);
      continue;
    }

    if (!inTargetDiv) {
      output.push(line);
      continue;
    }

    if (!inTargetFence && line.trim() === "</div>") {
      flushTargetBlock();
      inTargetDiv = false;
      inTargetFence = false;
      if (blockHadChange) blockCount += 1;
      output.push(line);
      continue;
    }

    targetBlockLines.push(line);
    if (isFenceLine(line)) {
      inTargetFence = !inTargetFence;
    }
  }

  if (inTargetDiv) {
    flushTargetBlock();
    if (blockHadChange) blockCount += 1;
  }

  return {
    blockCount,
    changedLineCount,
    output: output.join("\n") + (hasTrailingNewline ? "\n" : ""),
  };
}

function fixTargetBlock(lines: string[]): string[] {
  const fixedLines: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const fixedLine = indentContentLine(lines[index]);
    fixedLines.push(fixedLine);

    if (!isFenceLine(fixedLine)) continue;

    const fenceBody: string[] = [];
    const fenceIndent = leadingSpaceCount(fixedLine);
    let closingFence: string | undefined;

    index += 1;
    for (; index < lines.length; index += 1) {
      const possibleClosingFence = indentContentLine(lines[index]);
      if (isFenceLine(possibleClosingFence)) {
        closingFence = possibleClosingFence;
        break;
      }

      fenceBody.push(indentToAtLeast(lines[index], fenceIndent));
    }

    fixedLines.push(...dedentFenceBody(fenceBody, fenceIndent));

    if (closingFence !== undefined) {
      fixedLines.push(closingFence);
    } else {
      index -= 1;
    }
  }

  return fixedLines;
}

function indentContentLine(line: string): string {
  if (line.trim() === "") return line;

  const leadingSpaces = leadingSpaceCount(line);
  if (leadingSpaces >= 4) return line;

  return `${" ".repeat(4 - leadingSpaces)}${line}`;
}

function dedentFenceBody(lines: string[], fenceIndent: number): string[] {
  const commonExtraIndent = lines
    .filter((line) => line.trim() !== "")
    .map((line) => Math.max(0, leadingSpaceCount(line) - fenceIndent))
    .reduce<number | undefined>(
      (common, indent) => common === undefined ? indent : Math.min(common, indent),
      undefined,
    ) ?? 0;

  if (commonExtraIndent < 4) return lines;

  return lines.map((line) => {
    if (line.trim() === "") return line;

    const prefixLength = fenceIndent + commonExtraIndent;
    if (leadingSpaceCount(line) < prefixLength) return line;

    return `${" ".repeat(fenceIndent)}${line.slice(prefixLength)}`;
  });
}

function indentToAtLeast(line: string, leadingSpaces: number): string {
  if (line.trim() === "") return line;

  const currentLeadingSpaces = leadingSpaceCount(line);
  if (currentLeadingSpaces >= leadingSpaces) return line;

  return `${" ".repeat(leadingSpaces - currentLeadingSpaces)}${line}`;
}

function isFenceLine(line: string): boolean {
  return /^\s*```/.test(line);
}

function leadingSpaceCount(line: string): number {
  return line.match(/^ */)?.[0].length ?? 0;
}
