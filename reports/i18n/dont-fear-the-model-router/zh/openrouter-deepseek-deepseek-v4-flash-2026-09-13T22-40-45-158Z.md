# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/zh/index.mdx
- Validation: deferred
- Runtime seconds: 76.81
- Input tokens: 11799
- Output tokens: 8814
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.001215
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 别怕模型路由器
subTitle: 自信通往最佳模型。
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
[不要对你的模型许下终身](/llm-routing-mastra-ai) 这篇文章做了个显而易见的论证：别再因为某个模型在上一轮评测中胜出，就把所有任务都丢给它。

便宜模型干便宜活儿。真正难的任务才用更强模型。路由层要保持松散，这样切换供应商时，你的代码库不至于变成一个神龛。

这个方向是对的。

但也不完整。

一旦你加上一个路由器，你就多了一个需要测试的系统行为。问题不再是“哪个模型最好？”，而是“系统是否选择了正确的路由、使用了正确的工具、保留了正确的证据、并在正确时机停止？”

如果你不量化这些，你的模型路由器就只是“感觉”加一张调度表。

<p class="inset">
路由器不是答案。路由器是关于你的系统应该如何行为的假设。
</p>

Mastra 提供了让这个假设变得可测试的接口：[评分器](https://mastra.ai/docs/evals/overview)、[`runEvals`](https://mastra.ai/reference/evals/run-evals)、[数据集](https://mastra.ai/docs/evals/datasets/overview) 和 [实验](https://mastra.ai/docs/evals/datasets/running-experiments)。这些名字听起来像是评测基础设施，也确实如此。但真正的价值更简单：它们让智能体的行为变得可见，甚至可以用来争论。

## 我们在测试什么？

之前那篇文章中的路由器有三条专长路由：

| 路由 | 应该去哪里的任务 | 去了就会出问题的任务 |
|---|---|---|
| `code` | 实现、重构、调试、代码审查 | 长上下文摘要、简单分类 |
| `long-context` | 杂乱的文档、转录文本、策略综合、大量文件 | 短小机械的格式化 |
| `general` | 分类、格式化、简单问答、无聊的信息提取 | 困难的代码或依赖证据的分析 |

这个表格是个起点，但还不是一个评测。

一次评测需要示例和评分器：

| 组件 | 作用 |
|---|---|
| 数据集条目 | “这是一个有代表性的请求。” |
| 真实答案 | “这是我们期望的路由或行为。” |
| 评分器 | “这是我们判断输出是否通过的规则。” |
| 实验 | “这次运行的结果，可以拿来和以后的运行比较。” |

关键一步是测试行为，而不仅仅是文本质量。

一个模型选错了专长路由，也可能写出漂亮的回答。一个安全智能体可能生成一份看起来靠谱的报告，但没有保留证据。一个客服智能体可能语气很共情，却跳过了退款政策检查。段落是可见的部分，但轨迹才是 bug 藏身之处。

对于路由器，我通常从四个维度入手：

| 维度 | 问题 | 示例评分器 |
|---|---|---|
| 质量 | 它是否选择了正确的路由并产生了有用的结果？ | 路由准确性、答案完整性、忠实度 |
| 成本 | 它是否避免了在无聊的任务上使用高级模型？ | 所选路由的成本类别、token 预算 |
| 速度 | 它是否在产品可接受的延迟内完成？ | 运行时间或超时评分器 |
| 其他 | 它是否遵守了安全、隐私和可观测性约束？ | 工具白名单、证据保留、拒绝行为 |

最后一行很重要。“Other” 这一列才是生产环境下真正会踩到的坑。

## 让路由决策变得可打分

如果路由器只输出最终答案，那你只能靠猜来推断它的决策过程。你能评价输出结果，但没法判断路由本身对不对。

所以给路由步骤一个结构化的契约：

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

用户永远不需要看到这个 JSON。它可以是一个内部步骤、工作流交接或追踪跨度。评分器只需要能访问它就行。

下面是一个故意写得很小的 Mastra agent，它只做一件事——选择路由：

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `选择最适合用户请求的专业路由。

只返回 JSON：
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

路由规则：
- code：实现、重构、调试、代码审查、API、测试
- long-context：大型文档、会议记录、策略汇总、多文件
- general：分类、格式化、提取、简单问答

不要回答用户请求。只选择路由。`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

没错，这有点刻意。很好。评测奖励的就是这种清晰的分界。

让决策显式化之后，你就可以在下游专业模型运行之前测试路由。路由失败不会再隐藏在选择模型、提示词、工具或最终答案评分器的失败中。

## 写一个能抓住平凡错误的评分器

Mastra 的 [`createScorer`](https://mastra.ai/reference/evals/create-scorer) 支持纯 JavaScript 函数、LLM 评判提示，或者两者结合。只要错误是确定性的，就优先用函数。它们更便宜、更快，也更不容易出幺蛾子。

路由准确率不需要评判模型。只需要解析 JSON 并比较一个字段。

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
  description: "检查路由器是否输出了有效的决策对象。",
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
    score === 1 ? "有效的路由决策。" : "路由输出不是有效的 JSON。",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "检查选择的路由是否与 ground truth 匹配。",
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
      ? `选择了期望路由：${expected.route}。`
      : `期望 ${expected.route}，实际得到 ${decision.route ?? "无"}。`;
  });
