# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/zh/index.mdx
- Validation: deferred
- Runtime seconds: 30.00
- Input tokens: 6490
- Output tokens: 4727
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.002127
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 评估制恶！
subTitle: 基准测试衡量基准。你的系统需要自己的度量。
date: '2026-05-01'
modified: '2026-05-06'
tags:
  - ai
  - llm
  - evals
  - testing
  - production
  - quality
  - observability
category: AI
subCategory: Engineering
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
每一款新模型登场时，都披着一身基准测试的燕尾服。

MMLU：92.4%。HumanEval：87.2%。LLeMU：88.7%。MATH：73.6%。AGI：127%！

然而，对于99%用AI构建流程与产品的企业来说，**这些统统无关紧要。**

真正重要的是什么？你的工作负载表现如何？是在变好还是变差？唯一靠谱的衡量方式，就是编写能反映你系统具体任务、数据和失败模式的Evals（LLM测试）。

<blockquote class="breakout">
  <p>基准测试没有撒谎，它们只是在回答别人的问题。</p>
</blockquote>

---

## “凭感觉评估”的实际代价

标准做法：上线一个模型变更，盯着投诉渠道，如果抱怨声变大就回滚。

这种做法几乎漏掉了所有关键信息：

**你只能捕捉到明显的失败。** 那些得到自信错误答案却没意识到的用户？静默。那些得到更差答案后直接放弃功能的用户？静默。支持工单和错误率只能捕获质量退化的一小部分。

**你无法区分退化与改进。** 如果新模型在任务A上更好，在任务B上更差，那么关于B的抱怨看起来和笼统的“AI变差了”的反馈一模一样。你根本不知道要修复什么。

**你在把用户当成测试基础设施。** 他们可没同意过这个。

---

## 评估光谱（以及大多数团队错在哪里）

评估方法分布在一个从“快速但脆弱”到“昂贵但有效”的光谱上。

<figure class="breakout">

![一张光谱图，比较确定性检查、LLM作为评判者和人工评估在速度、成本和有效性上的差异。](../eval-spectrum.svg)

<figcaption>使用能诚实捕捉失败的最廉价评估方法。</figcaption>
</figure>

**LLM作为评判者** 是当前的热门：让一个强大的模型去给另一个模型的输出打分。快速、可扩展、廉价。问题在于：它内嵌了评判模型的偏见，可以被操纵，并且形成了循环依赖。如果你用GPT-5来给GPT-5的输出打分，你实际上是在测量“GPT-5与GPT-5的共识程度”。这并非毫无意义，但绝不是你以为的那样。

**人工评估** 是每个人都想跳过的黄金标准。让人来评估输出既昂贵又缓慢，不同评估者之间不一致，而且安排起来很烦人。但它是唯一能验证你的系统对真实人类是否有用的方法。

**任务特定的自动化检查**是大多数团队应该投入更多时间的地方。它们并不光鲜，但快速、确定性强，并且与系统中真正重要的东西紧密相关。

---

## 真正有效的方法

### 1. 在发布前定义失败

在更改模型或提示词之前，写下什么样子算是糟糕。要具体。

不是“输出应该准确”。那不是测试。更像是：

- 结构化的JSON输出必须能无错误解析
- 响应中的所有引用必须逐字出现在检索到的上下文中
- 响应不得提及竞争对手产品名称
- SQL查询必须在语法上有效，并且只引用模式中存在的表
- 情感分类在现有测试集上从正面翻转到负面的比例不得超过3%

你可以通过编程方式检查这些。不需要评判模型。

**评估框架：确定性检查**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON must parse
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // No hallucinated citations — every claim must appear in context
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // Response length sanity check — catch truncation or runaway generation
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. 从你最糟糕的日子构建黄金测试集

你最好的评估数据是那些令人尴尬的东西：那些导致有人提交工单、截图幻觉、或者悄悄停止使用功能的输出。

每当用户报告糟糕的输出、标记幻觉，或者你手动注意到失败时，将其添加到你的黄金测试集中：输入、上下文和正确行为。保留50-100个案例，并在每次模型更改时运行它们。

起初这感觉很手动。六个月后，你就拥有了一套任何公开基准都无法作弊的测试套件，因为每个案例都来自你自己的失败历史。

<figure class="breakout">

![A workflow diagram showing how bad production incidents become golden cases, then CI eval runs, then blocked regressions or approved releases.](../golden-set-lifecycle.svg)

<figcaption>黄金测试集将令人尴尬的东西变成回归测试套件。</figcaption>
</figure>

**黄金案例结构**

```typescript
interface GoldenCase {
  id: string;
  input: string;
  context: Record<string, unknown>;
  expectedBehavior: {
    mustContain?: string[];
    mustNotContain?: string[];
    structureCheck?: (output: string) => boolean;
    minSimilarityToReference?: number; // cosine similarity to a reference answer
  };
  sourceIncident?: string; // link back to the bug report or ticket
}
```

### 3. 回归测试，而不仅仅是验收测试

大多数团队只在考虑模型更改时才运行评估。那是验收测试：“这个新东西够好吗？”

你还需要回归测试：“这是否破坏了之前能用的东西？”

