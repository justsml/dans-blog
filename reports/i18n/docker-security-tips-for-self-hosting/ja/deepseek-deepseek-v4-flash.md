# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.18
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale ja --model deepseek/deepseek-v4-flash --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: セルフホスティング向けDockerセキュリティの必須ヒント
subTitle: 自社ホストサービスを安全に、防御から監視まで！
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

- 🧗‍♀️ [勇敢な方へ](#-勇敢な方へ)
- 🔄 [`:latest`の落とし穴](#-latestの落とし穴)
- 🔐 [秘密鍵管理の正しい使い方](#-秘密鍵管理の正しい使い方)
- 🌐 [ネットワークの罠](#-ネットワークの罠)
- 🛡️ [アクセス制御](#-アクセス制御)
- 🔍 [監視と検証](#-監視と検証)
- ⏰ [見落としがちなTips](#-見落としがちなTips)
- 🚀 [本番環境チェックリスト](#-本番環境チェックリスト)
- 📚 [補足資料](#-補足資料)

## 🧗‍♀️ 勇敢な方へ

Dockerサービスをセルフホスティングする場合、セキュリティは雲の上の誰かに任せられない。ポートスキャンや設定ミスからあなたを守ってくれるクラウドプロバイダーは存在しない。自宅ネットワークでアプリを立ち上げる場合も、VultrやDigitalOcean、Linode、AWS、Azure、Google CloudなどのVPSを借りる場合も、すべてのセキュリティ対策を自分で固め、それが正しく機能しているかを検証する責任がある。

本ガイドではDockerセキュリティの要点を掘り下げていく。`あまり知られていない`テクニックから`実装が難しい`手法まで網羅する。カンアリトークン、リードオンリーボリューム、ファイアウォールルール、ネットワークセグメンテーションと強化、認証プロキシの追加など、実践的な対策を解説する。

このガイドでは、家庭用ネットワークとパブリッククラウド環境の比較も行い、Nginxで基本的な認証プロキシを構成する方法を示します。最後まで読み進めることで、不正アクセスを試みる者（友人や家族、場合によっては自分自身さえも）を寄せ付けないオプションをいくつか手に入れるでしょう。

相当な内容量ですが、多くの項目が関連していますので、自分の環境に最も関連性の高いものを選んで実装してください。🍀

## 🔄 `:latest`タグの落とし穴

イメージの更新を維持することはセキュリティにおいて不可欠です。ただし、`:latest`に依存すると、レビューなしに破壊的な変更や脆弱なビルドが導入されるリスクがあります。

### 安全な更新方法

`pull`や`build`コマンドと更新コマンドを組み合わせ、意図的にイメージをリフレッシュした後、破損に気づける期間に再起動するようにしてください。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### バージョンピンニング vs latest

適切なバージョンを固定する選択は安定性とセキュリティのバランスを取る行為です。以下は一般的な戦略です：

```yaml
# docker-compose.yml
# ...
  # 精確なバージョンピンニング。重要なサービス向け
  image: postgres:17.2

  # パッチバージョンピンニング。非重要なサービス向け
  image: postgres:17.2

  # メジャーバージョンピンニング。趣味プロジェクト向け
  image: postgres:17

  # 避けたい最優先タグ
  image: postgres:latest
```

[Dependabot](https://github.com/features/security) や [Renovate](https://github.com/renovatebot/renovate) を使ってレビュー可能な更新PRを生成してください。深夜に再構築したくないようなサービスは特定バージョンまたはダイジェストを固定し、自動化ツールが更新を通知するようにしてください。

_定期的にDockerイメージを更新するためのお気に入りツールがあれば教えてください！_

## 🔐 シークレット管理

- [強固なシークレットの生成](#generate-strong-secrets)
- [キャナリートークン](#canary-tokens)
- [`.env`からMacOSキーチェーンへの移行](#upgrade-from-env-to-macos-keychain)
{/* - [プレースホルダーバリデーション](#placeholder-validation) */}

シークレットの管理方法は多様ですが、守るべき最も重要なルールの1つは **「Dockerイメージにシークレットをハードコードしたり、gitにコミットしたりしないこと」** です。これは最も一般的なセキュリティミスであり、長期的なリスクを伴い、修正も面倒です。

シークレットの安全な保存は、`.env`ファイルや[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)、[HashiCorp Vault](https://www.vaultproject.io/)やAWS Secrets Managerのようなシークレットマネージャーなど、多くのオプションがあります。使用ケースに応じて、適切な「労力とセキュリティのバランス」を選びましょう。

{/*
TODO: Maintainer's Guideに移動
// TODO: Maintainer's Guideに移動

### プレースホルダーバリデーション

<blockquote>シークレットが非公開でない場合、JWTトークンをハッキングするのは信じられないほど簡単です！</blockquote>

<p className='inset'>💡 シークレットは常に一意であることを確認してください。デフォルト値が不安全でハードコードされている状態で実行できないようにしましょう。</p>

シークレットでプレースホルダ（`__WARNING_REPLACE_ME__`など）を使用している場合、誰かが気づく可能性があります！素晴らしいアイデアです。

念のため、わずかな労力でランタイムセキュリティを追加できます。JavaScript、Rust、Goでどのように実装できるかの例を以下に示します：

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("不安全なシークレットが検出されました:", missingSecrets);
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
            panic!("{} に不安全なシークレットが含まれています", key);
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
			panic(fmt.Sprintf("%s に不安全なシークレットが含まれています", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

### 強力なシークレットを生成する

### キャナリートークン

以下は、`.env`ファイル用に新しいシークレットを生成するための小さなスクリプトです：

```bash
#!/bin/bash
# generate-secrets.sh

generate_secret() {
    local length=${1:-30}
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}

[ -f .env ] && { echo ".env ファイルが既に存在しています！"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "セキュアなランダム値を含む新しい .env ファイルが生成されました！"
```

### キャナリートークン

[**キャナリートークン**(https://canarytokens.org/)](https://canarytokens.org/)は、シークレットが漏洩・利用されたかどうかを検出するための優れた方法です。これらは、任意の機密ファイル、URL、トークンに追加できるトリップワイヤーのようなものです。

実際に心配しているシークレットの隣に配置してください：`.env`ファイル、CI変数、パスワードマネージャー、バックアップフォルダ、クラウド資格情報を想定してください。見せかけの対策にならないように、現実的な攻撃者や将来の自分自身のミスが触れそうな場所にトリップワイヤーを配置しましょう。

選択可能なキャナリートークンの種類は豊富で、AWSトークン、[架空のクレジットカード番号](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)、ExcelやWordファイル、Kubeconfigファイル、VPN資格情報、さらにはSQLダンプファイルにもトリップワイヤーを設置できます！

#### キャナリートークンのベストプラクティス

- **どこにでも配置する**: すべての `.env` ファイル、CI/CD パイプライン、および「シークレットマネージャー」に配置してください。
  - ホームディレクトリに `passwords.xlsx` または `passwords.docx` ファイルを配置してください。
  - AWS プロファイル `billing_prod` にキャナリートークンをシークレットとして設定してください。
  - `~/.ssh` ディレクトリに `private.key` ファイルを生成してください。
  - `~/backups` ディレクトリにキャナリーセキュリティダンプ `all_credit_cards.sql` を作成してください。
- **モニタリング**: キャナリートークンがトリガーされたときに検出できるよう、メールルールやアラートを設定してください。

### `.env` から MacOS Keychain へのアップグレード

Mac ユーザーには、Keychain を使用するのが最も簡単なオプションの1つです。

OSX Keychain からシークレットを自動的にロードする方法で、`TouchID` をサポートし、`.env` ファイルよりも少しセキュアです。

オリジナルの <cite>クレジットは [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) と [Jan Schaumann](https://www.netmeister.org/)</cite> に帰属します。

<CodeTabs client:load tabs={[
  "ヘルパー コマンド",
  "環境にシークレットを永続化",
  "コマンドごとにシークレットを使用"
]}>
```bash title="keychain-secrets.sh"
### OSX Keychain から環境変数を設定および取得するための関数 ###
### 参考: https://www.netmeister.org/blog/keychain-passwords.html および 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# 使用例: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# 使用例: set-keychain-secret SECRET_ENV_VAR
# シークレット値を入力するようプロンプトされます！
function set-keychain-secret () {
    [ -n "$1" ] || print "環境変数名が不足しています"
    
    # シークレットの入力を求める
    echo -n "シークレットを入力してください: ${1}"
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
# 注意: 攻撃者がシェルで `env` を実行できる場合、これらのシークレットが暴露される可能性があります！
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# このプロジェクトで使用するすべてのシークレットを指定
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# 注意: シェルラッパーを使用することで、シークレットが環境に残存するのを防げます。
# また、コミットしても安全です。

# 使用例:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 ネットワークハザード

### カスタムネットワークと内部ポート

Dockerネットワークでサービスを適切に分離することは、攻撃面を縮小するための重要な方法です。

ネットワークに穴を開けるときは注意してください。1つの誤ったポート転送が重大な問題を引き起こす可能性があります。

プライベートLAN上のサービスはデフォルトでインターネットに公開されません。ルーターからポートを明示的に転送する必要があります。

### LAN上のDocker

開発者がローカルで開発サーバーを実行している場合でも、自宅ネットワークからサービスをホストしている場合でも、**Dockerのネットワークモデルに関する誤解はトラブルの原因**になります。

開発者はしばしば、Linuxサーバーのセキュリティ対策（`iptables`、TCP/IPのsysctlオプションの制限）が**Dockerホストでは静かに失敗**することに驚きます。これは特に**自宅ネットワークでのホスト**や**一般家庭のネットワーク環境**で顕著です。（後列の皆さんへ：これによりMacBook上の開発コンテナにアクセスできてしまう可能性があります！！！）

> ⚠️ **警告 #1:** Dockerで公開されたポートは、Ubuntu/DebianのUFWファイアウォールルールを**バイパスする可能性があります**。これによりすべてのファイアウォールルールが無効になるわけではありませんが、「UFWが拒否」と表示されてもそれが証明とはなりません。[DockerがUFWファイアウォールルールをバイパスする問題 #690](https://github.com/moby/moby/issues/690)を参照してください。

> ⚠️ **警告 #2:** ローカルIPアドレスにポートをバインド（例: `-p 127.0.0.1:8080:80`）するのが基本的な正しい方法ですが、Docker Engine 28.0.0以前のバージョンでは、同じL2ネットワーク上のホストがローカルホストで公開されたポートにアクセスできたケースがあります。[Dockerはポート公開ガイドでこの注意点を記載しています](https://docs.docker.com/engine/network/port-publishing/)。以下のnmapによる検証習慣は依然として重要です。

<p class="inset">この事実に驚かれた場合、私も同様です。</p>

**ローカルIPへのバインドは依然として良い実践**であり、**管理されたクラウド環境や特別に構成されたネットワーク**において有意義な影響を持ちます。  
{/* ファイアウォールやプライベートネットワークを主要な防御手段と考えず、Dockerネットワークを追加して**分離**を強化し、ポートを公開する必要があるか常に検討してください。 */}

### 例: Docker Compose

以下は、`app`サービスを`127.0.0.1:8080`にバインドし、両コンテナを`backend`カスタムネットワークに接続する例です。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # 可能であればローカルホストにバインド
      - "127.0.0.1:8080:8080"
    # ... 他の設定
  database:
    image: postgres:17.1
    # ポートは不要；backendネットワーク内からアクセス可能
    networks:
      - backend

```

{/* #### テストと検証

すべてのセキュリティ対策と同様、ネットワーク構成を**テスト・検証**することが不可欠です。 */}

{/* ネットワークセキュリティと監査は多くの企業でフルタイムの責任ですが、セルフホスティングユーザーの多くはこれに**一切時間を割いていません**！ */}

{/* まあ、分かりますよ。これは確かに難しいです。(サブネット、ネットマスク、CIDR、VLAN、ルーティングテーブル、などなど！これらが意味不明でも大丈夫です。ここにいるのが正しい場所です。また、これらについては現時点では気にする必要はありません。) */}

### ネットワークのベストプラクティス

- 🏆 **ポートの公開は行わない** 最近、これは期待以上に有用であることを学びました！ネーミングされた(ブリッジ)ネットワークを使用する場合、コンテナ間はフィルタリングなしで相互にアクセスできます。これらはローカルネットワーク( NATゲートウェイ)の背後にあるかのように動作します。
  - すべてのユースケースで可能ではない場合もありますが、バッチジョブを実行するコンテナや、主に`attach`や`exec`でアクセスされるコンテナには有用かもしれません。
- 🥇 **Dockerネットワークを使用する** コンテナ間の通信を制御・分離するためにDockerネットワークを使用します。
- 🥉 **ローカルホストバインディング**: [完璧ではありません](https://github.com/moby/moby/issues/45610)が、ループバックアドレス(例: `127.0.0.1:8080:80`)へのバインドが一般的に推奨されます。[構成を検証](#-監視・検証)することを忘れないでください。

## 🛡️ アクセス制御

Dockerサービスを保護するためには、コンテナの権限制限やDockerソケットへのアクセス制限など、アクセス制御が不可欠です。

- [コンテナの権限制限](#コンテナの権限制限)
- [Dockerソケットアクセス](#dockerソケットアクセス)
- [国ごとのブロック](#国ごとのブロック)
- [CloudFlareプロキシホストの強化](#cloudflareプロキシホストの強化)

### コンテナの権限制限

もう一つのアクセス制御の実践は、コンテナの**権限を制限**することです。これにより、権限昇格やトラフィックハイジャックなどの脅威の影響範囲を縮小できます。これは万能ではありませんが、多くのコンテナが本来必要なかった権限を削除します。

**権限とは何ですか？** Linuxカーネルで定義された名前付きの権限や能力です。( [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) マニュアルページにフルリストがあります。) 例として`CAP_CHOWN`(ファイル所有権の変更)、`CAP_NET_ADMIN`(ネットワークインターフェースの設定)、`CAP_KILL`(任意のプロセスの終了)などがあります。

必要な権限を特定する2つの方法は：

1. **試行錯誤** この遅いが効果的な方法では、最初にすべての権限を削除し、アプリが動作するまで1つずつ追加します。
2. **過去の作業を検索** "`project-name` `cap_drop` Dockerfile"や"`project-name` `cap_drop` docker-compose.yml"を検索し、他者が既に作業を終えているか確認します。LLMが起点を提案できますが、コンテナをテストし、イメージドキュメントを読むまで推測と扱ってください。

#### 権限のベストプラクティス

- **すべての権限を削除**: `cap_drop: [ ALL ]`を使用してコンテナからすべてのLinux権限を削除します。
- **新しい特権の禁止**: `security_opt: [ no-new-privileges=true ]`を使用してコンテナが新しい特権を獲得することを防ぎます。

```yaml title="例: 権限の削除・制限" {5-14}
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
    # ... 他の設定
networks:
  db-network:
```

これでサービスは`db-network`ネットワークを通じて相互に通信できます。Docker Composeはそのネットワークを自動的に作成します。

`--external`/`external:`オプションを使用して**事前に作成されたネットワーク**に参加します。省略すると新しいネットワークが作成されます。

### Dockerソケットのアクセス

#### ⚠️ 警告: `docker.sock`は基本的にホストの管理者権限に相当します

<blockquote class="inset">⚠️ `:ro`オプションはソケット経由で送信されるI/Oには影響しません！</blockquote>

これは単にソケットパス自体を読み取り専用でマウントすることを保証するだけであり、そのソケットを通じて送信されるAPI呼び出しは依然としてコンテナを作成したりホストパスをマウントしたり、おそらく意図せずに委任された他の非常に興味深い操作を行うことができるままです。

{/* ソケットを"open"できる任意のプロセスは（おそらく）ホストのrootアクセス権を得ることができます */}

#### ソケットのベストプラクティス

- 🥇 **Dockerソケットのマウントは避けてください**。おそらくより良い代替案があります。
- 🫣 どうしても必要なら、**狭いプロキシを前面に配置**し、アプリが実際に必要とするAPIエンドポイントのみを許可してください。Tecnativaが最初に開発した[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy)プロジェクトを確認してください。その後、拒否された呼び出しが実際に拒否されていることを確認してください。
- 🤢 いいえ、_たとえ_非常に**高い信頼性**と**低リスク**のテスト環境でも、共有するのは問題かもしれません。

#### 国のブロック！

時折役立つかもしれませんが、実際のセキュリティ境界ではありません。

_ここでは音楽ではなく、地政学的実体について話しています…_

自宅や友人向けにアプリをホスティングしている場合、予期しない国からのトラフィックをブロックしたり、予期される国からのトラフィックのみを許可したりできます。これはノイズを減らしますが、VPNやプロキシ、ボットネット、忍耐力のある攻撃者を止めることはできません。

中国からのすべてのトラフィックをブロックするためのこのスクリプトを確認してください：
```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done
```

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同様に、米国からのトラフィックのみを許可することもできます：

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### CloudFlareプロキシホストのセキュリティ強化

自宅サーバーがCloudFlare IP（プロキシ）で保護されている場合、アクセスをCloudFlare IPとローカルネットワークのみに制限できます。

これは先ほどの[国別ブロッキング](#blocking-country)と似ていますが、はるかに細かい制御が可能です。

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # 入力トラフィックをすべてブロック!!!
ufw default allow outgoing # 出力トラフィックをすべて許可
ufw allow ssh # SSHを許可

# ホストされたサービス用に専用のDMZ/VLANを設定したローカルサブネットへのアクセスを許可
ufw allow from 10.0.0.0/8 to any port 443
```

# CloudFlare IPの許可
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6サポートの追加
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

地理ベースの変更をテストするには、目的の国に位置する場所のVPNが役立ちます。詳しくは[監視と検証](#-monitoring--verification)セクションを参照してください。

### アプリケーション層セキュリティ

[network and host are security hardened,](#-network-hazard) が完了した後でも、さらにやるべきことがあるかもしれません。

今度は、サービス自体の「アプリケーション」層について考えなければなりません。
```

<p class="inset">そのデータベースは有効なパスワードを持っていますか？このコンテナはHTTPS/証明書の自動化を実行していますか？アプリケーションには組み込みの認証機能がありますか？どのメールアドレスがサインアップできるかに制限がありますか？デフォルトの資格情報や変更可能な環境変数がありますか？</p>

実際に_把握_する唯一の方法は確認することです。このケースではまず`README`や`docker-compose.yml`、`Dockerfile`、`.env.*`などの主要なファイルから始めましょう。プロジェクト内だけでなく、サポートサービス（例: Postgres、Redisなど）についても同様に確認するのが理想です。

#### リバースプロキシ

もう1つの防御レイヤーは基本認証です。HTTPSなしで使用しないでください。レガシーサービスの場合、管理者ルートの前に基本認証を設定するだけで、ランダムなリクエストや認証なしのクローラーによる直接アクセスを防ぐことがよくあります。

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

資格情報を生成するには:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

基本認証プロキシを使うと、内部サービスに到達する前に攻撃者がユーザー名とパスワードという追加の障害に直面します。

もう1つのオプションとして、[Traefik](https://traefik.io/)や[Caddy](https://caddyserver.com/)といったHTTPSと基本認証を自動化できるサービスを利用する方法もあります。

多くのドメインやサービスをGUIで管理したい場合は、[Nginx Proxy Manager](https://nginxproxymanager.com/)の利用をおすすめします。

## 🔍 監視と検証

- [ポートの確認](#check-your-ports)
- [開いているポートの表示](#view-open-ports)
- [ファイル監視](#file-monitoring)

これは**最も重要でありながら最も見過ごされがちなステップ**です。最高のファイアウォールやネットワーク、ベストプラクティスを持っていても、検証を行わなければそれが機能しているかどうかまったく把握できません。

さらに、数少ないコマンドの知識や、どこで調べるべきかを知っているか否かが、侵害を防ぐかどうかの差になります。ハッカー気分を味わえることは加点です。（詳細と例については、[監視と検証](#-monitoring--verification)セクションに進んでください。）

<p class="inset">信頼せず、二重に確認する</p>

### ポートの確認

<p class="inset">⚠️ 重要: 自分が所有していないホストのスキャンを行わないでください。</p>

ホームネットワークやVPSどちらにいても、世界に公開されているポートを把握する必要があります。

これを行う方法は2つあります：

- ネットワークの確認（`nmap`、`masscan`）
- オペレーティングシステムへの問い合わせ（`lsof`、`netstat`、`ss`）

#### 外部ネットワークでのテスト

現在の（パブリック）IPアドレスを取得するには、`ifconfig.me`などのサービスが便利です：`curl https://ifconfig.me`。ホスティングプロバイダーのダッシュボードで確認する方法もあります。

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

パブリックIPを取得したら、**外部ネットワークに接続する**必要があります。友人のコンピュータ、スマートフォン/5Gホットスポット、または専用サーバホストを使用できます。

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# 注: `target_host` が目的のIPであることを確認してください

# 特定のポートをスキャン：
nmap -A -p 80,443,8080 --open --reason $target_host
# 上位100ポート：
nmap -A --top-ports 100 --open --reason $target_host
# 全ポート：
nmap -A -p1-65535 --open --reason $target_host
```

#### ネットワーク内でのテスト

`nmap` の使用に慣れるために、ローカルネットワークや自分のサーバー、ルーター、プリンタ、スマート冷蔵庫などをスキャンしてみましょう。

{/* ポートスキャンは日常的な現実ですが、米国ではコンピュータ詐欺および不正アクセス防止法（CFAA）に違反する可能性があります。そのため、自分が所有するものだけをスキャンしてください。 */}

#### 例: スキャンコマンド

```bash

# ローカルホストのすべてのオープンポートをスキャン
nmap -sT localhost

# 自分のマシンのプライベートIPでサービスをスキャン
nmap -sV 192.168.1.10

# ネットワーク内のサービス詳細を検出
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# またはDockerの 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap スキャン" frame="terminal"
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

### オープンポートの確認

`lsof` に慣れましょう - macOS と Linux で利用可能です。これはネットワーク状態やディスクアクティビティを詳細に表示します。

```bash title="lsof コマンド"
# 特定ポートのモニタリング
sudo lsof -i:80 -Pn
```

```bash
# 確立済み接続の監視
sudo lsof -i -Pn | grep ESTABLISHED
# リスン状態の表示
sudo lsof -i -Pn | grep LISTEN

# IPアドレスではなくネットワーク名を表示（逆引きDNS検索が非常に遅くなる可能性あり）
sudo lsof -i -P | grep LISTEN

# すべてのネットワーク接続を監視
sudo watch -n1 "lsof -i -Pn"
```

#### サンプル出力

![nmapによるリスナーのスキャン](../lsof-scan-listen.webp)

### ファイル監視

どの**プロセス**が最も**ハードドライブ帯域幅**を使用しているかを特定するには `iotop` を使用できます:

```bash
sudo iotop
```

個別のファイル変更を確認するには、Linuxでは `inotifywait`、MacOSでは `fswatch` を使用できます。これはフォルダ単位またはシステム全体で不正な動作や異常な挙動を検出するのに役立ちます。

```bash
# ディレクトリ内のすべてのファイル変更を監視
sudo inotifywait -m /path/to/directory
```

MacOSでは `fswatch` を使用できます:  
インストールは`brew install fswatch`で行う

```bash
fswatch -r /path/to/directory
```

## ⏰ よく見落とされるヒント

1. **認証試行や重要なエンドポイントへのレート制限**  
   Nginxの`limit_req`モジュールやSSHアクセス用の`fail2ban`を通じて、ブルートフォース攻撃へのスロットリングはおそらく良い考えです。私は「おそらく」と言います。IPv6や安価なボットネットの時代において、それはかつての状態とは異なっているからです。

2. **可能な限り読み取り専用ボリュームを使用する**  
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   他のベストプラクティス（非rootユーザー、最小限のフォルダ権限）と組み合わせることで、`:ro`ボリュームマウントオプションはコンテナ内からの誤った変更や一部の書き込み試行を防ぐ追加の保護を提供します。これは、すでに広範な権限を持つプロセスがホストを攻撃するのを防ぐことはできません。

3. **コンテナアクセスの定期的な監査**  
   コンテナがシークレット、ポート、マウントを必要としない場合、それらを削除しましょう！

4. **WiFiの不審者に注意**  
   WiFiパスワードを変な奴らに教えてはいないでしょう？特に。しかし、友人…いや、家族にも教えていたかもしれません。彼らがどのアプリを持っているか、それがあなたのSSIDやパスワードを世界に共有していないか、あなたは決して知りません。

### ホームネットワーク vs. 公共プロバイダー vs. チューニング

1. **バーチャル分離/DMZ**  
   ホームサーバーを別のVLANやDMZに配置できる場合は、それを行いましょう。これにより、サーバー側からの潜在的な侵害で内部デバイスがアクセス不能になることを防ぎます。  
   - ホームサーバー専用のルーターまたはVLANを使用する。  
   - ホームサーバー専用のWiFiネットワークを使用する。  
   - ホームサーバー専用のサブネットを使用する。

2. **クラウドプロバイダー**: Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloudはすべて異なるファイアウォール機能を提供しています。  
   - 一部のプロバイダーやサービスはデフォルトでポートをブロックしています。一部はオプトインや追加料金のオプションを提供しています。サービスプロバイダーのドキュメントを確認してください。  
   - 多くのプロバイダーは高度な監視と脅威検出サービスを提供しています。  

3. **VPN & トンネリング**: 公開インターネットにサービスを露出せずにインターネット上でセキュアに接続するため、VPNに類似したオプションやトンネリングサービスの使用を検討してください。  
   - TailScale、ngrok、ZeroTier。  
   - WireGuard、OpenVPN。  

{/* 3. **内部/横向き攻撃への強化**: 1台の感染デバイスがネットワーク全体を侵害する可能性があります。カスタムネットワークでのDockerサービスのセグメント化、ハードウェア、UFWルールの使用、不要なポートのブロックはすべて、適切に構成された場合にリスクを軽減するのに役立ちます。 */}  

## 🚀 本番環境チェックリスト  

- [ ] **シークレット**: すべてのシークレットはランダムに生成され、安全に保存されている  
- [ ] **アップデート**: コンテナのアップデート戦略が文書化され、自動化されている（テキストファイルに数行のコマンドでも構いません）  
- [ ] **ネットワーク**: 必要なポートのみ公開され、内部ネットワークが設定されている  
- [ ] **ファイアウォールルール**: デフォルトで拒否、明示的な許可、必要に応じて国ごとのブロック  
- [ ] **リバースプロキシー**: Nginx、Caddy、Traefikで基本認証のレイヤーを追加  
- [ ] **キャニスターコイン**: 実際に調査する可能性のある機密ファイルや資格情報を近くに配置する  
- [ ] **監視**: `nmap`、`lsof`、`inotifywait`、`glances`などでシステムを把握する  
- [ ] **バックアップ戦略**: テスト済みで、好ましくは自動化されており、オフサイト保存されている  
- [ ] **最小限の特権**: ルートでないコンテナユーザー、読み取り専用のボリューム  

## 📚 補足資料

- [Dockerセキュリティのベストプラクティス](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Dockerセキュリティチートシート](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Dockerベンチマーク](https://www.cisecurity.org/benchmark/docker)
- [キャニスターコイン用のCanarytokens.org](https://canarytokens.org/)

## ありがとう

熱心なRedditユーザーに感謝します：

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [スレッド](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

読んでもらってありがとう！このガイドがお役に立てたなら大変嬉しく思います。ご質問や提案があれば、以下のSNSからご連絡ください。あるいは「GitHubで編集」リンクをクリックしてPRを作成していただければ幸いです！❤️
````
