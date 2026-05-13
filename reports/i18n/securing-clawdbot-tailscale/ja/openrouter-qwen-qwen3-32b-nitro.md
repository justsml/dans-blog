# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 162.35
- Input tokens: 12686
- Output tokens: 10206
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003464
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(ja): securing-clawdbot-tailscale via openrouter/qwen/qwen3-32b:nitro -- src/content/posts/2026-01-26--securing-clawdbot-tailscale/ja/index.mdx reports/i18n/securing-clawdbot-tailscale/ja
## Raw Output

````mdx
---
title: あなたのAIアシスタントがシェルアクセスをくれた
subTitle: ローカルまたはVPS環境でのOpenClaw/Moltbotのセキュア化方法
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
OpenClaw（以前はClawdbot/Moltbot）は、WhatsApp、Slack、Discord、iMessageなどのチャネルで動作する個人用AIアシスタントを提供します。しかし、強力な認証なしにそのゲートウェイ、ノード制御、SSHをパブリックインターネットに公開すると、他人があなたのマシンにシェルアクセスを取得する道を提供することになります。

このガイドでは、最も安全なデフォルト設定を示します。OpenClawのゲートウェイをループバックに保持し、Tailscale Serveを通じてtailnetにのみ公開し、SSHをロックダウンし、外部からゲートウェイがパブリックでないことを確認してください。

