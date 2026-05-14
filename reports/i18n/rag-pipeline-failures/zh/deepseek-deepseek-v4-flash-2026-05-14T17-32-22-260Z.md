# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/zh/index.mdx
- Validation: deferred
- Runtime seconds: 25.13
- Input tokens: 5923
- Output tokens: 3648
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001798
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: RAG在生产中失败的五个方式
subTitle: 演示成功了。真正的用户才是管道断裂的地方。
date: '2026-05-04'
modified: '2026-05-05'
tags:
  - ai
  - rag
  - vector-search
  - llm
  - production
  - embeddings
  - architecture
category: AI
subCategory: Architecture
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
RAG 演示看起来总是很棒。

你嵌入一些文档，启动一个向量存储，把它连到聊天界面，然后看着模型引用你的内部知识库，就像它已经在那里工作了好几年。很漂亮。利益相关者被打动了。有人说：“把这个上线吧。”

六周后，用户开始得到自信满满的错误答案。支持工单堆积如山。系统*确实*在工作，只是不是人们需要的那种方式。

失败通常不是一次戏剧性的错误。而是五个无聊的问题堆叠在一起。

---

## 1. 你的块大小不对

这种失败不会导致崩溃。它只是让每个答案都稍微变差一点，直到整个功能让人觉得不可信。

向量搜索检索的是*块*，而不是文档。无论你把源材料切分成什么，那都成了检索器的真相单元。如果块不对，模型就会用错误的片段来回答。

**太小**：块只包含部分答案。嵌入捕获了正确的主题，但检索到的文本缺少上下文。你取到了“最大超时时间为30秒”，却没有它前面的那句“当使用旧版API时”。

**太大**：嵌入变成了多个想法的模糊平均值。语义搜索会困惑，因为块涉及多个主题，最终向量无法清晰地代表其中任何一个。

正确的块大小完全取决于你的内容。技术文档、法律合同和支持工单的切分方式各不相同。没有通用答案。

该怎么做：测量。从你的语料库中构建一组问答对作为评估集。尝试256、512和1024 token的块。测量检索精确率：正确的块是否出现在前5个结果中？你会很快发现，块大小比你纠结的嵌入模型更重要。

还要使用重叠。一个512 token的块，每侧重叠64 token，这样跨边界的答案仍然能被检索到。大多数向量库支持这个功能。大多数人却跳过了它。

---

## 2. 你的嵌入会过时（而且你不会注意到）

想象一下你的公司改名了。或者产品改名了。或者更新了定价。或者废弃了一个API。

你更新了文档，但没有重新嵌入块。向量索引仍然代表旧内容。

用户询问新定价。嵌入把他们路由到旧内容。模型读取旧内容，自信地解释旧定价。支持团队收到工单。

每个严肃的RAG系统最终都会遇到这个问题。修复方法听起来很明显——内容变更时重新嵌入——但团队很少在第一次事故前就构建好这条流水线。

你需要带内容指纹的增量重新索引：

```typescript
import { createHash } from 'crypto';

async function upsertDocument(doc: Document, vectorStore: VectorStore) {
  const fingerprint = createHash('sha256')
    .update(doc.content)
    .digest('hex');

  const existing = await vectorStore.getBySourceId(doc.id);

  if (existing?.fingerprint === fingerprint) {
    return; // 内容未变，跳过重新嵌入
  }

  const chunks = chunkDocument(doc);
  const embeddings = await embedBatch(chunks);

  await vectorStore.upsert(
    chunks.map((chunk, i) => ({
      id: `${doc.id}:${i}`,
      sourceId: doc.id,
      fingerprint,
      vector: embeddings[i],
      text: chunk.text,
      metadata: { ...doc.metadata, updatedAt: new Date() },
    }))
  );
}
```

在写入时重新索引，对内容而不是时间戳做指纹。你的CMS中文档经常更新，但实际内容可能没变。

---

## 3. 检索精确率 vs. 召回率：你优化错了方向

大多数RAG教程只展示如何检索top-K个块。它们没有解释两个相互矛盾的目标之间的权衡。

**高召回率**：返回所有可能相关的内容。用户总能得到答案。但模型的上下文窗口里塞满了边缘相关的噪声，模型为了填补片段之间的空隙而开始幻觉。

**高精确率**：只返回最相关的块。模型处理的是干净、聚焦的上下文。但如果正确的块不在前3名，模型就没有信息，然后自信地编造一个答案。

这两种失败模式对用户来说看起来一模一样：错误的答案。但原因和修复方法却截然相反。

