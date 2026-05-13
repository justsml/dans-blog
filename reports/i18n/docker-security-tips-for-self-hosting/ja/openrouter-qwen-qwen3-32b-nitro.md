# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale ja --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
title: セルフホスティング必須Dockerセキュリティ対策
subTitle: 自己ホストサービスを防御から監視までしっかり保護！
date: '2025-01-04'
modified: '2025-07-09'
tags:
  - docker
  - security
  - devops
  - containers
  - best-practices
category: Security
social_image: ../desktop-social.webp
cover_full_width: ../docker-ukiyo-e-wide.webp
cover_mobile: ../docker-ukiyo-e-container-square-200.webp
cover_icon: ../docker-ukiyo-e-container-square-200.webp
cover_credit: © 2025 Dan Levy
---
import {CodeTabs} from '../../../../../components/CodeTabs';

**目次**

- 🧗‍♀️ [勇者へ](#️-for-the-brave)
- 🔄 [`:latest` ダンス](#-the-latest-dance)
- 🔐 [シークレット管理：正しいやり方](#-secrets-management)
- 🌐 [ネットワークリスク](#-network-hazard)
- 🛡️ [アクセス制御](#️-access-controls)
- 🔍 [監視と検証](#-monitoring--verification)
- ⏰ [見落としがちなヒント](#-often-overlooked-tips)
- 🚀 [本番チェックリスト](#-production-checklist)
- 📚 [さらに読む](#-further-reading)

## 🧗‍♀️ 勇者へ

Docker サービスを自前でホストするなら、セキュリティは上から下まで自分の責任です。ポートスキャンや設定ミスから守ってくれるクラウドプロバイダーは存在しません。自宅ネットワーク上でアプリを立ち上げるにせよ、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloud といったプロバイダーの VPS を借りるにせよ、すべてをロックダウンし、正しく設定したことを検証しなければなりません。

本ガイドでは、Docker のセキュリティを段階的に解説します。`あまり知られていない` 手法から `正しく実装しにくい` 手法まで取り上げ、カナリートークン、読み取り専用ボリューム、ファイアウォールルール、ネットワーク分離とハードニング、認証付きプロキシの追加などを実践的に見ていきます。

自宅ネットワークとパブリッククラウドの構成を比較し、Nginx でベーシック認証プロキシを設定する方法も示します。最後まで読めば、不要な侵入者（友人や家族、時には自分自身さえ）を排除するための選択肢がいくつか手に入ります。

やることは結構多いですが、ほとんどは相互に関連しており、環境に最も適したものだけを選んで実装できます。 🍀

## 🔄 `:latest` ダンス

イメージを最新に保つことはセキュリティ上重要です。ただし、`:latest` に依存すると、レビュー工程なしで破壊的な変更や脆弱なビルドが流入するリスクがあります。

### 安全な更新手順

`pull` や `build` と組み合わせた更新コマンドを実行し、意図的にイメージをリフレッシュします。その後、破壊的な変更に気付くことができるウィンドウでコンテナを再起動します。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### バージョン固定 vs :latest

適切なバージョンを固定する判断は、安定性とセキュリティのトレードオフです。代表的な方針をいくつか示します。

```yaml
# docker-compose.yml
# ...
  # 正確なバージョン固定、クリティカルなサービスに最適
  image: postgres:17.2

  # パッチバージョン固定、重要度が低いサービスに適す
  image: postgres:17.2

  # メジャーバージョン固定、趣味プロジェクトに最適
  image: postgres:17

  # Yolo、できるだけ避けるべき
  image: postgres:latest
```

[Dependabot](https://github.com/features/security) や [Renovate](https://github.com/renovatebot/renovate) を使って、レビュー可能な更新 PR を自動生成させましょう。深夜 2 時にビルドが壊れるのが嫌なら、特定のバージョンまたはダイジェストに固定し、移行のタイミングは自動化に任せます。

_最新の Docker イメージを保つために使っているツールがあれば教えてください！_

## 🔐 シークレット管理

- [Generate Strong Secrets](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Upgrade from `.env` to MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

シークレットを管理する方法は数多くありますが、最も重要なルールの一つは **Docker イメージにシークレットをハードコードしたり、git にコミットしたりしない** ことです。これは最も一般的なセキュリティミスの一つで、長期的なリスクを招き、修正にも多大な手間がかかります。

シークレットを安全に保管するテーマは広範で、`.env` ファイル、[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)、あるいは [HashiCorp Vault](https://www.vaultproject.io/) や AWS Secrets Manager といったシークレットマネージャーなど、さまざまな選択肢があります。

自分のユースケースに合わせて、**適切な労力とセキュリティのレベル** を選択する必要があります。

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>
*/}

<p className='inset'>💡 シークレットは常に一意であることを保証しましょう。安全でないハードコーディングされたデフォルトで実行できないようにします。</p>

シークレットに `__WARNING_REPLACE_ME__` のようなプレースホルダーを残しておくと、誰かが気付くかもしれません！

念のため、わずかな手間で実行時の安全性を追加できます。以下は JavaScript、Rust、Go での実装例です：

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Unsafe secrets detected:", missingSecrets);
    process.exit(1);
  }
};

validateSecrets();
```

```rust
// validate_secrets.rs
use std::env;

fn validate_secrets() {
    let unsafe_placeholder = "__WARNING_REPLACE_ME__";
    for (key, value) in env::vars() {
        if value.contains(unsafe_placeholder) {
            panic!("Unsafe secret in {}", key);
        }
    }
}

fn main() {
    validate_secrets();
}
```

```go
// validate_secrets.go
package main

import (
	"fmt"
	"os"
	"strings"
)

func validateSecrets() {
	placeholder := "__WARNING_REPLACE_ME__"
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 && strings.Contains(pair[1], placeholder) {
			panic(fmt.Sprintf("Unsafe secret in %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

*/}

### 強力なシークレットを生成する

以下は `.env` ファイル用に新しいシークレットを生成する小さなスクリプトです:

```bash
#!/bin/bash
# generate-secrets.sh

generate_secret() {
    local length=${1:-30}
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}

[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "New .env file generated with secure random values!"
```

### カナリアトークン

[**Canary Tokens**](https://canarytokens.org/) は、シークレットが漏洩（そして使用）されたかどうかを検知する優れた手段です。任意の機密ファイル、URL、トークンに設置できるトリップワイヤーのようなものです。

実際に心配しているシークレットの隣に配置しましょう: `.env` ファイル、CI 変数、パスワードマネージャ、バックアップフォルダ、クラウド認証情報など。演出に走らず、実際の攻撃者や将来の自分が触れそうな場所にトリップワイヤーを設置してください。

選択肢は豊富です。AWS トークン、[偽クレジットカード](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html) 番号、Excel・Word ファイル、Kubeconfig ファイル、VPN 認証情報、さらには SQL ダンプファイルまでトリップワイヤーにできます。

#### カナリアトークンのベストプラクティス


- **どこにでも配置**: すべての `.env` ファイル、CI/CD パイプライン、そして思いつく「シークレットマネージャ」へ。
  - ホームディレクトリに `passwords.xlsx` や `passwords.docx` を置く。
  - `billing_prod` という AWS プロファイルにカナリアトークンをシークレットとして設定する。
  - `~/.ssh` ディレクトリ用に `private.key` ファイルを生成する。
  - `~/backups` ディレクトリにカナリア用 SQL ダンプ `all_credit_cards.sql` を作成する。
- **監視**: カナリアトークンが発火したときに捕捉できるよう、メールルールやアラートを設定する。

### `.env` から macOS キーチェーンへの移行

Mac ユーザー向けに、最も手軽な選択肢の一つがキーチェーンの利用です。

OSX キーチェーンからシークレットを自動的にロードするシンプルな方法を示します。`TouchID` に対応し、`.env` ファイルよりもやや安全です。

元の実装は <cite> [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) と [Jan Schaumann](https://www.netmeister.org/) にクレジット</cite> です。

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### OSX キーチェーンから環境変数を取得・設定する関数 ###
### 参考: https://www.netmeister.org/blog/keychain-passwords.html と
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# 使い方: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# 使い方: set-keychain-secret SECRET_ENV_VAR
# プロンプトが表示され、シークレット値を入力します
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # ユーザーにシークレット入力を促す
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# 現在のシェルに環境変数をロード
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# 注意: 攻撃者がシェルで `env` を実行できれば、これらのシークレットが漏洩する可能性があります
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# このプロジェクトで必要なシークレットをすべて指定
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# 注意: シェルラッパーを使うことで、シークレットが環境に残り続けるのを防げます。
# かつ、リポジトリにコミットしても安全です。

# 使用例:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ...
```
</CodeTabs>

## 🌐 ネットワークリスク

### カスタムネットワークと内部ポート

Docker ネットワークでサービスを適切に分離することは、攻撃対象領域を削減する重要な手段です。

ネットワークに穴を開ける際は注意が必要です。設定ミスしたポート転送は深刻な障害につながります。

デフォルトでは、プライベート LAN 上のサービスはインターネットに公開されません。ルータからポートを明示的に転送しなければなりません。

### LAN 上の Docker

開発用サーバをローカルで動かす開発者であれ、ローカルネットワーク上でサービスをセルフホストするユーザーであれ、**Docker のネットワークモデルに対する前提がトラブルの原因になることがあります。**

開発者は、Linux サーバを保護する「従来型」の手法（`iptables` や tcp/ip sysctl オプションの制限）が **Docker ホスト上では黙って失敗する** ことに驚くことが多いです！特に **セルフホストや典型的な家庭用ネットワークで実行している場合** に顕著です。（裏側の方へ：これにより MacBook 上の開発コンテナに外部からアクセスできてしまうことがあります!!!）

> ⚠️ **Warning #1:** Docker が公開したポートは、Ubuntu/Debian の UFW などで設定したファイアウォール規則を迂回できることがあります。これはすべてのファイアウォール規則が無意味になるというわけではありませんが、「UFW が deny と出している」だけでは安全性の証明にはなりません。 [Issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690) を参照してください。

> ⚠️ **Warning #2:** ローカル IP アドレスにバインドする（例: `-p 127.0.0.1:8080:80`）のがデフォルトとして正しいですが、Docker Engine 28.0.0 未満のバージョンでは、同一 L2 ネットワーク上のホストが localhost に公開されたポートに到達できるケースがありました。 [Docker のポート公開ガイド](https://docs.docker.com/engine/network/port-publishing/) でもこの注意点が記載されており、以下の nmap での検証習慣は依然として有用です。

<p class="inset">この事実に驚いたら、同感です！</p>

**ローカル IP へのバインドは依然として有効なベストプラクティス** であり、**マネージドクラウド環境や特別に構成されたネットワーク** では実質的な効果があります。 
{/* ファイアウォールやプライベートネットワークだけを唯一の防御手段と考えず、Docker ネットワークを組み合わせて **分離** を強化し、ポートを公開する必要が本当にあるか常に検討してください。 */}

### Example Docker Compose

以下は `app` サービスを `127.0.0.1:8080` にバインドし、両コンテナを `backend` カスタムネットワークに接続する例の `docker-compose.yml` ファイルです。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # 可能であれば localhost にバインド
      - "127.0.0.1:8080:8080"
    # ... その他の設定
  database:
    image: postgres:17.1
    # ポート公開は不要。backend ネットワーク内からアクセス可能。
    networks:
      - backend

```

{/* #### Test & Verify

すべてのセキュリティ対策と同様に、ネットワーク構成を **テストし検証** することが重要です。 */}

{/* 多くの企業ではネットワークセキュリティと監査はフルタイムの責務ですが、セルフホストユーザーはほとんど時間を割いていません！ */}

{/* 正直言うと、 intimidating です。 _(サブネット、ネットマスク、CIDR、VLAN、ルーティングテーブル… もし意味が分からなくても大丈夫、ここが正しい場所です。今はそれらを気にする必要はありません。)_ */}

### Network Best Practices

- 🏆 **ポートは一切公開しない** 最近、これが思った以上に有用だと実感しました。名前付き（ブリッジ）ネットワークを使用すると、コンテナ同士はフィルタリングされていない状態で相互にアクセスできます。ローカルネットワーク（NAT ゲートウェイ）背後にいるかのように振る舞います。
  - すべてのユースケースで可能ではありませんが、バッチジョブを実行するコンテナや `attach` / `exec` で主にアクセスするコンテナには有用です。
- 🥇 **Docker Networks を使用** して、どのコンテナが相互に通信できるかを分離・制御します。
- 🥉 **ローカルホストバインドを使用**: 完全ではありませんが（[不完全な実装](https://github.com/moby/moby/issues/45610)）、通常はポートをループバックアドレス（例: `127.0.0.1:8080:80`）にバインドした方が安全です。必ず [設定を検証してください。](#-monitoring--verification)

## 🛡️ Access Controls

アクセス制御は Docker サービスのセキュリティにおいて重要な要素です。ここにはコンテナの機能・権限の制限、Docker ソケットへのアクセス制限などが含まれます。

- [Limiting Container Capabilities](#limiting-container-capabilities)
- [Docker Socket Access](#docker-socket-access)
- [Blocking Country!](#blocking-country)
- [Hardening CloudFlare Proxy Host](#hardening-cloudflare-proxy-host)

### Limiting Container Capabilities

もう一つの堅実なアクセス制御手法は、コンテナの機能（capabilities）を制限することです。これにより、特権昇格やトラフィックハイジャックといった脅威のブラスト半径が縮小されます。完全な防御壁ではありませんが、ほとんどのコンテナが不要とする権限を除去します。

**capabilities とは何か？** Linux カーネルが定義する名前付き権限や機能です。（[`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) の man ページに全一覧があります。）例として `CAP_CHOWN`（ファイル所有者変更）、`CAP_NET_ADMIN`（ネットワークインターフェース設定）、`CAP_KILL`（任意のプロセス終了）などがあります。

必要な capabilities を判断する方法は二つあります。

1. **トライアル＆エラー**: 最初は何も付与せず、アプリが動作するまで一つずつ追加していく方法です。時間はかかりますが確実です。
2. **既存の事例を探す**: `"project-name" "cap_drop" Dockerfile` や `"project-name" "cap_drop" docker-compose.yml` で検索し、他者がすでに行った設定を参考にします。LLM が出発点を示すこともありますが、コンテナをテストしイメージのドキュメントを読むまで仮定として扱ってください。

#### Capabilities Best Practice

- **すべての Capabilities をドロップ**: `cap_drop: [ ALL ]` を使用してコンテナからすべての Linux capabilities を除去します。
- **No New Privileges**: `security_opt: [ no-new-privileges=true ]` を設定し、コンテナが新たな権限を取得することを防ぎます。

```yaml title="Example: Drop/Limit Capabilities" {5-14}
services:
  database:
    image: postgres:17.1
    networks: [ db-network ]
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - DAC_READ_SEARCH
      - FOWNER
      - SETGID
      - SETUID
  db-admin:
    image: dpage/pgadmin4:4.1
    networks: [ db-network ]
    ports:
      - "8081:80"
    # ... その他の設定
networks:
  db-network:
```

これでサービス同士は `db-network` ネットワーク上で相互に通信できます。Docker Compose が自動的にそのネットワークを作成します。

**`--external` / `external:` オプション** を使うと **既存のネットワーク** に参加できます。省略すれば新規ネットワークが作成されます。

### Docker Socket Access

#### ⚠️ Warning: `docker.sock` は基本的にホスト管理者権限です

<blockquote class="inset">⚠️ `:ro` オプションはソケット経由の I/O には影響しません！</blockquote>

これはソケットパス自体を読み取り専用でマウントするだけです。そのソケットを通して送られる API 呼び出しは、コンテナの作成やホストパスのマウント、その他本来委譲したくないような操作を依然として行えます。

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Socket Best Practice

- 🥇 **Docker ソケットのマウントは避ける**、代替手段があるはずです。  
- 🫣 どうしても必要な場合は、**狭いプロキシを前に置き**、アプリが実際に利用する API エンドポイントだけを許可します。Tecnativa が元々作った `docker-socket-proxy` プロジェクトを参照してください、[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy)。その上で、拒否された呼び出しが本当にブロックされていることを確認します。  
- 🤢 まあ、**極めて高い信頼性**かつ**低リスク**なテスト環境であれば、共有しても問題ないかもしれません。

#### Blocking Country!

時には便利ですが、実質的なセキュリティ境界にはなりません。

_地政学的な実体について語っているのであって、音楽のことではありません…_

ローカルの家族や友人向けにアプリをホスティングしている場合、期待しない国からのトラフィックをブロックできます。あるいは、期待する国からのトラフィックだけを許可することも可能です。ノイズは減りますが、VPN、プロキシ、ボットネット、あるいは根気強い攻撃者を止めることはできません。

中国からのすべてのトラフィックをブロックするスクリプトを確認してください：
```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done
```

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同様に、米国からのトラフィックだけを許可することもできます。

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### CloudFlare プロキシホストのハードニング

自宅サーバーが CloudFlare の IP（プロキシ）で保護されている場合、アクセスを CloudFlare の IP のみ、そしてローカルネットワークに限定できます。

これは上記の[Country blocking](#blocking-country)と似ていますが、はるかに厳格な制御になります。

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # すべての受信をブロック!!!
ufw default allow outgoing # すべての送信を許可
ufw allow ssh # SSH を許可

# ローカルサブネットへのアクセスを許可（ホストサービス用に専用 DMZ/VLAN を推奨）
ufw allow from 10.0.0.0/8 to any port 443
```

# CloudFlare の IP を許可
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6 対応を追加
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

ジオベースの変更をテストするには、対象国に拠点を持つ VPN を使うと便利です。詳細は [Monitoring & Verification](#-monitoring--verification) セクションをご覧ください。

### アプリケーション層のセキュリティ

[ネットワークとホストのハードニングが完了したら](#-network-hazard)、さらにやるべきことが出てくるかもしれません。

次はサービス自体の「アプリケーション」層について考える必要があります。

<p class="inset">そのデータベースは有効なパスワードを持っていますか？このコンテナは HTTPS／証明書を自動化していますか？アプリに組み込み認証はありますか？サインアップできるメールアドレスに制限はありますか？デフォルトの認証情報や変更すべき環境変数はありませんか？</p>

実際に**確認**しなければ分かりません。まずは `README` と `docker-compose.yml`、`Dockerfile`、`.env.*` といった重要ファイルをチェックします。プロジェクト本体だけでなく、可能であれば支援サービス（例：Postgres、Redis など）も同様に確認してください。

#### リバースプロキシ

防御のもう一層としてベーシック認証があります。HTTPS なしで使用しないでください。レガシーサービスの場合、管理用ルートの前にベーシック認証を置くだけで、ドライブバイリクエストや認証されていないクローラが直接エンドポイントを叩くのを防げます。

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

認証情報を生成する:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

ベーシック認証プロキシを介すことで、攻撃者は内部サービスに到達する前に **ユーザー名とパスワード** という追加のハードルに直面します。

別の選択肢として、[Traefik](https://traefik.io/) や [Caddy](https://caddyserver.com/) のように HTTPS とベーシック認証を自動化してくれるサービスを利用する方法もあります。

もし多数のドメインやサービスを GUI で管理したいなら、[Nginx Proxy Manager](https://nginxproxymanager.com/) を推奨します。

## 🔍 監視と検証

- [Check Your Ports](#check-your-ports)
- [View Open Ports](#view-open-ports)
- [File Monitoring](#file-monitoring)

これは **最も重要で、最も見落とされがちなステップ** です。最高のファイアウォール、最高のネットワーク、最高のベストプラクティスを揃えても、検証しなければ機能しているかどうか全く分かりません。

さらに、数個のコマンドを覚えているか、あるいはどこで調べられるかが、侵害を防ぐかどうかの分かれ目になります。ハッカー気分を味わえるのは余分なご褒美です。（詳細や例は、[Monitoring & Verification](#-monitoring--verification) セクションへ先に進んでください。）

<p class="inset">信頼せず、二度検証せよ</p>

### ポートの確認

<p class="inset">⚠️ IMPORTANT: Do not scan hosts you do not own.</p>

自宅ネットワークでも VPS でも、外部から開いているポートを把握しておく必要があります。

やり方は 2 通りです。

- ネットワークスキャンツールを使う（`nmap`、`masscan`）
- OS に問い合わせる（`lsof`、`netstat`、`ss`）

#### ネットワーク外からのテスト

まず自分の現在の（パブリック）IP アドレスを取得します。`ifconfig.me` などのサービスを使えば簡単です: `curl https://ifconfig.me`。あるいはホスティングプロバイダーのダッシュボードで確認してください。

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

パブリック IP が分かったら、**外部ネットワークから接続して確認**します。友人の PC、スマホの 5G ホットスポット、あるいは専用サーバーを利用してください。

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Note: Ensure `target_host` is the desired IP

# 特定ポートだけスキャン:
nmap -A -p 80,443,8080 --open --reason $target_host
# 上位 100 ポート:
nmap -A --top-ports 100 --open --reason $target_host
# 全ポート:
nmap -A -p1-65535 --open --reason $target_host
```

#### ネットワーク内部でのテスト

`nmap` を使ってローカルネットワークやサーバーを走査し、ルータ、プリンタ、スマート冷蔵庫などを確認しましょう。

{/* ポートスキャンは日常的な作業ですが、米国では CFAA（Computer Fraud and Abuse Act）に抵触する可能性があります。所有しているものだけをスキャンしてください。 */}

#### サンプルスキャンコマンド

```bash

# ローカルホストのすべての開いているポートをスキャン
nmap -sT localhost

# マシンのプライベート IP に対してサービスをスキャン
nmap -sV 192.168.1.10

# ネットワーク上のサービス詳細を取得
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# または Docker の 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap Scan" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Starting Nmap 7.95 ( https://nmap.org ) at 2025-01-06 13:51 MST
Nmap scan report for dev02.local (192.168.0.87)
Host is up, received syn-ack (0.0067s latency).
Not shown: 995 closed tcp ports (conn-refused)
PORT     STATE SERVICE     REASON  VERSION
22/tcp   open  ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   open  http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  open  ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp open  http        syn-ack Node.js Express framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.36 seconds
```

### 開いているポートの確認

`lsof` に慣れましょう。MacOS と Linux で利用可能で、ネットワーク状態やディスクアクティビティを細かく表示します。

```bash title="lsof Commands"
# 特定ポートを監視
sudo lsof -i:80 -Pn
```

# ESTABLISHED 接続の監視
sudo lsof -i -Pn | grep ESTABLISHED
# LISTEN 状態の表示
sudo lsof -i -Pn | grep LISTEN

# IP アドレスの代わりにネットワーク名を表示（逆引き DNS で遅くなることがあります）
sudo lsof -i -P | grep LISTEN

# すべてのネットワーク接続を監視
sudo watch -n1 "lsof -i -Pn"

```

#### Example Output

![nmap scan for listeners](../lsof-scan-listen.webp)

### ファイル監視

**プロセス** が消費している **ディスク帯域幅** の多いものを特定したい場合は `iotop` を使います:

```bash
sudo iotop
```

個別ファイルの変更を確認したいときは、Linux では `inotifywait`、MacOS では `fswatch` を利用します:

フォルダ単位やシステム全体で不正な挙動や異常を検知するのに便利です。

```bash
# ディレクトリ内のすべてのファイル変更を監視
sudo inotifywait -m /path/to/directory
```

MacOS では `fswatch` を使えます:

`brew install fswatch` でインストール

```bash
fswatch -r /path/to/directory
```

```

## ⏰ 見落としがちなポイント

1. **認証試行やその他重要エンドポイントへのレートリミット**  
   Nginx の `limit_req` モジュールや SSH 用 `fail2ban` でのスロットリングは、*多分* 必要です。IPv6 や低コストのボットネットが氾濫する時代では、かつてほど単純ではありませんが、ブルートフォース攻撃を抑制するのは賢明です。

2. **可能な限り読み取り専用ボリュームを使用**:
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   非特権ユーザーや最小限のフォルダー権限と組み合わせることで、`:ro` マウントはコンテナ内部からの偶発的な変更や書き込み試行に対する追加の防御層を提供します。ただし、既に広範な権限を持つプロセスからホストを守るものではありません。

3. **コンテナへのアクセスを定期的に監査**  
   コンテナがシークレット、ポート、マウントを必要としない場合は削除してください。

4. **Wi‑Fi のリフラフに注意**  
   Wi‑Fi パスワードを誰にも教えないはずですよね？友人や家族に例外を作ることもあるかもしれませんが、どんなアプリがインストールされているか分からず、SSID とパスワードが外部に漏れるリスクがあります。

### 自宅ネットワーク vs. 公共プロバイダー vs. トンネリング

1. **仮想分離/DMZ**: 自宅サーバーは可能なら別 VLAN または DMZ に配置します。これにより、サーバー側からの侵害が内部デバイスに波及するリスクを低減できます。  
   - 自宅サーバー用に別ルーターまたは VLAN を使用する。  
   - 自宅サーバー用に別 Wi‑Fi ネットワークを用意する。  
   - 自宅サーバー用に別サブネットを割り当てる。

2. **クラウドプロバイダー**: Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloud ではそれぞれ異なるファイアウォール機能が提供されています。  
   - プロバイダーやサービスによってはポートがデフォルトでブロックされます。オプトインやアドオンで開放できる場合もあるので、利用しているサービスのドキュメントを確認してください。  
   - 多くのプロバイダーが高度なモニタリングや脅威検知サービスを提供しています。

3. **VPN とトンネリング**: 公衆インターネットに露出させずにサービス間を安全に接続するため、VPN 風のオプションやトンネリングサービスの利用を検討してください。  
   - TailScale、ngrok、ZeroTier。  
   - WireGuard、OpenVPN。

{/* 3. **内部/横方向攻撃へのハードニング**: 1 台の感染デバイスがネットワーク全体を危険にさらす可能性があります。Docker サービスをカスタムネットワークで分離し、ハードウェアや UFW ルールで不要ポートをブロックすることで、適切に構成された場合リスクを低減できます。 */}

## 🚀 本番チェックリスト

- [ ] **シークレット**: すべてのシークレットはランダムに生成し、安全に保管する  
- [ ] **アップデート**: コンテナ更新戦略を文書化し自動化する（テキストファイルに数行コマンドを書くだけでも可）  
- [ ] **ネットワーク**: 必要なポートだけを公開し、内部ネットワークを構築する  
- [ ] **ファイアウォールルール**: デフォルトは deny、明示的に allow、必要なら国別ブロックを設定  
- [ ] **リバースプロキシ**: Nginx、Caddy、Traefik でベーシック認証を追加できる  
- [ ] **カナリートークン**: 実際に調査対象となり得る機密ファイルや認証情報の近くに配置する  
- [ ] **モニタリング**: `nmap`、`lsof`、`inotifywait`、`glances` などでシステムを把握する  
- [ ] **バックアップ戦略**: テスト済みでできれば自動化、かつオフサイトに保管する  
- [ ] **最小権限**: 非 root コンテナユーザー、読み取り専用ボリュームを使用する  

## 📚 さらに読むべき資料

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org for Canary Tokens](https://canarytokens.org/)

## Thanks

感謝を込めて、熱心な Reddit ユーザーたちへ:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [スレッド](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/)</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

読んでくれてありがとう！ 本ガイドが役に立ったことを願っています。質問や提案があれば下記の SNS で気軽に連絡してください。また、`Edit on GitHub` リンクから PR を作成しても構いません！ ❤️
````