```

这个评分器并不光彩。这正是重点。

如果路由器连一个小测试集都不能稳定输出有效 JSON 并选出显而易见的专业模型，那就没有理由信任它会处理生产流量。你不需要一个哲学家模型来评判本体论。你需要一个装了电池的烟雾报警器。

## 先跑小规模评测循环

[`runEvals`](https://mastra.ai/reference/evals/run-evals) 是快速循环。给它目标、测试用例、评分器和并发限制。它会针对数据运行目标并返回聚合分数。

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
    input: "重构这个 React 组件，消除重复的状态。",
    groundTruth: { route: "code" },
  },
  {
    input: "总结这 14 份面试笔录，找出反复出现的反对意见。",
    groundTruth: { route: "long-context" },
  },
  {
    input: "将这个工单分类为：计费、技术、账号或其他。",
    groundTruth: { route: "general" },
  },
  {
    input: "调试一个只在 CI 中失败的 Playwright 测试。",
    groundTruth: { route: "code" },
  },
  {
    input: "从这段简短的段落中提取续订日期和合同金额。",
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
  throw new Error("路由器输出了无效的决策 JSON。");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("路由准确率低于 90%。");
}
```

这就是你在修改提示词、添加路由或尝试更便宜的路由模型时要跑的循环。

对于一个成熟的系统来说，这还不够。但这足以防止最令人难堪的回退：“我们改了路由器提示词，结果它开始把分类任务送到付费高级代码模型去了。”

把各个维度分开。路由准确率和最终答案质量是两套分数。JSON 格式有效性、允许的工具和可追溯性各自有自己的检查。不要把它们揉进一个“质量”数字里。平均值是让有用的失败退休养老的地方。

## 只在值得投入的地方添加 LLM 评判器

有些路由场景本身就模棱两可：

```text
Read these logs and tell me why the deploy failed.
```

这是 `code`（代码），因为涉及调试？`long-context`（长上下文），因为包含了日志？还是 `general`（通用），因为用户要求的是总结？正确的路由取决于可用的工具和产品所承诺的能力。

这正是 LLM 评判器发挥作用的地方，但前提是要有严格的评分准则。Mastra 的评分器可以混合使用函数步骤和提示对象步骤。用函数来定义结构，然后用评判器来处理真正需要判断的部分。

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

这个评分器需要花钱，因为它调用了评判模型。只要判断本身值得投入，这笔费用就是合理的。

不要用它来检查 JSON 是否能解析。

## 把好的用例纳入数据集

一开始，硬编码的评估数组完全够用。但慢慢地，你的用例会变成产品资产：失败的客户工单、奇怪的客服对话、提示注入的尝试、直到上周四还路由正确的请求。

这些应该放进数据集。

Mastra 的数据集是版本化的测试用例集合。每次修改都会创建一个新版本，这样你就可以在做出模型决策时，用当时存在的精确用例集重新运行实验。

数据集需要持久化，所以先配置存储：

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

然后创建数据集并添加用例：

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

一旦有了数据集，评估用例就不再是一次性脚本数据。它们有了 ID、版本、历史记录和实验结果。

这时，评估就不再像是“提示词的测试文件”，而更像是产品记忆。

## 针对路由器运行实验

