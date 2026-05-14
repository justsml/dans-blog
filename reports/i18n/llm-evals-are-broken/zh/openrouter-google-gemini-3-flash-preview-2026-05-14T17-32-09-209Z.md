# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/zh/index.mdx
- Validation: deferred
- Runtime seconds: 29.61
- Input tokens: 6838
- Output tokens: 3065
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.012614
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 用 Evals 击退乱象！
subTitle: 基准测试衡量的只是基准本身。你的系统需要自己的度量标准。
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
每一款新模型发布时，都像是穿着一身由基准测试（benchmarks）缝制的燕尾服盛装登场。

MMLU: 92.4%。HumanEval: 87.2%。LLeMU: 88.7%。MATH: 73.6%。AGI: 127%！

然而，对于 99% 正在利用 AI 构建业务流程和产品的企业来说，**这些数据毫无意义。**

真正重要的是什么？是你自己的工作负载表现如何。是在变好还是变坏？想要清醒地掌握这些，唯一的方法就是编写评估（Evals，即针对 LLM 的测试），以此反映你系统的特定任务、数据和失效模式。

<blockquote class="breakout">
  <p>基准测试没有撒谎。它们只是在回答别人的问题。</p>
</blockquote>

---

## “凭感觉评估”的真实代价

标准做法通常是：发布模型变更，盯着投诉渠道，如果反对声音太大就回滚。

这种方式几乎会漏掉所有关键信息：

**你只能捕捉到“响亮”的失败。** 如果用户得到了一个言之凿凿的错误答案却没意识到？沉默。如果用户得到了一个质量更差的答案并直接弃用该功能？沉默。工单和错误率只能捕捉到质量退化的一小部分。

**你无法区分退化与改进。** 如果新模型在任务 A 上表现更好，但在任务 B 上表现更差，那么针对 B 的投诉看起来与通用的“AI 变难用了”反馈完全一样。你根本不知道该修复哪里。

**你在把用户当成测试基础设施。** 但他们并没有报名参加这种测试。

---

## 评估光谱（以及大多数团队错在哪里）

评估方法分布在一个光谱上，从“快速但脆弱”到“昂贵但有效”。

<figure class="breakout">

![一张对比确定性检查、LLM 作为裁判以及人工评估在速度、成本和有效性方面的光谱图。](.././eval-spectrum.svg)

<figcaption>请使用能够切实捕捉到失败的最廉价评估方法。</figcaption>
</figure>

**LLM 作为裁判（LLM-as-judge）** 是当下的宠儿：让一个强大的模型给另一个模型的输出打分。快速、可扩展、廉价。问题在于：它固化了评分模型的偏见，容易被钻空子，并产生循环依赖。如果你用 GPT-5 来给 GPT-5 的输出打分，你衡量的是“GPT-5 在多大程度上认同 GPT-5”。这并非毫无意义，但绝不是你想象中的那种评估。

**人工评估（Human eval）** 是每个人都想跳过的金标准。让真人评估输出结果既昂贵又缓慢，不同评估者之间标准不一，且排期麻烦。但它是验证系统对真实人类是否有用的唯一手段。

**针对特定任务的自动化检查**是大多数团队应该投入更多时间的地方。它们并不华丽，但速度快、具有确定性，且与系统中的核心业务逻辑紧密挂钩。

---

## 真正有效的做法

### 1. 在发布前定义失败

在更换模型或调整提示词（Prompt）之前，请先写下“糟糕的输出”具体长什么样。要非常具体。

不要写“输出应该是准确的”。那不是测试。应该像这样：

- 结构化的 JSON 输出必须能够无错解析
- 回复中的所有引用必须逐字出现在检索到的上下文（Context）中
- 回复不得提及竞争产品的名称
- SQL 查询必须语法正确，且仅引用架构中存在的表
- 在现有测试集上，情感分类从正向转为负向的比例不得超过 3%

你可以通过编程方式检查这些项。不需要任何裁判模型。

**评估工具链：确定性检查**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON 必须可解析
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // 无幻觉引用 —— 每个论点必须出现在上下文中
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // 回复长度合理性检查 —— 捕捉截断或失控生成
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. 从你最糟糕的经历中构建“黄金集”

你最好的评估数据就是那些令人尴尬的玩意：那些导致用户提交工单、截图幻觉内容、或悄悄停用功能的输出。

每当用户报告糟糕的输出、标记幻觉，或者你手动发现失败时，将其加入你的“黄金集（Golden Set）”：包括输入、上下文和预期的正确行为。保持 50-100 个案例，并在每次模型变更时运行它们。

起初这感觉很繁琐。但六个月后，你将拥有一套任何公开基准测试都无法作弊的测试套件，因为每个案例都源自你真实的失败历史。

<figure class="breakout">

