# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.33
- Input tokens: 1998
- Output tokens: 1353
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000485
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-03-12--docker-makes-everything-better/ja/index.mdx reports/i18n/docker-makes-everything-better/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker ＝＝＝ ラブ
subTitle: ''
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
## Dockerはすべてを実現できる！\*

> 歴史的注釈: この記事は2015年時点のDockerへの熱狂とローカル開発の習慣をタイムカプセルとして保存したものです。記載されたコマンドとセキュリティポリシーは現代化の出発点として扱い、本番環境での運用指針ではありません。

以下のプロセスを改善できます:

1.  PCの依存関係を壊すほぼゼロのリスクで開発ツールやサーバーのテスト
1.  自社ソフトウェアのテスト
1.  同形性・モジュール性の高いコードを書くよう促進...(実現方法については続編で具体的に書きます)

学ばなければならない新知識がたくさんあるように思えるかもしれませんが、**その障壁にとまらせてはいけません**。

### 注釈

- `docker run` コマンドに `-d` または `-it` オプションが含まれている場合:
  _ `-it` または `-i -t` は構成されたコマンドを対話的に実行します
  _ `-d` は Docker コンテナを 'デーモン' として、つまりバックグラウンドサービスとして起動します

---

### 例

### nginx

```bash
# ホストベースの共有フォルダを使用することに注意してください
#（VOLUME Dockerfile コマンドでは共有フォルダは使用できません）
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## ローカルデータをインスタンス内で隔離
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> 出典: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
> Docker は _完全な_ SDLC においてあなたの人生をより簡単にするでしょう。

> - かなり近い
````
