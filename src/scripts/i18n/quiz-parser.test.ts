import { expect, test } from "bun:test";
import { parseQuiz } from "./quiz-parser";
import { analyzeTranslationIntegrity } from "./integrity-checks";

const quiz = (options: string) => `<QuizUI>\n<Challenge\n  index={0}\n  group="test"\n  title="test"\n  options={${options}}\n>\n<slot name="question">Question</slot>\n</Challenge>\n</QuizUI>`;

test("preserves escaped quotes, braces and backslashes in quiz choices", () => {
  const options = String.raw`[
    {text: 'Erreur d\'origine', hint: 'L\'objet {a: 1}', isAnswer: true},
    {text: "CAST('95', INTEGER)"},
    {text: 'literal ]} and \\n'},
    {text: 'isAnswer: true inside text', isAnswer: false},
  ]`;
  expect(parseQuiz(quiz(options)).challenges[0].options).toEqual([
    {text: "Erreur d'origine", hint: "L'objet {a: 1}", isAnswer: true},
    {text: "CAST('95', INTEGER)"},
    {text: "literal ]} and \\n"},
    {text: "isAnswer: true inside text"},
  ]);
});

test("rejects executable choices without evaluating them", () => {
  expect(() => parseQuiz(quiz(`[{text: (() => "executed")()}]`))).toThrow();
});


test("integrity checks distinguish option fields from quoted colons and braces", () => {
  const source = quiz(`[{text: 'Error: a {value}', hint: 'Try again', isAnswer: true}]`);
  const target = quiz(`[{"text": 'Fehler: ein {Wert}', "hint": 'Noch einmal', "isAnswer": true}]`);
  const issues = analyzeTranslationIntegrity({ sourceContents: source, targetContents: target,
    targetPath: "de/index.mdx", locale: "de" });
  expect(issues.filter((issue) => /option-(?:missing|unexpected)-field/.test(issue.code))).toEqual([]);
});

test("integrity checks still report real field changes and damaged output", () => {
  const source = quiz(`[{text: 'Prints: Some("Wisdom")', hint: 'Try again', isAnswer: true}]`);
  const target = quiz(`[{text: 'Affiche : Some("Sagesse")', extra: 'unexpected', isAnswer: true}]`);
  const codes = analyzeTranslationIntegrity({ sourceContents: source, targetContents: target,
    targetPath: "fr/index.mdx", locale: "fr" }).map((issue) => issue.code);
  expect(codes).toContain("quiz-option-missing-field");
  expect(codes).toContain("quiz-option-unexpected-field");
  expect(codes).toContain("quiz-code-option-preservation");
});
