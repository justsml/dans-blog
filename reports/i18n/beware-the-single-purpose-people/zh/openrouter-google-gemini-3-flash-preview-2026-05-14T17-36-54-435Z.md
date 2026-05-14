# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/zh/index.mdx
- Validation: deferred
- Runtime seconds: 16.42
- Input tokens: 4445
- Output tokens: 2078
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.008457
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: 警惕职能单一的人
subTitle: 极致纯粹
category: Code
subCategory: Best Practices
date: '2025-04-14'
modified: '2025-04-15'
tags:
  - software-development
  - code-organization
  - maintainability
  - testing
  - dogma
  - pragmatism
social_image: ../desktop-social.webp
cover_full_width: ../endless-little-boxes.webp
cover_mobile: ../endless-little-boxes-square-200.webp
cover_icon: ../endless-little-boxes-square-200.webp
---
“单一职责原则”（Single Responsibility Principle, SRP）属于那种听起来极其合理，以至于能轻易绕过你理性判断的理念。

只做一件事。把它做好。保持模块聚焦。给代码一个改变的理由。这些都是金玉良言。

直到有人把这些建议当成了卷尺，开始宣称任何超过五行的函数都是“代码异味”（code smell）。

<p class="inset">问题不在于 SRP 本身。问题在于将“小”等同于“内聚”。</p>

到这一步，你就算遇上“单一目的信徒”了：这些开发者对模块化的理解倒也不算错，但他们混淆了有意义的边界与极致的碎片化。

<figure class="inset-right">
  <figcaption>软件架构中的暴力美学</figcaption>
![Components, components everywhere](../software-patterns__the-dismembered-architecture.webp "Components, components everywhere")
</figure>

## 一、 潜藏其中的有用理念

> 在表单中增加一个复选框，理想情况下应该只影响一个文件。而不是跨越 5 个目录的 8 个文件……说的就是你，React/Redux。

当带着判断力去应用 SRP 时，它确实大有裨益。聚焦于单一概念任务的代码单元更容易理解。测试可以针对合理的边界进行行为验证。清晰的模块让修改系统局部变得更简单，而不会把整个应用都卷进来。

即便是经典的 Unix 范例，也比口号所暗示的要务实得多。`ls` 的职责是列出文件，没错，但它也协调了 `opendir`、`readdir`、`closedir` 和 `stat` 等调用。有用的单元并不是最小的可执行操作，而是能解决任务的最小连贯实体。

<p class="inset">原始的 Unix 哲学核心在于“组合”与“简洁”，**而不是将一切都简化**为单个函数或文件。</p>

这种区别至关重要。“一个职责”并不等同于“一行行为”。

## 二、 过度抽象：当简洁演变为混乱

> 我们的架构师坚持认为任何超过 5 行的函数都是“异味”。现在我们的代码库散发着一种走投无路的绝望气息。

这种失败模式在折磨了你一周之后很容易被识破。

代码库的文件变多了，但轮廓却模糊了。每个辅助函数（helper）都有自己的辅助函数。每个概念都按照技术角色而非业务逻辑被拆分到了不同的文件夹里。增加一个复选框需要动到一个组件、一个 hook、一个 selector、一个 action、一个 reducer、一个常量、一个测试固件，以及一个主要为了掩盖引用路径混乱而存在的 barrel export。

<figure class="inset-left">
  <figcaption>这种无限循环的工作模式无处可逃</figcaption>
![Components, components everywhere](../software-patterns__the-mc-escher-stack.webp "The MC Escher Pattern")
</figure>

这种所谓的纯洁性到底换来了什么？

-   **文件系统碎片化：** 源码目录演变成了一场噩梦，充斥着无数微小的文件，通常里面只包含一个孤独得令人心碎的函数。代码导航变成了一场深潜运动。
-   **依赖纠缠：** 导入和导出构成的网络如此密集，以至于追踪执行流程需要一块巨大的白板，以及超出功能本身价值的耐心。那些只被导入过一次的文件躺在那里，假装自己具有复现性。
-   **测试背叛：** 测试变得脆弱，成了守护微小实现细节的高度特化哨兵。改个函数签名？眼看着几十个测试像古董陶器一样崩碎。测试套件从安全网变成了地雷区。
-   **效率消失：** 简单的改动演变成跨越多个文件的修改长篇。入职新开发人员需要花几周时间给他们发地图和指南针，仅仅是为了找到 `UserProfile` 组件这周*到底住在哪里*。在这些所谓“组织结构”的重压下，开发进度慢得像地质演变。

