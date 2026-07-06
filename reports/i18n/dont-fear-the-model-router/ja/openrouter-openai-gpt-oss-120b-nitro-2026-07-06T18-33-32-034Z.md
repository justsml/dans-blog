# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.97
- Input tokens: 12968
- Output tokens: 7317
- Thinking tokens: unknown
- Cached input tokens: 6144
- Cache write tokens: 0
- Estimated cost: $0.001823
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale ja --skip-global (code 1)
## Raw Output

````mdx
---
title: モデルルーターを恐れるな
subTitle: 自信を持って最適なモデルへ
modified: '2026-07-03'
tags:
  - ai
  - llm
  - agents
  - mastra
  - evals
  - model-routing
  - testing
  - observability
  - production
category: AI
subCategory: AI Infrastructure
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
related:
  - llm-routing-mastra-ai
  - llm-evals-are-broken
  - mastra-workflows-memory
---
最初のバージョンの[Don’t Marry Your Model](/llm-routing-mastra-ai)では、次のような単純な主張をしました。最後のベイクオフで勝ったからといって、すべてのタスクを同じモデルに送るのはやめよう、というものです。

安価な作業には安価なモデルを使う。実際に難しい作業には強力なモデルを使う。ルーティング層は、コードベースを祭壇に変えることなくプロバイダーを入れ替えられる程度に柔軟に保つ。

それは正しかった。

しかし不完全でもありました。

なぜなら、ルーターを追加すると、テストすべき新しいシステム挙動が生まれるからです。問いはもはや「どのモデルが最適か？」ではなく、「システムは正しいルートを選び、適切なツールを使い、正しい証拠を保持し、適切なタイミングで止まったか？」になります。

これを測定しなければ、モデルルーターは単なる雰囲気とディスパッチテーブルにすぎません。

<p class="inset">
ルーターが答えではありません。ルーターはシステムがどう振る舞うべきかという仮説です。
</p>

