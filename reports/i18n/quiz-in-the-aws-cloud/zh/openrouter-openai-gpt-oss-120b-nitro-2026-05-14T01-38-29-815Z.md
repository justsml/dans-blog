# Translation Candidate
- Slug: quiz-in-the-aws-cloud
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-28--quiz-in-the-aws-cloud/zh/index.mdx
- Validation: passed: local checks only
- Runtime seconds: 48.69
- Input tokens: 28039
- Output tokens: 16782
- Thinking tokens: unknown
- Cached input tokens: 8960
- Cache write tokens: 0
- Estimated cost: $0.004999
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：AWS 存储：20+ 题目
subTitle: 你能在云端迷宫中找到出路吗？
label: AWS Storage
category: Quiz
subCategory: Cloud
date: '2024-12-28'
modified: '2024-12-29'
tags:
  - quiz
  - aws
  - cloud
  - storage
  - databases
  - s3
  - dynamodb
  - rds
  - elasticache
social_image: ../mobile.webp
cover_full_width: ../aws-cloud--city-focus-wide.webp
cover_mobile: ../aws-cloud--city-focus-square.webp
cover_icon: ../aws-cloud--city-focus-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">准备好上云了吗？！ 🤡</p>

深入探索 AWS 存储服务！本测验将检验你对 S3、DynamoDB、Aurora、RDS、ElastiCache 等的了解。从最佳实践到隐藏坑点，我们一起盘点云存储全景。

准备好展示你的云技术实力吧！ 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="S3 小测验"
  difficulty={1}
  objectives={[
    "回忆 AWS S3 服务名称的含义",
    "识别基础的 AWS 存储服务",
  ]}
  options={[
    {text: '服务器存储 v3'},
    {text: '存储即服务'},
    {text: '简单存储服务', isAnswer: true},
    {text: '俏皮存储服务'},
    {text: '简单同步存储'},
  ]}
