# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx
- Validation: deferred
- Runtime seconds: 55.55
- Input tokens: 16196
- Output tokens: 8169
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.032605
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Docker 自托管安全核心要点
subTitle: 从防御到监控，全面加固你的自托管服务。
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
import {CodeTabs} from '../../../../components/CodeTabs';

**目录**

- 🧗‍♀️ [勇者先行](#️-for-the-brave)
- 🔄 [关于 `:latest` 的博弈](#-the-latest-dance)
- 🔐 [机密管理：正确姿势](#-secrets-management)
- 🌐 [网络风险](#-network-hazard)
- 🛡️ [访问控制](#️-access-controls)
- 🔍 [监控与验证](#-monitoring--verification)
- ⏰ [常被忽视的技巧](#-often-overlooked-tips)
- 🚀 [生产环境检查清单](#-production-checklist)
- 📚 [延伸阅读](#-further-reading)

## 🧗‍♀️ 勇者先行

如果你在自建 Docker 服务，那么从底层到顶层的安全责任全在你一个人身上——没有云厂商会帮你挡掉端口扫描或修补糟糕的配置。无论是在家庭网络中部署应用，还是租用 Vultr、DigitalOcean、Linode、AWS、Azure 或 Google Cloud 的 VPS，你都需要加固系统，并验证加固是否生效。

在本指南中，我们将深入探讨 Docker 安全——从一些“冷门”技巧到那些“难以搞定”的技术；我们将研究 Canary Tokens（金丝雀令牌）、只读卷、防火墙规则、网络分段与加固、添加认证代理等内容。

我们还会对比家庭网络与公有云环境的差异，并演示如何使用 Nginx 搭建基础认证代理。读完本文，你将拥有多种手段将闲杂人等（包括朋友、家人，有时甚至是误操作的你自己）拒之门外。

内容很多！但大部分都是关联的，你可以根据自己的实际环境择优而从。🍀

## 🔄 关于 `:latest` 的博弈

保持镜像更新对安全至关重要。然而，盲目依赖 `:latest` 可能会在没有经过人工审核的情况下引入破坏性变更或带有漏洞的构建版本。

### 安全的更新方式

将更新命令与 `pull` 或 `build` 结合使用，这样你就能有意识地刷新镜像，并在你有空观察系统是否崩溃的窗口期内重启服务。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### 版本锁定 vs Latest

选择锁定的版本号是在稳定性和安全性之间寻找平衡。以下是一些常见策略：

```yaml
# docker-compose.yml
# ...
  # 精确版本锁定，最适合核心服务
  image: postgres:17.2

  # 补丁版本锁定，适合非核心服务
  image: postgres:17.2

  # 大版本锁定，适合个人折腾项目
  image: postgres:17

  # 听天由命模式，尽可能避免
  image: postgres:latest
```

使用 [Dependabot](https://github.com/features/security) 或 [Renovate](https://github.com/renovatebot/renovate) 来开启可审计的更新 PR。对于任何让你不想在凌晨两点爬起来重构的东西，请锁定到具体版本或 Digest（摘要），让自动化工具来提醒你何时该升级。

*如果你有更好用的 Docker 镜像更新工具，欢迎交流！*

## 🔐 机密管理

- [生成强随机机密](#generate-strong-secrets)
- [Canary Tokens（金丝雀令牌）](#canary-tokens)
- [从 `.env` 升级到 MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [占位符验证](#placeholder-validation) */}

管理机密的方法有很多，但必须遵守的一条铁律是：**绝不要将机密硬编码到 Docker 镜像中，也不要将其提交到 Git。** 这是最常见的安全错误之一，它会带来长期风险，而且修复起来非常痛苦。

安全地存储机密是一个宏大的话题，有很多选择：从 `.env` 文件、[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)，到像 [HashiCorp Vault](https://www.vaultproject.io/) 或 AWS Secrets Manager 这样的专业机密管理器。

你需要根据自己的使用场景，在“投入成本”与“安全等级”之间选择一个合适的平衡点。

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### 占位符验证

<blockquote>你可能无法想象，当密钥不再是秘密时，破解 JWT 令牌是多么轻而易举！</blockquote>

<p className='inset'>💡 确保机密始终是唯一的。尝试让系统无法在不安全或硬编码的默认设置下运行。</p>

如果你在机密中使用了像 `__WARNING_REPLACE_ME__` 这样的占位符，很好，也许有人会注意到！

为了以防万一，你只需花很少的精力就能增加一点运行时安全性。以下是在 JavaScript、Rust 和 Go 中的实现方式：

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("检测到不安全的机密:", missingSecrets);
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
            panic!("在 {} 中发现不安全的机密", key);
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
			panic(fmt.Sprintf("在 %s 中发现不安全的机密", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

*/}

### 生成强随机机密

这是一个为 `.env` 文件生成新机密的小脚本：

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

echo "已生成带有安全随机值的新 .env 文件！"
```

### Canary Tokens（金丝雀令牌）

[**Canary Tokens**](https://canarytokens.org/) 是检测机密是否泄露（以及是否被使用）的绝佳手段。它们就像绊线，你可以将其添加到任何敏感文件、URL 或令牌中。

考虑将它们放在你真正担心的机密旁边：`.env` 文件、CI 变量、密码管理器、备份文件夹和云端凭据。不要把这变成一种形式主义；要把绊线布置在真正的攻击者或未来的你可能会犯错触碰的地方。

有很多种类的金丝雀“令牌”可供选择，从 AWS 令牌、[虚假信用卡号](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)、Excel 和 Word 文件、Kubeconfig 文件、VPN 凭据，甚至 SQL 转储文件都可以设置绊线！

#### Canary Token 最佳实践

- **到处部署**：在你能想到的每一个 `.env` 文件、CI/CD 流水线和“机密管理器”中都放上令牌。
  - 在家目录下放一个 `passwords.xlsx` 或 `passwords.docx` 文件。
  - 添加一个名为 `billing_prod` 的 AWS profile，并使用金丝雀令牌作为机密。
  - 在 `~/.ssh` 目录下生成一个 `private.key` 文件。
  - 在 `~/backups` 目录下创建一个金丝雀 SQL 转储文件 `all_credit_cards.sql`。
- **监控**：设置邮件规则或警报，以便在触发金丝雀令牌时能及时捕获。

### 从 `.env` 升级到 MacOS Keychain

对于 Mac 用户，最简单的方案之一是使用 Keychain（钥匙串）。

这里有一种自动从 OSX keychain 加载机密的方法，支持 `TouchID`，且比 `.env` 文件更安全。

原始代码<cite>归功于 [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) 和 [Jan Schaumann](https://www.netmeister.org/)</cite>。

<CodeTabs client:load tabs={[
  "辅助命令",
  "在环境中持久化机密",
  "单条命令使用机密"]
}>
```bash title="keychain-secrets.sh"
### 从 OSX keychain 设置和获取环境变量的函数 ###
### 改编自：https://www.netmeister.org/blog/keychain-passwords.html 以及 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# 用法：get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# 用法：set-keychain-secret SECRET_ENV_VAR
# 系统会提示你输入机密值！
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # 提示用户输入机密
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# 将环境变量加载到当前 shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# 注意：如果攻击者能在你的 shell 中运行 `env`，这些机密仍可能泄露！
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# 为此项目指定所有机密
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# 注意：使用 shell 包装器有助于防止机密残留在环境中。
# 而且提交到代码库也是安全的。

# 用法：
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 网络风险

### 自定义网络与内部端口

利用 Docker 网络（Networks）正确隔离服务是减少攻击面的重要手段。

在网络上“开洞”时要格外小心！一个配置错误的端口转发可能会导致惨重后果。

默认情况下，私有局域网（LAN）上的服务不会暴露给互联网——你必须在路由器上显式执行端口转发。

### 局域网中的 Docker

无论你是本地运行开发服务器的开发者，还是在本地网络自建服务的爱好者，**对 Docker 网络模型的先入为主往往会带来麻烦。**

开发者经常惊讶地发现，用来加固 Linux 服务器的“传统”方法（如 `iptables`、限制 tcp/ip sysctl 选项）在 Docker 宿主机上可能会**静默失效**！在**自建服务或运行在典型家庭网络**时尤其如此。（再说一遍：这可能导致你 MacBook 上的开发容器被直接访问！！！）

> ⚠️ **警告 #1：** Docker 发布（publish）的端口会绕过你认为正在保护宿主机的防火墙规则，尤其是在 Ubuntu/Debian 上使用 UFW 时。这并不意味着防火墙规则毫无用处，但它意味着“UFW 显示 deny”并不能证明端口已关闭。[参见 issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690)。

> ⚠️ **警告 #2：** 将端口绑定到本地 IP 地址（例如 `-p 127.0.0.1:8080:80`）是正确的默认做法，但在早于 28.0.0 的 Docker Engine 版本中，存在同一 L2 网络中的主机仍能访问发布到 localhost 端口的情况。[Docker 在其端口发布指南中记录了这一注意事项](https://docs.docker.com/engine/network/port-publishing/)，下文提到的“用 nmap 验证”的习惯依然至关重要。

<p class="inset">如果你对此感到惊讶，我也一样！</p>

**绑定到本地 IP 仍然是最佳实践**，并且在**托管云环境和特殊配置的网络**中具有实际意义。

### Docker Compose 示例

下面是一个 `docker-compose.yml` 示例，它将 `app` 服务绑定到 `127.0.0.1:8080`，并将两个容器都连接到名为 `backend` 的自定义网络中。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # 尽可能绑定到本地回环地址
      - "127.0.0.1:8080:8080"
    # ... 其他设置
  database:
    image: postgres:17.1
    # 无需发布端口；在 backend 网络内部即可访问。
    networks:
      - backend

```

### 网络最佳实践

- 🏆 **不发布任何端口**：最近我发现这比预想的更有用！使用命名（bridge）网络时，容器之间拥有无过滤的互访权限。它们的行为就像处在局域网（NAT 网关）之后。
  - 虽然并非所有场景都适用，但这对于运行批处理任务或主要通过 `attach` 或 `exec` 访问的容器非常有效。
- 🥇 **使用 Docker 网络**：通过自定义网络来隔离并控制哪些容器可以互相通信。
- 🥉 **使用 Localhost 绑定**：尽管[并不完美](https://github.com/moby/moby/issues/45610)，但将端口绑定到回环地址（例如 `127.0.0.1:8080:80`）通常是更好的选择。只需确保你[验证了配置](#-monitoring--verification)。

## 🛡️ 访问控制

访问控制是保障 Docker 服务安全的关键环节。这包括限制容器的能力（Capabilities）与权限、限制对 Docker socket 的访问等。

- [限制容器能力](#limiting-container-capabilities)
- [Docker Socket 访问](#docker-socket-access)
- [封禁特定国家/地区！](#blocking-country)
- [加固 CloudFlare 代理主机](#hardening-cloudflare-proxy-host)

### 限制容器能力

另一种扎实的访问控制实践是限制容器的“能力”（Capabilities）。这能缩小多种威胁的爆炸半径，从权限提升到流量劫持。它不是万能护盾，但能移除大多数容器根本不需要的权限。

**什么是能力（Capabilities）？** 它们是 Linux 内核定义的、具名的权限或功能。（[`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) 手册页有完整列表。）其中包括 `CAP_CHOWN`（修改文件所有权）、`CAP_NET_ADMIN`（配置网络接口）、`CAP_KILL`（杀死任意进程）等。

确定所需能力有两种方法：

1. **试错法**：这种方法虽慢但有效——先移除所有能力，然后逐个添加回去，直到应用正常运行。
2. **参考前人经验**：搜索 "`项目名` `cap_drop` Dockerfile" 或 "`项目名` `cap_drop` docker-compose.yml"，看看别人是否已经做过这项工作。LLM 可以提供一个起点，但在测试容器并阅读镜像文档之前，只能将其视为猜测。

#### 能力配置最佳实践

- **丢弃所有能力**：使用 `cap_drop: [ ALL ]` 丢弃容器的所有 Linux 能力。
- **禁止权限提升**：使用 `security_opt: [ no-new-privileges=true ]` 防止容器获取新权限。

```yaml title="示例：丢弃/限制能力" {5-14}
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
    # ... 其他设置
networks:
  db-network:
```

现在你的服务可以通过 `db-network` 网络互相通信。Docker Compose 会自动创建该网络。

使用 `--external`/`external:` 选项可以加入**现有的网络**。省略它则会创建一个新网络。

### Docker Socket 访问

#### ⚠️ 警告：`docker.sock` 等同于宿主机的管理员权限

<blockquote class="inset">⚠️ \`:ro\` 选项不会影响通过 socket 发送的 I/O 操作！</blockquote>

它仅仅确保 socket 路径本身是以只读方式挂载的。通过该 socket 发送的 API 调用仍然可以创建容器、挂载宿主机路径，以及执行其他你可能并不想授权的“危险动作”。

#### Socket 最佳实践

- 🥇 **避免挂载 Docker socket**，通常会有更好的替代方案。
- 🫣 如果必须挂载，**请在它前面加一个精简的代理**，仅允许应用实际需要的 API 端点。可以参考 Tecnativa 最初开发的 `docker-socket-proxy` 项目：[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy)。然后验证被拒绝的调用是否真的被拦截了。
- 🤢 好吧，在**高度信任**、**低风险**的测试环境中，直接共享或许勉强可以接受。

#### 封禁特定国家/地区！

有时很有用，但并非真正的安全边界。

*这里讨论的是地理政治实体，而不是音乐风格……*

如果你托管的应用主要面向本地的家人和朋友，你可以封禁那些不期望有流量进入的国家/地区。或者只允许来自特定国家的流量。这能减少噪音，但挡不住 VPN、代理、僵尸网络或任何有耐心的攻击者。

参考以下脚本来封禁来自中国的所有流量：

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同理，你可以设置为仅允许来自美国的流量：

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### 加固 CloudFlare 代理主机

如果你的家用服务器隐藏在 CloudFlare IP（代理）之后，你可以将访问权限限制为仅允许 CloudFlare IP 和你的本地网络。

这与上面的[封禁特定国家/地区](#blocking-country)类似，但控制得更严密。

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # 拦截所有入站流量！！！
ufw default allow outgoing # 允许所有出站流量
ufw allow ssh # 允许 SSH

# 允许本地网段访问（最好是为托管服务划分的专用 DMZ/VLAN）
ufw allow from 10.0.0.0/8 to any port 443

# 允许 CloudFlare IP 访问
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# 添加 IPv6 支持
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

要测试基于地理位置的变更，使用带有目标国家节点的 VPN 会很有帮助。详见[监控与验证](#-monitoring--verification)章节。

### 应用层安全

在完成[网络和主机的安全加固](#-network-hazard)后，你会发现还有更多工作要做。

现在我们需要考虑服务本身的“应用”层。

<p class="inset">那个数据库有合规的密码吗？这个容器是否自动处理 HTTPS/证书？应用是否内置了身份验证？是否限制了哪些邮箱可以注册？是否有默认凭据或需要修改的环境变量？</p>

*确认*这些问题的唯一方法就是检查。在这种情况下，先从 `README` 和其他关键文件（如 `docker-compose.yml`、`Dockerfile` 和 `.env.*`）入手。不仅要检查项目本身，理想情况下还要检查其支撑服务（例如 Postgres、Redis 等）。

#### 反向代理

另一层防御是基础认证（Basic Auth）。切记不要在没有 HTTPS 的情况下使用它。对于旧版服务，在管理路由前加上基础认证通常足以阻止随机请求和未经身份验证的爬虫直接探测。

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

生成凭据：

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

有了基础认证代理，攻击者在触及你的内部服务之前，就多了一道门槛——用户名和密码。

另一个选择是使用 [Traefik](https://traefik.io/) 或 [Caddy](https://caddyserver.com/) 等服务，它们可以为你自动处理 HTTPS 和基础认证。

如果你想通过 GUI 管理多个域名和服务，我推荐使用 [Nginx Proxy Manager](https://nginxproxymanager.com/)。

## 🔍 监控与验证

- [检查端口](#check-your-ports)
- [查看开放端口](#view-open-ports)
- [文件监控](#file-monitoring)

这是**最重要也最容易被忽视的步骤**。你可以拥有最强的防火墙、最稳固的网络和最佳实践，但如果不进行验证，你根本不知道它们是否在起作用。

此外，掌握几个关键命令（或者知道去哪里查）往往是防止入侵的关键。顺便体验一把当“黑客”的感觉只是额外奖励。（详细信息和示例请跳转到 [监控与验证](#-monitoring--verification) 章节。）

<p class="inset">不要信任，要反复验证</p>

### 检查端口

<p class="inset">⚠️ 重要提示：严禁扫描不属于你的主机。</p>

无论是在家庭网络还是 VPS 上，你都需要了解哪些端口是对外开放的。

有两种方法可以实现：

- 从网络层面检查（`nmap`，`masscan`）
- 询问操作系统（`lsof`，`netstat`，`ss`）

#### 从网络外部测试

你需要当前的（公网）IP，可以通过 `ifconfig.me` 等服务轻松获取：`curl https://ifconfig.me`。或者在你的托管商控制面板中查看。

```bash title="获取公网 IP"
curl -fsSL https://ifconfig.me
# --> 当前公网 IP
```

拿到公网 IP 后，你需要**连接到一个外部网络**。你可以使用朋友的电脑、手机/5G 热点，或者另一台远程服务器。

```bash title="nmap 外部扫描"
target_host="$(curl -fsSL https://ifconfig.me)"

# 注意：确保 `target_host` 是目标 IP

# 扫描特定端口：
nmap -A -p 80,443,8080 --open --reason $target_host
# 扫描前 100 个常用端口：
nmap -A --top-ports 100 --open --reason $target_host
# 扫描所有端口
nmap -A -p1-65535 --open --reason $target_host

```

#### 在网络内部测试

练习使用 `nmap`，扫描你的本地网络或其中一台服务器，检查你的路由器、打印机、智能冰箱。

{/* 虽然端口扫描是网络环境中的常态，但在美国可能违反 CFAA（计算机欺诈与滥用法案）。所以，只扫描你拥有的设备。 */}

#### 常用扫描命令示例

```bash

# 扫描本地 localhost 的所有开放端口
nmap -sT localhost

# 扫描机器私有 IP 以查看服务
nmap -sV 192.168.1.10

# 发现网络中的服务详情
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# 或者扫描 docker 网络 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap 扫描结果" frame="terminal"
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

### 查看开放端口

熟悉 `lsof` 命令——它在 MacOS 和 Linux 上都可用。它能显示细粒度的网络状态和磁盘活动。

```bash title="lsof 命令"
# 监控特定端口
sudo lsof -i:80 -Pn
```

# 监控已建立的连接
sudo lsof -i -Pn | grep ESTABLISHED
# 查看监听状态
sudo lsof -i -Pn | grep LISTEN

# 查看网络名称而非 IP 地址（执行反向 DNS 查询可能会非常慢）
sudo lsof -i -P | grep LISTEN

# 监控所有网络连接
sudo watch -n1 "lsof -i -Pn"

```

#### 输出示例

![nmap 扫描监听器](../lsof-scan-listen.webp)

### 文件监控

要识别哪些 **进程** 消耗了最多的 **硬盘带宽**，可以使用 `iotop`：

```bash

sudo iotop

```

要查看单个文件的更改，在 Linux 上可以使用 `inotifywait`，在 MacOS 上可以使用 `fswatch`：

这对于检测每个文件夹或系统范围内的未经授权或异常行为非常有用。

```bash

# 监控目录中的所有文件更改
sudo inotifywait -m /path/to/directory

```

在 MacOS 上可以使用 `fswatch`：

通过 `brew install fswatch` 安装

```bash

fswatch -r /path/to/directory

```

## ⏰ 经常被忽视的技巧

1. **频率限制 (Rate Limiting)**：针对身份验证尝试及任何其他关键端点。无论是通过 Nginx 的 `limit_req` 模块，还是针对 SSH 访问的 `fail2ban`，限制暴力破解“大概率”是个好主意。我说“大概率”，是因为在 IPv6 和廉价僵尸网络盛行的时代，它的效果已不如往昔。

2. **尽可能使用只读卷**：
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   结合其他最佳实践（非 root 用户、最小文件夹权限），`:ro` 卷挂载选项为防止容器内部的意外更改和某些写入尝试提供了额外的保护。它不能保护宿主机免受已经拥有更广泛权限的进程的攻击。

3. **定期审计容器访问权限**。
   如果一个容器不需要某个 Secret、端口或挂载点，删掉它！

4. **提防 WiFi 闲杂人等**
   我相信你绝不会泄露你的 WiFi 密码，尤其是给那些怪人，对吧？好吧，除了几个朋友……行吧，可能还有家人。你永远不知道他们安装了什么应用，其中哪些可能会把你的 SSID 和密码分享给全世界。

### 家庭网络 vs. 公有云提供商 vs. 隧道

1. **虚拟隔离/DMZ**：对于家庭服务器，如果可能，将其放在独立的 VLAN 或 DMZ 中。这可以防止你的内部设备因服务器端被攻破而受到波及。
   - 为你的家庭服务器使用独立的路由器或 VLAN。
   - 为你的家庭服务器使用独立的 WiFi 网络。
   - 为你的家庭服务器使用独立的子网。

2. **云提供商**：Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure 和 Google Cloud 都提供不同的防火墙功能。
   - 某些提供商和服务器默认封禁端口。有些提供选择性开启或附加组件。请查阅你的服务商文档。
   - 许多提供商提供高级监控和威胁检测服务。

3. **VPN 与隧道**：考虑使用类 VPN 选项或隧道服务，在不暴露于公网的情况下安全地连接互联网服务。
   - TailScale, ngrok, ZeroTier。
   - WireGuard, OpenVPN。

{/* 3. **防御内部/横向攻击**：一台受感染的设备就可能瓦解整个网络。在自定义网络上细分 Docker 服务、使用硬件防火墙、UFW 规则以及关闭不需要的端口，都有助于降低风险（在配置正确的前提下）。 */}

## 🚀 生产环境检查清单

- [ ] **Secrets**：所有 Secret 随机生成并安全存储。
- [ ] **更新**：容器更新策略已记录并自动化。（哪怕只是文本文件里的几行命令也可以。）
- [ ] **网络**：仅暴露必要端口，设置好内部网络。
- [ ] **防火墙规则**：默认拒绝，显式允许，必要时封禁特定国家 IP。
- [ ] **反向代理**：Nginx、Caddy 或 Traefik 可以增加一层基础身份验证（Basic Auth）。
- [ ] **金丝雀令牌 (Canary Tokens)**：将它们放置在那些一旦被触碰你确实会去调查的敏感文件和凭据附近。
- [ ] **监控**：通过 `nmap`、`lsof`、`inotifywait`、`glances` 等工具了解你的系统。
- [ ] **备份策略**：经过测试，最好是自动化的，且具备异地备份。
- [ ] **最小权限**：非 root 容器用户，只读卷。

## 📚 延伸阅读

- [Docker 安全最佳实践](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker 安全速查表](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker 基准测试](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org (金丝雀令牌)](https://canarytokens.org/)

## 致谢

特别感谢几位眼光敏锐的 Redditor：

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [讨论帖](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/)。</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

感谢阅读！希望这份指南对你有所帮助。如果你有任何问题或建议，欢迎通过下方的社交媒体联系我，或者直接点击 `Edit on GitHub` 链接提交 PR！❤️
````
