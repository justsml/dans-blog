# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/ja/index.mdx
- Validation: deferred
- Runtime seconds: 6.76
- Input tokens: 11294
- Output tokens: 3747
- Thinking tokens: unknown
- Cached input tokens: 4224
- Cache write tokens: 0
- Estimated cost: $0.001115
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: RAGが本番で失敗する5つの方法
subTitle: デモは動作したが、実際のユーザーでパイプラインが崩れる。
date: '2026-05-04'
modified: '2026-05-05'
tags:
  - ai
  - rag
  - vector-search
  - llm
  - production
  - embeddings
  - architecture
category: AI
subCategory: Architecture
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
RAG デモはいつも見た目が素晴らしい。

いくつかのドキュメントを埋め込み、ベクトルストアを立ち上げ、チャットに接続すれば、モデルが内部ナレッジベースを何年も使ってきたかのように引用してくれる。美しい。ステークホルダーは感心し、誰かが「これを出荷しよう」と言う。

しかし 6 週間後、ユーザーは自信満々で間違った回答を受け取るようになる。サポートチケットが山積みになる。システムは *動作* しているが、求められている形で機能しているわけではない。

失敗の原因は、通常、劇的な単一ミスではない。5 つの退屈なミスが積み重なっているだけだ。

---

## 1. チャンクサイズが間違っている
---

この失敗はシステムをクラッシュさせるわけではないが、回答が徐々に劣化し、機能全体の信頼性が低下する。

ベクトル検索は *文書* ではなく *チャンク* を取得する。ソース素材をどのように分割したかが、検索エンジンの真実単位になる。チャンクが適切でなければ、モデルは誤った断片で回答してしまう。

**小さすぎる**: チャンクに部分的な回答しか含まれない。埋め込みは正しいトピックを捉えるが、取得されたテキストは文脈が欠落している。たとえば「最大タイムアウトは 30 秒です」という文だけが取得され、前にある「レガシー API を使用する場合は」という文が抜けている。

**大きすぎる**: 埋め込みが多数の概念のぼやけた平均になってしまう。セマンティック検索は、チャンクが複数のテーマを扱っているため混乱し、結果のベクトルがどれも明確に表現できなくなる。

適切なチャンクサイズはコンテンツ次第で決まる。技術文書、法的契約書、サポートのトランスクリプトはそれぞれ異なる分割が必要で、汎用的な答えは存在しない。

**対策**: 計測する。コーパスから質問／回答ペアの評価セットを作成し、256、512、1024 トークンのチャンクで試す。取得精度を測定する――正しいチャンクが上位 5 件に入っているか――ことで、埋め込みモデルよりもチャンクサイズの方が重要であることがすぐに分かる。

また、オーバーラップを使用してください。各側に 64 トークンのオーバーラップがある 512 トークンのチャンクにすれば、境界を跨いだ回答でも取得されます。ほとんどのベクトルライブラリがこれをサポートしていますが、ほとんどの人は省略しています。

---

## 2. 埋め込みが陳腐化する（そして気付かれない）

会社がリブランドしたり、製品名を変更したり、価格を更新したり、API を廃止したりしたと想像してください。

ドキュメントは更新したものの、チャンクを再埋め込みしません。ベクトルインデックスは依然として古いコンテンツを表しています。

ユーザーが新しい価格について質問すると、埋め込みが古いコンテンツへ誘導します。モデルは古いコンテンツを読み取り、自信を持って古い価格を説明します。サポートはチケットを受け取ります。

すべての本格的な RAG システムは最終的にこの問題に直面します。解決策は明白に思えます――コンテンツが変わったら再埋め込みする――しかし、実際にインシデントが起きる前にそのパイプラインを構築するチームはほとんどいません。

コンテンツ指紋を用いたインクリメンタルな再インデックスが必要です：

```typescript
import { createHash } from 'crypto';

async function upsertDocument(doc: Document, vectorStore: VectorStore) {
  const fingerprint = createHash('sha256')
    .update(doc.content)
    .digest('hex');

  const existing = await vectorStore.getBySourceId(doc.id);

  if (existing?.fingerprint === fingerprint) {
    return; // Content unchanged, skip re-embedding
  }

  const chunks = chunkDocument(doc);
  const embeddings = await embedBatch(chunks);

  await vectorStore.upsert(
    chunks.map((chunk, i) => ({
      id: `${doc.id}:${i}`,
      sourceId: doc.id,
      fingerprint,
      vector: embeddings[i],
      text: chunk.text,
      metadata: { ...doc.metadata, updatedAt: new Date() },
    }))
  );
}
```

書き込み時に再インデックスし、指紋はコンテンツに基づいて生成します。タイムスタンプではありません。CMS 上でドキュメントは頻繁に更新されますが、実際のコンテンツが変わっていないことも多いです。

## 3. 検索の精度 vs. 再現率：間違った指標を最適化している

多くの RAG チュートリアルは上位 K 個のチャンクを取得する方法を示すだけで、互いに反対方向に働く二つの目標間のトレードオフについては説明していません。

**高リコール**: 関連性があり得るすべてを返す。ユーザーは必ず回答を得られるが、モデルのコンテキストウィンドウは周辺的なノイズで埋め尽くされ、断片間のギャップを埋めようとして幻覚的な出力を生成する。

**高精度**: 最も関連性の高いチャンクだけを返す。モデルはクリーンで焦点が絞られたコンテキストで動作する。しかし、正しいチャンクが上位 3 件に入っていなければ、モデルは情報を持たずに自信満々で何かを作り上げてしまう。

失敗モードはユーザー側から見ると同じく「誤答」になるが、原因と対策は正反対である。

