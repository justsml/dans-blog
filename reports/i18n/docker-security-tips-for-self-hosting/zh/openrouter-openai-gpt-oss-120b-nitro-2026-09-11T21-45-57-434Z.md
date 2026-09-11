# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx
- Validation: deferred
- Runtime seconds: 7.80
- Input tokens: 19417
- Output tokens: 9330
- Thinking tokens: unknown
- Cached input tokens: 5760
- Cache write tokens: 0
- Estimated cost: $0.002437
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 自托管 Docker 安全要点
subTitle: 保护您的自托管服务，从防御到监控！
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

- 🧗‍♀️ [勇敢者](#勇敢者)
- 🔄 [:latest 舞步](#latest-舞步)
- 🔐 [正确的密钥管理](#正确的密钥管理)
- 🌐 [网络风险](#网络风险)
- 🛡️ [访问控制](#访问控制)
- 🔍 [监控与验证](#监控与验证)
- ⏰ [常被忽视的技巧](#常被忽视的技巧)
- 🚀 [生产检查清单](#生产检查清单)
- 📚 [进一步阅读](#进一步阅读)

## 🧗‍♀️ 勇敢者

如果你在自行托管 Docker 服务，安全全由你负责——没有云提供商帮你挡住端口扫描或糟糕的配置。无论你是在家庭网络上启动应用，还是从 Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloud 等提供商租用 VPS，你都必须把系统锁紧，并且验证锁紧是否到位。

在本指南中，我们将逐步讲解 Docker 安全——从一些“鲜为人知”到其他“难以做到位”的技巧；我们会探讨金丝雀令牌、只读卷、防火墙规则、网络分段与加固、添加认证代理等内容。

我们还会对比家庭网络和公有云环境，并演示如何使用 Nginx 搭建基本认证代理。阅读完毕后，你将拥有多种手段来阻止不速之客（朋友、家人，甚至有时是你自己……）

内容很多！但大多数是相互关联的，你可以根据自己的环境挑选最适用的部分。🍀

## 🔄 :latest 舞步

保持镜像更新是安全的关键。然而，依赖 `:latest` 可能在没有审查步骤的情况下引入破坏性更改或漏洞镜像。

### 安全的更新方式

将更新命令与 `pull` 或 `build` 结合，这样你可以有意识地刷新镜像，然后在可以监测到破坏的窗口期内重启。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### 版本固定 vs Latest

选择合适的固定版本是稳定性与安全性之间的平衡。以下是几种常见策略：

```yaml
# docker-compose.yml
# ...
  # 精确版本固定，适用于关键服务
  image: postgres:17.2

  # 补丁版本固定，适用于非关键服务
  image: postgres:17.2

  # 主版本固定，适合业余项目
  image: postgres:17

  # YOLO，尽量避免使用
  image: postgres:latest
```

使用 [Dependabot](https://github.com/features/security) 或 [Renovate](https://github.com/renovatebot/renovate) 打开可审查的更新 PR。对于任何你不想在凌晨 2 点重建的服务，固定到具体版本或摘要，让自动化在需要迁移时提醒你。

_告诉我你最喜欢的 Docker 镜像更新工具吧！_

## 🔐 密钥管理

- [生成强密钥](#generate-strong-secrets)
- [金丝雀令牌](#canary-tokens)
- [从 `.env` 升级到 macOS 钥匙串](#upgrade-from-env-to-macos-keychain)
{/* - [占位符验证](#placeholder-validation) */}

有许多管理密钥的方式，但必须坚持的最重要规则是：**绝不要在 Docker 镜像中硬编码密钥，也不要将其提交到 git。** 这是最常见的安全失误之一，带来长期风险，且修复起来相当麻烦。

安全存储密钥是一个庞大的议题，选项众多，包括 `.env` 文件、[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)，或像 [HashiCorp Vault](https://www.vaultproject.io/)、AWS Secrets Manager 这样的密钥管理服务。

你需要为自己的使用场景挑选“合适”的投入与安全等级。

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

### 生成强密钥

下面是一个小脚本，用于为 `.env` 文件生成新密钥：

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

### 金丝雀令牌

[**Canary Tokens**](https://canarytokens.org/) 是检测密钥是否泄露（并被使用）的绝佳手段。它们像埋设的绊线，可放入任何敏感文件、URL 或令牌中。

建议将它们放在真正担心的密钥旁边：`.env` 文件、CI 变量、密码管理器、备份文件夹以及云凭证。不要把这当成戏剧化的装饰；把绊线放在真实攻击者或未来的自己可能触碰的地方。

可选的金丝雀“令牌”类型很多，包括 AWS 令牌、[伪信用卡](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)号码、Excel 与 Word 文件、Kubeconfig 文件、VPN 凭证，甚至 sql 转储文件都可以埋设绊线！

#### 金丝雀令牌最佳实践

- **全局放置**：在每个 `.env` 文件、CI/CD 流水线以及你能想到的 “密钥管理器” 中都放一个金丝雀令牌。  
  - 在主目录下放置一个 `passwords.xlsx` 或 `passwords.docx` 文件。  
  - 为 AWS 配置文件 `billing_prod` 添加金丝雀令牌作为密钥。  
  - 为 `~/.ssh` 目录生成一个 `private.key` 文件。  
  - 为 `~/backups` 目录创建金丝雀 SQL 转储 `all_credit_cards.sql`。  
- **监控**：设置邮件规则/警报，以捕获金丝雀令牌被触发的情况。

### 从 `.env` 升级到 macOS 钥匙串

对于 Mac 用户，最简便的方案之一是使用钥匙串。

下面提供一种简单的方式，将秘密从 macOS 钥匙串自动加载，支持 `TouchID`，并且比 `.env` 文件更安全。

原始贡献者：[Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) 与 [Jan Schaumann](https://www.netmeister.org/)。

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### 从 macOS 钥匙串设置和获取环境变量的函数 ###
### 改编自：https://www.netmeister.org/blog/keychain-passwords.html 以及
Original credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) and [Jan Schaumann](https://www.netmeister.org/).

# 用法：get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# 用法：set-keychain-secret SECRET_ENV_VAR
# 将提示你输入密钥值！
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # 提示用户输入密钥
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
# 注意：如果攻击者能够在你的 shell 中运行 `env`，这些密钥可能会泄露！
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# 为本项目指定所有密钥
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# 注意：使用 shell 包装器有助于防止密钥残留在环境中。并且可以安全提交。

# 用法示例：
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ...
```
</CodeTabs>

## 🌐 网络风险

### 自定义网络与内部端口

通过 Docker 网络正确隔离服务是降低攻击面的一条重要路径。

切勿随意在网络上开洞！一次错误的端口转发可能导致灾难性后果。

默认情况下，私有局域网内的服务不会暴露到互联网——必须显式地从路由器转发端口。

### Docker 在局域网中的使用

无论你是本地运行开发服务器的开发者，还是在本地网络中自托管服务，**对 Docker 网络模型的错误假设都可能带来麻烦**。

开发者常常惊讶于，传统的 Linux 服务器安全手段（`iptables`、限制 tcp/ip sysctl 选项）在 Docker 主机上**可能悄然失效**！这在**自托管或典型家庭网络**环境中尤为常见。（后排的朋友注意：这可能导致你的 MacBook 上的开发容器被外部访问！！！）

> ⚠️ **警告 #1**：Docker 暴露的端口可以绕过你认为已保护主机的防火墙规则，尤其是在 Ubuntu/Debian 上使用 UFW 时。这并不意味着所有防火墙规则都失效，但“UFW 设为 deny”不再是充分的证明。[参见 issue #690：Docker 绕过 ufw 防火墙规则](https://github.com/moby/moby/issues/690)。

> ⚠️ **警告 #2**：将端口绑定到本地 IP（例如 `-p 127.0.0.1:8080:80`）是正确的默认做法，但 Docker Engine 低于 28.0.0 的版本曾出现同一 L2 网络上的主机仍能访问 localhost‑published 端口的情况。[Docker 在端口发布指南中记录了此注意事项](https://docs.docker.com/engine/network/port-publishing/)，因此下面的 nmap 验证习惯仍然重要。

<p class="inset">如果你对这些感到惊讶，说明你正处于学习阶段！</p>

**将端口绑定到本地 IP 仍是良好实践**，在**受管云环境和特殊配置网络**中影响尤为显著。  
{/* 不要把防火墙或私有网络视为唯一或主要防线，加入 Docker 网络以实现更好的 **隔离**，并始终评估是否真的需要暴露端口。 */}

### 示例 Docker Compose

下面是一个 `docker-compose.yml` 示例文件，它将 `app` 服务绑定到 `127.0.0.1:8080`，并让两个容器都加入 `backend` 自定义网络。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # 如可能请绑定到本地回环
      - "127.0.0.1:8080:8080"
    # ... 其他设置
  database:
    image: postgres:17.1
    # 不需要端口映射；在 backend 网络内部可直接访问。
    networks:
      - backend

```

{/* #### 测试与验证

和所有安全措施一样，**测试并验证**你的网络配置至关重要。 */}

{/* 虽然网络安全与审计在大多数公司是全职职责，但大多数自托管的朋友几乎不花时间在这上面！ */}

{/* 我懂，这看起来吓人。_(子网、网络掩码、CIDR、VLAN 和路由表，哎呀！如果你看不懂，没关系，你来对地方了。暂时我们也不必担心这些细节。)_ */}

### 网络最佳实践

- 🏆 **不要公开任何端口** 最近我发现这比想象中更有用！使用具名（bridge）网络时，容器之间可以直接相互访问，行为就像在本地网络（NAT 网关）后面一样。  
  - 虽然并非所有场景都适用，但对运行批处理作业的容器，或主要通过 `attach`、`exec` 访问的容器，这种做法非常实用。
- 🥇 **使用 Docker 网络** 来隔离并控制容器之间的通信。
- 🥉 **使用本地回环绑定**：虽然并不完美（[参考](https://github.com/moby/moby/issues/45610)），但一般来说将端口绑定到回环地址（例如 `127.0.0.1:8080:80`）更安全。只要**确保你已验证设置**。（[验证你的设置。](#-monitoring--verification)）

## 🛡️ 访问控制

访问控制是保护 Docker 服务的关键环节。它包括限制容器的能力与权限、限制对 Docker socket 的访问等。

- [限制容器能力](#limiting-container-capabilities)
- [Docker Socket 访问](#docker-socket-access)
- [阻断特定国家流量](#blocking-country)
- [加固 CloudFlare 代理主机](#hardening-cloudflare-proxy-host)

### 限制容器能力

另一个可靠的访问控制实践是限制容器的能力。这可以降低多种威胁的影响范围，从特权提升到流量劫持。它不是一道防护墙，但会去除大多数容器根本不需要的权限。

**能力是什么？** 由 Linux 内核定义的、具名的权限或能力。（[`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) 手册页列出了完整列表。）常见的有 `CAP_CHOWN`（更改文件所有者）、`CAP_NET_ADMIN`（配置网络接口）、`CAP_KILL`（终止任意进程）等。

获取所需能力的两种方式：

1. **试错法**：先不授予任何能力，逐个添加，直至应用正常运行。虽慢但可靠。
2. **查找已有实现**：搜索 "`project-name` `cap_drop` Dockerfile" 或 "`project-name` `cap_drop` docker-compose.yml"，看看是否已有成熟方案。LLM 可以提供起点，但仍需自行测试并阅读镜像文档。

#### 能力最佳实践

- **全部丢弃**：使用 `cap_drop: [ ALL ]` 从容器中移除所有 Linux 能力。
- **禁止新特权**：使用 `security_opt: [ no-new-privileges=true ]` 防止容器获取新特权。

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
    # ... 其他设置
networks:
  db-network:
```

现在你的服务可以通过 `db-network` 网络相互通信。Docker Compose 会自动创建该网络。

使用 `--external`/`external:` 选项可以加入**已有网络**。省略此选项则会创建新网络。

### Docker Socket 访问

#### ⚠️ 警告：`docker.sock` 基本上等同于主机管理员权限

<blockquote class="inset">⚠️ `:ro` 选项仅保证 socket 本身以只读方式挂载！通过该 socket 发送的 API 调用仍然可以创建容器、挂载主机路径以及执行其他可能不想授权的操作。</blockquote>

{/* 任何能够“打开”该 socket 的进程几乎都能获得主机的 root 权限。 */}

#### Socket 最佳实践

- 🥇 **避免挂载 Docker socket**，通常有更好的替代方案。
- 🫣 如必须挂载，**在其前面放置细粒度代理**，仅允许应用实际需要的 API 端点。可以参考 Tecnativa 原始项目 `docker-socket-proxy`，[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy)。随后确认被拒绝的调用真的被阻断。
- 🤢 好吧，在**高度信任、低风险**的测试环境中，**共享 socket**或许还能接受。

#### 阻断特定国家流量！

有时有用，但并非真正的安全边界。

_这里说的是地缘政治实体，而不是音乐…_

如果你的应用主要面向本地的家人和朋友，可以阻断来自不期望的国家的流量，或仅允许来自期望国家的流量。这样可以降低噪声，但并不能阻止 VPN、代理、僵尸网络或任何有耐心的攻击者。

查看下面的脚本，阻断所有来自中国的流量：

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同理，你也可以只允许来自美国的流量：

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### 加固 CloudFlare 代理主机

如果你的家庭服务器位于 CloudFlare IP（代理）之后，可以将访问限制为仅 CloudFlare IP 和本地网络。

这与上面的[国家阻断](#阻断特定国家流量)有点相似，但控制更为严格。

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

要测试基于地理位置的更改，可以使用位于目标国家的 VPN。更多内容请参见[监控与验证](#监控与验证)章节。

### 应用层安全

一旦你的[网络和主机已加固](#-network-hazard)，你会发现还有更多工作要做。

现在需要考虑服务本身的“应用”层面。

<p class="inset">这个数据库有有效的密码吗？这个容器是否自动化了 HTTPS/证书？应用是否内置了认证？是否对可注册的邮箱有限制？是否存在默认凭证或需要更改的环境变量？</p>

唯一的办法是**检查**。在这种情况下，从 `README` 以及 `docker-compose.yml`、`Dockerfile`、`.env.*` 等关键文件入手。项目本身以及它依赖的服务（例如 Postgres、Redis 等）也要检查。

#### 反向代理

另一层防御是基本认证。不要在没有 HTTPS 的情况下使用它。对于遗留服务，在管理路由前加上基本认证通常足以阻止随意请求和未认证的爬虫直接访问。

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

生成凭证：

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

使用基本认证代理后，攻击者在访问内部服务前必须先通过用户名和密码这道关卡。

另一种选择是使用 [Traefik](https://traefik.io/) 或 [Caddy](https://caddyserver.com/) 等服务，它们可以为你自动化 HTTPS 和基本认证。

如果你想通过 GUI 管理大量域名和服务，我推荐使用 [Nginx Proxy Manager](https://nginxproxymanager.com/)。

## 🔍 监控与验证

- [检查端口](#检查端口)
- [查看开放端口](#查看开放端口)
- [文件监控](#文件监控)

这是 **最重要且最常被忽视的步骤**。即使拥有最好的防火墙、最优的网络和最佳实践，如果不验证，你根本不知道它们是否生效。

此外，只掌握少量命令——或知道去哪里查找——就可能在防止泄漏上产生决定性差异。拥有黑客的快感只是额外的奖励。（详情和示例请直接跳到 [🔍 监控与验证](#监控与验证) 部分。）

<p class="inset">不信任，双重验证</p>

### 检查端口

<p class="inset">⚠️ 重要提示：请勿扫描你不拥有的主机。</p>

无论是在家庭网络还是 VPS 上，你都需要了解哪些端口对外开放。

有两种方式可以做到：

- 检查网络（`nmap`、`masscan`）
- 查询操作系统（`lsof`、`netstat`、`ss`）

#### 在网络外部进行测试

你需要先获取当前（公网）IP，使用 `ifconfig.me` 等服务即可：`curl https://ifconfig.me`。也可以在你的云服务商控制台中查看。

```bash title="获取公网 IP"
curl -fsSL https://ifconfig.me
# --> 当前公网 IP
```

拿到公网 IP 后，**需要连接到外部网络**。可以使用朋友的电脑、手机/5G 热点，或租用一台专用服务器。

```bash title="nmap 外部扫描"
target_host="$(curl -fsSL https://ifconfig.me)"

# 注意：确保 `target_host` 为目标 IP

# 扫描特定端口：
nmap -A -p 80,443,8080 --open --reason $target_host
# 前 100 大端口：
nmap -A --top-ports 100 --open --reason $target_host
# 全部端口：
nmap -A -p1-65535 --open --reason $target_host
```

#### 在网络内部进行测试

练习使用 `nmap`，扫描本地网络或你的某台服务器，检查路由器、打印机、智能冰箱等。

{/* 虽然端口扫描是日常操作，但在美国可能触犯《计算机欺诈与滥用法案》（CFAA），因此仅扫描你拥有的资产。 */}

#### 示例扫描命令

```bash
# 扫描本地主机的所有开放端口
nmap -sT localhost

# 扫描机器的私有 IP 上的服务
nmap -sV 192.168.1.10

# 查找网络上的服务详情
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# 或在 Docker 网络 172.18.0.1/16 上
nmap -sn 172.18.0.1/16
```

```text title="nmap 扫描" frame="terminal"
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

熟悉 `lsof`——它在 macOS 与 Linux 上均可使用，能够展示细粒度的网络状态和磁盘活动。

```bash title="lsof 命令"
# 监控特定端口
sudo lsof -i:80 -Pn
```

# 监控 ESTABLISHED 连接
sudo lsof -i -Pn | grep ESTABLISHED
# 查看 LISTEN
sudo lsof -i -Pn | grep LISTEN

# 查看网络名称而非 IP 地址（反向 DNS 查询会非常慢）
sudo lsof -i -P | grep LISTEN

# 监控所有网络连接
sudo watch -n1 "lsof -i -Pn"

```

#### 示例输出

![nmap scan for listeners](../lsof-scan-listen.webp)

### 文件监控

要找出哪些 **进程** 正在占用最多 **硬盘带宽**，可以使用 `iotop`：

```bash
sudo iotop
```

要查看单个文件的变化，可以在 Linux 上使用 `inotifywait`，或在 macOS 上使用 `fswatch`：

这对于检测文件夹或全系统的未授权或异常行为很有帮助。

```bash
# 监控目录下的所有文件变化
sudo inotifywait -m /path/to/directory
```

在 macOS 上可以使用 `fswatch`：

使用 `brew install fswatch` 安装

```bash
fswatch -r /path/to/directory
```

## ⏰ 常被忽视的技巧

1. **对认证尝试及其他关键端点进行速率限制**。可以通过 Nginx 的 `limit_req` 模块或 `fail2ban`（用于 SSH 访问）实现，限制暴力破解**可能**是个好主意。我说“可能”，是因为在 IPv6 与廉价僵尸网络的时代，这已经不再像过去那样简单。

2. **尽可能使用只读卷**：
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   与其他最佳实践（非 root 用户、最小化文件夹权限）结合使用，`:ro` 挂载选项可以在容器内部防止意外修改和部分写入尝试。但它并不能阻止已经拥有更高权限的进程对宿主机的影响。

3. **定期审计容器访问**。如果容器不需要某个 secret、端口或挂载，就把它们移除！

4. **警惕 WiFi 乱象**  
   你肯定不会随便把 WiFi 密码泄露给陌生人，对吧？但有些朋友……甚至家人也可能不经意间把你的 SSID 和密码分享给外部应用。

### 家庭网络 vs. 公共云提供商 vs. 隧道

1. **虚拟隔离/DMZ**：对家庭服务器而言，尽可能将其放在独立的 VLAN 或 DMZ 中。这可以防止内部设备被服务器侧的潜在妥协波及。  
   - 为家庭服务器使用独立的路由器或 VLAN。  
   - 为家庭服务器使用独立的 WiFi 网络。  
   - 为家庭服务器使用独立的子网。

2. **云提供商**：Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure、Google Cloud 等都提供不同的防火墙功能。  
   - 部分提供商默认阻断端口，亦有可选的开启或附加功能。请查阅对应服务提供商的文档。  
   - 许多提供商提供高级监控和威胁检测服务。

3. **VPN 与隧道**：考虑使用类似 VPN 的方案或隧道服务，在不将服务暴露到公网的前提下安全地跨互联网连接。  
   - TailScale、ngrok、ZeroTier。  
   - WireGuard、OpenVPN。

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 生产检查清单

- [ ] **Secrets**：所有 secret 均随机生成并安全存储  
- [ ] **Updates**：容器更新策略已记录并自动化（即使只是几条命令的文本文件也行）  
- [ ] **Network**：仅暴露必要端口，内部网络已配置  
- [ ] **Firewall Rules**：默认拒绝，显式允许，必要时进行国家封锁  
- [ ] **Reverse Proxy**：Nginx、Caddy 或 Traefik 可添加基础认证层  
- [ ] **Canary Tokens**：将其放置在敏感文件和凭证附近，以便在被触碰时立即发现  
- [ ] **Monitoring**：使用 `nmap`、`lsof`、`inotifywait`、`glances` 等工具了解系统状态  
- [ ] **Backup Strategy**：已测试、最好自动化且离线存储  
- [ ] **Least Privilege**：非 root 容器用户，只读卷

## 📚 进一步阅读

- [Docker 安全最佳实践](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker 安全速查表](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker 基准](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org 用于 Canary Tokens](https://canarytokens.org/)

## 致谢

向几位热心的 Reddit 用户致敬：

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [讨论串](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/)。</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

感谢阅读！希望本指南对你有帮助。如果有任何问题或建议，欢迎通过下方社交渠道联系我，或点击 `Edit on GitHub` 链接提交 PR！❤️
````
