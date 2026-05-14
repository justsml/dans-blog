# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/zh/index.mdx
- Validation: deferred
- Runtime seconds: 27.54
- Input tokens: 5038
- Output tokens: 3838
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001780
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的时间戳是个谎言
subTitle: 一张火车票教会我的数据库时间存储之道
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
我在预订从纽约到芝加哥的火车时，突然明白了为什么Postgres中的时间戳类型如此令人困惑。车票显示：

- Departs: 8:00 AM EST
- Arrives: 7:30 PM CST  
- Duration: 11 hours 30 minutes

三种不同的时间表达方式，全在同一张车票上。每一种都需要在数据库中不同地存储。

## 没人先问的问题

Postgres中的`TIMESTAMP`和`TIMESTAMPTZ`都占用恰好8字节，具有相同的微秒精度。那为什么要有两种类型呢？

因为“现在几点了？”完全取决于你想告诉别人什么。

当我在纽约登上那趟火车时，我需要知道它于东部时间早上8:00出发。那是我需要对照的车站时钟上的数字。当我的朋友在芝加哥接我时，她需要知道我于中部时间晚上7:30到达——那是她时钟上的数字。而如果我想知道我是否有时间看书，我需要知道这是一趟11个半小时的旅程。

同一趟火车。同一段旅程。三种完全不同的时间表示。

## TIMESTAMPTZ 实际做了什么

关于`TIMESTAMPTZ`的技巧是——它和大多数人想的不一样。它不存储时区。这个名字具有误导性。

它所做的就是将你给它的任何时间转换为UTC再存储，然后在读取时转换回你会话的时区。“TZ”部分不是关于存储，而是关于**转换支持**。

假设你正在存储那趟火车的出发时间。东京的某人查询你的数据库，看到出发时间是JST。伦敦的某人看到的是GMT。每个人都在看同一个绝对时刻，只是用他们配置的时区来表达。这对于记录事件非常完美：“这笔支付是在什么时候处理的？”或“这个API请求是在什么时候发生的？”

但是那张火车票呢？你不希望出发时间仅仅因为有人从不同时区查询就改变。火车在东部时间早上8:00出发，句号。那不是时间的绝对时刻——而是关于中央车站时钟会显示什么的承诺。

## 存储你实际想表达的意思

对于那趟火车旅程，你需要为不同目的存储不同的东西：

- 绝对时刻（`departs_at`和`arrives_at`作为`TIMESTAMPTZ`）
- 显示上下文（`origin_timezone`和`destination_timezone`作为文本）
- 持续时间（两个时刻之间的`INTERVAL`）

现在你的应用程序可以像火车票那样做：通过将绝对时刻转换为出发地时区来显示“Departs 8:00 AM EST”，通过转换为目的地时区来显示“Arrives 7:30 PM CST”，并直接从间隔中显示“Duration: 11h 30m”。

从东京订票的人看到的是每个车站相同的当地时间。这正是他们需要知道的。

## 为什么你的航班追踪应用搞错了

有没有注意到有些航班追踪应用会在飞行途中显示你的时区？比如你正在大西洋上空，它显示“当前时间：下午4:32 GMT”。谁在乎？你不在格林威治，你在三万八千英尺的大洋上空。

你真正想看到的是：
- 起飞后经过的时间
- 到达目的地剩余时间
- 落地时*那里*是几点

这些都不是时区转换。前两个是**间隔**——持续时间，不是时刻。最后一个是时区转换，但转换到特定地点，而不是“你当前的时区”。

看到了吗？两个间隔计算（`NOW() - actual_departure` 和 `estimated_arrival - NOW()`），一个到特定地点的时区转换（`AT TIME ZONE destination_timezone`）。你当前的时区根本不需要参与。

## 什么时候你真正需要挂钟时间

酒店不在乎绝对时刻。他们在乎的是自己位置的时钟读数。

“下午3:00后办理入住”并不意味着“午夜UTC后15小时办理入住”。它的意思是“只要大堂时钟显示下午3:00，你就可以办理入住”。如果你的服务器在弗吉尼亚，但酒店在巴黎，你仍然希望这条规则在*巴黎时间*下午3:00触发。

`TIME`类型（不带日期或时区）正好表示这个：“时钟上的一个读数”。把它和一个时区文本字段（“Europe/Paris”）配对，你就可以强制执行挂钟策略，无论你的服务器在哪里。但你也需要`TIMESTAMPTZ`列来记录特定客人实际办理入住和退房的时间——这些是后端需要追踪的绝对时刻。

