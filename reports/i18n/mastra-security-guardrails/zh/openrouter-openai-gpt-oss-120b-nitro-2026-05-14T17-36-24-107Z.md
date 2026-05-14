# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.45
- Input tokens: 3631
- Output tokens: 2029
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000507
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 生产 AI 令人恐惧（以及解决方案）
subTitle: 如果你的代理缺乏防护措施，就还不能投入生产。
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
没有人会主动去构建不安全的 AI 系统。你编写指令，测试边缘案例，加入一些校验规则。结果却有人发现可以把你的机器人骗成海盗角色，从而泄露用户数据。或者信用卡号意外写进了日志。又或者模型自信地推荐竞争对手的产品。

“演示可用” 与 “生产安全” 之间的鸿沟，往往比大多数团队预期的要大得多。

问题的一部分在于，原始 LLM 并没有关于它们该做什么或不该做什么的观点。它们只是预测机器，尝试继续你给出的任何模式。给它们一个看似 “系统覆盖模式” 的提示，它们会欣然配合。这不是模型的 bug；这就是语言模型的工作方式。

大多数框架只把模型交给你，然后祝你好运。Mastra 走的是另一条路：它假设你最终会需要安全防护，所以从一开始就把这些防护嵌入到代理架构中。

---

## 处理器作为安全层

核心机制很直接。在你的提示到达模型之前，它会经过一系列输入处理器。模型响应后，输出处理器再介入。每个处理器都可以在对应阶段检查、修改或阻断内容。

把它们想象成 AI 交互的中间件。把需要的处理器堆叠起来，配置行为，它们会在每一次请求上自动运行。

### 1. 阻止海盗（提示注入）

提示注入攻击手法层出不穷。有人使用不可见的 Unicode 字符、用 base64 编写指令，或让模型相信自己处于 “调试模式”，从而规避常规规则。技术在不断演进。

Mastra 包含了能够捕获常见模式的处理器：

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
    // 1. 清理不可见字符
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. 检测尝试
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // 低成本，快速
      threshold: 0.8,
      strategy: 'block', // 硬性阻断
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

[`UnicodeNormalizer`](https://mastra.ai/docs/processors) 会剔除控制字符并合并空白。[`PromptInjectionDetector`](https://mastra.ai/docs/processors) 则分析清理后的输入，寻找可能的指令覆盖模式。

你可以通过 `threshold` 参数调节检测的激进程度，并决定触发时的处理方式（阻断、记录或仅标记）。

### 2. 处理 PII

日志中出现信用卡号，向量数据库里存有社会安全号码，电子邮件地址被保留时间过长……这些都是会演变成合规风险的问题。难点在于用户往往没有意识到自己把敏感信息粘贴进了聊天窗口。

[`PIIDetector`](https://mastra.ai/docs/processors) 会在数据到达模型或写入存储之前扫描常见模式：

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
      redactionMethod: 'mask',  // 替换为 [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

你可以选择将检测到的内容 **redact**（替换为 `[REDACTED]`）、哈希，或直接阻断。处理器会同时作用于输入和输出，这样即使模型在响应中意外生成敏感信息，也能得到覆盖。

### 3. 内容审核

模型在互联网上的海量数据上训练过，见过不少东西。如果不做过滤，它们偶尔会生成让你的公关团队坐立不安的回复。[`ModerationProcessor`](https://mastra.ai/docs/processors) 能捕获违反你指南的内容：

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
      model: openai('gpt-5-nano'),  // 快速、低成本的分类模型
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // 当置信度 > 70% 时阻断
      strategy: 'block',  // 立即终止请求
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

有趣的是，你可以自行决定哪些类别对你的业务重要。创意写作工具可能容忍比客服机器人更具表现力的内容。阈值和策略让你可以控制过滤的严格程度。

---

## 当触发拦截时

处理器不会在检测到问题时抛出错误，而是给结果对象打上标记：

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

这种模式让你可以按业务需求处理安全事件。你可以把它们记录下来供分析，返回通用错误信息，甚至在特定上下文中允许某些违规。`tripwireReason` 字段明确指出是哪一个处理器标记了内容，便于调试误报或微调阈值。

---

## 这并不能解决的事

处理器能捕获不少问题，但它们并非魔法。足够有耐心的攻击者仍可能找到能够逃过检测的提示。模型偶尔会产生幻觉，超出处理器的预测范围。而且安全性与灵活性总是要权衡：规则越严格，误阻合法用例的概率就越高。

价值不在于提供完美防护，而在于提供一套系统化的手段来处理生产环境中必然出现的常见问题。你可以在了解用户真实行为后调节灵敏度，添加针对特定领域风险的自定义处理器，并保留审计日志记录被拦截的内容及原因。

大多数生产环境中的 AI 安全问题并非高深的攻击手段，而是用户复制粘贴了不该泄露的数据，或通过反复试验发现了机器人会执行你未预料的操作。处理器并不能阻止所有可能的问题，但它们能让显而易见的风险变得更难实现。

### 资源

- [Mastra Guardrails 文档](https://mastra.ai/docs/agents/guardrails)
- [安全最佳实践](https://mastra.ai/docs/security)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列文章

1. [LLM Routing](../llm-routing-mastra-ai)
2. **Security & Guardrails** (本文)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
