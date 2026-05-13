# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: ja
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/ja/index.mdx
- Validation: deferred
- Runtime seconds: 128.77
- Input tokens: 9649
- Output tokens: 29153
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.030600
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: あなたのAIアシスタントがシェルアクセスを付与した
subTitle: ローカルまたはVPS上のOpenClaw/Moltbotセットアップのセキュリティ保護方法
date: '2026-01-15'
modified: '2026-01-28'
tags:
  - security
  - moltbot
  - clawdbot
  - tailscale
  - ai
  - vpn
  - devops
  - ssh
category: Security
subCategory: AI Infrastructure
draft: false
cover_full_width: ../hero_wide.webp
cover_mobile: ../icon_square_200.webp
cover_icon: ../icon_square_200.webp
---
OpenClaw（旧Clawdbot/Moltbot）は、WhatsApp、Slack、Discord、iMessage、その他のチャネルで動作するパーソナルAIアシスタントを提供する。しかし、ゲートウェイ、ノード制御、またはSSHを強力な認証なしでパブリックインターネットに公開した場合、あなたは第三者にマシン上のシェルアクセスへの経路を渡すことになる。

このガイドでは、最も安全なデフォルト設定を示す。OpenClawのゲートウェイをループバックに保ち、Tailscale Serveを使用してtailnet内のみからアクセス可能にし、SSHを厳格に制限し、外部からゲートウェイが公開されていないことを確認する。

