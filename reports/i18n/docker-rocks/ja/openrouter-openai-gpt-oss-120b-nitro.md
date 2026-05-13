# Translation Candidate
- Slug: docker-rocks
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 0.78
- Input tokens: 1947
- Output tokens: 535
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000172
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-11--docker-rocks/ja/index.mdx reports/i18n/docker-rocks/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Dockerは最高、OSXでも動作
subTitle: Dockerは驚くほど高速で柔軟です。
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

> Updates September 2016, 2018  
> Boot2Docker は Docker for Mac に置き換えられました

> 歴史的注記: 本記事は意図的に 2015 年頃の Docker-for-Mac のスナップショットとして残しています。パフォーマンスに関する助言やツール名はその時点のものです。現在の Docker Desktop と Compose のワークフローはすでに進化しています。

1. Docker は驚くほど高速で柔軟です。  
2. 以前のツール、特に boot2docker は遅く、クラッシュしやすいものでした。

Docker は現在、Linux カーネル v3.4 以上でネイティブに動作できます。実際の boot2docker VM は v4 を実行しています。

ハードウェアを最大限に活かすには、Mac/Windows マシンに最新の Debian または Ubuntu をインストールしてください。

... まあ、あのゲームはコードの学習になりませんね...

### 設定を確認

`docker info` コマンドの出力を確認します。

1. セキュリティ: リモートネットワークから `nmap` で予期しない開放ポートがないかチェックする  
2. DNS: ローカルキャッシュまたは低遅延の DNS サーバーを使用する  
3. ストレージ: 正しいストレージドライバーを使用する（`overlay2` がほとんどの場合に適します）

2024 年更新:

- Docker Desktop はプロプライエタリですが、個人利用は無料です。OSX または Windows で Docker を始めるには最適な手段です。  
- もっとオープンソース志向の解決策を求めるなら、[Rancher Desktop](https://rancherdesktop.io/) をチェックしてください。
````
