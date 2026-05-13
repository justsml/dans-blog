# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 38.49
- Input tokens: 9728
- Output tokens: 6652
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002375
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx reports/i18n/mastering-functional-pipelines-passing-state/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'パイプラインマスター: ステートの受け渡し'
subTitle: ''
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
## パイプラインのマスター：ステートの受け渡し

関数型パイプラインでステートをやり取りする際に課題を感じたことはありますか？

コードの構成（またはその欠如）がステートの受け渡しやすさに直接影響を与えています。

この記事では、パイプラインを介したステートの受け渡しに効果的なテクニックを探ります。その過程で、コードの構成と可読性を向上させることも目指します。

この記事の焦点となる「現実的な」コードスニペットは、`userId`と`products`の配列を受け取り、4つの関数を順番に実行するPromiseチェーンを返すチェックアウト関数です。

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

ちょっと待って、このコードはJSにおけるパイプラインとしてはかなり良いのでは？

このコードにはいくつかの微妙な問題があり、これらが組み合わさることでより大きな問題を引き起こす可能性があります。

1つの問題は、`userId`を論理的に関連する各関数に繰り返し渡している点です。  
さらに別の問題として、開発者やTypeScriptも見逃しやすい点があります：数値引数の順番を間違えると静かにバグが発生します。（`applyTaxes`と`purchaseProducts`を参照してください。_最初に`userId`と`amount`のどちらが来るべきだったか？_）

このコードを改善する方法を決める前に、まずは長所と短所を整理しましょう。

### 長所と短所

#### 長所

- クロージャーの良い活用！`userId`と`products`を一度だけ渡しています。
- 引数の命名が一貫しています。
- チェックアウトのための4つの主要関数を、比較的効果的かつ簡潔に組み合わせています。
- 「無料」のエラーフロー制御。（エラーはネストされた関数のいずれかからバブルアップし、`checkout()`が返すPromiseで拒否されます。）

#### 短所

