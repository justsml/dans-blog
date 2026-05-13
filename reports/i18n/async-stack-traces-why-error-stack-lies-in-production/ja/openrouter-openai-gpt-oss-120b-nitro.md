# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.16
- Input tokens: 5031
- Output tokens: 1067
- Thinking tokens: unknown
- Cached input tokens: 2432
- Cache write tokens: 0
- Estimated cost: $0.000388
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ja/index.mdx reports/i18n/async-stack-traces-why-error-stack-lies-in-production/ja
## Raw Output

````mdx
---
title: '非同期スタックトレース: `Error.stack` が嘘をつく理由'
subTitle: マイクロタスクキューが宿題とデバッグコンテキストを奪った。
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
午前2時です。PagerDuty のアラームが鳴り響いています。

ログを開くと、次のように出ています。

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

これだけです。関数名もありません。行番号もありません。ファイルパスもありません。`processTicksAndRejections` だけが表示されています。

非同期 JavaScript へようこそ。スタックトレースは作り話で、行番号は意味を持ちません。

---

## なぜスタックトレースが壊れるのか


同期コードでは、コールスタックは美しい系譜です。A が B を呼び出し、B が C を呼び出す。C がクラッシュすると、そこに至る経路が正確に分かります。

非同期コード（`async/await`）では、`await` キーワードが出現するたびに中断点が生まれます。

`await` すると、関数はスタックから切り離され、マイクロタスクキューという低温のフリーザーに入れられます。スタックは空になる（あるいは別の作業をしている）状態です。

Promise が解決すると、関数は解凍されて再びスタックに乗せられます。しかし履歴は失われています。

エンジンは 500 ミリ秒前に `await` を呼び出した主体が誰かを認識できません。単に「実行すべきタスクがある」ことだけを知っているのです。

## V8 の修正試み

Node.js も手を差し伸ばす。用意されているのは次の二つだ。

1. `Error.captureStackTrace()`：**作成時点**のスタックを取得する。エラーが後で投げられる場合は役に立たない。
2. `--async-stack-traces`：Node.js が Promise のチェーンを「影のスタック」として保持するフラグ。  
   * **コスト**：アプリの速度が約 30 % 遅くなる。  
   * **結果**：多少は助けになるが、すぐにノイズが増える。

---

## 本当の解決策：AsyncLocalStorage

本番環境で生き残りたいなら、スタックトレースを見るのはやめて、因果関係に注目せよ。

実行スレッド（Stack と Microtask Queue の間を飛び回る）にコンテキスト（ユーザー ID、リクエスト ID）を付与する必要があります。

Node.js にはこれ用の組み込みツールがあります：`AsyncLocalStorage`。

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

`await` が何回発生しても構いません。コンテキストは生き残ります。

---

## 本番環境での実践手順

1. `err.stack` を信用しない。設計上不完全です。
2. 構造化ロギングを採用する。`AsyncLocalStorage` を使って `requestId` をすべてのログ行に付与する。
3. スタックトレースではなくトレースを取る。OpenTelemetry を利用すれば、サービス間の因果関係チェーンを可視化でき、実際に必要な情報が得られます。

あなたのコードは非同期です。デバッグコンテキストは同期であるべきです。
````
