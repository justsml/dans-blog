import { expect, test } from "bun:test";
import { createQuizProgress } from "./QuizProgress";

test("separate question controllers preserve each other's answers and observe resets", () => {
  const globals = globalThis as unknown as { window?: { localStorage: Storage } };
  const previous = globals.window;
  const values = new Map<string, string>();
  globals.window = { localStorage: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  } as Storage };
  try {
    const first = createQuizProgress("/example/");
    const second = createQuizProgress("/example/");
    first.registerQuestion({ index: 0, group: "Test", question: "First" });
    second.registerQuestion({ index: 1, group: "Test", question: "Second" });
    first.answerQuestion(0, { text: "Yes", isAnswer: true });
    second.answerQuestion(1, { text: "Yes", isAnswer: true });
    expect(createQuizProgress("/example/").getSnapshot().correct).toBe(2);
    expect(first.getSnapshot().correct).toBe(2);
    expect(second.getSnapshot().tries).toBe(2);
    second.answerQuestion(1, { text: "No" });
    expect(createQuizProgress("/example/").getQuestion(1)?.isCorrect).toBe(false);
    expect(first.getSnapshot().correct).toBe(1);
    expect(first.getSnapshot().tries).toBe(3);
    first.reset();
    expect(second.getSnapshot().questions).toEqual([]);
  } finally {
    if (previous === undefined) delete globals.window;
    else globals.window = previous;
  }
});
