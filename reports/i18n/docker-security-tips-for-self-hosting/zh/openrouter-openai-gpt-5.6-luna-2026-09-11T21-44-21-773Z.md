# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: zh
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx
- Validation: deferred
- Runtime seconds: 88.56
- Input tokens: 18294
- Output tokens: 9054
- Thinking tokens: unknown
- Cached input tokens: 7273
- Cache write tokens: 10997
- Estimated cost: $0.013214
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 自托管 Docker 的关键安全要点
subTitle: 保护你的自托管服务，从防御到监控！
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

- 🧗‍♀️ [勇者专属](#️-勇者专属)
- 🔄 [`:latest` 舞步](#-latest-舞步)
- 🔐 [机密管理：正确做法](#-机密管理)
- 🌐 [网络隐患](#-网络隐患)
- 🛡️ [访问控制](#️-访问控制)
- 🔍 [监控与验证](#-监控与验证)
- ⏰ [经常被忽略的技巧](#-经常被忽略的技巧)
- 🚀 [生产环境检查清单](#-生产环境检查清单)
- 📚 [延伸阅读](#-延伸阅读)

## 🧗‍♀️ 勇者专属

如果你在自己托管 Docker 服务，安全责任从头到尾都在你身上——没有云服务商替你挡端口扫描，也没有人替你收拾马虎的配置。无论你是在家庭网络上启动应用，还是从 Vultr、DigitalOcean、Linode、AWS、Azure 或 Google Cloud 这类服务商那里租用 VPS，你都得把东西锁好——还要验证自己确实锁对了。

本指南会带你过一遍 Docker 安全，从一些 `lesser-known` 的技巧，到其他 `difficult-to-get-right` 的做法；我们会讨论金丝雀令牌、只读卷、防火墙规则、网络分段与加固、添加需要身份验证的代理，以及更多内容。

我们还会比较家庭网络和公有云环境，并演示如何用 Nginx 设置一个基础认证代理。读完之后，你会有好几种办法把闲杂人等挡在外面（朋友、家人，有时甚至包括你自己……）

内容确实不少！但其中很多部分是相互关联的，你可以按自己的环境挑选最相关的部分。🍀

## 🔄 `:latest` 舞步

保持镜像更新对安全至关重要。不过，依赖 `:latest` 可能在没有审查环节的情况下引入破坏性变更或存在漏洞的构建版本。

### 安全的更新方式

将更新命令与 `pull` 或 `build` 结合使用，明确地刷新镜像，然后在你能及时发现故障的时间窗口内重启服务。

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### 固定版本还是使用 Latest

选择要固定的版本，本质上是在稳定性和安全性之间做权衡。下面是几种常见策略：

```yaml
# docker-compose.yml
# ...
  # Exact version pinning, best for critical services
  image: postgres:17.2

  # Patch version pinning, good for non-critical services
  image: postgres:17.2

  # Major version pinning, perfect for hobby projects
  image: postgres:17

  # Yolo, avoid if possible
  image: postgres:latest
```

使用 [Dependabot](https://github.com/features/security) 或 [Renovate](https://github.com/renovatebot/renovate) 创建可供审查的更新 PR。凡是凌晨两点重建会让你心疼的东西，都应该固定到具体版本或 digest，并让自动化工具在该升级时提醒你。

_欢迎告诉我你最喜欢哪些保持 Docker 镜像最新的工具！_

## 🔐 机密管理

- [生成高强度机密](#生成高强度机密)
- [金丝雀令牌](#金丝雀令牌)
- [从 `.env` 升级到 MacOS Keychain](#从-env-升级到-macos-keychain)
{/* - [占位符验证](#占位符验证) */}

管理机密的方式有很多，但有一条最重要的规则必须遵守：**绝不要把机密硬编码到 Docker 镜像中，也不要将其提交到 git。** 这是最常见的安全错误之一，会带来长期风险，而且修复起来很麻烦。

安全地存储机密是一个很大的主题，有很多选择：`.env` 文件、[Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/)、[1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/)，或者 [HashiCorp Vault](https://www.vaultproject.io/)、AWS Secrets Manager 之类的机密管理器。

你需要根据自己的使用场景，选择合适的投入程度和安全级别。

{/*
TODO: 移至维护者指南
// TODO: Move to Maintainer's Guide

### 占位符验证

<blockquote>机密根本不机密时，你不会相信破解 JWT 令牌有多容易！</blockquote>

<p className='inset'>💡 确保机密始终唯一。尽量让程序无法使用不安全的硬编码默认值运行。</p>

如果你在机密中使用 `__WARNING_REPLACE_ME__` 这样的占位符，那很好，说不定有人会注意到！

不过，为了保险起见，你还可以用很少的工作量增加一点运行时安全检查。下面是用 JavaScript、Rust 和 Go 实现这一点的方式：

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

### 生成高强度机密

下面这个小脚本可以为 `.env` 文件生成新的机密：

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

[**金丝雀令牌**](https://canarytokens.org/) 是检测机密是否遭到泄露（并被使用）的好方法。你可以把它们看作绊线，放进任何敏感文件、URL 和令牌中。

可以考虑把它们放在真正需要保护的机密旁边：`.env` 文件、CI 变量、密码管理器、备份目录和云凭据。别把这变成一场表演；应该把绊线放在真实攻击者，或未来某次误操作，确实会触碰到的地方。

可以选择的金丝雀“令牌”类型很多：AWS 令牌、[伪造的信用卡](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)号码、Excel 和 Word 文件、Kubeconfig 文件、VPN 凭据，甚至 SQL dump 文件也可以设置绊线！

#### 金丝雀令牌最佳实践

- **到处放置**：在你能想到的每个 `.env` 文件、CI/CD 流水线和“机密管理器”中。
  - 在主目录中放置一个 `passwords.xlsx` 或 `passwords.docx` 文件。
  - 添加一个 AWS 配置档 `billing_prod`，并将金丝雀令牌作为其机密。
  - 在 `~/.ssh` 目录中生成一个 `private.key` 文件。
  - 为 `~/backups` 目录创建一个 Canary SQL dump 文件 `all_credit_cards.sql`。
- **监控**：设置电子邮件规则或告警，以便捕捉金丝雀令牌何时被触发。

### 从 `.env` 升级到 MacOS 钥匙串

对于 Mac 用户来说，最简单的选择之一就是使用钥匙串。

下面是一种自动从 OSX 钥匙串加载机密的简单方法，支持 `TouchID`，也比 `.env` 文件稍微安全一些。

原始代码由 [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) 和 [Jan Schaumann](https://www.netmeister.org/) 提供。

<CodeTabs client:load tabs={[
  "辅助命令",
  "将机密持久化到环境变量",
  "按命令使用机密"]
}>
```bash title="keychain-secrets.sh"
### Functions for setting and getting environment variables from the OSX keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
Original credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) and [Jan Schaumann](https://www.netmeister.org/).

# Use: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Use: set-keychain-secret SECRET_ENV_VAR
# You will be prompted to enter the secret value!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # prompt user for secret
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Load Env vars into the current shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Note: If an attack can run `env` in your shell, then these secrets could be exposed!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Specify all secrets for this project
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Note: Using a shell wrapper helps prevent secrets from staying
# around in the environment. And it's safe to commit.

# Usage:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 网络隐患

### 自定义网络与内部端口

通过 Docker 网络正确隔离服务，是缩小攻击面的重要手段。

在网络上打洞要小心！一次配置错误的端口转发，就可能把事情搞得非常糟糕。

默认情况下，私有局域网中的服务不会暴露到互联网——你必须在路由器上显式转发端口。

### 局域网中的 Docker

无论你是开发者，在本地运行开发服务器，还是从本地网络自托管服务，**对 Docker 网络模型的错误假设都可能带来麻烦。**

开发者经常会惊讶地发现，用来保护 Linux 服务器的“传统”方法（`iptables`、限制 TCP/IP 的 sysctl 选项）在 Docker 主机上可能会**静默失效**！在**自托管服务——或者运行在典型家庭网络中——**时尤其如此。（后排的朋友注意了：这可能让别人访问你 MacBook 上的开发容器！！！）

> ⚠️ **警告 #1：** Docker 发布的端口可能绕过你以为正在保护主机的防火墙规则，尤其是在 Ubuntu/Debian 上使用 UFW 时。这并不意味着每条防火墙规则都没用，但意味着“UFW 说拒绝”并不是证据。[参见 issue #690：Docker 绕过 ufw 防火墙规则](https://github.com/moby/moby/issues/690)。

> ⚠️ **警告 #2：** 将端口绑定到本地 IP 地址（例如 `-p 127.0.0.1:8080:80`）是正确的默认做法，但早于 28.0.0 的 Docker Engine 版本存在这种情况：同一二层网络上的主机仍然可以访问发布到 localhost 的端口。[Docker 在端口发布指南中记录了这一注意事项](https://docs.docker.com/engine/network/port-publishing/)，下面介绍的用 nmap 验证的习惯依然很重要。

<p class="inset">如果你对刚刚了解到的这些感到意外，那我也是！</p>

**将端口绑定到本地 IP 仍然是一个好习惯**，并且在**托管云环境和经过特殊配置的网络中**具有实际意义。 
{/* Don't think of your firewall or private network as your main or only defense, add Docker Networks to the mix for better **isolation**, and always consider if you need to expose ports at all. */}

### Docker Compose 示例

下面是一个 `docker-compose.yml` 文件示例：它将 `app` 服务绑定到 `127.0.0.1:8080`，并将两个容器都连接到自定义的 `backend` 网络。

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Bind to localhost if possible
      - "127.0.0.1:8080:8080"
    # ... other settings
  database:
    image: postgres:17.1
    # No ports needed; accessible inside backend network.
    networks:
      - backend

```

{/* #### 测试与验证

与所有安全措施一样，**测试并验证**网络配置至关重要。 */}

{/* 在大多数公司，网络安全与审计是一项全职职责，但大多数自托管用户根本不会在这上面花任何时间！ */}

{/* 看，我懂，这确实可能让人望而生畏。_(子网、网络掩码、CIDR、VLAN 和路由表，天哪！如果这些听起来完全没意义，也没关系——你来对地方了。而且目前我们根本不用操心这些。)_ */}

### 网络最佳实践

- 🏆 **不要发布任何端口**：最近我才发现，这一招比你想象的更有用！使用命名的（bridge）网络时，容器可以不受过滤地相互访问。它们的行为就像位于本地网络（NAT 网关）之后一样。
  - 虽然并非适用于所有场景，但对于运行批处理任务，或主要通过 `attach` 或 `exec` 访问的容器，这可能很有用。
- 🥇 **使用 Docker 网络**：隔离容器，并控制哪些容器可以相互通信。
- 🥉 **绑定到 localhost**：虽然这并不[完美](https://github.com/moby/moby/issues/45610)，但通常最好还是将端口绑定到回环地址（例如 `127.0.0.1:8080:80`）。只要记得[验证你的配置](#监控与验证)即可。

## 🛡️ 访问控制

访问控制是保护 Docker 服务的关键组成部分。这包括限制容器能力与权限、限制对 Docker socket 的访问，以及其他措施。

- [限制容器能力](#限制容器能力)
- [Docker Socket 访问](#docker-socket-访问)
- [阻止国家！](#阻止国家)
- [加固 CloudFlare 代理主机](#加固-cloudflare-代理主机)

### 限制容器能力

另一个扎实的访问控制做法，是限制容器拥有的能力。这可以缩小多种威胁的爆炸半径，从权限提升到流量劫持都包括在内。它不是力场，但能移除大多数容器根本不需要的权限。

**什么是 capabilities？** Linux 内核定义的、带名称的权限或能力。（[`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) 手册页列出了完整清单。）其中包括 `CAP_CHOWN`（更改文件所有权）、`CAP_NET_ADMIN`（配置网络接口）、`CAP_KILL`（终止任意进程）等，还有很多其他能力。

确定所需能力有两种方法：

1. **反复试错**：这种方法慢，但有效。先不给容器任何能力，然后逐个加回，直到应用能够正常运行。
2. **寻找已有成果**：搜索 "`project-name` `cap_drop` Dockerfile"，或 "`project-name` `cap_drop` docker-compose.yml"，看看是否已经有人替你完成了这项工作。LLM 可以给出一个起点，但在测试容器并阅读镜像文档之前，都应把它当作猜测。

#### 能力配置最佳实践

- **删除所有能力**：使用 `cap_drop: [ ALL ]`，从容器中删除所有 Linux capabilities。
- **禁止新增权限**：使用 `security_opt: [ no-new-privileges=true ]`，防止容器获得新的权限。

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
    # ... other settings
networks:
  db-network:
```

现在，你的服务可以通过 `db-network` 网络相互通信。Docker Compose 会自动创建这个网络。

使用 `--external`/`external:` 选项加入**预先存在的网络**。省略该选项则会创建新网络。

### Docker Socket 访问

#### ⚠️ 警告：`docker.sock` 基本上等同于主机管理员权限

<blockquote class="inset">⚠️ `\:ro\` 选项不会影响通过 socket 发送的 I/O！</blockquote>

它只会确保 socket 路径本身以只读方式挂载。通过该 socket 发送的 API 调用仍然可以创建容器、挂载主机路径，以及执行其他一些你大概完全没打算委托出去的“精彩”操作。

{/* 任何能够“打开”这个 socket 的进程，可能都能在主机上获得 root 权限。 */}

#### Socket 最佳实践

- 🥇 **避免挂载 Docker socket**，很可能存在更好的替代方案。
- 🫣 如果确实必须这么做，**在它前面放置一个范围严格的代理**，只允许应用实际需要的 API 端点。可以看看最初由 Tecnativa 提供的 `docker-socket-proxy` 项目：[docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy)。然后验证那些被拒绝的调用确实会被拒绝。
- 🤢 好吧，在一个**高度信任**、**低风险**的测试环境中，_也许_共享它没问题。

#### 阻止国家！

有时有用，但算不上真正的安全边界。

_这里说的是地缘政治实体，不是音乐……_

如果你主要是为本地的家人和朋友托管应用，可以阻止来自你预期不会产生流量的国家的流量。或者，只允许来自你预期会产生流量的国家的请求。这样能减少噪声；但挡不住 VPN、代理、僵尸网络，或者任何有耐心的人。

下面这个脚本可以阻止来自中国的所有流量：

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

同样地，你也可以只允许来自美国的流量：

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### 加固 CloudFlare 代理主机

如果你的家庭服务器位于 CloudFlare IP（代理）之后，可以将访问限制为仅允许 CloudFlare 的 IP 和本地网络。

这和上面的[阻止国家](#阻止国家)有些类似，但控制范围要严格得多。

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

要测试基于地理位置的变更，可以使用一个在目标国家设有节点的 VPN。更多内容请参阅[监控与验证](#监控与验证)部分。

### 应用层安全

完成[网络和主机的安全加固](#-network-hazard)后，你可能会发现还有更多工作要做。

现在，我们需要考虑服务自身的“应用”层。

<p class="inset">数据库有有效密码吗？这个容器会自动处理 HTTPS/证书吗？应用是否包含内置身份验证？对哪些邮箱可以注册有限制吗？有没有需要修改的默认凭据或环境变量？</p>


唯一能_确定_的方法就是检查。在这种情况下，先从 `README` 以及其他关键文件入手，例如 `docker-compose.yml`、`Dockerfile` 和 `.env.*`。不仅要检查项目本身，理想情况下还要检查它所依赖的服务。（例如 Postgres、Redis 等。）

#### 反向代理

另一层防御是基本身份验证。不要在没有 HTTPS 的情况下使用它。对于遗留服务，在管理路由前加一层基本身份验证，通常就足以阻止随手发起的请求和未经身份验证的爬虫直接捅进服务。

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

使用基本身份验证代理后，攻击者在碰到内部服务之前，还得先过一道门槛——用户名和密码。

另一种选择是使用 [Traefik](https://traefik.io/) 或 [Caddy](https://caddyserver.com/) 之类的服务，由它们帮你自动处理 HTTPS 和基本身份验证。

如果你想通过 GUI 管理许多域名和服务，我推荐使用 [Nginx Proxy Manager](https://nginxproxymanager.com/)。

## 🔍 监控与验证

- [检查端口](#检查端口)
- [查看开放端口](#查看开放端口)
- [文件监控](#文件监控)

这是**最重要、也最容易被忽略的一步。**你可以有最好的防火墙、最好的网络和最完善的实践，但如果不进行验证，就根本不知道它们是否真的在工作。

此外，只要掌握少量命令——或者知道去哪里查——就可能决定你能否及时阻止一次入侵。至于那种像黑客一样操作的感觉，就算是额外奖励吧。（详细信息和示例请直接跳到[监控与验证](#-监控与验证)部分。）

<p class="inset">不要盲目信任，验证两次</p>

### 检查端口

<p class="inset">⚠️ 重要：不要扫描不属于你的主机。</p>


无论你是在家庭网络中，还是使用 VPS，都应该知道哪些端口对全世界开放。

有两种方式可以做到这一点：

- 检查网络（`nmap`、`masscan`）
- 询问操作系统（`lsof`、`netstat`、`ss`）

#### 从网络外部测试

你需要知道当前的（公网）IP。使用 `ifconfig.me` 之类的服务可以轻松获取：`curl https://ifconfig.me`。也可以在托管服务商的控制面板中查看。

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

拿到公网 IP 后，接下来需要**连接到外部网络。**你可以使用朋友的电脑、手机的 5G 热点，或者一台专用服务器主机。

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Note: Ensure `target_host` is the desired IP

# Scan specific ports:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 ports:
nmap -A --top-ports 100 --open --reason $target_host
# All ports
nmap -A -p1-65535 --open --reason $target_host

```

#### 在网络内部测试

练习使用 `nmap`：扫描本地网络或某台服务器，也可以检查路由器、打印机和智能冰箱。

{/* While port scans are a constant fact of life, it might be a violation of the CFAA (Computer Fraud and Abuse Act) in the US. So, only scan things you own. */}

#### 扫描命令示例

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Find service details on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Or on a docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap Scan" frame="terminal"
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

熟悉一下 `lsof`——它在 MacOS 和 Linux 上都可用。它可以显示细粒度的网络状态和磁盘活动。

```bash title="lsof Commands"
# Monitor specific port
sudo lsof -i:80 -Pn


# Monitor ESTABLISHED connections
sudo lsof -i -Pn | grep ESTABLISHED
# View LISTEN
sudo lsof -i -Pn | grep LISTEN

# to see network names instead of IP addresses (can be very slow to do reverse DNS lookups)
sudo lsof -i -P | grep LISTEN

# Monitor all network connections
sudo watch -n1 "lsof -i -Pn"

```

#### 示例输出

![nmap scan for listeners](../lsof-scan-listen.webp)

### 文件监控

要找出哪些**进程**占用了最多的**硬盘带宽**，可以使用 `iotop`：

```bash

sudo iotop

```

要查看单个文件的变化，可以在 Linux 上使用 `inotifywait`，或在 MacOS 上使用 `fswatch`：

这对于检测每个文件夹或整个系统范围内未经授权或异常的行为很有用。

```bash

# Monitor all file changes in a directory
sudo inotifywait -m /path/to/directory

```

在 MacOS 上可以使用 `fswatch`：

使用 `brew install fswatch` 安装。

```bash

fswatch -r /path/to/directory

```

## ⏰ 经常被忽略的提示

1. **限制速率**：限制身份验证尝试次数，以及其他关键端点的请求速率。无论是通过 Nginx 的 `limit_req` 模块，还是使用 `fail2ban` 保护 SSH 访问，给暴力破解踩一脚刹车，_大概_是个好主意。我说“大概”，是因为在 IPv6 和廉价僵尸网络横行的时代，情况已经和过去不一样了。

2. **尽可能使用只读卷**：
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   与其他最佳实践（非 root 用户、最小化目录权限）结合使用时，`:ro` 卷挂载选项可以进一步防止意外修改，以及容器内部发起的某些写入尝试。但它无法保护主机免受已经拥有更高权限的进程影响。

3. 定期**审计容器访问权限**。  
   如果容器不需要某个密钥、端口或挂载，就删掉它！

4. **当心 WiFi 上的闲杂人等**  
   我相信你绝不会把 WiFi 密码告诉别人，尤其是那些奇奇怪怪的人，对吧？嗯，少数朋友除外……好吧，也许家人也算。你永远不知道他们装了什么应用，其中哪些会把你的 SSID 和密码分享给全世界。

### 家庭网络 vs. 公共云服务商 vs. 隧道

1. **虚拟隔离/DMZ**：如果条件允许，把家庭服务器放到单独的 VLAN 或 DMZ 中。这样，即使服务器一侧被攻破，也能让内部设备不至于直接暴露。
   - 为家庭服务器使用单独的路由器或 VLAN。
   - 为家庭服务器使用单独的 WiFi 网络。
   - 为家庭服务器使用单独的子网。

2. **云服务商**：Hetzner、Vultr、DigitalOcean、Linode、AWS、Azure 和 Google Cloud 都提供不同的防火墙功能。
   - 一些服务商和服务默认会阻止某些端口。有些提供可选启用的功能或附加服务。查看服务商的文档。
   - 许多服务商提供高级监控和威胁检测服务。

3. **VPN 与隧道**：可以考虑使用类似 VPN 的方案或隧道服务，在不把服务暴露到公网的情况下，安全地跨互联网连接它们。
   - TailScale、ngrok、ZeroTier。
   - WireGuard、OpenVPN。

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 生产环境检查清单

- [ ] **密钥**：所有密钥均为随机生成，并已安全存储
- [ ] **更新**：已记录并自动化容器更新策略。（如果只是文本文件中的几条命令，也没问题。）
- [ ] **网络**：仅暴露必要端口，已设置内部网络。
- [ ] **防火墙规则**：默认拒绝，明确放行；必要时屏蔽特定国家或地区。
- [ ] **反向代理**：Nginx、Caddy 或 Traefik 可以增加一层基本身份验证
- [ ] **Canary Token**：将它们放在敏感文件和凭据附近——也就是一旦被触碰，你确实会去调查的位置。
- [ ] **监控**：用 `nmap`、`lsof`、`inotifywait`、`glances` 等工具了解你的系统。
- [ ] **备份策略**：经过测试，最好自动执行，并保存到异地。
- [ ] **最小权限**：容器使用非 root 用户，只读卷。

## 📚 延伸阅读

- [Docker 安全最佳实践](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker 安全备忘单](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker 基准](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org：Canary Token](https://canarytokens.org/)

## 致谢

特别感谢几位热心的 Reddit 用户：

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [讨论串](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

感谢阅读！希望这篇指南对你有所帮助。如果你有任何问题或建议，欢迎通过下方的社交账号联系我；也可以点击 `Edit on GitHub` 链接创建 PR！❤️
````
