# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ja
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ja/index.mdx
- Validation: deferred
- Runtime seconds: 48.07
- Input tokens: 12409
- Output tokens: 6720
- Thinking tokens: unknown
- Cached input tokens: 4924
- Cache write tokens: 7470
- Estimated cost: $0.009659
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: モデルルーターを恐れるな
subTitle: 自信を持って最適なモデルへルーティングする
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
[モデルに縛られない](/llm-routing-mastra-ai)では、分かりやすい主張をした。前回のベイクオフで勝ったからといって、あらゆるタスクを同じモデルに送り続けるのはやめよう、と。

安い仕事には安いモデルを使う。本当に難しい仕事には、より強いモデルを使う。プロバイダーを入れ替えただけでコードベースが聖堂になってしまわないよう、ルーティング層は十分に疎結合にしておく。

これは正しかった。

ただし、不十分でもあった。

ルーターを追加した瞬間、テストすべき新しいシステム挙動が生まれる。問いは「どのモデルが最良か？」ではなく、「システムは正しいルートを選び、正しいツールを使い、必要な証拠を保持し、正しいタイミングで停止したか？」になる。

そこを計測しないなら、モデルルーターはディスパッチテーブル付きの雰囲気論にすぎない。

<p class="inset">
ルーターは答えではない。ルーターは、システムがどう振る舞うべきかについての仮説だ。
</p>