Mastra はその仮説をテスト可能な形に変えるための有用なインターフェースを提供します: [scorers](https://mastra.ai/docs/evals/overview)、[`runEvals`](https://mastra.ai/reference/evals/run-evals)、[datasets](https://mastra.ai/docs/evals/datasets/overview)、そして [experiments](https://mastra.ai/docs/evals/datasets/running-experiments)。API 名は評価インフラストラクチャを連想させますが、実際の価値はもっとシンプルです。

それはエージェントの振る舞いを「議論できる」ほど可視化してくれます。

## 私たちがテストすべきことは？

前回の記事のモデルルーターには、次の 3 つの明確な専門ルートがあります。

| ルート | ここに来るべきもの | 悪いルートになる例 |
|---|---|---|
| `code` | 実装、リファクタリング、デバッグ、コードレビュー | 長文要約、単純分類 |
| `long-context` | 雑多な文書、文字起こし、ポリシー合成、複数ファイル | 短い機械的フォーマット |
| `general` | 分類、フォーマット、シンプルな Q&A、退屈な抽出 | 難解なコードや証拠が多い分析 |

この表は出発点ですが、評価そのものではありません。

評価には **例** と **スコアラ** が必要です。

| 要素 | 役割 |
|---|---|
| データセット項目 | 「代表的なリクエスト」 |
| 正解 | 「期待したルートまたは振る舞い」 |
| スコアラ | 「出力が合格かどうかを判断する基準」 |
| 実験 | 「将来の実行と比較できるラン」 |

重要なのは、単に文章の品質を測るのではなく **振る舞い** をテストすることです。

モデルは間違った専門領域を選んでも美しい回答を書けます。セキュリティエージェントは証拠を保持せずに説得力のあるレポートを生成できるかもしれません。サポートエージェントは返金ポリシーのチェックを飛ばしつつ、共感的な口調を装うこともあります。段落は目に見える部分ですが、バグはその背後の軌跡に潜んでいます。

ルーターを評価する際、私は通常 **4 つの軸** から始めます:

| 軸| 質問 | 例スコアラ |
|---|---|---|
| Quality（品質） | 正しいルートを選び、役立つ結果を出したか？ | ルート精度、回答の完全性、忠実度 |
| Cost（コスト） | つまらない作業で高額モデルを使わなかったか？ | 選択されたルートのコストクラス、トークン予算 |
| Speed（速度） | 製品のレイテンシ予算内で完了したか？ | 実行時間またはタイムアウトスコアラ |
| Other（その他） | 安全性、プライバシー、可観測性の制約を守ったか？ | ツール許可リスト、証拠保持、拒否動作 |

最後の列が重要です。**Other** が本番環境の傷跡（scar tissue）です。

## ルーターの決定をスコア可能にする

ルーターが最終回答だけを出す場合、なぜそのように振る舞ったかを知るのは難しいです。出力をスコアすることはできますが、決定については推測にすぎません。

評価では、ルーティングステップに小さな構造化契約を与えます。

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

本番システムがこの JSON をユーザーに見せる必要はありません。内部ステップ、ワークフローハンドオフ、あるいはトレーススパンとして扱えます。スコアラは表層が取れれば十分です。

以下は、ルートを選択する意図的に小さな Mastra エージェントです。

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `Choose the best specialist route for the user request.

Return ONLY JSON:
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

Routing rules:
- code: implementation, refactoring, debugging, code review, APIs, tests
- long-context: large documents, transcripts, policy synthesis, many files
- general: classification, formatting, extraction, simple Q&A

Do not answer the user request. Only choose the route.`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

やや人工的ですが、評価は退屈なシームを報酬します。

ルーター決定が明示的であれば、下流のスペシャリストをテストする前にルート自体をテストできます。これが、問題がルーターか、選択されたモデルか、プロンプトか、ツールインターフェースか、最終回答スコアラかを見極める手段です。

## 退屈な失敗を捕まえるスコアラを書く

Mastra の [`createScorer`](https://mastra.ai/reference/evals/create-scorer) は JavaScript 関数、LLM ジャッジプロンプト、またはその両方を使用できます。失敗が決定的であれば、まず関数で始めましょう。コストが低く、速度も速く、謎も少ないからです。

ルート精度については、ジャッジモデルは不要です。JSON をパースし、特定フィールドを比較すれば済みます。

```typescript
// src/mastra/scorers/route-accuracy.ts
import { createScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "general";
type RouteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFromAgentOutput(output: Array<{ content?: unknown }>) {
  const content = output[0]?.content;
  return typeof content === "string" ? content : JSON.stringify(content ?? "");
}

function parseDecision(output: Array<{ content?: unknown }>) {
  try {
    return JSON.parse(textFromAgentOutput(output)) as {
      route?: string;
      confidence?: number;
      reason?: string;
    };
  } catch {
    return {};
  }
}

export const validRouterJsonScorer = createScorer({
  id: "valid-router-json",
  description: "Checks that the router emits a valid decision object.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const decision = parseDecision(run.output);
    const validRoute = ["code", "long-context", "general"].includes(
      decision.route ?? "",
    );
    const validConfidence =
      typeof decision.confidence === "number" &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;

    return validRoute && validConfidence && decision.reason ? 1 : 0;
  })
  .generateReason(({ score }) =>
    score === 1 ? "Valid router decision." : "Router output was not valid JSON.",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "Checks whether the selected route matches ground truth.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
  .generateReason(({ run, score }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

このスコアラは派手ではありません。そこがポイントです。

ルーターが一貫して有効な JSON を出せず、ちょっとしたテストセットで明らかなスペシャリストを選べなければ、本番トラフィックに任せる根拠はありません。哲学的なモデル評価オントロジーは不要です。バッテリー付きの煙探知器と同等のシンプルさで十分です。

## 小さな評価ループを最初に走らせる

Mastra の [`runEvals`](https://mastra.ai/reference/evals/run-evals) は高速ループです。ターゲット、テストケース、スコアラ、そして同時実行数を指定すれば、データに対してターゲットを走らせ、集計スコアを返します。

```typescript
// src/mastra/evals/router.eval.ts
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "../scorers/route-accuracy";

const routingCases = [
  {
    input: "Refactor this React component to remove duplicated state.",
    groundTruth: { route: "code" },
  },
  {
    input: "Summarize these 14 interview transcripts and find recurring objections.",
    groundTruth: { route: "long-context" },
  },
  {
    input: "Classify this ticket as billing, technical, account, or other.",
    groundTruth: { route: "general" },
  },
  {
    input: "Debug a failing Playwright test that only breaks in CI.",
    groundTruth: { route: "code" },
  },
  {
    input: "Extract the renewal date and contract value from this short paragraph.",
    groundTruth: { route: "general" },
  },
];

const result = await runEvals({
  target: routerDecisionAgent,
  data: routingCases,
  scorers: [validRouterJsonScorer, routeAccuracyScorer],
  targetOptions: {
    modelSettings: { temperature: 0 },
  },
  concurrency: 3,
});

console.log(result.scores);
console.log(result.summary.totalItems);

if (result.scores["valid-router-json"] < 1) {
  throw new Error("Router emitted invalid decision JSON.");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("Router route accuracy fell below 90%.");
}
```

プロンプトを調整したり、新しいルートを追加したり、より安価なルーターモデルを試すときに走らせるループです。

成熟したシステムに十分というわけではありませんが、最も恥ずかしいリグレッション――「ルータープロンプトを変えたらプレミアムコードモデルに分類タスクを送ってしまった」――を防ぐには十分です。

コスト、速度、品質、その他すべてがここに現れます：

- **コスト**：正確性が保たれれば、ルーターモデルは安価に抑えられます。  
- **速度**：評価時にタイムアウトを強制したり、ハーネスでレイテンシを記録したりできます。  
- **品質**：ルート精度と最終回答の品質は別々のスコアとして扱います。  
- **その他**：JSON の妥当性、許可されたツール、安全性、トレース可能性などはそれぞれ独立したチェックを持ちます。

これらをすべて「品質」スコアにまとめてはいけません。平均値は、実際に失敗したケースが退役する場所です。

## 必要なときだけ LLM ジャッジを導入する

一部のルーター挙動は主観的です。リクエストは正当な曖昧さを含むことがあります：

```
Read these logs and tell me why the deploy failed.
```

`code`（デバッグ）か、`long-context`（ログ）か、`general`（要約）か。正しいルートはツールの表面と製品の約束に依存します。

ここで LLM ジャッジが役立ちますが、厳密なルーブリックが必要です。Mastra のスコアラーは関数ステップとプロンプトオブジェクトステップを組み合わせられます。構造は関数で整え、判断が必要な部分だけジャッジに委ねます。

```typescript
// src/mastra/scorers/route-reasonableness.ts
import { createScorer } from "@mastra/core/evals";
import { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonableness",
  description: "Judges whether the route explanation matches the request.",
  type: "agent",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-routing decisions.",
  },
})
  .analyze({
    description: "Evaluate the router's decision rationale.",
    outputSchema: z.object({
      score: z.number().min(0).max(1),
      rationale: z.string(),
    }),
    createPrompt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router output:
${JSON.stringify(run.output)}

Score from 0 to 1.

1.0 = route is clearly appropriate and the reason cites the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsupported, or the reason is unrelated

Return JSON with { "score": number, "rationale": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeStepResult.score)
  .generateReason(({ results }) => results.analyzeStepResult.rationale);
```

このスコアラーはジャッジモデルを呼び出すためコストがかかりますが、判断に価値がある場合は問題ありません。

JSON の構文チェックに使ってはいけません。

## 良いケースをデータセットへ昇格させる

当初はハードコードされた評価配列で構いません。やがて例は製品資産になります。失敗した顧客チケット、奇妙なサポート会話、プロンプトインジェクション試行、先週の木曜日まで正しくルーティングされていたリクエスト――これらはすべてデータセットに格納すべきです。

Mastra のデータセットはテストケースのバージョン管理されたコレクションです。各変更は新しいバージョンを生成し、モデル決定時点の正確なケースセットに対して実験を再実行できます。

まずストレージを設定します。データセットは永続化が必要です：

```typescript
// src/mastra/index.ts
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { routerDecisionAgent } from "./agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "./scorers/route-accuracy";

export const mastra = new Mastra({
  storage: new LibSQLStore({
    id: "router-evals",
    url: "file:./mastra.db",
  }),
  agents: {
    routerDecisionAgent,
  },
  scorers: {
    validRouterJson: validRouterJsonScorer,
    routeAccuracy: routeAccuracyScorer,
  },
});
```

次にデータセットを作成し、ケースを追加します：

```typescript
// src/mastra/evals/create-router-dataset.ts
import { z } from "zod";
import { mastra } from "../index";

const dataset = await mastra.datasets.create({
  name: "router-decisions-v1",
  description: "Representative model-router decisions for CI and experiments.",
  inputSchema: z.string(),
  groundTruthSchema: z.object({
    route: z.enum(["code", "long-context", "general"]),
    source: z.string().optional(),
  }),
});

await dataset.addItems({
  items: [
    {
      input: "Refactor this React component to remove duplicated state.",
      groundTruth: { route: "code", source: "synthetic:happy-path" },
    },
    {
      input: "Summarize these 14 interview transcripts and find recurring objections.",
      groundTruth: { route: "long-context", source: "synthetic:happy-path" },
    },
    {
      input: "Classify this ticket as billing, technical, account, or other.",
      groundTruth: { route: "general", source: "synthetic:happy-path" },
    },
  ],
});
```

データセットができた瞬間から、評価ケースを使い捨てのスクリプトデータとして扱う必要はなくなります。ケースには ID、バージョン、履歴、実験結果が付与されます。

これが評価が「プロンプト用テストファイル」から「製品メモリ」へと変わる瞬間です。

## ルーターに対して実験を実行する


データセットが作成されたら、[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) を使って、登録済みのエージェント、ワークフロー、またはスコアラーに対して実行します。

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Baseline router decision run before adding security route.",
  targetType: "agent",
  targetId: "router-decision-agent",
  scorers: ["validRouterJson", "routeAccuracy"],
  metadata: {
    routerModel: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
    promptVersion: "router-2026-07-03",
  },
  maxConcurrency: 5,
  itemTimeout: 30_000,
  maxRetries: 1,
});

console.log(`${summary.succeededCount}/${summary.totalItems} items succeeded`);

for (const item of summary.results) {
  const scores = Object.fromEntries(
    item.scores.map((score) => [score.scorerId, score.score]),
  );

  console.log(item.itemId, item.output, scores);
}
```

これで会話の流れが変わります。

「新しいルーターは良さそうだ」という感覚ではなく、次のように言えます。

- 旧ルーターはルート精度で `0.94` を記録した。
- 新ルーターは全体で `0.98` を記録した。
- 長文コンテキストのルーティングが改善された。
- コードレビューケースが 2 件劣化した。
- プレミアムモデルへのハンドオフが 18 % 減少した。
- ルーターのレイテンシが 300 ms 増加した。

これがエンジニアリング的な会話です。トレードオフが存在し、その価値があるかは判断が必要です。

## ライブ挙動をスコアリングするが、真実のデータと混同しないでください

Mastra はスコアラーをエージェントやワークフローのステップに直接付与することもできます。ライブスコアラーは非同期に実行され、設定したデータベースにスコア結果を保存します。サンプリング制御があるため、意図しない限りすべての本番レスポンスをスコアしません。

有用ですが、別の役割です。

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Choose the best specialist route...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

ライブスコアリングは、ルーターが依然として有効な決定を出しているかを確認できます。出力のフォーマット破損、毒性コンテンツ、禁止ツール呼び出し、証拠マーカーの欠落、あるいは信頼度が異常に低いケースを捕捉します。

しかし、通常はルート精度は測れません。なぜなら本番トラフィックには真実のデータが付随していないからです。

この違いは重要です。ライブスコアリングはモニタリングであり、データセット実験は制御されたテストです。両方が必要ですが、答える質問は異なります。

## ルート精度の後に測るべきこと

ルート精度は最初の段階です。リクエストが期待したスペシャリストに届いたかを示しますが、スペシャリストが良い成果を出したかは示しません。

ルーターが基本を通過したら、システムを層ごとにスコアリングします。

| 層 | スコアすべき項目 | なぜ重要か |
|---|---|---|
| ルーター決定 | 選択されたルート、信頼度、理由 | 誤分類や不適切なエスカレーションルールを検出 |
| 軌跡 | 期待されるツールまたはエージェントのシーケンス | 「正解だが経路が間違っている」挙動を検出 |
| スペシャリスト出力 | 正確性、忠実性、有用性 | 正しいルーティング後の低品質作業を検出 |
| コストとレイテンシ | モデル選択、トークン数、実行時間 | 高コストまたは遅延した勝利を検出 |
| 安全性とスコープ | 許可されたツール、拒否境界、証拠 | 製品リスクの失敗を検出 |

Mastra の `runEvals` API はエージェントレベル、ワークフローレベル、ステップレベル、軌跡スコアラーの構成をサポートします。したがって、最終回答だけが唯一の成果物であると想定する必要はありません。

ワークフローの場合、構成は次のようになります。

```typescript
const result = await runEvals({
  target: supportWorkflow,
  data: supportCases,
  scorers: {
    workflow: [finalAnswerQualityScorer],
    steps: {
      "route-request": [routeAccuracyScorer],
      "check-policy": [policyGroundingScorer],
    },
    trajectory: [expectedPathScorer],
  },
});
```

これが本番でエージェントを扱う際に持つべきメンタルモデルです。

決定をスコアリングし、パスをスコアリングし、回答をスコアリングする。

回答だけをスコアリングすると、モデルは偶然に合格してしまう可能性がある。

## ルーターは時間とともに退屈になるべき

最初のルーティングプロンプトは、判断の段落であることが多い。プロトタイプとしては問題ない。

評価から学んでいくにつれて、ルーターの一部は魔法的である必要がなくなる：

- 明確な語彙ケースは決定論的なルールに置き換えられる。
- リスクの高いタスクは明示的な承認やワークフローブランチを要求できる。
- 曖昧なタスクは推測せずに確認質問を投げる。
- コストのかかるルートは、より高い信頼度や二次シグナルを必要とする。
- 既知の失敗ケースはデータセット項目として取り込める。

目的はルーターを「永遠に賢く」することではない。目的はシステムを考えやすくすることだ。

場合によっては、より良いモデルが必要になることもある。場合によっては、プロンプトを絞るだけで済むこともある。場合によっては、ワークフローステップ、スコアラー、ハードキャップ、あるいは月額で数千ドルを節約できる退屈な `if` 文が必要になることもある。

これが振る舞いを測定する本質だ。好みで議論するのをやめ、証拠に基づいて議論を始める。

## 実践的な開始チェックリスト

今日、Mastra ルーターを構築するなら、まずここから始めるべきだ：

1. ルーティング決定を構造化する。たとえユーザーが目にしなくても構わない。
2. 有効な JSON、期待されるルート、禁止されたルートを検証する決定論的スコアラーを書く。
3. ルーティングプロンプトやモデルを変更する前に、`runEvals` を使って 10〜20 件のケースで評価する。
4. 実際の失敗をバージョン管理されたデータセットに昇格させる。
5. データセット実験で、意味のあるプロンプト、モデル、ルート、またはワークフローの変更を検証する。
6. 本番環境の安価な不変条件向けにライブスコアラーを追加する。
7. 平均スコアだけでなく、ルート別に実験結果を比較する。

平均スコアは、失敗クラスタほど重要ではない。

もしすべての回帰が長文ポリシー合成に起因するなら、「ルーターが悪化した」のではなく、ルート境界の問題がある。すべての失敗ケースが特定のツールを使用しているなら、ツール契約の問題がある。安価なモデルが同じ二つの曖昧なケースで失敗し続けるなら、より高価なデフォルトに切り替えるよりもエスカレーションロジックが必要かもしれない。

ここで評価が有用になる。儀式としてでも、皆が一時的に大人になったように感じさせるダッシュボードとしてでもなく。

システムの形状を見つける手段として。

## リソース

- [Mastra スコアラー概要](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer` リファレンス](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals` リファレンス](https://mastra.ai/reference/evals/run-evals)
- [Mastra データセット概要](https://mastra.ai/docs/evals/datasets/overview)
- [Mastra データセット実験](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Don't Marry Your Model](/llm-routing-mastra-ai)
- [Fight Evils with Evals!](/llm-evals-are-broken)
````
