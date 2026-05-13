# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/ja/index.mdx
- Validation: deferred
- Runtime seconds: 22.83
- Input tokens: 13402
- Output tokens: 4702
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.001369
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: AIアシスタントがシェルアクセスを与えた
subTitle: ローカルまたはVPS上の OpenClaw/Moltbot 環境を安全に保つ方法
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
OpenClaw（旧称 Clawdbot/Moltbot）は、WhatsApp、Slack、Discord、iMessage など複数のチャネルで動作する個人用 AI アシスタントです。しかし、ゲートウェイ、ノード制御、あるいは SSH を認証なしでインターネットに公開すると、見知らぬ人にシェルアクセスへの道を与えることになります。

本ガイドでは、最も安全なデフォルト設定を示します。OpenClaw のゲートウェイは loopback にバインドし、Tailscale Serve を使って tailnet のみからアクセス可能にし、SSH をロックダウンし、外部からゲートウェイが公開されていないことを検証します。

プロジェクトの急速な普及に伴い、実際のセキュリティリスクが顕在化しました。最初の数週間で [Shodan スキャンにより 2,847 件の公開インスタンスが検出](https://socradar.io/blog/clawdbot-is-it-safe/) され、[GitHub のセキュリティ監査イシューでコードベースに 512 件の指摘が報告](https://github.com/moltbot/moltbot/issues/1796) されました。これらのうち一部は自動スキャナの出力であり、2026 年 1 月に OpenClaw へ名称変更してから状況は変わっている可能性があります。したがって、数字は正確な脆弱性数というより警告サインとして捉えてください。セキュリティの専門家である必要はありません。デプロイ前にオペレータサーフェスを公開しないようにすれば十分です。

---

## 実際に公開しているもの

インストール方法や公開設定に応じて、確認すべきサーフェスは次の 3 つです：

- **Port 22**: VPS 上の SSH アクセス  
- **Port 18789**: ゲートウェイ制御 UI と WebSocket API  
- **Browser/node control**: ゲートウェイ/ノードペアリングモデルを介したリモートノード実行およびブラウザ自動化  

現在の [OpenClaw remote‑access docs](https://docs.molt.bot/gateway/remote) では、ゲートウェイの WebSocket はデフォルトでループバックにバインドされ、意図的に LAN / tailnet / カスタムバインドを選択しない限りループバックのままにしておくことが推奨されています。これは正しい方針です。リスクが顕在化するのは、このデフォルトを上書きして Docker ポートを公開したり、リバースプロキシを追加したり、Funnel を有効化したり、SSH を全世界に開放したりしたときです。

ゲートウェイが最大の問題点です。これはアシスタントのオペレータサーフェスであり、ツール呼び出し経路も含まれます。インターネットから到達可能で、認証が欠如している、弱い、バイパス可能、または漏洩している場合、攻撃者はエージェントを操作したり、ユーザー権限でツールを呼び出したりできる可能性があります。

ブラウザ制御もほぼ同等に機微です。現在の OpenClaw ドキュメントは、ブラウザ制御をブラウザマシン上のペアリングされたノードホスト経由で実行し、ノードペアリングをオペレータアクセスと同等に扱うことを推奨しています。ゲートウェイがペアリングされたノード上で `system.run` を呼び出せる場合、ゲートウェイのノードポリシーとノード側の実行承認に従って、そのノードでリモートコード実行が可能になります。

SSH は SSH です。パスワード認証が有効なまま公開 VPS で運用していると、ブルートフォース攻撃は避けられません。

## Tailscale ソリューション

OpenClaw では、Tailscale を使うことでオペレータサービスを公開せずにリモートアクセスが可能になります。

1. OpenClaw インスタンスを VPS もしくはローカルマシンで実行する  
2. ゲートウェイは loopback にバインドしたまま、Tailscale Serve 経由でアクセスするか、明示的な認証付きで tailnet IP に直接バインドする  
3. サーバーと自分のデバイスの両方に Tailscale をインストールする  
4. OpenClaw へは Tailscale IP もしくは MagicDNS 名でアクセスする  
5. インターネット上の他者は何も見えません。Funnel や別の公開プロキシを意図的に有効にしない限りです  

### OpenClaw に Tailscale 管理を任せるべきか？

OpenClaw には [built-in Tailscale integration](https://docs.molt.bot/gateway/tailscale) があり、ゲートウェイ用に `tailscale serve` または `tailscale funnel` を自動設定できます。

**Serve mode** は tailnet 内だけに留めます。ゲートウェイは `127.0.0.1` にバインドしたままで、ルーティングと HTTPS は Tailscale が処理します。`gateway.auth.allowTailscale` が有効な場合、OpenClaw は Tailscale のアイデンティティヘッダーを使って Control UI/WebSocket のトラフィックを認証し、`tailscale whois` で送信元を検証できます。これはほとんどの個人利用デプロイに適したモードです。

**Funnel mode** は Tailscale のパブリックエンドポイント機能を使ってゲートウェイを公開します。Tailscale の公式ドキュメントでは Funnel を「インターネット全体からローカルサービスへトラフィックを転送する」ものと説明しています。OpenClaw はゲートウェイ認証モードが `password` でない限り Funnel の起動を拒否しますが、オペレータ表面を公開する選択は依然として行われています。

OpenClaw の [security documentation](https://docs.molt.bot/gateway/security) では、パーソナルアシスタントにとってプロンプトインジェクションとツールアクセスが主要なリスクであることが明示されています。エージェントに静かに自分自身を公開させる経路を与えてはいけません。Serve を意図的に使用し、真にパブリックアクセスが必要な場合以外は Funnel を避け、`tailscale` コマンドの実行は必ず承認を得るようにしてください。

---

## OpenClaw の安全な設定手順

### Step 1: Install Tailscale

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

クライアントマシンでも公式ダウンロードページから Tailscale をインストールし、同じ tailnet にサインインします。

これで両方のマシンが同一のプライベートネットワーク上に配置されます。VPS の Tailscale IP に ping を送ることができ、暗号化トンネル経由でルーティングされます。

### Step 2: Configure OpenClaw to Use Tailscale

現在最も安全なパターンは、ゲートウェイをループバックに留め、Tailscale Serve で tailnet に公開することです。

OpenClaw の設定:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

その後、Serve でゲートウェイを起動します。

```bash
openclaw gateway --tailscale serve
```

OpenClaw のドキュメントは、これによりゲートウェイが `127.0.0.1` に留まり、Tailscale が HTTPS と tailnet ルーティングを提供すると述べています。アクセス先は `https://<magicdns-name>/` で、公開 VPS の IP ではありません。

Serve の代わりに直接 tailnet にバインドしたい場合は、明示的なゲートウェイ認証を使用します。

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

その後、別の tailnet デバイスから接続します。

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Docker などのコンテナランタイムで実行している場合は、ポート公開に特に注意が必要です。`-p 18789:18789` のような公開は通常、すべてのホストインターフェースにバインドします。ループバックと Tailscale Serve を使うか、コンテナがトラフィックを受け取れることを確認した上で、ホスト側を Tailscale IP に明示的にバインドすることを推奨します。

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Docker の設定を変更したら、外部からは `nmap`、ローカルからは `ss` で確認してください。Docker はホスト側のファイアウォール前提を回避したり順序を入れ替えたりする可能性があるため、対策を怠らないようにしましょう。

### Step 3: Lock Down SSH

たとえ Tailscale を使っていても、SSH は適切に保護すべきです。

```bash
# この作業中は現在の SSH セッションを維持してください。
# まず、クライアントマシンから Tailscale 経由で SSH できることを確認します:
ssh your-user@SERVER_TAILSCALE_IP

# sshd_config を書き換えるのではなく、drop‑in ファイルでハードニングを行います。
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# リロード前に構文チェックを行います。省略しないでください。
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

これにより、パスワード認証と root ログインが無効化されます。次のステップでは UFW を使い、パブリックからの SSH 接続を完全に遮断しつつ `tailscale0` 経由の SSH は許可します。

### Step 4: Firewall Rules

二段階目の防御としてファイアウォールを設定します。

```bash
# UFW (Ubuntu/Debian) を使用
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale が提供する Ubuntu 用ハードニングガイドでも同様の構成が推奨されています。`tailscale0` だけを許可し、他の受信トラフィックはすべて拒否します。これでパブリック SSH はタイムアウトし、`100.x.y.z` アドレスへの SSH は引き続き機能するはずです。もし同じ VPS 上で公開ウェブサイトを運用している場合は、必要最低限の公開ポート（例: `80/tcp` と `443/tcp`）だけを残すようにしてください。

## Exposure の確認

### 外部から開いているポートをチェック

Tailscale ネットワークに属さないマシンから実行します。

```bash
# 一般的な公開ポートが露出していないか確認
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# 保護されたインスタンスで期待される出力例:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

`22` や `18789` が `filtered` や `closed` ではなく `open` と表示されたら問題があります。`80` や `443` が開いている場合は、意図した公開ウェブサイトまたは Tailscale Funnel エンドポイントだけが対象であり、OpenClaw ゲートウェイが誤って公開されていないことを確認してください。

### ローカルで何がリッスンしているか確認

OpenClaw サーバー上で:

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

`0.0.0.0` や `:::`（IPv6 の同等表記）が出てきた場合、そのサービスはインターネットに公開されています。

### 組み込みセキュリティ監査

OpenClaw には [security audit command](https://docs.molt.bot/gateway/security) が同梱されており、設定がセキュリティのベストプラクティスに沿っているかをチェックします。

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

監査はゲートウェイの公開状態、Tailscale のモード、認証設定、チャネルアクセス、ツールポリシー、プラグインインベントリ、ファイル権限を検証します。`--fix` は便利な補助ツールとして利用し、結果の読み取りや手動での対策を置き換えるものではありません。

---

## これだけでは解決しないこと
---

Tailscale は最大の過ち、すなわちパブリックなオペレータ露出を排除しますが、すべてを解決するわけではありません。

**認証情報の保管**: OpenClaw はセッションの文字起こし、OAuth トークン、API キーをディスクに保存します。これらのファイルには適切なパーミッションを設定してください（ファイルは `chmod 600`、プライベート設定ディレクトリは `chmod 700`）。また、バージョン管理に含めないようにします。組み込みの監査機能がこれをチェックします。

**プラグインのサンドボックス化**: プラグインはユーザーのフル権限で実行されます。信頼できるソースからのみプラグインをインストールし、要求される権限を必ず確認してください。監査ツールはインストール済みプラグインを一覧化します。

**デバイスのセキュリティ**: Tailscale アカウントが侵害されたり、テイルネット上のデバイスが盗まれた場合、攻撃者は OpenClaw インスタンスにアクセスできるようになります。新規デバイスの接続に承認を要求する [Tailscale デバイス認可](https://tailscale.com/kb/1099/device-authorization/) を有効にしてください。

---

## デプロイチェックリスト

本番環境として OpenClaw/Moltbot インスタンスを扱う前に、以下を確認してください。

- [ ] サーバーとクライアントの両方に Tailscale がインストールされ、認証済みであること
- [ ] ゲートウェイは loopback 上で Tailscale Serve を使用するか、`tailnet` に明示的な認証でバインドされていること
- [ ] SSH はパスワード認証と root ログインを無効化していること
- [ ] ファイアウォール（UFW または iptables/nftables）で `tailscale0` のみを許可し、不要なパブリック入口を遮断していること
- [ ] 外部からの nmap スキャンで全ポートが `filtered` または `closed` と表示されること
- [ ] 内部で `ss -tulpn` を実行し、ゲートウェイが `127.0.0.1`、`::1`、または Tailscale IP のみでバインドされていること
- [ ] 認証情報ファイルの権限が 600、プライベート設定ディレクトリの権限が 700 であること
- [ ] `openclaw security audit --deep` を実行し、すべての指摘事項に対処すること
- [ ] OpenClaw の Tailscale 管理機能を使用している場合、実行承認が有効化されていること
- [ ] 定期的なバックアップが設定されていること（OpenClaw データ＋設定）

---

## リソース

- [OpenClaw Security Guide](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale Integration](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI Reference](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [Use UFW to Lock Down an Ubuntu Server](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [Security Audit: 512 Findings (GitHub Issue)](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap Network Scanning Guide](https://nmap.org/book/man.html)
````
