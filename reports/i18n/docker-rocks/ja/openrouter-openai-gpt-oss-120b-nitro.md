# Translation Candidate
- Slug: docker-rocks
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/ja/index.mdx
- Validation: deferred
- Runtime seconds: 1.31
- Input tokens: 2091
- Output tokens: 600
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000190
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Dockerが最高、OSXでも動作する
subTitle: Dockerは高速で柔軟です
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker Rocks

> 2016年9月、2018年の更新  
> Boot2Docker は Docker for Mac に置き換えられました

> 歴史的備考: 本投稿は意図的に 2015 年頃の Docker-for-Mac のスナップショットとして残しています。パフォーマンスに関する助言やツール名は当時のものです。現在の Docker Desktop と Compose のワークフローはすでに進化しています。

1. Docker は驚くほど高速で柔軟です。  
1. 以前のツール、特に boot2docker は遅く、クラッシュしやすいものでした。

Docker は現在、Linux カーネル v3.4 以上でネイティブに動作します。実際の boot2docker VM は v4 を実行しています。

ハードウェアを最大限に活かすには、Mac/Windows マシンに最新の Debian または Ubuntu をインストールしてください。

… c'mon those games aren't helping your code…

### セットアップを確認

`docker info` コマンドの出力を確認してください。

1. セキュリティ: リモートネットワークから `nmap` を使い、予期せぬ開放ポートがないかチェックする  
2. DNS: ローカルキャッシュまたは低遅延 DNS サーバーを利用する  
3. ストレージ: 正しいストレージドライバーを使用する（`overlay2` がほぼ確実）

2024 年更新:

- Docker Desktop はプロプライエタリですが、個人利用は無料です。macOS や Windows で Docker を始めるには最適な手段です。  
- もっとオープンソース志向の代替が欲しい場合は、[Rancher Desktop](https://rancherdesktop.io/) を確認してください。
````
