# Translation Candidate
- Slug: docker-firewall-setup
- Locale: ja
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2015-06-06--docker-firewall-setup/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.00
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-firewall-setup --locale ja --model qwen/qwen3.6-plus --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
title: Dockerファイアウォール設定
subTitle: Dockerホストのファイアウォール設定
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
## Dockerホストのファイアウォールを設定する

1. Debian/Ubuntu Serverを前提とする
1. Docker Host Server上での動作を想定

### 必要なパッケージのインストール

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### 内部IPアドレスと外部IPアドレスを取得する

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses
~~~

# または ip ツールを使用する例:
ip addr
~~~

### ファイアウォール (UFW) の設定 - コマンド例

~~~sh
ufw logging on # on=low - 診断には medium の方が良い場合がある
ufw logging medium
# まず、すべてをブロック
ufw default deny incoming

# 必須: 以下のデフォルトアウトバウンドルールから1つを選択:
ufw default deny outgoing
ufw default allow outgoing

# 新しいSSH接続を許可してログ記録
ufw allow log proto tcp from any to any port 22
## HTTPトラフィックを許可（明示的なログ記録なし）
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# 冗長版: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # 基本レート制限: SSHブルートフォース対策 (4回)
~~~

# Set your ext IP
export EXTERNAL_IP=123.123.123.123
# Update docker IP if needed
export DOCKER_IP=172.17.42.1
# Forward tcp 8080 traffic to  Dockerized App
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## ファイアウォールの有効化 / 起動

> 注意: SSHポート（sshdのデフォルトは22）をロックアウトしないように注意してください

~~~sh
ufw --force enable

ufw reset
~~~

-----------------

### ファイアウォールのテスト

> 重要: リモートのIPアドレス/ロケーションを使用すること

~~~sh
# Verify dependency
apt-get update && apt-get install -y nmap

# Set scan target
export TARGET_HOST=123.123.123.123

# Example Scan Commands:
# Fast open port check
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Thorough scan
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Svc Inspection
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> 完了！これで、設定したポートだけが表示されるはずです！
````
