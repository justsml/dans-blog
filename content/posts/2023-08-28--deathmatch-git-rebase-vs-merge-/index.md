---
title: "Deathmatch: Git Rebase vs. Merge!"
subTitle: A timeless question
date: 2023-08-27
modified: 2023-08-28
tags: [engineering,git,rebase,merge]
category: Git
cover: casper-johansson-GBHnQXbY2Ts-unsplash-cropped.jpg
---

# Deathmatch: Git Rebase vs. Merge!

Should I Rebase? Or Squash Merge?

- Is it a personal preference?
  - _Answer: Not when one or more teams are involved! Either choice will impact usability of the other!_
- Why does this topic seem to evoke religious zealotry?
  - Familiarity bias, survivorship bias, etc.
  - Misguided belief in the inherent virtue of certain OSS projects (& their processes.)
  - Devs use knowledge of git (& the terminal) as a signal of their relative skill level.
    - Any practice that's tied up with our identity/ego is almost impossible to analyze impartially, never mind discussing changes.

Setting aside the “why” and history for now.

Let us compare the process of creating a tag release excluding some recent commits on `main`.

## Releasing with Rebase

Mental model: "I want to create an alternate version of an existing history. (e.g. I made an oopsie 16 merges ago, and may need fine-grained control to correct it. Also, might get stuck in a seemingly endless cycle of conflict & `--continue`.)"

1.  Get latest: `git checkout main` && `git pull`
2.  Create new branch: `git checkout -b release/hot-newness-and-stuff`
3.  Start interactive rebase & include the git ref for where you want to travel back in time. `git rebase -i HEAD~3` (Note: `HEAD~3` is 'git ref' shorthand for `3 commits ago`)
4.  Drop desired commit(s) by changing their prefix to `drop`. Save and close the editor.
5.  Fix rounds of merge conflicts, should they occur. `git rebase --continue` Rinse and repeat.
6.  Finish rebase.
7.  Tag/push using current process. Example `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

### Pros

- 🔌 Absolute power. You can change history.
- 🎭 Practice your Engineering Theater skills.

### Cons

- 😰 Absolute power. You can change history. (Ok, a Pro & Con...)
- 🔂 You can end up in a seemingly endless cycle of conflict & `—-continue`.
- 🙀 Breaks key collaboration features: lost/orphan PR comments.
- 🖇️ Permalinks can become not that permanent.

## The merge way

Mental model: "I want a custom release, starting at a given point, and including any desired branch(es)."

1.  Get latest: `git checkout main` && `git pull`
2.  Create new branch: `git checkout -b release/hot-newness-and-stuff`
3.  Merge in desired branches and/or commits: `git merge --no-ff feature/hot-newness bug/fix-123`
4.  Fix any merge conflict (should it come up.)
5.  Tag/push using current process. Example `git tag -a v1.2.3 -m 'Release v1.2.3'` && `git push --tags`

### Pros

- 💪 Simple == Less process, fewer conflicts overall, uses existing git command knowledge.
- 🚀 Lets you think at a higher PR/branch level, ignoring commit level granularity (unless needed.)
- 🦺 Non-destructive. You can go back and/or create new branches anytime.
- 🎥 Leaves existing commits & messages as a whole, which leads to less 'blame' noise.

### Cons

- 🔏 Harder to change commit messages.
- 🤐 Harder to hide your work.

## Conclusion

At the end of the day, **a simpler process with less risk should win out.**

Even though rebasers indeed have ways to solve (or avoid) their problems, the **fact remains: you'll eventually need a black belt in git fu.** (e.g. Even a humble `git push` can face extra complexity: was it `git push --force` or `git push --force-with-lease`? Why deal with that at all?)

**Rebasing** (replaying) revised history **will always be at a disadvantage** compared to **`git merge ...`.**

Why? Let's take a look at what each command can optimize around:

A `git merge` lets the `git` CLI apply advanced algorithms to avoid conflicts by analyzing each branch's HEAD.
This can be smarter because each merge only cares about the latest state of each desired branch. whereas **rebasing must re-play (or drop) the commit history in sequence**. This **limits `git`'s ability to "optimize"** the merge since it **only compares 2 commits at a time.**

Ultimately rebasing means you’ll occasionally find yourself re-experiencing irrelevant old commits & conflicts - even if you know they have since been removed or resolved.

## Summary

- 💃 Answer: **SQUASH MERGE!**
- _🔤 Always Be Committing!_
- 🏴‍☠️ _Death before rebase!_

### Bonus: Releases Tip

Ever need just an individual file or a few folders from a branch? Without the commit history?

- You can use the special "--" separator with `git checkout` to stay in the current branch while copying the specified files:
- `git checkout feature/half-a-feature **--** <folder or file path>`
- Make sure you've committed any changes you want to keep first, as this will overwrite any local changes.
