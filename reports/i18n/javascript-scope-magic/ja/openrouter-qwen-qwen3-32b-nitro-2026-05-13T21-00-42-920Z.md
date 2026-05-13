# Translation Candidate
- Slug: javascript-scope-magic
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/ja/index.mdx
- Validation: deferred
- Runtime seconds: 3.76
- Input tokens: 1525
- Output tokens: 1755
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000543
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScriptマジック
subTitle: 命令型対再帰型対関数型
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
## 命令型 vs 再帰型 vs 関数型

> [ 進行中 ]

```javascript
// 命令型: 最も高速（＋非常に単純、新しいポインタや余分なメモリ確保なし）：
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

// 再帰型:（FIREFOXまたはBABELJS専用）ES6関数定義で
// パラメータのデフォルト値を使用して初期（内部/再帰的）値を設定
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// 教科書的誤例 - 複数の変更可能な外部値を含む関数スコープの悪用
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // 悪い例
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
    // 悪い例: 内部再帰関数は必要ない、ヒント: 使用される変数は親関数スコープから
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promise: すばらしい！

```js
// bluebird Promiseを使用した例
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// bluebirdはこれをやるとき、不快になるほど単純かつ簡潔にしてくれます：
fs.readFileAsync("./style.less") // promisifyされたreadFile()を呼び出し
  .then(less.renderAsync) // less.renderに渡す
  .then(writeFileData); // CSSコンテンツを受ける関数（1番目のパラメータ）
```

1.  組み込みES6 Promiseは素晴らしいですが、私はより頑健な[Bluebird Promiseライブラリ](https://github.com/petkaantonov/bluebird/blob/master/API.md)を好みます。
2.  ライブラリの有無に関わらず、現代のブラウザはPromiseを何年もサポートしています。
3.  Promiseは複雑なパターンなしで利用できます - 隠し`deferred`の使用が推奨されます。
4.  **$qは最悪です**、上記を参照してbluebirdを使用してください。
5.  注記: Bluebirdのベンチマークは最善ケースでのテストなので、複雑なPromiseチェインを行う際は注意してください。

## Java vs JavaScript

### レート制限 / デバウンス / スロットル

1.  JavaScriptでは[David Walshがデバウンスを](http://davidwalsh.name/essential-javascript-functions)20行未満で実装しています！
2.  JavaではJDebounceという、はるかに複雑なライブラリが約500行以上あります。
3.  _ 両者を比較すると _: 
4.  JavaScriptは速く、ファーストクラス関数を活用して素晴らしい単純さを実現しています。
5.  一方Javaは多くの部品があり、コンパイル時に動作を適用するためにアノテーションが使用され、XMLも大量に含まれています（冗談で）！

<!-- 
## 制御の反転技法

進行中
-->

[fuck_this]: ../panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
