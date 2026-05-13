# Translation Candidate
- Slug: docker-firewall-setup
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.32
- Input tokens: 4097
- Output tokens: 923
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000326
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-firewall-setup --locale ja
## Raw Output

````mdx
---
title: Docker ファイアウォール設定
subTitle: Docker ホストのファイアウォール設定
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
## Docker ホストのファイアウォール設定

1. Debian/Ubuntu Server を前提とする  
1. Docker ホストサーバ上で実行することを想定

### 必要なパッケージのインストール

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### 内部 IP と外部 IP の取得

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses
```

# または ip ツールを使用、例:
ip addr
~~~

### ファイアウォール (UFW) 設定 - コマンド例

~~~sh
ufw logging on # on=low - medium の方が診断には適しているかもしれません
ufw logging medium
# まず、すべてをブロックします
ufw default deny incoming

# 必須: 以下のデフォルトアウトバウンドルールのいずれか **1つ** を選択してください
ufw default deny outgoing
ufw default allow outgoing

# 新規 SSH 接続を許可し、ログを記録
ufw allow log proto tcp from any to any port 22
## 明示的なロギングなしで HTTP トラフィックを許可
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# 詳細: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # 基本的なレート制限、SSH のブルートフォース対策
```

# ext IP を設定
export EXTERNAL_IP=123.123.123.123
# 必要に応じて Docker の IP を更新
export DOCKER_IP=172.17.42.1
# tcp 8080 のトラフィックを Docker 化されたアプリへ転送
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## ファイアウォールを有効化 / 起動

> 注意: SSH ポートをロックアウトしないこと (sshd のデフォルトは 22)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------

### ファイアウォールのテスト

> 重要: リモートの IP アドレス／ロケーションから実行してください

~~~sh
# 依存関係の確認
apt-get update && apt-get install -y nmap

# スキャン対象の設定
export TARGET_HOST=123.123.123.123

# 例示的なスキャンコマンド:
# 高速オープンポートチェック
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# 徹底的なスキャン
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# サービス検査
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> 完了！設定したポートだけが表示されるはずです！
````
