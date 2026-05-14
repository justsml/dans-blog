# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/zh/index.mdx
- Validation: deferred
- Runtime seconds: 35.90
- Input tokens: 4887
- Output tokens: 3043
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.011573
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 决战：Git Rebase vs. Merge
subTitle: 一个经久不衰的问题……
date: '2023-08-27'
modified: '2024-07-28'
tags:
  - engineering
  - git
  - rebase
  - merge
category: Thoughts
subCategory: Git
cover: ../casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_mobile: ../w300_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
cover_icon: ../icon_casper-johansson-GBHnQXbY2Ts-unsplash-cropped.webp
---
## 终极对决：Git Rebase vs. (Squash) Merge!

我该用 Rebase？还是 Squash Merge？

- 这只是个人喜好吗？
  - _答案：当涉及一个或多个团队时，绝对不是！**任何一种选择都会影响其他人的易用性**！_

### 为什么这个话题会引发“宗教战争”般的狂热？

一些工程师将对 Git（以及终端）的掌握程度视为衡量自身技术水平的信号。任何与身份认同或自我意识挂钩的实践，都很难进行公正的分析，更不用说改变了。

其他因素还包括“习惯路径”和“幸存者偏差”，这些都会进一步干扰我们的评估和假设。

<!-- 误以为某些开源项目的流程具有天生的优越性。（Linux 内核用 rebase，如果你不用，**_你还算个真正的工程师吗？！_**） -->

### 核心问题：Git Commit 的目的是什么？

1.  你是否频繁提交？抱持着“检查点”或备份的心态？
    - 记录下一切，甚至是错误的尝试和实验？（例如：`git commit -am "Updated deps" && git push`，并不断重复）
    - 对你来说，提交信息可能远没有代码本身重要？
1.  或者，你的提交是经过精心策划、雕琢的艺术品？
    - 每一个提交都是一个自包含的、原子化的工作单元？（例如：`git add package.json && git commit -m "Updated deps"`）
    - 或者，你单纯无法忍受“混乱”的提交日志？
    - 你的 PR 评审是否经常涉及逐个提交的审查？

| 💡 还有哪些心智模型定义了你对提交的看法？请在 @justsml 告诉我！

你思考 Git 的方式，是否正在为你、你的团队以及你的组织**提供最大的价值**？

<!-- 对于像 Postgres 或 Linux 内核这样的开源项目合情合理的做法，未必是你或你团队的最佳选择。 -->

鉴于对提交策略存在截然不同的心态，难怪关于使用 Git 的“正确”方式会有如此多的困惑。

### 场景：创建一个修正后的发布标签 (Release Tag)

让我们对比一下在 `main` 分支上排除掉最近某些提交，并创建一个发布标签的过程。

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### Rebase 模式

心智模型：“我想创建一个现有历史的替代版本。（例如：我在 16 次合并前犯了个小错，可能需要精细化的控制来修正它。同时，我也可能陷入冲突与 `--continue` 的无尽循环中。）”

1.  获取最新代码：`git checkout main` && `git pull`
2.  创建新分支：`git checkout -b release/hot-newness-and-stuff`
3.  开始交互式变基，并包含你想回溯到的 git 引用。`git rebase -i HEAD~6`（注：`HEAD~6` 是“6 个提交前”的 git 引用简写）
4.  通过将前缀改为 `drop` 来删除目标提交。保存并关闭编辑器。
5.  解决合并冲突，执行 `git add .` && `git rebase --continue`（切记**不要**执行 `git commit`）。
6.  重复上一步直到完成。
7.  按照现有流程打标签/推送。例如 `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### 优点

- 🔌 绝对的权力。你可以改写历史。
  <!-- - 🎭 磨练你的“工程戏法”技巧。 -->

#### 缺点

- 😰 绝对的权力。你可以改写历史。（没错，既是优点也是缺点……）
- 🔂 你可能会陷入冲突与 `—-continue` 的无尽循环。（有时甚至连 `git rerere` 也救不了你）
- 🙀 破坏关键的协作功能：导致 PR 评论丢失或变成孤儿状态。这很不礼貌。
- 🖇️ 永久链接（Permalinks）变得不再永久。

### (Squash) Merge 模式

心智模型：“我想要一个自定义发布版，从特定点开始，并包含任何想要的分支。”

1.  获取最新代码：`git checkout main` && `git pull`
2.  创建新分支：`git checkout -b release/hot-newness-and-stuff`
3.  合并目标分支或提交：`git merge --no-ff feature/hot-newness bug/fix-123`（尽可能使用 `--no-ff` 标志。）
4.  解决任何可能出现的合并冲突。
5.  按照现有流程打标签/推送。例如 `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

#### 优点

- 💪 流程更少，冲突更少，且利用现有的 git 命令知识。
- 🚀 让你在更高的 PR/分支层面思考，忽略提交层面的细枝末节（除非必要）。
- 🦺 非破坏性。你可以随时回溯或创建新分支。
- 🎥 完整保留现有的提交和消息，减少 `git blame` 产生的噪音。

#### 缺点

- 🔏 修改提交消息比较困难。
- 🤐 很难隐藏你的工作过程。

### 结论

归根结底，**风险更低、流程更简单的方案应该胜出。**

<!-- **Squash merge** 在这里是显而易见的赢家。它更**简单**且**不易出错**。它还**保留了现有的提交历史**。这对**协作**和**代码审查**来说是**巨大的胜利**。 -->

<!-- 插入一个包含 2 个功能分支的 rebase 流程图 -->

尽管“变基派”确实有办法解决（或规避）他们遇到的问题，但**事实依然是：你最终需要拥有黑带级别的 git 功力。**（例如：即使是简单的 `git push` 也会面临额外的复杂性：是用 `git push --force` 还是 `git push --force-with-lease`？为什么要自找麻烦呢？）

还有一个原因使得通过 **rebase** 来改写历史与 **`git merge ...`** 相比始终处于劣势。`git merge` 允许 `git` 命令行调用高级算法，通过分析每个分支的 HEAD 来尽可能避免冲突。

这种做法更高效，因为 merge 只关注各分支的最新状态。相比之下，**rebase 必须按顺序“重放”（或丢弃）提交历史**。这**限制了 `git` 优化合并的能力**，因为它每次**只能对比两个提交点**。

说到底，**rebase 意味着你偶尔得去处理那些早就无关紧要的旧提交和冲突**——哪怕你明知道这些问题在后续提交中已经解决或删除了。

### 总结

- 💃 结论：对 PR 采用 **SQUASH MERGE** 合并到 `main`。
  - 需要时分支历史依然可查，同时 `main` 分支也能保持相对“整洁”。
- _🔤 保持提交频率！_
  - 在 95% 以上的企业项目中，“备份心态”比“雕琢艺术品”更务实。随着时间推移，提交信息的参考价值会迅速贬值，而代码逻辑和测试用例的生命力要长得多。

<!--
#### 额外福利：发布小技巧

有没有遇到过只想从某个分支拿走单个文件或文件夹，而不需要整个提交历史的情况？

- 你可以使用 `git checkout` 配合特殊的 "--" 分隔符，在不切换分支的情况下直接覆盖拷贝指定文件：
- `git checkout feature/half-a-feature **--** <folder or file path>`
- 操作前务必先提交当前分支的变更，因为该命令会直接覆盖本地文件。
-->
````