有了数据集，[`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) 可以针对已注册的 agent、工作流或评分器运行它。

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

现在，讨论的基调变了。

不再是“新路由器似乎更好”，你可以说：

- 旧路由器路由准确率得分 `0.94`。
- 新路由器得分 `0.98`。
- 长上下文路由有改进。
- 有两个代码审查案例出现回退。
- 高级模型移交次数减少 18%。
- 增加 300ms 路由器延迟。

这是一场工程对话。摆上台面的是各种权衡，你可以判断这笔交易是否值得。

## 对线上行为打分，但别把它当作事实真相

Mastra 也可以将评分器直接挂接到智能体和工作流步骤上。线上评分器是异步运行的，结果存入已配置的数据库，并且支持采样，这样你就不必对每个生产响应都评分——除非有意为之。

有用。但这是另一码事。

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

线上评分告诉你路由器仍在输出有效的决策。它能捕获格式异常的输出、有害内容、被禁止的工具调用、缺失的证据标记以及异常低的置信度。

但它通常无法告诉你路由准确率，因为生产流量不会带着事实真相一起到来。

线上评分是监控。数据集实验是受控测试。两者你都需要。它们回答的是不同的问题。

## 路由准确率之后该测量什么

路由准确率是第一级台阶。它告诉你请求是否到达了预期的专家。但它完全没有说明该专家是否做出了好成绩。

一旦路由器通过基础测试，就需要按层次对系统进行评分：

| 层次 | 评分内容 | 为什么重要 |
|---|---|---|
| 路由器决策 | 所选路由、置信度、理由 | 捕捉误分类和糟糕的升级规则 |
| 轨迹 | 预期的工具或智能体调用序列 | 捕捉“答案对但路径错”的行为 |
| 专家输出 | 正确性、忠实度、有用性 | 捕捉路由正确但产出质量低的情况 |
| 成本与延迟 | 模型选择、Token数、运行时 | 捕捉昂贵或缓慢的“赢家” |
| 安全与范围 | 允许的工具、拒绝边界、证据 | 捕捉产品风险级别的故障 |

`runEvals` 支持在智能体级别、工作流级别、步骤级别和轨迹级别配置评分器，这样你就不必假装最终答案是唯一的工件。

对一个工作流来说，其结构如下所示：

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

这就是我希望生产环境中的智能体能拥有的思维模型：

给决策打分。给路径打分。给答案打分。

如果你只给答案打分，模型有可能靠蒙混过关。

## 路由器应该随着时间的推移变得更无趣

第一个路由提示通常是一段判断性的段落。原型阶段没问题。

随着评估教会你东西，路由器的一些部分应该变得不那么神奇：

- 明确的词法情况变成确定性规则。
- 高风险任务需要明确批准或工作流分支。
- 模糊的任务提出一个澄清问题，而不是猜测。
- 代价高昂的路由需要更高的置信度或第二个信号。
- 已知的失败案例成为数据集项目。

目标不是让路由器一直“更聪明”。目标是让系统更容易推理。

有时这意味着更好的模型。有时是更精确的提示。有时是一个工作流步骤、一个评分器、一个硬上限，或者一个每月能节省你四位数的无聊 `if` 语句。

这就是度量行为的全部意义。你不再凭直觉争论，而是开始凭证据争论。

## 实用入门清单

如果你今天正在构建一个 Mastra 路由器，从这里开始：

1.  使路由决策结构化，即使使用者从未看到它。
2.  为有效的 JSON、期望的路由和禁止的路由编写确定性的评分器。
3.  在更改路由器提示或模型之前，使用 10 到 20 个案例运行 `runEvals`。
4.  将真实失败提升为带版本的数据集。
5.  对有意义的提示、模型、路由或工作流更改运行数据集实验。
6.  为廉价的生产不变性添加实时评分器。
7.  按路由比较实验，而不仅仅是按平均得分。

平均值不如失败聚集重要。

如果每个回归都在长上下文策略合成中，你并没有“一个更差的路由器”。你有一个路由边界问题。如果每个失败的案例都使用一个特定的工具，你有一个工具契约问题。如果每个廉价模型都失败在同样的两个模糊案例上，你需要升级逻辑，而不是一个更昂贵的默认值。

这就是评估变得有用的地方。它们不是一种仪式，也不是让每个人都暂时感到成熟的仪表盘。它们向你展示系统的哪个部分在失败，这样你就可以修复那个部分，而不是整个系统。

## 资源

- [Mastra 评分器概述](https://mastra.ai/docs/evals/overview)
- [Mastra `createScorer` 参考](https://mastra.ai/reference/evals/create-scorer)
- [Mastra `runEvals` 参考](https://mastra.ai/reference/evals/run-evals)
- [Mastra 数据集概述](https://mastra.ai/docs/evals/datasets/overview)
- [Mastra 数据集实验](https://mastra.ai/docs/evals/datasets/running-experiments)
- [不要与你的模型结婚](../llm-routing-mastra-ai)
- [用评估对抗弊端](../llm-evals-are-broken)
````