実際に効果がある二つの手法:

**再ランク付け**: 候補を多めに取得（上位 20 件）し、クロスエンコーダーモデルで関連性に基づいて再ランク付けしてから LLM に渡す。クロスエンコーダーはベクトル類似度より遅いが、最終ランク付け段階では格段に精度が高い。

```typescript
import { Reranker } from '@mastra/rag';

const results = await vectorStore.search(queryEmbedding, { topK: 20 });
const reranked = await reranker.rank(query, results);
const context = reranked.slice(0, 5); // Now top-5 actually means something
```

**ハイブリッド検索**: ベクトル検索（意味的類似度）とキーワード検索（BM25）を組み合わせる。両者は異なる失敗パターンを持つ。ベクトル検索は特定の用語、モデル名、ID に弱く、キーワード検索はパラフレーズや同義語に弱い。組み合わせることで互いの盲点を補完できる。

---

## 4. コンテキストウィンドウの形が間違っている

正しいチャンクを取得した。おめでとう。モデルは依然としてこれを誤るだろう。

問題は「何を取得するか」だけではない。「どこに配置するか」だ。

LLM は「途中で失われる」問題に陥りやすい。Liu らは、長コンテキストモデルが、プロンプトの途中に情報が現れた場合、先頭や末尾に近いときに比べて信頼性が低下することを測定した。

20 個のチャンクを平坦なリストに詰め込み、モデルが正しく統合すると期待しても、性能を犠牲にしていることになる。

実際に効果がある手法:

**最も関連性の高いチャンクの開始位置と終了位置を評価する。** 一般的なヒューリスティックとして、上位ランクのチャンクを最初に、次位のチャンクを最後に、残りを中間に配置する方法があります。直感に反しますが、モデルとプロンプトの形状に対してテストする価値があります。

**コンテキストセクションに明示的に番号とラベルを付ける。** `[Source 1]` … `[Source 2]` のように記述すると、モデルが参照すべきアンカーが提供されます。

**取得信頼度のシグナルを追加する。** 類似度スコアが 0‑1 のスケールで 0.65 であれば、モデルに対して「以下のコンテキストは中程度の信頼度で取得されました。回答が不明瞭な場合は不確実性を認識してください」と伝えます。

**コンテキスト予算を設定する。** 取得したすべてをそのまま渡すのではなく、トークン数を数え、関連スコアで優先順位付けし、モデルのコンテキストウィンドウの 60‑70% でハードカットします。モデルが余裕を持って推論できるように余白を残します。

参考文献: [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)（「ミドルで失われる：言語モデルが長いコンテキストをどのように利用するか」）。

---

## 5. 何が間違っているか全く分からない

これは静かな失敗です。回答が返ってきて UI は正常に見えるが、内容が間違っている。

従来の API では失敗が見える：HTTP 500、タイムアウト、スキーマ検証エラー。すぐに分かります。RAG の失敗は静かです：システムはレスポンスを返し、妥当そうに見えるが、実際は間違っています。

ユーザーから指摘されるまで自分の RAG パイプラインが失敗していることに気付かないことがあります。多くの場合、ユーザーは指摘しません。ただ信頼を失い、Ctrl+F で自力検索に戻ります。

本番環境の RAG システムに最低限必要な可観測性セットアップ：

**取得チェーンをログに残す。** すべてのクエリ、取得されたチャンク（ID とスコア）、そしてモデルが生成した出力を記録します。デバッグの必須情報です。

**取得指標を追跡する。** 正解ラベルがある場合は Mean Reciprocal Rank (MRR) や NDCG を測ります。最低限、類似度スコアの分布をモニタリングします — P50 の取得スコアが下がれば、インデックス品質が低下しています。

**フィードバックループを構築する。** 回答に対する「👍/👎」だけでも、クエリと取得チャンクに紐付ければ学習シグナルになります。これがなければ盲目的に運用しているのと同じです。

**定期的に評価を実行する。** 正解が分かっている 50〜100 件の質問セットを用意し、週次で走らせればユーザーが気付く前にリグレッションを検出できます。スプレッドシートとスクリプトがあれば十分です。

```typescript
async function runEval(
  testCases: { query: string; expectedAnswer: string }[],
  pipeline: RAGPipeline
) {
  const results = await Promise.all(
    testCases.map(async ({ query, expectedAnswer }) => {
      const response = await pipeline.query(query);
      const score = await scoreResponse(response, expectedAnswer);
      return { query, score, response };
    })
  );

  const avgScore = results.reduce((s, r) => s + r.score, 0) / results.length;
  console.log(`Eval score: ${(avgScore * 100).toFixed(1)}%`);
  
  // Alert if score drops below threshold
  if (avgScore < 0.75) {
    await notifyTeam(`RAG eval score dropped to ${(avgScore * 100).toFixed(1)}%`);
  }

  return results;
}
```

---

## 実際の問題点

これらの失敗は、埋め込みモデルやベクトルデータベースそのものが原因ではありません。問題はそれらを取り巻くシステムにあります。

RAG のデモがうまくいくのは、デモ環境が管理された条件下にあるからです。クリーンな文書、整形された質問、寛容な評価者… これらが揃っているからこそ結果が出ます。実運用ではそのような条件は存在しません。

上記の失敗はすべて診断可能です。ただし、測定して初めて見えてきます。信頼できる RAG チームは、特別な手法を使っているわけではありません。デモの産物としてではなく、実装すべきサブシステムとして検索品質を扱っています。

まずは評価ループを構築しましょう。測定できれば、残りは格段に楽になります。
````