- `userId`を繰り返し渡すのは面倒です。
- 関数が単一引数（unary）ではありません。_これは合成可能性に影響します。[最終的な例](#checkout-with-further-improvements)を参照してください。_
- 各関数が何を返すかが明確でない場合があります。（メール送信結果でしょうか？それとも`result`変数でしょうか？）
- 機能追加方法が明確ではありません。（たとえば顧客の割引/クレジット/ポイントをロードする必要がある場合など）
- 時折「一時的な」パラメータ名（各`.then(param => {})`のような）が文脈を追加しますが、時間が経つと命名のゴミが蓄積する可能性があります。

### 解決策パート1：モジュールを作成する！

この技術は関連する関数を単一のモジュール（例：`CartHelpers`）に整理することを目的としています。特定のパターンを強制しません。[ファクトリ関数](#carthelpers-factory)、[クラス](#carthelpers-class)、クロージャ、ミックスインなど、プロジェクトとチームに合ったものを探してください。

#### CartHelpers ファクトリ

`userId`を一度渡し、すべてのメソッドが単一引数となる`CartHelpers`モジュールの例です。

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

クラスがお好みであれば簡単に適応できます：

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

即座のメリット：

- 繰り返しの変数渡しを排除
  - DRY: `CartHelpers` は繰り返される引数 `userId` を抽象化します
  - 各メソッドは**_必要最小限の_**引数のみを受け取ります。`cart.applyTaxes(subTotal)` が読者にとって驚きのない明確なコードになる点が重要です
- `CartHelpers` 内の単一引数関数は、目的が明確で読みやすくなります

関数をグループ化することで、公開するインターフェースの表面積を減らす機会を作れます（例：`checkout()`、`CartHelpers` の「公開」メソッド）

> 表面積が少ない＝認知負荷が減り、テストとメンテナビリティが向上
> _意図と焦点を持ってデザインシステムを構築 ✨_

#### チェックアウトとCartHelpersの使用方法

`checkout()` 関数がどのように見えるか見てみましょう：

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

##### さらに改善されたチェックアウト

> さらに改善できるか？ はい！ 引数をまったく繰り返す必要はありません！

関数の引数が前の関数の出力によって提供される場合、コードをさらに簡略化できます。

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 関数はレゴのように積み重なり、通常の「人間の言葉」のように読めます 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**パラメータを単一の（オブジェクト）引数に組み合わせるのが自然に感じられない場合**、関数を分割する**または**より適切にスコープされたモジュールに組み合わせることを検討してください。

#### どこから始めればいい？

関連する関数を見つけて、それらをグループ化しましょう。（例: `CartHelpers`）

論理的なモジュールの候補を探す際の課題の一部は、最初に関連するコードを特定することです。

##### 関数が関連するとはどういうことか？

1つの便利な方法：関数の引数に繰り返しパターンがあるかどうか探しましょう。関係性や潜在的な責任があるかを問いかけます。

- ✅ 繰り返し、共通の引数を持つ関数。（例: 4つのメソッドがすべて `userRewards` を受け取る場合、おそらく `Rewards` または他のモジュールが必要です。）
- ✅ 前の関数の出力が直接引数として渡される関数。（ステップの連鎖。例: `Extract`、`Transform`、`Load`。）
- ❌ あいまいに「製品購入？」のような機能領域に関連するもの。
- ❌ 一般的な接頭辞や接尾辞を持つ関数名？
- ❌ 引数として大きなオブジェクトを必要とするが、その中からわずかな値しか使わない関数。（例: `applyTaxes({ user, business, rewards, kitchenSink })` と `applyTaxes({ subTotal })` の比較）

モジュール設計には単一の「正解」が存在しないが、2〜3つの組織化オプションを特定し、アウトラインを描いたり「幻想」コードを書いたり、「喜びを感じるか？」と自問すると役立つ。

<aside>
📌 ドメインモデルが明確になるまで、モジュールの構成を数回試すことはよくある。完璧にすることにこだわらずに済ませよう。
</aside>

> `cart.sendReceipt()` が支払い関連メソッドとセットになるべきでないと感じるかもしれない。顧客メッセージのための `customerNotifications.sendReceipt()` がより適切な場所かもしれない。`CartHelper` が十分に重要であれば、**_コントローラー_** として機能し、`customerNotifications` などの**_サービス_**を内部的に呼び出すこともできる。

#### 自分が助けているかの判断方法

中間引数を削除しても可読性が損なわれなければ、**おめでとう！！！** 明確で耐久性のあるスコープを持つモジュールを構築した可能性が高い！

- 中間引数の削除は、自然と「レイヤー」を出現させる傾向がある。
- 間違った場所に即席コードを詰め込むことが難しくなるべきだ！

では、その質問に答えると、どこに機能を追加すべきなのでしょうか？  
私の経験では、機能追加時に評価すべき主な戦略は2つあります：  

1. 既存のメソッドを拡張/リファクタリングする。（新規コードが既存コードと十分近い場合）  
2. チェーン内の適切な位置に新規（5番目）の関数を作成する。（新規コードが既存関数と関係性が薄い場合）  

最終的に、これにより新機能の配置場所を判断しやすくなります。（例：`cart.applyDiscounts()`、`cart.applyTaxes()`、`rewards.getBalance()`）  

### 結論  

複雑なパイプラインを介したステートの受け渡しは難しく感じるかもしれません。しかし、少しのリファクタリングの実践によって、認知負荷が少ない、読みやすいコードを書けるようになります。

ご質問やコメント、懸念事項があれば、[@justsml](https://x.com/justsml) または [メール](mailto:dan@danlevy.net) でご連絡ください。

#### シリーズの次のパートをお楽しみに

次回は、ステートの外部化とモジュールでの機能拡張について探っていきます！

#### 関連記事

- [コンポーネント駆動のReact世界でも同様の課題があります。](../quit-your-yapping)
````
