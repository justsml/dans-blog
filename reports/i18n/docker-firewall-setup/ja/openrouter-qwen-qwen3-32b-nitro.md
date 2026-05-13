# Translation Candidate
- Slug: docker-firewall-setup
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/ja/index.mdx
- Validation: passed
- Runtime seconds: 8.61
- Input tokens: 3257
- Output tokens: 3403
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001077
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Docker ファイアウォール設定
subTitle: ''
draft: true
date: '2015-06-06'
modified: '2016-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - security
  - devops
cover: ../charles-deluvio-456501-unsplash.webp
cover_mobile: ../w300_charles-deluvio-456501-unsplash.webp
cover_icon: ../icon_charles-deluvio-456501-unsplash.webp
---
## Dockerホストのファイアウォールの設定

1. Debian/Ubuntuサーバーが想定されている
1. Dockerホストサーバー上で実行することを設計している

### 必要なソフトウェアのインストール

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### 内部および外部IPアドレスの取得

~~~sh
# IPアドレスを取得、簡潔な出力:
hostname --all-ip-addresses
~~~

# またはipツールを使用する: 例:
ip addr
~~~

### ファイアウォール (UFW) の設定 - 例コマンド

~~~sh
ufw logging on # on=低 - 診断にはmediumが適しているかもしれません
ufw logging medium
# 最初にすべてをブロック
ufw default deny incoming

# 必須: 次のデフォルトのアウトバウンドルールのいずれか*1つ*を選択してください:
ufw default deny outgoing
ufw default allow outgoing

# すべての新しいSSH接続を許可しログする
ufw allow log proto tcp from any to any port 22
## HTTPトラフィックを許可 (明示的なログなし)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# 詳細: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # SSHのブルートフォース攻撃対策のためのレート制限
~~~

# 外部IPの設定
export EXTERNAL_IP=123.123.123.123
# 必要に応じてDocker IPを更新
export DOCKER_IP=172.17.42.1
# TCP 8080 トラフィックを Docker アプリケーションに転送
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## ファイアウォールの有効化/起動

> 注意: SSHポート（デフォルトは22）をロックアウトしないようにしてください

~~~sh
ufw --force enable

ufw reset
~~~

### ファイアウォールのテスト

> 重要: リモートのIPアドレス/ロケーションを使用してください

~~~sh
# 依存関係の確認
apt-get update && apt-get install -y nmap

# スキャン対象の設定
export TARGET_HOST=123.123.123.123

# 例: スキャンコマンド
# 高速オープンポートチェック
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# 詳細スキャン
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# サービス検出
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> 完了！この時点で、設定したポートのみが表示されるはずです！
````
