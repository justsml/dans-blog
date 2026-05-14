# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx
- Validation: deferred
- Runtime seconds: 27.89
- Input tokens: 6800
- Output tokens: 4792
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.002241
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的AI助手给了我Shell访问权限
subTitle: 如何加固你的本地或VPS OpenClaw/Moltbot 配置
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
OpenClaw（原名 Clawdbot/Moltbot）为你提供一个跨 WhatsApp、Slack、Discord、iMessage 及其他渠道工作的个人 AI 助手。但如果你将其网关、节点控制或 SSH 暴露在公网上且未启用强认证，就等于给陌生人提供了一条通往你机器 shell 访问的路径。

本指南展示最安全的默认方案：将 OpenClaw 网关绑定到 loopback，仅通过 Tailscale Serve 暴露给你的 tailnet，锁定 SSH，并从外部验证网关未公开。

该项目快速普及暴露了真实的安全隐患：[Shodan 扫描在最初几周发现了 2,847 个暴露实例](https://socradar.io/blog/clawdbot-is-it-safe/)，并且 [GitHub 安全审计问题报告了代码库中的 512 个发现](https://github.com/moltbot/moltbot/issues/1796)。其中一部分是自动化扫描器的输出，另一部分在 2026 年 1 月更名为 OpenClaw 后已发生变化，因此请将这些数字视为警示信号，而非精确的当前漏洞计数。你不需要成为安全专家——你只需要在部署前避免发布操作面。

---

## 你实际暴露了什么

根据你安装和暴露的方式，有三个值得检查的面：

- **端口 22**：VPS 上的 SSH 访问
- **端口 18789**：网关控制 UI 和 WebSocket API
- **浏览器/节点控制**：通过网关/节点配对模型实现的远程节点执行和浏览器自动化

当前的 [OpenClaw 远程访问文档](https://docs.molt.bot/gateway/remote) 说明网关 WebSocket 默认绑定到 loopback，并建议保持仅 loopback，除非你特意选择 LAN/tailnet/自定义绑定。这很好。风险出现在你覆盖该默认设置、发布 Docker 端口、添加反向代理、启用 Funnel 或让 SSH 对世界开放时。

网关是重中之重。它是你助手的操作面，包括工具调用路径。如果它可从互联网访问且认证缺失、薄弱、被绕过或泄露，攻击者可能能够以你的用户权限驱动代理或调用工具。

浏览器控制几乎同样敏感。当前的 OpenClaw 文档建议通过浏览器机器上的配对节点主机运行浏览器控制，并将节点配对视为操作员访问。如果网关可以在配对节点上调用 `system.run`，那就是该节点上的远程代码执行，受网关的节点策略和节点自身的执行批准约束。

SSH 就是 SSH。如果你启用了密码认证运行，公网 VPS 上的暴力破解尝试是不可避免的。

---

## Tailscale 解决方案

对于 OpenClaw，Tailscale 让你无需发布操作服务即可实现远程访问：

1. 你的 OpenClaw 实例运行在 VPS 或本地机器上
2. 网关保持绑定到 loopback，通过 Tailscale Serve 访问，或直接绑定到 tailnet IP 并启用显式认证
3. 你在服务器和个人设备上都安装 Tailscale
4. 你通过 Tailscale IP 或 MagicDNS 名称访问 OpenClaw
5. 除非你故意启用 Funnel 或其他公共代理，否则互联网上的其他人什么也看不到

### 是否让 OpenClaw 管理 Tailscale？

OpenClaw 有[内置的 Tailscale 集成](https://docs.molt.bot/gateway/tailscale)，可以为网关配置 `tailscale serve` 或 `tailscale funnel`。

**Serve 模式** 将内容限制在你的 tailnet 内。网关保持绑定到 `127.0.0.1`，而 Tailscale 处理路由和 HTTPS。当启用 `gateway.auth.allowTailscale` 时，OpenClaw 可以使用 Tailscale 身份标头对控制 UI/WebSocket 流量进行认证，并通过 `tailscale whois` 验证来源。对于大多数个人部署来说，这是正确的模式。

**Funnel 模式** 通过 Tailscale 的公共端点功能将网关公开暴露。Tailscale 自己的文档将 Funnel 描述为将流量从更广泛的互联网路由到本地服务。OpenClaw 拒绝启动 Funnel，除非网关认证模式设置为 `password`，但你仍然是在为一个操作面选择公开暴露。

OpenClaw 的[安全文档](https://docs.molt.bot/gateway/security)明确指出，提示注入和工具访问是个人助手面临的核心风险。不要给代理一条悄悄将自己公开的路径。有意识地使用 Serve，除非你真的需要公共访问，否则避免使用 Funnel，并要求对任何 `tailscale` 命令执行审批。

---

## 安全设置 OpenClaw

### 第一步：安装 Tailscale

在你的 VPS 或本地服务器上：

```bash
# 安装 Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 认证（会打开浏览器登录）
sudo tailscale up

# 获取你的 Tailscale IP
tailscale ip -4
# 输出：100.x.x.x
```

在你的客户端机器上，从官方下载页面安装 Tailscale，并登录到同一个 tailnet。

现在两台机器都在同一个私有网络上。你可以使用 Tailscale IP ping 你的 VPS，流量会通过加密隧道路由。

### 第二步：配置 OpenClaw 使用 Tailscale

当前最安全的模式是：将网关保持在 loopback 上，并通过 Tailscale Serve 将其暴露给你的 tailnet。

在 OpenClaw 配置中：

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

然后使用 Serve 启动网关：

```bash
openclaw gateway --tailscale serve
```

OpenClaw 的文档说明，这会将网关保持在 `127.0.0.1`，同时 Tailscale 提供 HTTPS 和 tailnet 路由。你通过 `https://<magicdns-name>/` 访问它，而不是你的公共 VPS IP。

如果你更喜欢直接绑定 tailnet 而不是使用 Serve，请使用显式的网关认证：

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

如果你在 Docker 或其他容器运行时中运行，要格外注意端口发布。像 `-p 18789:18789` 这样的发布通常绑定在所有主机接口上。更推荐使用 loopback 加 Tailscale Serve，或者在确认容器仍能接收流量后，将主机端显式绑定到 Tailscale IP：

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

在 Docker 更改后，从外部用 `nmap` 检查，在本地用 `ss` 检查。如果你不加以考虑，Docker 可能会绕过或重新排序主机防火墙的假设。

### 第三步：锁定 SSH

### 第三步：锁定 SSH

即使使用了 Tailscale，也应正确保护 SSH：

```bash
# 执行此操作时保持当前 SSH 会话不断开。
# 首先，从客户端机器确认可以通过 Tailscale 进行 SSH：
ssh your-user@SERVER_TAILSCALE_IP

# 将加固配置写入 drop-in 文件，而不是重写 sshd_config。
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# 重载前先验证。不要跳过这一步。
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

这会禁用基于密码的登录和 root 登录。下一步将使用 UFW 完全阻止公网 SSH，同时仍允许通过 `tailscale0` 进行 SSH。

### 第四步：防火墙规则

设置防火墙作为第二层防护：

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

Tailscale 自己的 Ubuntu 加固指南也采用相同模式：允许 `tailscale0`，拒绝其他入站流量，然后验证公网 SSH 超时，而通过 `100.x.y.z` 地址的 SSH 仍然有效。如果你在同一台 VPS 上运行公网网站，只保留你真正需要的公网规则，例如 `80/tcp` 和 `443/tcp`。

---

## 检查你的暴露面

### 从外部检查开放端口

从一台不在你 Tailscale 网络中的机器上：

```bash
# 检查常见公网端口是否暴露
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# 安全实例的预期输出：
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

如果 `22` 或 `18789` 显示为 `open` 而不是 `filtered` 或 `closed`，则存在问题。如果 `80` 或 `443` 是开放的，请确保那只是你故意暴露的公网网站或 Tailscale Funnel 端点，而不是意外暴露的 OpenClaw 网关。

### 检查本地监听情况

在 OpenClaw 服务器上：

```bash
# 显示所有监听端口及其绑定地址
sudo ss -tulpn | grep LISTEN

# 查找类似以下的行（适用于 Serve 的好配置）：
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# 或者这样（适用于带认证的直接 tailnet 绑定）：
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# 而不是这样（坏配置）：
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

如果看到 `0.0.0.0` 或 `:::`（IPv6 等效），则该服务已暴露给全世界。

### 内置安全审计

OpenClaw 包含一个[安全审计命令](https://docs.molt.bot/gateway/security)，用于检查你的配置是否符合安全最佳实践：

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

审计会检查网关暴露、Tailscale 模式、认证设置、频道访问、工具策略、插件清单和文件权限。将 `--fix` 视为有用的辅助工具，而不是替代阅读审计结果。

---

## 这不能解决的问题

Tailscale 消除了最大的错误：公开的操作员暴露。但它并不能解决所有问题：

**凭据存储**：OpenClaw 将会话记录、OAuth 令牌和 API 密钥存储在磁盘上。确保这些文件具有适当的权限（文件使用 `chmod 600`，私有配置目录使用 `chmod 700`），并且不在版本控制中。内置审计会检查这一点。

**插件沙箱**：插件以你的用户完整权限运行。只安装来自可信来源的插件，并审查它们请求的能力。审计工具会列出已安装的插件。

**设备安全**：如果有人攻破你的 Tailscale 账户或窃取你 tailnet 上的设备，他们就能访问你的 OpenClaw 实例。启用 [Tailscale 设备授权](https://tailscale.com/kb/1099/device-authorization/) 以要求新设备获得批准。

---

## 部署检查清单

在认为你的 OpenClaw/Moltbot 实例达到生产就绪之前：

- [ ] Tailscale 已在服务器和客户端上安装并认证
- [ ] 网关保持在回环地址上使用 Tailscale Serve，或绑定到 `tailnet` 并显式认证
- [ ] SSH 配置为禁用密码认证和 root 登录
- [ ] 防火墙（UFW 或 iptables/nftables）配置为允许 `tailscale0` 并拒绝不必要的公共入站流量
- [ ] 外部 nmap 扫描显示所有端口为 `filtered` 或 `closed`
- [ ] 内部 `ss -tulpn` 显示网关仅绑定到 `127.0.0.1`、`::1` 或 Tailscale IP
- [ ] 凭据文件具有 600 权限，私有配置目录具有 700 权限
- [ ] 运行 `openclaw security audit --deep` 并处理所有发现
- [ ] 如果使用 OpenClaw Tailscale 管理，则启用 exec 批准
- [ ] 配置定期备份（OpenClaw 数据 + 配置）

---

## 资源

- [OpenClaw 安全指南](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale 集成](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI 参考](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [使用 UFW 锁定 Ubuntu 服务器](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [安全审计：512 个发现（GitHub Issue）](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap 网络扫描指南](https://nmap.org/book/man.html)
````