>
  <slot name="question">
  <div className="question">
    <p className="text-sm">最后验证时间：2026年5月8日。AWS 限制和定价变化迅速。</p>
    `S3` 名称代表什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 代表 **Simple Storage Service**（简单存储服务）。它是一个可扩展的对象存储服务，专为大规模数据存储而设计。

    AWS S3 提供多种存储类别：
    - Standard：适用于频繁访问的数据
    - Infrequent Access (IA)：对访问频率较低的数据提供更低成本
    - Glacier：长期、低成本的归档存储

    每个类别都有不同的定价和访问特性，帮助根据数据使用模式进行成本优化。

    [了解更多关于 S3 存储类别](https://aws.amazon.com/s3/storage-classes/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="无模式"
  title="DynamoDB"
  difficulty={2}
  objectives={[
    "定义无模式数据库的特征",
    "解释 DynamoDB 的灵活数据模型",
  ]}
  options={[
    {text: '存储任意属性', isAnswer: true},
    {text: '动态分区键'},
    {text: '列是无类型的'},
    {text: '自动管理的 JSON 模式'},
    {text: '依赖 RDS 提供模式支持'},
  ]}
>
  <slot name="question">
  <div className="question">
    当 DynamoDB 被描述为“无模式”时，这意味着什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB 被认为是“无模式”的，因为它允许你在项目中存储任意属性，而无需预先定义模式。

    [DynamoDB 最佳实践](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="无模式"
  title="DynamoDB"
  difficulty={4}
  objectives={[
    "比较 DynamoDB 批量操作能力",
    "优化 DynamoDB 更新操作",
    "评估更新的扩展性考虑因素",
  ]}
  options={[
    {text: 'PutItem', hint: '创建一个新项，或用新项替换旧项。'},
    {text: 'BatchUpdateItem', hint: '不存在。'},
    {text: 'BatchWriteItem', hint: '在一次调用中放入（插入）或删除多个项。'},
    {text: 'UpdateItem', isAnswer: true},
    {text: 'BatchUpsertItem', hint: '在 DynamoDB 中？'},
    {text: 'TransactWriteItems', hint: '将多个 PutItem、UpdateItem、DeleteItem 和 ConditionCheck 操作合并为一次调用。'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个 DynamoDB API 会在单个已有项上更新属性？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    关键在于 <b>updates</b>，而不是 inserts 或 PUTs。如果你在做插入，可以使用 `BatchWriteItem` 或 `TransactWriteItems`。

    虽然 `BatchWriteItem` 能处理多个操作，但它仅限于 PUT 和 DELETE。`TransactWriteItems` 更强大，但对简单更新来说有点大材小用。
    对于简单更新，`UpdateItem` 是最佳选择。它允许你 UPDATE，或修改已有项中的一个或多个属性。

    `UpdateItem` 操作每次请求只修改一个项。对于大规模回填或批量更新，通常会编排大量 `UpdateItem` 调用，或使用更大的工作流，例如 PartiQL 批处理执行、Step Functions、Glue、EMR，或自定义工作进程。

    `UpdateItem` 操作：
    - 更新已有项的属性。
    - 向已有项添加新属性。
    - 从已有项删除属性。
    - 在项存在或满足特定条件时有条件地执行更新。

    [DynamoDB UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="查询能力"
  title="高级搜索功能"
  difficulty={3}
  objectives={[
    "了解 AWS 各服务的高级查询能力",
    "比较全文搜索功能",
  ]}
  options={[
    {text: 'ElastiCache', hint: '主要是内存缓存；新版 Valkey 包含搜索功能。'},
    {text: 'OpenSearch', isAnswer: true},
    {text: 'Neptune', hint: '具备高级查询能力的图数据库'},
    {text: 'Redshift', hint: '复杂的分析查询'},
    {text: 'DocumentDB', hint: '兼容 MongoDB 的查询'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪个 AWS 服务是专为全文搜索和搜索分析而构建的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    OpenSearch 是 AWS 的托管搜索、日志分析和全文搜索工作负载服务。

    干扰项都是有用的服务，但它们并不是此列表中专为搜索引擎构建的服务：
    - ElastiCache：主要是内存缓存。当前的 ElastiCache for Valkey 包含针对已索引内存数据的搜索命令，因此不再准确地说整个服务没有内置搜索。
    - Neptune：图数据库；它可以与 OpenSearch 集成实现全文搜索。
    - Redshift：用于 SQL 分析的数据仓库。
    - DocumentDB：文档数据库，在受支持的版本中提供 MongoDB 兼容的文本搜索。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="RDS"
  title="多可用区部署"
  difficulty={2}
  objectives={[
    "识别多可用区部署的主要目的",
    "区分高可用性和读取扩展",
  ]}
  options={[
    {text: '降低存储成本'},
    {text: '解决出站流量问题'},
    {text: '提供自动故障转移', isAnswer: true},
    {text: '提升读取性能'},
    {text: '改善地理分布流量'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS 多可用区部署的**主要**好处是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    可用区（AZ）是位于**同一区域内**的独立数据中心。RDS 多可用区部署会在*相邻* AZ 中的备用副本上提供自动故障转移。

    Multi-AZ 部署：
    - 提供自动故障转移
    - 提高数据库可用性
    - 创建同步备用副本
    - 在基础设施故障期间将停机时间降至最低

    不要把 Multi-AZ 部署与用于扩展读取操作的只读副本混淆。

    {/* [RDS 多可用区详情](https://aws.amazon.com/rds/features/multi-az/) */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="WebSocket"
  title="WebSocket 巫术"
  difficulty={3}
  objectives={[
    "比较 AWS 服务对 WebSocket 的支持",
    "识别 AWS 服务的架构限制",
    "评估 WebSocket 实现方案",
  ]}
  options={[
    {text: 'API Gateway', isAnswer: true},
    {text: 'EKS', hint: 'EKS 可以运行您自己的长期 WebSocket 服务。'},
    {text: 'Lightsail', hint: 'Lightsail 实例可以运行您自己的 WebSocket 服务器。'},
    {text: 'AppSync', hint: 'AppSync 提供基于 WebSocket 的托管实时 GraphQL 订阅，而不是任意的原始套接字。'},
    {text: 'EC2', hint: 'EC2 可以运行您自己的长期 WebSocket 服务器进程。'},
  ]}
>
  <slot name="question">
  <div className="question">
    👋 我希望你到目前为止玩得开心！

    来个棘手的吧……

    哪个 AWS 服务提供托管的 WebSocket API，AWS 拥有客户端连接并将消息路由到集成？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    API Gateway 支持双向 WebSocket API，但实现由 API Gateway 托管，而不是直接映射到您自己的服务器进程。
    API Gateway 维护客户端连接，并将消息路由到 Lambda、HTTP 端点或其他集成。可以通过 API Gateway Management API 将消息发送回已连接的客户端。

    其他服务对 WebSocket 更友好：
    - Lightsail：非常适合简单的 WebSocket 部署 👌
    - AppSync：使用 WebSocket 实现托管的 GraphQL 订阅
    - EC2：经典的“想干嘛就干嘛” WebSocket 选项
    - EKS：适合运行可扩展的 WebSocket 集群

    小技巧：如果需要原始 WebSocket 能力，还是使用计算服务吧！
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="S3 安全"
  title="S3 存储桶策略"
  difficulty={2}
  objectives={[
    "对 S3 应用安全最佳实践",
    "实现最小权限原则",
  ]}
  options={[
    {text: '将新存储桶设为公开', hint: '最小权限，优先考虑。'},
    {text: '将本地 S3 迁移以完全控制 ACL'},
    {text: '将数据迁移到私有区块链', hint: '开玩笑的吧？'},
    {text: '使用最小权限原则', isAnswer: true},
    {text: '使用策略通配符确保必要访问', hint: '😯 绝不！'},
  ]}
>
  <slot name="question">
  <div className="question">
    推荐的 S3 存储桶权限管理方式是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在几乎所有系统中，采用“最小权限”设计是强化安全、面向未来的关键手段。想要在已有系统上收紧权限，难度堪比把整座办公楼搬到新地基。

    S3 存储桶也不例外。要落实最小权限原则，先从没有权限开始，只授予必需的访问。使用 IAM 角色和策略来控制访问，并定期审计存储桶权限。

    安全最佳实践：
    - 应用最小权限原则
    - 从无权限开始
    - 只授予必要的访问
    - 使用 IAM 角色和策略
    - 定期审计存储桶权限

    避免过于宽松的设置，以免泄露敏感数据。

    [S3 安全最佳实践](https://aws.amazon.com/s3/security/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Aurora"
  title="Aurora Serverless"
  difficulty={2}
  objectives={[
    "识别 Aurora Serverless 的关键特性",
    "区分无服务器和预置数据库",
  ]}
  options={[
    {text: '始终比预置实例更便宜'},
    {text: '自动扩展计算容量', isAnswer: true},
    {text: '提供无限存储'},
    {text: '消除数据库管理'},
  ]}
>
  <slot name="question">
  <div className="question">
    Aurora Serverless 的关键特性是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless:
    - 自动扩展计算容量
    - 根据工作负载调整资源
    - 适用于不可预测的工作负载
    - 仅为使用的资源付费

    非常适合流量波动的应用程序。

    [Aurora Serverless 概览](https://aws.amazon.com/rds/aurora/serverless/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="批处理，第一部分！"
  title="BatchGetItem 限制"
  difficulty={2}
  objectives={[
    "回忆 DynamoDB BatchGetItem 的限制",
    "将 BatchGetItem 与其他批处理操作进行比较",
  ]}
  options={[
    {text: '1', hint: '... 我坚持使用批处理。'},
    {text: '25', hint: '这是 `BatchWriteItem` 的限制。'},
    {text: '100', isAnswer: true},
    {text: '75', hint: '接近了，但有一个整数。'},
    {text: '50', hint: '`BatchGetItem` 的限制稍高一些。'},
    {text: '200', hint: '有点太高了……'},
    {text: 'Unlimited', hint: '`BatchGetItem` 实际上有固定的限制。'},
  ]}
>
  <slot name="question">
  <div className="question">
    再来一个 DynamoDB 批处理问题！<br />
    单次 DynamoDB `BatchGetItem` 请求最多能检索多少项？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB SDK 允许在单个 `BatchGetItem` 请求中检索最多 **100** 项。这比 `BatchWriteItem` 的限制（25 项）要高。
    此外，还存在总负载大小、文档大小和请求速率的限制。

    理解这些限制对于优化应用性能和确保高效的数据操作至关重要。

    **注意：** 某些限制可以通过与 AWS 客户经理“甜言蜜语”协商而突破。 😎
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="批处理，第二部分！"
  title="批处理操作"
  difficulty={4}
  objectives={[
    "了解 DynamoDB 批处理操作限制",
    "区分单项操作和批处理操作",
  ]}
  options={[
    {text: '1', isAnswer: true},
    {text: '10'},
    {text: '25', hint: '猜得不错…'},
    {text: '50'},
    {text: '100', hint: '在想 GetItem 限制吗？'},
    {text: '100 when streaming'},
    {text: 'None of the above', hint: '这有点棘手…'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 每个批次最多能 `UPDATE` 多少文档？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB 客户端本质上都是其 HTTP API 的包装。`BatchWriteItem` 操作可以在一次 HTTP 请求中 `PUT` 或 `DELETE` 最多 **25** 条文档，但它不能一次 `UPDATE` 多条文档。

    虽然 DynamoDB 可以在一次 HTTP 请求中 `INSERT` 最多 **25** 条文档，但使用 `UpdateItem` 操作时每次只能 `UPDATE` **1** 条文档。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="DynamoDB"
  title="预置容量 vs 按需容量"
  difficulty={3}
  objectives={[
    "比较 DynamoDB 的容量模式",
    "根据工作负载选择合适的容量模式",
    "评估容量选择的成本影响",
  ]}
  options={[
    {text: '预置容量总是更好'},
    {text: '按需容量拥有无限的容量'},
    {text: '它们的性能完全相同'},
    {text: '按需容量在不可预测的工作负载下更便宜', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    何时应该使用 DynamoDB 按需容量？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    按需容量最适合：
    - 不可预测的工作负载
    - 零星流量
    - 访问模式未知的应用
    - 避免过度预置

    预置容量更适合：
    - 可预测、稳定的工作负载
    - 对性能有更强的控制
    - 可能的成本节约

    [DynamoDB Capacity Modes](https://aws.amazon.com/dynamodb/pricing/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="S3 性能"
  title="S3 性能优化"
  difficulty={3}
  objectives={[
    "为高请求速率优化 S3 性能",
    "应用 S3 键命名最佳实践",
    "为 S3 分区分布进行设计",
  ]}
  options={[
    {text: '使用随机/哈希前缀'},
    {text: '使用逻辑前缀；不需要随机化', isAnswer: true},
    {text: '始终使用最大对象'},
    {text: '最小化对象数量'},
  ]}
>
  <slot name="question">
  <div className="question">
    如何为高请求速率优化 S3 性能？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 性能技巧：
    - 现代 S3 会自动按前缀扩展请求速率
    - 不需要为性能使用随机/哈希前缀
    - 使用符合访问模式的逻辑键名
    - 如果请求速率极高，监控 503 Slow Down 响应

    旧的指南建议通过随机化前缀来避免热点分区，但 AWS 已不再将其作为默认性能要求。

    [S3 性能指南](https://aws.amazon.com/s3/performance/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="RDS 备份"
  title="RDS 备份策略"
  difficulty={2}
  objectives={[
    "识别 RDS 备份策略的最佳实践",
    "了解时间点恢复功能",
  ]}
  options={[
    {text: '仅手动快照'},
    {text: '无需备份'},
    {text: '自动备份并支持时间点恢复', isAnswer: true},
    {text: '每周完整备份'},
  ]}
>
  <slot name="question">
  <div className="question">
    推荐的 RDS 备份方式是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    最佳备份实践：
    - 启用自动备份
    - 使用时间点恢复
    - 根据合规需求保留备份
    - 定期测试恢复过程
    - 考虑跨区域备份

    自动备份提供：
    - 持续的数据保护
    - 灵活的恢复选项

    [RDS 备份最佳实践](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ElastiCache"
  title="Redis 与 Memcached 对比"
  difficulty={2}
  objectives={[
    "比较 Redis 与 Memcached 的功能",
    "区分缓存引擎的特性",
  ]}
  options={[
    {text: 'Redis 支持更多数据结构和操作', isAnswer: true},
    {text: '在各方面完全相同'},
    {text: 'API 级别兼容'},
    {text: 'Memcached 总是更快'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `ElastiCache` 中，`Redis` 与 `Memcached` 的关键区别是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Redis 优势：
    - 支持复杂数据结构
    - 持久化选项
    - 高级操作
    - Pub/Sub 消息

    Memcached：
    - 简单的键值存储
    - 纯缓存
    - 对简单场景的高性能

    [Redis vs Memcached](https://aws.amazon.com/elasticache/redis-vs-memcached/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="DynamoDB 索引"
  title="全局二级索引"
  difficulty={3}
  objectives={[
    "了解全局二级索引的目的",
    "评估 DynamoDB 中的访问模式",
    "设计高效的查询策略",
  ]}
  options={[
    {text: '与主键相同'},
    {text: '无需额外费用'},
    {text: '降低写入性能'},
    {text: '允许对非主键属性进行查询', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 中全局二级索引的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    全局二级索引 (GSI)：
    - 允许对非主键属性进行查询
    - 创建替代的访问模式
    - 提高查询灵活性
    - 需要额外的写入容量费用

    对超出主键的复杂查询需求非常有用。

    [DynamoDB 索引](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="S3 生命周期"
  title="S3 生命周期管理"
  difficulty={2}
  objectives={[
    "了解 S3 生命周期管理的功能",
    "运用 S3 成本优化策略",
  ]}
  options={[
    {text: '手动移动对象'},
    {text: '自动在存储类别之间转换对象', isAnswer: true},
    {text: '永不删除旧对象'},
    {text: '将所有内容存储在 Standard 类别中'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 生命周期管理可以做什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    生命周期管理：
    - 自动在存储类别之间转换对象
    - 将不常访问的数据迁移到更便宜的存储
    - 设置对象过期规则
    - 优化存储成本
    - 减少手动管理开销

    [S3 生命周期规则](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="Aurora 扩展"
  title="使用 Amazon Aurora 扩展读取"
  difficulty={2}
  objectives={[
    "回忆 Aurora 只读副本的限制",
    "了解 Aurora 的读取扩展能力",
  ]}
  options={[
    {text: '仅限单个只读副本', hint: '考虑 Aurora 的可扩展性特性。'},
    {text: '无法进行读取扩展', hint: '这与 Aurora 的能力相符吗？'},
    {text: '支持最多 15 个只读副本', isAnswer: true},
    {text: '无限只读副本', hint: '需要考虑实际的限制。'},
  ]}
>
  <slot name="question">
  <div className="question">
    Amazon Aurora 支持的最大只读副本数量是多少？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Amazon Aurora 支持 **最多 15 个只读副本**，让您显著扩展读取操作。这些副本具备以下优势：

    - **近乎瞬时的复制** 在副本之间
    - **对主实例的性能影响最小**
    - **高效的读取工作负载分配**

    这种配置为读需求高的应用提供水平扩展。

    [了解更多关于 Aurora 只读副本](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replicas.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="RDS 安全"
  title="RDS 加密"
  difficulty={2}
  objectives={[
    "识别 RDS 的加密功能",
    "了解 RDS 中的数据保护机制",
  ]}
  options={[
    {text: '对静止和传输中的数据进行加密', isAnswer: true},
    {text: '加密是可选的'},
    {text: '没有可用的加密'},
    {text: '仅加密特定列'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS 提供了哪些加密功能？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    RDS 加密特性：
    - 使用 KMS 对静止数据进行加密
    - 使用 SSL/TLS 对传输中的数据进行加密
    - 在创建数据库时启用加密
    - 保护敏感信息
    - 符合安全标准

    [RDS 加密选项](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/encryption-options.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="DynamoDB Streams"
  title="DynamoDB Streams 的用途"
  difficulty={3}
  objectives={[
    "了解 DynamoDB Streams 的使用场景",
    "使用 DynamoDB 设计事件驱动架构",
    "评估基于流的数据处理模式",
  ]}
  options={[
    {text: '存储额外的数据副本'},
    {text: 'DynamoDB 为绿色供应商提供积分', hint: '真的？'},
    {text: '提升写入性能', hint: '流是 '},
    {text: '捕获项目级别的更改以用于事件驱动架构', isAnswer: true},
    {text: '全局二级索引的替代方案', hint: '你在猜吗？'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB Streams 的主要用途是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB Streams:
    - 捕获项目级别的更改
    - 启用事件驱动架构
    - 触发 Lambda 函数
    - 支持跨区域复制
    - 提供近实时的数据移动

    [DynamoDB Streams 概览](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="S3 传输"
  title="大文件传输"
  difficulty={2}
  objectives={[
    "识别大文件上传的最佳实践",
    "了解分段上传的优势",
  ]}
  options={[
    {text: '始终使用单个 PUT 请求'},
    {text: '对大文件使用分段上传', isAnswer: true},
    {text: '上传前先压缩'},
    {text: '手动拆分后再上传'},
  ]}
>
  <slot name="question">
  <div className="question">
    将大文件上传到 S3 的最佳方法是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    分段上传的好处：
    - 高效处理大文件
    - 支持中断后恢复上传
    - 并行上传文件分块
    - 推荐用于大于 100 MB 的文件
    - 提升网络可靠性

    [S3 分段上传](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={20}
  group="成本优化"
  title="存储成本分析"
  difficulty={4}
  objectives={[
    "比较 AWS 各服务的存储成本",
    "评估存储选择的成本影响",
    "运用成本优化策略",
  ]}
  options={[
    {text: '所有数据使用 S3 Standard'},
    {text: '始终使用最便宜的存储'},
    {text: '根据访问模式混合使用存储类别', isAnswer: true},
    {text: '所有数据都存放在 Glacier'},
  ]}
>
  <slot name="question">
  <div className="question">
    对于 1PB 数据，其中 20% 每日访问，30% 每月访问，50% 每年访问，最具成本效益的存储方案是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    最佳存储策略：
    - 20% 使用 S3 Standard 以满足每日访问
    - 30% 使用 S3 Standard-IA 以满足每月访问
    - 50% 使用 Glacier 以满足每年访问

    该方案在保持合适访问模式的同时优化成本。

    成本考虑因素：
    - 每 GB 的存储定价
    - 检索费用
    - 访问模式
    - 转换费用
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={21}
  group="DynamoDB 一致性"
  title="一致性模型"
  difficulty={4}
  objectives={[
    "了解 DynamoDB 的一致性模型",
    "评估不同一致性级别的权衡",
    "在实际场景中应用一致性模型",
  ]}
  options={[
    {text: '每秒 100 次读取', isAnswer: true},
    {text: '每秒 50 次读取'},
    {text: '每秒 200 次读取'},
    {text: '每秒无限次读取'},
  ]}
>
  <slot name="question">
  <div className="question">
    一个 DynamoDB 表的预置读取容量为 100 RCUs。每秒可以执行多少次 4KB 项目的强一致性读取？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    理解 DynamoDB 一致性模型至关重要：

    - 1 RCU = 每秒 1 次强一致性读取（针对 ≤4KB 的项目）
    - 1 RCU = 每秒 2 次最终一致性读取（针对 ≤4KB 的项目）

    因此：
    - 100 RCUs = 每秒 100 次强一致性 4KB 读取
    - 100 RCUs = 每秒 200 次最终一致性 4KB 读取

    选择一致性模型时应考虑：
    - 应用需求
    - 成本因素
    - 性能需求
    - 数据新鲜度要求
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={22}
  group="Aurora 高可用性"
  title="Aurora 故障转移机制"
  difficulty={3}
  objectives={[
    "了解 Aurora 故障转移过程",
    "识别高可用性配置",
    "应用灾难恢复最佳实践",
  ]}
  options={[
    {text: '需要手动干预'},
    {text: '需要应用重新配置'},
    {text: '总是切换到最旧的副本'},
    {text: '基于故障转移优先级层自动提升', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在拥有多个只读副本的 Aurora 集群中，当主实例故障时，自动故障转移会发生什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora 故障转移过程：
    1. 检测到主实例故障
    2. 基于故障转移优先级层主要选择一个 Aurora 副本
    3. 当优先级相同且需要时，使用实例特性作为平局决胜因素
    4. 自动更新集群终端节点

    最佳实践：
    - 在不同可用区保持多个副本
    - 有意配置提升层级
    - 在应用中使用集群终端节点
    - 定期测试故障转移场景
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={23}
  group="S3 一致性"
  title="S3 强一致性"
  difficulty={3}
  objectives={[
    "了解 S3 的一致性模型",
    "识别 S3 操作的保证",
    "将一致性知识应用于应用设计",
  ]}
  options={[
    {text: '仅适用于新对象'},
    {text: '所有操作均为强一致性', isAnswer: true},
    {text: '更新为最终一致性'},
    {text: '取决于区域'},
  ]}
>
  <slot name="question">
  <div className="question">
    截至 2020 年底，S3 对所有操作提供何种一致性模型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 一致性模型：
    - 对所有操作提供强读后写一致性
    - 适用于 PUT 和 DELETE
    - 不再需要之前使用的变通方案
    - 无额外费用

    影响：
    - 简化应用逻辑
    - 不再需要一致性检查
    - 写入后可立即可靠读取
    - 提升应用可靠性
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={24}
  group="DynamoDB 功能"
  title="生存时间 (TTL)"
  difficulty={3}
  objectives={[
    "了解 DynamoDB 的 TTL 功能",
    "将 TTL 用于数据生命周期管理",
    "设计高效的数据过期策略",
  ]}
  options={[
    {text: '在到期时立即删除项目'},
    {text: '需要手动触发删除'},
    {text: '后台删除，尽力而为的时间安排', isAnswer: true},
    {text: '项目会过期但仍保留存储'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 的 TTL 功能是如何处理项目删除的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB TTL 特性：
    - 后台进程监控 TTL 属性
    - 过期项目会在尽力而为的调度下删除，通常在几天内完成
    - TTL 不产生额外费用
    - 删除的项目会出现在流中

    使用场景：
    - 会话管理
    - 日志过期
    - 临时数据清理
    - 合规性要求
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={25}
  group="Aurora Serverless"
  title="扩展行为"
  difficulty={4}
  objectives={[
    "了解 Aurora Serverless 的扩展机制",
    "识别扩展触发条件",
    "为可变工作负载优化成本",
  ]}
  options={[
    {text: '扩展速度取决于当前容量和配置的容量', isAnswer: true},
    {text: '按需即时扩展'},
    {text: '仅在预设间隔时扩展'},
    {text: '仅手动扩展'},
  ]}
>
  <slot name="question">
  <div className="question">
    在依赖 Aurora Serverless 处理突发流量时，关键的考虑因素是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless 扩展：
    - Aurora Serverless v2 以细粒度 ACU 增量进行容量扩展
    - 扩展速度取决于当前容量和最小/最大 ACU 设置
    - 支持的版本在配置后可在 0 ACU 时自动暂停
    - 按秒计费，基于 ACU 使用量

    最佳实践：
    - 为关键工作负载的突发需求将最小容量设置得足够高
    - 监控扩展事件
    - 注意连接管理
  </div>
  </slot>
</Challenge>

</QuizUI>

哇，这段冒险真是深入细节了！🚀☁️  
希望你玩得开心，甚至还能学到一点关于 AWS 存储服务的知识。

去看看更多 [Dan 的挑战](/challenges/)! 🧠  

免责声明：本测验仅用于教育目的。所有商标和版权归各自所有者所有，尤其是那些大公司。
````
