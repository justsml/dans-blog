# Translation Candidate
- Slug: javascript-scope-magic
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.84
- Input tokens: 2344
- Output tokens: 2418
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000768
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-06--javascript-scope-magic/ja/index.mdx reports/i18n/javascript-scope-magic/ja
## Raw Output

````mdx
---
title: ''
subTitle: '[draft] 指令型と再帰型と関数型'
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

> [ 作業中 ]

```javascript
// 命令型: 最も高速（＋非常にシンプルで、新しいポインタや余分なメモリ確保が不要）：
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

// 再帰型: (FIREFOX または BABELJS のみ) ES6関数定義で
// パラメータのデフォルト値を使用して初期値（内部/再帰用）を設定
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// テキストブックの悪い例 - 多くの変更可能な外部値を扱う関数スコープの悪用
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // 悪い
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
    // 悪い: 内部の再帰関数は必要ない。ヒント: 使用される変数は親関数スコープからのものです
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promise: すごい！

```js
// bluebird Promise とその
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// bluebird により、以下のような処理が非常にシンプルで簡潔に実現できます：
fs.readFileAsync("./style.less") // promisified readFile() を呼び出す
  .then(less.renderAsync) // less.render に処理を渡す
  .then(writeFileData); // CSS コンテンツを受け取る関数（最初のパラメータ）
```

1.  ネイティブの ES6 Promise は素晴らしいですが、私はより頑健な [Bluebird Promise ライブラリ](https://github.com/petkaantonov/bluebird/blob/master/API.md)を好みます。
1.  ライブラリの有無に関わらず、現代のブラウザは長年 Promise をサポートしています。
1.  Promise は複雑なパターンなしで利用できます - 隠し`deferred`の使用が推奨されます。
1.  **$q は最悪です**。上記のBluebirdを使用してください。
1.  注記: Bluebirdのベンチマークは最適ケースでのテスト結果なので、複雑なPromiseチェーンを扱う際は注意してください。

## Java vs JavaScript

### レート制限 / デバウンス / スロットル

1.  JavaScriptでは、[David Walshがデバウンスを20行未満で実装](http://davidwalsh.name/essential-javascript-functions)しています！
1.  Javaでは、JDebounceという非常に複雑なライブラリが約500行以上必要になります。
1.  _ 両者の比較：_
1.  JavaScriptは高速で、ファーストクラス関数を活用して驚くほどシンプルに実装できます。
1.  一方でJavaは多くの部品が絡み合い、コンパイル時に動作を適用するための注釈が使われ、XMLも大量に含まれていますが、それはただの遊び心です！

<!--
## 制御の反転技法

進行中の作業
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
