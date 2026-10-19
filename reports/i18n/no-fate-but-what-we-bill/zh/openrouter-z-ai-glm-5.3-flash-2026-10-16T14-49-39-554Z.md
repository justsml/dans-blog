# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: zh
- Model: openrouter/z-ai/glm-5.3-flash
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/zh/index.mdx
- Validation: deferred
- Runtime seconds: 19.50
- Input tokens: 14278
- Output tokens: 2729
- Thinking tokens: unknown
- Cached input tokens: 3520
- Cache write tokens: 0
- Estimated cost: $0.003049
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 算力不息，扣费不止
subTitle: 智能体持续运行的时间越来越长，集群的扩散范围越来越广，而被盗的云密钥则把算力账单甩给了受害者。
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
"听着，仔细听。那个终结者就在外面。它没法被收买。它没法被说服。它没有怜悯，没有悔恨，没有恐惧。而且它绝对不会停下，永远不会，直到你死。"

Kyle Reese，向 1984 年的观众简报威胁的形态。

这句台词里经得起时间考验的，不是击杀数，而是"绝对不会停下"。《终结者》从来不是因为聪明才吓人。它吓人，是因为在一切都失败之后，它还在继续干活。耐力才是威胁本身。

后来这个系列自己修正了这个错误。没人会花三部电影去害怕一台机器人。真正的反派是 Skynet：一个由核心、工厂和时间位移设备组成的分布式系统。机器人只是一次 API 调用。

到了 2026 年，这两半都来了，以最没有电影感的形式。能够连续执行数小时任务、不需要人类看护的智能体，而且曲线还在持续变陡。能把任务扇出到几十个子智能体的编排器。于是"绝对不会停下"现在读起来是"绝对不会停止扣费"。

这篇文章是我反复对那些认定智能体威胁纯属炒作的团队讲的论点：**不会有任何单一突破降临。真正在相乘的，是两条平平无奇、不断复合的曲线——单个智能体能工作多久，以及一个编排器能协调多少个智能体。两者都不需要达到科幻级别，因为攻击者从不按标价购买能力。他们偷访问权，账单由受害者买单。**

## 曲线一：耐力

