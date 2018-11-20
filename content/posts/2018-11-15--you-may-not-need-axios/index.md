---
title: "You may not need Axios"
subTitle: Fetch API to the rescue!
date: 2018-11-14
modified: 2018-11-15
tags: [programming, patterns, source code, nodejs, javascript, promises]
category: programming
cover: william-bout-103533-unsplash.jpg
---

# You may not need Axios

> This **is not an attack** on [Axios](https://www.npmjs.com/package/axios). <br />
> Rather, it's **advocacy for the `fetch` API which has become quite capable.** 🦄

![credit: william-bout-103533-unsplash.jpg](william-bout-103533-unsplash.jpg)


## Overview

I'll be the first to say: I was an early hater of the `fetch` API. My first attempt turned into an entirely wasted weekend. I didn't know I was using broken examples. #fail <br />


When starting this article (late 2018) I assumed I'd end with a table of mixed check boxes. Surely there are special _Use Cases_ which justified [`axios`](https://www.npmjs.com/package/axios), [`request`][https://www.npmjs.com/package/request], [`r2`][https://www.npmjs.com/package/r2], [`superagent`][https://www.npmjs.com/package/superagent], [`got`][https://www.npmjs.com/package/got], or similar?

<!--
As I did my research on the many common _use cases_, I found a lot of misinformation. Google led me to many bad or harmful "answer" after "answer" - often on StackOverflow. _(Not linking back for fear it'll help their google standing. )_ One "answer" claimed you "can't upload files with \[any\] native browser" HTTP method," must "use jQuery." [_Lies!_](#uploading-files).

To be honest, I didn't know [download progress](#download-progress-helper) or cancellation was possible until I wrote this. I'm happily surprised `fetch` can do a lot without much boilerplate.
-->

<!--
In fact most 3rd party ajax libraries still all use `XMLHttpRequest`. You might wonder why I don't suggest we use it.

Using `XMLHttpRequest` leads to... well, let's say, artisinal & esoteric code. It doesn't look comparable to other APIs we use today. This makes it more difficult-to-memorize, and a lot harder to debug. For these reasons, NEVER use `XMLHttpRequest`.
 -->

<!--
Several years ago, the `WHAT-WG` (browser standards Working Group) saw the need for a modern replacement to `XMLHttpRequest`. Not long afterwards `fetch` was born.

I used it sparingly, because I didn't know how to use it. I would search  `fetch` examples for hours, ultimately it was easier to conclude "it can't be done with fetch." Often I resorted to using `jQuery.ajax` or `axios`.
-->

Until writing this article I had misconceptions of `fetch`'s limits. Specifically regarding [progress updates](@download-progress-helper) or cancelling requests.

<!--
The [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) enjoys robust support in the ecosystem (in all major browsers - well, _excluding_ Internet Explorer.)

It's not a NodeJS API, and It makes sense when when you consider `fetch` replaced the browser-only `XMLHttpRequest`.

It's easy to get however via the `node-fetch` package. The only NodeJS-native option is with the [`http`](https://nodejs.org/api/http.html#http_http) (and [`https`](https://nodejs.org/api/https.html)) modules.
-->

[_See **Compatibility** section below for browser & NodeJS support_](#compatibility)

## Feature Comparison

|                                                 	| fetch 	| axios 	| request 	|
|-------------------------------------------------	|-------	|-------	|---------	|
| Intercept request and response                  	| ✅     	| ✅     	| ✅       	|
| Transform request and response data             	| ✅     	| ✅     	| ✅       	|
| Cancel requests                                 	| ✅     	| ✅     	| ❌       	|
| Automatic transforms for JSON data              	| ✅*    	| ✅     	| ✅       	|
| Client side support for protecting against XSRF 	| 🦄*    	| ✅*    	| ✅       	|
| Progress                                        	| ✅     	| ✅     	| ✅       	|
| Streaming                                       	| ✅     	| ✅     	| ✅       	|

## Fetch Examples

Click the links below to go directly to the code snippet.

1. [GET: JSON from a URL](#get-json-from-a-url)
1. [Custom headers](#custom-headers)
1. [CORS example](#cors-example)
1. [Posting JSON](#posting-json)
1. [Posting an HTML `<form>`](#posting-an-html-form)
1. [Form encoded data](#form-encoded-data)
1. [Uploading Files](#uploading-files)
1. [Uploading Multiple Files](#uploading-multiple-files)
1. [Show Download Progress Percent](#download-progress-helper)
1. TODO: _Custom HTTP status error behavior_
1. TODO: _Recursive: Retry on Failure_
1. TODO: _Recursive: Automated results paging_

> Is your Use Case not listed? [Let me know ✉️](/contact/)

### Get JSON from a URL

`gist:justsml/de941bd61cc86e30beedbb8a3a646f81`

### Custom headers

`gist:justsml/fca7cd72ec1ebc07d994eac13a665ddf`

### CORS example

CORS is primarily checked at the server - so make sure your configuration is correct on the server-side.

The `credentials` option controls if your cookies are automatically included.

`gist:justsml/3ddd9ed8705f48cdf45d313d1e57aa2a`

### Posting JSON

`gist:justsml/13915347d6c8413c73f4bd7240c68e51`

### Posting an HTML `<form>`

`gist:justsml/ef2e356bec0ef7c6e528d84a5f75ba7e`

### Form encoded data

To post data with a Content-Type of `application/x-www-form-urlencoded` we will use `URLSearchParams` to encode the data like a query string.

For example, `new URLSearchParams({a: 1, b: 2})` yields `a=1&b=2`.

`gist:justsml/716c4534ef4afb22f65d4fc4367c7136`

### Uploading files

`gist:justsml/301f22aa37df565ba3051bd5f95b4df1`


### Uploading multiple files

Setup a file upload element with the `multiple` attribute:

`gist:justsml/37836357041d8ca4d1b32e12638cb0ba`

Then use with something like:

`gist:justsml/d17f50c36a5ddb70f584c0aa6de94237`

### Download Progress Helper

The Progress Handler [technique shown below avoids wrapping](#source-progress-helper) the `fetch` call in a closure. 👍

`progressHelper` has the following interface (source available below)

`gist:justsml/db5ccc55ffb93c75e04e014d1f553cfb`

Let's look at a usage example:

`gist:justsml/9bec219590ff50688972c1caff67c14b`

A reusable image downloader might look like `getBlob()`:

`gist:justsml/bef2dd7e630eb7642beb3e2be29489b2`

By the way, a `Blob` is a Binary Large Object.

It's important to choose ONE of the 2 usage patterns below (they are functionally equivalant):

`gist:justsml/6ad9e37a96ad1f3a75ca509038510a5b`

My preference is `Option #1`. However, your scope design may force you to use `Option #2`.

Finally, here's the last part of this recipe, our `progressHelper`:

#### Source: Progress Helper

`gist:justsml/a8ffd810fc7e5a5295dfc898302ddbfc`

_credit:_ Special thanks to Anthum Chris and his [fantastic Progress+Fetch PoC shown here](https://github.com/AnthumChris/fetch-progress-indicators)

## Compatibility

"What about NodeJS and the poor IE people?!?"

Fear not, the fractional % of IE9-10 users [can be polyfilled](https://github.com/github/fetch#browser-support) with the `github/fetch` package (maintained by some awesome GitHub devs). It's possible to go as far back as [IE8](https://github.com/camsong/fetch-ie8) - _Your milage may vary_.

NodeJS can take advantage of the the `fetch` API with the [`node-fetch`](https://www.npmjs.com/package/node-fetch) package:

```sh
npm install node-fetch
```

_After polyfill+node-fetch: 99.99% compatible_ ✅


## More coming soon.

> Please Tweet at me if you have a Use Cases you'd like to see. ❤️

![End of Dan's fetch API Examples](jonas-vincent-2717-unsplash.jpg "End of Dan's fetch API Examples")

