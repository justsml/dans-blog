---
layout: post
title:  "Naming things real good"
subTitle: "Naming stuff: Object Oriented Basics"
date:   2016-06-01
modified:   2018-09-24
category: programming
tags: [programming, patterns, naming, source code, organization]
cover: rawpixel-652639-unsplash.jpg
---

# Naming stuff: Object Oriented Basics

![credit: rawpixel-652639-unsplash.jpg](rawpixel-652639-unsplash.jpg)

Let's look at Object/class design by example...

## The Situation

Have you ever designed a `data model` (in code, Sql, or excel worksheets)?
Does the following look familiar?

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```



## Where's the bug?

Well, technically there's no bug, simply data in need of re-organization.

**Does the following sound familiar?**

1. Any change to your app will necessitate hours of arduous debugging.
1. Any changing requirements will result in:

![schema refactor][schema_refactor]

Why is naming a field `agentEmailPrimary` _so bad_?

For starters, you are **not** creating an entirely new thing unto the universe. Over-specificity has some traps:
1. 'Locked' into highly specific name, means `agentEmailPrimary` probably make your views and related code **0% reusable**, and featuring annoyingly recurring bugs like:
  - Data not syncing between tables (not obvious if `user.email` needs to propagate to `agent.agentEmail` or vice-versa - nevermind complexity of manually implementing where & how to enforce this 'logic' ...)
  - Validation rules/logic are likely duplicated & inconsitent.
  - Increasingly, your project will resemble a shaky Jenga tower.
  - Fragility piles up with every single new file, as an extremely high attention to detail is required for even trivial changes
1. `agentEmailPrimary` could mean a few different things. Avoid ambiguity with **shorter names**.
  * Watch out for silly excess wording. `Primary`? Just leads to more questions: Is there a Secondary? Is it for their Primary Next-of-kin?



Enough words Dan, what should it look like instead?

## A Solution

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address

```

I removed the `Agent` table, as it didn't contain fields which were unique to Agents.

All changes were made with these general ideas in mind:

1. Eliminate unessesary tables. If you have a few dozen tables, this step is mandatory.
  1. Try merge related tables. **Important if you are coming from a SQL background to No-SQL**
  1. Delete redundant data collection (e.g. remove `ActivityLogs` table if replaced by Google Analytics)
1. Try keeping **all field names** to a **single word/noun/pro-noun**.
  1. There is **no such thing** as `Agent.agentEmail` or `Agent.agentPhonePrimary`. Period.
  1. By using Highly Specific Names, you cast-in-stone a specific level of `code-reusability` and `durability`, well, specifically **ZERO %**.
  1. Don't think you are doing yourself any favors with crap like this `User.profileSummaryEmail` (where 'profile' could include contact details for a personal ads site) . This is probably a good point to create a new table, say `Profiles` which includes `Profiles.email`.


**Recommended reading includes:**

1. Book: Code Complete
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)



[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
[not_a_fan]: https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif
[teamwork]: https://res.cloudinary.com/ddd/image/upload/teamwork__tumblr_n2df80cPZa1s373hwo1_400_ghv4xn.gif
[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
[new_feature]: https://res.cloudinary.com/ddd/image/upload/simba-toss-error.gif
[drinking]: https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif
[cat_outfit]: https://res.cloudinary.com/ddd/image/upload/v1441143858/cat-bee-fail.gif
[cat_loops]: https://res.cloudinary.com/ddd/image/upload/v1441143869/cat-loops.gif
[cat_bowl]: https://res.cloudinary.com/ddd/image/upload/v1441143883/kitten_bowl.gif
[cat_wtf]: https://res.cloudinary.com/ddd/image/upload/v1441143878/cat-wtf.gif
[endless_loop]: https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif

