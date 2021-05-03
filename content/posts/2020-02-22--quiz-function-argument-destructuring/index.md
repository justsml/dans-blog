---
title: "JS Quiz: Destructuring Parameters"
subTitle: Master one of JavaScripts most powerful features!
date: 2020-02-22
modified: 2021-01-07
tags: [javascript, quiz, challenge, destructuring, es6, es2015]
category: Quiz
cover: blake-weyland-9hhOVsf1lpU-portrait.jpg
---

# Have you mastered ES2015 Destructuring?

In this quiz we'll cover **Destructured Object Parameters,** or DOP (pronounced dope, because I insist).

DOP can be used to create self-documenting functions (many IDE's, including VS Code, will automatically show tooltips with info based on the variable usage).

**TypeScript Users:** DOP syntax doesn't simplify code when used with TypeScript's inline types. Pair with declared types instead (for example, `type x = ...` or `interface Iface ...`).

Topic areas we'll touch on: default values, nested structures, re-assigning/aliasing names, rest operator.

### If you get stuck

1. **Read the Hints** (Find the button with the '?' after the list of options).
2. Try the code in your browser's Console (try shortcut `F12` on Windows, or `Command + Option + J` on Mac).
3. Please feel free to [Tweet me @justsml](https://twitter.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20Destructuring%20quiz%2E%2E%2E&url=https://danlevy.net/). **I'd love to hear your thoughts!**
4. Post comment at the end of the post.

> If you are new to destructuring, I'd recommend first reading Wes Bos' <a href="https://wesbos.com/destructuring-objects/" target="_blank">excellent introduction</a> and his <a href="https://wesbos.com/destructuring-renaming/" target="_blank">post on renaming.</a>

> If you are more experienced, check out the <a href="https://exploringjs.com/es6/ch_destructuring.html" target="_blank">detailed reference on ExploringJS.</a>

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

<section class="challenge" title="Essentials #1">
  <div class="description">

```js
function createPerson({ title, name, location }) {
  return `Hi, I'm ${title} ${name} from ${location}`;
}
console.log(createPerson("Capt.", "Marvel", "Earth?"));
```

## What will print in the console?

  </div>
  <ul class="options">
    <li class='answer'>`Hi, I'm undefined undefined from undefined`</li>
    <li>`Hi, I'm Capt. Marvel from Earth?`</li>
    <li>`undefined`</li>
    <li>Error</li>
  </ul>

  <aside class="hint" hint-id="1">What type is the first argument?</aside>
  <aside class="hint" hint-id="2">This issue won't produce an error (i.e. line numbers), so it's often missed.</aside>
  <div class="explanation">

The issue here is we need to pass in an object, not 3 string(s).

The correct way usage looks like `createPerson({title: 'Capt.'})`.

The reason this does not cause an error is because the runtime can check for the existance of the `.theme` and `.title` properties on a string. They will however always be `undefined`.

  </div>

</section>

<section class="challenge" title="Essentials #2">
  <div class="description">

```js
function createPerson({ title, name, location }) {
  return `Hi, I'm ${title} ${name} from ${location}`;
}
console.log(createPerson({ title: "Capt.", name: "Marvel" }));
```

## What will print in the console?

  </div>
  <ul class="options">
    <li class='answer'>`Hi, I'm Capt. Marvel from undefined`</li>
    <li>`Hi, I'm Capt. Marvel from Earth?`</li>
    <li>`Hi, I'm undefined undefined from undefined`</li>
    <li>`undefined`</li>
    <li>Error</li>
  </ul>

  <aside class="hint">Unset fields behave like unset variables.</aside>
  <section class="explanation">

  </section>

</section>

<section class="challenge" title="Defaults #1">
  <div class="description">

```js
const updateStatus = ({ status = "n/a" }) => {
  console.log(status);
};
updateStatus();
```