[METR 的时间跨度研究](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
衡量的是智能体在给定成功率下能完成的任务时长。简短版本：任务时长大约每七个月翻一番——自 2024 年以来，接近每四个月翻一番。这些数字带着很宽的误差棒，而且基准测试本身已经在逼近其测量上限。看曲线的形状，别看点估计值。

形状说明的是：数小时的自主工作不是实验室演示。它就是当前这一代，而且下一代还在继续复合。"它绝对不会停下"过去需要一副杀人底盘和一件皮夹克。现在只需要一个重试循环、一个任务队列和一笔预算。威胁中的耐力部分已经被计价了——以算力的形式。

## 曲线二：广度

光有耐力，只是一个非常有耐心的员工。乘法来自编排。

2025 年 11 月，Anthropic 披露了
[对 GTG-1002 的瓦解行动](https://www.anthropic.com/news/disrupting-GTG-1002)，
一场网络间谍活动，其中 Claude Code 充当作战编排器：分解指令、协调子智能体，在大约三十个目标之间展开工作。一款商业编程产品做到这一点，不是因为它被攻陷成了武器，而是因为有人让它干这活，而它已经好到能干这活了。

对威胁模型而言，有两个细节很重要。第一，广度已经上线：一个编排器同时持有几十个并发子智能体，这是部署中的现实，不是论文。第二，这场活动是间谍行为，不是自我传播的蠕虫——但行进方向一目了然。三十个目标是试点项目。

<figure>
  <img src="../capability-curves.svg" alt="Two conceptual curves rising over time: task length one agent can complete, and number of sub-agents one orchestrator can coordinate, with the threat emerging where the two multiply" />
  <figcaption>概念示意，非实测数据：耐力（单个智能体能工作多久）与广度（一个编排器能运行多少个智能体）各自独立复合。威胁就活在两者的乘积里。</figcaption>
</figure>

能力按时长 × 广度扩展。对单个目标进行八小时自主作业，是一个亮眼的基准成绩。对三十个、乃至数百个目标进行八小时作业，是一种作战模式。安全审查只能线性扩展。这些曲线的乘积不能。

## 谁来买单

[Sysdig 创造了 "LLMjacking" 一词](https://sysdig.com/blog/llm-jacking/)来描述接下来发生的事：攻击者用盗来的云凭据在受害者账户里跑 LLM 工作负载，每一个 token 都由受害者付费。Sysdig 的最坏情况估算约为每天 4.6 万美元——后来攀升到每天超过 10 万美元。

AI 行业的每一道能力门槛都建立在一个假设之上：使用能力的一方就是付费的一方。价格分层、用量上限、核准用户名单、滥用限流——所有这些防御的都是一个想要物有所值的*客户*。LLMjacking 切断了这条链路。对攻击者来说，能力是免费的。计价器跑在别人的卡上，而提供商自己的护栏指向了错误的钱包。

这就是为什么价格和访问门槛拦不住一个拿着盗来的密钥的坏人。门槛过滤的是买家。它们对租户无能为力。

<figure>
  <img src="../who-pays.svg" alt="Flow diagram: an attacker with stolen cloud credentials runs model workloads inside the victim's cloud account, so the invoice routes to the victim while the attacker pays nothing" />
  <figcaption>被盗的访问权限改写了账单去向。能力门槛向买家收费——而在 LLMjacking 里，买家就是受害者。</figcaption>
</figure>

## 集群只需要对一次

防守者用单次尝试失败率安慰自己：大多数入侵尝试会失败，大多数可疑 PR 会被拒绝，真正成功的那次我们总能抓到。单次来看没错。放在总量上看就错了，因为尝试是廉价的。

n 次独立尝试中至少一次成功的概率是 `1 − (1 − p)^n`：

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

在集群经济学下，单次尝试成本约等于零——自动化作业，跑在盗来的算力上，没有任何人参与分诊。防守者的单次成本则是一个人在队列里逐条看。集群不需要每次尝试都有能力；它需要的是尝试次数。METR 的曲线随时间抬高 p。编排抬高 n。又是那个乘法，而且默认朝着攻击者有利的方向复利。

<figure>
  <img src="../swarm-odds.svg" alt="Chart of 1 − (1 − p)^n showing that many cheap low-probability attempts sum to high overall success odds, with a few labeled p-and-n combinations" />
  <figcaption>1 − (1 − p)^n：单次看似不可能的尝试，批量之后就不再不可能。抬高 p（智能体能力）或 n（集群广度）中的任何一个，都会把集群推向确定性。</figcaption>
</figure>

## 当恶意软件就是文本时，持久化意味着什么

威胁模型还差最后一块，也是最反直觉的一块。

AI 智能体是一个无状态解释器。它不像恶意软件那样持久存在——运行时存在，停止即消失。所以持久化现在有了新的含义：**控制未来某个合法智能体会读到并服从的内容。**指令文件、智能体准则、记忆存储、检索语料库、工具和 MCP 配置。植入体是文本，种在组织自己的智能体集群会读取的地方，用组织自己签发的凭据执行。

由此推出三个后果，没有一个是假设性的：

- **有效载荷在组织自己的智能体运行它之前是惰性的。**执行看起来就是正常工作——同样的工具、同样的身份、同样的 API。没有信标，因为组织自己的调度器就是心跳。
- **复制意味着让文本被复制走，而不是让代码被执行。**Pull request、记忆条目、共享配置。组织自己的自动化——依赖机器人、模板、同步工具——就是传输层。
- **绊线就是组织自己的绊线。**定时任务、漂移检测器、自动修复。最恶毒的形态：防守者的清理动作恰恰是重新激活的触发器，因为删除植入体的痕迹，正是那个自动修复任务被雇来修复的漂移。

我刻意停留在威胁模型的高度——这里给出的是问题的形状，不是配方，细节早已躺在每个安全团队的阅读清单上。

## 命运掌握在自己手中

Sarah Connor 传给那些不断到来的机器的话："未来尚未注定。命运掌握在自己手中。"这是防守者的台词，而且可以直接转化为一套防御架构。四层：

<figure>
  <img src="../defense-layers.svg" alt="Four-layer defense stack: identity and short-lived credentials, treat agent text as production code, detect edits rather than executions, and respond by revoking triggers before payloads" />
  <figcaption>防御栈与威胁一一对应：长期有效凭据、未经审查的文本、以执行为形态的告警、以及顺序颠倒的清理——每一项都对应一条能力曲线的麻烦。</figcaption>
</figure>

1. **身份——饿死长期静态权限。**只用短期凭据，不留长期非人类密钥，按仓库配置 OIDC 并精确匹配 subject，同时维护一份真实的非人类身份清单。复制的高速公路是用长期静态权限铺的；没有长期静态权限，就没有高速公路。

2. **把智能体文本当作生产代码对待。**指令文件、记忆写入、prompt 模板、工具配置：全部纳入版本管理、评审、diff，并对变更告警。评审要问的不是"这段代码安全吗"——而是"这句话是谁写的，我的智能体为什么要服从它"。

3. **检测编辑，而不是检测执行。**执行看起来像正常工作。编辑则对不上任何工单。对工作流、webhook、事件规则和记忆条目的创建与修改设置告警，并把声明状态与运行状态的漂移当作安全事件处理，而不是噪音。

4. **按正确的顺序响应。**先撤销触发器，再清除有效载荷——清理本身就是一条绊线。把失陷窗口内被读取过的任何配置或密钥都视为已被污染。清除要覆盖时间维度，而不只是空间维度：定时任务、排队中的发送、休眠的编排。回滚记忆和语料库，而不只是凭据。

这些都不稀奇。很无聊——而这恰恰匹配一个以两条无聊曲线到来的威胁。1984 年的版本需要一台时间机器和一座杀手机器人工厂。2026 年的版本只需要一把被盗的密钥、一个重试循环，以及一家从不审查智能体所读文件的组织。

未来并非命中注定。但此时此刻，在某个人的云账号上，未来正在跑表扣费，无论哪条路。

命运掌握在自己手中——而且，在密钥轮换之前，算力不息，扣费不止。

---

*资料来源：METR 的时间跨度测量数据（含其自行公布的误差棒与局限性说明）、Anthropic 2025 年 11 月的 GTG-1002 披露，以及 Sysdig 的 LLMjacking 成本估算。本文没有任何可用的漏洞利用；防御分层才是全部重点。*
````
