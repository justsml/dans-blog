# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: ja
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.06
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug mastering-functional-pipelines-passing-state --locale ja --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: やあ、クロージャ。久しぶりだな。
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## パイプラインの達人：状態の受け渡し

関数型パイプラインを使って状態を渡すのに苦労したことはありませんか？

コードの整理（あるいはその欠如）は、状態の受け渡しのしやすさに直接影響します。

この記事では、パイプラインを通じて状態を渡す効果的なテクニックを探ります。その過程で、コードの整理と可読性を向上させます。

この記事で焦点を当てるのは、以下の「実際の」スニペットです。`userId`と`products`の配列を受け取るチェックアウト関数です。この関数は、4つの関数を順次実行するPromiseチェーンを返します。

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

ちょっと待ってください。このコードは、JSのパイプラインとしてはかなりまともです！

このコードにはいくつかの微妙な問題があり、それらが組み合わさってより深刻な問題になる可能性があります。

1つ目の問題は、論理的に関連する各関数に`userId`を繰り返し渡していることです。さらに、開発者やTypeScriptでも見逃しがちな別の問題があります。数値引数の順序を間違えると、簡単にサイレントバグが発生します。（`applyTaxes`と`purchaseProducts`を見てください。_最初に来るのは`userId`ですか、それとも`amount`ですか？_）

このコードを改善する方法を決める前に、長所と短所を確認しましょう。

### 長所と短所

#### 長所

- クロージャをうまく活用！ `userId`と`products`を一度だけ渡す！
- 一貫した引数名。
- チェックアウトの4つの主要関数を比較的効果的かつ簡潔に合成。
- 「無料」のエラーフロー制御。（エラーはネストされた関数からバブルアップし、`checkout()`が返すPromiseをrejectします。）

#### 短所

