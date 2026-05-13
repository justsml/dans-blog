# Translation Candidate
- Slug: docker-rocks
- Locale: ja
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2015-06-11--docker-rocks/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-rocks --locale ja --model qwen/qwen3.6-plus --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker最高、OSXでも動作可能に
subTitle: Dockerは素晴らしく、高速で柔軟です
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

> 2016年9月、2018年更新
> Boot2Docker は Docker for Mac に置き換えられました

> 歴史的注記：この記事は意図的に2015年当時のDocker for Macのスナップショットとして保存されています。パフォーマンスに関するアドバイスやツール名はその時点のものを反映しており、現在のDocker DesktopやComposeのワークフローは進化しています。

1. Dockerは素晴らしく、高速で、柔軟です。
1. 以前のツール、特にboot2dockerは遅く、クラッシュしやすかった。

Dockerは現在、Linuxカーネルv3.4以上でネイティブに動作します。そして現在のboot2docker VMは実際にv4を実行しています。

ハードウェアを最大限活用するには：Mac/Windowsマシンに最新のDebianまたはUbuntuをインストールし、

… さあ、ゲームはコードの役に立たないぞ…

### セットアップを確認する

`docker info` コマンドの出力を確認しよう。

1. セキュリティ：サーバー上で予期せず開いているポートがないか確認する（リモートネットワークから `nmap` を使う）
1. DNS：ローカルキャッシュまたは低レイテンシのDNSサーバーを使う。
1. ストレージ：適切なストレージドライバーを使う（`overlay2` が推奨）

2024年更新：

- Docker Desktop はプロプライエタリだが、個人利用は無料。OSX や Windows で Docker を始めるには最適な方法だ。
- よりオープンソースなソリューションを探しているなら、[Rancher Desktop](https://rancherdesktop.io/) をチェックしてみよう。
````
