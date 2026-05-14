# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.61
- Input tokens: 5274
- Output tokens: 2506
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000657
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的时间戳是谎言
subTitle: 火车票教会我的数据库时间存储之道
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - postgres
  - postgresql
  - databases
  - timestamps
  - timezones
  - microservices
  - debugging
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
我在预订从纽约到芝加哥的火车时，突然意识到 Postgres 中的时间戳类型为何如此让人困惑。票面显示：

- 出发时间：上午 8:00 EST  
- 到达时间：下午 7:30 CST  
- 时长：11 小时 30 分钟  

同一张票上用了三种不同的时间表达方式，而每一种都需要在数据库中以不同的方式存储。

## 没人先问的那个问题

Postgres 中的 `TIMESTAMP` 和 `TIMESTAMPTZ` 都恰好占用 8 字节，且拥有相同的微秒精度。那么为什么要提供两种类型？

因为“现在几点？”完全取决于你想向谁传递什么信息。

当我在纽约登上那列火车时，我需要知道它在 **上午 8:00 Eastern** 发车——这就是我必须匹配的站台时钟上的数字。当我的朋友在芝加哥接我时，她需要知道我 **下午 7:30 Central** 到达——那是 *她* 那块钟上的数字。如果我要判断是否还有时间读完手中的书，我则需要知道这是一段 **11.5 小时** 的旅程。

同一列火车，同一次行程，却有三种完全不同的时间表示。

## `TIMESTAMPTZ` 实际做了什么

`TIMESTAMPTZ` 的关键点在于——它并不像大多数人想的那样存储时区。名字本身有误导性。

它的做法是：在写入时先把你提供的时间转换为 UTC 再存储，读取时再根据会话的时区把它转换回来。这里的 “TZ” 并不是指存储时区，而是指 **转换支持**。

比如你在存储这趟火车的出发时间。东京的查询者会看到 JST 时间的出发时间，伦敦的查询者会看到 GMT 时间的出发时间。每个人看到的都是同一个绝对时刻，只是用各自配置的时区来呈现。这正好适合记录事件：*“这笔付款何时处理？”* 或 *“这个 API 请求何时发生？”*

但火车票的场景不同。你不希望出发时间因为查询者所在的时区不同而改变。火车在 **上午 8:00 Eastern** 发车，这一点是不可变的。它不是一个绝对时刻，而是对 **Grand Central** 那块钟的承诺。

## 存储你真正想表达的内容

针对这次火车行程，你需要为不同的需求存储不同的字段：

- 绝对时刻（`departs_at` 与 `arrives_at` 使用 `TIMESTAMPTZ`）  
- 显示上下文（`origin_timezone` 与 `destination_timezone` 使用 text）  
- 时长（两个时刻之间的 `INTERVAL`）

这样，应用就可以像火车票一样工作：通过把绝对时刻转换为出发地时区来显示 **“Departs 8:00 AM EST”**，通过把绝对时刻转换为目的地时区来显示 **“Arrives 7:30 PM CST”**，并直接从 `INTERVAL` 中得到 **“Duration: 11h 30m”**。

从东京预订票的用户同样会看到每个站点的本地时间，这正是他们需要了解的信息。

## 为什么你的航班追踪应用会出错

有没有注意到有些航班追踪应用会在飞行途中显示你的时区？比如你在大西洋上，它会显示 “当前时间：下午 4:32 GMT”。谁在乎？你根本不在格林尼治，你在 38,000 英尺的某片海面上。

你真正想看到的东西：
- 起飞后已过去的时间
- 距离目的地还有多少时间  
- 着陆时**那边**的当地时间

这些都不是时区转换。前两项是 **interval**——持续时间，而不是瞬间。最后一项是时区转换，但是针对特定地点，而不是“你的当前时区”。

明白了吗？两个 interval 计算（`NOW() - actual_departure` 与 `estimated_arrival - NOW()`），一个针对特定地点的时区转换（`AT TIME ZONE destination_timezone`）。你的当前时区根本不参与。

## 当墙钟时间才是你真正需要的

酒店不关心绝对的时间点，它们关心的是当地时钟的读数。

“入住时间是下午 3:00 以后”并不意味着 “入住时间是 UTC 午夜后 15 小时”。它的意思是 “只要我们大堂的时钟指向下午 3:00，你就可以入住”。即使你的服务器在弗吉尼亚，而酒店在巴黎，你仍然希望这条规则在 **巴黎时间** 下午 3:00 触发。

