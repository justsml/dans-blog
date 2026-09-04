# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx
- Validation: deferred
- Runtime seconds: 33.15
- Input tokens: 4672
- Output tokens: 3450
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001480
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 生产级AI令人恐惧（及如何解决）
subTitle: 如果你的智能体没有护栏，就不适合投入生产。
modified: '2026-09-04'
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
没有人一开始就打算构建一个不安全的AI系统。你会写指令、测试边缘情况、加几条验证规则。然后有人发现，他们可以诱骗你的机器人扮演海盗并泄露用户数据。或者信用卡号出现在你的日志里。再或者模型自信地推荐了竞争对手的产品。

“Demo里能跑”和“生产环境安全”之间的差距，比大多数团队预想的要宽。

部分问题在于，原始LLM对自己的行为边界没有判断力。它们只是预测机器，试图延续你开启的任何模式。给它一个看起来像“系统覆盖模式”的提示，它会欣然配合。这不是模型本身的bug，而是语言模型的工作原理。

大多数框架把模型丢给你就祝你好运。Mastra则不同：它假设你最终需要护栏，因此从一开始就把它们内建到智能体架构中。

---

## 处理器作为安全层

核心机制很直接。在提示词到达模型之前，它会经过一连串输入处理器。模型响应后，输出处理器开始工作。每个处理器可以在相应阶段检查、修改或阻止内容。

可以把它们看作AI交互的中间件。你按需堆叠，配置行为，它们会在每次请求中自动运行。

### 1. 阻止海盗（提示注入）

提示注入攻击的花样越来越多。人们使用不可见的Unicode字符、用base64写指令、或者说服模型自己处于“调试模式”而无需遵守常规规则。这些技巧还在不断进化。

Mastra 包含的处理器能捕获常见模式：

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) 会剥离控制字符并折叠空白。[`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) 分析清理后的输入，检查是否存在试图覆盖你指令的模式。

你可以配置检测的激进程度（通过`threshold`参数），以及触发后的处理方式（`block`、`warn`、`filter`或`rewrite`）。

### 2. 处理PII

日志里的信用卡号、向量数据库里的社保号、存储时间过长的邮箱地址——这些迟早会变成监管问题。难点在于，用户并不总是意识到自己往聊天窗口里粘贴了敏感数据。

[`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) 会在数据到达模型或写入存储之前扫描常见模式：

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detect and mask personally identifiable information',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

你可以选择遮盖、哈希、移除、替换为类型占位符，或直接阻止。`PIIDetector` 是一个混合处理器：既可以放在 `inputProcessors` 中，也可以放在 `outputProcessors` 中，或者两者都用，具体取决于风险所在的位置。对于流式输出，先批量合并块再运行较重的分类器，这样就不用为每一次微小的token滴漏都单独支付一次LLM检查的代价。

### 3. 内容审核

### 3. 内容审核

在互联网数据上训练过的模型见过不少东西。如果不加过滤，它们偶尔会输出一些让你的PR团队头皮发麻的内容。`ModerationProcessor` 能够捕获违反指南的内容：

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

有意思的地方在于，你可以根据用例定义哪些类别需要关注。一个创意写作工具可能比客户服务机器人允许更富有表现力的内容。阈值和策略让你控制过滤的严格程度。

---

## 当事情触发时

当处理器使用 `block` 策略时，Mastra 会中止生成并将该事件暴露为触发元数据（tripwire metadata）。使用 `generate()` 时，检查返回结果：

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

对于流式调用，监听 `fullStream` 上的 `tripwire` 块。这种模式让你可以按应用逻辑处理安全事件。你可以记录以便分析、返回通用错误消息，或在低风险场景下将 `block` 改为 `warn` 来调整阈值。`processorId` 和 `reason` 告诉你哪个处理器触发了内容，有助于调试误报。

---

## 这不能解决什么

处理器能拦截很多问题，但它们不是魔法。一个足够有耐心的攻击者很可能找到能够穿透的提示词。模型偶尔会以处理器无法预测的方式产生幻觉。安全性和灵活性之间总有取舍：规则越严格，误杀合法用例的可能性就越大。

价值的核心不是完美防护。而是用一种系统化的方式来处理生产环境中必然会出现的常见问题。你可以根据实际用户行为来调节敏感度。可以为领域特定风险添加自定义处理器。还可以围绕同一个控制点接入违规回调、日志、追踪以及应用层面的审计记录。

生产环境 AI 中大多数安全问题并非高深攻击。而是用户粘贴了不该粘贴的数据，或者通过试错发现机器人会做你本无意让它做的事。处理器无法阻止所有可能的问题，但它们让那些明显的问题变得难以绕过。

### 资源

- [Mastra Guardrails 文档](https://mastra.ai/docs/agents/guardrails)
- [Mastra Processors 文档](https://mastra.ai/docs/agents/processors)
- [Mastra Agent 审批](https://mastra.ai/docs/agents/agent-approval)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列

1. [LLM 路由](/llm-routing-mastra-ai)
2. **安全与护栏**（本文）
3. [MCP 与工具集成](/mastra-mcp-tool-integrations)
4. [工作流与记忆](/mastra-workflows-memory)
````
