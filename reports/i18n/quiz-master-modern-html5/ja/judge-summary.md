# Translation Judge Summary

- Slug: quiz-master-modern-html5
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.40
- Input tokens: 17252
- Output tokens: 611
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010459

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.38
- Input tokens: 14694
- Output tokens: 945
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010182

### Pass 2
- Runtime seconds: 2.19
- Input tokens: 14907
- Output tokens: 197
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008044

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "The [`<dd>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) defines a description, definition, or value in a description list, used within `<dl>` tags to ..." Replacement: "[`<dd>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd)は、説明リスト内での説明、定義、または値を定義し、`<dl>` タグ内で `<dt>` (_Description Term_) とペアで使用されます。 これは、キーと値のデータを表示する際に便利です。プロフ..." Reason: The candidate left a large block of explanation text in English for index 1. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "The [`<article>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) は、独立して配布または再利用できるスタンドアロンのコンテンツを定義するために使用されます。" Replacement: "[`<article>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) は、独立して配布または再利用できるスタンドアロンのコンテンツを定義するために使用されます。" Reason: Removed redundant 'The' at the start of the sentence. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "The [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) はコマンドやインタラクティブコントロールのリストを表します。" Replacement: "[`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) はコマンドやインタラクティブコントロールのリストを表します。" Reason: Removed redundant 'The' at the start of the sentence. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "The [`<dd>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) defines a description, definition, or value in a description list, used within `<dl>` tags to ..." Replacement: "[`<dd>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd)は、説明リスト内での説明、定義、または値を定義し、`<dl>` タグ内で `<dt>` (_Description Term_) とペアで使用されます。 これは、キーと値のデータを表示する際に便利です。プロフ..." Reason: The candidate left a large block of explanation text in English for index 1. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "The [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) タグは通常" Replacement: "[`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) タグは通常" Reason: Removed redundant English 'The' at the start of the sentence in index 2. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "The [`<article>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) は、独立して配布または再利用できるスタンドアロンのコンテンツを定義するために使用されます。" Replacement: "[`<article>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) は、独立して配布または再利用できるスタンドアロンのコンテンツを定義するために使用されます。" Reason: Removed redundant English 'The' at the start of the sentence in index 3. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "The [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) はコマンドやインタラクティブコントロールのリストを表します。" Replacement: "[`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) はコマンドやインタラクティブコントロールのリストを表します。" Reason: Removed redundant English 'The' at the start of the sentence in index 8. Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) 要素はポップアップやモーダルに使用され" Replacement: "[`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) 要素はポップアップやモーダルに使用され" Reason: Removed redundant English 'The' at the start of the sentence in index 10. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-01--quiz-master-modern-html5/ja/index.mdx
- a89d3f009742a0f209f2f38b3265b6ef87ea08ab i18n candidate(ja): quiz-master-modern-html5 via openrouter/openai/gpt-oss-120b:nitro
- a3d239563a7a379a26deec77afda0ed149a4dccb i18n candidate(ja): quiz-master-modern-html5 via openrouter/qwen/qwen3-32b:nitro