プロジェクトの急速な採用によって、実際のセキュリティ上の懸念が明らかになりました。[Shodanスキャンで最初の数週間で2,847台の公開インスタンスが見つかりました](https://socradar.io/blog/clawdbot-is-it-safe/)。また、[GitHubセキュリティアудィットでコードベースに512の発見が報告されました](https://github.com/moltbot/moltbot/issues/1796)。一部は自動スキャナの出力であり、2026年1月のOpenClawへのリネーム以降で一部は変更されています。そのため、この数字は正確な現在の脆弱性数ではなく警告のサインとして扱ってください。セキュリティの専門家である必要はありません。単に展開前に操作対象のインターフェースを公開しないようにするだけです。

---

## 実際に公開している内容

インストールおよび公開方法によって、チェックすべき3つのインターフェースがあります。

- **ポート22**: VPS上のSSHアクセス  
- **ポート18789**: ゲートウェイコントロールUIおよびWebSocket API  
- **ブラウザ/ノード制御**: ゲートウェイ/ノードのペアリングモデルを通じたリモートノード実行およびブラウザオートメーション  

現在の[OpenClawリモートアクセスドキュメント](https://docs.molt.bot/gateway/remote)では、ゲートウェイWebSocketがデフォルトでループバックにバインドされ、意図的にLAN/tailnet/カスタムバインドを選択しない限りループバック専用のままにすることを推奨しています。これは良い設計です。リスクは、このデフォルトを上書きし、Dockerポートを公開したり、リバースプロキシを追加したり、Funnelを有効化したり、SSHをインターネットに公開した場合に発生します。  

ゲートウェイが最も重要です。これはあなたのアシスタントのオペレーターサーフェスであり、ツール呼び出しパスも含まれます。インターネットから到達可能で、認証が欠如し、弱い、回避されたり、漏洩している場合、攻撃者はエージェントを操作したり、あなたのユーザーの権限でツールを呼び出す可能性があります。  

ブラウザ制御もほぼ同様に敏感です。現在のOpenClawドキュメントでは、ブラウザマシン上のペアノードホストを通じてブラウザ制御を実行し、ノードペアリングをオペレーターアクセスのように扱うことを推奨しています。ゲートウェイがペアノードで`system.run`を呼び出せる場合、それはそのノード上のリモートコード実行であり、ゲートウェイのノードポリシーやノード独自の実行承認に従います。  

SSHはSSHです。パスワード認証が有効になっている状態で運用している場合、公開されたVPSではブルートフォース攻撃が避けられないでしょう。

## Tailscaleによる解決策

OpenClawにおいて、Tailscaleはオペレーターサービスを公開せずにリモートアクセスを提供します：

1. あなたのOpenClawインスタンスはVPSまたはローカルマシン上で動作します  
2. ゲートウェイはloopbackにバインドされたままになり、Tailscale Serve経由でアクセスされるか、明示的な認証付きでtailnet IPに直接バインドされます  
3. サーバーと個人デバイスの両方にTailscaleをインストールします  
4. Tailscale IPまたはMagicDNS名を通じてOpenClawにアクセスします  
5. インターネット上の他のすべてのユーザーは、Funnelや他のパブリックプロキシを意図的に有効にしない限り何も見えません  

### OpenClawがTailscaleを管理すべきか？

OpenClawには[組み込みのTailscale統合](https://docs.molt.bot/gateway/tailscale)があり、ゲートウェイ用の`tailscale serve`または`tailscale funnel`を構成できます。

**Serveモード**はtailnet内でのみ動作を維持します。ゲートウェイは`127.0.0.1`にバインドされたままになり、TailscaleがルーティングとHTTPSを処理します。`gateway.auth.allowTailscale`が有効化されている場合、OpenClawはTailscale IDヘッダーを使用してControl UI/WebSocketトラフィックを認証し、`tailscale whois`でソースを検証します。これはほとんどの個人デプロイメントに適したモードです。

**Funnelモード**は、Tailscaleのパブリックエンドポイント機能を通じてゲートウェイを公開します。Tailscaleの公式ドキュメントでは、Funnelはインターネットからのトラフィックをローカルサービスにルーティングする仕組みとして説明されています。OpenClawは、ゲートウェイ認証モードが`password`でない限りFunnelの起動を拒否しますが、それでもオペレーターサーフェスの公開を選択していることに注意してください。

OpenClawの[セキュリティドキュメント](https://docs.molt.bot/gateway/security)では、プロンプトインジェクションやツールアクセスが個人アシスタントにとっての主要なリスクであると明記されています。エージェントに静かに自身を公開するパスを提供しないでください。Serveモードを意図的に使用し、本当にパブリックアクセスが必要でない限りFunnelを避け、`tailscale`コマンドの実行承認を必須としましょう。

---

## OpenClawをセキュアに設定する

### ステップ1: Tailscaleをインストールする

あなたのVPSまたはローカルサーバーで:

```bash
# Tailscaleをインストール
curl -fsSL https://tailscale.com/install.sh | sh

# 認証（ブラウザでログインします）
sudo tailscale up

# Tailscale IPを取得
tailscale ip -4
# 出力例: 100.x.x.x
```

クライアントマシンでは、公式ダウンロードページからTailscaleをインストールし、同じtailnetにログインしてください。

これで2台のマシンが同じプライベートネットワークに接続されます。VPSのTailscale IPアドレスでpingを送信すれば、暗号化されたトンネルを経由して通信できます。

### ステップ2: OpenClawをTailscaleで構成する

現在最も安全なパターンは: ゲートウェイをループバックに維持し、Tailscale Serveを通じてtailnetに公開することです。

OpenClawの設定で:
```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

その後、Serveモードでゲートウェイを起動します:

```
openclaw gateway --tailscale serve
```

OpenClawのドキュメントでは、この設定によりゲートウェイが`127.0.0.1`に維持され、TailscaleがHTTPSとtailnetルーティングを提供すると説明しています。アクセス先はVPSのパブリックIPではなく、`https://<magicdns-name>/`で開く必要があります。

Serveモードではなく、直接tailnetバインドを好む場合は明示的なゲートウェイ認証を使用してください:

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

その後、別のtailnetデバイスから接続します:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Dockerや他のコンテナランタイムで実行している場合、ポート公開の設定に特に注意してください。`-p 18789:18789`のような公開設定は通常すべてのホストインターフェースにバインドされます。ループバック＋Tailscale Serveを優先するか、コンテナがトラフィックを正常に受信することを確認した上でホスト側を明示的にTailscale IPにバインドしてください:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Dockerの変更後は、外部から`nmap`で確認し、ローカルでは`ss`コマンドで検証してください。ホストファイアウォールの想定をバイパスまたは順序を変更してしまう可能性があるため、Dockerの動作を明確に考慮する必要があります。

### ステップ3: SSHをロックダウンする
```

Tailscaleを導入しても、SSHを適切にセキュリティ対策を行う必要があります。

```bash
# これを実行中に現在のSSHセッションを維持してください。
# まず、クライアントマシンからTailscale経由でSSHが可能か確認します:
ssh your-user@SERVER_TAILSCALE_IP

# sshd_configを上書きせず、ドロップインファイルに強化設定を配置してください。
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# 再読み込み前に検証してください。このステップをスキップしないでください。
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

これによりパスワード認証とrootログインが無効になります。次のステップではUFWを使用して、`tailscale0`経由のSSHは許可したまま、公開SSHを完全にブロックします。

### ステップ4: ファイアウォールルール

2層目のセキュリティとしてファイアウォールを設定してください:

```bash
# UFW (Ubuntu/Debian)を使用する場合
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

TailscaleのUbuntu強化ガイドもこの構成を採用しています: `tailscale0`を許可し、他のインバウンドトラフィックをブロックします。その後、公開SSHがタイムアウトすることを確認しつつ、`100.x.y.z`アドレスへのSSH接続が引き続き可能であることを検証してください。同じVPSで公開ウェブサイトを運用している場合は、本当に必要なみの公開ルール（例: `80/tcp`と`443/tcp`）だけを保持してください。

## 暴露状況の確認

### 外部からの開ポートの確認

Tailscaleネットワークに含まれていないマシンから:

```bash
# 一般的な公開ポートが暴露されているか確認
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# セキュアなインスタンスの予期される出力:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

`22`または`18789`が`filtered`または`closed`ではなく`open`と表示される場合、問題があります。`80`または`443`が開いている場合、それが意図的な公開ウェブサイトまたはTailscale Funnelエンドポイントであることを確認し、OpenClawゲートウェイが誤って公開されていないことを確認してください。

### ローカルでリッスンしているサービスの確認

OpenClawサーバー上で:

```bash
# 起動中のポートとバインド先を表示
sudo ss -tulpn | grep LISTEN

# このような行を探す（Serve用に良い）:
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# またはこれ（認証付きで直接tailnetバインドも可）:
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# これは悪い（絶対に避ける）:
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

`0.0.0.0`または`:::`（IPv6同等）が表示される場合、そのサービスは世界中のアクセスを受け入れています。

### 組み込みセキュリティ監査

OpenClawには[セキュリティ監査コマンド](https://docs.molt.bot/gateway/security)が含まれており、あなたの設定がセキュリティのベストプラクティスに合っているかをチェックします:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

この監査はゲートウェイの公開状態、Tailscaleモード、認証設定、チャネルアクセス、ツールポリシー、プラグインインベントリ、ファイル権限をチェックします。`--fix`は補助的なものとして扱い、結果を読むことの代替にはなりません。

---

## これで解決されない問題
---

Tailscaleは最大の間違いである公開オペレータの露出を解消します。しかしすべてを解決するわけではありません:

**資格情報の保存**: OpenClawはセッションの転写、OAuthトークン、APIキーをディスクに保存します。これらが適切なファイル権限（ファイルは`chmod 600`、プライベート設定ディレクトリは`chmod 700`）を持ち、バージョン管理に入っていないことを確認してください。組み込みの監査ツールはこれらをチェックします。

**プラグインのサンドボックス**: プラグインはあなたのユーザーのフル権限で実行されます。信頼できるソースからのみプラグインをインストールし、要求する権限を確認してください。監査ツールはインストール済みプラグインを一覧表示します。

**デバイスのセキュリティ**: あなたのTailscaleアカウントが乗っ取られたり、tailnet上のデバイスが盗まれたりすると、OpenClawインスタンスにアクセスできます。[Tailscaleデバイス認証](https://tailscale.com/kb/1099/device-authorization/)を有効にして、新しいデバイスの承認を必須に設定してください。

---

## 配置チェックリスト
---

OpenClaw/Moltbotインスタンスを運用就緒とみなす前に：

- [ ] サーバーおよびクライアントでTailscaleがインストールされ、認証済み  
- [ ] ゲートウェイをループバックでTailscale Serveに保持、または`tailnet`にバインドし明示的な認証を設定  
- [ ] SSHをパスワード認証とrootログインの無効化を設定  
- [ ] ファイアウォール（UFWまたはiptables/nftables）で`tailscale0`の許可と不要な公開イングレスの拒否を設定  
- [ ] 外部nmapスキャンですべてのポートが`filtered`または`closed`と表示される  
- [ ] 内部`ss -tulpn`でゲートウェイが`127.0.0.1`、`::1`、またはTailscale IPのみにバインドされている  
- [ ] 認証ファイルの権限が600、プライベート設定ディレクトリの権限が700  
- [ ] `openclaw security audit --deep`を実行し、すべての発見を対応  
- [ ] OpenClaw Tailscale管理を使用する場合、exec承認が有効  
- [ ] OpenClawデータと設定の定期バックアップが設定  

---

## リソース

- [OpenClawセキュリティガイド](https://docs.molt.bot/gateway/security)  
- [OpenClaw Tailscale統合](https://docs.molt.bot/gateway/tailscale)  
- [Tailscale Serve CLIリファレンス](https://tailscale.com/docs/reference/tailscale-cli/serve)  
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)  
- [UFWでUbuntuサーバーをロックダウンする](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)  
- [セキュリティ監査: 512の発見 (GitHub Issue)](https://github.com/moltbot/moltbot/issues/1796)  
- [Nmapネットワークスキャンガイド](https://nmap.org/book/man.html)
````