Mastraには、その仮説をテスト可能なものに変えるための仕組みがある。[スコアラー](https://mastra.ai/docs/evals/overview)、[`runEvals`](https://mastra.ai/reference/evals/run-evals)、[データセット](https://mastra.ai/docs/evals/datasets/overview)、そして[実験](https://mastra.ai/docs/evals/datasets/running-experiments)だ。名前からして評価基盤らしく、実際その通りである。本当の価値はもっと単純だ。エージェントの挙動を、議論できる程度にまで可視化してくれる。

## 何をテストするのか？

前回の記事のルーターには、3つの専門ルートがある。

| ルート | ここに送るべきもの | 送るとまずいもの |
|---|---|---|
| `code` | 実装、リファクタリング、デバッグ、コードレビュー | 長文コンテキストの要約、単純な分類 |
| `long-context` | 雑然とした文書、トランスクリプト、ポリシーの統合、多数のファイル | 短い機械的なフォーマット処理 |
| `general` | 分類、フォーマット、単純なQ&A、退屈な情報抽出 | 難しいコード処理、証拠を重視する分析 |

この表は出発点にはなる。だが、これだけでは評価にならない。

評価には、例とスコアラーが必要だ。

| 要素 | 役割 |
|---|---|
| データセット項目 | 「これが代表的なリクエストだ」 |
| 正解データ | 「期待していたルート、または挙動はこれだ」 |
| スコアラー | 「出力が合格したかどうかを、こう判定する」 |
| 実験 | 「将来の実行と比較できる実行結果はこれだ」 |

重要なのは、文章の品質だけでなく、挙動をテストすることだ。

モデルは、間違った専門ルートを選んだ後でも、美しい回答を書ける。セキュリティエージェントは、証拠を保持していなくても、もっともらしいレポートを作れる。サポートエージェントは、返金ポリシーの確認を飛ばしていても、共感的に聞こえることがある。目に見えるのは段落だ。バグが潜んでいるのは、その段落に至る軌跡である。

ルーターについて、私はまず4つの軸から始める。

| 軸 | 問い | スコアラーの例 |
|---|---|---|
| 品質 | 正しいルートを選び、有用な結果を出したか？ | ルートの正解率、回答の完全性、忠実性 |
| コスト | 退屈な仕事にプレミアムモデルを使わずに済んだか？ | 選択ルートのコストクラス、トークン予算 |
| 速度 | プロダクトのレイテンシ予算内に完了したか？ | 実行時間またはタイムアウトのスコアラー |
| その他 | 安全性、プライバシー、可観測性の制約に従ったか？ | ツールの許可リスト、証拠の保持、拒否の挙動 |

最後の行が重要だ。「その他」には、本番で積み重なった傷跡が現れる。

## ルーターの判断をスコアリング可能にする

ルーターが最終回答しか返さないなら、その判断については推測するしかない。出力はスコアリングできても、ルートが正しかったかどうかは分からない。

そこで、ルーティングのステップに小さな構造化契約を持たせる。

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

ユーザーにこのJSONを見せる必要はない。内部ステップでも、ワークフロー間の受け渡しでも、トレーススパンでもよい。スコアラーがアクセスできれば十分だ。

ルートの選択だけを行う、意図的に小さくしたMastraエージェントを見てみよう。

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

そう、これは少し人工的だ。だが、それでいい。評価では、地味な継ぎ目が効いてくる。

判断が明示されていれば、下流の専門エージェントを実行する前にルートをテストできる。ルーターの失敗が、選択されたモデルやそのプロンプト、ツール、あるいは最終回答スコアラーの失敗の陰に隠れることもなくなる。

## 地味な失敗を捕まえるスコアラーを書く

Mastraの[`createScorer`](https://mastra.ai/reference/evals/create-scorer)は、通常のJavaScript関数、LLMジャッジ用のプロンプト、またはその両方を受け取れる。失敗が決定論的なら、まずは関数を使う。安く、速く、挙動も謎めいていない。

ルートの正解率にジャッジモデルは要らない。JSONをパースして、1つのフィールドを比較すればよい。

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

華やかさのないスコアラーだ。そこが重要なのだ。

ルーターが有効なJSONを安定して出力できず、小さなテストセットで明らかな専門ルートすら選べないなら、本番トラフィックを任せる理由はない。存在論を採点する哲学者モデルなど必要ない。必要なのは、電池の入った火災報知器だ。

## まずは小さな評価ループを回す

[`runEvals`](https://mastra.ai/reference/evals/run-evals)は、高速なループだ。対象、テストケース、スコアラー、同時実行数を渡す。対象に対してデータを実行し、集計スコアを返す。

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

プロンプトを変更するとき、ルートを追加するとき、あるいはより安価なルーターモデルを試すときに回すのが、このループだ。

成熟したシステムには、これだけでは足りない。だが、最も恥ずかしい退行を防ぐには十分だ。「ルーターのプロンプトを変更したら、分類タスクをプレミアムなコードモデルに送り始めた」というやつである。

軸は分けておくこと。ルートの正解率と最終回答の品質は別のスコアだ。JSONの有効性、許可されたツール、トレーサビリティにも、それぞれ専用のチェックを持たせる。「品質」という1つの数値にまとめてはいけない。平均値は、役に立つ失敗が引退していく場所だ。

## LLMジャッジは、使う価値がある箇所にだけ追加する

ルーティングには、正当に判断が難しいケースもある。

```text
Read these logs and tell me why the deploy failed.
```

これはデバッグなので `code` だろうか。ログがあるので `long-context` だろうか。ユーザーが要約を求めているので `general` だろうか。適切なルートは、利用できるツールと、プロダクトが何を約束しているかによって変わる。

ここで役に立つのがLLMジャッジだ。ただし、厳密なルーブリックを用意すること。Mastraのscorerは、関数ステップとプロンプトオブジェクトのステップを組み合わせられる。構造の検証には関数を使い、本当に判断が必要な部分だけをジャッジに任せる。

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

このscorerはジャッジモデルを呼び出すため、コストがかかる。判断に価値があるなら、それでいい。

JSONをパースできるかどうかの確認に、これを使ってはいけない。

## 良いケースをデータセットに昇格させる

最初のうちは、ハードコードしたeval配列で十分だ。やがて例はプロダクト資産になる。顧客から届いた失敗チケット、妙なサポート会話、プロンプトインジェクションの試行、先週木曜までは正しくルーティングされていたリクエスト。

そういうものは、データセットに入れる。

Mastraのデータセットは、テストケースをバージョン管理するコレクションだ。変更を加えるたびに新しいバージョンが作られるため、モデルについて判断した時点とまったく同じケースセットで、実験を再実行できる。

データセットには永続化が必要なので、まずストレージを設定する。

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

次に、データセットを作成してケースを追加する。

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

データセットができると、evalケースは使い捨てのスクリプトデータではなくなる。ID、バージョン、履歴、実験結果を持つようになる。

この段階で、evalは「プロンプト用のテストファイル」ではなく、プロダクトの記憶として感じられるようになる。

## ルーターに対して実験を実行する

データセットを用意したら、[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment)で、登録済みのエージェント、ワークフロー、またはscorerに対して実行できる。

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

ここで会話の内容が変わる。

「新しいルーターのほうが良さそうだ」ではなく、次のように言えるようになる。

- 旧ルーターのルート精度は `0.94` だった。
- 新ルーターは `0.98` だった。
- 長いコンテキストのルーティングは改善した。
- コードレビューの2ケースでは退行した。
- プレミアムモデルへの引き継ぎは18%減った。
- ルーターのレイテンシーは300ms増えた。

これがエンジニアリングの会話だ。トレードオフがテーブルに載っていて、その交換条件に見合うかどうかを判断できる。

## 本番の挙動をスコアリングする。ただし、正解データと混同しない

Mastraでは、エージェントやワークフローのステップにスコアラーを直接追加することもできる。ライブスコアラーは非同期で実行され、設定したデータベースに結果を保存する。また、サンプリングにも対応しているため、意図していない限り、本番のすべてのレスポンスをスコアリングせずに済む。

便利だ。ただし、別の仕事だ。

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

ライブスコアリングによって、ルーターが今も有効な意思決定を出力しているかが分かる。不正な形式の出力、有害なコンテンツ、禁止されたツール呼び出し、根拠マーカーの欠落、そして不自然に低い信頼度を検出できる。

ただし通常、ルート精度までは分からない。本番トラフィックには、正解データがあらかじめ添付されて届くわけではないからだ。

ライブスコアリングはモニタリングだ。データセット実験は管理されたテストだ。両方が必要になる。答える問いが違う。

## ルート精度の次に測るもの

ルート精度は最初の段階だ。リクエストが期待した専門ルートに到達したことは分かる。しかし、その専門ルートが良い仕事をしたかどうかは何も分からない。

ルーターが基本を通過したら、システムを層に分けてスコアリングする。

| 層 | スコアリング対象 | 重要な理由 |
|---|---|---|
| ルーターの判断 | 選択されたルート、信頼度、理由 | 誤分類や不適切なエスカレーションルールを検出する |
| 軌跡 | 期待されるツールまたはエージェントの順序 | 「答えは正しいが、経路が間違っている」挙動を検出する |
| 専門ルートの出力 | 正確性、忠実性、有用性 | 正しいルーティングの後に発生する低品質な処理を検出する |
| コストとレイテンシー | モデル選択、トークン数、実行時間 | 高コストまたは低速な成功を検出する |
| 安全性とスコープ | 許可されたツール、拒否の境界、根拠 | プロダクトリスクにつながる失敗を検出する |

`runEvals` は、エージェント単位、ワークフロー単位、ステップ単位、軌跡スコアラーの設定に対応している。つまり、最終回答だけが唯一の成果物であるかのように扱う必要はない。

ワークフローでは、次のような形になる。

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

本番のエージェントに対して、私が持っていてほしいメンタルモデルはこれだ。

判断をスコアリングする。経路をスコアリングする。回答をスコアリングする。

回答だけをスコアリングすると、モデルは偶然に通過できてしまう。

## ルーターは時間とともに、もっと退屈になるべきだ

最初のルーティングプロンプトは、たいてい判断の寄せ集めを一段落に詰め込んだものになる。プロトタイプなら、それでいい。

evalsから学びを得るにつれて、ルーターの一部は魔法のように振る舞わなくなっていくはずだ。

- 明確な字句上のケースは、決定論的なルールにする。
- リスクの高いタスクには、明示的な承認またはワークフロー分岐を要求する。
- 曖昧なタスクでは、推測せず確認質問を返す。
- コストの高い経路には、より高い確信度、または別のシグナルを要求する。
- 既知の失敗ケースは、データセットの項目にする。

目標は、ルーターを永遠に「賢く」することではない。システムを推論しやすくすることだ。

そのために必要なのが、より良いモデルのこともある。プロンプトを絞り込むことのこともある。ワークフローのステップ、scorer、上限値、あるいは月に数千ドルを節約してくれる退屈な `if` 文であることもある。

これが、振る舞いを測定する意味のすべてだ。好みを根拠に言い争うのをやめ、証拠を根拠に議論できるようになる。

## 実践的なスタート地点のチェックリスト

今日Mastraのルーターを構築するなら、まずはここから始める。

1. ユーザーに見せない場合でも、ルーティングの判断を構造化する。
2. 有効なJSON、期待される経路、禁止された経路について、決定論的なscorerを書く。
3. ルーターのプロンプトやモデルを変更する前に、10〜20件のケースで `runEvals` を使う。
4. 実際の失敗を、バージョン管理されたデータセットに昇格させる。
5. 意味のあるプロンプト、モデル、経路、またはワークフローの変更について、データセット実験を実行する。
6. 低コストな本番不変条件のために、ライブscorerを追加する。
7. 実験は平均スコアだけでなく、経路ごとに比較する。

平均値より重要なのは、失敗のまとまりだ。

リグレッションがすべて長文コンテキストのポリシー統合で起きているなら、「ルーターが悪化した」のではない。経路の境界に問題がある。失敗例がすべて特定のツールを使っているなら、問題はツールの契約にある。安価なモデルが同じ2つの曖昧なケースで毎回失敗するなら、必要なのはより高価なデフォルトモデルではなく、エスカレーションのロジックだ。

ここでevalsが役に立つ。evalsは儀式でもなければ、一時的に全員を大人になった気分にさせるダッシュボードでもない。システムのどの部分が失敗しているかを示してくれるので、全体ではなく、その部分を直せる。

## リソース

- [Mastra scorersの概要](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer`リファレンス](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals`リファレンス](https://mastra.ai/reference/evals/run-evals)
- [Mastraデータセットの概要](https://mastra.ai/docs/evals/datasets/overview)
- [Mastraデータセット実験](https://mastra.ai/docs/evals/datasets/running-experiments)
- [モデルと心中するな](/llm-routing-mastra-ai)
- [Evalsで邪悪に立ち向かえ！](/llm-evals-are-broken)
````
