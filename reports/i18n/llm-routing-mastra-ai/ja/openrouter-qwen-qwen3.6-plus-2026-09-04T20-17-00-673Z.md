# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: ja
- Model: openrouter/qwen/qwen3.6-plus
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/ja/index.mdx
- Validation: deferred
- Runtime seconds: 182.66
- Input tokens: 4110
- Output tokens: 10622
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 4098
- Estimated cost: $0.022049
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
modified: '2026-09-04'
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
多くのエンジニアリングチームは、ある言語モデルを選んだらそのまま使い続ける。プロバイダーは1つ、モデルも1つ、すべてのタスクにそれを適用する。面接でたまたま好印象だったからといって、コーディングもコピーライティングも税務申告も全部その1人に任せるようなものだ。

どの時点を見ても、コードに強いモデル、長大で雑多なコンテキストの処理に強いモデル、そして分類作業における最も安価で地味な作業馬のようなモデルが存在する。モデル名は変わっても、問題の本質は変わらない。1つのモデルが万能であるかのように扱うということは、単純なタスクに過剰なコストを払うか、専門的なタスクで出来の悪い結果を受け入れるかのどちらかを意味する。

100万トークンあたり30ドルのモデルで感情分析を回して数千ドルを溶かすチームを見てきたが、0.50ドルのモデルで十分同じ仕事はこなせたはずだ。単純なJSONフォーマットや基本的な分類タスクまで、すべてプレミアムプロバイダー経由で処理していた。熱くなったのはAWSの請求書だけだった。

より良い方法はある。そして、特に複雑なものではない。

## 固執より委譲

特定のタスクに実際に最適なモデルへリクエストをルーティングできるとしたらどうだろう。高額なパワフルなモデルは難しい処理に使い、単純なパースやフォーマットは安価なモデルに任せる。コードベース内で手動で複数のプロバイダーを切り替える手間なく、マルチプロバイダーの恩恵を受けられる。

Mastraを使えば、まさにこの種のシステムを構築できる。作業の種類に応じて専門エージェントを設定し、各リクエストをどの専門エージェントが処理すべきかを判断するスーパーバイザーエージェントを作成する。以下のモデルIDはMastraの現在の `provider/model` 文字列フォーマットを使用しており、例示であってリーダーボードではない。評価（evals）で勝率が高く、予算に合う最新のモデルに置き換えてほしい。

こう考えてほしい。チームに3人の専門家が在籍しているようなものだ。

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  description: 'Handles implementation, refactoring, and code review tasks.',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: process.env.CODE_MODEL ?? 'anthropic/claude-sonnet-4-6',
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  description: 'Handles long-context synthesis and messy document analysis.',
  instructions: 'You are a creative writer. Be weird.',
  model: process.env.LONG_CONTEXT_MODEL ?? 'google/gemini-2.5-pro',
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  description: 'Handles routine classification, formatting, and general Q&A.',
  instructions: 'You are a helpful assistant. Be boring.',
  model: process.env.GENERAL_MODEL ?? 'openai/gpt-5-mini',
});
```

各エージェントには役割があり、`description` フィールドがルーティングの判断材料の一部となる。コードエージェントには、リポジトリ固有のコーディング評価をパスするモデルを割り当てるべきだ。ロングコンテキストエージェントは、実際のドキュメントを処理しても中間部分をドロドロのスープ状にしないモデルを選ぶ。汎用エージェントは、可能な限り安価で信頼性が高く、そして「最高に退屈」であるべきだ。

ここからが本題だ。インテリジェントなプロキシとして機能する軽量なスーパーバイザーを追加する。

```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor-agent',
  name: 'The Boss',
  instructions: `You route work to the right specialist.
  Delegate coding work to claude-agent.
  Delegate long-context document work to gemini-agent.
  Delegate routine classification and formatting to gpt-agent.
  Do not do specialist work yourself unless delegation is unnecessary.`,
  model: process.env.ROUTER_MODEL ?? 'openai/gpt-5-mini',
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
  memory: new Memory({
    storage: new LibSQLStore({ id: 'router-memory', url: 'file:mastra.db' }),
  }),
});

export const mastra = new Mastra({
  agents: { supervisorAgent, claudeAgent, geminiAgent, gptAgent },
});
```

スーパーバイザー自体はトラフィックの送信先を決定するだけなので、軽量なモデルで実行できる。どのプレミアムモデルを使うか判断するために、プレミアム料金を支払う必要はないのだ。これも計測すべきだ。不適切なルーティング層は、節約したはずのコストを静かに誤ルーティングによる損失へ変えてしまう。

バブルソートの実装を求められれば、ルーターはそれをコード作業と認識し、コード専門家に渡す。クリエイティブなライティングのプロンプトか？ 文体と表現力のために選んだモデルへ送る。歴史的事実に関する質問か？ 汎用エージェントへルーティングする。情報の鮮度や引用が重要な場合は、検索（retrieval）を組み合わせるのが理想的だ。

## 実務的なメリット

**コスト効率は想像以上に重要だ。** 委譲判断を行う小規模なルーティングモデルのコストは、すべてのリクエストを最も高額なプロバイダーで実行する場合の数分の1で済む。時間経過とともに、特にスケールするにつれ、これは実質的な金額の差となる。本格的な推論能力が必要なのは、実際に必要な時だけでよい。

**モデルをタスクに合わせることで品質は向上する。** 勝者は月ごと、タスクごと、プロンプトの形状によって変わる。だからこそ、ルーティング層は統合コードを書いた週にTwitter（X）で話題だったモデルではなく、自社の評価（evals）結果に依存すべきだ。

**耐障害性は「可能」になるが、「自動」ではない。** 上記のスーパーバイザーは、失敗したプロバイダーを別エージェントでリトライする仕組みを持たず、ルーティング判断自体もOpenAIに依存している。プロバイダーのフェイルオーバーが重要なら、アプリケーションコードに明示的なリトライ/フォールバックポリシーを追加し、フォールバックルーターは別プロバイダーで維持し、障害発生時のパスをテストすること。モデルのロゴが違うからといって、エージェントの寄せ集めがサーキットブレーカーになるわけではない。

これは単に賢く見せたいがための工夫ではない。財務面でも技術面でも理にかなったシステムを構築するためのものだ。建設作業のすべてに同じハンマーを使わないのと同様、AIタスクのすべてに同じ言語モデルを使うべきではないだろう。

このアプローチの真価は、アプリケーションコードに分岐の迷路が不要になる点にある。呼び出すエージェントは依然として1つだ。どのタスクにどのモデルを使うかという判断の複雑さは、コードベースのあちこちに散らばった条件分岐ロジックではなく、1か所に集約され、一度設定すれば済む。

### リソース

- [Mastra.ai ドキュメント](https://mastra.ai/docs)
- [Mastra GitHub リポジトリ](https://github.com/mastra-ai/mastra)

## シリーズ一覧

1. **LLMルーティング**（本記事）
2. [セキュリティとガードレール](/mastra-security-guardrails)
3. [MCPとツール統合](/mastra-mcp-tool-integrations)
4. [ワークフローとメモリ](/mastra-workflows-memory)
````
