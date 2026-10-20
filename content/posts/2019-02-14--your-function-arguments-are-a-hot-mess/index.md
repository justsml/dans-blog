---
title: "Your Function Arguments Are a Hot Mess"
subTitle: Memorable, durable and flexible approach
date: 2019-02-15
modified: 2019-02-22
tags: []
category: programming
cover: null
---

# Your Function Arguments Are a Hot Mess

Destructured named object parameters is preferred to positional arguments **in almost every case.**

Inevitably, every design decision involves trade-offs. So, let me frame 2 priority goals, **clarity** and **memorability**, as more important than **extreme DRY** adherence.

1. Clarity. Using the **same names** for function parameters AND in their invocations' arguments helps **cement the pattern deeper in the brain.** Flexibility in the key sequence lets you draw attention to contextually important parameters.
1. Limit guessing game. Help people **read**, **evaluate**, and **understand** _usage examples & implementation_ code **faster,** while reducing need to repeatedly checking the functions signature 😰(or relying on IDE features or keeping the docs open in another tab.)
1. Improve Signal:Noise ratio. Positional arguments have virtually zero built-in indication of what each signifies. Related groups of names are naturally better "anchor points" in your brain.
1. Better ergonomics for optional arguments (avoid needing to pass in an `undefined` argument).

Let me clarify that certain cases (e.g. the `copy` file command) are a natural fit for positional arguments.