## What will print in the console?

  </div>
  <ul class="options">
    <li>`n/a`</li>
    <li>`null`</li>
    <li>`undefined`</li>
    <li class='answer'>Error</li>
  </ul>

  <aside class="hint">The function `updateStatus` is expecting an object. It will attempt to get the `.status` property from the input argument.</aside>

  <aside class="hint">This mistake is easy to miss. I remember making it plenty of times when I started learning destructuring & defaults.</aside>

  <aside class="hint">Calling `updateStatus()` is similar to `updateStatus(undefined)`</aside>

  <section class="explanation">

  </section>

</section>

<section class="challenge" title="Defaults #2">
  <div class="description">

```js
const updateStatus = ({ status = "n/a" } = { status: "shizzle" }) => {
  console.log(status);
};
updateStatus();
```

## What will print in the console?

  </div>
  <ul class="options">
    <li>🤔</li>
    <li>`n/a`</li>
    <li class='answer'>`shizzle`</li>
    <li>`null`</li>
    <li>`undefined`</li>
    <li>Error</li>
  </ul>

  <aside class="hint">You won't get an error.</aside>
  <section class="explanation">

The default value `{ status: 'shizzle' }` is used when the argument is `undefined`.

Without this default object, this code would throw an error.

  </section>

</section>

<section class="challenge" title="Defaults #3">
  <div class="description">

```js
const updateStatus = ({ status = "n/a" }) => {
  console.log(status);
};
updateStatus({ status: `🥳` });
updateStatus({ status: null });
```

## What will print in the console?

  </div>
  <ul class="options">
    <li class='answer'>🥳, `null`</li>
    <li>🥳</li>
    <li>Error</li>
  </ul>

</section>

<section class="challenge" title="Use Cases: DOM Events">
  <div class="description">

For this question I'm assuming some DOM API knowledge - specifically familiarity with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event#Properties" target="_blank" rel="noopener noreferrer">Event callback argument.</a>

Given the following HTML `<input id='email' type='text' />`.

And JavaScript wire-up like this: `email.addEventListener('focus', () => inputHandler())`.

```js
function inputHandler({ target: { id, value } }) {
  console.log(`${id}: ${value}`);
}
```

## What will print as a result of triggering the event?

  </div>
  <ul class="options">
    <li>`email: `</li>
    <li>`name: `</li>
    <li>`name: undefined`</li>
    <li class='answer'>Error</li>
  </ul>

  <aside class="hint">A common gotcha around `addEventListener` callback. Verify the wire-up code.</aside>
  <aside class="hint">What happens when you invoke `inputHandler()` without an argument?</aside>

  <section class="explanation">

We get an error because we're trying to access properties on an undefined variable (`target`)!

It's similar to the issue in this pre-ES5 code:

```js
// ❌💩❌💩❌💩
function inputHandler(event) {
  var target = event.target;
  // Following lines break if `target` is undefined
  var id = target.id;
  var value = target.value;

  console.log(`${id}: ${value}`);
}
```

### So, what's the fix?

#### Option 1

Remember to pass through expected objects.

Using either:

1. `email.addEventListener('focus', inputHandler)`
1. `email.addEventListener('focus', (event) => inputHandler(event))`

#### Option 2

This is more of a strategy for avoiding the JS runtime's generic error messages.

**Why?**

Ideally your API has a very narrow and tightly-scoped 'surface area.'

When given various bad input, it should _predictably_ either return a placeholder value, or throw an error.

_How does this relate to destructuring?_

Destructuring is not very tolerant of nulls by default. In fact it can feel quite brittle.

Here we'll look at a technique to address this potential pitfall: let me introduce you to _DAN_ (Defense Against Nulls). _DAN_ is all about well-placed default values in our object arguments.

Let's look at an more complex example: a geo-spatial/mapping library requires a specific-shaped object as input to display pushpin(s). We need an `input` like `{coords: [{lat, lon}, {lat, lon}, ...]}` which is used by `displayPushpin(input)`.

`displayPushpin` needs to get the first coordinates from the `coords` array, while handling these 3 scenarios:

1. Permit empty/missed input object argument,
1. `coords` being `undefined`,
1. and `coords` being otherwise invalid `[]`.

\* invalid coords should be interpreted as being `[{lat: null, lon: null}]`.

##### Before: DAN (Defense Against Nulls)