- `userId`をあちこちに繰り返し渡すのが面倒。
- 関数が単一引数（単項）ではない。_これは合成可能性に影響する。理由は[最終例](#checkout-with-further-improvements)を参照。_
- 各関数が何を返すのかわかりにくい。（メール送信結果か、それとも`result`変数か？ あるいは？）
- 機能追加が容易でない（例：顧客の割引・クレジット・ポイントなどを読み込む必要が出た場合）。
- 一時的なパラメータ名（各`.then(param => {})`内の`param`など）が文脈を補うこともある。しかし時間が経つにつれ、命名のゴミが溜まりやすくなる。

### 解決策、その1：モジュール化する！

このテクニックは、関連する関数を単一のモジュール（例：`CartHelpers`）にまとめることです。特定のパターンを強制するものではありません。[ファクトリ関数](#carthelpers-factory)、[クラス](#carthelpers-class)、クロージャ、ミックスインなど、プロジェクトとチームに合った方法を探ってみてください。

#### CartHelpers Factory

`CartHelpers`モジュールの例。`userId`は一度だけ渡され、すべてのメソッドは単一引数になります。

```typescript
// cartHelpers.ts
export const CartHelpers = (userId: string) => ({
  applyTaxes: (amount: number) => { /* ... */ },
  purchaseProducts: (amount: number) => { /* ... */ },
  sendEmail: (result: PurchaseResult) => { /* ... */ },
  trackAnalytics: (result: PurchaseResult) => { /* ... */ },
});
```

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### CartHelpers クラス

クラスが好みなら、簡単に適応できる：

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

即座に得られる利点：

- 繰り返しの変数受け渡しを排除。
  - DRY：`CartHelpers` が `userId` という繰り返し引数を抽象化する。
  - 各メソッドは**_必要な引数だけ_**を受け取る。`cart.applyTaxes(subTotal)` と書けば、読んでいて全く驚かない。
- `CartHelpers` 内の単一引数関数は可読性が高く、目的が明確になる。

関連関数をグループ化することで、露出する表面積を減らせる（例：`checkout()`、`CartHelpers` のパブリックメソッド）。

> 表面積が小さい === 認知負荷が減り、テストと保守性が向上する。
> _意図と集中を持ってシステムを設計しよう。✨_

#### チェックアウトとCartHelpersの使用例

それでは、`checkout()` 関数がどのようになるか見てみましょう。

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### さらなる改善を加えたチェックアウト

> さらに改善できるでしょうか？ できます！ 引数をまったく繰り返す必要はありません。

関数の引数が前の関数の出力によって提供される場合、コードをさらに簡略化できます。

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 関数はレゴのように積み重なり、普通の「人間の言葉」のように読めます！💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**パラメータを単一の（オブジェクト）引数にまとめるのが不自然に感じる場合は、** 関数を分割するか、より適切なスコープのモジュールにまとめることを検討してください。

#### どこから始めるべきか？

関連する関数を見つけ、それらをグループ化します（例：`CartHelpers`）。

論理的なモジュールを見つける際の難しさのひとつは、そもそも関連するコードを特定することにあります。

##### 関数が「関連している」とはどういうことか？

シンプルなコツ：関数のパラメータに繰り返しがないか探すこと。そこに関係性や、根底にある責務が潜んでいないか問いかけてみてください。

- ✅ 共通の引数が繰り返し現れる関数。（例：4つのメソッドがすべて `userRewards` を受け取るなら、`Rewards` などのモジュールが必要な可能性が高い。）
- ✅ 引数が直前の関数の出力から直接提供される関数。（一連のステップ。例：`Extract`、`Transform`、`Load`。）
- ❌ 機能領域に漠然と関連しているもの、「商品購入？」。
- ❌ 関数名に共通のプレフィックスやサフィックスが付いているもの。
- ❌ 引数として巨大なオブジェクトを必要とするが、そのオブジェクト内のごく一部の値しか使わない関数。（例：`applyTaxes({ user, business, rewards, kitchenSink })` 対 `applyTaxes({ subTotal })`）

モジュール設計に「唯一の正解」はないが、整理のための選択肢を2～3個挙げてみるのが役立つ。アウトラインを描き、「理想の」コードを書き、「ときめくか？」と自問してみよう。

<aside>
📌 ドメインモデルが固まるまでには、モジュール構成を何度か試行錯誤するのが普通だ。完璧を目指して悩みすぎる必要はない。
</aside>

> `cart.sendReceipt()` は支払い関連のメソッドと一緒にすべきではないと感じるかもしれない。顧客へのメッセージ送信は `customerNotifications.sendReceipt()` の方が適切な居場所だろう。もし `CartHelper` の重要度が十分に高ければ、それは内部で `customerNotifications` のような必要な**_サービス_**をすべて呼び出す**_コントローラー_**として機能してもよい。

#### 助けになっているかどうか、どう判断するか？

アドホックな引数を排除しても可読性が損なわれないなら、**おめでとう!!!** おそらく、明確で耐久性のあるスコープを持つモジュールを構築できている。

- 中間引数を削除すると、自然と「レイヤー」が浮かび上がってくる。
- アドホックなコードを間違った場所に放り込むのが**_難しく_**なるはずだ。

では、機能をどこに追加するかという疑問が生じます。

私の経験では、機能追加を検討する際に評価すべき主要な戦略が2つあります。

1.  既存のメソッドを拡張・リファクタリングする。（新しいコードが既存のコードと十分に近い場合。）
2.  チェーンの適切な場所に新しい（5つ目の）関数を作成する。（新しいコードが既存の関数と無関係な場合。）

最終的にこれにより、新しい機能の居場所を決めやすくなる。（例：`cart.applyDiscounts()`、`cart.applyTaxes()`、`rewards.getBalance()`。）

### 結論

複雑なパイプラインを通じて状態を渡すのは厄介になり得る。しかし、少しリファクタリングの練習を積めば、より読みやすく、認知負荷の低いコードを書けるようになるだろう。

質問やコメント、懸念事項があれば、お気軽に [@justsml](https://x.com/justsml) または [メール](mailto:dan@danlevy.net) までご連絡ください。

#### シリーズ次回予告

次回は、状態の外部化とモジュールの機能拡張について掘り下げます。

#### 関連記事

- [コンポーネント駆動のReact世界にも同様の課題があります。](https://kyleshevlin.com/quit-your-yapping)
````
