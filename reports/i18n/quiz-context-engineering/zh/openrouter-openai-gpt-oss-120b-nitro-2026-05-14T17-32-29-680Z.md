# Translation Candidate
- Slug: quiz-context-engineering
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-09--quiz-context-engineering/zh/index.mdx
- Validation: deferred
- Runtime seconds: 35.13
- Input tokens: 16669
- Output tokens: 13095
- Thinking tokens: unknown
- Cached input tokens: 5120
- Cache write tokens: 0
- Estimated cost: $0.004142
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 测验：14 个上下文工程问题
subTitle: 提示工程是你在做的事，语境工程是你交付的事。
date: '2026-05-09'
modified: '2026-05-09'
tags:
  - quiz
  - ai
  - llm
  - context-engineering
  - prompts
  - rag
  - tokens
  - advanced
category: Quiz
subCategory: AI
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">Prompt engineering 获得口号。Context engineering 获得呼叫器。你对实际交付的 AI 系统的哪部分了解有多深？</p>

本测验涵盖上下文窗口、令牌预算、检索、提示结构以及将干净演示转变为令人困惑的产品的失败模式。它从温和开始，但不会止步于此。

拿出凭证。

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="基础"
  title="上下文窗口基础"
  options={[
    {text: '每分钟的最大请求数'},
    {text: '输入和输出的合计 token 限制', isAnswer: true},
    {text: '对话中的消息数量'},
    {text: '会话之间可用的内存'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 LLM 中，“上下文窗口”指的是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    上下文窗口是模型在一次调用中能够处理的 token 总数——**输入 + 输出的合计**。128K 的上下文窗口意味着你的提示词 + 检索到的文档 + 对话历史 + 模型的回复必须全部控制在 128,000 个 token 之内。

    它与会话、内存或速率限制毫无关系。当达到上限时，模型要么截断，要么报错，甚至更糟——悄悄丢弃你未预料的 token。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="基础"
  title="Token 估算"
  options={[
    {text: '大约 50 个 token'},
    {text: '大约 130 个 token', isAnswer: true},
    {text: '大约 300 个 token'},
    {text: '大约 1,000 个 token'},
  ]}
>
  <slot name="question">
  <div className="question">
    一段 100 字的英文段落，大概会消耗多少 token（使用常见的现代分词器）？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    经验法则是 **~每词 1.3 个 token**，适用于典型的英文散文。100 词的段落约等于 130 个 token。

    不同内容类型差异显著：
    - 代码：约每词 1.5–2 个 token（特殊字符、空白）
    - 含大量标识符的技术文档：可能更高
    - 常见英文单词：通常每词 1 个 token
    - 稀有词、姓名、非英文文本：通常每词 2–4 个 token

    `tiktoken` 库可以给出精确计数。务必在假设之前先测量。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="基础"
  title="系统提示的作用"
  options={[
    {text: '它会首先被处理，并且相对于用户消息拥有更高的权重', isAnswer: true},
    {text: '它与用户消息相同，只是显示方式不同'},
    {text: '它仅用于 API 调用，而不用于聊天界面'},
    {text: '它在会话之间持久存在，充当长期记忆'},
  ]}
>
  <slot name="question">
  <div className="question">
    使用 `system` 角色与 `user` 角色在 messages 数组中的实际效果是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `system` 角色被视为更高优先级的指令进行处理。模型在训练时会给予它比用户消息更大的权重——它是“开发者说了什么”和“用户说了什么”之间的架构边界。

    它并非魔法。不能保证模型会忽略冲突的用户指令（见：prompt injection）。但它确实显著提升模型遵循你的指令的倾向，尤其是在具备强指令遵循能力的模型上。

    实际操作中：把你的角色设定、规则和行为约束放在 `system` 中。把检索到的上下文和用户数据放在 `user` 中。绝不要把用户可控的输入放进 `system`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="检索"
  title="中间迷失"
  options={[
    {text: '模型在上下文放置位置上表现相同'},
    {text: '模型在上下文位于最末时表现最佳'},
    {text: '模型在上下文位于开头和结尾时表现最佳，而在中间时表现最差', isAnswer: true},
    {text: '模型在上下文位于提示中间时表现最佳'},
  ]}
>
  <slot name="question">
  <div className="question">
    对“中间迷失”问题的研究表明，大语言模型往往会：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    《Lost in the Middle 论文 (Liu et al., 2023)》[链接](https://arxiv.org/abs/2307.03172) 证明，LLM 在长上下文中放置于中间的信息时可靠地表现不佳。当相关信息出现在上下文窗口的 **开头或结尾** 时，性能显著更高。

    实际意义：在向 RAG 提示中插入检索块时，不要仅仅按相关性顺序追加它们。把排名最高的结果放在最前，第二高的放在最后，中间填入排名较低的材料。看似违背直觉，却有可衡量的提升。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="检索"
  title="分块策略"
  options={[
    {text: '使用上下文窗口允许的最大块大小'},
    {text: '始终使用 512 token — 它'},
    {text: '使用与内容结构匹配的重叠块大小', isAnswer: true},
    {text: '块大小不'},
  ]}
>
  <slot name="question">
  <div className="question">
    在对文档进行 RAG 分块时，最重要的原则是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    没有通用的正确块大小——它取决于你的内容。重要原则有：

    1. **匹配你的内容结构。** FAQ 页面在问答层级上分块效果好。法律文档在条款层级上分块效果好。代码在函数层级上分块效果好。
    2. **使用重叠。** 一个 512 token 的块在两侧各有 64 token 的重叠，意味着跨越边界的答案仍能被检索到。
    3. **进行测量。** 构建评估集并测试多种块大小。块大小比嵌入模型更重要。

    “512 token”是一个合理的起点，但不是硬性规定。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="检索"
  title="混合搜索"
  options={[
    {text: '为冗余而将同一查询执行两次'},
    {text: '在同一语料库上使用两种不同的嵌入模型'},
    {text: '将向量搜索与关键词搜索结合，以获得更好的检索效果', isAnswer: true},
    {text: '同时在多个向量数据库中进行搜索'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 RAG 系统中，“混合搜索”指的是：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    混合搜索将 **向量搜索**（通过嵌入实现语义相似度）与 **关键词搜索**（BM25 / 全文检索）结合，因为它们的弱点互补：

    - 向量搜索在精确词汇上表现欠佳：产品名称、错误码、型号、技术标识符
    - 关键词搜索在同义改写上受限：比如 “如何取消” 与 “终止订阅”

    两者的结果通过 **Reciprocal Rank Fusion (RRF)** 融合——这是一种无需归一化分数即可合并多个排序列表位置的排名算法。

    在 Postgres 中，使用 `pgvector` + `tsvector` 即可实现上述功能，无需额外的搜索服务。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="令牌管理"
  title="上下文预算"
  options={[
    {text: '使用 95% 以上的上下文窗口以最大化信息'},
    {text: '为输出保留足够的余量，而不是填满整个窗口', isAnswer: true},
    {text: '上下文预算仅在 32K 令牌以下的模型中重要'},
    {text: '当超出窗口时模型会自动截断'},
  ]}
>
  <slot name="question">
  <div className="question">
    在使用检索到的上下文构建 RAG 提示时，关于上下文预算的一个实用经验法则是：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    上下文窗口在 **输入和输出** 之间共享。如果你将 90% 用于输入，模型只剩下 10% 的窗口用于生成响应——这常导致输出被截断或质量下降。

    一个合理的经验法则：先确定期望的输出大小，然后让输入保持在剩余预算的舒适范围内。对多数 RAG 任务而言，这意味着 **输入不超过总上下文窗口的 60–70%**（系统提示 + 历史 + 检索到的上下文）。将其余部分留给生成并预留安全余量。

    此外，模型在接近上下文窗口边缘时表现会变差——随着上下文填满，理解和指令遵循都会下降。虽然技术上可以运行到 95%，但体验与运行在 50% 时截然不同。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="令牌管理"
  title="对话历史管理"
  options={[
    {text: '始终发送完整的对话历史'},
    {text: '当历史超过令牌预算时，对旧消息进行摘要', isAnswer: true},
    {text: '删除旧消息——模型拥有持久记忆'},
    {text: '将历史存储在向量数据库中并检索相关回合'},
  ]}
>
  <slot name="question">
  <div className="question">
    在多轮聊天应用中，当对话历史变得很长时，正确的策略是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    LLM 并没有持久记忆。每次 API 调用都是无状态的——你发送完整上下文，得到响应。对话的“记忆”完全取决于你在每个请求中包含的消息历史。

    当历史超过你的预算时，可选方案有：
    1. **Summarize**：将较旧的回合压缩成持续的摘要，保留最近的回合原文
    2. **Sliding window**：保留最近的 N 条回合，丢弃更早的
    3. **Selective retrieval**：对对话回合进行嵌入，并在每次查询时检索相关回合（复杂但强大）

    普通截断——为了凑合而削减旧消息——是最糟的选项，因为它会悄悄移除模型可能需要的上下文。

    向量数据库检索对话历史在理论上很吸引人，但对大多数聊天应用来说通常是大材小用。摘要是务实的默认选择。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="提示结构"
  title="少量示例"
  options={[
    {text: '更多示例总是能产生更好的结果'},
    {text: '在提示中使用 3–5 条高质量、多样化的示例', isAnswer: true},
    {text: '少量示例仅对分类任务有帮助'},
    {text: '示例应放在用户查询之后，而不是之前'},
  ]}
>
  <slot name="question">
  <div className="question">
    对于大多数生产场景，最佳的少量示例策略是：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    少量示例能显著提升输出的一致性和格式遵循度。对大多数任务而言，最佳取值是 **3–5 条高质量、多样化的示例**。

    为什么不放更多？每个示例都要消耗 token。超过 5–10 条示例后，边际收益下降，而 token 成本持续上升。示例过多还会增加模型对示例过拟合、而不是理解底层模式的风险。

    为什么多样性重要：如果所有示例都是同一种输入，模型在边缘案例上就难以泛化。请加入覆盖最关键变体的示例。

    放置位置：示例应放在 *用户查询之前*，作为系统提示的一部分或预填的对话轮次——而不是之后。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="提示结构"
  title="XML 标签用于结构化"
  options={[
    {text: 'XML 标签仅在 Anthropic 模型中有效'},
    {text: 'XML 标签帮助模型区分指令和数据，并提升解析准确性', isAnswer: true},
    {text: 'XML 标签会减慢分词速度，应该避免使用'},
    {text: 'XML 标签等同于 markdown 标题'},
  ]}
>
  <slot name="question">
  <div className="question">
    为什么许多生产环境的提示会使用像 `<document>`、`<context>`、`<instructions>` 这样的 XML 风格标签？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    XML 风格标签提供 **显式结构边界**，模型已被训练去识别并遵守。它们有两大作用：

    1. **分离**：它们向模型指示指令结束、数据开始的位置——这对 RAG 以及降低检索文档的提示注入风险至关重要。
    2. **可解析性**：当你让模型以 XML 响应（例如 `<answer>...</answer>`）时，标签为你提供了干净的提取点，无需正则 hack。

    这并不是把 XML 当作标记语言使用，而是把 XML 作为模型已学习的分隔约定。之所以有效，是因为模型在训练中大量见过这种模式，而不是因为它在验证模式。

    在大多数指令微调模型上都能工作得足够好——这是一种训练数据约定，而非厂商特性或安全保证。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="高级"
  title="温度与确定性"
  options={[
    {text: 'temperature=0 总是为相同输入产生完全相同的输出'},
    {text: 'temperature=0 使输出更具确定性，但不保证完全相同', isAnswer: true},
    {text: 'temperature=0 会禁用模型\'},
    {text: 'temperature 只影响响应的长度'},
  ]}
>
  <slot name="question">
  <div className="question">
    在你的 LLM 调用中设置 `temperature=0` 意味着：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `temperature=0` 使模型在每一步选择概率最高的 token（贪婪解码），从而产生 **更一致** 的输出——但并不保证完全相同的输出。

    temperature=0 下的变异来源：
    - **浮点数非确定性** 在 GPU 计算中，尤其是在不同硬件或批量大小之间
    - **服务器端基础设施变化**（模型更新、服务架构）
    - **长输出** 会累积细微差异

    对于需要严格确定性的测试套件和评估，`temperature=0` 是正确的选择——但不要编写依赖字节级完全相同输出的断言。应当断言结构、关键内容和行为，而不是精确的字符串。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="高级"
  title="提示缓存"
  options={[
    {text: '缓存会存储响应并在相同查询时重新播放'},
    {text: '缓存会存储静态提示前缀的已编译 KV 对，以降低输入 token 成本', isAnswer: true},
    {text: '缓存仅在 OpenAI 模型中可用'},
    {text: '缓存是自动的，无需开发者配置'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 LLM API（Anthropic、OpenAI）的上下文中，什么是“提示缓存”？
    <p className="text-sm">最后验证时间：2026 年 5 月 8 日。提供商的缓存控制和定价变化迅速。</p>
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    提示缓存会在提供商支持时复用已计算的 **KV 缓存 / 提示前缀状态** 用于静态提示前缀。后续使用相同前缀的请求，模型可以跳过对这些 token 的重新处理——从而降低延迟并显著降低成本。

    这不是响应缓存。模型仍会每次生成全新的响应。你只是避免了对不变提示部分的重新分词和注意力计算。

    最佳使用场景：大型系统提示、静态文档、工具定义、少量示例——任何在多次请求中保持相同的内容。缓存的前缀必须位于提示的 *开头*。

    与以下概念不同：语义去重、响应记忆或应用层缓存。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="高级"
  title="基础与幻觉"
  options={[
    {text: '在系统提示中告诉模型“不要产生幻觉”'},
    {text: '使用更高的 temperature 来生成更自信的回复'},
    {text: '提供检索到的源文档并指示模型引用它们', isAnswer: true},
    {text: '使用更大的模型——幻觉只会在小模型中出现'},
  ]}
>
  <slot name="question">
  <div className="question">
    在生产 AI 系统中降低幻觉的最有效技术是：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    指示模型不要产生幻觉并不能阻止幻觉——模型没有可靠的自省信号来判断“我在编造”。这只会导致模型自信地告诉你它没有编造，却仍在编造。

    实际上有效的办法是：**grounding**。向模型提供它正确回答所需的信息，并将其约束在这些信息范围内：
    ```
        Answer only using the provided documents.
        If the answer isn't in the documents, say: "I don't have enough information to answer that."
    ```
    随后验证输出：检查响应中的主张是否出现在检索到的上下文中。这就是引用 grounding 检查——实现细节请参见 RAG 评估讨论。

    更大的模型平均幻觉更少，但所有模型都会产生幻觉。grounding 才是缓解策略，而不是模型大小。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="专家"
  title="上下文工程 vs. 微调"
  options={[
    {text: '微调总是更好——上下文工程只是权宜之计'},
    {text: '上下文工程免费；微调成本高；应始终使用上下文工程'},
    {text: '上下文工程在每次请求时改变行为；微调则永久修改模型权重', isAnswer: true},
    {text: '它们是同一种技术的不同叫法'},
  ]}
>
  <slot name="question">
  <div className="question">
    上下文工程和微调的关键区别是什么？微调在何种情况下真正有意义？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    **上下文工程** 通过提示塑造模型行为——系统指令、few-shot 示例、检索到的上下文。它是每次请求级别的，可逆的，无需训练。

    **微调** 在你的数据上更新模型权重。更改是永久的（针对该检查点），并在每次推理时生效。

    微调真正更好的情形包括：
    - 需要模型保持一致的风格/格式，而仅靠指令无法可靠实现
    - 任务需要在特定领域模式上重复行为，提示和检索无法解决
    - 需要缩短提示长度——微调后的行为不必在每次请求中解释
    - 大量请求中，一致的 few-shot 示例会消耗大量 token

    微调显得大材小用的情形包括：
    - 指令可以塞进系统提示中
    - 主要需要的是实时或专有的事实，可在请求时检索得到
    - 需求经常变化（需要频繁重新微调）
    - 还没有先穷尽上下文工程的可能性

    正确的顺序：先把上下文工程做到位，只有在它确实不足时才考虑微调。
  </div>
  </slot>
</Challenge>

</QuizUI>

---
---

你得了多少分？

- **13–14**：你在构建生产级 AI 系统，而不是仅仅做演示。很少见。
- **9–12**：扎实的实践者。你了解工具，但细节仍有模糊之处。
- **5–8**：你大量使用过 LLM，但对上下文管理缺乏深入思考。去阅读提示缓存和混合搜索——它们会改变你对成本的认知。
- **0–4**：好消息：本测验的所有内容都可以学习，并且立刻可用。仅“中间迷失”这一题就值得在下次 RAG 部署前弄清楚。

上下文工程是一门有意决定将何种信息放入窗口、放在哪里以及如何组织的学科。模型是系统中最难控制的部分。围绕它的所有东西都是你的。---
````
