# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: ja
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 152.16
- Input tokens: 12787
- Output tokens: 14276
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.005471
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale ja --skip-global (code 1)
## Raw Output

````mdx
---
title: モデルルーターを恐れるな
subTitle: ''
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
「Don’t Marry Your Model」の初版はシンプルな主張をしていた。前回のベイクオフで勝ったからといって、すべてのタスクを同じモデルに送るのはやめよう、と。

安い仕事には安いモデルを使う。本当に難しい仕事には強力なモデルを使う。ルーティング層を柔軟に保ち、コードベースを聖地に変えずにプロバイダを切り替えられるようにする。

それは正しかった。しかし、不完全でもあった。

ルーターを追加すると、テストすべき新しいシステムの振る舞いが生まれるからだ。問いは「どのモデルが最適か」ではなくなる。「システムは正しいルートを選び、適切なツールを使い、適切な証拠を保持し、適切なタイミングで停止したか」が問われる。

それを測定しなければ、モデルルーターは単なるディスパッチテーブル付きの雰囲気（vibes）に過ぎない。

<p class="inset">
ルーターは答えではない。ルーターはシステムがどう振る舞うべきかについての仮説である。
</p>

Mastraは、その仮説をテスト可能なものに変えるための有用な表面を提供している。[scorers](https://mastra.ai/docs/evals/overview)、[`runEvals`](https://mastra.ai/reference/evals/run-evals)、[datasets](https://mastra.ai/docs/evals/datasets/overview)、[experiments](https://mastra.ai/docs/evals/datasets/running-experiments)だ。API名は評価基盤のように聞こえるが、それはその通りだ。しかし実際の価値はもっとシンプルだ。

エージェントの振る舞いを、議論できるほど可視化する。

## 何をテストするのか

前回の記事のモデルルーターには、3つの明確な専門ルートがある。

| ルート | 何を入れるべきか | 悪いルートの例 |
|---|---|---|
| `code` | 実装、リファクタリング、デバッグ、コードレビュー | 長文要約、単純分類 |
| `long-context` | 乱雑な文書、トランスクリプト、ポリシー合成、多数のファイル | 短い機械的なフォーマット |
| `general` | 分類、フォーマット、単純なQA、退屈な抽出 | 難しいコードや証拠を多用した分析 |

そのテーブルは出発点だが、評価（eval）ではない。

評価には例とスコアラーが必要だ。

| 項目 | 役割 |
|---|---|
| データセット項目 | 「これが代表的なリクエストです」 |
| グラウンドトゥルース | 「これが期待したルートまたは振る舞いです」 |
| スコアラー | 「これが出力が合格かどうかを判断する方法です」 |
| 実験 | 「これが将来の実行と比較できる実行です」 |

重要なのは散文の品質だけでなく、振る舞いをテストすることだ。

モデルは間違った専門家を選んだ後で美しい回答を書ける。セキュリティエージェントは証拠を保持せずにそれらしいレポートを生成できる。サポートエージェントは返金ポリシーのチェックを省きながら共感的に聞こえる。段落は目に見える部分だ。軌跡（trajectory）にバグが潜んでいる。

ルーターの場合、私は通常4つの軸から始める。

| 軸 | 問い | スコアラーの例 |
|---|---|---|
| 品質 (Quality) | 適切なルートを選択し、有用な結果を生成したか？ | ルート精度、回答の完全性、忠実性 |
| コスト (Cost) | 退屈な作業に対してプレミアムモデルを避けたか？ | 選択されたルートのコスト区分、トークン予算 |
| 速度 (Speed) | プロダクトのレイテンシ予算内に完了したか？ | 実行時間またはタイムアウトスコアラー |
| その他 (Other) | セキュリティ、プライバシー、可観測性の制約を守ったか？ | ツール許可リスト、証拠保存、拒否動作 |

最後の列が重要だ。「Other」こそ、プロダクションの「傷跡」が潜む場所である。

## ルーターの決定をスコア可能にする

ルーターが最終的な回答だけを出力する場合、なぜそのように振る舞ったのかを知るのは難しい。出力をスコアリングすることはできるが、決定については推測に過ぎない。

評価では、ルーティングステップに小さな構造化された契約を与える。

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

プロダクションシステムは、このJSONをユーザーに表示する必要はない。内部ステップ、ワークフローのハンドオフ、トレーススパンとして使えばよい。スコアラーに必要なのは、評価対象となる表面（surface）だけだ。

以下は、ルートを選択するMastraエージェントの意図的に小さな例である。

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

そう、これは少し作為的だ。それでいい。評価（eval）は「つまらない継ぎ目」に報いる。

ルーターの決定が明示的になれば、ダウンストリームの専門家をテストする前にルートをテストできる。これにより、問題がルーターなのか、選択されたモデルなのか、プロンプトなのか、ツールの表面なのか、最終回答のスコアラーなのかを特定できる。

## つまらない失敗を捉えるスコアラーを書く

Mastraの[`createScorer`](https://mastra.ai/reference/evals/create-scorer)は、JavaScript関数、LLM judgeプロンプト、またはその両方を使用できる。失敗が決定的に判別できる場合は、まず関数から始めよう。関数の方が安価で、高速で、謎が少ない。

ルート精度の場合、judgeモデルは必要ない。JSONをパースして1つのフィールドを比較すればよい。

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

そのスコアラーは華やかではない。それが肝心だ。

ルーターが小さなテストセットに対して一貫して有効なJSONを生成し、明らかな専門家を選べないのであれば、プロダクショントラフィックを任せる理由はない。哲学者モデルによるオントロジー評価は不要だ。必要なのは、電池の入った煙警報器に相当するものだ。

## 小さな評価ループを最初に実行する

Mastraの[`runEvals`](https://mastra.ai/reference/evals/run-evals)は高速ループである。ターゲット、テストケース、スコアラー、同時実行数の制限を与える。データに対してターゲットを実行し、集計スコアを返す。

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

これは、プロンプトを変更したり、新しいルートを追加したり、より安価なルーターモデルを試したりするときに実行するループである。

成熟したシステムには十分ではないが、最も恥ずかしい後退（リグレッション）を防ぐには十分だ。「ルータープロンプトを変更したら、分類タスクをプレミアムコードモデルに送るようになった」という事態を避けられる。

コスト、速度、品質、その他はすべてここに現れる：

- コスト：ルーターモデルは、精度が保たれている限り、安価なままでよい。
- 速度：評価（eval）は、ハーネス内でタイムアウトを強制したり、レイテンシを記録したりできる。
- 品質：ルート精度と最終回答品質は別々のスコアとする。
- その他：JSONの妥当性、許可されたツール、安全性、トレーサビリティはそれぞれ独自のチェックを持つ。

これらすべてをひとつの「品質」スコアにまとめてはいけない。平均値は、有用な障害が引退しに行く場所だ。

## LLMジャッジは、本当に価値がある場面にだけ導入する

ルーターの動作には主観的なものもある。リクエストが正当に曖昧な場合がある：

```text
Read these logs and tell me why the deploy failed.
```

これは`code`（デバッグだから）なのか、`long-context`（ログだから）なのか、`general`（要約だから）なのか。正しいルートは、ツールの表面と製品の約束事に依存する。

ここでLLMジャッジが役立つが、厳密なルーブリックがあってこそだ。Mastraのスコアラーは、関数ステップとプロンプトオブジェクトステップを混在させることができる。構造には関数を使い、本当に判断が必要な部分だけにジャッジを使う。

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

このスコアラーはジャッジモデルを呼び出すため、コストがかかる。判断に価値がある場面では、それで問題ない。

JSONがパースできるかどうかを確認するためにこれを使ってはいけない。

## 良質なケースをデータセットに昇格させる

ハードコードされたeval配列でも、最初のうちは問題ない。しかし、やがてあなたの事例は製品資産になる。失敗したカスタマーチケット、奇妙なサポート会話、プロンプトインジェクションの試み、先週の木曜日までは正しくルーティングされていたリクエスト。

それらはデータセットに属する。

Mastraのデータセットは、テストケースのバージョン管理されたコレクションである。各変更は新しいバージョンを作成する。つまり、モデルに関する決定を下した時点で存在していた正確なケースセットに対して、実験を再実行できる。

まずストレージを設定する。データセットは永続化を必要とするからだ：

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

次にデータセットを作成し、ケースを追加する：

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

データセットを持った瞬間、evalケースを捨てるだけのスクリプトデータとして扱うのをやめられる。それらにはID、バージョン、履歴、実験結果が備わるのだ。

それが、評価（eval）が「プロンプト用のテストファイル」というより「製品の記憶」に感じられ始める瞬間だ。

## ルーターに対して実験を実行する

データセットができたら、[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) を使って、登録済みのエージェント、ワークフロー、またはスコアラーに対して実行する。

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

これで会話の質が変わる。

「新しいルーターのほうが良さそう」ではなく、次のように言えるようになる。

- 旧ルーターのルート精度スコアは `0.94` だった。
- 新ルーターの総合スコアは `0.98` だった。
- 長いコンテキストのルーティングが改善された。
- コードレビューケースが2件、後退した。
- プレミアムモデルへのハンドオフが18%削減された。
- ルーターのレイテンシが300ms増加した。

これこそがエンジニアリングの会話だ。トレードオフがあり、その交換が妥当かどうかを判断できる。

## 本番挙動のスコアリングと、正解データとの混同を避ける

Mastraでは、エージェントやワークフローのステップに直接スコアラーをアタッチすることもできる。本番スコアラーは非同期で実行され、スコア結果を設定済みデータベースに保存する。サンプリング制御も可能なので、意図しない限り全プロダクション応答をスコアリングすることはない。

これは便利だが、別の役割だ。

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

本番スコアリングは、ルーターが依然として妥当な判断を出力していることを教えてくれる。不正な出力、有害なコンテンツ、禁止されたツール呼び出し、欠落したエビデンスマーカー、不審な低信頼度などを検出できる。

しかし、通常はルートの精度を教えてくれない。なぜなら、本番トラフィックには正解データが付属していないからだ。

この違いは重要だ。本番スコアリングは監視である。データセット実験は制御されたテストである。両方必要だが、それぞれ異なる問いに答える。

## ルート精度の次に測定すべきこと

ルート精度は最初の段階だ。リクエストが期待する専門家に届いたかどうかを教える。しかし、専門家が良い仕事をしたかどうかは教えない。

ルーターが基本をパスしたら、システムを階層ごとにスコアリングする。

| レイヤー | スコアリング対象 | なぜ重要か |
|---|---|---|
| ルーターの判断 | 選択されたルート、信頼度、理由 | 誤分類や悪いエスカレーションルールを捕捉する |
| 軌跡 | 期待されるツールやエージェントの順序 | 「正解だが経路が間違っている」動作を捕捉する |
| 専門家の出力 | 正確性、忠実性、有用性 | 正しいルーティング後の低品質な作業を捕捉する |
| コストとレイテンシ | モデル選択、トークン数、実行時間 | 高コストや低速な勝利を捕捉する |
| 安全性とスコープ | 許可されたツール、拒否境界、エビデンス | プロダクトリスクの障害を捕捉する |

Mastraの `runEvals` API は、エージェント・ワークフロー・ステップ・軌跡の各スコアラー構成をサポートしている。つまり、最終回答だけが唯一の成果物であるかのように振る舞う必要はない。

ワークフローの場合、次のような形になる。

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

これが、私がプロダクションのエージェントに求めるメンタルモデルだ。

意思決定をスコアする。パスをスコアする。回答をスコアする。

回答だけをスコアしても、モデルは偶然うまくいく可能性がある。

## ルーターはやがて退屈になるべきだ

最初のルーティングプロンプトは、通常は判断の連続だ。プロトタイプではそれで構わない。

評価から学ぶにつれて、ルーターの一部は魔法のようではなくなるべきだ。

- 明確な字句パターンは決定論的ルールにできる。
- リスクのあるタスクは明示的な承認やワークフローの分岐を必要とする。
- 曖昧なタスクは推測ではなく、確認の質問をすべきだ。
- コストの高いルートはより高い確信度や第二のシグナルを必要とする。
- 既知の失敗ケースはデータセットに追加できる。

目標はルーターを永遠に「賢く」することではない。目標はシステムの推論を容易にすることだ。

時にはそれはより優れたモデルを意味する。時にはより厳密なプロンプトを意味する。時にはワークフローのステップ、スコアラー、ハードキャップ、あるいは月々4桁のコストを節約する退屈な`if`文を意味する。

それが行動を測定する意義のすべてだ。好みによる議論をやめ、証拠に基づく議論を始める。

## 実践的なスタートチェックリスト

今日Mastraのルーターを構築するなら、以下のポイントから始めることを勧める。

1. ルーティングの判断を構造化する。ユーザーがそれを見ることがなくても。
2. 有効なJSON、期待されるルート、禁止ルートに対する決定論的スコアラーを書く。
3. ルータープロンプトやモデルを変更する前に、10〜20ケースで`runEvals`を使用する。
4. 実際の失敗をバージョン管理されたデータセットに昇格させる。
5. 意味のあるプロンプト、モデル、ルート、ワークフローの変更に対してデータセット実験を実行する。
6. 安価なプロダクション不変条件のためにライブスコアラーを追加する。
7. 実験は平均スコアだけでなく、ルートごとに比較する。

平均よりも重要なのは失敗のクラスターだ。

すべての回帰が長文脈ポリシー合成にあるなら、それは「ルーターが悪化した」わけではない。ルート境界の問題だ。すべての失敗ケースが特定のツールを使用しているなら、ツール契約の問題だ。すべての安価なモデルが同じ2つの曖昧なケースで失敗するなら、より高価なデフォルトではなくエスカレーションロジックが必要かもしれない。

ここで評価が有用になる。儀式としてではなく。一時的に大人になった気分にさせるダッシュボードとしてでもない。

システムの形状を見つける手段として。

## リソース

- [Mastra Scorers 概要](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer` リファレンス](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals` リファレンス](https://mastra.ai/reference/evals/run-evals)
- [Mastra データセット概要](https://mastra.ai/docs/evals/datasets/overview)
- [Mastra データセット実験](https://mastra.ai/docs/evals/datasets/running-experiments)
- [モデルと結婚するな](../llm-routing-mastra-ai)
- [評価で悪と戦え！](../llm-evals-are-broken)
````
