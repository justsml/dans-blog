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
      for (const slot of ["question", "explanation", "hints"] as const) {
        const hasText = (raw: string) => raw.replace(/<!--[\s\S]*?-->/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/<[^>]*>/g, "").trim().length > 0;
        if (hasText(entry.source.challenges[index][slot].raw)) {
          expect(hasText(challenge[slot].raw), `${entry.locale}/${entry.slug} Q${index + 1} ${slot}`).toBe(true);
        }
      }
      for (const [optionIndex, option] of challenge.options.entries()) {
        if (entry.source.challenges[index].options[optionIndex].hint?.trim()) {
          expect(Boolean(option.hint?.trim())).toBe(true);
        }
      }
      const texts = challenge.options.map(option => option.text.trim());
      expect(texts.every(Boolean)).toBe(true);
      expect(new Set(texts).size).toBe(texts.length);
    }
  });
}
