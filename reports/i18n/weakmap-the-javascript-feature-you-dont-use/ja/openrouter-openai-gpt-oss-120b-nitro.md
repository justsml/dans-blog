# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/ja/index.mdx
- Validation: deferred
- Runtime seconds: 4.87
- Input tokens: 5944
- Output tokens: 2072
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000605
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: WeakMapでメモリリークを防ぐ
subTitle: 弱いコードを弱参照で修正！
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - javascript
  - memory
  - garbage-collection
  - performance
  - patterns
category: Code
subCategory: Best Practices
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
You know that feeling when you change one line of code and watch your memory usage drop by 50%? I had that moment watching Chrome's DevTools Performance Monitor as a dashboard app went from hemorrhaging 100MB an hour to running clean for an entire afternoon.

The one-line change: `new Map()` became `new WeakMap()`.

That's it. Same API surface, same usage pattern, completely different behavior under the hood. But understanding why this works means understanding something most JavaScript developers never think about: what happens when nothing is looking at your data anymore.

## When References Become Anchors

A regular Map in JavaScript treats its keys like precious cargo. Once you put something in there, the Map will hold onto it with an iron grip. The Garbage Collector sees this relationship and thinks, "Clearly they still need this object, better not touch it."

This protective instinct becomes a problem when you're storing metadata about temporary things. DOM nodes that get removed. User sessions that expire. Component instances that unmount. The Map doesn't know these objects are done being useful. It just knows it has a reference, so it keeps them alive.

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element is gone from the DOM, but cache is keeping it in memory
```

ガベージコレクタは `element` を解放できません。`cache` がまだ参照しているためです。これは「強参照」と呼ばれ、長時間動作するシングルページアプリではメモリリークとなり、最終的にブラウザがクラッシュします。

## WeakMap がルールを変える

WeakMap の挙動はこれとは逆です。キーを「永続的な住人」ではなく「一時的な市民」とみなします。WeakMap に何かを保存するということは、本質的に次のように宣言することです。「このオブジェクトにデータを結び付けたいが、オブジェクトが生き続ける原因にはしたくない」。

もしオブジェクトをメモリに保持しているのが WeakMap だけであれば、ガベージコレクタはそのオブジェクトを回収できます。オブジェクトが消えると、WeakMap のエントリも同時に消失します。手動でのクリーンアップは不要です。

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element gets Garbage Collected
// The cache entry vanishes automatically
```

私はベンチマークで 100,000 個の DOM ノードを生成し、各ノードにメタデータを保存した後、すべて削除しました。Map を使った場合、ブラウザは 150〜200 MB を保持しましたが、WeakMap にすると 70〜80 MB にまで減少しました。コードも機能も同じなのに、メモリ使用量は半分です。

## 失うもの

---

WeakMap には、制約があるように見えるが、実はそれが魔法を機能させている。

**WeakMap はイテレーションできない。** `forEach` も `keys()` も `values()` もない。これは理にかなっている。ガベージコレクタがループの途中でエントリを削除する可能性があるので、そこまで扱いたくはないだろう。

サイズを確認できない。`.size` プロパティも `.length` もない。これも変動するターゲットだからだ。問い合わせた時点と結果が返ってくる時点で数が変わっているかもしれない。

**キーはオブジェクトでなければならない。** 文字列も数値もプリミティブも不可。弱参照が機能するための根本的な要件で、プリミティブは値そのものと同一視され、個別のアイデンティティを持たない。

これらはバグではない。設計上の仕様だ。WeakMap は「オブジェクトにメタデータを付与しつつ、そのオブジェクトの回収を妨げない」ことだけを目的としている。イテレーションが必要だったり、プリミティブキーやエントリ数が必要だったりするなら、別の問題を解決しようとしているはずなので、普通の Map を使うべきだ。

## 実際に役立つ場面


「プライベートデータ」パターンは、JavaScript に `#private` フィールドが導入される前の WeakMap の元々のユースケースです。ライブラリはクラスの外部に WeakMap を作成し、インスタンスからは直接参照できないデータを格納します。

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}
```

User インスタンスがガベージコレクトされると、プライベートデータも同時に消失します。クリーンアップコードは不要です。

メモ化も自然な適用例です。特に、プリミティブではなくオブジェクト入力に基づいて結果をキャッシュする場合に有効です。高コストな計算が設定オブジェクトを受け取る場合、WeakMap を使えばキャッシュが設定オブジェクトより長く生き残る心配がなくなります。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

キャッシュはキャッシュ対象のオブジェクトが存続している間だけ存在します。`obj` が他で参照されなくなると、キャッシュされた結果とエントリは同時に消えます。

## 使いどき

現代のウェブアプリでメモリリークが発生するのは、不要になった参照が残っていることが原因です。長時間稼働するもの、たとえば一日中開いたままになるダッシュボード、数時間動作し続けるチャットアプリ、リフレッシュしない管理パネルなどを作る場合、古いデータがどうなるかを意識する必要があります。

WeakMap は、DOM ノードやコンポーネントインスタンス、あるいはライフサイクルを自分で管理できないオブジェクトにデータを結び付ける場合に特に有用です。参照に基づいて何かを保存し、その参照が消える可能性がある場合、WeakMap を使うことでクリーンアップが格段に簡単になります。

一方、実際のキャッシュを構築し、エビクションポリシーが必要だったり、エントリを走査したり、プリミティブキーを使用したり、データそのものが重要でオブジェクトとの結び付きを重視しない場合は、普通の Map が適切です。

`WeakMap` の良いところは、必要性がほとんど自明になる点です。オブジェクトが破棄されたときに map エントリを手動で削除するクリーンアップコードを書いている自分に気付いたら、それは WeakMap を使うサインです。メモリが無制限に増大し続けるのが心配で、削除タイミングが分からない場合も同様にサインです。

時には、考える必要すらない「ただ動く」機能が最良の選択肢になることがあります。

## リソース

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog: Weak References and Finalizers](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap and WeakSet](https://javascript.info/weakmap-weakset)
````