![一张工作流图，展示了生产环境中的糟糕事故如何转化为黄金案例，随后进入 CI 评估运行，最终实现拦截回归或批准发布。](.././golden-set-lifecycle.svg)

<figcaption>黄金集将尴尬的事故转化为回归测试套件。</figcaption>
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
    minSimilarityToReference?: number; // 与参考答案的余弦相似度
  };
  sourceIncident?: string; // 链接回错误报告或工单
}
```

### 3. 是回归测试，而不只是验收测试

大多数团队只在考虑更换模型时才运行评估。那是验收测试：“这个新东西够好吗？”

你同样需要回归测试：“这是否破坏了以前正常工作的逻辑？”

要在每次更改 Prompt 时运行黄金数据集（Golden Set），而不只是在更换模型时。当你添加新工具、更改 RAG 检索策略或更新上下文模板时，原本运行良好的 Prompt 可能会出现静默退化。如果没有基准线，你根本无从知晓。[Langfuse](https://langfuse.com/) 等工具可以将评估分数附加到生产环境的追踪（Traces）中，这样回归问题就会出现在仪表盘上，而不是仅仅出现在事故报告里。

<details>
<summary>评估工具：基准（Baseline）与候选（Candidate）对比</summary>

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

如果候选版本在已知失败案例上发生了回归，升级讨论就会变得非常具体：哪些案例改进了，哪些案例搞砸了，以及这种权衡是否值得。

### 4. 仅在一种情况下使用“LLM 作为裁判”

“LLM 作为裁判”（LLM-as-judge）适用于没有确定性标准答案的开放式输出：“这个回答有帮助吗？”、“这个摘要是否保留了关键点？”、“这个解释适合初学者吗？”

在这些场景下使用它。不要把它用于确定性的答案。当你确实需要使用它时，请制定明确的评分标准（Rubric）：

**评估工具：基于评分标准的裁判**

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

明确的评分标准可以减少评估者的方差，提供可解释的输出，并在裁判出错时更容易进行审计。[Autoevals](https://github.com/braintrustdata/autoevals) 和 [Braintrust](https://www.braintrust.dev/) 等库提供了针对常见任务的预置评分标准——在从零开始编写自己的标准之前，这些非常值得借鉴。

---

## 值得关注的工具

你不需要从头构建所有东西。一些工具在评估基础设施问题上已经取得了实质性进展：

**[Braintrust](https://www.braintrust.dev/)** —— 全栈评估平台，具备实验追踪、数据集管理和评分函数功能。它按 Prompt、模型和部署来组织评估运行，因此你可以对比不同时间段的质量差异，而不仅仅是版本间的差异。它与开源的 **[Autoevals](https://github.com/braintrustdata/autoevals)** 库配合良好，后者提供了针对常见任务（事实准确性、帮助程度、毒性、语义相似度）的预置模型评分函数。

**[Langfuse](https://langfuse.com/)** —— 开源的 LLM 可观测性工具，介于你的应用和模型之间。它追踪每一次调用，将评估分数（人工或自动）附加到单个 Span 上，并从生产流量中呈现质量趋势。如果你希望在同一个工具中实现可观测性和评估，而不是使用独立的评估工具，这是一个不错的选择。

**[Evalite](https://www.evalite.dev/)** —— 由 Matt Pocock 开发的 TypeScript 原生评估框架。上手简单：定义任务，定义评分器，然后在现有的测试设置中运行。目标用户是那些希望评估体验像单元测试，而不是独立的机器学习实验平台的团队。

**[promptfoo](https://www.promptfoo.dev/)** —— 以 CLI 为主的评估运行器，专注于 Prompt 对比和红队测试。通过 YAML 即可轻松配置，集成了大多数模型提供商，并内置了对 Prompt 注入和其他对抗性输入的检测支持。

**[deepeval](https://docs.confident-ai.com/)** —— Python 评估框架，拥有庞大的内置指标库（G-Eval、RAG 忠实度、回答相关性、幻觉检测）。适用于需要对检索质量（而非仅仅是生成质量）进行特定评分的 RAG 流水线。

选择哪种工具取决于你的技术栈和起点。比选择框架更重要的是坚持运行评估的纪律——在每一次重大变更时，都要持之以恒地进行。

---

## 令人不适的事实

大多数团队之所以跳过这一步，是因为它在早期就提出了一个令人恼火的问题：在这里，“好”到底长什么样？

对于一个新的 AI 功能来说，这确实很难定义。但如果你在意可靠性，这就是必选项。那些能交付值得信赖的 AI 的团队，做法与处理任何关键代码路径时完全一致：定义预期行为，进行测试，并持续运行这些测试。

基准测试并没有撒谎。它们只是在回答别人的问题。别再把它们当成产品路线图了，开始编写匹配你系统的测试吧。

你的用户会比你的仪表盘更早察觉到问题。先构建测试套件。
````
