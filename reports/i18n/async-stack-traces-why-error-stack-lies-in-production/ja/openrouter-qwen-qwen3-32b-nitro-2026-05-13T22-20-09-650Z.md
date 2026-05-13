# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ja/index.mdx
- Validation: deferred
- Runtime seconds: 9.92
- Input tokens: 4743
- Output tokens: 3420
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001200
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: '非同期スタックトレース: `Error.stack`が期待を裏切る理由'
subTitle: マイクロタスクキューが宿題を消してしまった（そしてデバッグコンテキストも）
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
午前2時である。PagerDutyのアラームが鳴り響いている。

ログを開くとこう表示されている：

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

これだけだ。関数名もない。行番号もない。ファイルパスもない。ただ「processTicksAndRejections」が表示されている。

非同期JavaScriptへようこそ。ここではスタックトレースはデタラメで、行番号は意味がない。

---

## スタックトレースが壊れる理由

同期コードでは、コールスタックは美しい系譜である。AがBを呼び出し、BがCを呼び出した。Cがクラッシュしたとき、そこまでの経路を正確に追跡できる。

非同期コード（async/await）では、各awaitキーワードは実行を一時停止するポイントとなる。

awaitするたびに、関数はスタックから切り離される。マイクロタスクキューと呼ばれるクライオニックフリーザーに保管される。この時点でスタックは空になる（または他の処理を実行中）。

Promiseが解決されると、関数は解凍されて再びスタックに積まれる。だがその履歴はすでに消えている。

エンジンは500ミリ秒前に関数を呼び出したのが誰だったか把握していない。ただタスクを実行するだけである。

---

## V8の対応

Node.jsは補助を試みる。我々には以下がある：

1.  `Error.captureStackTrace()`：生成時のスタックをキャプチャする。エラーが後で投げられると無意味である。
2.  `--async-stack-traces`：Node.jsがPromiseチェインの「シャドウスタック」を保持するフラグ。
    *   コスト：アプリケーションを30%遅くする。
    *   結果：役立つが、ノイズがすぐに増える。

---

## 真の解決策: AsyncLocalStorage

本格的な運用環境で生き残るにはスタックトレースではなく因果関係に注目せよ。

実行スレッドがスタックとマイクロタスクキューの間をジャンプする中で、コンテキスト（ユーザーID、リクエストID）をスレッドに付着させる必要がある。

Node.jsにはこのための組み込みツールが存在する：`AsyncLocalStorage`

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. リクエストをラップ
context.run({ requestId: '123' }, () => {
  // 2. 深い非同期コードを呼び出す
  await processOrder();
});

// 3. processOrderの内部:
async function processOrder() {
  await db.query();
  
  // 魔法！requestIdをまだ参照できる
  const { requestId } = context.getStore();
  console.log(`[${requestId}] 注文処理に失敗`);
}
```

中間に何層もの`await`があっても構わない。コンテキストは維持される。

---

## 本番環境での実践指針

1.  `err.stack`に信頼を置くな。設計上、不完全である。
2. 構造化ロギングを用いよ。`AsyncLocalStorage`で各ログラインに`requestId`を付与せよ。
3. トレースせよ、スタックトレースに頼るな。OpenTelemetryを使え。これはサービス間の因果関係を可視化し、実際に関心のあるものを明らかにする。

あなたのコードは非同期である。デバッグコンテキストも非同期でなければならない。
````
