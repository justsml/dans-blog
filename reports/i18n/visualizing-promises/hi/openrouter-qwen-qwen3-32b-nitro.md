# Translation Candidate
- Slug: visualizing-promises
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 13.41
- Input tokens: 4832
- Output tokens: 5772
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.001772
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: प्रमिसेज का दृश्यकरण
subTitle: तोड़ दें...
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
प्रमिस के निष्पादन को देखने के लिए, चलिए एक नया विधि `delay(millisecs)` परिभाषित करते हैं।

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

यह एक उपयोगिता विधि है जो टाइमआउट पूरा होने के बाद हल होगी।

मिलीसेकंड में देरी `.then` के कॉलबैक में पास होगी।

चलिए 4 उदाहरणों पर एक नज़र डालते हैं (एनिमेटेड टाइमलाइन के साथ)।

## उदाहरण #1/4

यह दिखाता है कि `console.log()` के निष्पादन को `delay(msec)` द्वारा कैसे देरी होगी।

```js
delay(1000).then(() => console.log("done"));
```

![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## उदाहरण #2/4

_यह एक सामान्य गलती दिखाता है।_

`console.log` तब ही शुरू होता है जब `delay(1000)` **शुरू होता है**। देरी के **बाद** नहीं, जैसा कि आपको शायद अपेक्षित हो।

क्योंकि `console.log` `undefined` लौटाता है, हमारा `.तब()` चुपचाप नज़रअंदाज़ कर दिया जाता है।

ध्यान दें कि `typeof console.log === 'function'` और `typeof console.log() === undefined` के बीच अंतर।

आमतौर पर `console.log` का वांछित उपयोग उदाहरण #1 में दिखाया गया है। यह सुनिश्चित करें कि आप `.then` और `.catch` में फ़ंक्शन पास कर रहे हैं।

```js
delay(1000).then(console.log("done"));
```

![Timeline showing console log running immediately before the delay finishes](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## उदाहरण #3/4

3 प्रमिसें एक साथ निष्पादित होती हैं।

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Timeline showing three delay promises resolving after one two and three seconds](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## उदाहरण #4/4

3 `delay` प्रमिसें के साथ `Promise.all`। वे एक साथ निष्पादित होंगी।

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Timeline showing Promise all waiting for all three delay promises](../N_3000ms_PromiseAll.webp)

<!-- ```js
Promise.all([delay(1000), delay(2000), delay(3000)]) --.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

```
delay(1000) ---| [सुलझाया]------------------v
delay(2000) ---|--------------| [सुलझाया]---v
delay(3000) ---|--------------|--------------v [सुलझाया]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1सेकंड         2सेकंड         3सेकंड
```

> स्रोत:
> 
> - एनिमेटेड एसिंक आरेखों के लिए [पैट्रिक बिफल](https://github.com/Piglacquer) 
> - इस लेख के लिए प्रेरणा: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="प्रश्न #1: जीवन का अर्थ:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">जीवन का अर्थ क्या है?</div>

</div> -->
````
