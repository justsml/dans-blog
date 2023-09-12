---
title: "ESM exports: named vs. default?"
subTitle: To name, or not to name?
date: 2023-08-10
modified: 2023-08-18
tags: [typescript,javascript,modules]
category: JavaScript
cover: austin-kirk-cHX_Eih2hkY-unsplash-cropped.jpg
---

# Should you use `named` or `default` exports in JavaScript?

There’s no shortage of strongly worded articles on this topic.

The majority judge `default export` as "terrible." Others maintain `default` should win (e.g. AirBnb style guide.)

They often blame **entirely temporary** things: IDE auto-import bugs, a particular bundler’s tree-shaking abilities, or the mere possibility of typos when naming an import.

Have we missed the point of `export`ing in the first place?

**Code is Communication. ✨**

> We are sending a signal to `import`ers _how to use a thing._

## So, what are we saying?

Broadly speaking, there are 2 ways to export things in modern JavaScript:

- An `export default` boldly declares "This is **_THE SINGLE MOST IMPORTANT_** thing." Also, "any named exports only play a supporting role."
- A `named export` says it’s "definitely **_A THING!_**" Also raises some questions, "got any other buddies there?" Follow up, "Are they invited or required?"

Of course you can combine both, or use different approaches for different parts of your codebase. [See more examples at the end of the article.](#summary)

## Weak Args, Man

Let’s address some of the common "temporary issues" folks run into.

- Arg #1: Named exports ensure name consistency. [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, they don’t. You’re maybe looking for a lint rule?
  - (I hate to break it to you, but wait until you learn what variables can do!)

```tsx
// You can alias using both!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Use `import * as soManyKnives from './kinves.js'` to combine named exports. (Not linked, author retracted.)
  - Neat feature. Not the point.
  - Now tell me, how do I hold your contraption again? No author intent.
- Arg #3: Named exports have better IDE import or renaming support. [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

  - Incorrect (any more). Configure/update your tools.
  - Support has existed for 3+ years in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, etc.
  - Still, there are some "best practices" to use with `default exports` to get the best IDE & refactor experience.
  - ✅ `export default function UserService() {}` - always prefer named functions.
  - ❌ `export default function() { }` - anonymous functions are not implicitly tied to their filename. If you don’t name the thing, it’s hard to ask the computer to change it.
  - **Note:** For historical reasons you cannot combine `export default` with a `const` expression.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Not Supported ❌ ^
    // Cannot export default const ....
    // ==========================

    // However, once declared you can export a const var as the default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valid

    // For completeness:
    export default class anyoneStillUseThese {}
    // ^ ✅ Also valid to export a class as default
    ```

## Summary

There are actually many combinations of ways we could export things, each tells a different story:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | One default export.                                       | "Presenting ONE function w/ Single Purpose!"                  |
| ❌                | ✅              | ❌          | One named export.                                         | "Please don’t rename me."                                     |
| ✅                | ✅              | ✅          | Default export + multiple 'private' un-exported functions | "Here’s some related logic. Also, expect class-ish behavior." |
| ❌                | ❌              | ✅          | Multiple named exports, generic file name.                | "A grab-bag of loosely related things, no hierarchy implied." |
| ✅                | ✅              | ❌          | Single named export ALSO exported as default.             | "You can’t mess up importing me."                             |

**Something to think about:** What are we saying when the file name does or doesn’t match one of its exports? (For example, a `utils.js` with many functions.)

## Conclusion

If Code is Communication, please `export` like you fucking mean it. 💞
