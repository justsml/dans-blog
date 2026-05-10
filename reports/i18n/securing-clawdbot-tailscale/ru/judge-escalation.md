# Translation Escalation Report: securing-clawdbot-tailscale (ru)

**Escalation trigger**: Second judge disagreed with first judge's selection.

**Final selection**: `e7f32504d4bfea955032a659983c077e4b2a289c` (DeepSeek V4 Flash) — with light polish applied.

---

## Summary of Disagreement

| Judge | Selected | Reasoning |
|-------|----------|-----------|
| First (`judge.md`) | Qwen (`6a059c3f`) | More natural voice, stylistic accuracy |
| Second (`judge-second.md`) | DeepSeek (`e7f32504`) | Factual accuracy of title, untranslated term, terminology quality |

---

## Escalation Decision: DeepSeek V4 Flash Wins

The second judge's case is more grounded in verifiable errors than stylistic preference. The first judge's praise for Qwen ("most natural", "punchy") did not identify the factual errors the second judge caught. Three issues are dispositive:

### 1. Title meaning error (disqualifying)

The English title is *"Your AI Assistant Gave Me Shell Access"* — the rhetorical hook is that *your* assistant is the attack vector. The possessive pronoun is the entire premise.

- **Qwen**: `"Мой ИИ-ассистент дал мне доступ к оболочке"` — "Мой" = "My". The post's rhetorical core flips. This is not a style call; it is a translation error.
- **DeepSeek**: `"Ваш ИИ-помощник дал мне доступ к шеллу"` — "Ваш" = "Your". Correct.

### 2. Untranslated English term in body (clear error)

English: *"auth is missing, weak, bypassed, or **leaked**"*

- **Qwen**: `...или leaking` — the word "leaking" is left in English mid-Russian sentence. This is a translation failure, not a stylistic choice.
- **DeepSeek**: `...или утекла` — correctly rendered in Russian.

### 3. Resource link titles (judgment call, DeepSeek preferred)

Qwen translated official product doc names into Russian (e.g., "Руководство по безопасности OpenClaw"). DeepSeek preserved the English titles (e.g., "OpenClaw Security Guide"). For technical documentation links, preserving official English names is the standard practice — it aids searchability and matches what readers will find when they click through. DeepSeek's approach is better here.

---

## Why the First Judge Missed These

The first judge's report focused on voice and style ("captures Dan's direct, technical, and slightly informal voice") and found no cons. The title error and the untranslated "leaking" were not mentioned. This suggests the first judge may have evaluated fluency without a line-by-line comparison to the English source. Both errors are only visible when checking the translation against the original directly.

---

## MiniMax Assessment

MiniMax (`578b46b5`) is eliminated by its own structural problems independent of the judge disagreement:

- Title: `"Ваш ИИ-ассистент Дал кому-то Shell-доступ"` — mid-sentence capitalization of "Дал" is a grammatical error; "кому-то" (someone) replaces "мне" (me), altering the meaning.
- Consistent use of anglicisms (`нода`, `инстанс`, `продакшену`) where standard Russian terms exist.
- "Быстрый рост проекта" for "rapid adoption" — "growth" ≠ "adoption".

MiniMax is not a viable candidate regardless of the Qwen/DeepSeek dispute.

---

## Polish Applied to Final File

Base: DeepSeek V4 Flash (`e7f32504`). Changes from the DeepSeek base:

| Location | DeepSeek | Final | Reason |
|----------|----------|-------|--------|
| Intro paragraph | "Быстрое принятие проекта" | "Стремительный рост популярности проекта" | "Быстрое принятие" is a literal calque of "rapid adoption"; the revised phrase is more natural Russian and better captures the original's energy |
| Section heading | "Настройка OpenClaw с безопасностью" | "Безопасная настройка OpenClaw" | The prepositional phrase "с безопасностью" is grammatically awkward; adjective form is cleaner |
| Section heading | "Проверка вашей открытости" | "Проверка вашей экспозиции" | "Открытость" means openness/transparency in an abstract sense; "экспозиция" (exposure) is the correct security term in this context |

No other changes. The DeepSeek text is otherwise clean and requires no further intervention.

---

## Final State

`src/content/posts/2026-01-26--securing-clawdbot-tailscale/ru/index.mdx` contains the polished DeepSeek translation. The working tree change constitutes the `i18n final(ru)` for this post.
