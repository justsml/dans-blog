# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ja
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ja/index.mdx
- Validation: deferred
- Runtime seconds: 170.42
- Input tokens: 13027
- Output tokens: 24797
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.002757
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: モデルルーターを恐れるな
subTitle: 最適なモデルへの確かな道筋
modified: '2026-09-04'
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
sourceHash: 9599850328a0
---
「モデルと結婚するな」(/llm-routing-mastra-ai) では簡単な主張をした。毎回同じモデルにタスクを投げるのは、前回のベイクオフで勝ったからという理由だけでは不十分だ、と。

簡単な作業には安価なモデルを使い、本当に難しい作業には高性能なモデルを使う。ルーティング層は十分に緩く保ち、プロバイダを切り替えるたびにコードベースを聖域にしない。

それは正しかった。

しかし、不完全でもあった。

ルーターを追加した瞬間、新たなシステムの振る舞いをテストする必要が生まれる。「どのモデルが最適か？」という問いは、「システムは正しい経路を選び、適切なツールを使い、正しい証拠を保持し、適切なタイミングで停止したか？」に変わる。

それを測定しなければ、モデルルーターは「勘とディスパッチテーブル」でしかない。

<p class="inset">
ルーターは答えではない。ルーターは、システムがどう振る舞うべきかという仮説である。
</p>

