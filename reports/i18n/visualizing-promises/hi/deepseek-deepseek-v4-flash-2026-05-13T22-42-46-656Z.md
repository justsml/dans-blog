# Translation Candidate
- Slug: visualizing-promises
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx
- Validation: deferred
- Runtime seconds: 30.68
- Input tokens: 3293
- Output tokens: 4358
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001629
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: प्रॉमिसेज़ का दृश्यांकन
subTitle: आगे बढ़ो...
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
Promises के निष्पादन को देखने के लिए, आइए एक नई विधि `delay(millisecs)` परिभाषित करें।

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

यह एक उपयोगिता विधि है जो टाइमआउट समाप्त होने पर resolve होगी।

मिलीसेकंड में यह देरी `.then` के कॉलबैक को पास की जाएगी।

आइए 4 उदाहरण देखें (एनिमेटेड टाइमलाइन के साथ)।

## उदाहरण #1/4

यह दिखाता है कि कैसे `console.log()` का निष्पादन `delay(msec)` द्वारा विलंबित होगा।

```js
delay(1000).then(() => console.log("done"));
```

![टाइमलाइन जो दिखाती है delay 1000 के बाद console.log एक सेकंड बाद चल रहा है](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## उदाहरण #2/4

_यह एक सामान्य गलती दिखाता है।_

`console.log` तब फायर होता है जब `delay(1000)` **शुरू** होता है। **बाद** में नहीं, जैसा आप शायद चाहते थे।

क्योंकि `console.log` `undefined` लौटाता है, हमारा `.then()` चुपचाप अनदेखा कर दिया जाता है।

`typeof console.log === 'function'` बनाम `typeof console.log() === undefined` के बीच अंतर पर ध्यान दें।

सामान्यतः `console.log` का वांछित उपयोग उदाहरण #1 में दिखाया गया है। सुनिश्चित करें कि आप `.then` और `.catch` में फंक्शन पास कर रहे हैं।

```js
delay(1000).then(console.log("done"));
```

![टाइमलाइन जो दिखाती है कि console.log डिले खत्म होने से पहले तुरंत चल रहा है](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## उदाहरण #3/4

3 प्रॉमिसेज़ एक साथ निष्पादित होती हैं।

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![टाइमलाइन जो तीन delay प्रॉमिसेज़ को एक, दो और तीन सेकंड के बाद रिज़ॉल्व होते दिखाती है](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## उदाहरण #4/4

`Promise.all` तीन `delay` प्रॉमिसेज़ के साथ। वे एक साथ निष्पादित होंगे।

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![टाइमलाइन दिखा रही है कि Promise.all तीनों delay प्रॉमिसेज़ की प्रतीक्षा कर रहा है](../N_3000ms_PromiseAll.webp)

<!--

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

-->

> श्रेय:
>
> - एनिमेटेड एसिंक्रोनस आरेख [Patrick Biffle](https://github.com/Piglacquer) द्वारा
> - इस लेख की प्रेरणा: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Question #1: Meaning of life:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">What is the meaning of life?</div>

</div> -->
````
