# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- Validation: deferred
- Runtime seconds: 83.48
- Input tokens: 19791
- Output tokens: 10610
- Thinking tokens: unknown
- Cached input tokens: 8477
- Cache write tokens: 11290
- Estimated cost: $0.015164
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: セルフホスティングに欠かせないDockerセキュリティのヒント
subTitle: 防御から監視まで、セルフホストサービスを安全に！
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
import {CodeTabs} from '../../../../components/CodeTabs';

**目次**

- 🧗‍♀️ [勇者向け](#️-勇者向け)
- 🔄 [`:latest` のダンス](#-latest-のダンス)
- 🔐 [シークレット管理：正しいやり方](#-シークレット管理)
- 🌐 [ネットワークの危険](#-ネットワークの危険)
- 🛡️ [アクセス制御](#️-アクセス制御)
- 🔍 [監視と検証](#-監視と検証)
- ⏰ [見落とされがちなヒント](#-見落とされがちなヒント)
- 🚀 [本番環境チェックリスト](#-本番環境チェックリスト)
- 📚 [さらに読む](#-さらに読む)

## 🧗‍♀️ 勇者向け

Docker サービスをセルフホストするなら、セキュリティの責任は最初から最後まで自分にある。ポートスキャンや雑な設定から守ってくれるクラウドプロバイダーはいない。自宅ネットワークでアプリを立ち上げる場合でも、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloud などから VPS を借りる場合でも、きちんと防御し、正しく設定できたことを自分で検証する必要がある。

このガイドでは、Docker のセキュリティを、`lesser-known` な手法から `difficult-to-get-right` な手法まで見ていく。canary token、読み取り専用ボリューム、ファイアウォールルール、ネットワークの分離と強化、認証プロキシの追加などを扱う。

さらに、自宅ネットワークとパブリッククラウド環境を比較し、Nginx で基本認証プロキシを構成する方法も紹介する。読み終えるころには、ろくでもない連中（友人、家族、そして時には自分自身まで）を締め出すための選択肢がいくつか手に入っているはずだ……。

盛りだくさんだ！　ただ、その多くは互いに関係しているし、自分の構成に必要なものを選んで使えばいい。🍀

## 🔄 `:latest` のダンス

セキュリティのためには、イメージを最新に保つことが重要だ。ただし `:latest` に頼ると、確認なしに互換性を壊す変更や脆弱なビルドを取り込むことになりかねない。

### 安全に更新する方法

更新コマンドに `pull` または `build` を組み合わせて、意図的にイメージを更新する。そのうえで、問題が起きても気づける時間帯に再起動する。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### バージョン固定と latest

どのバージョンに固定するかは、安定性とセキュリティのバランスを取る作業だ。よくある戦略をいくつか挙げる。

```yaml
# docker-compose.yml
# ...
  # Exact version pinning, best for critical services
  image: postgres:17.2

  # Patch version pinning, good for non-critical services
  image: postgres:17.2

  # Major version pinning, perfect for hobby projects
  image: postgres:17

  # Yolo, avoid if possible
  image: postgres:latest
```

[Dependabot](https://github.com/features/security) や [Renovate](https://github.com/renovatebot/renovate) を使って、レビュー可能な更新 PR を作成させるといい。午前 2 時に再構築する羽目になったら泣きたくなるようなものは、特定のバージョンかダイジェストに固定し、更新すべきタイミングを自動化ツールに知らせてもらおう。

_Docker イメージを最新に保つために愛用しているツールがあれば、ぜひ教えてほしい！_

## 🔐 シークレット管理

- [強力なシークレットを生成する](#強力なシークレットを生成する)
- [Canary Token](#canary-token)
- [`.env` から MacOS Keychain に移行する](#env-から-macos-keychain-に移行する)
{/* - [プレースホルダーの検証](#プレースホルダーの検証) */}

シークレットを管理する方法は数多くあるが、必ず守るべき重要なルールがひとつある。**シークレットを Docker イメージにハードコードしたり、git にコミットしたりしてはいけない。** 最もよくあるセキュリティ上のミスのひとつであり、長期的なリスクになるうえ、後から直すのも厄介だ。

シークレットを安全に保管する方法は大きなテーマで、選択肢も多い。`.env` ファイル、[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)、あるいは [HashiCorp Vault](https://www.vaultproject.io/) や AWS Secrets Manager のようなシークレットマネージャーなどだ。

自分の用途に合った「手間とセキュリティ」の水準は、自分で選ぶ必要がある。

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>

<p className='inset'>💡 Ensure secrets are always unique. Try make it impossible to run with unsafe/hard-coded defaults.</p>

If you use placeholders like `__WARNING_REPLACE_ME__` in your secrets, great, maybe someone will notice!

Just in case, you can also add a little runtime safety with little effort. Here’s how you might do it in JavaScript, Rust, and Go:

<CodeTabs client:load tabs={["Helper commands", "Persist secrets in environment", "Use secrets per command"]}>

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

`.env` ファイル用の新しいシークレットを生成する小さなスクリプトを紹介する。

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

### Canary Token

[**Canary Token**](https://canarytokens.org/) は、シークレットが漏洩し、実際に使われたことを検知するのに有効だ。機密性の高いファイルや URL、トークンに仕掛けられるトリップワイヤーのようなものだ。

本当に気にしているシークレットのそばに仕掛けるといい。`.env` ファイル、CI 変数、パスワードマネージャー、バックアップ用フォルダー、クラウド認証情報などが候補になる。これを形だけの対策にしないこと。実際の攻撃者、あるいは将来の自分のミスが触れそうな場所に仕掛けよう。

Canary 「Token」にはさまざまな種類がある。AWS トークン、[偽のクレジットカード](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)番号、Excel や Word のファイル、Kubeconfig ファイル、VPN 認証情報などだ。SQL ダンプファイルにトリップワイヤーを仕掛けることさえできる。

#### Canary Token のベストプラクティス

- **あらゆる場所に配置する**: 思いつく限り、すべての `.env` ファイル、CI/CD パイプライン、「シークレットマネージャー」に仕掛ける。
  - ホームディレクトリに `passwords.xlsx` または `passwords.docx` ファイルを置く。
  - シークレットとして Canary Token を設定した `billing_prod` という AWS プロファイルを追加する。
  - `~/.ssh` ディレクトリに `private.key` ファイルを生成する。
  - `~/backups` ディレクトリに Canary SQL ダンプ `all_credit_cards.sql` を作成する。
- **監視する**: Canary Token が発火したことを検知できるよう、メールのルールやアラートを設定する。

### `.env` から macOS Keychain に移行する

Mac ユーザーなら、最も簡単な選択肢のひとつは Keychain を使うことだ。

以下は、OSX keychain からシークレットを自動ロードする簡単な方法だ。`TouchID` に対応しており、`.env` ファイルを使うより少し安全でもある。

原典へのクレジット: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) および [Jan Schaumann](https://www.netmeister.org/)。

<CodeTabs client:load tabs={[
  "ヘルパーコマンド",
  "シークレットを環境変数として保持",
  "コマンドごとにシークレットを使う"]
}>
```bash title="keychain-secrets.sh"
### Functions for setting and getting environment variables from the OSX keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
Original credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) and [Jan Schaumann](https://www.netmeister.org/).

# Use: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Use: set-keychain-secret SECRET_ENV_VAR
# You will be prompted to enter the secret value!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # prompt user for secret
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Load Env vars into the current shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Note: If an attack can run `env` in your shell, then these secrets could be exposed!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Specify all secrets for this project
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Note: Using a shell wrapper helps prevent secrets from staying
# around in the environment. And it's safe to commit.

# Usage:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 ネットワークの危険地帯

### カスタムネットワークと内部ポート

Docker ネットワークを使ってサービスを適切に分離することは、攻撃対象領域を減らす重要な手段だ。

ネットワークに穴を開けるときは慎重に。ポートフォワーディングをひとつ誤設定するだけで、取り返しのつかない事態になり得る。

デフォルトでは、プライベート LAN 上のサービスがインターネットに公開されることはない。ルーターから明示的にポートを転送する必要がある。

### LAN 上の Docker

ローカルで開発サーバーを動かす開発者であれ、ローカルネットワークからサービスをセルフホストしている人であれ、**Docker のネットワークモデルについての思い込みはトラブルにつながる。**

開発者は、Linux サーバーを保護する「従来の」方法（`iptables` や TCP/IP の sysctl オプションの制限）が、Docker ホストでは**何のエラーも出さずに機能しない**ことに驚きがちだ。**セルフホストの場合、あるいは一般的な家庭内ネットワークで動かしている場合は特にそうだ。**（後ろの席の人にも聞こえるように言っておくと、これで MacBook 上の開発用コンテナにアクセスされる可能性がある!!!）

> ⚠️ **警告その1:** Docker で公開したポートは、ホストを守っているつもりのファイアウォールルールを迂回できる。特に Ubuntu/Debian の UFW では注意が必要だ。だからといって、すべてのファイアウォールルールが無意味になるわけではない。しかし、「UFW が deny と言っている」ことは、証拠にはならない。[Issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690) を参照。

> ⚠️ **警告その2:** ポートをローカル IP アドレス（例: `-p 127.0.0.1:8080:80`）にバインドするのは正しいデフォルト設定だが、28.0.0 より前の Docker Engine には、同じ L2 ネットワーク上のホストから localhost に公開したポートへ到達できてしまうケースがあった。[Docker のポート公開ガイドにはこの注意点が記載されている](https://docs.docker.com/engine/network/port-publishing/)。以下で触れる、nmap で実際に確認する習慣も依然として重要だ。

<p class="inset">これを知って驚いたなら、こちらも同じだ。</p>

**ローカル IP へのバインドは今でも良い実践**であり、**管理されたクラウド環境や特別に構成されたネットワークでは、明確な効果がある。**
{/* Don't think of your firewall or private network as your main or only defense, add Docker Networks to the mix for better **isolation**, and always consider if you need to expose ports at all. */}

### Docker Compose の例

以下は、`app` サービスを `127.0.0.1:8080` にバインドし、両方のコンテナを `backend` カスタムネットワークに接続する `docker-compose.yml` の例です。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Bind to localhost if possible
      - "127.0.0.1:8080:8080"
    # ... other settings
  database:
    image: postgres:17.1
    # No ports needed; accessible inside backend network.
    networks:
      - backend

```

{/* #### テストと検証

他のセキュリティ対策と同様、ネットワーク構成を**テストして検証する**ことが重要だ。 */}

{/* ほとんどの企業では、ネットワークセキュリティと監査は常時対応が必要な仕事なのに、セルフホスト派の大半はそこに**まったく**時間をかけていない！ */}

{/* まあ、分かる。気が重くなるのも当然だ。_(サブネット、ネットマスク、CIDR、VLAN、ルーティングテーブル……もう勘弁してくれ！ 何の話か分からなくても大丈夫。ここがまさに適した場所だ。それに、今はそのあたりを気にする必要はない。)_ */}

### ネットワークのベストプラクティス

- 🏆 **ポートを一切公開しない** 最近、これは想像以上に有効だと知った！ 名前付きの（bridge）ネットワークを使うと、コンテナ同士はフィルタリングされていない状態で相互アクセスできる。ローカルネットワーク（NAT ゲートウェイ）の背後にいるように動作する。
  - すべての用途で可能とは限らないが、バッチジョブを実行するコンテナや、主に `attach` や `exec` 経由でアクセスするコンテナでは有効だろう。
- 🥇 **Docker Networks を使う**ことで、どのコンテナ同士が通信できるかを分離・制御する。
- 🥉 **localhost バインドを使う**： [不完全ではある](https://github.com/moby/moby/issues/45610)ものの、一般にはポートをループバックアドレス（例：`127.0.0.1:8080:80`）にバインドしたほうがよい。必ず[構成を検証すること](#-監視と検証)。

## 🛡️ アクセス制御

アクセス制御は、Docker サービスを保護するうえで重要な要素だ。コンテナのケーパビリティと権限の制限、Docker ソケットへのアクセス制限などが含まれる。

- [コンテナのケーパビリティを制限する](#コンテナのケーパビリティを制限する)
- [Docker ソケットへのアクセス](#docker-ソケットへのアクセス)
- [国単位でブロックする！](#国単位でブロックする)
- [CloudFlare プロキシホストを強化する](#cloudflare-プロキシホストを強化する)

### コンテナのケーパビリティを制限する

もう一つ堅実なアクセス制御策は、コンテナのケーパビリティを制限することだ。これにより、権限昇格からトラフィックの乗っ取りまで、複数の脅威による被害範囲を抑えられる。フォースフィールドではないが、ほとんどのコンテナが必要としない権限を取り除くことはできる。

**ケーパビリティとは何か？** Linux カーネルが定義する、名前付きの権限または能力だ。（[`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) の man ページに一覧がある。）`CAP_CHOWN`（ファイル所有者の変更）、`CAP_NET_ADMIN`（ネットワークインターフェースの設定）、`CAP_KILL`（任意のプロセスの強制終了）などがあり、ほかにも多数存在する。

必要なケーパビリティを判断する方法は二つある。

1. **試行錯誤する**：時間はかかるが効果的な方法だ。まずケーパビリティを一切付与せずに起動し、アプリが動作するまで一つずつ戻していく。
2. **過去の事例を探す**：他の人がすでに調べてくれていないか、"`project-name` `cap_drop` Dockerfile" や "`project-name` `cap_drop` docker-compose.yml" で検索する。LLM に出発点を提案させるのもよいが、コンテナをテストし、イメージのドキュメントを読むまでは推測にすぎないと考えること。

#### ケーパビリティのベストプラクティス

- **すべてのケーパビリティを削除する**：`cap_drop: [ ALL ]` を使い、コンテナから Linux ケーパビリティをすべて削除する。
- **新しい権限を付与しない**：`security_opt: [ no-new-privileges=true ]` を使い、コンテナが新しい権限を獲得できないようにする。

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
    # ... other settings
networks:
  db-network:
```

これで、サービス同士が `db-network` ネットワーク経由で通信できるようになる。Docker Compose がそのネットワークを自動的に作成する。

**既存のネットワーク**に参加するには、`--external`/`external:` オプションを使う。省略すると、新しいネットワークが作成される。

### Docker ソケットへのアクセス

#### ⚠️ 警告：`docker.sock` は実質的にホストの管理者アクセス権である

<blockquote class="inset">⚠️ `\:ro\` オプションは、ソケット経由で送られる I/O には影響しない！</blockquote>

読み取り専用になるのは、ソケットのパス自体をマウントした部分だけだ。そのソケット経由で送られる API 呼び出しは、コンテナの作成、ホストのパスのマウントなど、あなたが委任したつもりのない非常に面白い処理を今でも実行できる。

{/* ソケットを「開く」ことのできるプロセスは、（おそらく）ホスト上で root 権限を取得できる。 */}

#### ソケットのベストプラクティス

- 🥇 **Docker ソケットのマウントを避ける**。おそらく、もっとよい代替手段がある。
- 🫣 どうしても必要なら、**前段に限定的なプロキシを置き**、アプリが実際に必要とする API エンドポイントだけを許可する。Tecnativa が始めた `docker-socket-proxy` プロジェクト、[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy) を確認するとよい。そのうえで、拒否したはずの呼び出しが本当に拒否されていることを検証する。
- 🤢 まあ、非常に**信頼度が高く**、**リスクが低い**テスト環境なら、共有してもよい……かもしれない。

#### 国単位でブロックする！

役立つことはあるが、本物のセキュリティ境界ではない。

_地政学的な国の話であって、音楽の話ではない……_

主に家族や近しい友人向けにアプリをホストしているなら、アクセスを受ける予定のない国からのトラフィックをブロックできる。あるいは、想定している国からのトラフィックだけを許可してもよい。ノイズは減るが、VPN、プロキシ、ボットネット、そして根気強い相手を止めることはできない。

中国からのトラフィックをすべてブロックするスクリプトを見てみよう。

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同様に、米国からのトラフィックだけを許可することもできる。

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### CloudFlareプロキシホストの堅牢化

ホームサーバーがCloudFlareのIP（プロキシ）の背後で保護されているなら、アクセスをCloudFlareのIPとローカルネットワークだけに制限できる。

これは上記の[国単位でのブロック](#国単位でブロックする)と少し似ているが、制御ははるかに厳密だ。

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Block all incoming!!!
ufw default allow outgoing # Allow all outgoing
ufw allow ssh # Allow SSH

# Allow access for local subnet (preferably dedicated DMZ/VLAN for hosted services)
ufw allow from 10.0.0.0/8 to any port 443

# Allow CloudFlare IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Add IPv6 support
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

地域ベースの変更をテストするには、対象の国に接続拠点を持つVPNが役立つ。[監視と検証](#-監視と検証)セクションも参照してほしい。

### アプリケーション層のセキュリティ

[ネットワークとホストのセキュリティを強化しても](#-ネットワークのセキュリティ)、まだやることが残っている場合がある。

次は、サービスそのものの「アプリケーション」層について考える。

<p class="inset">そのデータベースには有効なパスワードが設定されているか？ このコンテナはHTTPSや証明書の処理を自動化しているか？ アプリに認証機能は組み込まれているか？ サインアップできるメールアドレスに制限はあるか？ デフォルトの認証情報や、変更すべき環境変数が残っていないか？</p>


_知るための唯一の方法は、確認することだ。_ まずは`README`と、`docker-compose.yml`、`Dockerfile`、`.env.*`などの重要なファイルを確認する。プロジェクト本体だけでなく、できれば依存するサービスも確認しておきたい（Postgres、Redisなど）。

#### リバースプロキシ

もう一つの防御層がベーシック認証だ。HTTPSなしで使ってはいけない。レガシーなサービスでは、管理者向けルートの前段にベーシック認証を置くだけで、手当たり次第のリクエストや、未認証のクローラーが直接触りに来るのを止められることが多い。

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

認証情報を生成する。

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

ベーシック認証プロキシを置くと、攻撃者は内部サービスに到達する前に、ユーザー名とパスワードという追加の関門を越えなければならない。

別の選択肢として、[Traefik](https://traefik.io/)や[Caddy](https://caddyserver.com/)のようなサービスを使い、HTTPSとベーシック認証を自動化する方法もある。

多くのドメインやサービスをGUIで管理したいなら、[Nginx Proxy Manager](https://nginxproxymanager.com/)をおすすめする。

## 🔍 監視と検証

- [ポートを確認する](#ポートを確認する)
- [開いているポートを表示する](#開いているポートを表示する)
- [ファイルを監視する](#ファイルを監視する)

ここが**最も重要で、最も見落とされがちな手順だ。** 最高のファイアウォール、最高のネットワーク、最高の運用手順を用意しても、検証しなければ、それが機能しているかどうかは分からない。

さらに、ほんの一握りのコマンド、あるいはその調べ方を知っているだけで、侵害を防げるかどうかが決まることもある。ハッカーになった気分を味わえるのは、おまけだ。（詳細と例については、[監視と検証](#-監視と検証)セクションまで進んでほしい。）

<p class="inset">信じるな。二度検証しろ</p>

### ポートを確認する

<p class="inset">⚠️ 重要: 自分が所有していないホストをスキャンしてはいけない。</p>


自宅ネットワークでもVPSでも、インターネットに対してどのポートが開いているのかを把握しておきたい。

これを行う方法は2つある。

- ネットワークを確認する（`nmap`、`masscan`）
- OSに問い合わせる（`lsof`、`netstat`、`ss`）

#### ネットワークの外側からテストする

現在の（パブリック）IPが必要になる。`ifconfig.me`のようなサービスを使えば、簡単に取得できる: `curl https://ifconfig.me`。ホスティングプロバイダーのダッシュボードで確認してもよい。

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

パブリックIPが分かったら、次は**外部ネットワークから接続する必要がある。** 友人のコンピューター、スマートフォンの5Gホットスポット、専用サーバーホストなどを使えばよい。

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Note: Ensure `target_host` is the desired IP

# Scan specific ports:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 ports:
nmap -A --top-ports 100 --open --reason $target_host
# All ports
nmap -A -p1-65535 --open --reason $target_host

```

#### ネットワーク内部からテストする

`nmap`の使い方を練習しよう。ローカルネットワークやサーバーの1台をスキャンし、ルーター、プリンター、スマート冷蔵庫を確認してみる。

{/* While port scans are a constant fact of life, it might be a violation of the CFAA (Computer Fraud and Abuse Act) in the US. So, only scan things you own. */}

#### スキャンコマンドの例

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Find service details on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Or on a docker 172.18.0.1/16
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

### 開いているポートを表示する

`lsof`に慣れておこう。macOSとLinuxで利用でき、ネットワークの状態やディスク上の活動を細かく確認できる。

```bash title="lsof Commands"
# Monitor specific port
sudo lsof -i:80 -Pn


# ESTABLISHED接続を監視する
sudo lsof -i -Pn | grep ESTABLISHED
# View LISTEN
sudo lsof -i -Pn | grep LISTEN

# to see network names instead of IP addresses (can be very slow to do reverse DNS lookups)
sudo lsof -i -P | grep LISTEN

# Monitor all network connections
sudo watch -n1 "lsof -i -Pn"

```

#### 出力例

![リスナーをスキャンしたnmapの結果](../lsof-scan-listen.webp)

### ファイル監視

どの**プロセス**が**ハードディスクの帯域**を最も消費しているかを確認するには、`iotop`を使える。

```bash

sudo iotop

```

個々のファイル変更を確認するには、Linuxでは`inotifywait`、MacOSでは`fswatch`を使える。

フォルダー単位でもシステム全体でも、不正な挙動や不審な挙動の検出に役立つ。

```bash

# Monitor all file changes in a directory
sudo inotifywait -m /path/to/directory

```

MacOSでは`fswatch`を使える。

`brew install fswatch`でインストールする。

```bash

fswatch -r /path/to/directory

```

## ⏰ 見落とされがちなヒント

1. **認証試行やその他の重要なエンドポイントにはレート制限をかける**。Nginxの`limit_req`モジュールを使う場合でも、SSHアクセスに`fail2ban`を使う場合でも、総当たり攻撃を絞り込むのは _おそらく_ 良い考えだ。_おそらく_ と言うのは、IPv6と安価なボットネットが当たり前になった今、それだけでは昔ほど効かないからだ。

2. **可能な限り読み取り専用ボリュームを使う**:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   ほかのベストプラクティス（root以外のユーザー、最小限のフォルダー権限）と組み合わせれば、`:ro`ボリュームマウントオプションによって、意図しない変更やコンテナ内からの一部の書き込み試行に対する防御を追加できる。ただし、すでにより広い権限を持つプロセスからホストを守るものではない。

3. **コンテナのアクセス権を定期的に監査する**。
   コンテナに不要なシークレット、ポート、マウントがあるなら、削除すること！

4. **WiFiの招かれざる客に注意する**
   WiFiのパスワードを、変な連中にまで教えたりはしないだろう？ まあ、友人の一部には教えるかもしれない。家族も例外ではないかもしれない。相手がどんなアプリを使っていて、それがSSIDとパスワードを世間にばらまくかは分からない。

### ホームネットワーク、パブリックプロバイダー、トンネリングの違い

1. **仮想的な分離／DMZ**: ホームサーバーは、可能なら別のVLANまたはDMZに置く。これにより、サーバー側が侵害された場合でも、内部デバイスへのアクセスを防ぎやすくなる。
   - ホームサーバーには別のルーターまたはVLANを使う。
   - ホームサーバーには別のWiFiネットワークを使う。
   - ホームサーバーには別のサブネットを使う。

2. **クラウドプロバイダー**: Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloudはいずれも、異なるファイアウォール機能を提供している。
   - プロバイダーやサービスによっては、ポートをデフォルトでブロックしている。オプトインやアドオンとして提供している場合もある。利用しているサービスプロバイダーのドキュメントを確認すること。
   - 多くのプロバイダーは、高度な監視や脅威検出サービスも提供している。

3. **VPNとトンネリング**: サービスをパブリックインターネットに直接公開せず、安全にインターネット越しで接続するため、VPNに近い仕組みやトンネリングサービスの利用を検討する。
   - TailScale、ngrok、ZeroTier。
   - WireGuard、OpenVPN。

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 本番環境チェックリスト

- [ ] **シークレット**: すべてランダムに生成し、安全に保管している
- [ ] **更新**: コンテナの更新方針を文書化し、自動化している。（テキストファイルに数個のコマンドを書いておくだけでも構わない。）
- [ ] **ネットワーク**: 必要なポートだけを公開し、内部ネットワークを構成している
- [ ] **ファイアウォールルール**: デフォルト拒否、明示的な許可、必要に応じた国別ブロック
- [ ] **リバースプロキシ**: Nginx、Caddy、Traefikで基本認証のレイヤーを追加できる
- [ ] **Canary Token**: 実際に触られたら調査する機密ファイルや認証情報の近くに配置している
- [ ] **監視** `nmap`、`lsof`、`inotifywait`、`glances`などでシステムを把握している
- [ ] **バックアップ戦略**: テスト済みで、できれば自動化し、オフサイトにも保管している
- [ ] **最小権限**: root以外のコンテナユーザー、読み取り専用ボリューム

## 📚 さらに読む

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canary Tokens](https://canarytokens.org/)

## 謝辞

熱心なRedditユーザーの皆さんに感謝します。

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [スレッド](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

最後まで読んでいただき、ありがとうございました！このガイドがお役に立てば幸いです。質問や提案があれば、下記のソーシャルアカウントから気軽に連絡してください。あるいは、`Edit on GitHub`リンクからPRを作成しても構いません！❤️
````