Mastraには、その仮説をテスト可能な形にするためのインターフェースが揃っている。[スコアラー](https://mastra.ai/docs/evals/overview)、[`runEvals`](https://mastra.ai/reference/evals/run-evals)、[データセット](https://mastra.ai/docs/evals/datasets/overview)、[実験](https://mastra.ai/docs/evals/datasets/running-experiments)。名前は評価インフラのように聞こえるが、実際その通りだ。真の価値はもっとシンプルで、エージェントの振る舞いを可視化し、議論可能にすることにある。

## 何をテストするのか

前回の記事のルーターには、3つの専門ルートがある。

| ルート | 何を送るべきか | 悪いルートの例 |
|---|---|---|
| `code` | 実装、リファクタリング、デバッグ、コードレビュー | 長文要約、単純な分類 |
| `long-context` | 乱雑なドキュメント、トランスクリプト、ポリシー合成、多数のファイル | 短い機械的な整形処理 |
| `general` | 分類、整形、簡単なQ&A、退屈な抽出 | ハードなコードや証拠を多用する分析 |

このテーブルは出発点に過ぎない。評価ではない。

評価には、サンプルとスコアラーが必要だ。

| 要素 | 役割 |
|---|---|
| データセット項目 | 「これは代表的なリクエストです」 |
| 正解データ | 「これが期待したルートまたは振る舞いです」 |
| スコアラー | 「これが出力が合格かどうかを判断する基準です」 |
| 実験 | 「これが将来の実行と比較できる実行結果です」 |

重要なのは、出力の質だけでなく、振る舞いをテストすることだ。

モデルは間違った専門ルートを選んでも美しい回答を生成できる。セキュリティエージェントは証拠を保持せずにそれらしいレポートを出力できる。サポートエージェントは返金ポリシーの確認をスキップしながら共感したふりができる。段落は見える部分だ。軌跡こそがバグの住処である。

ルーターに関しては、私は4つの軸から始める。

| 軸 | 問い | スコアラーの例 |
|---|---|---|
| 品質 | 正しいルートを選び、有用な結果を生成したか？ | ルート精度、回答の完全性、忠実性 |
| コスト | 単純な作業に高級モデルを使わなかったか？ | 選択されたルートのコストクラス、トークン予算 |
| 速度 | 製品のレイテンシ予算内に完了したか？ | 実行時間またはタイムアウトスコアラー |
| その他 | 安全性、プライバシー、観測可能性の制約を守ったか？ | ツール許可リスト、証拠保持、拒否動作 |

最後の行は重要だ。「その他」こそ、本番環境の傷跡が生きる場所である。

## ルーターの決定をスコアリング可能にする

ルーターが最終回答しか出力しない場合、その決定については推測するしかない。出力をスコアリングすることはできても、ルートが正しかったかどうかは判断できない。

そこで、ルーティングステップに小さな構造化契約を与える。

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

ユーザーがこのJSONを目にする必要は一切ない。内部ステップ、ワークフローのハンドオフ、トレーススパンのいずれでも構わない。スコアラーがアクセスできればそれで十分だ。

以下は、ルート選択だけを行う、意図的に小さくしたMastraエージェントである。

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

そう、これは少し作為的だ。良いことだ。評価は退屈な継ぎ目に報いるものだ。

決定が明示化されれば、下流の専門家が動く前にルートをテストできる。ルーターの失敗は、選択されたモデル、そのプロンプト、ツール、あるいは最終回答スコアラーの背後に隠れなくなる。

## 退屈な失敗を捉えるスコアラーを書く

Mastraの[`createScorer`](https://mastra.ai/reference/evals/create-scorer)は、プレーンなJavaScript関数とLLMジャッジプロンプトの両方、あるいはその両方を受け付ける。失敗が決定論的な場合は、常に関数から始めるべきだ。関数のほうが安価で高速、かつ謎が少ない。

ルート精度にジャッジモデルは不要だ。必要なのはJSONをパースして一つのフィールドを比較することだけである。

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

このスコアラーは華やかではない。それが要点だ。

ルーターが小さなテストセットで一貫して有効なJSONを出力し、明らかな専門家を選べないのであれば、本番トラフィックを任せる理由はどこにもない。必要なのは存在論を格付けする哲学者モデルではない。電池の入った煙警報器だ。

## まず小さな評価ループを回す

[`runEvals`](https://mastra.ai/reference/evals/run-evals)は高速ループである。ターゲット、テストケース、スコアラー、同時実行制限を与える。ターゲットをデータに対して実行し、集計スコアを返す。

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

これが、プロンプトを変更したり、ルートを追加したり、より安価なルーターモデルを試したりするときに回すループである。

成熟したシステムには十分ではない。しかし、最も恥ずかしい退行——「ルータープロンプトを変更したら、分類タスクをプレミアムコードモデルに送るようになった」——を防ぐには十分だ。

軸は分離したままにしておく。ルート精度と最終回答品質は別のスコアである。JSONの妥当性、許可されたツール、トレーサビリティにはそれぞれ独自のチェックを設ける。それらを一つの「品質」数値にまとめてはいけない。平均値は、有用な失敗が隠居する場所である。

## 本当に価値がある場面でだけLLM評価機を追加する

ルーティングには、正当な範囲で曖昧なケースもある。

```text
Read these logs and tell me why the deploy failed.
```

これはデバッグだから`code`か？ ログが長いから`long-context`か？ ユーザーが要約を求めているから`general`か？ 正しいルートは、利用可能なツールとプロダクトの約束によって決まる。

こういう場面こそ、LLM評価機が役立つ。ただし、厳格なルーブリックとセットで使う場合に限る。Mastraのスコアラーは、関数ステップとプロンプトオブジェクトステップを混在させることができる。構造的な部分は関数に任せ、実際に判断が必要な部分だけを評価機に任せる。

```typescript
// src/mastra/scorers/route-reasonableness.ts
来源: `import { createScorer } from "@mastra/core/evals";
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
${JSON.string化(run.input)}

Router output:
${JSON.string化(run.output)}

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

このスコアラーは評価機モデルを呼び出すため、コストがかかる。判断にそれだけの価値がある場面なら問題ない。

JSONがパースできるかどうかのチェックにこれを使うな。

## 良いケースをデータセットに昇格させる

最初のうちは、eval配列をハードコードしても構わない。しかしやがて、あなたの事例はプロダクト資産になる。つまり、顧客の障害チケット、奇妙なサポート会話、プロンプトインジェクションの試み、先週の木曜日までは正しくルーティングできていたリクエストなどだ。

そういう事例はデータセットに保存すべきだ。

Mastraのデータセットは、テストケースのバージョン管理されたコレクションだ。変更のたびに新しいバージョンが作成されるため、モデル判断を下した時点で存在していた正確なケースセットに対して実験を再実行できる。

データセットには永続化が必要なので、まずストレージを設定する:

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

次に、データセットを作成してケースを追加する:

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

データセットができれば、evalケースは捨てられるスクリプトデータではなくなる。ID、バージョン、履歴、実験結果を持つ。

そうなれば、evalは「プロンプト用のテストファイル」という感覚から、「プロダクトの記憶」へと変わる。

## ルーターに対して実験を実行する

データセットが準備できたら、[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) を使って、登録されているエージェント、ワークフロー、またはスコアラーに対して実行する。

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

これで会話が変わる。

「新しいルーターのほうが良さそう」ではなく、次のように言える:
— 古いルーターはルート精度が `0.94` だった。
— 新しいルーターは `0.98` だった。
— 長コンテキストのルーティンが改善された。
— コードレビューのケースで2件、後退した。
— プレミアムモデルへのハンドオフが18%減少した。
— ルータのレテンシが300ms増加した。

- 古いルーターはルート精度が `0.94` だった。
- 新しいルーターは `0.98` だった。
- 長コンテキストのルーティングが改善された。
- コードレビューのケースが2件、後退した。
- プレミアムモデルへのハンドオフが18%減少した。
- ルーターのレイテンシが300ms増加した。

それがエンジニアリングの会話だ。トレードオフがテーブルに並び、その交換が割に合うかどうかを自分で決められる。

## ライブ挙動はスコアするが、それを正解データと混同してはいけない

Mastraはスコアラをエージェントやワークフローのステップに直接アタッチすることもできる。ライブスコアラは非同期で実行され、設定済みのデータベースに結果を保存し、サンプリングにも対応している。意図しない限り、本番レスポンスをすべてスコアしなくて済む。

便利だ。だが、これは別の仕事だ。

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

ライブスコアリングは、ルーターが今も有効な判定を出し続けていることを教えてくれる。不正な形式の出力、有害コンテンツ、禁止されたツール呼び出し、エビデンスマーカーの欠落、不自然に低い確信度を検出する。

とはいえ、これがルート精度を教えてくれることは通常ない。本番トラフィックには正解データがホチキス留めされて届くわけではないからだ。

ライブスコアリングはモニタリングだ。データセットによる実験は統制テストだ。両方が必要だ。それぞれ異なる問いに答える。

## ルート精度の次に測るもの

ルート精度は最初の一段目だ。リクエストが想定どおりのスペシャリストに届いたかはわかる。だが、そのスペシャリストが良い仕事をしたかについては、何も語らない。

ルーターが基本をクリアしたら、システムをレイヤーごとにスコアする:

| レイヤー | スコアする対象 | 重要な理由 |
|---|---|---|
| ルーターの判定 | 選択されたルート、確信度、理由 | 誤分類や不適切なエスカレーションルールを検出する |
| トラジェクトリ | 期待されるツールまたはエージェントの順序 | 「正しい答え・誤った経路」という挙動を検出する |
| スペシャリストの出力 | 正確性、忠実性、有用性 | 正しいルーティング後に生じる低品質な成果を検出する |
| コストとレイテンシ | モデル選択、トークン数、実行時間 | 高コストまたは低速な勝ち筋を検出する |
| 安全性とスコープ | 許可されたツール、拒否の境界、エビデンス | プロダクトリスクにつながる失敗を検出する |

`runEvals` はエージェントレベル、ワークフローレベル、ステップレベル、トラジェクトリのスコアラ設定に対応している。つまり、最終回答だけが唯一の成果物だと思い込む必要はない。

ワークフローの場合、形は次のようになる:

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

これが、本番のエージェントに持っていてほしいメンタルモデルだ:

判定をスコアする。経路をスコアする。回答をスコアする。

回答だけをスコアしていれば、モデルは偶然合格してしまう。

## ルーターは時間とともに退屈になっていくべき

最初のルーティングプロンプトは、大抵は判断の連続だ。プロトタイプとしてはそれで十分。

評価（evals）が教えてくれるにつれて、ルーターの各部分は徐々に魔法のようでなくなるべきだ：

- 明確な語彙的なケースは決定論的なルールになる。
- リスクのあるタスクは明示的な承認かワークフローの分岐を必要とする。
- 曖昧なタスクは推測する代わりに確認の質問をする。
- コストの高いルートはより高い確信度か2つ目のシグナルを必要とする。
- 既知の失敗ケースはデータセット項目になる。

目標はルーターを永遠に「賢く」することではない。目標はシステムを理解しやすくすることだ。

より良いモデルを意味することもある。より厳密なプロンプトを意味することもある。ワークフローのスッテプ、スコアラー、ハードキャップ、あるいは月に四桁の費用を節約する退屈な `if` 文を意味することもある。

それが行動を測定する全てのポイントだ。好みで議論するのをやめ、証拠に基づいて議論するようになる。

## 実践的なスタートチェックリスト

1. ユーザーが決しで見なくても、ルーティングの決定を構造化する。
2. 有効なJSON、期待されるルート、禁止ルートに対する決定論的なスコアラーを書く。
3. ルータープロンテトやモデルを変更する前に、10～20ケースで `runEvals` を使う。
4. 実際の失敗をバーション管理されたデータセットに昇格させる。
5. 意味のあるプロンプ狙、モ照、ルーション、ワークフローの変后に対してデ照タセット実験を実行する。
6. 安価なプロダクション不変条€のためにライブスコアラーを追オする。
7. 平均スコアだけでなく、ルートごとに実験を比較&する。

平均よりも失敗のクラスターの方が重要だ。

すべてのリグレッションが長文脈のポリシー合成にあるなら、「ルーターが悪くなった」わけではない。ルート境界の問題だ。すべての失敗ケースが特定のツールを使っているなら、ツール契約の問題だ。すべての安価なモデルが同じ2つの曖昧なケースで失敗するなら、より高価なデフォル照ではなく、エスカレーションロジックが必要だ。

ここで評価（evals）が役立つ。評価は儀式でも、一時的に大人になった気分にさせるダシュボードでもない。システムのどの部分が失敗しているかを示し、全体ではなくその部分を修正できるようにする。

## 参考資料

- [Mastraスコアラーの概要](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer` リファレンス](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals` リファレンス](https://mastra.ai/reference/evals/run-evals)
- [Mastraデータセットの概要](https://mastra.ai/docs/evals/datasets/overview)
- [Mastraデータセット実験](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Don't Marry Your Model](../llm-routing-mastra-ai)
- [Fight Evils with Evals!](../llm-evals-are-broken)
````
