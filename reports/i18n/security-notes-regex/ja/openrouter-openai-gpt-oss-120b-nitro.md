# Translation Candidate
- Slug: security-notes-regex
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/ja/index.mdx
- Validation: passed
- Runtime seconds: 2.31
- Input tokens: 2129
- Output tokens: 762
- Thinking tokens: unknown
- Cached input tokens: 256
- Cache write tokens: 0
- Estimated cost: $0.000220
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'セキュリティノート: 正規表現'
subTitle: 正規表現は脆弱になるか？
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## RegEx Denial-of-Service: ReDOS

私がこれまでに見つけた、意外でありながら見落としがちな脆弱性の一つは正規表現に起因するものです。  
書き方が悪い、あるいは実装が不適切な場合に発生します。

大きな入力や細工された入力に対して、メモリや CPU が枯渇します。

> これは単なるパフォーマンスの臭いではなく、サービス拒否（DoS）脆弱性です。敵対的な入力が CPU を長時間占有し、正規ユーザーを飢餓状態に追い込めるなら、脅威モデルに組み込む必要があります。

### Warning Signs

1. ネストした量指定子、繰り返しグループ、または重複するオルタネーション
2. タイムアウトや入力長制限が設定されていないバックトラッキング重視エンジン
3. ユーザー入力を検証せずに正規表現を使用している
4. 正規表現検証がホットパス（頻繁に呼ばれるリクエスト経路）で実行されている

### Mitigation / Resolution

1. RegEx は難しい。
    1.  例えば、[OWASP が推奨する IP バリデーションのやり方][owasp] は次の通りです。  
       `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`
    2.  4 バイトの IP アドレスを検証するだけで、（旧式の）ツイート文字数を超えてしまうほど長いです。
2. 正規表現を評価する前に入力長を制限する。
3. タイムアウトを設定する、静的解析を導入する、あるいはプラットフォームがサポートしていればバックトラッキングしないエンジンを使用する。
4. この問題は .NET、Node、Python、PERL、Java など、ほぼすべての言語とプラットフォームに影響します。

### Reference

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