```js
// Presumptive destructuring, may throw null errors:
const displayPushpin = ({ coords: [{ lat: lat1, lon: lon1 }] }) => console.log({ lat1, lon1 });

displayPushpin(); // ❌ Error!
displayPushpin({ coords: undefined }); // ❌ Error!
displayPushpin({ coords: [] }); // ❌ Error!
displayPushpin({ coords: [{ lat: 99, lon: 199 }] }); // {lat1: 99, lon1: 199}
```

##### After: DAN (Defense Against Nulls)

To fix each 'error' in the code above, we'd need to adjust `displayPushpin`'s arguments:

1. `({coords: [{lat: lat1, lon: lon1}]} = {}) => ...`
   - added `= {}`
1. `({coords: [{lat: lat1, lon: lon1}] = [{lat: null, lon: null}]}) => ...`
   - added `= [{lat: null, lon: null}]`
1. `({coords: [{lat: lat1, lon: lon1} = {lat: null, lon: null}]}) => ...`
   - added `= {lat: null, lon: null}`

It takes a bit of practice to identify the needed defaults and add them at _exactly_ the right bracket/position.

As you add default values for nested object/array data structures you might notice things start to get messy. For example, let's combine the 3 _DAN_ patterns listed above and:

```js
// ✅ 3 Combined DAN Techniques 😰. It works...
const displayPushpin = ({
  coords: [{ lat: lat1, lon: lon1 } = { lat: null, lon: null }] = [{ lat: null, lon: null }]
} = {}) => console.log({ lat1, lon1 });

displayPushpin(); // {lat1: null, lon1: null}
displayPushpin({ coords: undefined }); // {lat1: null, lon1: null}
displayPushpin({ coords: [] }); // {lat1: null, lon1: null}
displayPushpin({ coords: [{ lat: 99, lon: 199 }] }); // {lat1: 99, lon1: 199}
```

> _Note:_ This approach isn't always the "right tool," and it can get a bit convoluted if you have 2-3+ levels of nested data structures.

Our `displayPushpin()` is a bit complex as it's expected input requires an `object->array->object`. In general I try avoid mixing destructuring objects and arrays together like this.

The most important take-away you'll want to remember: 95% of the time I only need to add `= {}` somewhere. Like in the following example.

```js
// My code looks more like this after refactoring w/ DAN
function inputHandler({ target: { id, value } = {} } = {}) {
  // ☝️ Note the 2 defaults added above: ' = {}'
  console.log(`${id}: ${value}`);
}
```

> It's much more manageable when setting empty-object fallbacks without any complex structure. Note the `= {}` bit added to each object 'level'.

  </section>

</section>

<section class="challenge" title="Use Cases: Re-shaping Data">
  <div class="description">

Choose the destructuring syntax which will make `cityName` available as `city_name` inside `createListing()`.

Assume our app uses camel-case naming conventions.

```js
const createListing = (/* choose an option below */) => {
  // [Sends listing to database, where snake-case is required]
};
createListing({ title: "E-Corp", cityName: "NYC" });
```

## What change to `createListing()` will fix this code?

  </div>
  <ul class="options">
    <li>`const createListing = ({title: title, city_name: cityName}) => {}`</li>
    <li class='answer'>`const createListing = ({title: title, cityName: city_name}) => {}`</li>
    <li>`const createListing = ({title = title, cityName = city_name}) => {}`</li>
    <li>`const createListing = ({title = title, city_name = (cityName || city_name) }) => {}`</li>
  </ul>

  <aside class="hint">If you are a Node/JS developer whos used Postgresql you've probably run into a related situation.</aside>
  <aside class="hint">Variable assignment in destructuring is indicated by a `:`</aside>
  <aside class="hint">One way to think of it is with `${input-name}: ${to-name}`</aside>

  <section class="explanation">

> When re-assigning names in destructuring I sometimes feel like its a secret Dyslexia test for JS devs...

One way to think of this pattern is `${input-name}: ${to-name}`, where `to-name` is the local name available inside the function.
And `input-name` is the property name from the input object argument.

  </section>

</section>
