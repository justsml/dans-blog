# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx
- Validation: deferred
- Runtime seconds: 26.35
- Input tokens: 6909
- Output tokens: 3267
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.013255
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的 AI 助手给了我 Shell 权限
subTitle: 如何加固本地或 VPS 环境下的 OpenClaw/Moltbot 部署
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
OpenClaw（原名 Clawdbot/Moltbot）为你提供了一个跨越 WhatsApp、Slack、Discord、iMessage 等频道的个人 AI 助手。但如果你在没有强认证的情况下，将它的网关（gateway）、节点控制或 SSH 暴露在公网上，你就是在给陌生人递刀子，让他们有机会获取你机器的 shell 访问权限。

本指南展示了最安全的默认配置：将 OpenClaw 网关保持在回环地址（loopback）上，仅通过 Tailscale Serve 对你的 tailnet 暴露，锁定 SSH，并从外部验证网关是否处于非公开状态。

该项目的快速普及暴露了现实的安全隐患：[Shodan 扫描在最初几周内发现了 2,847 个暴露实例](https://socradar.io/blog/clawdbot-is-it-safe/)，而一个 [GitHub 安全审计议题在代码库中报告了 512 项发现](https://github.com/moltbot/moltbot/issues/1796)。其中一部分是自动化扫描器的输出，且自 2026 年 1 月更名为 OpenClaw 以来，部分内容已发生变化，因此请将这些数字视为警示信号，而非精确的当前漏洞计数。你不需要成为安全专家——你只需要在部署前避免发布操作界面（operator surfaces）。

---

## 你到底暴露了什么

取决于你的安装和暴露方式，有三个界面值得检查：

- **22 端口**：VPS 上的 SSH 访问
- **18789 端口**：网关控制 UI 和 WebSocket API
- **浏览器/节点控制**：通过网关/节点配对模型进行的远程节点执行和浏览器自动化

目前的 [OpenClaw 远程访问文档](https://docs.molt.bot/gateway/remote) 指出，网关 WebSocket 默认绑定到回环地址，并建议除非你刻意选择 LAN/tailnet/自定义绑定，否则应保持仅限回环。这很好。风险出现在当你覆盖该默认值、发布 Docker 端口、添加反向代理、开启 Funnel 或将 SSH 对全球开放时。

网关是重头戏。它是你助手的操作界面，包括工具调用路径。如果它能从互联网访问，且认证缺失、薄弱、被绕过或泄露，攻击者就可能以你的用户权限驱动 Agent 或调用工具。

浏览器控制同样敏感。目前的 OpenClaw 文档建议通过浏览器所在机器上的配对节点运行浏览器控制，并将节点配对视为操作员级别的访问。如果网关可以在配对节点上调用 `system.run`，那就是在该节点上的远程代码执行（RCE），受限于网关的节点策略和节点自身的执行审批。

SSH 就是 SSH。如果你启用了密码认证，在公网 VPS 上遭遇暴力破解是必然的。

---

## Tailscale 解决方案

对于 OpenClaw，Tailscale 让你在不发布操作服务的情况下实现远程访问：

1. 你的 OpenClaw 实例运行在 VPS 或本地机器上
2. 网关保持绑定到回环地址，通过 Tailscale Serve 访问，或者直接绑定到带有显式认证的 tailnet IP
3. 你在服务器和个人设备上都安装 Tailscale
4. 你通过 Tailscale IP 或 MagicDNS 名称访问 OpenClaw
5. 互联网上的其他所有人什么都看不见，除非你刻意启用了 Funnel 或其他公网代理

### 你应该让 OpenClaw 管理 Tailscale 吗？

OpenClaw 具有[内置的 Tailscale 集成](https://docs.molt.bot/gateway/tailscale)，可以为网关配置 `tailscale serve` 或 `tailscale funnel`。

**Serve 模式**将一切限制在你的 tailnet 内部。网关保持绑定到 `127.0.0.1`，由 Tailscale 处理路由和 HTTPS。当启用 `gateway.auth.allowTailscale` 时，OpenClaw 可以使用 Tailscale 身份标头（identity headers）对控制 UI/WebSocket 流量进行认证，并使用 `tailscale whois` 验证来源。对于大多数个人部署，这是正确的模式。

**Funnel 模式**通过 Tailscale 的公网端点功能将网关暴露在公网上。Tailscale 官方文档将 Funnel 描述为将来自广域网的流量路由到本地服务。除非网关认证模式设置为 `password`，否则 OpenClaw 会拒绝启动 Funnel，但即便如此，你依然是在选择将操作界面暴露给公网。

OpenClaw 的[安全文档](https://docs.molt.bot/gateway/security)明确指出，提示词注入（prompt injection）和工具访问权限是个人助手面临的核心风险。不要给 Agent 留下任何能够悄悄把自己公开化的路径。应谨慎使用 Serve，除非确实需要公网访问，否则避免使用 Funnel，并且对任何 `tailscale` 命令都要求执行审批。

---

## 安全配置 OpenClaw

### 第一步：安装 Tailscale

在你的 VPS 或本地服务器上：

```bash
# 安装 Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 认证（会打开浏览器进行登录）
sudo tailscale up

# 获取你的 Tailscale IP
tailscale ip -4
# 输出：100.x.x.x
```

在你的客户端机器上，从官方下载页面安装 Tailscale 并登录到同一个 tailnet。

现在两台机器都处于同一个私有网络中。你可以使用 VPS 的 Tailscale IP 进行 ping 测试，流量将通过加密隧道路由。

### 第二步：配置 OpenClaw 使用 Tailscale

目前最安全的模式是：将网关保持在回环地址（loopback）上，并通过 Tailscale Serve 将其暴露给你的 tailnet。

在 OpenClaw 配置中：

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

然后启动带有 Serve 功能的网关：

```bash
openclaw gateway --tailscale serve
```

OpenClaw 文档说明此操作会将网关保持在 `127.0.0.1`，同时由 Tailscale 提供 HTTPS 和 tailnet 路由。你通过 `https://<magicdns-name>/` 访问它，而不是通过 VPS 的公网 IP。

如果你更倾向于直接绑定 tailnet 而不是使用 Serve，请使用显式的网关认证：

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

然后从另一个 tailnet 设备连接：

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

如果你在 Docker 或其他容器运行时中运行，请务必小心端口发布。类似 `-p 18789:18789` 的发布通常会绑定到宿主机的所有接口。建议优先选择回环地址加 Tailscale Serve，或者在确认容器仍能接收流量后，将宿主机端显式绑定到 Tailscale IP：

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

在进行任何 Docker 更改后，请使用 `nmap` 从外部检查，并使用 `ss` 在本地检查。如果你没有考虑到 Docker 的特性，它可能会绕过或重新排序宿主机的防火墙规则。

### 第三步：锁定 SSH

即使使用了 Tailscale，你仍然应该妥善保护 SSH：

```bash
# 执行此操作时，请保持当前的 SSH 会话处于开启状态。
# 首先，从你的客户端机器确认可以通过 Tailscale 进行 SSH：
ssh your-user@SERVER_TAILSCALE_IP

# 将加固配置放入 drop-in 文件中，而不是直接重写 sshd_config。
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# 在重新加载前进行验证。切勿跳过此步。
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

这将禁用密码登录和 root 登录。下一步将使用 UFW 完全阻止公共 SSH 访问，同时仍允许通过 `tailscale0` 进行 SSH。

### 第四步：防火墙规则

设置防火墙作为第二层防御：

```bash
# 使用 UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale 官方的 Ubuntu 加固指南也采用了同样的模式：允许 `tailscale0` 接口，拒绝其他入站流量，然后验证公网 SSH 是否超时，而连接到 `100.x.y.z` 地址的 SSH 是否依然正常。如果你在同一台 VPS 上运行公共网站，请仅保留真正需要的公共规则，例如 `80/tcp` 和 `443/tcp`。

---

## 检查暴露情况

### 从外部检查开放端口

从一台**不在**你 Tailscale 网络中的机器执行：

```bash
# 检查常见的公共端口是否暴露
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# 安全实例的预期输出：
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

如果 `22` 或 `18789` 显示为 `open` 而不是 `filtered` 或 `closed`，说明你存在安全问题。如果 `80` 或 `443` 是开放的，请确保那只是你刻意运行的公共网站或 Tailscale Funnel 端点，而不是误开的 OpenClaw 网关。

### 检查本地监听状态

在你的 OpenClaw 服务器上执行：

```bash
# 显示所有监听端口及其绑定的地址
sudo ss -tulpn | grep LISTEN

# 寻找类似这样的行（配合 Serve 时的理想状态）：
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# 或者这样（直接绑定 Tailnet 并开启认证时的可接受状态）：
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# 绝不应该是这样（危险）：
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

如果你看到 `0.0.0.0` 或 `:::`（IPv6 等效地址），意味着该服务已向全世界暴露。

### 内置安全审计

OpenClaw 包含一个[安全审计命令](https://docs.molt.bot/gateway/security)，可根据安全最佳实践检查你的配置：

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

该审计会检查网关暴露情况、Tailscale 模式、认证设置、通道访问、工具策略、插件清单以及文件权限。请将 `--fix` 视为一个有用的辅助工具，而不是替代人工阅读审计结果。

---

## 尚未解决的问题

Tailscale 解决了最大的隐患：操作界面的公网暴露。但它并不能解决所有问题：

**凭据存储**：OpenClaw 会将会话记录、OAuth 令牌和 API 密钥存储在磁盘上。请确保这些文件具有正确的权限（文件设为 `chmod 600`，私有配置目录设为 `chmod 700`），且不要将其纳入版本控制。内置的审计工具会检查这些项。

**插件沙箱**：插件以你当前用户的完整权限运行。仅安装来自信任源的插件，并审查它们请求的能力。审计工具会列出已安装插件的清单。

**设备安全**：如果有人攻破了你的 Tailscale 账户或窃取了你 tailnet 上的设备，他们就能访问你的 OpenClaw 实例。请启用 [Tailscale 设备授权](https://tailscale.com/kb/1099/device-authorization/)，要求对新设备进行人工审批。

---

## 部署检查清单

在认为你的 OpenClaw/Moltbot 实例可以投入生产之前，请对照以下各项：

- [ ] 服务器和客户端均已安装 Tailscale 并完成认证
- [ ] 网关保持在回环地址（loopback）并通过 Tailscale Serve 转发，或绑定到 `tailnet` 并开启显式认证
- [ ] SSH 已配置为禁用密码认证和 root 登录
- [ ] 防火墙（UFW 或 iptables/nftables）配置为允许 `tailscale0` 并拒绝不必要的公网入站流量
- [ ] 外部 nmap 扫描显示所有端口均为 `filtered` 或 `closed`
- [ ] 内部执行 `ss -tulpn` 显示网关仅绑定到 `127.0.0.1`、`::1` 或 Tailscale IP
- [ ] 凭据文件权限为 600，私有配置目录权限为 700
- [ ] 运行 `openclaw security audit --deep` 并处理所有发现的问题
- [ ] 如果使用 OpenClaw 的 Tailscale 管理功能，已启用执行审批（exec approvals）
- [ ] 已配置定期备份（OpenClaw 数据 + 配置）

---

## 相关资源

- [OpenClaw 安全指南](../docs.molt.bot/gateway/security)
- [OpenClaw Tailscale 集成](../docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI 参考](../tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](../tailscale.com/docs/features/tailscale-funnel)
- [使用 UFW 加固 Ubuntu 服务器](../tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [安全审计：512 项发现 (GitHub Issue)](../github.com/moltbot/moltbot/issues/1796)
- [Nmap 网络扫描指南](../nmap.org/book/man.html)
````
