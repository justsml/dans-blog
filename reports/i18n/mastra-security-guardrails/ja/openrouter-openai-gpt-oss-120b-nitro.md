# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/ja/index.mdx
- Validation: deferred
- Runtime seconds: 3.17
- Input tokens: 7423
- Output tokens: 2867
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000806
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 本番AIは恐ろしい（対策方法）
subTitle: エージェントにガードレールがなければ、実運用はまだ不可です。
date: '2026-01-03'
modified: '2026-01-08'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
誰も安全でない AI システムを意図的に作ろうとは思いません。指示を書き、エッジケースをテストし、いくつかのバリデーションルールを追加します。すると、誰かがボットを海賊になりすましてユーザーデータを漏らす方法を見つけたり、クレジットカード番号がログに残ったり、モデルが自信満々に競合他社の製品を推奨したりします。

「デモで動く」から「本番で安全」へのギャップは、ほとんどのチームが想定しているよりも広いです。

問題の一因は、未加工の LLM が「すべきこと」や「すべきでないこと」についての意見を持っていないことです。LLM は、与えられたパターンを延長しようとする予測マシンです。「システムオーバーライドモード」のようなプロンプトを与えれば、快く従います。これはモデルのバグではなく、言語モデルの動作そのものです。

多くのフレームワークはモデルだけを渡し、「頑張って」と言うだけです。Mastra は別のアプローチを取ります。ガードレールが最終的に必要になることを前提に、最初からエージェントアーキテクチャに組み込んでいます。

---

## 安全層としてのプロセッサ
---

コアとなる仕組みはシンプルです。プロンプトがモデルに届く前に、入力プロセッサのチェーンを通ります。モデルが応答した後は、出力プロセッサが処理します。各プロセッサはその段階でコンテンツを検査、修正、あるいはブロックできます。

AI とのやり取りのミドルウェアと考えてください。必要なものを積み重ねて動作を設定すれば、すべてのリクエストで自動的に実行されます。

### 1. 海賊を止める（プロンプトインジェクション）

プロンプトインジェクション攻撃はますます巧妙化しています。見えない Unicode 文字を使ったり、指示を base64 で書いたり、モデルに「デバッグモード」だと信じ込ませて通常のルールを無効化させようとしたりします。手法は日々進化しています。

Mastra には一般的なパターンを捕捉するプロセッサが用意されています:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) は制御文字を除去し、空白を統合します。[`PromptInjectionDetector`](https://mastra.ai/docs/processors) はクリーンアップされた入力を解析し、指示を上書きしようとする試みのパターンを検出します。

検出の厳しさは `threshold` パラメータで調整でき、トリガーされたときの挙動（ブロック、ログ記録、単なるフラグ付け）も設定します。

### 2. PII の取り扱い

ログに残るクレジットカード番号、ベクトルデータベースに保存される社会保障番号、不要に長く保存されるメールアドレス。これらは規制上の問題に発展しやすい典型的なケースです。課題は、ユーザーがチャットウィンドウに機密データを貼り付けていることに気付かないことです。

[`PIIDetector`](https://mastra.ai/docs/processors) は、モデルに到達する前またはストレージに書き込まれる前に、一般的なパターンをスキャンします。

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

マスク（`[REDACTED]` に置換）、ハッシュ、あるいは完全ブロックのいずれかを選択できます。プロセッサは入力と出力の両方で実行されるため、モデルが応答で機密情報を生成した場合でもカバーできます。

### 3. コンテンツモデレーション

インターネット上のデータで学習したモデルは、いくつかの危険な出力を見たことがあります。フィルタリングを行わないと、時折、広報チームが不安になるような応答を生成してしまうことがあります。[`ModerationProcessor`](https://mastra.ai/docs/processors) は、ガイドラインに違反するコンテンツを検出します。

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

興味深い点は、使用ケースに合わせてどのカテゴリを重要視するかを自分で定義できることです。クリエイティブな執筆ツールは、顧客サービスボットよりも表現豊かなコンテンツを許容できるかもしれません。`threshold` と `strategy` によって、フィルタリングの厳しさを細かく調整できます。

---

## 問題が発生したとき

プロセッサは問題を検出しても例外を投げません。その代わり、結果オブジェクトにフラグを設定します。

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

このパターンにより、アプリケーションに適した方法でセキュリティイベントを処理できます。分析のためにログに残す、汎用的なエラーメッセージを返す、あるいは特定のコンテキストで一部の違反を許容するといった選択肢があります。`tripwireReason` フィールドは、どのプロセッサがコンテンツをフラグ付けしたかを正確に示すため、誤検知のデバッグや閾値調整に役立ちます。

---

## これが解決しないこと

プロセッサは多くを捕捉しますが、魔法ではありません。十分な時間と意志を持った攻撃者は、抜け道となるプロンプトを見つけられる可能性があります。モデルは時折、プロセッサが予測できない形で幻覚（ハルシネーション）を起こします。また、セキュリティと柔軟性の間には常にトレードオフがあります。ルールを厳しくすればするほど、正当なユースケースをブロックしてしまうリスクが高まります。

価値は「完璧な保護」ではなく、**本番環境で必ず発生する共通の問題を体系的に処理できること**です。実際のユーザー行動を観測しながら感度を調整できます。ドメイン固有のリスクに対してカスタムプロセッサを追加することも可能です。そして、何がブロックされ、なぜブロックされたかを示す監査ログが残ります。

本番の AI 環境で多く見られるセキュリティ問題は、洗練された攻撃というよりも、**ユーザーが許可されていないデータをコピペしたり、試行錯誤でボットが意図しない動作をすることに気付く**というケースです。プロセッサがすべての問題を防げるわけではありませんが、明らかなリスクをはるかに対処しにくくします。

### リソース
---

- [Mastra ガードレール ドキュメント](https://mastra.ai/docs/agents/guardrails)
- [セキュリティ ベストプラクティス](https://mastra.ai/docs/security)
- [Mastra GitHub リポジトリ](https://github.com/mastra-ai/mastra)

## シリーズを読む

1. [LLM ルーティング](../llm-routing-mastra-ai)
2. **セキュリティ & ガードレール**（本記事）
3. [MCP とツール統合](../mastra-mcp-tool-integrations)
4. [ワークフロー & メモリ](../mastra-workflows-memory)
````
