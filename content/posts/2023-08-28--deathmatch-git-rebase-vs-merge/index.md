---
title: "Deathmatch: Git Rebase vs. Merge"
subTitle: A timeless question
date: 2023-08-27
modified: 2023-09-11
tags: [engineering,git,rebase,merge]
category: Git
cover: casper-johansson-GBHnQXbY2Ts-unsplash-cropped.jpg
---

# Deathmatch: Git Rebase vs. (Squash) Merge!

Should I Rebase? Or Squash Merge?

- Is it a personal preference?
  - _Answer: Not when one or more teams are involved! **Either choice will impact usability** of the other!_

## Why does this topic evoke religious fervor?

Some engineers use knowledge of git (& the terminal) as a signal of their relative skill level. And any practice that's tied up with our identity/ego can be impossible to analyze impartially, never mind change.

Other factors likely include Familiarity & Survivorship Bias which can further muddy our own assessment & assumptions.

<!-- Misplaced belief in the inherent virtue of certain OSS projects' processes. (The Linux Kernel uses rebasing, and if you don't, **_ArE yOu EvEn A rEaL eNgInEeR?!_**) -->

## Key question: What is the purpose of a git commit?

1.  Do you commit early & often? Using a "checkpoint" or backup mindset?
    - Where everything is recorded, even false-starts and experiments? (e.g. `git commit -am "Updated deps" && git push`, repeat regularly)
    - Perhaps commit messages are less important than the code to you?
1.  Or, are your commits a carefully curated, sculpted work of art?
    - Maybe each commit is a self-contained, atomic unit of work? (e.g. `git add package.json && git commit -m "Updated deps"`)
    - Or, you simply can't stand "messy" commit logs?
    - Do your PR reviews often involve reviewing commit-by-commit?

| 💡 What other mental model(s) define how you see commits? Please let me know @justsml!

Are you are thinking about git in a way that is **providing the most value** to you, your team, & your organization?

<!-- What makes sense for an Open Source project like Postgres, or the Linux Kernel, may not be the best choice for you or your team. -->

Given that there are very different mindsets around commit strategy, it's no wonder there's so much confusion about the "right" way to use git.

## Scenario: Create a revised release tag

Let us compare the process of creating a tag release excluding some recent commits on `main`.

![Git Tag Releasing from main with 2 feature branches](./git-branching-with-main-simplified.svg)

## The Rebase Way

Mental model: "I want to create an alternate version of an existing history. (e.g. I made an oopsie 16 merges ago, and may need fine-grained control to correct it. Also, might get stuck in a seemingly endless cycle of conflict & `--continue`.)"

1.  Get latest: `git checkout main` && `git pull`
2.  Create new branch: `git checkout -b release/hot-newness-and-stuff`
3.  Start interactive rebase & include the git ref for where you want to travel back in time. `git rebase -i HEAD~6` (Note: `HEAD~6` is 'git ref' shorthand for `6 commits ago`)
4.  Drop desired commit(s) by changing their prefix to `drop`. Save and close the editor.
5.  Fix merge conflicts, `git add .` && `git rebase --continue` (do NOT `git commit`).
6.  Repeat previous step until complete.
7.  Tag/push using current process. Example `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

### Pros

- 🔌 Absolute power. You can change history.
  <!-- - 🎭 Practice your Engineering Theater skills. -->

### Cons

- 😰 Absolute power. You can change history. (Ok, a Pro & Con...)
- 🔂 You can end up in a seemingly endless cycle of conflict & `—-continue`.
- 🙀 Breaks key collaboration features: lost/orphan PR comments.
- 🖇️ Permalinks can become not that permanent.

## The (Squash) Merge Way

Mental model: "I want a custom release, starting at a given point, and including any desired branch(es)."

1.  Get latest: `git checkout main` && `git pull`
2.  Create new branch: `git checkout -b release/hot-newness-and-stuff`
3.  Merge in desired branches and/or commits: `git merge --no-ff feature/hot-newness bug/fix-123` (use the `--no-ff` flag where possible.)
4.  Fix any merge conflict (should it come up.)
5.  Tag/push using current process. Example `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

### Pros

- 💪 Less process, fewer conflicts overall, and uses existing git command knowledge.
- 🚀 Lets you think at a higher PR/branch level, ignoring commit level granularity (unless needed.)
- 🦺 Non-destructive. You can go back and/or create new branches anytime.
- 🎥 Leaves existing commits & messages as a whole, which leads to less 'blame' noise.

### Cons

- 🔏 Harder to change commit messages.
- 🤐 Harder to hide your work.

## Conclusion

At the end of the day, **a simpler process with less risk should win out.**

<!-- **Squash merge** is the clear winner here. It's **simpler** and **less error-prone**. It also **leaves the existing commit history intact**. This is a **huge win** for **collaboration** and **code review**. -->

<!-- Include a diagram of a rebase flow with 2 feature branches -->

Even though _Rebasers_ indeed have ways to solve (or avoid) their problems, the **fact remains: you'll eventually need a black belt in git fu.** (e.g. Even a humble `git push` can face extra complexity: was it `git push --force` or `git push --force-with-lease`? Why deal with that at all?)

There's another reason **rebasing** to create a revised history **will always be at a disadvantage** compared to **`git merge ...`.** A `git merge` lets the `git` CLI apply advanced algorithms to avoid conflicts by analyzing each branch's HEAD.

This can be smarter because each merge only cares about the latest state of each desired branch. whereas **rebasing must re-play (or drop) the commit history in the sequence** specified. This **limits `git`'s ability to optimize** the merge since it **only compares 2 commits** at a time.

Ultimately **rebasing means you’ll occasionally find yourself re-experiencing irrelevant old commits & conflicts** - even if you know they have since been removed or resolved.

## Summary

- 💃 Answer: **SQUASH MERGE** your PRs onto `main`.
  - Your branch history will be there if needed, and `main` will stay relatively "clean."
- _🔤 Always Be Committing!_
  - In >95% of corporate projects the "backup mindset" is preferable to the "sculpted art" mindset. As time goes on, your commit messages' meaning will fade, much faster than the code whose logic & tests will maintain their significance.

<!--
### Bonus: Releases Tip

Ever need just an individual file or a few folders from a branch? Without the commit history?

- You can use the special "--" separator with `git checkout` to stay in the current branch while copying the specified files:
- `git checkout feature/half-a-feature **--** <folder or file path>`
- Make sure you've committed any changes you want to keep first, as this will overwrite any local changes.
-->
