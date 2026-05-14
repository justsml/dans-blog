# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.25
- Input tokens: 3421
- Output tokens: 2837
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000955
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 停止让LLMs做数学
subTitle: 它们在这方面表现不佳。以下是解决方法。
date: '2026-01-06'
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
语言模型有什么奇怪的地方吗？它们可以解释量子力学、写诗、调试你的TypeScript……但如果你让它们计算18472乘以9347，它们有很大概率会自信地给出一个与正确结果相差数千的错误答案。

我以前对此感到困惑，直到我意识到我们实际上在要求它们做什么。我们正在要求一个模式匹配引擎充当计算器。这就像因为体操运动员理解“平衡”的概念，就要求他们帮你平衡支票簿。

关键在于，LLMs不会进行任何真正的计算。当你问GPT或Claude 2+2等于多少时，它们并不是在做加法。它们是在预测“4”是最有可能出现在“2+2=”之后的标记。在大多数情况下，这工作得很好，因为这些模式存在于它们的训练数据中。但一旦超出简单算术，进入多步骤计算或训练中不常见的数字领域，你基本上就是在掷骰子。

我最近在审查一段使用顶级模型计算房贷支付的代码时，直接撞上了这个问题。模型非常自信地给出了答案。但结果每月错误了400美元。这种错误是真正会带来影响的。

即使模型在推理能力上有所提升（据说GPT-5有所改进），它们仍然只是在进行复杂的模式匹配，而不是符号计算。对于创意工作和自然语言任务，这种概率特性正是它们神奇之处。但对于数学？就不太行了。

## 什么真正解决了这个问题？

答案不是等待更聪明的模型，而是给模型提供适合任务的工具。

想象一下，如果你在构建一个非AI系统，你会如何解决这个问题。你不会编写自定义的数学逻辑，而是会使用一个库。同样的原则适用于这里，只不过现在我们要教会LLM在何时以及如何使用这个库。

现代AI SDK中的工具调用功能，让我们可以为模型提供结构化的函数供其调用。我们不需要强迫LLM假装自己懂数学，而是给它一个真正能处理数学的工具：符号数学引擎。

我一直在使用[AI SDK v5和v6](../ai-sdk.vercel.ai/)配合CortexJS Compute Engine实现这一点。SDK负责协调和工具路由，而CortexJS则处理从基本算术到微积分的所有计算。这种职责分离令人惊讶地清晰。

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## 构建数学工具

实现过程比你想象的更直接。我们要构建的是LLM的自然语言理解与实际数学计算之间的桥梁。

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// 初始化引擎一次
const ce = new ComputeEngine();

const mathTool = tool({
  description: '以保证的准确性评估数学表达式和解方程。所有数学操作必须使用此工具验证正确性 - 不要尝试心算。支持算术、代数、微积分和复杂运算。可以同时处理多个表达式。',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'LaTeX或纯文本数学表达式数组，例如["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // 并行处理所有表达式（或详细批处理）
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

关于这段代码有几个值得注意的点：

描述部分承担了重要工作。"必须使用"这样的措辞可能看起来很强势，但根据我的经验，明确告诉模型何时使用工具，是让工具有时工作和可靠工作的关键区别。可以将其视为工具层面的提示工程。

通过`expressions`数组进行批处理的重要性可能比你想象的要大。每次模型调用都有延迟。如果你在解方程组或多步骤数学计算时逐个处理，会带来糟糕的用户体验。批处理意味着一次往返就能解决十个问题。

使用符号引擎而不是简单的`eval()`（请不要使用`eval()`）让我们获得了真正的数学理解能力。引擎解析意图，处理LaTeX格式，可以处理导数和积分。我们进行的不只是计算，而是真正的数学。

错误处理是按表达式隔离的。如果某个计算失败，我们会返回该错误但继续处理其余部分。这使得模型可以看到哪些成功了哪些失败了，可能在下一步进行自我纠正。

## 实际应用

让我们抛出一个通常会让原始模型产生幻觉的问题：

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: '计算 18472 × 9347，除以 127，然后对结果开平方根。',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // 允许最多五个模型/工具步骤
});

console.log(text);
```

模型识别出数学问题，意识到需要精确计算，调用工具获取准确结果，然后用自然语言解释。每个组件都在做自己最擅长的事。

## 超越基础算术

由于我们使用的是符号引擎，这种方法能处理简单计算器工具无法触及的问题。

想解代数方程？"解这些方程：3x + 7 = 22 和 2y - 5 = 13" 完全没问题。

需要微积分？"求 x^3 + 2x^2 的导数并在 x = 2 处求值" 只是另一个工具调用。

如果你在构建教育类应用，LaTeX 支持特别有用。引擎原生理解 LaTeX 输入，可以返回格式化渲染结果。无需额外解析。

## 更宏观的视角

我认为这种模式的重要性远不止数学领域。我们真正做的是承认LLM的局限性，同时利用其优势。它们在理解意图、解析自然语言和协调工作流方面非常出色。但它们不是计算器、数据库或文件系统。

每次我们试图让LLM执行确定性操作时，实际上都在对抗其本质。但当我们把自然语言理解与处理确定性任务的专用工具结合起来时？这才是真正有趣的地方。

数学工具只是其中一个例子。同样的原则适用于日期处理、财务计算、图像处理、数据库查询...任何精确度比创造力更重要的场景。让模型理解用户需求，然后将实际工作交给为该任务设计的系统。

这改变了我们构建AI应用的思维方式。不是"模型能否做到这个？"而是"模型能否协调这个？"措辞上的细微差别，可靠性上的显著提升。

## 资源

- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
- [CortexJS 计算引擎](https://cortexjs.io/compute-engine/)
- [工具调用指南](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK 示例仓库](https://github.com/vercel/ai/tree/main/examples)
````
