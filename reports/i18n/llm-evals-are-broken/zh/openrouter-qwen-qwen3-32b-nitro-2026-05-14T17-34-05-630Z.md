# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/zh/index.mdx
- Validation: deferred
- Runtime seconds: 12.23
- Input tokens: 6541
- Output tokens: 5383
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001815
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 用评估对抗威胁！
subTitle: 基准测试衡量的是基准测试。你的系统需要自己的衡量标准。
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
每个新模型上线时都披着基准测试的礼服。  
MMLU：92.4%。HumanEval：87.2%。LLeMU：88.7%。MATH：73.6%。AGI：127%！  
然而，对于99%利用AI构建流程与产品的公司而言，**这些指标毫无意义**。  

什么才是关键？你的**具体工作负载表现如何**？是变好还是变差？唯一可靠的答案来源是编写反映你系统特定任务、数据和故障模式的Evals（LLM测试）。  

<blockquote class="breakout">  
  <p>基准测试并没有说谎。它们只是回答了别人的问题。</p>  
</blockquote>  

---

## 基于氛围评估的实际代价  

标准做法是：部署模型变更后观察投诉渠道，若用户抱怨声变大则回滚。  
这种方式几乎会遗漏所有重要信息：  

**你只能捕捉到明显的故障**。用户收到自信但错误的答案却未意识到？沉默。用户得到更差的答案后弃用功能？沉默。支持工单和错误率仅能反映质量退化的一小部分。  

**你无法区分退化与改进**。若新模型在任务A上表现更好但在任务B上更差，B的投诉与“AI整体变差”的反馈完全相同。你不知道该修复什么。  

**你把用户当成了测试基础设施**。他们从未同意这一点。  

---

## 评估光谱（以及多数团队的误区）  

评估方法存在于从“快速但脆弱”到“昂贵但有效”的光谱上。  

<figure class="breakout">  

![通过速度、成本和有效性对比确定性检查、LLM作为裁判和人工评估的光谱图](../eval-spectrum.svg)  

<figcaption>选择最便宜且能真实捕捉故障的评估方法</figcaption>  
</figure>  

**LLM作为裁判**是当前的宠儿：让强大模型评估其他模型的输出。快速、可扩展、成本低。问题是它会继承评估模型的偏见，容易被操纵，并形成循环依赖。如果你用GPT-5评估GPT-5的输出，你测量的是“GPT-5与GPT-5的共识程度”。这并非毫无价值，但并非你以为的那样。  

**人工评估**是所有人都试图跳过但应视为黄金标准的方法。让人类评估输出既昂贵又耗时，评估者之间存在不一致性，安排评估也令人烦恼。但它才是验证系统是否对真实用户有用的唯一方式。

**任务特定的自动化检查**是大多数团队应该投入更多时间的地方。它们可能不够光鲜，但速度快、确定性强，并且直接关联到系统中的关键问题。

---

## 实际有效的方法

### 1. 在发布前定义失败标准

在更改模型或提示词之前，先明确写出“失败”的具体表现。

不要写“输出应准确”这种模糊的描述。这不算测试。更具体的例子包括：

- 结构化JSON输出必须能被解析且无错误
- 响应中的所有引用必须逐字出现在检索到的上下文中
- 响应中不得提及竞争对手的产品名称
- SQL查询必须语法正确且仅引用架构中存在的表
- 情感分类结果在现有测试集上不应从正面翻转到负面超过3%

这些都可以通过程序化检查完成。无需依赖评估模型。

**评估框架：确定性检查**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON必须能被解析
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `无效的JSON: ${e.message}` };
    }
  },

  // 无虚构引用——每个声明必须出现在上下文中
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `未验证的声明: ${ungrounded.join(', ')}` };
  },

  // 响应长度合理性检查——捕获截断或无限生成
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `字数 ${words} 超出范围` };
  },
};
```

### 2. 从最糟糕的日子里构建黄金数据集

你最好的评估数据是那些令人尴尬的案例：导致用户提交工单、截图幻觉或悄悄放弃功能的输出。

每当用户报告不良输出、标记幻觉或你手动发现故障时，就将输入、上下文和预期行为添加到黄金数据集中。保持50-100个案例，并在每次模型变更时运行它们。

最初这可能感觉很手动。但六个月后，你会拥有一个无法被任何公开基准游戏化的测试套件，因为每个案例都来自你自己的故障历史。

<figure class="breakout">

![工作流图示，展示生产事故如何转化为黄金案例，再通过CI评估运行，最终阻止回归或批准发布](../golden-set-lifecycle.svg)

<figcaption>黄金数据集将尴尬案例转化为回归测试套件</figcaption>
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
  sourceIncident?: string; // 链接到原始bug报告或工单
}
```

### 3. 回归测试，而不仅是验收测试

