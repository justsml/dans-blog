---
title: "You may not need Axios"
subTitle: Fetch API to the rescue!
date: 2018-11-14
modified: 2018-11-24
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
The good news is that a [large proportion of the documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and corresponding examples have been improved, and I’ve included several [code snippets](#fetch-examples) with [common uses cases below](#feature-comparison).

I've collected up-to-date code examples for the patterns which "unlocked" [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for me.

Check out the head-to-head [Feature Comparison](#feature-comparison); then browse my curated [Fetch Examples](#fetch-examples) I've accumulated over the past year.



# Feature Comparison

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Intercept request and response                  |✅        |✅         |✅       |
| Transform request and response data             |✅        |✅         |✅       |
| Cancel requests                                 |✅        |✅         |❌       |
| Automatic transforms for JSON data              |✅        |✅         |✅       |
| Client side support for protecting against XSRF |✅        |✅         |✅       |
| Progress                                        |✅        |✅         |✅       |
| Streaming                                       |✅        |✅         |✅       |

<br /><br />

When starting this article (late 2018) I assumed I'd end with a table of mixed check boxes. Surely there are special _Use Cases_ which justified [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got), etc. Well, as it turns out, **I overestimated the need for 3rd party http libraries.**

Despite using `fetch` for 2 years (including for non-trivial tasks: file uploads & error/retry support) I still had misconceptions of `fetch`'s abilities and limits. (Specifically regarding [progress updates](#download-progress-helper) or canceling requests.)

<br />

-------------------------------------

# Fetch Examples

Click the links below to go directly to the code snippet.

1. [GET: JSON from a URL](#get-json-from-a-url)
1. [Custom headers](#custom-headers)
1. [Error handling w/ HTTP status codes](#http-error-handling)
1. [CORS example](#cors-example)
1. [Posting JSON](#posting-json)
1. [Posting an HTML `<form>`](#posting-an-html-form)
1. [Form encoded data](#form-encoded-data)
1. [Uploading a File](#uploading-a-file)
1. [Uploading Multiple Files](#uploading-multiple-files)
1. [Show Download Progress Percent](#download-progress-helper)
1. TODO: _Recursive: Retry on Failure_
1. TODO: _Recursive: Automated results paging_

> Is your Use Case not listed? [Let me know ✉️](/contact/)

<br />

### Get JSON from a URL

`gist:justsml/de941bd61cc86e30beedbb8a3a646f81`

### Custom headers

`gist:justsml/fca7cd72ec1ebc07d994eac13a665ddf`

### HTTP Error Handling

`https://gist.github.com/justsml/81919a72897ebc503c6b34a556a9bde2`

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

### Uploading a file

`gist:justsml/301f22aa37df565ba3051bd5f95b4df1`


### Uploading multiple files

Setup a file upload element with the `multiple` attribute:

`gist:justsml/37836357041d8ca4d1b32e12638cb0ba`

Then use with something like:

`gist:justsml/d17f50c36a5ddb70f584c0aa6de94237`

### Download Progress Helper

> This is included for completeness. You may still want to use a 3rd party library here. Browser streaming interfaces may lack browser compatibility (as of late 2018).
Upload Progress is currently a bit buggy outside of Chrome.

The Progress Handler [technique shown below avoids wrapping](#source-progress-helper) the `fetch` call in a closure. 👍

`progressHelper` has the following interface (source available below)

`gist:justsml/db5ccc55ffb93c75e04e014d1f553cfb`

Let's look at a usage example:

`gist:justsml/9bec219590ff50688972c1caff67c14b`

A reusable image downloader might look like `getBlob()`:

`gist:justsml/bef2dd7e630eb7642beb3e2be29489b2`

By the way, a `Blob` is a Binary Large Object.

It's important to choose ONE of the 2 usage patterns below (they are functionally equivalent):

`gist:justsml/6ad9e37a96ad1f3a75ca509038510a5b`

My preference is `Option #1`. However, your scope design may force you to use `Option #2`.

Finally, here's the last part of this recipe, our `progressHelper`:

#### Source: Progress Helper

`gist:justsml/a8ffd810fc7e5a5295dfc898302ddbfc`

_credit:_ Special thanks to Anthum Chris and his [fantastic Progress+Fetch PoC shown here](https://github.com/AnthumChris/fetch-progress-indicators)

## Compatibility

"What about NodeJS and the poor IE people?!?"

Fear not, the fractional % of IE9-10 users [can be polyfilled](https://github.com/github/fetch#browser-support) with the `github/fetch` package (maintained by some awesome team at GitHub). It's possible to go as far back as [IE8](https://github.com/camsong/fetch-ie8) - _Your mileage may vary_.

NodeJS can take advantage of the the `fetch` API with the [`node-fetch`](https://www.npmjs.com/package/node-fetch) package:

```sh
npm install node-fetch
```

_After polyfill+node-fetch: 99.99% compatible_ ✅


## More coming soon.

> Please [Tweet at me](https://twitter.com/justsml) if you have other _Use Cases_ you'd like to see. ❤️

![End of Dan's fetch API Examples](jonas-vincent-2717-unsplash.jpg "End of Dan's fetch API Examples")

