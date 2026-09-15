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

test("integrity allows translated prose containing code-like punctuation", () => {
  const source = quiz(`[{text: 'Input & output modes'}, {text: 'Not guaranteed; may fire multiple times', isAnswer: true}]`);
  const target = quiz(`[{text: 'Ein- und Ausgabemodi'}, {text: 'Nicht garantiert; kann mehrfach auftreten', isAnswer: true}]`);
  expect(analyzeTranslationIntegrity({ sourceContents: source, targetContents: target,
    targetPath: "de/index.mdx", locale: "de" }).filter(i => i.code === "quiz-code-option-preservation")).toEqual([]);
});

test("integrity does not mistake a one-word prose choice for an identifier", () => {
  const source = quiz(`[{text: 'Strings', isAnswer: true}]`);
  const target = quiz(`[{text: 'Zeichenketten', isAnswer: true}]`);
  expect(analyzeTranslationIntegrity({ sourceContents: source, targetContents: target,
    targetPath: "de/index.mdx", locale: "de" }).filter(i => i.code === "quiz-code-option-preservation")).toEqual([]);
});

test("HTML integrity ignores indented code fences and literal option brackets", () => {
  const body = quiz(`[{text: 'literal ] <b>', isAnswer: true}]`).replace('Question</slot>',
    'Example:\n    ```html\n    <b>\n    ```\nUse `<b>` literally.</slot>');
  expect(analyzeTranslationIntegrity({ sourceContents: body, targetContents: body,
    targetPath: "de/index.mdx", locale: "de" }).filter(i => i.code.startsWith("html-"))).toEqual([]);
});

test("prose around inline code translates while its token stays protected", () => {
  const source = quiz("[{text: 'prints `undefined`', isAnswer: true}]");
  const target = quiz("[{text: 'gibt `undefined` aus', isAnswer: true}]");
  const check = (targetContents: string) => analyzeTranslationIntegrity({ sourceContents: source,
    targetContents, targetPath: "de/index.mdx", locale: "de" });
  expect(check(target).filter(i => i.code.includes("code-preservation"))).toEqual([]);
  expect(check(target.replace('`undefined`', '`undefiniert`')).map(i => i.code))
    .toContain("quiz-inline-code-preservation");
});


test("prose lists and location phrases are not JavaScript answer literals", () => {
  const source = quiz(`[{text: 'Push, Pop, Peek'}, {text: 'Only in Node.js', isAnswer: true}]`);
  const target = quiz(`[{text: 'Einfügen, Entfernen, Ansehen'}, {text: 'Nur in Node.js', isAnswer: true}]`);
  expect(analyzeTranslationIntegrity({ sourceContents: source, targetContents: target,
    targetPath: "de/index.mdx", locale: "de" }).filter(i => i.code === "quiz-code-option-preservation")).toEqual([]);
});


test("HTML tag mentions in a question title are props, not unclosed markup", () => {
  const body = quiz(`[{text: 'Meter', isAnswer: true}]`).replace('title="test"', 'title="<meter> purpose"');
  expect(analyzeTranslationIntegrity({sourceContents: body, targetContents: body,
    targetPath: "zh/index.mdx", locale: "zh"}).filter(i => i.code.startsWith("html-"))).toEqual([]);
});


test("an added optional hint requests editorial review without a schema failure", () => {
  const issues = analyzeTranslationIntegrity({sourceContents: quiz(`[{text: 'A', isAnswer: true}]`),
    targetContents: quiz(`[{text: 'A', isAnswer: true, hint: 'Ein hilfreicher Hinweis'}]`),
    targetPath: "de/index.mdx", locale: "de"});
  expect(issues.filter(i => i.severity === "high")).toEqual([]);
  expect(issues).toContainEqual(expect.objectContaining({code: "quiz-option-unexpected-hint", severity: "medium"}));
});
