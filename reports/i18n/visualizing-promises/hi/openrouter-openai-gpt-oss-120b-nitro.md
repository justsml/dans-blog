# Translation Candidate
- Slug: visualizing-promises
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.70
- Input tokens: 4804
- Output tokens: 1430
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000445
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: प्रॉमिस का दृश्यांकन
subTitle: बाधाओं को तोड़ो...
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
Promises के निष्पादन को दृश्य रूप में समझाने के लिए, एक नया मेथड `delay(millisecs)` परिभाषित करते हैं।

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

यह एक यूटिलिटी मेथड है जो टाइम‑आउट समाप्त होने पर रिजॉल्व हो जाता है।

`delay` को पास किया गया मिलिसेकंड मान `.then` के कॉलबैक को दिया जाएगा।

अब चार उदाहरण देखते हैं (एनिमेटेड टाइमलाइन के साथ)।

## Example #1/4

यह दर्शाता है कि `console.log()` का निष्पादन `delay(msec)` द्वारा कैसे विलंबित होगा।

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

## Example #2/4

_यह एक सामान्य गलती को दर्शाता है।_

`console.log` तुरंत ही `delay(1000)` **शुरू** होते ही चल जाता है। वह **विलंब** के बाद नहीं चलता जैसा कि आप चाहते थे।

क्योंकि `console.log` `undefined` लौटाता है, हमारा `.then()` चुपचाप अनदेखा हो जाता है।

`typeof console.log === 'function'` और `typeof console.log() === undefined` में अंतर को नोट करें।

आम तौर पर `console.log` के लिए वांछित उपयोग Example #1 में दिखाया गया है। सुनिश्चित करें कि आप फ़ंक्शन को `.then` और `.catch` में पास कर रहे हैं।

```js
delay(1000).then(console.log("done"));
```

![टाइमलाइन दिखा रहा है कि कंसोल लॉग देरी समाप्त होने से पहले ही तुरंत चल रहा है](N_1000ms_!log.webp)

## Example #3/4

3 प्रॉमिस एक साथ निष्पादित होते हैं।

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![तीन देरी प्रॉमिसों के एक‑सेकंड, दो‑सेकंड और तीन‑सेकंड पर हल होने को दर्शाता टाइमलाइन](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Example #4/4

`Promise.all` के साथ 3 `delay` प्रॉमिस। ये सभी एक साथ चलेंगे।

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![तीन देरी प्रॉमिसों के सभी के पूरा होने की प्रतीक्षा करता हुआ Promise.all टाइमलाइन](../N_3000ms_PromiseAll.webp)

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

> श्रेय:
>
> - एनिमेटेड async आरेख द्वारा [Patrick Biffle](https://github.com/Piglacquer)
> - इस लेख की प्रेरणा: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
````
