# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx
- Validation: deferred
- Runtime seconds: 9.06
- Input tokens: 6959
- Output tokens: 3364
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000877
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的 AI助手给了我 Shell 访问权限
subTitle: 如何保护本地或 VPS 上的 OpenClaw/Moltbot 设置
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
OpenClaw（前身为 Clawdbot/Moltbot）为你提供一个跨 WhatsApp、Slack、Discord、iMessage 等渠道的个人 AI 助手。但如果你把它的网关、节点控制或 SSH 暴露在公共互联网且没有强身份验证，就相当于给陌生人提供了一条通往你机器的 shell 访问路径。

本指南展示了最安全的默认做法：让 OpenClaw 的网关仅绑定在回环地址，只通过 Tailscale Serve 向你的 tailnet 暴露，锁定 SSH，并从外部验证网关未对公网开放。

项目的快速普及暴露了真实的安全问题：在最初几周内，[Shodan 扫描发现了 2,847 个暴露实例](https://socradar.io/blog/clawdbot-is-it-safe/)，而 [GitHub 安全审计 issue 报告了 512 条发现](https://github.com/moltbot/moltbot/issues/1796)。其中一些是自动扫描的结果，部分自 2026 年 1 月更名为 OpenClaw 后已有所变化，因此请将这些数字视为警示信号，而非精确的当前漏洞计数。你不需要成为安全专家——只要在部署前避免公开发布操作面即可。

---

## 实际上你在暴露什么

根据你的安装和暴露方式，有三类表面值得检查：

- **端口 22**：VPS 上的 SSH 访问  
- **端口 18789**：网关控制 UI 与 WebSocket API  
- **浏览器/节点控制**：通过网关/节点配对模型的远程节点执行和浏览器自动化  

当前的 [OpenClaw 远程访问文档](https://docs.molt.bot/gateway/remote) 说明网关 WebSocket 默认绑定在回环地址，并建议除非你刻意选择 LAN/tailnet/自定义绑定，否则保持回环绑定。这是正确的做法。风险出现在你覆盖默认设置、发布 Docker 端口、添加反向代理、开启 Funnel，或让 SSH 对全世界开放时。

网关是最大的风险点。它是助手的操作面，包含工具调用路径。如果它可以被互联网访问且身份验证缺失、弱化、被绕过或泄漏，攻击者可能利用你的用户权限驱动代理或调用工具。

浏览器控制的敏感度几乎相当。当前 OpenClaw 文档建议在浏览器机器上通过配对节点主机运行浏览器控制，并将节点配对视为操作访问。如果网关能够在配对节点上调用 `system.run`，则相当于对该节点的远程代码执行，受网关的节点策略和节点自身的执行批准约束。

SSH 就是 SSH。如果你启用了密码认证，公共 VPS 上的暴力破解尝试是不可避免的。

---

## Tailscale 方案

对于 OpenClaw，Tailscale 能让你在不公开运营服务的前提下实现远程访问：

1. 你的 OpenClaw 实例运行在 VPS 或本地机器上  
2. 网关保持绑定在回环地址，并通过 Tailscale Serve 访问，或直接绑定到 tailnet IP 并使用显式身份验证  
3. 在服务器和个人设备上都安装 Tailscale  
4. 通过其 Tailscale IP 或 MagicDNS 名称访问 OpenClaw  
5. 互联网上的其他人看不到任何内容，除非你刻意启用 Funnel 或其他公共代理  

### 是否让 OpenClaw 管理 Tailscale？

OpenClaw 提供了[内置的 Tailscale 集成](https://docs.molt.bot/gateway/tailscale)，可以为网关配置 `tailscale serve` 或 `tailscale funnel`。

**Serve 模式** 只在你的 tailnet 内部工作。网关保持绑定在 `127.0.0.1`，由 Tailscale 负责路由和 HTTPS。当 `gateway.auth.allowTailscale` 启用时，OpenClaw 可以使用 Tailscale 身份头部对控制 UI/WebSocket 流量进行身份验证，并通过 `tailscale whois` 验证来源。这是大多数个人部署的正确模式。

**Funnel 模式** 通过 Tailscale 的公共端点功能将网关公开。Tailscale 官方文档把 Funnel 描述为把来自更广泛互联网的流量路由到本地服务。OpenClaw 在网关认证模式为 `password` 时才会允许启动 Funnel，但这仍然是把运营者表面暴露在公共网络上。

OpenClaw 的[安全文档](https://docs.molt.bot/gateway/security)明确指出，提示注入和工具访问是个人助理的核心风险。不要让代理悄悄把自己公开。应当有意识地使用 Serve，除非真的需要公共访问，否则避免使用 Funnel，并且对任何 `tailscale` 命令都要求执行批准。

---

## 安全地部署 OpenClaw

### 步骤 1：安装 Tailscale

在你的 VPS 或本地服务器上：

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

在客户端机器上，从官方下载页面安装 Tailscale 并登录到同一 tailnet。

此时两台机器已在同一私有网络中。你可以使用 VPS 的 Tailscale IP 进行 ping，流量会走加密隧道。

### 步骤 2：配置 OpenClaw 使用 Tailscale

当前最安全的做法是：让网关绑定在回环地址，并通过 Tailscale Serve 将其暴露给 tailnet。

在 OpenClaw 配置中：

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

随后使用 Serve 启动网关：

```bash
openclaw gateway --tailscale serve
```

OpenClaw 文档说明，这会让网关保持在 `127.0.0.1`，而由 Tailscale 提供 HTTPS 与 tailnet 路由。你访问的地址是 `https://<magicdns-name>/`，而不是公开的 VPS IP。

如果更倾向于直接在 tailnet 上绑定而不是使用 Serve，可使用显式的网关认证：

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

然后从另一台 tailnet 设备连接：

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

如果你在 Docker 或其他容器运行时，需要格外注意端口发布。`-p 18789:18789` 通常会绑定所有主机接口。推荐使用回环加 Tailscale Serve，或在确认容器仍能收到流量后，将宿主机侧显式绑定到 Tailscale IP：

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

任何 Docker 变更后，都要使用 `nmap` 从外部检查，使用 `ss` 在本地检查。若未考虑容器的行为，Docker 可能会绕过或重新排列宿主防火墙的假设。

### 步骤 3：锁定 SSH

即使使用 Tailscale，也必须正确加固 SSH：

```bash
# 在执行以下操作时保持当前 SSH 会话打开。
# 首先，在客户端机器上确认可以通过 Tailscale SSH：
ssh your-user@SERVER_TAILSCALE_IP

# 将加固规则放入 drop‑in 文件，而不是直接改写 sshd_config。
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# 重新加载前先验证配置，切勿跳过此步骤。
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

此配置禁用基于密码的登录和 root 登录。下一步使用 UFW 完全阻断公共 SSH，同时仍允许 `tailscale0` 上的 SSH。

### 步骤 4：防火墙规则

将防火墙作为第二层防护：

```bash
# 使用 UFW（Ubuntu/Debian）
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale 官方的 Ubuntu 加固指南采用相同的思路：允许 `tailscale0`，拒绝其他入站流量，然后验证公共 SSH 超时，而对 `100.x.y.z` 地址的 SSH 仍可工作。如果在同一 VPS 上运行公共网站，只保留真正需要的公共规则，例如 `80/tcp` 和 `443/tcp`。

---

## 检查你的暴露面

### 从外部检查开放端口

在 **不在** 你的 Tailscale 网络中的机器上运行：

```bash
# 检查常见公共端口是否暴露
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# 对已加固实例的预期输出：
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

如果 `22` 或 `18789` 显示为 `open` 而非 `filtered` 或 `closed`，说明存在问题。若 `80` 或 `443` 为 open，请确认这仅是你有意公开的网站或 Tailscale Funnel 端点，而不是意外暴露的 OpenClaw 网关。

### 检查本机监听情况

在你的 OpenClaw 服务器上：

```bash
# 显示所有监听端口及其绑定地址
sudo ss -tulpn | grep LISTEN

# 期望出现的行（Serve 模式下）：
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# 或者（直接绑定 tailnet 并使用认证）：
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# **不应出现**（不安全）：
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

若看到 `0.0.0.0` 或 `:::`（IPv6 等价），说明该服务已对全网开放。

### 内置安全审计

OpenClaw 包含一个[安全审计命令](https://docs.molt.bot/gateway/security)，可检查你的配置是否符合安全最佳实践：

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

审计会检查网关暴露、Tailscale 模式、认证设置、频道访问、工具策略、插件清单以及文件权限。将 `--fix` 视为有用的辅助工具，而不是阅读审计结果的替代方案。

---

## 本指南未能解决的事项

Tailscale 消除了最大的错误：公开的运营者暴露。但它并不能解决所有问题：

**凭证存储**：OpenClaw 会将会话记录、OAuth 令牌和 API 密钥写入磁盘。确保这些文件拥有正确的权限（文件 `chmod 600`，私有配置目录 `chmod 700`），并且不要把它们提交到版本控制。内置审计会检查此类问题。

**插件沙箱**：插件在你的用户权限下运行。只从可信来源安装插件，并审查它们请求的能力。审计工具会列出已安装的插件。

**设备安全**：如果有人攻破你的 Tailscale 账户或窃取了 tailnet 上的设备，他们就能访问你的 OpenClaw 实例。启用 [Tailscale 设备授权](https://tailscale.com/kb/1099/device-authorization/) 以要求对新设备进行批准。

---

## 部署检查清单

在认为你的 OpenClaw/Moltbot 实例可以投入生产之前：

- [ ] 在服务器和客户端上均已安装并完成 Tailscale 认证
- [ ] 网关保持在回环地址并使用 Tailscale Serve，或绑定到 `tailnet` 并使用显式认证
- [ ] SSH 已配置为禁用密码登录和 root 登录
- [ ] 防火墙（UFW 或 iptables/nftables）已配置仅允许 `tailscale0`，并拒绝不必要的公共入口
- [ ] 外部 nmap 扫描显示所有端口均为 `filtered` 或 `closed`
- [ ] 内部 `ss -tulpn` 显示网关仅绑定在 `127.0.0.1`、`::1` 或 Tailscale IP 上
- [ ] 凭证文件权限为 600，私有配置目录权限为 700
- [ ] 运行 `openclaw security audit --deep` 并处理所有发现
- [ ] 若使用 OpenClaw Tailscale 管理，已启用执行批准
- [ ] 已配置定期备份（OpenClaw 数据 + 配置）

---

## 资源

- [OpenClaw 安全指南](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale 集成](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI 参考](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [使用 UFW 锁定 Ubuntu 服务器](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [安全审计：512 条发现（GitHub Issue）](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap 网络扫描指南](https://nmap.org/book/man.html)
````
