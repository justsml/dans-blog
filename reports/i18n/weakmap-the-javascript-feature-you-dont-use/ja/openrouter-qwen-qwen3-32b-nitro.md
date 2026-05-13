# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/ja/index.mdx
- Validation: deferred
- Runtime seconds: 30.25
- Input tokens: 5642
- Output tokens: 5561
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001786
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: WeakMapでメモリリークを防ぐ
subTitle: 弱いコードを弱参照で修復！
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
コードやマーケットの表現を変更せずに、以下の文章を日本語に翻訳します。

---

コードの1行を変更して、メモリ使用量が50%も下がる瞬間を経験したことはありませんか？ChromeのDevToolsのパフォーマンスモニターで、ダッシュボードアプリが1時間に100MBもリークしていたのが、ある1行の変更で午後ずっとクリーンに動くようになったのを見たことがあります。

その1行の変更とは、`new Map()` から `new WeakMap()` への変更でした。

それだけです。APIの表面や使用パターンは同じですが、内部での挙動は完全に異なります。このメカニズムを理解するには、ほとんどのJavaScript開発者が気にしたことがないある事実を理解する必要があります。それは、データを誰も参照しなくなったときに何が起こるか、という点です。

## 参照がアンカーになるとき

JavaScriptの通常の`Map`は、キーを宝物のように扱います。一度何かを入れると、鉄のグリップでそれを握りしめます。ガベージコレクターはこの関係を見て、「明らかにまだこのオブジェクトが必要だ、触れない方がいいだろう」と判断します。

この保護的な性質が問題になるのは、一時的なものに対するメタデータを保存しているときです。削除されたDOMノードや、有効期限切れのユーザーセッション、アンマウントされたコンポーネントインスタンスなどです。`Map`はこれらのオブジェクトがもう役に立たないことを知りません。単に参照があることを知っているだけです。そのため、これらを生き続ける状態にしてしまいます。

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// DOMから要素は削除されたが、cacheがメモリに保持している
```

ガベージコレクタは、`cache`が`element`を指している限り`element`をクリーンアップできません。これは「強参照（strong reference）」と呼ばれます。長時間実行されるシングルページアプリケーション（SPA）では、このメモリリークが最終的にブラウザをクラッシュさせます。

## WeakMapがルールを変える

`WeakMap`は別の仕組みを持っています。`WeakMap`はキーを「永住権を持つ住民」ではなく「一時的な市民」と扱います。`WeakMap`に何かを保存するとき、実質的にこう言っていることになります。「このデータをこのオブジェクトに関連付けたいが、それが生き続ける理由にはなりたくない」。

オブジェクトをメモリに保持しているのが`WeakMap`だけであれば、ガベージコレクタはそのオブジェクトを回収できます。オブジェクトが消えれば、`WeakMap`のエントリも一緒に消えます。手動でクリーンアップする必要はありません。

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 要素はガベージコレクションされる
// cacheのエントリは自動的に消える
```

ベンチマークで10万個のDOMノードを作成し、それぞれのメタデータを保存した後、すべてを削除しました。`Map`を使用した場合、ブラウザは150〜200MBを保持していました。`WeakMap`を使用した場合、70〜80MBにまで減少しました。同じコード、同じ機能で、メモリ使用量が半分になりました。

## あきらめるもの

## あきらめるもの  

`WeakMap`には、最初は制限のように感じる特徴がありますが、これらこそがその仕組みの本質です。  

**`WeakMap`をイテレートすることはできません。** `forEach`も、`keys()`も、`values()`もありません。これは理にかなっています。ループの途中でガベージコレクタがエントリを削除する可能性があるからです。本当にそのような状況を扱いたいですか？  

サイズを確認することもできません。`.size`プロパティも`.length`もありません。これは動的です。質問してから回答を得るまでの間に数値が変化する可能性があります。  

**キーはオブジェクトでなければなりません。** 文字列や数値、プリミティブ値は使えません。これは弱参照の仕組みに根本的に依存しています。プリミティブ値は、その値から分離して追跡可能なアイデンティティを持っていません。  

これらはバグではありません。設計上の選択です。`WeakMap`は1つの特定の目的のために作られています。オブジェクトにメタデータを関連付ける際、そのオブジェクトがガベージコレクションされるのを妨げずに。イテレーションやプリミティブキー、エントリ数の取得が必要なら、別の問題を解決している可能性があります。その場合は通常の`Map`を使用すべきです。  

## ここが本当に役立つ場面

「プライベートデータ」パターンは、JavaScriptに`#private`フィールドが登場する前から、`WeakMap`の初期的なユースケースでした。ライブラリはクラスの外側で`WeakMap`を作成し、インスタンス上からアクセスできないデータを保存するために使用していました。

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

`User`インスタンスがガベージコレクションされると、プライベートデータも一緒に破棄されます。クリーンアップコードは必要ありません。

メモ化も自然なユースケースです。特にオブジェクト入力に基づいて結果をキャッシュする場合。高コストな計算が設定オブジェクトを入力として受け取る場合、`WeakMap`を使えばキャッシュが設定オブジェクトの生存を超えて残ることを気にする必要がありません。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

キャッシュはキャッシュされたオブジェクトの生存期間だけ存在します。`obj`が他のどこからも参照されなくなると、キャッシュされた結果とキャッシュエントリは同時に消えます。

## いつ使うべきか

現代のウェブアプリケーションにおけるメモリリークは、本来クリーンアップされるべきものが古くなった参照によって発生します。長時間実行されるアプリケーションを構築している場合、1日中開かれたままのダッシュボード、何時間も動かし続けるチャットアプリ、リロードしない管理パネルなど、古いデータがどうなるかを考慮する必要があります。

`WeakMap`は特に、DOMノードやコンポーネントインスタンス、ライフタイムを制御できないオブジェクトに関連データを結びつけるときに有用です。参照に基づいて何かを保存していて、その参照が消えてしまう可能性がある場合、`WeakMap`はクリーンアップをはるかに簡単に行えます。

通常の`Map`は、排出ポリシーを備えた実際のキャッシュを構築する際、エントリを反復処理する必要があるとき、プリミティブキーを使用するとき、またはオブジェクトとの関連性よりもデータ自体が重要である場合に、依然として正しい選択肢です。

`WeakMap`の利点は、必要になるタイミングが通常明確なことです。オブジェクトが破壊されたときにマップエントリを削除するためのクリーンアップコードを書いている場合、それは手がかりです。削除するタイミングが不確実でメモリが無限に増加してしまうことへの懸念がある場合も同様です。

ときには、最も良い機能はあなたがそれを気にすることなく動作するものです。

## 参考資料

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: メモリ管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog: ウィーク参照とファイナライザ](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap と WeakSet](https://javascript.info/weakmap-weakset)
````
