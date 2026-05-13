# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/ja/index.mdx
- Validation: passed
- Runtime seconds: 0.72
- Input tokens: 2131
- Output tokens: 612
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000193
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === 愛
subTitle: 'Dockerは何でもできる :allthethings:!'
date: '2015-02-26'
modified: '2024-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - devops
  - patterns
related:
  - docker-server-setup-notes
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker Can Do Everything!*

> 歴史的な注記: これは 2015 年時点の Docker 熱狂とローカル開発の習慣を、主にタイムカプセルとして保存したものです。コマンドやセキュリティ姿勢は、最新化の出発点として捉え、実運用の指針とは見なさないでください。

プロセスを改善しましょう:

1.  開発ツールやサーバーをテストする際、PC の依存関係を **ほぼゼロリスク** で壊さない
1.  ソフトウェアのテスト
1.  より冪等でモジュール化されたコードを書くようになる…（実装方法は後日追記します）

学ぶべき新しい項目が大量にあるように見えるかもしれませんが、**それが開始の障壁になるようなことはありません**。

### Notes

- `docker run` コマンドで `-d` または `-it` オプションが付いている場合:
  _ `-it`（または `-i -t`）は、設定されたコマンドを対話的に実行します  
  _ `-d` はコンテナをデーモン（バックグラウンドサービス）として起動します。

---

### EXAMPLES

### nginx

```bash
# Note: using host-based, shared folders
#(shared folders are not possible with the VOLUME Dockerfile cmd)
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## Local data, isolated within instance
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> Credits: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)  
> Docker は _SDLC 全体_ を通して作業を楽にします。

> - かなり近いです
````
