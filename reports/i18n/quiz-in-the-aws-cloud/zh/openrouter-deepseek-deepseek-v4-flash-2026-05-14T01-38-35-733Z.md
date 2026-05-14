# Translation Candidate
- Slug: quiz-in-the-aws-cloud
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-12-28--quiz-in-the-aws-cloud/zh/index.mdx
- Validation: passed: local checks only
- Runtime seconds: 202.15
- Input tokens: 25720
- Output tokens: 32608
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.012209
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：AWS 存储：20 多个问题！
subTitle: 你能穿越云迷宫吗？
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">准备好上云了吗？！🤡</p>

深入探索 AWS 存储服务！本测验将检验你对 S3、DynamoDB、Aurora、RDS、ElastiCache 等服务的掌握程度。从最佳实践到棘手陷阱，我们将全面剖析云存储生态。

准备好证明你的云技能吧！🚀
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="S3 小知识"
  difficulty={1}
  objectives={[
    "回忆 AWS S3 服务名称的含义",
    "识别基本的 AWS 存储服务",
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
    <p className="text-sm">最后验证：2026年5月8日。AWS 的限制和定价变化很快。</p>
    名称 `S3` 是什么意思？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 代表 **简单存储服务**。它是一种可扩展的对象存储服务，专为大规模数据存储而设计。

    AWS S3 提供多种存储类别：
    - 标准：适用于频繁访问的数据
    - 不频繁访问 (IA)：较低成本，适用于访问频率较低的数据
    - Glacier：长期、低成本的归档存储

    每个类别提供不同的定价和访问特性，允许根据数据使用模式进行成本优化。

    [了解更多关于 S3 存储类别的信息](https://aws.amazon.com/s3/storage-classes/)
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
    "解释DynamoDB的灵活数据模型",
  ]}
  options={[
    {text: '存储任意属性', isAnswer: true},
    {text: '动态分区键'},
    {text: '列是无类型的'},
    {text: '自动管理的JSON模式'},
    {text: '依赖RDS提供模式支持'},
  ]}
>
  <slot name="question">
  <div className="question">
    当DynamoDB被描述为“无模式”时，这意味着什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB被认为是“无模式”的，因为它允许你在项目（items）中存储任意属性，而无需预定义模式。

    [DynamoDB最佳实践](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
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
    "评估更新的扩展考虑因素",
  ]}
  options={[
    {text: 'PutItem', hint: '创建新项目，或用新项目替换旧项目。'},
    {text: 'BatchUpdateItem', hint: '不存在。'},
    {text: 'BatchWriteItem', hint: '在单个调用中插入或删除多个项目。'},
    {text: 'UpdateItem', isAnswer: true},
    {text: 'BatchUpsertItem', hint: '在 DynamoDB 中？'},
    {text: 'TransactWriteItems', hint: '将多个 PutItem、UpdateItem、DeleteItem 和 ConditionCheck 操作合并到单个调用中。'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个 DynamoDB API 用于更新一个现有项目的属性？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    关键在于 <b>更新</b>，而不是插入或 PUT。如果你在进行插入操作，可以使用 `BatchWriteItem` 或 `TransactWriteItems`。

    虽然 `BatchWriteItem` 可以处理多个操作，但它仅限于 PUT 和 DELETE。`TransactWriteItems` 更强大，但对于简单的更新来说有点大材小用。
    对于简单的更新，`UpdateItem` 是最佳选择。它允许你更新或修改现有项目中的一个或多个属性。

    `UpdateItem` 操作每次请求修改一个项目。对于大规模回填或批量更新，你通常需要协调多个 `UpdateItem` 调用，或使用更大的工作流，例如 PartiQL 批量执行、Step Functions、Glue、EMR 或自定义工作进程。

    `UpdateItem` 操作：
    - 更新现有项目的属性。
    - 向现有项目添加新属性。
    - 从现有项目中删除属性。
    - 如果项目存在或满足某些条件，则有条件地执行更新。

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
    "了解AWS服务中的高级查询能力",
    "比较全文搜索功能",
  ]}
  options={[
    {text: 'ElastiCache', hint: '主要作为内存缓存；较新的Valkey版本包含搜索功能。'},
    {text: 'OpenSearch', isAnswer: true},
    {text: 'Neptune', hint: '具有高级查询能力的图数据库'},
    {text: 'Redshift', hint: '复杂分析查询'},
    {text: 'DocumentDB', hint: '兼容MongoDB的查询'},
  ]}
>
  <slot name="question">
  <div className="question">
    这里哪个AWS服务是专为全文搜索和搜索分析而构建的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    OpenSearch是AWS托管的搜索、日志分析和全文搜索工作负载的服务。

    干扰项虽然也是有用的服务，但它们并非此列表中专用的搜索引擎：
    - ElastiCache：主要作为内存缓存。当前ElastiCache for Valkey包含针对索引内存数据的搜索命令，因此不再准确地说整个服务没有内置搜索功能。
    - Neptune：图数据库；它可以与OpenSearch集成以实现全文搜索。
    - Redshift：用于SQL分析的数据仓库。
    - DocumentDB：文档数据库，在支持的版本中提供兼容MongoDB的文本搜索。
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
    {text: '解决出口问题'},
    {text: '提供自动故障转移', isAnswer: true},
    {text: '提高读取性能'},
    {text: '改善地理分布流量'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS 多可用区部署的**主要**优势是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    可用区（AZ）是**同一区域**内的不同数据中心。RDS 多可用区部署提供自动故障转移至*附近*可用区中的备用副本。

    多可用区部署：
    - 提供自动故障转移
    - 提高数据库可用性
    - 创建同步备用副本
    - 在基础设施故障期间最大限度地减少停机时间

    不要将多可用区部署与用于扩展读取操作的只读副本混淆。

    {/* [RDS 多可用区部署详情](https://aws.amazon.com/rds/features/multi-az/) */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="WebSocket"
  title="WebSocket 魔法"
  difficulty={3}
  objectives={[
    "比较 AWS 服务对 WebSocket 的支持",
    "识别 AWS 服务中的架构限制",
    "评估 WebSocket 实现选项",
  ]}
  options={[
    {text: 'API Gateway', isAnswer: true},
    {text: 'EKS', hint: 'EKS 可以运行您自己的长连接 WebSocket 服务。'},
    {text: 'Lightsail', hint: 'Lightsail 实例可以运行您自己的 WebSocket 服务器。'},
    {text: 'AppSync', hint: 'AppSync 提供通过 WebSocket 的托管实时 GraphQL 订阅，而非任意原始套接字。'},
    {text: 'EC2', hint: 'EC2 可以运行您自己的长连接 WebSocket 服务器进程。'},
  ]}
>
  <slot name="question">
  <div className="question">
    👋 希望到目前为止你玩得开心！

    来个棘手的题目...

    哪个 AWS 服务提供托管的 WebSocket API，其中 AWS 拥有客户端连接并将消息路由到集成？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    API Gateway 支持双向 WebSocket API，但实现由 API Gateway 管理，而不是直接连接到您自己的服务器进程的套接字。
    API Gateway 维护客户端连接，并将消息路由到 Lambda、HTTP 端点或其他集成。消息可以通过 API Gateway Management API 发送回已连接的客户端。

    其他服务对 WebSocket 更加友好：
    - Lightsail：非常适合简单的 WebSocket 设置 👌
    - AppSync：使用 WebSocket 进行托管的 GraphQL 订阅
    - EC2：经典的“随心所欲”的 WebSocket 选项
    - EKS：非常适合运行可扩展的 WebSocket 集群

    专业提示：如果您需要原始 WebSocket 能力，请坚持使用计算服务！
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
    "将安全最佳实践应用于 S3",
    "实施最小权限原则",
  ]}
  options={[
    {text: '将新存储桶设为公开', hint: '最小权限，先考虑。'},
    {text: '将 S3 迁移到本地以完全控制 ACL'},
    {text: '将数据迁移到私有区块链', hint: '开玩笑的吧？'},
    {text: '使用最小权限原则', isAnswer: true},
    {text: '使用策略通配符确保必要访问', hint: '😯 不行！'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 存储桶权限的推荐方法是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在几乎所有系统中，采用“最小权限”设计是加固和面向未来的关键方法。试图锁定现有系统就像将整栋办公楼移到新地基一样困难。

    S3 存储桶也不例外。要应用最小权限原则，从无权限开始，仅授予必要的访问权限。使用 IAM 角色和策略控制访问，并定期审计存储桶权限。

    安全最佳实践：
    - 应用最小权限原则
    - 从无权限开始
    - 仅授予必要访问
    - 使用 IAM 角色和策略
    - 定期审计存储桶权限

    避免过度宽松的设置，以免暴露敏感数据。

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
    "区分无服务器数据库和预置数据库",
  ]}
  options={[
    {text: '总是比预置实例便宜'},
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
    Aurora Serverless：
    - 自动扩展计算容量
    - 根据工作负载调整资源
    - 适合不可预测的工作负载
    - 仅为使用的资源付费

    非常适合流量模式变化的应用程序。

    [Aurora Serverless 概述](https://aws.amazon.com/rds/aurora/serverless/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="批量操作，第一部分！"
  title="BatchGetItem 限制"
  difficulty={2}
  objectives={[
    "回忆 DynamoDB BatchGetItem 的限制",
    "比较 BatchGetItem 与其他批量操作",
  ]}
  options={[
    {text: '1', hint: '……我坚持要批量处理。'},
    {text: '25', hint: '那是 `BatchWriteItem` 的限制。'},
    {text: '100', isAnswer: true},
    {text: '75', hint: '接近了，但有一个整数。'},
    {text: '50', hint: '对于 `BatchGetItem` 来说有点高。'},
    {text: '200', hint: '有点太高了……'},
    {text: 'Unlimited', hint: '`BatchGetItem` 有一个固定限制。'},
  ]}
>
  <slot name="question">
  <div className="question">
    再来一个 DynamoDB 批量操作的问题！<br />
    使用单个 DynamoDB `BatchGetItem` 请求最多可以检索多少项？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB SDK 允许您在单个 `BatchGetItem` 请求中检索最多 **100** 项。这高于 `BatchWriteItem` 的限制（25 项）。
    此外，还有总负载大小、文档大小和请求速率的限制。

    了解这些限制对于优化应用程序性能并确保高效的数据操作至关重要。

    **注意：** 有可能超过 _某些_ 限制——如果您能说服您的 AWS 客户经理的话。😎
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="批次，第二部分！"
  title="批量操作"
  difficulty={4}
  objectives={[
    "理解 DynamoDB 批量操作的限制",
    "区分单次操作和批量操作",
  ]}
  options={[
    {text: '1', isAnswer: true},
    {text: '10'},
    {text: '25', hint: '猜得不错...'},
    {text: '50'},
    {text: '100', hint: '想到 GetItem 的限制了？'},
    {text: '100 when streaming'},
    {text: '以上都不是', hint: '这有点棘手...'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 每批可以 `UPDATE` 的最大文档数是多少？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB 客户端本质上都是其 HTTP API 的封装。`BatchWriteItem` 操作可以在每个 HTTP 请求中 `PUT` 或 `DELETE` 最多 **25** 个文档，但不能 `UPDATE` 多个文档。

    虽然 DynamoDB 可以在每个 HTTP 请求中 `INSERT` 最多 **25** 个文档，但使用 `UpdateItem` 操作每个请求只能 `UPDATE` **1** 个文档。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="DynamoDB"
  title="预置容量与按需容量"
  difficulty={3}
  objectives={[
    "比较 DynamoDB 容量模式",
    "根据工作负载选择合适的容量模式",
    "评估容量选择的成本影响",
  ]}
  options={[
    {text: '预置容量总是更好'},
    {text: '按需容量具有无限容量'},
    {text: '它们性能相同'},
    {text: '对于不可预测的工作负载，按需容量更便宜', isAnswer: true},
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
    - 零星的流量
    - 访问模式未知的应用程序
    - 避免过度预置

    预置容量更适合：
    - 可预测、一致的工作负载
    - 对性能有更多控制
    - 潜在的成本节约

    [DynamoDB 容量模式](https://aws.amazon.com/dynamodb/pricing/)
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
    "优化 S3 在高请求率下的性能",
    "应用 S3 键命名最佳实践",
    "设计 S3 分区分布",
  ]}
  options={[
    {text: '使用随机/哈希前缀'},
    {text: '使用逻辑前缀；无需随机化', isAnswer: true},
    {text: '始终使用最大的对象'},
    {text: '最小化对象数量'},
  ]}
>
  <slot name="question">
  <div className="question">
    如何优化 S3 在高请求率下的性能？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 性能提示：
    - 现代 S3 会自动按前缀扩展请求速率
    - 你不需要为了性能而使用随机/哈希前缀
    - 使用符合访问模式的逻辑键名
    - 如果推送非常高的请求速率，请监控 503 Slow Down 响应

    旧指南建议随机化前缀以避免热分区，但 AWS 不再将其作为默认性能要求。

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
    "理解时间点恢复能力",
  ]}
  options={[
    {text: '仅手动快照'},
    {text: '无需备份'},
    {text: '自动备份与时间点恢复', isAnswer: true},
    {text: '每周完整备份'},
  ]}
>
  <slot name="question">
  <div className="question">
    推荐的 RDS 备份方法是什么？
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
    - 持续数据保护
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
    "比较 Redis 和 Memcached 的能力",
    "区分缓存引擎的特性",
  ]}
  options={[
    {text: 'Redis 支持更多的数据结构与操作', isAnswer: true},
    {text: '各方面完全相同'},
    {text: 'API 级别兼容'},
    {text: 'Memcached 总是更快'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `ElastiCache` 中，`Redis` 和 `Memcached` 的关键区别是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Redis 优势：
    - 支持复杂数据结构
    - 持久化选项
    - 高级操作
    - 发布/订阅消息

    Memcached：
    - 简单的键值存储
    - 纯缓存
    - 简单用例的高性能

    [Redis 与 Memcached 对比](https://aws.amazon.com/elasticache/redis-vs-memcached/)
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
    "理解全局二级索引的目的",
    "评估 DynamoDB 中的访问模式",
    "设计高效的查询策略",
  ]}
  options={[
    {text: '与主键相同'},
    {text: '无额外成本'},
    {text: '降低写入性能'},
    {text: '允许对非主键属性进行查询', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 中全局二级索引的目的是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    全局二级索引 (GSI)：
    - 允许对非主键属性进行查询
    - 创建替代访问模式
    - 提高查询灵活性
    - 带来额外的写入容量成本

    对于超出主键的复杂查询需求非常有用。

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
    "了解 S3 生命周期管理功能",
    "应用 S3 的成本优化策略",
  ]}
  options={[
    {text: '手动移动对象'},
    {text: '自动在存储类之间转换对象', isAnswer: true},
    {text: '从不删除旧对象'},
    {text: '将所有内容存储在 Standard 类中'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 生命周期管理能实现什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    生命周期管理：
    - 自动在存储类之间转换对象
    - 将不常访问的数据移至更便宜的存储
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
  title="使用 Amazon Aurora 扩展读取能力"
  difficulty={2}
  objectives={[
    "回忆 Aurora 只读副本的限制",
    "理解 Aurora 的读取扩展能力",
  ]}
  options={[
    {text: '仅限于单个只读副本', hint: '思考一下 Aurora 的扩展特性。'},
    {text: '无法进行读取扩展', hint: '这符合 Aurora 的能力吗？'},
    {text: '支持最多 15 个只读副本', isAnswer: true},
    {text: '无限只读副本', hint: '需要考虑一个实际限制。'},
  ]}
>
  <slot name="question">
  <div className="question">
    Amazon Aurora 支持的最大只读副本数量是多少？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Amazon Aurora 支持**最多 15 个只读副本**，让您可以显著扩展读取操作。这些副本受益于：

    - **近乎实时的复制**跨副本
    - **对主实例的性能影响最小**
    - **高效分配**读取工作负载

    这种设置使应用程序能够水平扩展以应对高读取需求。

    [了解更多关于 Aurora 只读副本的信息](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replicas.html)
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
    "识别 RDS 加密能力",
    "理解 RDS 中的数据保护机制",
  ]}
  options={[
    {text: '加密静态数据和传输中的数据', isAnswer: true},
    {text: '加密是可选的'},
    {text: '没有可用的加密'},
    {text: '仅加密特定列'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS 提供哪些加密能力？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    RDS 加密功能：
    - 使用 KMS 加密静态数据
    - 使用 SSL/TLS 加密传输中的数据
    - 在数据库创建时启用加密
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
  title="DynamoDB Streams 的目的"
  difficulty={3}
  objectives={[
    "了解 DynamoDB Streams 的用例",
    "使用 DynamoDB 设计事件驱动架构",
    "评估基于流的数据处理模式",
  ]}
  options={[
    {text: '存储额外的数据副本'},
    {text: 'DynamoDB 绿色供应商积分', hint: '真的吗？'},
    {text: '提高写入性能', hint: 'Streams 是'},
    {text: '捕获项目级更改以支持事件驱动架构', isAnswer: true},
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
    DynamoDB Streams：
    - 捕获项目级更改
    - 启用事件驱动架构
    - 触发 Lambda 函数
    - 支持跨区域复制
    - 提供近实时数据移动

    [DynamoDB Streams 概述](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
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
    "理解分段上传的优势",
  ]}
  options={[
    {text: '始终使用单个 PUT 请求'},
    {text: '对大文件使用分段上传', isAnswer: true},
    {text: '上传前压缩'},
    {text: '上传前手动拆分'},
  ]}
>
  <slot name="question">
  <div className="question">
    上传大文件到 S3 的最佳方法是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    分段上传的优势：
    - 高效处理大文件
    - 可恢复中断的上传
    - 并行上传文件分片
    - 建议用于大于 100MB 的文件
    - 提高网络可靠性

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
    "比较 AWS 服务之间的存储成本",
    "评估存储选择的成本影响",
    "应用成本优化策略",
  ]}
  options={[
    {text: '对所有数据使用 S3 Standard'},
    {text: '始终使用最便宜的存储'},
    {text: '根据访问模式混合存储类别', isAnswer: true},
    {text: '将所有数据存储在 Glacier 中'},
  ]}
>
  <slot name="question">
  <div className="question">
    存储 1PB 数据，其中 20% 每天访问，30% 每月访问，50% 每年访问，最经济有效的方法是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    最佳存储策略：
    - 20% 存储在 S3 Standard 用于每日访问
    - 30% 存储在 S3 Standard-IA 用于每月访问
    - 50% 存储在 Glacier 用于每年访问

    这种方法在保持适当访问模式的同时优化了成本。

    成本考虑因素：
    - 每 GB 存储定价
    - 检索成本
    - 访问模式
    - 转换成本
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
    "理解 DynamoDB 一致性模型",
    "评估一致性级别之间的权衡",
    "将一致性模型应用于实际场景",
  ]}
  options={[
    {text: '每秒100次读取', isAnswer: true},
    {text: '每秒50次读取'},
    {text: '每秒200次读取'},
    {text: '每秒无限制读取'},
  ]}
>
  <slot name="question">
  <div className="question">
    一个 DynamoDB 表配置了 100 RCU 的预置读取容量。每秒可以执行多少次 4KB 项的强一致性读取？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    理解 DynamoDB 一致性模型至关重要：

    - 1 RCU = 每秒 1 次强一致性读取（针对不超过 4KB 的项）
    - 1 RCU = 每秒 2 次最终一致性读取（针对不超过 4KB 的项）

    因此：
    - 100 RCU = 每秒 100 次强一致性 4KB 读取
    - 100 RCU = 每秒 200 次最终一致性 4KB 读取

    根据以下因素选择一致性模型：
    - 应用程序需求
    - 成本考虑
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
    "理解 Aurora 故障转移过程",
    "识别高可用性配置",
    "应用灾难恢复最佳实践",
  ]}
  options={[
    {text: '需要手动干预'},
    {text: '需要重新配置应用程序'},
    {text: '始终故障转移到最旧的副本'},
    {text: '基于故障转移优先级层自动提升', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在具有多个只读副本的 Aurora 集群中，当主实例发生故障时，自动故障转移期间会发生什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora 故障转移过程：
    1. 检测主实例故障
    2. 主要根据故障转移优先级层选择 Aurora 副本
    3. 当优先级相同时，使用实例特征作为决胜因素
    4. 自动更新集群端点

    最佳实践：
    - 跨可用区维护多个副本
    - 有意配置提升层级
    - 在应用程序中使用集群端点
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
    "理解 S3 一致性模型",
    "识别 S3 操作保证",
    "将一致性知识应用于应用程序设计",
  ]}
  options={[
    {text: '仅适用于新对象'},
    {text: '所有操作的强一致性', isAnswer: true},
    {text: '更新最终一致性'},
    {text: '取决于区域'},
  ]}
>
  <slot name="question">
  <div className="question">
    截至 2020 年底，S3 为所有操作提供了什么一致性模型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    S3 一致性模型：
    - 所有操作的强读写后一致性
    - 适用于 PUT 和 DELETE 操作
    - 无需使用以前的变通方法
    - 无额外成本

    影响：
    - 简化了应用程序逻辑
    - 无需进行一致性检查
    - 写入后立即可靠读取
    - 提高了应用程序可靠性
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={24}
  group="DynamoDB 功能特性"
  title="生存时间 (TTL)"
  difficulty={3}
  objectives={[
    "了解 DynamoDB 的 TTL 功能",
    "应用 TTL 进行数据生命周期管理",
    "设计高效的数据过期策略",
  ]}
  options={[
    {text: '在过期时立即删除项目'},
    {text: '需要手动删除触发器'},
    {text: '后台删除，尽力而为的时间安排', isAnswer: true},
    {text: '使项目过期但保留存储'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB 的 TTL 功能如何处理项目删除？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    DynamoDB TTL 特性：
    - 后台进程监控 TTL 属性
    - 过期项目以尽力而为的方式删除，通常在几天内
    - TTL 不产生额外费用
    - 删除的项目会出现在流中

    使用场景：
    - 会话管理
    - 日志过期
    - 临时数据清理
    - 法规合规
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
    "了解 Aurora Serverless 扩展",
    "识别扩展触发器",
    "优化可变工作负载的成本",
  ]}
  options={[
    {text: '扩展速度取决于当前和配置的容量', isAnswer: true},
    {text: '按需即时扩展'},
    {text: '仅在预设间隔扩展'},
    {text: '仅手动扩展'},
  ]}
>
  <slot name="question">
  <div className="question">
    依赖 Aurora Serverless 处理突发流量峰值时，关键考虑因素是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless 扩展：
    - Aurora Serverless v2 以细粒度的 ACU 增量扩展容量
    - 扩展速度取决于当前容量以及最小/最大 ACU 设置
    - 支持的版本在配置后可以在 0 ACU 时自动暂停
    - 按 ACU 每秒计费

    最佳实践：
    - 为关键工作负载设置足够高的最小容量以应对突发峰值
    - 监控扩展事件
    - 注意连接管理
  </div>
  </slot>
</Challenge>

</QuizUI>

哇，这趟冒险真是深入细节了！🚀☁️  
希望你喜欢这段旅程，甚至从中学到了一两招关于 AWS 存储服务的知识。

去看看 [Dan 的更多挑战](/challenges/) 吧！🧠

法律声明：本测验仅供教育用途。所有商标与版权均归各自所有者所有，尤其是那些大公司。
````
