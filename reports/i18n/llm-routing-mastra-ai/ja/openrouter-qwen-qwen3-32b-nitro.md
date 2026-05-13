# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/ja/index.mdx
- Validation: deferred
- Runtime seconds: 9.87
- Input tokens: 4989
- Output tokens: 3954
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001348
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: LLMルーティング、今ホット
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
ほとんどのエンジニアリングチームは、言語モデルを1つ選び、それを使い続ける傾向があります。1つのプロバイダー、1つのモデル、すべてのタスク。これは、たとえば最初の面接で優れていたからといって、コーディング、ライティング、税務のすべてを1人の人物に任せてしまうようなものです。

ある時点では1つのモデルがコード生成に優れており、別のモデルが長い複雑なコンテキストを扱いやすく、さらに別のモデルが分類などの単純作業を低コストで処理するのが得意です。モデル名は変化しても、問題の構造は変わりません。1つのモデルをすべてに優れていると扱うと、単純なタスクで過剰に支払いをしたり、専門的なタスクで不十分な結果を得たりするリスクがあります。

私はあるチームが、100万トークンあたり30ドルのモデルを使って感情分析を実行し、数万ドルのコストを費やすのを見てきました。実際には、0.5ドルのモデルで同等の結果が得られたはずです。単純なJSONフォーマットや基本的な分類タスクも、すべてプレミアムプロバイダーを通じて処理されていました。加熱していたのは、彼らのAWS請求書だけでした。

より良い方法があります。これは特に複雑ではありません。

## 依頼よりも委任

特定のタスクに最適なモデルにリクエストをルーティングできないでしょうか？高価なパワーハウスは難しいタスクに使い、単純なパースやフォーマットはコストの低いモデルに任せます。複数のプロバイダーの利点を得られる方法でありながら、コードベース内で手動で切り替える必要はありません。

Mastraは、まさにこうしたシステムを構築するためのツールです。異なる種類の作業に特化したエージェントを設定し、その後で各リクエストをどのエージェントに割り当てるかを判断するルーター・エージェントを作成します。以下に示すモデルIDはあくまで例であり、リーダーボードではありません。現在の評価で勝っているモデルや予算に合ったものに置き換えてください。

これをこう考えてください。チームに3人の専門家がいます。

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

それぞれに役割があります。コードエージェントは、あなたのリポジトリ固有のコーディング評価をパスするモデルでなければなりません。長文処理エージェントは、あなたの実際のドキュメントを処理して中身が文字列に溶け出さずに済むモデルでなければなりません。汎用エージェントは、安価で信頼性が高く、最善の形で無味乾燥であるべきです。

ここで興味深い点があります。インテリジェントなプロキシとして機能するルーターを追加します。

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

ルーター自体は軽量なモデルで動かせます。なぜなら、単にトラフィックをどこに送るべきかを判断しているだけだからです。他の高価なモデルを選定するために高コストを払う必要はありません。こちらも測定してください。悪いルーターは静かに節約を誤ったルーティングに変えてしまいます。

誰かがバブルソートの実装を依頼すると、ルーターはそれをコード作業として認識し、コード専門のエージェントに引き渡します。クリエイティブライティングのプロンプト？それは声と幅広さを選定したモデルに送られます。歴史的イベントに関する事実の質問？ルーターは、新鮮さや引用が重要である場合にリトリーブを伴う汎用エージェントに送ります。

## 実用的な利点

**コスト効率はあなたが思っているよりも重要です。** ルーティングモデルがデリゲートの決定を行うコストは、すべてのリクエストを最も高価なプロバイダーに送るコストの一部に過ぎません。時間とともに、特にスケールが大きくなると、これは実際の金額になります。本当に必要になるまで、高コストのインテリジェンスに支払う必要はありません。

**タスクにモデルをマッチングさせることで品質が向上します。** 優勝モデルは月、タスク、プロンプトの形状によって異なります。そのため、ルーティングレイヤーは評価結果に依存すべきであり、インテグレーションを書いた週にTwitterで勝っていたモデルに依存すべきではありません。

**堅牢性は副次的な利益になります。** OpenAIが定期的な障害を起こした場合（実際に起こります）、ルーターはトラフィックを他のプロバイダーにリダイレクトできます。特定のAPIがオンラインに戻るのを待っている間にシステムが停止するわけではありません。

これは、賢くするためにするわけではありません。これは、経済的かつ技術的に意味のあるシステムを構築することです。同じハンマーですべての建設タスクを使わないように、すべてのAIタスクに同じ言語モデルを使うべきではありません。

このアプローチの美しさは、アプリケーションコードが変更されない点にあります。ルーター・エージェントを呼び出すだけです。どのタスクにどのモデルを使うかを決める複雑さは、コードベース全体に散らばった条件分岐ではなく、一度設定して1か所に集中しています。

### リソース

- [Mastra.ai ドキュメント](https://mastra.ai/docs)
- [Mastra GitHub リポジトリ](https://github.com/mastra-ai/mastra)

## シリーズの全文を読む

1. **LLM ルーティング**（本記事）
2. [セキュリティ & ガイドレール](../mastra-security-guardrails)
3. [MCP & ツール統合](../mastra-mcp-tool-integrations)
4. [ワークフロー & メモリ](../mastra-workflows-memory)
````
