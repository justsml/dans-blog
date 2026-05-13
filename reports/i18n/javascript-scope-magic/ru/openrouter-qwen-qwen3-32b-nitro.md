# Translation Candidate
- Slug: javascript-scope-magic
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/ru/index.mdx
- Validation: passed
- Runtime seconds: 5.38
- Input tokens: 2286
- Output tokens: 2661
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000822
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScript Магия
subTitle: Императивный против Рекурсивного против Функционального
date: '2015-06-06'
modified: '2024-07-30'
category: Code
subCategory: javascript
draft: true
publish: true
tags:
  - javascript
  - programming
  - performance
  - patterns
cover: ../markus-spiske-197281-unsplash.webp
cover_mobile: ../w300_markus-spiske-197281-unsplash.webp
cover_icon: ../icon_markus-spiske-197281-unsplash.webp
---
## Императивный vs. Рекурсивный vs. Функциональный

> [ В процессе разработки ]

```javascript
// Императивный: Самый быстрый ( + очень простой, без новых указателей или лишних выделений памяти ):
function fib(n) {
  var a = 1,
    b = 1,
    c = 0;
  for (var i = 1; i < n - 1; ++i) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// Рекурсивный: (Только FIREFOX или BABELJS) Определение функции ES6 с
//  параметрами по умолчанию для установки начальных (внутренних/рекурсивных) значений
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// Пример из учебника с плохим управлением области видимости и множеством изменяемых внешних значений
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Плохо
  if (n === -1) {
    return [arr[0]];
  }
  if (n === 0) {
    return arr;
  }
  var proc = function() {
    --n;
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return n === 0 ? arr : proc();
    // Плохо: внутренняя рекурсивная функция не нужна, подсказка: используются переменные из области видимости родительской функции
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Промисы: Отлично!

```js
// Пример использования промисов Bluebird
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird делает это, возможно, слишком простым и лаконичным:
fs.readFileAsync("./style.less") // Вызов промисифицированной функции readFile()
  .then(less.renderAsync) // Передача в less.render
  .then(writeFileData); // Функция для получения содержимого css (первый параметр)
```

1.  Хотя встроенные ES6 Promises хороши, я предпочитаю надежную [библиотеку Bluebird Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md).
1.  Библиотека или нет, современные браузеры поддерживают Promises уже много лет.
1.  Промисы можно использовать без сложных паттернов - неявные `deferred` предпочтительны.
1.  **$q просто ужасен** - используйте bluebird, см. выше.
1.  Стоит упомянуть: тесты Bluebird являются оптимистичными, обратите внимание при использовании сложных цепочек промисов

## Java vs JavaScript

### Ограничение скорости / Дебаунсинг / Троттлинг

1.  В JavaScript [Дэвид Уоллс реализовал debounce](http://davidwalsh.name/essential-javascript-functions) менее чем за 20 строк!
1.  В Java, JDebounce, библиотека, которая намного сложнее, около 500+ строк.
1.  _ Сравнивая два: _
1.  JavaScript быстр и использует first-class функции для достижения выдающейся простоты.
1.  В то время как Java имеет гораздо больше движущихся частей, аннотации используются для применения поведения на этапе компиляции, и есть тонна XML, просто для развлечения!

<!--
## Техники инверсии контроля

В процессе разработки
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
