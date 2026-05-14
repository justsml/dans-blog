# Translation Candidate
- Slug: deathmatch-git-rebase-vs-merge
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.83
- Input tokens: 4949
- Output tokens: 1907
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000536
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 死亡对决：Git Rebase 与 Merge 的较量
subTitle: 一个永恒的问题……
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
## 死斗：Git Rebase vs.（Squash）Merge！

我应该 Rebase 还是 Squash Merge？

- 这只是个人偏好么？
  - _答案：当涉及一个或多个团队时不是！**任意一种选择都会影响另一种的可用性**！_

### 为什么这个话题会引发宗教般的狂热？

一些工程师把对 git（以及终端）的熟悉度当作相对技术水平的信号。任何与身份/自尊挂钩的实践都很难保持客观，更别提改变了。

其他因素可能包括熟悉度和幸存者偏差，这会进一步混淆我们自己的评估和假设。

<!-- 对某些 OSS 项目流程固有美德的误置信念。（Linux Kernel 使用 rebase，如果你不使用，**_你甚至是真正的工程师吗？！_**） -->

### 核心问题：git commit 的目的是什么？

1.  你是早提交、频提交吗？把它当作“检查点”或备份的心态？
    - 所有内容都被记录下来，甚至是错误的起步和实验？（例如 `git commit -am "Updated deps" && git push`，定期重复）
    - 对你而言，提交信息不如代码本身重要？
2.  或者，你的提交是一件精心策划、雕琢的艺术品？
    - 也许每个提交都是自包含、原子化的工作单元？（例如 `git add package.json && git commit -m "Updated deps"`）
    - 又或者，你根本容不下“凌乱”的提交日志？
    - 你的 PR 评审是否经常需要逐个提交审查？

| 💡 还有哪些思维模型在定义你对提交的看法？请在 @justsml 那里告诉我！

你是否在以 **为你、你的团队以及组织提供最大价值** 的方式使用 git？

<!-- 对于像 Postgres 或 Linux Kernel 这样的开源项目而言合理的做法，未必是你或你的团队的最佳选择。 -->

鉴于围绕提交策略的思维方式差异巨大，难怪大家对“正确”使用 git 的方式如此困惑。

### 场景：创建一个修订后的发布标签

我们来对比在 `main` 上排除最近几次提交来创建标签发布的过程。

![Git Tag Releasing from main with 2 feature branches](../git-branching-with-main-simplified.svg)

### Rebase 方式

思维模型：“我想为已有的历史创建一个替代版本。（例如，我在 16 次合并前搞了个乌龙，可能需要细粒度的控制来修正它。同时，可能会陷入看似无尽的冲突循环以及 `--continue`。）”

1.  获取最新代码：`git checkout main` && `git pull`  
2.  创建新分支：`git checkout -b release/hot-newness-and-stuff`  
3.  开始交互式 rebase 并指定要回溯的 git 引用。`git rebase -i HEAD~6`（注意：`HEAD~6` 是 “6 次提交前” 的简写）  
4.  将需要丢弃的提交前缀改为 `drop`，保存并关闭编辑器。  
5.  解决合并冲突，`git add .` && `git rebase --continue`（不要 `git commit`）。  
6.  重复上一步直至完成。  
7.  按常规流程打标签并推送。例如 `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`  

#### 优点

- 🔌 绝对控制权。可以改写历史。  
  <!-- - 🎭 Practice your Engineering Theater skills. -->

#### 缺点

- 😰 绝对控制权。可以改写历史。（好吧，这既是优点也是缺点……）  
- 🔂 可能陷入看似无尽的冲突循环与 `—-continue`（有时即使开启了 `git rerere` 仍会如此）。  
- 🙀 破坏关键协作功能：PR 评论会丢失或孤立，极不友好。  
- 🖇️ 永久链接的持久性会受影响。  

### (Squash) 合并方式

思维模型：“我想从某个起点开始定制发布，并包含任意需要的分支。”

1.  获取最新代码：`git checkout main` && `git pull`  
2.  创建新分支：`git checkout -b release/hot-newness-and-stuff`  
3.  合并所需的分支和/或提交：`git merge --no-ff feature/hot-newness bug/fix-123`（尽可能使用 `--no-ff` 标志）。  
4.  解决出现的任何合并冲突。  
5.  按常规流程打标签并推送。例如 `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`  

#### 优点

- 💪 流程更少，整体冲突更少，且使用的是已有的 git 命令知识。  
- 🚀 让你在更高层的 PR/分支视角思考，忽略提交粒度（除非真的需要）。  
- 🦺 非破坏性。随时可以回退或创建新分支。  
- 🎥 保留现有提交及其信息，减少 “blame” 噪声。  

#### 缺点

- 🔏 更难修改提交信息。  
- 🤐 更难隐藏你的工作。  

### 结论

归根结底，**更简洁、风险更低的流程应当占上风。**  

<!-- **Squash merge** is the clear winner here. It's **simpler** and **less error-prone**. It also **leaves the existing commit history intact**. This is a **huge win** for **collaboration** and **code review**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

虽然 _Rebasers_ 确实有办法解决（或规避）他们的问题，但 **事实仍然是：你最终需要在 git 上练就黑带**。（例如，即便是普通的 `git push` 也可能因 `git push --force` 还是 `git push --force-with-lease` 而增加复杂度，何必自找麻烦？）

还有一个原因，使得 **rebasing** 用来创建修订历史 **始终劣于** **`git merge ...`**。`git merge` 让 CLI 能够利用高级算法，通过分析每个分支的 HEAD 来尽量避免冲突。

这可以更智能，因为每次合并只关心每个目标分支的最新状态。而 **rebase 必须按照指定的顺序重新播放（或丢弃）提交历史**。这 **限制了 `git` 的优化能力**，因为它 **一次只比较两个提交**。

归根结底，**rebase 意味着你偶尔会重新遇到无关的旧提交和冲突**——即使你知道这些提交已经被移除或解决。

### Summary

- 💃 答案：**SQUASH MERGE** 你的 PR 到 `main`。
  - 需要时你的分支历史仍在，`main` 则保持相对“干净”。
- _🔤 永远保持提交！_
  - 在超过 95% 的企业项目中，“备份思维”优于“雕刻艺术”思维。随着时间推移，你的提交信息的意义会比代码本身的逻辑和测试更快消退。

<!--
#### Bonus: Releases Tip

Ever need just an individual file or a few folders from a branch? Without the commit history?

- You can use the special "--" separator with `git checkout` to stay in the current branch while copying the specified files:
- `git checkout feature/half-a-feature **--** <folder or file path>`
- Make sure you've committed any changes you want to keep first, as this will overwrite any local changes.
-->
````