两种实际有效的技术：

**重排序**：检索更多候选（top-20），然后使用交叉编码器模型按相关性重新排序，再传给LLM。交叉编码器比向量相似度慢，但在最终排序步骤中准确度显著更高。

```typescript
import { Reranker } from '@mastra/rag';

const results = await vectorStore.search(queryEmbedding, { topK: 20 });
const reranked = await reranker.rank(query, results);
const context = reranked.slice(0, 5); // 现在top-5才真正有意义
```

**混合搜索**：将向量搜索（语义相似度）与关键词搜索（BM25）结合。它们的失败方式不同。向量搜索在处理特定术语、模型名称和ID时表现不佳。关键词搜索在处理同义改写和同义词时表现不佳。两者结合，互相弥补盲区。

---

## 4. 你的上下文窗口形状不对

你已经检索到了正确的块。恭喜。但模型仍然会出错。

问题不仅在于你检索了什么，还在于你把它放在了哪里。

LLM可能会遭遇"中间丢失"问题。Liu等人测量发现，长上下文模型在相关信息出现在提示词中间时，使用信息的可靠性低于出现在开头或结尾时。

如果你把20个块塞进一个扁平列表，指望模型能正确综合它们，那你就是在浪费性能。

Things that actually help:

**评估最相关块的起始和结束位置。** 一个常见的启发式方法是：将最相关的块放在开头，第二相关的放在结尾，其余放在中间。这听起来反直觉，但值得针对你的模型和提示词形状进行测试。

**显式编号并标注上下文段落。** `[Source 1]` ... `[Source 2]` 为模型提供了推理的锚点。

**添加检索置信度信号。** 如果相似度得分在0-1尺度上是0.65，告诉模型：“以下上下文以中等置信度检索。如果答案不明确，请承认不确定性。”

**设定上下文预算。** 不要直接传递所有检索到的内容。统计token数量，按相关性得分排序，并在模型上下文窗口的60-70%处硬截断。留出空间让模型进行推理，而不是在过载中挣扎。

参考：[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)

---

## 5. 你根本不知道它什么时候出错

这是无声的失败：答案返回了，UI看起来正常，但内容是错的。

对于传统API，失败是可见的：HTTP 500、超时、模式验证错误。你能立即知道。RAG的失败更安静：系统返回一个响应，看起来合理，但它是错的。

你可能直到用户告诉你才知道RAG管道出错了。而用户往往不会说。他们只是不再信任它，然后回到Ctrl+F。

生产级RAG系统的最小可行可观测性设置：

**记录你的检索链。** 每次查询、检索到的内容（块ID + 得分）以及模型生成的内容。你需要这些来调试任何问题。

**追踪检索指标。** 如果有真实标签，追踪平均倒数排名（MRR）和NDCG。至少，追踪相似度得分分布——如果你的P50检索得分下降，说明你的索引质量下降了。

**构建反馈循环。** 即使在响应上添加一个点赞/点踩，并关联回查询和检索到的块，也能为你提供训练信号。没有它，你就是在盲目飞行。

**定期运行评估。** 准备一个包含50-100个问题及其已知正确答案的测试集，每周运行一次，就能在用户发现之前捕捉到回归。一个电子表格加一个脚本就足以开始。

```typescript
async function runEval(
  testCases: { query: string; expectedAnswer: string }[],
  pipeline: RAGPipeline
) {
  const results = await Promise.all(
    testCases.map(async ({ query, expectedAnswer }) => {
      const response = await pipeline.query(query);
      const score = await scoreResponse(response, expectedAnswer);
      return { query, score, response };
    })
  );

  const avgScore = results.reduce((s, r) => s + r.score, 0) / results.length;
  console.log(`Eval score: ${(avgScore * 100).toFixed(1)}%`);
  
  // Alert if score drops below threshold
  if (avgScore < 0.75) {
    await notifyTeam(`RAG eval score dropped to ${(avgScore * 100).toFixed(1)}%`);
  }

  return results;
}
```

---

## 真正的问题

这些失败主要不在于嵌入模型或向量数据库，而在于围绕它们的系统。

RAG 演示之所以有效，是因为演示条件受控：干净的文档、结构良好的问题、宽容的评估者。生产环境失败，是因为这些条件无一成立。

上述每个失败都是可诊断的，但前提是你正在测量。可靠的 RAG 团队并没有做什么特别的事情。他们只是将检索质量视为一个真正的子系统，而不是演示的附属品。

先建立评估循环。一旦你能测量它，其他一切都会变得更容易。
````
