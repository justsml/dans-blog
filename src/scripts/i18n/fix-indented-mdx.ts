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
  let inFence = false;
  let blockHadChange = false;
  let blockCount = 0;
  let changedLineCount = 0;

  const output = lines.map((line) => {
    if (!inTargetDiv && /^\s*<div className=(["'])(question|explanation)\1>\s*$/.test(line)) {
      inTargetDiv = true;
      inFence = false;
      blockHadChange = false;
      return line;
    }

    if (!inTargetDiv) return line;

    if (!inFence && line.trim() === "</div>") {
      inTargetDiv = false;
      inFence = false;
      if (blockHadChange) blockCount += 1;
      return line;
    }

    const fixedLine = indentContentLine(line);
    if (fixedLine !== line) {
      blockHadChange = true;
      changedLineCount += 1;
    }

    if (/^\s*```/.test(fixedLine)) {
      inFence = !inFence;
    }

    return fixedLine;
  });

  return {
    blockCount,
    changedLineCount,
    output: output.join("\n") + (hasTrailingNewline ? "\n" : ""),
  };
}

function indentContentLine(line: string): string {
  if (line.trim() === "") return line;

  const leadingSpaces = line.match(/^ */)?.[0].length ?? 0;
  if (leadingSpaces >= 4) return line;

  return `${" ".repeat(4 - leadingSpaces)}${line}`;
}
