# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/ja/index.mdx
- Validation: passed
- Runtime seconds: 2.65
- Input tokens: 5759
- Output tokens: 1741
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000538
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: AngularJS の裏技
subTitle: AngularJSは楽しい！
date: '2015-02-26'
modified: '2016-02-01'
category: Code
subCategory: angularjs
tags:
  - angularjs
  - development
  - performance
  - programming
cover: ../sharon-mccutcheon-522851-unsplash.webp
cover_mobile: ../w300_sharon-mccutcheon-522851-unsplash.webp
cover_icon: ../icon_sharon-mccutcheon-522851-unsplash.webp
---
##AngularJS CAN BE Fun!

> For: AngularJS v1.x

1.  AngularJS 開発者は、規模が中〜大のアプリが散在する `$watch` と、しばしば肥大化する足場である `$scope` の重みで崩れ始めることにすぐ気づく。
2.  `$scope` に余分な UI 状態を持ち込まず、全体の階層のサイズと深さを抑えるようにする。

### 2-way data binding: 2-way Sword

2-way バインディングだけでも、Backbone など他のフレームワークから来た人にとっては **凄く驚き** になる。

問題は、多くのサイトが Angular の設計パターンを **慢性的に使い過ぎ** していることだ。  
これによりディレクティブが拡散し、`$scope/rootScope` が簡単に数千のインスタンスを抱え、巨大オブジェクトにしがみついてガベージコレクションがほぼ不可能になる。

この先に何が待っているかは明白です：疲弊したブラウザです！ 無限に続く冗長な UI/DOM の再コンパイルを **必死の速度** で実行し続ける運命にあります。

### OVER-Angular.JS化 を止める

> 「もし唯一の道具がハンマーだけなら、すべての問題が釘に見える。」
>
> – 古い格言

アプリにディレクティブの問題はありませんか？

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

柔軟なユーザーウィジェットを設計して、次のことを実現しましょう：

1.  DRY な Angular コードで汎用的なコンポーネント化  
2.  理解しやすいディレクティブ、最小限のサイズと深さ（ng‑repeat に注意）  
3.  シンプルなサービス層  
4.  実装に必要なコードはごく少量、HTML/ビューコードだけで済む  

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Welcome User
    a.btn(href='/login') Login
```

## ソリューション

### Angular のコツ

1.  1-way バインディングを使用する（例: `{ :: title }`）
2.  ディレクティブの再帰的なネストは抑える
3.  ディレクティブをネストせざるを得ない場合は、`ng-repeat` の内部で **絶対に** 行わない――パフォーマンスが `O(n^2)^3` に近づく危険がある  
    I. 基本的な DOM/UI フラグメント（例: モーダルメッセージボックス、ステータスバー）をファクトリーパターンで作成し、ディレクティブまたはコントローラから呼び出す
4.  **ボーナス:** [ブラウザのレンダリングライフサイクル](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en) のコストとトリガーを理解する――アニメーション、コンポジットレンダリング、リフローなど

### Browserify でプロジェクトを整理する

Angular 固有というわけではないが、シンプルな依存関係解決には必須。

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) は、実質的にコード量を増やさずに（数百文字程度）JS プロジェクトを管理可能にする。

[Just read this section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) の [Browserify Handbook](https://github.com/substack/browserify-handbook/) を参照してください。

## Alternatives

### [ReactJS](https://facebook.github.io/react/) from Facebook

小規模で再利用可能な UI コンポーネントが多数ある場合、ReactJS の方が適していることがあります。

- プロジェクトが…の場合:
  - UI/DOM の実装哲学が Angular と異なる
  - 何らかの「フレームワーク」をすでに使用している ― AngularJS、Ember、Backbone と **併用して ReactJS を利用** できる（可能なら避ける方が無難）。
  - データモデルの頻繁な変更を自前のコードで処理している場合、Angular の digest/loop パターンに伴う注意散漫（ADHD）を回避できるメリットがある

### [Polymer Project](http://www.Polymer-Project.org/) from Google

### Pure-er JS Approach

- ちなみに、ここではフレームワークに依存しないコードを書こうとしています（テスト容易性 +1、再利用性 +1）
  1.  プレーンな JavaScript クラスを使ってデータを取得する（AJAX/JSONP/ページ埋め込み など）
  1.  Mustache テンプレートで HTML 文字列を生成する（または直接 DOM を生成）
  1.  可能であれば、レンダリング結果を `localStorage` にキャッシュする
  1.  （オプション）コンテンツを再レンダリングするためのイベントリスナーを追加する。イベント名は `refresh.<class-name>` に統一しています。
````