プロジェクトの急速な普及は実際のセキュリティ懸念を浮き彫りにした。[Shodanスキャンで2,847の公開インスタンスが検出された](https://socradar.io/blog/clawdbot-is-it-safe/)（最初の数週間のデータ）であり、[GitHubセキュリティ監査のイシューで512件の発見が報告された](https://github.com/moltbot/moltbot/issues/1796)（コードベース全体）。一部のデータは自動化されたスキャナ出力であり、2026年1月のOpenClawへの改名以降に変更された部分もある。これらの数字を現在の正確な脆弱性数と捉えるのではなく、警告サインとして扱うべきだ。セキュリティの専門家である必要はない。デプロイする前にオペレーターサーフェスを公開しなければよいだけだ。

---

## 実際には何が公開されているか

インストール方法と公開設定に応じて、確認すべきサーフェスが3つある。

- **ポート22**: VPS上のSSHアクセス
- **ポート18789**: ゲートウェイ制御UIおよびWebSocket API
- **ブラウザ/ノード制御**: ゲートウェイ/ノードペアリングモデルを介したリモートノード実行およびブラウザ自動化

現在の[OpenClawのリモートアクセスドキュメント](https://docs.molt.bot/gateway/remote)では、ゲートウェイWebSocketはデフォルトでループバックにバインドされ、LAN/tailnet/カスタムバインドを意図的に選択しない限りループバックのみに保つことが推奨されている。これは良い。リスクが顕在するのは、このデフォルトを上書きする、Dockerポートを公開する、リバースプロキシを追加する、Funnelを有効にする、あるいはSSHを世界中に開放したままにする場合だ。

ゲートウェイが最も重大な箇所だ。これはアシスタントのオペレーターサーフェスであり、ツール呼び出しパスを含む。インターネットから到達可能で、認証が欠落している、脆弱である、回避されている、または漏洩している場合、攻撃者がエージェントを操作したり、ユーザーの権限でツールを呼び出したりする可能性がある。

ブラウザ制御もほぼ同等に危険なサーフェスだ。現在のOpenClawドキュメントでは、ブラウザ制御をブラウザマシン上のペアリング済みノードホスト経由で実行し、ノードペアリングをオペレーターアクセスと同様に扱うことを推奨している。ゲートウェイがペアリング済みノードで `system.run` を呼び出せる場合、それはそのノード上でのリモートコード実行となる。ただし、これはゲートウェイのノードポリシーおよびノード自身の実行承認の制約下で行われる。

SSHはSSHだ。パスワード認証を有効にして運用している場合、パブリックなVPS上ではブルートフォース攻撃は避けられない。

---

## Tailscaleによる解決策

OpenClawにおいて、Tailscaleはオペレーターサーフェスを公開することなくリモートアクセスを提供する：

1. OpenClawインスタンスをVPSまたはローカルマシン上で実行する
2. ゲートウェイはループバックにバインドしたままにし、Tailscale Serve経由でアクセスするか、明示的な認証付きでtailnet IPに直接バインドする
3. サーバーと個人のデバイス両方にTailscaleをインストールする
4. TailscaleのIPアドレスまたはMagicDNS名を通じてOpenClawにアクセスする
5. Funnelや他のパブリックプロキシを意図的に有効にしない限り、インターネット上の他の誰も何も見えない

### OpenClawにTailscaleの管理を任せるべきか？

OpenClawには[組み込みのTailscale統合機能](https://docs.molt.bot/gateway/tailscale)があり、ゲートウェイに対して`tailscale serve`または`tailscale funnel`を設定できる。

**Serveモード**は通信をtailnet内に閉じる。ゲートウェイは`127.0.0.1`にバインドしたままにし、ルーティングとHTTPSの処理はTailscaleに任せる。`gateway.auth.allowTailscale`を有効にすると、OpenClawはTailscaleのアイデンティティヘッダーを使用してControl UI/WebSocketトラフィックを認証し、`tailscale whois`で送信元を検証できる。これはほとんどの個人向けデプロイメントに適したモードだ。

**Funnelモード**は、Tailscaleのパブリックエンドポイント機能を通じてゲートウェイを公開する。Tailscale自身のドキュメントでは、Funnelを「広範なインターネットからのトラフィックをローカルサービスへルーティングするもの」と説明している。OpenClawはゲートウェイ認証モードが`password`でない限りFunnelの起動を拒否するが、それでもオペレーターサーフェスを公開する選択をしていることになる。

OpenClawの[セキュリティドキュメント](https://docs.molt.bot/gateway/security)は明確に、プロンプトインジェクションとツールアクセスがパーソナルアシスタントの中核的なリスクであると指摘している。エージェントがこっそりと自身を公開する経路を与えてはならない。Serveを意図的に使用し、本当にパブリックアクセスが必要でない限りFunnelを避け、`tailscale`コマンドの実行には承認プロセスを必須とせよ。

## OpenClaw の安全なセットアップ

### ステップ 1: Tailscale のインストール

VPS またはローカルサーバー上で:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

クライアントマシンでも公式ダウンロードページから Tailscale をインストールし、同じ tailnet にサインインする。

これで両方のマシンが同じプライベートネットワーク上に接続される。Tailscale IP を使って VPS に ping を打てるようになり、通信は暗号化されたトンネル経由でルーティングされる。

### ステップ 2: Tailscale を使用するように OpenClaw を設定する

現時点で最も安全なパターンは、ゲートウェイをループバックに固定し、Tailscale Serve を介して tailnet のみに公開することだ。

OpenClaw の設定ファイルでは:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

その後、Serve モードでゲートウェイを起動する：

```bash
openclaw gateway --tailscale serve
```

OpenClaw のドキュメントによれば、これによりゲートウェイは `127.0.0.1` に固定され、Tailscale が HTTPS と tailnet 経由のルーティングを提供する。アクセスする際は、パブリックな VPS の IP アドレスではなく `https://<magicdns-name>/` を使う。

Serve ではなく直接 tailnet にバインドしたい場合は、明示的なゲートウェイ認証を使用する：

```js
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "replace-with-a-long-random-token",
    },
  },
}
```

その後、別の tailnet デバイスから接続する：

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Docker や他のコンテナランタイムで実行している場合、ポート公開には特に注意が必要だ。`-p 18789:18789` のような公開設定は通常、ホストのすべてのインターフェースにバインドされる。ループバックと Tailscale Serve を優先するか、コンテナが依然としてトラフィックを受信することを確認した上で、ホスト側を Tailscale の IP に明示的にバインドする：

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Docker 設定を変更した後は、外部から `nmap` で、ローカルから `ss` で確認する。これを考慮しないと、Docker はホストファイアウォールの前提条件をバイパスしたり順序を再配置したりする可能性がある。

### ステップ 3: SSH をロックダウンする

Tailscale を使っている場合でも、SSH は適切に保護する必要がある：

```bash
# Keep your current SSH session open while doing this.
# First, from your client machine, confirm you can SSH over Tailscale:
ssh your-user@SERVER_TAILSCALE_IP

# Put hardening in a drop-in file instead of rewriting sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Validate before reloading. Do not skip this.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

これによりパスワード認証と root ログインが無効になる。次のステップでは UFW を使用し、`tailscale0` 経由の SSH は許可しつつ、パブリックな SSH 接続を完全にブロックする。

### ステップ 4: ファイアウォールルール

ファイアウォールを第二段階として設定する：

```bash
# Using UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale 公式の Ubuntu ハードニングガイドでも同様の構成を採用している。`tailscale0` からの通信を許可し、それ以外の着信を拒否した上で、パブリックな SSH がタイムアウトする一方で `100.x.y.z` アドレスへの SSH は正常に動作することを確認する。同じ VPS で公開ウェブサイトも運用している場合は、本当に必要な公開ルール（`80/tcp` や `443/tcp` など）のみを残すようにする。

---

## 暴露状況の確認

### 外部からの公開ポート確認

Tailscale ネットワークに接続していない別のマシンから実行する：

```bash
# Check if common public ports are exposed
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Expected output for a secured instance:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

`22` や `18789` が `filtered` や `closed` ではなく `open` と表示される場合、設定に問題がある。`80` や `443` が開いている場合は、それが意図した公開ウェブサイトまたは Tailscale Funnel のエンドポイントであることを確認し、OpenClaw のゲートウェイがうっかり公開されていないか確認する。

### ローカルでのリッスン状態確認

OpenClaw サーバー上で実行する：

```bash
# Show all listening ports and what they're bound to
sudo ss -tulpn | grep LISTEN

# Look for lines like this (good for Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# Or this (acceptable for direct tailnet bind with auth):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NOT like this (bad):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

`0.0.0.0` や `:::`（IPv6 版）が表示されている場合、そのサービスは全世界に向けて公開されている状態だ。

### 組み込みセキュリティ監査

OpenClaw には、設定をセキュリティのベストプラクティスに照らして検証する[セキュリティ監査コマンド](https://docs.molt.bot/gateway/security)が組み込まれている。

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

監査では、ゲートウェイの公開範囲、Tailscale の動作モード、認証設定、チャネルアクセス、ツールポリシー、プラグインのインベントリ、ファイルパーミッションが確認される。`--fix` は有用な支援機能ではあるが、報告結果を直接確認する代わりにはならない。

---

## これでは解決しない問題

Tailscale は最も重大な過ち——オペレーターインターフェースの公開——を排除する。だが、すべてを解決するわけではない：

**認証情報の保存**: OpenClaw はセッション記録、OAuth トークン、API キーをディスク上に保存する。これらには適切なファイルパーミッション（ファイルは `chmod 600`、プライベートな設定ディレクトリは `chmod 700`）を付与し、バージョン管理システムにコミットされないように管理する。組み込みの監査ツールはこれをチェックする。

**プラグインのサンドボックス化**: プラグインは実行ユーザーのフルパーミッションで動作する。信頼できるソースからのみプラグインをインストールし、リクエストする権限を必ず確認する。監査ツールはインストール済みプラグインのインベントリを作成する。

**デバイスセキュリティ**: Tailscale アカウントが侵害されたり、テールネット上のデバイスが盗難に遭ったりした場合、攻撃者は OpenClaw インスタンスにアクセス可能になる。新しいデバイスの接続に承認を必須にするため、[Tailscale デバイス認証](https://tailscale.com/kb/1099/device-authorization/)を有効化しておく。

---

## デプロイメントチェックリスト

OpenClaw/Moltbot インスタンスを本番運用に耐え得る状態と判断する前に、以下の項目を確認すること：

- [ ] サーバーとクライアントの両方に Tailscale がインストールされ、認証済みである
- [ ] ゲートウェイはループバック上で Tailscale Serve を介して運用するか、`tailnet` にバインドして明示的な認証を適用している
- [ ] SSH はパスワード認証と root ログインを無効化するように設定済み
- [ ] ファイアウォール（UFW または iptables/nftables）が `tailscale0` のみを許可し、不要なパブリックイングレスを拒否するように設定済み
- [ ] 外部からの nmap スキャンで、全ポートが `filtered` または `closed` として表示される
- [ ] 内部の `ss -tulpn` で、ゲートウェイが `127.0.0.1`、`::1`、または Tailscale IP のみにバインドされていることを確認
- [ ] 認証情報ファイルの権限が `600`、プライベートな設定ディレクトリの権限が `700` である
- [ ] `openclaw security audit --deep` を実行し、検出された項目すべてを是正済み
- [ ] OpenClaw の Tailscale 管理機能を使用している場合、実行承認（exec approvals）が有効化されている
- [ ] 定期的なバックアップが設定済み（OpenClaw データ＋設定ファイル）

---

## リソース

- [OpenClaw セキュリティガイド](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale 統合](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI リファレンス](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [UFW を使用した Ubuntu サーバーのロックダウン](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [セキュリティ監査：512 の検出項目（GitHub Issue）](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap ネットワークスキャンガイド](https://nmap.org/book/man.html)
````