## 日历问题

我有一个重复提醒设在上午9:00：“回顾每日优先事项”。我希望这个提醒在*无论我在哪里*的上午9:00触发。如果我正在旅行，它仍然应该在当地时间上午9:00响起。

但我还有一个日历事件：“团队站会，美国东部时间上午10:00”。我在柏林的队友需要看到这个事件显示为“欧洲中部时间下午4:00”。同一个会议，不同的显示时间，因为这是一个我们所有人都要加入的绝对时刻。

两种不同类型的事件，两种不同的存储策略。会议用`TIMESTAMPTZ`。提醒用`TIME`加上我当前的时区设置。不要试图把两者塞进同一个字段。

## 生产环境中会出问题的地方

即使类型选对了，精度也会坑你。Postgres存储微秒：`10:00:00.123456`。JavaScript的`Date`对象使用毫秒：`10:00:00.123`。

所以这个查询可能神秘地返回零行：

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

数据库里有`10:00:00.123456`，你的代码传了`10:00:00.123`。根据驱动如何处理，它们可能不匹配。

不要对时间戳使用精确相等。使用范围查询，或者——更好——根本不要通过创建时间戳来查找记录。使用合适的唯一约束或幂等键。

## 实用规则

**默认使用 TIMESTAMPTZ。** 拿不准时，就用 `TIMESTAMPTZ`。它能自动处理多区域部署、夏令时和未来时区变更。存储大小与 `TIMESTAMP` 相同，没有额外开销。

**单独存储上下文。** 如果需要同时展示“出发时间 8:00 AM EST”和实际时刻，就把 `TIMESTAMPTZ` 和 `origin_timezone` 作为独立列存储。不要试图把所有信息塞进一个字段。

**考虑时间间隔。** 很多与时间相关的需求实际上关心的是持续时间，而不是时刻。“这个待处理多久了？”“什么时候过期？”使用 `INTERVAL` 运算，而不是时区转换。

**全部用 UTC 运行。** 你的服务器应设为 UTC。数据库会话默认也应是 UTC。只在向用户展示时转换为本地时区，并且只有在你明确知道哪个时区有意义时才转换。

**要求客户端提供时区信息。** 如果客户端发送 `2026-01-15T10:00:00` 而没有偏移量，就拒绝它。要求使用 ISO-8601 格式，要么带 `Z`，要么带显式偏移量如 `-05:00`。不要猜测。

## 强制执行良好默认值

如果 `TIMESTAMPTZ` 是你的默认选择（而且应该是），考虑在数据库层面强制执行。一个拒绝 `TIMESTAMP WITHOUT TIME ZONE` 列的触发器听起来很极端，但在创建 schema 时抓住“忘了加时区”的问题，总比六个月后有人添加新表忘记时区再调试要好。

## 那张火车票教会我的

数据库中的时间之所以难，不是因为时间戳复杂。而是因为我们通常把多个关注点塞进一个字段，或者没有思考我们到底想向用户展示什么。

那张火车票做得对：出发时间用出发地时区，到达时间用目的地时区，持续时间则完全独立。三种不同的信息，每种都有自己的意义。

你的数据库也可以做到同样的事。用 `TIMESTAMPTZ` 存储绝对时刻。用独立列存储展示上下文（时区、地点）。用 `INTERVAL` 类型存储持续时间。让 Postgres 在你需要时进行转换，但要明确哪个时区对哪个目的有意义。

大多数情况下，这意味着到处使用 `TIMESTAMPTZ` 和 UTC，只在展示时进行时区转换。但当你需要挂钟时间或周期性日程时，`TIMESTAMP` 或 `TIME` 类型正是为此而存在。

关键在于弄清楚你要回答什么问题：“这件事什么时候发生的？” vs. “我该什么时间到那里？” vs. “这需要多长时间？”它们都是关于时间的不同问题，往往需要不同的存储策略。

想想你的用户需要看到什么。然后存储能让你精确展示这些信息的数据。

## 资源

- [PostgreSQL 日期/时间类型文档](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [PostgreSQL 时间戳最佳实践](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [ISO 8601 日期和时间格式](https://en.wikipedia.org/wiki/ISO_8601)
- [时区数据库 (IANA)](https://www.iana.org/time-zones)
- [分布式系统中的时间戳处理](https://www.postgresql.org/docs/current/functions-datetime.html)
````