对你的黄金测试集运行每一次提示词变更，而不仅仅是模型变更。一个原本运行良好的提示词，在你添加新工具、更改 RAG 检索策略或更新上下文模板时，可能会悄然退化。没有基线，你无从知晓。像 [Langfuse](https://langfuse.com/) 这样的工具会将评估分数附加到生产追踪上，这样退化就会显示在仪表盘中，而不仅仅出现在事件报告中。

<details>
<summary>评估框架：基线 vs 候选对比</summary>

```typescript
async function compareModelVersions(
  goldenCases: GoldenCase[],
  baselinePipeline: Pipeline,
  candidatePipeline: Pipeline
) {
  const results = await Promise.all(
    goldenCases.map(async (tc) => {
      const [baseline, candidate] = await Promise.all([
        baselinePipeline.run(tc.input, tc.context),
        candidatePipeline.run(tc.input, tc.context),
      ]);

      return {
        id: tc.id,
        baselinePassed: runEvals(baseline, tc.expectedBehavior),
        candidatePassed: runEvals(candidate, tc.expectedBehavior),
        regression: /* baseline passed */ && /* candidate failed */,
        improvement: /* baseline failed */ && /* candidate passed */,
      };
    })
  );

  const regressions = results.filter((r) => r.regression);
  const improvements = results.filter((r) => r.improvement);

  console.log(`Regressions: ${regressions.length} / ${goldenCases.length}`);
  console.log(`Improvements: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('Blocking regressions found:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

如果候选版本在已知的失败案例上出现退化，那么升级讨论就会变得非常具体：哪些案例改进了，哪些案例出问题了，以及这个权衡是否值得。

### 4. 将 LLM 作为评判者只用于一件事

LLM 作为评判者适用于没有确定性正确答案的开放式输出：“这个回复有帮助吗？”、“这个摘要保留了关键点吗？”、“这个解释对初学者来说合适吗？”

用它来做这些事。不要用它来做确定性答案。当你使用它时，请明确评分标准：

**评估框架：基于评分标准的评判者**

```typescript
async function judgeHelpfulness(
  userQuery: string,
  modelResponse: string
): Promise<{ score: number; reasoning: string }> {
  const judgePrompt = `
You are evaluating a customer support response.

User question: ${userQuery}
Response: ${modelResponse}

Rate the response on a scale of 1-5:
5 = Directly answers the question with accurate, actionable information
4 = Answers the question but could be more specific or actionable
3 = Partially addresses the question; key information is missing
2 = Tangentially related but doesn't answer the question
1 = Off-topic, factually wrong, or harmful

Respond with JSON: {"score": <number>, "reasoning": "<one sentence>"}
`;

  const result = await judgeModel.generate(judgePrompt);
  return JSON.parse(result);
}
```

明确的评分标准能降低评判者的方差，提供可解释的输出，并且更容易在评判者出错时进行审计。像 [Autoevals](https://github.com/braintrustdata/autoevals) 和 [Braintrust](https://www.braintrust.dev/) 这样的库为常见任务提供了预建的评分标准——在从头编写之前值得借鉴。

---

## 值得了解的工具

你不必从头构建所有这些东西。有几个工具在评估基础设施问题上取得了显著进展：

**[Braintrust](https://www.braintrust.dev/)** — 完整的评估平台，包含实验跟踪、数据集管理和评分函数。按提示词、模型和部署组织评估运行，这样你就能对质量进行随时间变化的差异分析，而不仅仅是跨版本的对比。与其开源库 **[Autoevals](https://github.com/braintrustdata/autoevals)** 配合良好，后者为常见任务（事实准确性、帮助性、毒性、语义相似度）提供了预建的模型评分函数。

**[Langfuse](https://langfuse.com/)** — 开源 LLM 可观测性工具，位于你的应用和模型之间。追踪每一次调用，将评估分数（人工或自动化）附加到单个跨度上，并在生产流量中展示质量趋势。如果你希望可观测性和评估在同一工具中，而不是单独的评估框架，这是一个不错的选择。

**[Evalite](https://www.evalite.dev/)** — 由 Matt Pocock 开发的 TypeScript 原生评估框架。低仪式感：定义一个任务，定义一个评分器，在你现有的测试设置中运行它。面向那些希望评估感觉像单元测试而不是单独的 ML 实验平台的团队。

**[promptfoo](https://www.promptfoo.dev/)** — 以 CLI 为主的评估运行器，专注于提示词比较和红队测试。通过 YAML 轻松配置，与大多数模型提供商集成，并内置了对检测提示注入和其他对抗性输入的支持。

**[deepeval](https://docs.confident-ai.com/)** — Python 评估框架，拥有大量内置指标库（G-Eval、RAG 忠实度、答案相关性、幻觉检测）。对于 RAG 管道很有用，因为你希望针对检索质量（而不仅仅是生成质量）进行特定评分。

正确的工具取决于你的技术栈和起点。比选择框架更重要的是运行评估的纪律——持续地、在每次重大变更时都运行。

## 令人不适的部分

大多数团队跳过这一步，因为它过早抛出一个棘手的问题：这里“好”的标准是什么？

对于一个新的 AI 功能来说，这确实很难。但如果你在乎可靠性，这就不是可选项。那些交付可信 AI 的团队，做的正是他们对任何关键代码路径都会做的事：定义预期行为、测试它、并持续运行这些测试。

基准测试没有撒谎。它们只是在回答别人的问题。别再把它当成产品路线图来读，开始编写匹配你系统的测试吧。

你的用户会在你的仪表盘察觉之前就发现问题。先把测试套件建起来。
````
