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

![credit: william-bout-103533-unsplash.jpg](william-bout-103533-unsplash.jpg)

> This **isn't** an attack on [Axios](https://www.npmjs.com/package/axios) **at all**. <br />
> Rather, it's **advocacy for the `fetch` API which has become quite capable.** 🦄

## Overview

I'll be the first to admit: I was an early hater of the `fetch` API. My first attempt turned into an entirely wasted weekend. #fail <br />

The challenges posed by **incomplete documentation & examples are no longer** - at least anywhere near as bad as it once was.

I have come to learn many early (_apparent_) limitations have been overcome  (e.g. no progress updates or cancellation.)

Today I'm happy to report robust [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) support in the ecosystem (in all major browsers - well, _excluding_ Internet Explorer.) [See Compatibility below for polyfill support](#compatibility)


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

```js
fetch('https://api.github.com/orgs/nodejs')
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error))
```

### Custom headers

```js
fetch('https://api.github.com/orgs/nodejs', {
  headers: new Headers({
    'User-agent': 'Mozilla/4.0 Custom User Agent'
  })
})
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(error => console.error(error))
```

### CORS example

CORS is primarily checked at the server - so make sure your configuration is correct on the server-side.

The `credentials` option controls if your cookies are automatically included.

```js
fetch('https://api.github.com/orgs/nodejs', {
  credentials: 'include', // Useful for including session ID (and, IIRC, authorization headers)
})
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()`
})
.catch(error => console.error(error))
```

### Posting JSON

```js
postRequest('http://example.com/api/v1/users', {user: 'Dan'})
  .then(data => console.log(data)) // Result from the `response.json()` call

function postRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}
```


### Posting an HTML `<form>`

```js
postForm('http://example.com/api/v1/users', 'form#userEdit')
  .then(data => console.log(data))

function postForm(url, formSelector) {
  const formData = new FormData(document.querySelector(formSelector))

  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: formData  // a FormData will automatically set the 'Content-Type'
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}
```


### Form encoded data

To post data with a Content-Type of `application/x-www-form-urlencoded` we will use `URLSearchParams` to encode the data like a query string.

For example, `new URLSearchParams({a: 1, b: 2})` yields `a=1&b=2`.

```js
postFormData('http://example.com/api/v1/users', {user: 'Mary'})
  .then(data => console.log(data))

function postFormData(url, data) {
  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: new URLSearchParams(data),
    headers: new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}
```

### Uploading files


```js
postFile('http://example.com/api/v1/users', 'input[type="file"].avatar')
  .then(data => console.log(data))

function postFile(url, fileSelector) {
  const formData = new FormData()
  const fileField = document.querySelector(fileSelector)

  formData.append('username', 'abc123')
  formData.append('avatar', fileField.files[0])

  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: formData  // Coordinate the body type with 'Content-Type'
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}
```


### Uploading multiple files

Setup a file upload element with the `multiple` attribute:

```html
<input type='file' multiple class='files' name='files' />
```

Then use with something like:

```js
postFile('http://example.com/api/v1/users', 'input[type="file"].files')
  .then(data => console.log(data))

function postFile(url, fileSelector) {
  const formData = new FormData()
  const fileFields = document.querySelectorAll(fileSelector)

  // Add all files to formData
  Array.prototype.forEach.call(fileFields.files, f => formData.append('files', f))
  // Alternatively for PHPeeps, use `files[]` for the name to support arrays
  // Array.prototype.forEach.call(fileFields.files, f => formData.append('files[]', f))

  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: formData  // Coordinate the body type with 'Content-Type'
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}
```

### Download Progress Helper

The Progress Handler [technique shown below avoids wrapping](#source-progress-helper) the `fetch` call in a closure. 👍

`progressHelper` has the following interface (source available below)

```js
const progressHelper = require('./progressHelper.js')

progressHelper(handler({ loaded = Kb, total = 0-100% })) // => returns a function for the response _stream_
// use returned function on the `response` before doing `response.json()` etc.
```

Let's look at a usage example:

```js
// The progressHelper could be inline w/ .then() below...
const streamProcessor = progressHelper(console.log)

fetch('https://fetch-progress.anthum.com/20kbps/images/sunrise-progressive.jpg')
  .then(streamProcessor) // note: NO parentheses because `.then` needs to get a function
  .then(response => response.blob())
  .then(blobData => {
    // ... set as base64 on an <img src="base64...">
  })
```

A reusable binary (image) downloader might look like `getBlob()`:

```js
const getBlob = url => fetch(url)
  .then(progressHelper(console.log)) // progressHelper used inside the .then()
  .then(response => response.blob())
```

It's important to choose ONE of the 2 usage patterns below (they are functionally equivalant):

```js
// OPTION #1: no temp streamProcessor var
// ....
  .then(progressHelper(console.log))
```

⚠️ OR️ ️⚠️

```js
// OPTION #2: define a `streamProcessor` to hold our console logger
const streamProcessor = progressHelper(console.log)
// ....
  .then(streamProcessor)
```

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

_After polyfill/node-fetch: 99.99% compatible_ ✅


## More coming soon.

> Please Tweet at me if you have a Use Cases you'd like to see. ❤️

![End of Dan's fetch API Examples](jonas-vincent-2717-unsplash.jpg "End of Dan's fetch API Examples")

