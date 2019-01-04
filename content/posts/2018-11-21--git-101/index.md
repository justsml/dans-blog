---
title: "Git 101: Never lose work!"
subTitle: "Change without fear!"
date: 2018-11-20
modified: 2018-11-22
tags: [command-line, git, github, terminal]
category: workflow
cover: john-moeses-bauan-713049-unsplash.jpg
---


This guide will help you learn the most important `git` commands. Whether you've only just started with `git`, or you've been living the struggle, this is for you.

<br />
<br />

![credit: john-moeses-bauan-713049-unsplash.jpg](john-moeses-bauan-713049-unsplash.jpg "credit: john moeses bauan")

<!-- <br /> -->
<br />

> I can vividly **remember the feeling of being _completely_ overwhelmed** when I first tried `git`. <br />
> I'd ask myself "is this _really_ making dev life better? My Perl and Shell scripts are doing my backups just fine!"

I'd completely missed the point. It's so much more. **Good news: you don't have to learn it all!**

> This is the **article I wish I'd had** when I started **climbing Mount Git**.

<!-- There are "5 Vital Commands" to get started with `git` - we'll see some major benefits right away: _Backups_, _Code Sharing_, _Unlimited Undo_*, etc. -->

We will use `git` to add _waypoints_ along our journey. (Anything like Feature Branches and Merging is out of scope for this article.)

<!-- While I can easily see `git`'s potential, I found it frustrating , the endless sea of command-line/CLI commands and options - both long-form (e.g. `--set-upstream-to=<upstream>`) and short-form (e.g. `-u <upstream>`).
 -->

<!-- **change code & rapidly test ideas** without fear - I found out how to **time travel with `git`.** -->

## Required: Git Get Got Goin' (Setup)

**Jargon Cheat Sheet:**

|Jargon|Words|
|:------|:-----|
|`git`|A command-line interface to manage git repositories|
|GitHub|Repository hosting service|
|Repository |Any project once `git init` is run|
|remote|Often refers to url like `github.com/[username]/[projectname]`
|origin|Default name of initial `remote`


> **Note:** There's a difference between `git` and "GitHub.com"

They are not interchangable.

* When I write or say `git`, I'm referring to the CLI (command-line interface) tool. It's a free & open-source package; widely available on every major operating system. The **`git` CLI is where you should prioritize** your learning. Avoid graphical tools or even VS Code's built-in GitHub support. At least until you feel comfortable with most of the commands described here.
* "GitHub.com" is a website and repository hosting service. A friendly web interface built atop `git`s CLI. <br />"GitHub.com" has become the de facto official host for Open Source, as well as many companies.


1. Setup Git - New or Existing Projects

https://help.github.com/articles/create-a-repo/

## Rarely Used Git Commands

While these commands are rarely used, they are still **very important**. I wasted so much time trying to memorize the intricacies of `log`, `diff`, and `checkout`. I was only able to remember these 'Rare' commands once I'd memorized the 3 [Most Used Git Commands](#most-used-git-commands). It's ok if you need to bookmark this page and revisit these 'Rare' commands.

Setup and `init` commands only run once.

You'll interact a bit more with the `log` (diary of saved changes), `diff` (compare changes by point-in-time), and `checkout` (can be used to get individual files or change the entire folder to any point in the `log` history).

1. See into the past - browse your commit history with `log`
1. Get summarized changes between commits - `diff` like a pro
1. Get specific file(s) from any point in the log - rapidly grabbing files let's you rapidly find when a bug got introduced.
1.

## Most Used Git Commands

The following **3 commands get ~90% of the action**. It's surprising & impressive considering the 3 commands don't even amount to `1%` of the possible commands and options in `git`.

Before these commands will work, you must review the [Rarely Used Git Commands](#rarely-used-git-commands).

1. Select changes to save (add)
1. Save changes w/ description (commit)
1. Backup to GitHub.com (push)


### 1. Select changes to save (add)

```sh
git add -A # Adds all changed, renamed & deleted files
git add social.js images/linkedin.svg # Stages 2 files
git add images # Stages any changes in images folder
git add . # Stages changes in current folder
```

### 2. Save changes w/ description (commit)

```sh
git commit -m 'Added social media links'
```

### 3. Backup to GitHub.com (push)

⚠️ Warning: If your code is private, double-check the privacy and permissions settings in GitHub.com.

To upload your changes to GitHub.com, run this:

```sh
git push origin master
```

#### 3a. Troubleshoot Failed Push

You may need to `git pull` to sync any remote changes from GitHub.com. This is very common on teams (and if you work on multiple computers).


## Review

We looked at a handful of magic spells. You can get a lot out of them right away.


## FAQ


Inevitably you'll have questions.
Here's some of the most common I here after teaching this intro material:

* [How much `git` do I _really_ need to know?]()
* [What are remotes?]()
* [What are forks?]()
* [Are remotes and forks related?]()


## Troubleshooting