大多数团队只在考虑模型变更时运行评估。这是验收测试："这个新功能是否足够好？"

你还需要回归测试："这是否破坏了原本正常的功能？"

在每次提示更改时运行黄金数据集，而不仅仅是模型更改。当添加新工具、更改RAG检索策略或更新上下文模板时，原本运行良好的提示可能会悄然退化。没有基准线你将无法察觉。像[Langfuse](https://langfuse.com/)这样的工具会将评估分数附加到生产追踪中，使回归问题出现在仪表板上，而不仅仅是事故报告中。

<details>
<summary>评估框架：基准版与候选版对比</summary>

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

  console.log(`回归问题: ${regressions.length} / ${goldenCases.length}`);
  console.log(`改进项: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('发现阻塞级回归:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

当候选版本在已知失败案例上出现回归时，升级讨论会变得非常具体：哪些案例得到改善，哪些案例出现故障，以及这种权衡是否值得。

### 4. 将LLM作为评委用于唯一一件事

LLM作为评委适用于没有确定性正确答案的开放性输出："这个回答是否有帮助？""这个摘要是否保留了关键要点？""这个解释是否适合初学者？"

在这些场景使用它。不要用它评估确定性答案。当确实使用时，要明确评分标准：

**评估框架：基于评分标准的评委**

```typescript
async function judgeHelpfulness(
  userQuery: string,
  modelResponse: string
): Promise<{ score: number; reasoning: string }> {
  const judgePrompt = `
你正在评估一个客服回复。

用户问题: ${userQuery}
回复内容: ${modelResponse}

请按1-5分进行评分：
5 = 直接回答问题，提供准确且可操作的信息
4 = 回答了问题但可以更具体或更可操作
3 = 部分回答问题；缺少关键信息
2 = 勉强相关但未回答问题
1 = 离题、事实错误或有害

请以JSON格式回复：{"score": <数字>, "reasoning": "<一句话解释>"} 
`;

  const result = await judgeModel.generate(judgePrompt);
  return JSON.parse(result);
}
```

明确的评分标准可以减少评委方差，产生可解释的输出，并在评委出错时更容易审计。像[Autoevals](https://github.com/braintrustdata/autoevals)和[Braintrust](https://www.braintrust.dev/)这样的库提供了常见任务的预构建评分标准——在自己编写前值得直接借鉴。

---

## 值得了解的工具

你不需要从零开始构建所有内容。多个工具在评估基础设施问题上取得了实质性进展：

**[Braintrust](https://www.braintrust.dev/)** — 完整的评估平台，包含实验跟踪、数据集管理和评分函数。按提示、模型和部署组织评估运行，让你可以对比随时间推移的质量变化，而不仅仅是跨版本对比。与其开源的**[Autoevals](https://github.com/braintrustdata/autoevals)**库配合使用效果更佳，该库提供了常见任务的预构建模型评分函数（事实准确性、有用性、毒性、语义相似度）。

**[Langfuse](https://langfuse.com/)** — 开源的LLM可观测性工具，位于你的应用和模型之间。追踪每次调用，将评估分数（人工或自动）附加到单个追踪段，并在生产流量中展示质量趋势。如果你希望评估和可观测性集成在同一个工具中，而不是单独的评估框架，这是个不错的选择。

**[Evalite](https://www.evalite.dev/)** — Matt Pocock开发的TypeScript原生评估框架。仪式感极低：定义任务，定义评分器，直接在现有测试环境中运行。面向希望评估感觉像单元测试而非独立ML实验平台的团队。

**[promptfoo](https://www.promptfoo.dev/)** — 以命令行优先的评估运行器，专注于提示比较和红队测试。通过YAML配置简单，兼容大多数模型提供商，内置提示注入等对抗性输入检测功能。

**[deepeval](https://docs.confident-ai.com/)** — Python评估框架，包含大量内置指标（G-Eval、RAG可信度、答案相关性、幻觉检测）。适用于RAG流水线，当需要特定检索质量评分而非单纯生成质量评估时非常有用。

选择合适工具取决于你的技术栈和起点。比框架选择更重要的是持续运行评估的纪律——在每次重大变更时都保持一致性。

## 不舒适的部分

大多数团队会跳过这一步，因为它在早期就提出了一个令人烦恼的问题：这里的“良好”状态应该是什么样的？

对于新的AI功能来说，这确实很难。但如果你关心可靠性，这也是必不可少的。开发值得信赖的AI的团队，正在做他们对任何关键代码路径会做的事情：定义预期行为，进行测试，并持续运行这些测试。

基准测试本身并没有说谎。它们只是在回答别人的问题。停止将它们视为产品路线图，转而编写与你的系统相匹配的测试。你的用户会在仪表盘发现问题之前就察觉到异常。先构建测试套件。
````
