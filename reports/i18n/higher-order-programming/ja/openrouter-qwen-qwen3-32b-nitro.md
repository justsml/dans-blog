# Translation Candidate
- Slug: higher-order-programming
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/ja/index.mdx
- Validation: passed
- Runtime seconds: 5.38
- Input tokens: 2038
- Output tokens: 1895
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000618
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 高階プログラミング
subTitle: 配列および集合に基づくパイプライン技術の探求
date: '2015-09-22'
modified: '2024-07-30'
category: Code
subCategory: programming
tags:
  - programming
  - patterns
  - models
  - source-code
  - organization
cover: ../susan-holt-simpson-799094-unsplash.webp
cover_mobile: ../w300_susan-holt-simpson-799094-unsplash.webp
cover_icon: ../icon_susan-holt-simpson-799094-unsplash.webp
---
## 配列および集合ベースパイプライン技法の探求

### アンチパターンか？

これは**すべてを配列としてコーディングする**ことによって得られる利点の探求です。(SmallTalkのジェダイ的な概念を借りています)

以下の指針があります:

1. すべての入力は配列に似た構造です。たとえ要素数が1つの配列でも。
1. 高位の関数は一般に配列を受理し、配列を返却するべきです。(ループのコールバックメソッド: map/reduce/each/filter は例外)
1. 100人の開発者のうち99人は私が言う「**鋭意スキーマ過剰症候群**」に悩まされています。
1. 膨れ上がった`クラスベースモデル`に注意してください - 予測可能な特徴がついています: 脆弱な`インスタンス状態`があり、調整すべきレバーとノブが多数あり、DBトランザクション、SQLロック、async/mutexing(最初から完璧に動く)、イディオム的な`プロパティゲッター/セッター`を使用し、`public/private/final/など`のアクセス修飾子の使い方も完璧ですよね？

1. では、共通の問題をとりあげて、~~~add~~~集合ベースの考察を強引に組み込みましょう。
1. 要素数の多い仮想のブログサイトがあり、記事(Article)が多数、コメント(Post)がさらに多数あります。
1. 以下の`delete`メソッドを追加しましょう - ただし、単一値と配列の両方をサポートします。

```java
package net.danlevy.why.java___why.you.got.all.the.dots____it.must.be.all.the.factories;

public class Post {
  public String   title;
  public Date     created;
  public String   message;

  public Post(String title, String message) {
    this.title    = title;
    this.message  = message;
    this.created  = new Date();
  }

  public Date isArchived() {
    return this.created < new Date(2015, 0, 1);
  }

  // Post.deleteは、単一のPostまたはPost[]配列で呼び出すことができます
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> 私のJavaが少し錆びついていたら、ご容赦ください。
````