我曾凝视过这种代码库的深渊：一个简单的 100 行功能被肢解到 15 个以上的文件中，每个文件都是一个“纯洁”的小天使，只包含一两个函数。为了在脑中理清这团乱麻所消耗的认知成本，完全抵消了拆分带来的任何理论收益。这并没有变得更简单，只是变得更散乱了。

## III. 完美的代价：对开发者的影响

> 我们花在争论文件结构和命名规范上的时间，比实际交付功能的时间还多。这叫敏捷？

<figure class="inset-left">
  <figcaption>乱得很有艺术感</figcaption>
![So messy it borders on art](../software-patterns__the-rube-goldberg-architecture.webp "The Rube Goldberg Pattern")
</figure>

这种病态的碎片化不仅仅是审美问题。它改变了开发者分配注意力的方式：

**生产力流失：** 忘掉技术债吧，这是通过强迫症式的目录嵌套积累的“组织债”。每一次微调都变成了一场穿透抽象层的考古挖掘。时间消失在 `cd ..` 和 `grep` 的黑洞里。

**测试税：** 测试套件不仅没有提供信心，反而成了摩擦力的来源。数小时的时间耗费在修复因琐碎重构而崩溃的测试上，这些测试与它们本应验证的微观细节耦合得太紧了。

**认知负荷：** 人脑能同时处理的断开信息片段是有极限的。强迫开发者从一打散乱的文件中拼凑程序流，会主动阻碍理解，让自信地进行改动变得更加困难。

## IV. 拥抱务实：一个实际的替代方案

> 我建议把两个相关的函数放在同一个文件里。全屋人的反应就像我提议删掉预发布环境（staging）一样。
> —— 一位正在康复的纯粹主义读者

逃生舱口并不是放弃 SRP。答案是在正确的语义层级上应用它。

在实践中，它看起来是这样的：

-   **关注内聚，而非原子化：** 将那些*一起变化*且在概念上*属于一类*的东西归为一组。一个模块处理用户认证的几个相关方面是没问题的。这可能比分出六个独立文件、每个文件只存一个与登录状态相关的函数要*更好*。
-   **让亲属待在一起：** 除非有显而易见的、切实的收益（比如在*实践中*真正的复用性，而不是在某个从未到来的虚构未来），否则不要拆分相关的代码。物理距离对理解至关重要。
-   **由现实驱动：** 基于应用程序的实际功能和工作流进行组织，而不是基于某种函数式纯洁性的抽象理想³。这种结构是让别人理解和修改 `Feature X` 变得更容易还是更难了？
-   **体谅“肉机”（开发者）：** 记住可怜的开发者。什么样的组织结构能最大限度地减少处理代码所需的心理博弈？为人类的理解力而优化。
-   **测试重要的东西：** 编写在合理的边界验证行为的测试，而不是紧紧焊死在每个微小函数内部线路上的测试。追求信心，而不是覆盖率百分比的数字游戏。

<p class="inset">目标不是写出足以拿博士学位的理论完美代码，而是创建让你的同事（以及未来的你）能够导航、理解并修改，且不会想一把火烧了办公楼的代码。</p>

有时这意味着一个文件有 200 行而不是 50 行。有时一个函数既负责获取数据，又负责对其进行轻微转换。有时一个类有两个职责，但它们耦合得如此紧密，理应共存。如果这能让系统整体更容易协作，那它可能就是正确的选择。

始终坚持关注这些实际问题：
- 新人能找到路吗？
- 我们能在不破坏无关的 `Y` 的情况下修改 `X` 吗？
- 这个测试真的能告诉我功能是否正常吗？
- 我们是在交付价值，还是仅仅在重新排列文件夹？

## V. 结论：培养内聚且可维护的代码

单一职责原则（SRP）是一个有用的工具，但它绝不是要把你的代码库粉碎成原子尘埃的强制指令。像任何工具一样，它的价值取决于使用者的判断力。

所以，当你遇到那些准备对任何敢于超过三行的函数开战的“单一目的论者”时，深呼吸。记住那个需要改动 12 个文件的复选框案例。

我们的工作不是去构建理论上完美无瑕的雪花函数。我们的工作是构建能运行、能解决问题，并且不会惩罚下一个接手者的软件。

保持务实。关注结果。不要让对极致纯洁性的追求成为可维护代码的敌人。你的理智，以及你团队的开发效率，都取决于此。

¹ 讽刺的是，在最底层实现*真正的*单一目的，往往需要隐藏在表面之下的巨大复杂性。

² 我们这里讨论的是概念上的纯洁性：即一个函数在逻辑上应该只做“一件事”。不要将其与函数式编程中没有副作用的“纯函数”概念混淆，那是另一个虽然有时相关、但完全不同的想法。
````
