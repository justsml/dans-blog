# Translation Candidate
- Slug: love-computer-languages
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-12--love-computer-languages/zh/index.mdx
- Validation: deferred
- Runtime seconds: 18.46
- Input tokens: 4946
- Output tokens: 3070
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.001447
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 爱（计算机）语言
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../components/Gist/index.astro'

## 编程语言笔记

#### 我敢肯定我的这些零散观察前人早已说过，但以下是我认为最有趣的语言清单：

### JavaScript

我的挚爱，无所不能且无处不在——全能、强大到惊人的冠军！  
它连续多年在 GitHub.com 上稳居最活跃/最流行语言榜首。

我羞于承认，但多年来我曾愚蠢地对现在**我最爱的语言**只有轻蔑和嘲讽。

**ES6** 更是加剧了我的~~~成瘾~~~热爱。虽然纯 ES5 在我心中永远有特殊地位，但每次用到 **ES6**，我都会感受到那口放射性蜘蛛的叮咬……

有四个因素把我推向了 **ES6 阵营**：

1.  它很有趣。说真的。在美感、清晰度和生产力上都有实实在在的提升。

- 你说这是主观论断？那让我给你看一点 ES6：  
- `let expired = users.filter(u => Date.now() > u.trialDate)`  
- 现在你不需要假装自己会用 `Object.create` 或 `Object.defineProperty` 了  
- 见下方示例

1.  截至 2015 年 7 月，ES6 已是正式定稿的标准！  
1.  支持率实际上已达 100%*！……好吧，还需要 BabelJS 来打补丁，让代码兼容 ES5。历史上 JS 转译器一直不受待见。但最近（2014-15 年）情况变了，BabelJS 已成为推动语言进步的关键使能器。包括微软和 Facebook 在内的众多公司在一些最大的网站上使用它。  
1.  [最新版 Node](https://nodejs.org/en/blog/release/v4.0.0/) 包含了与 Chrome v45 相同的 V8 JS 引擎，版本为 v4.5

#### 示例

> 接下来我要展示是什么最终让我开始喝下那杯 ES6 风味的 Kool-Aid。

根据我近期的经验，ES6 能帮你更快地写出代码。直击要点。  
因为代码更简洁，理解自己或队友的旧代码所需的脑力明显减少。

我经常看到 KLOC 节省约 20-50%。就像 Kate Moss 式的瘦身！

**_缺失图片：_ EcmaScript 5 vs ES 2016 - 演示：类、解构、简洁**  
{/* ](/images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- 不再需要繁琐的代码来“提取”和“检查”传递给函数的字段。直接看 `add()` 示例：

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // 存储密码哈希，我们只需要显式定义 1 个 `var/let` —— 其他变量通过上面的 `{fields}` 魔法“定义”
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // 服务响应后追加用户
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

<p>&#160;</p>

#### 从 ES6 入门的感觉就像是从：

<div class="anigif top">
  <img alt='困惑' title="嗯？" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>到</h3>
<div class="anigif">
  <img alt='什么鬼' title="WTF？！" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>再到</h3>
<div class="anigif end">
  <img alt='#赢了' title='#赢了' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

只要不断筛选新特性就好。试试字符串模板、自动 `this` 绑定、更合理的继承……

##### [Node.JS](http://nodejs.org/)

### Rust

##### [官方网站](http://www.rust-lang.org/)

- **优点**

- 想象一下，如果有一种语言，像 C 一样快，像 Python/C++ 一样强大，却没有那些连最熟练的开发者都常掉进去的复杂性和陷阱。
  - 实际上，我猜 Rust 的复杂度大致和 ES6 规范相当。
  - 它包含了一大堆额外功能：
    1.  本质上，Rust 将半动态语法转译成 **纯 C 代码**！
    1.  包括 C 中你可能会搞砸的 **所有最佳实践**，我 ~~最终~~ 总是会搞砸。
    - 自动获得：
    - 自动内存管理（无需慢速的垃圾回收器！）
    - 完美作用域的对象所有权/锁定（最小化互斥和上下文切换）
    - 对象生命周期（自动实现*，并且自动编码得像你了解每个边界情况一样）
    - 几乎杜绝所有运行时错误（说真的，你的代码路径变得明确：你根本无法忽略任何一条路径）
  - 哦对了，它还通过合理的“宏”特性提供了真正的语言可扩展性。
    - 需要列表推导？[Scala 风格？搞定](https://gist.github.com/hanny24/5749688)，[像 Python 一样？搞定](https://gist.github.com/JeffBelgum/5e762761cd63c796e803)。
    1.  好得难以置信？不，还有更好的：
    - 前沿指标（github.com 统计数据）显示 Rust 极具竞争力，甚至超过了 Go（Google 的热门新语言）
      - 比 Go 多约 4000 颗星（目前约 12200 颗）
      - 总贡献者更多（2 倍！——1071 对 Go 的 479）
      - 复刻更多（3 倍！——2343 对 765）
      - 开放问题数量，略逊一筹（2000 对 Go 的 1730）
      - 拉取请求（Rust 70+ 对 Go 的 1）
    - 我也反复核对了这些数字。
  - 由于 Rust 的构造和规则，其他库非常稳定。
  - 凡人也能用的线程模型

- **缺点**
  - 像样的 **Web 框架** 相对较新、未经测试，而且通常没有文档（不过截至 2015 年 3 月，它们 **正在** 变得非常令人印象深刻）。
  - 1.0 之前有很多破坏性变更

### Python

- **优点**
  - 大量算法已经在 Python 中实现了极其完整的集合（参见：scilearnkit、numpy、matplotlib、pil/pillow 等）
  - 写起来非常有趣！列表推导和解构是很好的特性，让其他语言显得臃肿！
  - 数组、“序列”、元组等相对简单

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **缺点**
  - 烦人的是，Python 2.x 和 3.x 不兼容。大分裂持续了这么多年。
  - 一些关键库并非所有开发者都能理解（例如 numpy）

### Haskell

- **优点**
  - 当你终于记住足够的语法，能够快速写出基于列表推导的表达模式时，会非常有成就感。
  - 你会学到令人脑洞大开的代码模式——通常也适用于其他语言。
- **缺点**
  - 语法和模式可能难以适应。

<div class="anigif end">
  <img alt='无限循环' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **优点**
  - 编译器极其简单（尤其是最初的版本）
  - 优秀资源：[Smalltalk MVC 翻译为 JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **缺点**
  - 你很可能永远不会用这门语言做任何事。零项目。然而它对你编码风格的影响，会比其它函数式语言更快……（这应该放在优点列表里）

#### _工作进行中（2015年12月更新）_
````
