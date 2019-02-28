---
title: "JavaScript: The Wild & Crazy World of Functions"
subTitle: Not your parents functions
date: 2019-02-20
modified: 2019-02-27
tags: [es6, arrow-functions, functions, methods, procedures, syntax]
category: programming
cover: andrew-wulf-303962-unsplash.jpg
---

# The Wild & Crazy World of Functions

![credit: andrew-wulf-303962-unsplash.jpg](andrew-wulf-303962-unsplash.jpg)

Relatively recent additions to JavaScript have made a core concept harder to understand.

> We're talking about functions, methods and procedures!

For most of JavaScript's life we've had a few variations on this syntax:

#### Function: Original Recipe

This is probably the most common style.

```js
function add(a, b) {
  return a + b;
}
```

#### Function: as a variable

Assigning a function to a variable allows for more advanced patterns. (We'll see below.)

```js
var add = function(a, b) {
  return a + b;
}
```

#### Function: inside object literal

Objects in JavaScript let you store any _type_ of variable to a named key for easy retrieval.
In the following example, our object is assigned to the variable `utils`. It only has one key, named `add` whose value is an in-line function.

```js
var utils = {
  add: function(a, b) {
    return a + b;
  }
};
```

