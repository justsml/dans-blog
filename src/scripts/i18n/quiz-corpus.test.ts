import { expect, test } from "bun:test";
import { loadQuizCorpus } from "./quiz-corpus";

for (const entry of loadQuizCorpus()) {
  test(`${entry.locale}/${entry.slug}: complete, distinct answer choices`, () => {
    expect(entry.quiz.challenges.length).toBe(entry.source.challenges.length);
    for (const [index, challenge] of entry.quiz.challenges.entries()) {
      expect(challenge.index).toBe(index);
      expect(challenge.options.length).toBe(entry.source.challenges[index].options.length);
      expect(challenge.options.filter(option => option.isAnswer)).toHaveLength(1);
      expect(challenge.options.findIndex(option => option.isAnswer)).toBe(
        entry.source.challenges[index].options.findIndex(option => option.isAnswer),
      );
      const texts = challenge.options.map(option => option.text.trim());
      expect(texts.every(Boolean)).toBe(true);
      expect(new Set(texts).size).toBe(texts.length);
    }
  });
}
