---
layout: post
title:  "Avoiding Promise Pitfalls"
subTitle: Navigating existing documentation
date:       2017-05-10
modified:   2018-09-24
category: programming
tags: [programming, patterns, source code, functional river]
cover: craig-whitehead-433328-unsplash.jpg
---

## Spotting Promise Anti-Patterns

> Please take a look at (& star plz) this article's companion Github project, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)
#### Project Goal: research & develop better functional language patterns in JavaScript.

> The subjects I'm addressing have been explored by many - and rejected by others.
I believe the reason for the divide is `Google Results Roulette` & developers blindly trusting results.
Bad/outdated examples lead to broadly held suspicions of terms like: `modular JS`, `composable JS` or `functional JS`.

Let me start with a confession: I'm guilty of writing the same anti-patterns I criticize below, as I'm sure many JS developers are as well. Nothing I've laid out is meant to be personal or even directed at the original authors. I'm merely doing a code review on common patterns - I hope to pass along an understanding of my priorities & critical thinking processes.

> Hopefully you will be able to spot the warning signs of bad Promises after groking this project.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![image](https://cloud.githubusercontent.com/assets/397632/25830910/97f8394c-341d-11e7-8eb3-46a13a085b83.png)

----------------------
### StrongLoop
> **CREDIT:** https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/
![image](https://cloud.githubusercontent.com/assets/397632/25831443/5dbb15fc-3421-11e7-96d6-0e37bdaafc1c.png)


----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
This is a pretty solid article. I only have 1 concern:

![image](https://cloud.githubusercontent.com/assets/397632/25830851/2eea5548-341d-11e7-946d-05f4cfc692d5.png)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

The Q library is one of the most used & oldest to be associated with "Promises." Hence it suffers from aging examples and it's need to maintain backwards compatibility.
**I say "associated with 'Promises'" since I feel Q is really about the `deferred` pattern.**

It may resemble Promises, however I insist it ain't. It has far too large a surface area for all the wrong reasons. Also the naming convention inconsistently abbreviates names, making it harder to memorize the interface. Methods like `when` and `done` are not necessary.

Bottom line: the `deferred` pattern is a painful anti-pattern - it improves virtually nothing over the typical callback approach.

![q first example](https://cloud.githubusercontent.com/assets/397632/25921328/3dd1bbf2-3592-11e7-91db-ec90f7044f9d.png)

![q xmlHTTP deferred anti-pattern](https://cloud.githubusercontent.com/assets/397632/25920616/c7d807fa-358f-11e7-98c7-d77781672656.png)

----------------


One more thing, my work likely has bugs or quality issues - please [file an issue here](https://github.com/justsml/escape-from-callback-mountain/issues/new) - always appreciated!
