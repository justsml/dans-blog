---
title: "JS Quiz: Function Argument Destructuring"
subTitle: Have you mastered this powerful features?
date: 2020-02-22
modified: 2020-02-22
tags: [javascript,quiz,challenge,]
category: Quiz
# cover: pocket-watch.jpg
---

# Have you mastered ES2015 Destructuring?

In this quiz we'll cover Object Arguments and how destructuring can be used to create self-documenting functions (VS Code's tool tips infer types based on the arguments).

Topic areas we'll touch on: default values, nested structures, re-assigning/aliasing names, rest operator.


### If you get stuck

1. **Read the Hints** (Green button, lower right corner). Some include a few animated answers w/ detailed annotations, while others offer only a few clues. I can't give away all the answers so easy!  <br>Seriously though, this is intentional, the answers are there. Skip ahead or try the code snippets out, then change it, and play some more.
2. Try the code in your browser's Console (try shortcut `F12` on Windows, or `Command + Option + J` on Mac).
3. Please feel free to [Tweet me @justsml](https://twitter.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20Destructuring%20quiz%2E%2E%2E&url=https://danlevy.net/). **I'd love to hear your thoughts!**
4. Post comment at the end of the post.

<div style="text-align: center; width: 75%; margin: 0 auto 10rem auto; white-space: nowrap; font-size: 1.4em;" class="quiz-loading">

  <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
  <h4 style="text-align: left">Loading...<br />A few more seconds...</h4>

</div>

<div style="text-align: center; display: none;" class="quiz-ready">

## 👇 Complete The Questions Below 👇

</div>


<section class="challenge" group="Object Arguments">
  <div class="description">

# Object Arguments - Fundamentals

```js
function saveSettings({title, theme = 'darkMode'}) {
  console.log(theme)
}
saveSettings('lightMode')
```

## What will the output include?

  </div>
  <ul class="options">
    <li class='answer'>Error</li>
    <li>`darkMode`</li>
    <li>`lightMode`</li>
    <li>C'mon, there's only `darkMode`</li>
  </ul>
  <div class="explanation">

Test: placeholder content!

  </div>
</section>


<section class="challenge" title="Object Arguments - Gotchas">
  <div class="description">

# What will print in the console?

```js
function createPerson({title, name, location}) {
  return `Hi, I'm ${title} ${name} from ${location}`
}
console.log(createPerson('Capt.', 'Marvel', 'Earth?'))
```

  </div>
  <ul class="options">
    <li class='answer'>`Hi, I'm undefined undefined from undefined`</li>
    <li>Error</li>
    <li>`Hi, I'm Capt. Marvel from Earth?`</li>
    <li>**Hint/Explanation**</li>
  </ul>

  <aside class="hint" hint-id="1">It's important you can spot this issue. It won't produce an error (aka line numbers). This silent-fail is often missed. Especially if you are prone to forget TDD/tests. But you probably always TDD, right?</aside>
  <aside class="hint" hint-id="2">**Hint:** What type is the first argument?</aside>

</section>

<section class="challenge" group="Object Arguments - Gotchas">
  <div class="description">

# What will print in the console?

```js
function createPerson({title, name, location}) {
  return `Hi, I'm ${title} ${name} from ${location}`
}
console.log(createPerson({title: 'Capt.', name: 'Marvel'}))
```

  </div>
  <ul class="options">
    <li class='answer'>`Hi, I'm Capt. Marvel from undefined`</li>
    <li>Error</li>
    <li>`Hi, I'm Capt. Marvel from Earth?`</li>
    <li>`Hi, I'm undefined undefined from undefined`</li>
  </ul>

</section>

<section class="challenge" group="Defaults">
  <div class="description">

# What will print in the console?

```js
const updateStatus = ({status = 'n/a'}) => {
  console.log(status)
}
updateStatus()
```

  </div>
  <ul class="options">
    <li class='answer'>Error</li>
    <li>`n/a`</li>
    <li>`null`</li>
    <li>`undefined`</li>
  </ul>

  <aside class="hint">The function `updateStatus` is expecting an object. It will attempt to get the `.status` property from the input argument.</aside>

  <aside class="hint">This mistake is easy to miss. I remember making it plenty of times when I started learning destructuring & defaults.</aside>

  <aside class="hint">Additional Hint: Calling `updateStatus()` is similar to `updateStatus(undefined)`</aside>

</section>

<section class="challenge" group="Defaults #2">
  <div class="description">

# What will print in the console?

```js
const updateStatus = ({status = 'n/a'}) => {
  console.log(status)
}
let myStatus = '🤔'
updateStatus(myStatus)
```

  </div>
  <ul class="options">
    <li class='answer'>`n/a`</li>
    <li>Error</li>
    <li>🤔</li>
    <li>`null`</li>
    <li>`undefined`</li>
    <li>**Hint/Explanation**</li>
  </ul>

  <aside class="hint">You won't get an error, even though `myStatus` is a string, not the object `updateStatus`'s signature suggests.</aside>

</section>

<section class="challenge" group="Defaults #3">
  <div class="description">

# What will print in the console?

```js
const updateStatus = ({status = 'n/a'}) => {
  console.log(status)
}
updateStatus({status: `🥳`})
updateStatus({status: null})
```

  </div>
  <ul class="options">
    <li class='answer'>🥳, `null`</li>
    <li>🥳</li>
  </ul>

</section>

<section class="challenge" group="Common Handlers">
  <div class="description">

# What will print in the console?

```js
// Assume usage: <input onchange='inputHandler' name='email' type='text' />
function inputHandler({target: {name, value}}) {
  console.log(`Name: ${name}`)
}
```

  </div>
  <ul class="options">
    <li class='answer'>Error</li>
  </ul>

</section>

<section class="challenge" group="Aliasing">
  <div class="description">

```js
function createListing({listing_title, city_name}) {
  console.log(`Saving ${listing_title}`)
  // Sends listing to database, where snake-case is required
}
createListing({listingTitle: 'Red Wagon', cityName: 'NYC'})
```

## What will fix this code?

  </div>
  <ul class="options">
    <li class='answer'>`createListing({listingTitle: listing_title, cityName: city_name})`</li>
    <li>`createListing({listing_title: listingTitle, city_name: cityName})`</li>
    <li>`createListing({listing_title = listingTitle, city_name = cityName})`</li>
    <li>`createListing({listingTitle = listing_title, cityName = city_name})`</li>
  </ul>

</section>