`TIME` 类型（不带日期或时区）正好表示这一点：“时钟上的读数”。再配上一个时区文本字段（例如 “Europe/Paris”），就可以在不管服务器位于何处的情况下强制执行墙钟策略。但你仍然需要 `TIMESTAMPTZ` 列来记录具体的客人实际入住和退房时间——这些是后端必须追踪的绝对时刻。

## 日历问题

我设了一个每天上午 9:00 的循环提醒：“审查每日优先级”。我希望无论身在何处，这个提醒都在当地上午 9:00 触发。如果我在旅行中，它仍然应该在当地时间上午 9:00 响铃。

但我还有一个日历事件：“美国东部时间上午 10:00 的团队站会”。我的柏林同事需要看到 “中欧时间下午 4:00”。同一个会议，不同的显示时间，因为这是一场所有人共同参加的绝对时刻。

两种不同的事件，需要两套不同的存储策略。会议使用 `TIMESTAMPTZ`。提醒使用 `TIME` 加上当前时区设置。别试图把两者强行塞进同一个字段。

## 生产环境里会崩的细节

即使用了正确的类型，精度也会让你吃亏。Postgres 存储微秒：`10:00:00.123456`。JavaScript 的 `Date` 对象使用毫秒：`10:00:00.123`。

于是下面的查询可能莫名其妙地返回空结果：

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

数据库里实际是 `10:00:00.123456`，而你的代码传入的是 `10:00:00.123`。取决于驱动的处理方式，这两个值可能不匹配。

不要对时间戳使用精确相等比较。使用范围查询，或者——更好——根本不要通过创建时间来查找记录。使用合适的唯一约束或幂等键。

## 实用规则

**默认使用 TIMESTAMPTZ。** 有疑问时就用 `TIMESTAMPTZ`。它能自动处理多区域部署、夏令时以及未来的时区变更。存储大小与 `TIMESTAMP` 相同，没有额外开销。

**将上下文单独存储。** 如果需要同时显示 “上午 8:00 EST 出发” 之类的本地时间，应该把 `TIMESTAMPTZ` 与 `origin_timezone` 分别放在不同列中。不要试图把所有信息塞进同一个字段。

**考虑间隔。** 很多时间需求其实是关于持续时间，而不是具体时刻。“这件事已经挂起多久？” “何时会过期？” 使用 `INTERVAL` 运算，而不是时区转换。

**统一使用 UTC 运行。** 服务器应设置为 UTC，数据库会话默认也使用 UTC。只有在向用户展示时才转换成本地时区，并且只能在明确知道该用哪个时区时才转换。

**要求客户端提供时区信息。** 如果客户端发送 `2026-01-15T10:00:00` 且没有偏移量，直接拒绝。必须使用带 `Z` 或显式偏移（如 `-05:00`）的 ISO‑8601 格式。不要自行猜测。

## 强制良好默认

如果 `TIMESTAMPTZ` 是你的默认（它应该是），可以在数据库层面强制执行。一个拒绝 `TIMESTAMP WITHOUT TIME ZONE` 列的触发器听起来有点激进，但在创建 schema 时捕获 “忘记加 TZ” 要比六个月后有人新建表忘记时调试要轻松得多。

## 那张火车票教会我的事

数据库里的时间并非因为时间戳本身复杂而难，而是因为我们常把多种关注点混在同一个字段里，或者根本没有思考到底想向用户展示什么。

那张火车票的做法是对的：出发时间使用出发地时区，抵达时间使用目的地时区，旅程时长则完全独立。三类信息，各自有其意义。

你的数据库也可以这么做。把绝对时刻存为 `TIMESTAMPTZ`。把展示上下文（时区、地点）存为独立列。用 `INTERVAL` 类型保存时长。让 Postgres 在需要时完成转换，但要明确哪种时区对应哪种用途。

大多数情况下，这意味着全局使用 `TIMESTAMPTZ` 与 UTC，只有在展示时才进行时区转换。但当需要墙钟时间或循环计划时，`TIMESTAMP` 或 `TIME` 类型正是为此而生。

关键在于弄清你要回答的是什么问题：“这件事何时发生？” vs. “我应该什么时候到达？” vs. “这需要多长时间？” 这些都是不同的时间问题，往往需要不同的存储策略。

先思考用户需要看到什么，然后存储能够让你准确呈现这些信息的数据。

## 资源

- [PostgreSQL Date/Time Types Documentation](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [PostgreSQL Timestamp Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [ISO 8601 Date and Time Format](https://en.wikipedia.org/wiki/ISO_8601)
- [Time Zone Database (IANA)](https://www.iana.org/time-zones)
- [Dealing with Timestamps in Distributed Systems](https://www.postgresql.org/docs/current/functions-datetime.html)
````
