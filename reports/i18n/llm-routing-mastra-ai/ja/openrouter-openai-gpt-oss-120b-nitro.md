# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.37
- Input tokens: 5071
- Output tokens: 2225
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000598
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-01-02--llm-routing-mastra-ai/ja/index.mdx reports/i18n/llm-routing-mastra-ai/ja
## Raw Output

````mdx
---
title: モデルと結婚しないで
subTitle: LLMルーティング、今熱い
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
ほとんどのエンジニアリングチームは、ある言語モデルを選んでそれに固執します。プロバイダーが一つ、モデルが一つ、すべてのタスクに使うわけです。ちょうど、面接で最初に良い印象を与えた人を、コーディング、コピーライティング、税務まで全部任せるようなものです。

ある時点では、コードに強いモデル、長くて乱雑なコンテキストに強いモデル、そして分類といった安価で退屈な作業に最適なモデルがそれぞれ存在します。名前は変わりますが、問題の本質は変わりません。1つのモデルがすべてに秀でているとみなすと、単純作業に過剰な費用を払うか、専門的な作業で期待以下の結果を得るかのどちらかになります。

あるチームが、$30/百万トークンのモデルで感情分析を実行し、数千ドルを消費していたのを目にしました。実際には $0.50 のモデルでも同等に処理できたはずです。シンプルな JSON フォーマットや基本的な分類タスクすら、プレミアムプロバイダーを通して実行していました。唯一「熱く」なっていたのは AWS の請求書だけでした。

もっと良い方法があります。しかも特別に複雑ではありません。

## 献身より委任

もし、特定のタスクに最適なモデルへリクエストを振り分けられたらどうでしょうか？ 高価なハイパワーモデルは難しい作業に使い、単純なパースやフォーマットはより安価なものに任せます。コードベースで手動でプロバイダーを切り替える必要なく、複数プロバイダーの利点を享受できます。

Mastra はまさにこのようなシステムを構築できるフレームワークです。タスク別に専門エージェントを用意し、どのエージェントが各リクエストを処理すべきかを判断するルータエージェントを作ります。下のモデル ID は例示であり、ランキングではありません。評価で勝って予算に合う現在のモデルに差し替えてください。

イメージとしては、チームに 3 人のスペシャリストがいるようなものです。

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'You are a creative writer. Be weird.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'You are a helpful assistant. Be boring.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

それぞれが役割を持ちます。コードエージェントはリポジトリ固有のコーディング評価を通過するモデルにすべきです。長文コンテキストエージェントは、ドキュメント全体を崩さずに処理できるモデルにします。汎用エージェントは安価で信頼性が高く、できるだけ退屈であることが望ましいです。

ここからが本題です。インテリジェントなプロキシとして機能するルータを追加します。

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'The Boss',
  instructions: `You are an intelligent router.
  - Coding -> Claude
  - Poetry -> Gemini
  - Facts -> GPT

  Do not do the work yourself. Delegate.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // Use a cheap model for routing!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

ルータ自体は軽量モデルで動作します。なぜなら、トラフィックをどこに送るかという判断だけを行うからです。プレミアムモデルを選択するために高額なレートを支払う必要はありません。この点も測定してください。ルータが不適切だと、節約分が誤配に変わります。

誰かがバブルソートの実装を求めたら、ルータはそれをコード作業と認識し、コード専門エージェントに渡します。創作的な文章のプロンプトなら、声と表現力に適したモデルに回します。歴史的事象に関する事実質問なら、一般エージェントへルーティングし、鮮度や引用が重要な場合は検索結果と組み合わせます。

## 実用的なメリット

**コスト効率は思った以上に重要です。** デリゲーション判断だけを行う小さなルーティングモデルは、すべてのリクエストを最も高価なプロバイダーに通す場合に比べてごくわずかな費用で済みます。規模が大きくなるほど、実際に金額として積み重なります。重い知能処理は、本当に必要なときだけ支払えばよいのです。

**タスクにモデルを合わせると品質が向上します。** 勝者モデルは月ごと、タスクごと、プロンプトの形状ごとに変わります。したがって、ルーティング層は自分たちの評価結果に基づいて決定すべきであり、統合を書いた週に Twitter で話題になっていたモデルに盲目的に従うべきではありません。

**レジリエンスは副次的な恩恵です。** OpenAI が定期的に障害を起こしたとき（実際に起きます）、ルーターはトラフィックを他のプロバイダーへ振り向けられます。特定の API が復旧するのを待ち続けて、システムが止まることはありません。

これは単に「かっこいい」ための工夫ではなく、財務的にも技術的にも妥当なシステムを構築するための手段です。すべての建設作業に同じハンマーを使うわけにはいかないのと同様に、すべての AI タスクに同じ言語モデルを使うべきではありません。

このアプローチの美点は、アプリケーションコードを変更する必要がないことです。呼び出すのは依然としてルーターエージェントだけです。どのモデルをどのタスクに使うかという判断ロジックは一箇所に集約され、1 回の設定で済みます。コードベース全体に散在する条件分岐を排除できます。

### リソース

- [Mastra.ai ドキュメント](https://mastra.ai/docs)
- [Mastra GitHub リポジトリ](https://github.com/mastra-ai/mastra)

## シリーズを読む

1. **LLM ルーティング**（この投稿）
2. [セキュリティとガードレール](../mastra-security-guardrails)
3. [MCP とツール統合](../mastra-mcp-tool-integrations)
4. [ワークフローとメモリ](../mastra-workflows-memory)
````
