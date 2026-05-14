# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/zh/index.mdx
- Validation: deferred
- Runtime seconds: 12.53
- Input tokens: 6717
- Output tokens: 5145
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001772
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你的AI助手给了我shell访问权限
subTitle: 如何安全加固你的本地或VPS的OpenClaw/Moltbot环境
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
OpenClaw（原Clawdbot/Moltbot）为您提供一个跨WhatsApp、Slack、Discord、iMessage等渠道的个人AI助手。但如果未对它的网关、节点控制或SSH接口实施强认证就暴露在公网上，您就等于为陌生人打开了通向您机器的shell访问路径。

本指南展示最安全的默认方案：将OpenClaw网关绑定在环回接口，仅通过Tailscale Serve向您的tailnet暴露，锁定SSH访问，并从外部验证网关是否未公开。

该项目的快速普及暴露了真实的安全隐患：[Shodan扫描在最初几周发现了2,847个暴露实例](https://socradar.io/blog/clawdbot-is-it-safe/)，GitHub安全审计报告在代码库中发现了[512个问题](https://github.com/moltbot/moltbot/issues/1796)。其中部分来自自动扫描器输出，部分在2026年1月项目更名为OpenClaw后已变更，因此请将这些数字视为警示而非精确的当前漏洞统计。您不需要成为安全专家——只需在部署前避免发布操作接口即可。

---

## 您实际暴露的内容

根据安装和暴露方式的不同，有三个接口需要检查：

- **22端口**：VPS上的SSH访问
- **18789端口**：网关控制UI和WebSocket API
- **浏览器/节点控制**：通过网关/节点配对模型实现的远程节点执行和浏览器自动化

当前[OpenClaw远程访问文档](https://docs.molt.bot/gateway/remote)指出网关WebSocket默认绑定环回接口，并建议除非有意选择LAN/tailnet/自定义绑定，否则保持环回绑定。这是合理的。风险出现在您覆盖默认配置、发布Docker端口、添加反向代理、启用Funnel或对SSH开放公网访问时。

网关是最重要的暴露面。这是您助手的操作接口，包括工具调用路径。如果网关可从互联网访问且认证缺失、薄弱、被绕过或泄露，攻击者可能能够控制代理或以您的用户权限调用工具。

浏览器控制几乎同样敏感。当前OpenClaw文档建议通过浏览器机器上的配对节点主机运行浏览器控制，并将节点配对视为操作访问。如果网关可以在配对节点上执行`system.run`，这等同于在该节点上实现远程代码执行，受网关节点策略和节点自身执行审批的约束。

SSH就是SSH。如果您启用了密码认证，在公网VPS上暴力破解尝试是不可避免的。

---

## Tailscale解决方案

对于OpenClaw，Tailscale可让您在不发布操作服务的情况下实现远程访问：

1. 您的OpenClaw实例运行在VPS或本地机器上
2. 网关保持绑定环回接口并通过Tailscale Serve访问，或直接绑定tailnet IP并使用显式认证
3. 在服务器和您的个人设备上安装Tailscale
4. 通过Tailscale IP或MagicDNS名称访问OpenClaw
5. 互联网上的其他人将看不到任何内容，除非您有意启用Funnel或其他公共代理

### 是否应让OpenClaw管理Tailscale？

OpenClaw提供了[内置的Tailscale集成](https://docs.molt.bot/gateway/tailscale)，可配置`tailscale serve`或`tailscale funnel`用于网关。

**Serve模式**将流量限制在您的tailnet内。网关保持绑定在`127.0.0.1`，而Tailscale处理路由和HTTPS。当启用`gateway.auth.allowTailscale`时，OpenClaw可通过Tailscale身份验证头认证Control UI/WebSocket流量，并通过`tailscale whois`验证来源。这是大多数个人部署的正确模式。

**Funnel模式** 通过Tailscale的公共端点功能将网关公开暴露。Tailscale官方文档描述Funnel为将互联网流量路由到本地服务。OpenClaw在网关认证模式不是`password`时会拒绝启动Funnel，但你仍然在选择为操作界面暴露公网。

OpenClaw的[安全文档](https://docs.molt.bot/gateway/security)明确指出提示注入和工具访问是个人助理的核心风险。不要为代理提供静默公开的路径。应刻意使用Serve模式，除非确实需要公网访问才使用Funnel，并为任何`tailscale`命令要求执行审批。

---

## 安全配置OpenClaw

### 步骤1：安装Tailscale

在您的VPS或本地服务器上：

```bash
# 安装Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 认证（打开浏览器登录）
sudo tailscale up

# 获取您的Tailscale IP
tailscale ip -4
# 输出：100.x.x.x
```

在客户端机器上，从官方下载页面安装Tailscale并登录到同一个tailnet。

现在两台机器处于同一私有网络。您可以使用Tailscale IP ping您的VPS，流量将通过加密隧道路由。

### 步骤2：配置OpenClaw使用Tailscale

当前最安全的模式是：保持网关绑定在回环接口，并通过Tailscale Serve将其暴露到tailnet。

在OpenClaw配置中：

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

然后以Serve模式启动网关：

```bash
openclaw gateway --tailscale serve
```

OpenClaw文档说明这会将网关保持在`127.0.0.1`，同时Tailscale提供HTTPS和tailnet路由。您应通过`https://<magicdns-name>/`访问，而非公网VPS IP。

如果更倾向直接绑定tailnet而非Serve模式，使用显式网关认证：

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

然后从另一个tailnet设备连接：

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

如果在Docker或其他容器运行时中运行，需特别注意端口发布。类似`-p 18789:18789`的发布通常会绑定到所有主机接口。建议使用回环加Tailscale Serve，或在确认容器仍能接收流量后，显式将主机端绑定到Tailscale IP：

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

每次修改Docker配置后，应使用`nmap`从外部检查，并使用`ss`本地检查。若未正确配置，Docker可能绕过或打乱主机防火墙规则。

即使启用了Tailscale，你也应正确配置SSH：

```bash
# 在操作过程中保持当前SSH会话开启
# 首先从客户端机器确认可通过Tailscale进行SSH连接：
ssh your-user@SERVER_TAILSCALE_IP

# 将强化配置放入独立文件而非直接修改sshd_config
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# 在重新加载前验证配置。不要跳过此步骤
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

此配置禁用了基于密码的登录和root登录。下一步将使用UFW完全阻止公网SSH访问，同时仍允许通过`tailscale0`接口的SSH连接。

### 步骤 4：防火墙规则

设置第二层防火墙防护：

```bash
# 使用UFW（Ubuntu/Debian）
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Tailscale官方Ubuntu加固指南采用相同策略：允许`tailscale0`接口流量，拒绝其他所有入站流量，然后验证公网SSH是否超时而Tailscale私有地址`100.x.y.z`的SSH仍能正常工作。如果同一VPS运行公网网站，仅保留必要的规则如`80/tcp`和`443/tcp`。

---

## 检查暴露面

### 从外部检查开放端口

从**不在**你Tailscale网络的机器执行：

```bash
# 检查常见公网端口是否暴露
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# 安全实例的预期输出：
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

如果`22`或`18789`显示`open`而非`filtered`或`closed`，说明存在配置问题。若`80`或`443`开放，需确认这是你有意配置的公网网站或Tailscale Funnel端点，而非意外暴露的OpenClaw网关。

### 检查本地监听端口

在你的OpenClaw服务器上执行：

```bash
# 显示所有监听端口及其绑定地址
sudo ss -tulpn | grep LISTEN

# 查找类似以下行（Serve模式正常）：
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# 或以下行（经认证的tailnet直接绑定可接受）：
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# 避免出现以下情况（危险）：
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

若看到`0.0.0.0`或`:::`（IPv6等效地址），表示该服务已向公网暴露。

### 内置安全审计

OpenClaw包含[安全审计命令](https://docs.molt.bot/gateway/security)，可检查配置是否符合安全最佳实践：

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

审计内容包括网关暴露、Tailscale模式、认证设置、频道访问、工具策略、插件清单和文件权限。`--fix`参数可作为辅助工具，但不能替代对审计结果的审阅。

---

## 本方案未解决的问题

Tailscale消除了最大的风险：公开的操作员暴露。但它并未解决所有问题：

**凭证存储**：OpenClaw会将会话记录、OAuth令牌和API密钥存储在磁盘上。请确保这些文件具有正确的文件权限（文件使用`chmod 600`，私有配置目录使用`chmod 700`），并且不在版本控制中。内置的审计功能会检查这些配置。

**插件沙箱**：插件以您的用户权限运行。仅从可信来源安装插件，并审查它们请求的权限。审计工具会列出已安装的插件。

**设备安全**：如果有人入侵您的Tailscale账户或窃取了您tailnet中的设备，他们可以访问您的OpenClaw实例。启用[Tailscale设备授权](https://tailscale.com/kb/1099/device-authorization/)，要求新设备获得批准。

---

## 部署检查清单

在将您的OpenClaw/Moltbot实例视为生产就绪之前：

- [ ] 服务器和客户端已安装并认证Tailscale
- [ ] 网关通过Tailscale Serve绑定到环回接口，或通过显式认证绑定到`tailnet`
- [ ] SSH配置为禁用密码认证和root登录
- [ ] 防火墙（UFW或iptables/nftables）配置为允许`tailscale0`并拒绝不必要的公网入站
- [ ] 外部nmap扫描显示所有端口为`filtered`或`closed`
- [ ] 内部`ss -tulpn`显示网关仅绑定到`127.0.0.1`、`::1`或Tailscale IP
- [ ] 凭证文件权限为600，私有配置目录权限为700
- [ ] 运行`openclaw security audit --deep`并解决所有发现的问题
- [ ] 如果使用OpenClaw Tailscale管理，已启用执行批准
- [ ] 配置定期备份（OpenClaw数据+配置）

---

## 资源

- [OpenClaw安全指南](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale集成](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI参考](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [使用UFW锁定Ubuntu服务器](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [安全审计：512个发现（GitHub问题）](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap网络扫描指南](https://nmap.org/book/man.html)
````
