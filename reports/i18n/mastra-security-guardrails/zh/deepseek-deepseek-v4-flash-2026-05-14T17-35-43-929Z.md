# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx
- Validation: deferred
- Runtime seconds: 23.11
- Input tokens: 3549
- Output tokens: 3788
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001505
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 生产AI令人恐惧（以及如何解决）
subTitle: 如果你的智能体没有护栏，你还没准备好投入生产。
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
没有人一开始就打算构建一个不安全的AI系统。你编写指令，测试边界情况，添加几条验证规则。然后有人发现他们可以诱骗你的机器人扮演海盗并泄露用户数据。或者信用卡号出现在你的日志里。又或者模型自信地推荐了竞争对手的产品。

“在演示中能跑”和“在生产环境中安全”之间的差距，比大多数团队预期的要大得多。

部分问题在于，原始LLM对自己该做什么、不该做什么没有立场。它们是预测机器，只会试图延续你给出的任何模式。给它一个看起来像“系统覆盖模式”的提示，它就会欣然配合。这不是模型本身的缺陷，而是语言模型的工作方式。

大多数框架把模型交给你，然后祝你好运。Mastra采取了不同的方法：它假设你最终需要护栏，因此从一开始就将它们构建到智能体架构中。

---

## 处理器作为安全层

核心机制很简单。在你的提示到达模型之前，它会经过一系列输入处理器。模型响应后，输出处理器开始工作。每个处理器可以在对应阶段检查、修改或阻止内容。

把它们想象成AI交互的中间件。你堆叠需要的处理器，配置它们的行为，它们会在每次请求时自动运行。

### 1. 阻止海盗（提示注入）

提示注入攻击已经变得花样百出。人们使用不可见的Unicode字符，用base64编写指令，或者说服模型他们处于“调试模式”，正常规则不适用。这些技术还在不断演变。

Mastra包含能捕获常见模式的处理器：

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

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) 会剥离控制字符并折叠空白。[`PromptInjectionDetector`](https://mastra.ai/docs/processors) 会分析清洗后的输入，寻找试图覆盖你指令的模式。

你可以配置检测的激进程度（`threshold` 参数），以及触发时应该发生什么（阻止、记录，或仅标记）。

### 2. 处理PII

日志中的信用卡号、向量数据库中的社会安全号码、存储时间过长的电子邮件地址——这些都是会变成监管问题的情况。挑战在于，用户并不总是意识到自己在聊天窗口中粘贴了敏感数据。

[`PIIDetector`](https://mastra.ai/docs/processors) 会在这些数据到达模型或写入存储之前扫描常见模式：

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

你可以选择脱敏（替换为 `[REDACTED]`）、哈希，或完全阻止。处理器在输入和输出两端都运行，因此即使模型在响应中意外生成了敏感数据，你也能得到保护。

### 3. 内容审核

### 3. 内容审核

在互联网数据上训练的模型见过不少东西。如果不加过滤，它们偶尔会生成让你的公关团队紧张的回复。[`ModerationProcessor`](https://mastra.ai/docs/processors) 会捕获违反你准则的内容：

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

有趣的是，你可以定义哪些类别对你的用例重要。创意写作工具可能允许比客服机器人更具表现力的内容。阈值和策略让你控制过滤的严格程度。

---

## 当触发时

处理器在检测到问题时不会抛出错误。相反，它们会在结果对象上设置一个标志：

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

这种模式让你以对应用有意义的方式处理安全事件。你可以记录它们用于分析，返回通用错误消息，甚至在特定上下文中允许某些违规。`tripwireReason` 字段精确告诉你哪个处理器标记了内容，这在调试误报或调整阈值时很有帮助。

---

## 这解决不了什么

处理器能捕获很多问题，但它们不是魔法。一个足够有耐心的攻击者很可能找到能溜过去的提示。模型偶尔会以处理器无法预测的方式产生幻觉。而且安全性和灵活性之间总是存在权衡：规则越严格，就越可能阻止合法用例。

价值不在于完美保护。而在于有一个系统性的方法来处理生产中必然会出现的常见问题。你可以根据用户的实际行为调整敏感度。你可以为特定领域的风险添加自定义处理器。而且你有审计跟踪，显示什么被阻止以及原因。

生产环境中 AI 的大多数安全问题并非复杂的攻击。而是人们复制粘贴他们不该粘贴的数据，或者通过试错发现机器人会做你未预期的事情。处理器不会阻止所有可能的问题，但它们会让明显的问题更难发生。

### 资源

- [Mastra 护栏文档](https://mastra.ai/docs/agents/guardrails)
- [安全最佳实践](https://mastra.ai/docs/security)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列

1. [LLM 路由](../llm-routing-mastra-ai)
2. **安全与护栏**（本文）
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
