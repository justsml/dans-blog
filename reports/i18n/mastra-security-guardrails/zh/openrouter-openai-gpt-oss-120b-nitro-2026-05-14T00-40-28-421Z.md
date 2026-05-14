# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.47
- Input tokens: 5881
- Output tokens: 2142
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000615
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 生产 AI 令人恐惧（以及解决方案）
subTitle: 如果你的代理缺乏防护机制，就还不适合投入生产。
date: '2026-01-03'
modified: '2026-01-08'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
没有人会故意去构建一个不安全的 AI 系统。你编写指令，测试边缘案例，添加一些验证规则。然后有人发现可以把你的机器人骗成海盗角色，从而泄露用户数据。或者信用卡号意外写进了日志。又或者模型自信地推荐竞争对手的产品。

“在演示中可用” 与 “在生产环境中安全” 之间的鸿沟，往往比大多数团队预期的要大得多。

问题之一在于，原始 LLM 并没有关于它们应该或不应该做什么的观点。它们是预测机器，只会延续你已经开始的模式。给它们一个看似 “系统覆盖模式” 的提示，它们就会欣然配合。这不是模型的 bug；这正是语言模型的工作方式。

大多数框架只把模型交给你，然后祝你好运。Mastra 采用了不同的思路：它假设你最终会需要安全护栏，因此从一开始就把这些护栏嵌入到代理架构中。

## 处理器作为安全层

核心机制非常直接。在你的提示到达模型之前，它会先经过一系列输入处理器。模型响应后，输出处理器再介入。每个处理器都可以在相应阶段检查、修改或阻断内容。

把它们想象成 AI 交互的中间件。你把需要的处理器堆叠起来，配置它们的行为，它们就会在每一次请求时自动运行。

### 1. 阻止海盗（提示注入）

提示注入攻击手段层出不穷。有人使用不可见的 Unicode 字符，写入 base64 编码的指令，或让模型相信自己处于 “调试模式”，从而规避常规规则。这些技术持续演进。

Mastra 包含能够捕获常见模式的处理器：

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) 会去除控制字符并压缩空白。[`PromptInjectionDetector`](https://mastra.ai/docs/processors) 在清理后的输入中分析可能表明有人试图覆盖你的指令的模式。

你可以通过 `threshold` 参数调节检测的激进程度，并决定触发时的处理方式（阻断、记录或仅标记）。

### 2. 处理 PII

日志中的信用卡号、向量数据库中的社会安全号码、存放时间过长的电子邮件地址——这些都是会演变成合规风险的问题。难点在于用户并不总是意识到自己把敏感数据粘贴进了聊天窗口。

[`PIIDetector`](https://mastra.ai/docs/processors) 在数据到达模型或写入存储之前扫描常见模式：

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

你可以选择将检测到的内容重写为 `[REDACTED]`、哈希处理，或直接阻断。处理器会在输入和输出两侧运行，确保即使模型在响应中意外生成敏感信息也能被拦截。

### 3. 内容审核

在互联网上训练的模型已经看到过各种内容。若不进行过滤，它们偶尔会生成让你的公关团队感到不安的回复。[`ModerationProcessor`](https://mastra.ai/docs/processors) 捕获违反你指南的内容：

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

有趣的是，你可以自行定义哪些类别对你的业务重要。创意写作工具可能容忍更丰富的表达，而客服机器人则需要更严格的限制。阈值和策略让你能够精细控制过滤的严格程度。

---

## 当出现异常时

处理器在检测到问题时不会抛出错误，而是会在结果对象上设置一个标志：

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

这种模式让你可以根据应用的需求自行处理安全事件。你可以将其记录下来以供分析，返回一个通用的错误信息，甚至在特定上下文中允许某些违规行为。`tripwireReason` 字段会明确指出是哪一个处理器标记了内容，这在调试误报或微调阈值时非常有帮助。

---

## 这并不能解决的情况

处理器能捕获很多问题，但它们并非万能。足够有耐心的攻击者可能会找到能够逃过检测的提示。模型有时会产生幻觉，而这些幻觉是处理器无法预料的。而且安全性与灵活性之间始终存在权衡：规则越严格，误阻合法使用场景的概率就越高。

价值不在于提供完美的防护，而在于提供一种系统化的方式来处理生产环境中必然会出现的常见问题。你可以在了解用户真实行为后调节灵敏度。你可以为特定领域的风险添加自定义处理器。并且你拥有审计日志，记录了被阻止的内容以及原因。

大多数生产环境中的 AI 安全问题并非高度复杂的攻击。它们往往是用户复制粘贴了不该使用的数据，或通过反复试验发现了机器人会执行的非预期行为。处理器无法阻止所有潜在问题，但它们能让显而易见的风险变得更难以利用。

### 资源
---

- [Mastra Guardrails 文档](https://mastra.ai/docs/agents/guardrails)
- [安全最佳实践](https://mastra.ai/docs/security)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列

1. [LLM 路由](/../llm-routing-mastra-ai)
2. **安全与护栏**（本文）
3. [MCP 与工具集成](/../mastra-mcp-tool-integrations)
4. [工作流与记忆](/../mastra-workflows-memory)
````
