---
title: "You may not need Axios"
subTitle: Fetch API to the rescue!
date: 2018-11-14
modified: 2022-12-20
tags: [programming, patterns, examples, nodejs, javascript, promises, axios, fetch]
category: fetch
cover: brock-dupont-575648-unsplash.jpg
---

# You may not need Axios

> This **is not an attack** on [Axios](https://www.npmjs.com/package/axios). <br />
> Rather, it's **advocacy for the `fetch` API which has become quite capable.** 🦄

![credit: william-bout-103533-unsplash.jpg](william-bout-103533-unsplash.jpg)


## Overview

This article is a collection of the "missing" `fetch` [code snippets and common use cases](#fetch-examples) I wish were easier to find.

## Fetch Snippets

My top 10 list of `fetch` examples, plus a bonus or 2.

- [Get JSON from a URL](#get-json-from-a-url)
- [Custom headers](#custom-headers)
- [HTTP Error Handling](#http-error-handling)
- [CORS example](#cors-example)
- [Posting JSON](#posting-json)
- [Posting an HTML `<form>`](#posting-an-html-form)
- [Form encoded data](#form-encoded-data)
- [Uploading a file](#uploading-a-file)
- [Uploading multiple files](#uploading-multiple-files)
- [Timeouts](#timeouts)
- [Download Progress Helper](#download-progress-helper)
- [Recursive Retry Helper](#recursive-retry-helper)
- [Handling HTTP Redirects](#handling-http-redirects)

> Is your Use Case not listed? [Let me know ✉️](/contact/)

<br />

## Feature Comparison

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Intercept request and response                  |✅        |✅         |✅       |
| Transform request and response data             |✅        |✅         |✅       |
| Cancel requests                                 |✅        |✅         |❌       |
| Automatic transforms for JSON data              |✅        |✅         |✅       |
| Client side support for protecting against XSRF |✅        |✅         |✅       |
| Progress                                        |✅        |✅         |✅       |
| Streaming                                       |✅        |✅         |✅       |
| Redirects                                       |✅        |✅         |✅       |

<br /><br />

When starting this article (late 2018, updated 2022) I assumed I'd end with a table of mixed check boxes. Surely there are special _Use Cases_ which justified [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got), etc.

Well, as it turns out, **I overestimated the need for 3rd party http libraries.**

Despite using `fetch` for several years (including for non-trivial tasks: file uploads & error/retry support) I still had misconceptions of `fetch`'s abilities and limits.)

Well, let's check out what `fetch` can do...

### Get JSON from a URL

`gist:justsml/de941bd61cc86e30beedbb8a3a646f81`

### Custom headers

`gist:justsml/fca7cd72ec1ebc07d994eac13a665ddf`

### HTTP Error Handling

`gist:justsml/81919a72897ebc503c6b34a556a9bde2`

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

### Timeouts

Here's a generic Promise timeout, using the "Partial Application" pattern. It'll work with any Promise interface. Don't do too much work in the supplied promise chain, it will keep running - and any failures have a way of creating long term memory leaks.

`gist:justsml/f93b2ef6457b3e52eb995831b67cab85`

And a more complex example, featuring a tracking flag `__timeout` so you can **intercept any costly work.**

`gist:justsml/5e492db8997a4f7e22e61b7486cbf273`

### Download Progress Helper

<!-- > This is included for completeness. You may still want to use a 3rd party library here. Browser streaming interfaces may lack browser compatibility (as of late 2018). -->

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

##### Source: Progress Helper

`gist:justsml/a8ffd810fc7e5a5295dfc898302ddbfc`

_credit:_ Special thanks to Anthum Chris and his [fantastic Progress+Fetch PoC shown here](https://github.com/AnthumChris/fetch-progress-indicators)

### Recursive Retry Helper

`gist:justsml/7e52521a0af50fa590be57d5b4593120`

### Handling HTTP Redirects

`gist:justsml/3dd0a799ada8da7cd15943ff254266de`

## Compatibility

As of 2022, the `fetch` API is [widely supported](https://caniuse.com/#feat=fetch) in all modern browsers and in more recent versions of NodeJS v18+.

If you must support IE you can [polyfill fetch](https://github.com/github/fetch#browser-support) with the `github/fetch` package (maintained by an awesome team at GitHub). It's possible to go as far back as [IE8](https://github.com/camsong/fetch-ie8) - _Your mileage may vary_.

Earlier NodeJS can take advantage of the the `fetch` API with the [`node-fetch`](https://www.npmjs.com/package/node-fetch) package:

```sh
npm install node-fetch
```

_After polyfill+node-fetch: 99.99% compatible_ ✅


> Please [Tweet at me](https://twitter.com/justsml) if you have other _Use Cases_ you'd like to see. ❤️

![End of Dan's fetch API Examples](jonas-vincent-2717-unsplash.jpg "End of Dan's fetch API Examples")
