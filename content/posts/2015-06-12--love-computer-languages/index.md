---
layout: post
title:  "Love (Computer) Languages"
date: 2015-06-12
modified: 2018-09-24
category: languages
tags: [programming, languages, lua, haskell, scala, rust, smalltalk, go, javascript, python]
cover: rawpixel-602144-unsplash.jpg
---

# Programming Languages Notes

![credit: rawpixel-602144-unsplash.jpg](rawpixel-602144-unsplash.jpg)

### I'm sure my Miscellaneous Observations have been made before, but here is my list of most interesting languages:

## JavaScript

My One True Love, supremely versatile & ubiquitous - the all-around, amazingly-powerful champ!
It's the #1 Most Active/Popular Language on GitHub.com for _years_ running.

I hate to admit it, but for years I foolishly had nothing but scorn and derision for what is now, **my favorite language**.

**ES6** has only increased my ~~~addiction~~~ love. While pure ES5 will always hold a special place in my heart, each time I use some **ES6**, I feel that radioactive spider-bite...

There were 4 factors which pushed me into the **ES6 Camp**:

1.  It's fun. Seriously. There are tangible gains in beauty, clarity & productivity.

- Subjective claims, you say? Let me show you a bit of ES6:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- Now you don't have to pretend you know how to use `Object.create` or `Object.defineProperty`
- See examples below

1.  As of July 2015, ES6 is an officially finalized standard now!
1.  Support is Effectively 100%\*! ... Ok, BabelJS is needed to patch your code so it's ES5 compatible. Historically JS transpilers have been frowned upon. However, as of late (2014-15) things have changed as BabelJS has become a key enabler/driver of language advancement. Tons of companies including Microsoft & Facebook use it on some of the largest sites around.
1.  [Latest versions of Node](https://nodejs.org/en/blog/release/v4.0.0/) include the same V8 JS engine as Chrome v45, it's v4.5

### Examples

> I'm going to show you what finally made me _start_ drinking that ES6-flavoured KoolAid.

In my recent experience, ES6 helps you write code faster. To the point.
Because code is more succinct, appreciably less brain power is needed to sift through and understand your old code (or that of a teammates).

I have regularly seen KLOC savings roughly of 20-50%. That's like Kate Moss trim!

![EcmaScript 5 vs ES 2016 - Demo: Classes, Destructuring, Sexiness](/images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png)

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

- No more tedious code to 'extract' and 'check' fields passed to a function. Cut to example `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Store pwd hash, We only need to define 1 explicit `var/let` - the other vars are 'defined' with the `{fields}` wizardry above ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // append user upon service response
  }
}
```

`gist:justsml/aaddc9852c1624d61cf3`

<p>&#160;</p>

### Jumping on ES6 can feel like going from:

<div class="anigif top">
  <img alt='huh' title="Huh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>To</h3>
<div class="anigif">
  <img alt='wtf' title="WTF?!?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>To</h3>
<div class="anigif end">
  <img alt='#winning' title='#winning' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

Just keep sifting through the new stuff. Check out string templates, auto `this` binding, more-sane inheritance...

#### [Node.JS](http://nodejs.org/)

## Rust

#### [Official Site](http://www.rust-lang.org/)

- **Pros**

  - Imagine if there was a language as fast as C and as powerful as Python/C++, yet without the complexity/pitfalls that usually trap even the most skilled devs.
  - In fact I'd guess Rust is roughly as complex as the ES6 spec.
  - It includes a ton of extras:
    1.  Essentially Rust transpiles from semi-dynamic syntax into **pure C code**!
    1.  Including \***\*all the best practices\*\*** in C you would probably screw up on, I ~~eventually~~ always do.
    - Automatically you get:
    - Auto Memory management (no need for a slow garbage collector!)
    - Perfectly scoped Object ownership/locking (mutexting & context switching minimized)
    - Object lifetimes (automatically implemented\*, and auto coded like you knew every edge case)
    - Prevent virtually all run time errors (seriously, your code-paths become explicit: you just can't overlook a code-path)
  - Oh yeah, it throws in true language extensibility with a sensible 'macro' feature.
    - Need Comprehensions? [Scala style? Done](https://gist.github.com/hanny24/5749688), and [Like Python? Done](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
    1.  Too good to be true? Nah, It gets better:
    - Bleeding edge indicators (github.com stats) reveal Rust is highly competitive or even beating Go (Google's hot-newish language)
      - About 4K More Stars than Go (currently around 12,200)
      - More total Contributors ( 2x! - 1,071 vs. Go's 479 )
      - More forks ( 3X! - 2,343 vs. 765 )
      - Number of Open Issues, Loses by a hair ( 2,000 vs 1,730 from Go )
      - Pull Requests (Rust 70+ vs. Go's 1)
    - I had to triple check the numbers too.
  - Other libraries are very stable due to the constructs & rules of rust.
  - Threading model usable by mere mortals

- **Cons**
  - Decent **web frameworks** are relatively new, untested, and usually undocumented (though they are **getting** very impressive - as of March 2015).
  - Lots of early pre-1.0 breaking changes

## Python

- **Pros**
  - Overwhelmingly complete assortment of algorithms are already implemented in Python ( see: scilearnkit, numpy, matplotlib, pil/pillow, etc. )
  - Very Fun to write! Comprehensions and Decomposition are great features and make other languages seem just bloated!
  - Arrays, 'Sequences', Tuples etc. are relatively simple

```python
# dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
# Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
# Now we can call pixel
```

- **Cons**
  - Annoyingly, Python 2.x and 3.x are incompatible. The Great Schism continues, so many years later.
  - Some essential libraries are not nessacerily understood by some devs (numpy)

## Haskell

- **Pros**
  - Very rewarding when you finally memorize enough syntax to whip up comprehensions-based expressive patterns
  - You will learn mind-bending code patterns - often somewhat applicable to other languages.
- **Cons**
  - Syntax & Patterns can be hard to get used to.

<div class="anigif end">
  <img alt='endless loop' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

## SmallTalk-80

- **Pros**
  - Incredibly simple compilers (original especially)
  - Great resources: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Cons**
  - You will likely never use this language for anything. Zero projects. However it will have more of an impact on your coding style, faster than other functional languages... This should be in the pros list)

### _Work-in-progress (updated Dec. 2015)_

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
[happy_time]: https://res.cloudinary.com/ddd/image/upload/v1443133146/happy-time.gif
