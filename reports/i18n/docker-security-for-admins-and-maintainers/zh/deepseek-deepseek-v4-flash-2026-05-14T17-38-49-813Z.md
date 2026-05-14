# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/zh/index.mdx
- Validation: deferred
- Runtime seconds: 18.75
- Input tokens: 5222
- Output tokens: 3208
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001577
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: Docker 安全：开发者遗失的指南
subTitle: 了解如何保护您的网络免受威胁和危险配置的侵害！
date: '2025-01-04'
modified: '2025-01-13'
tags:
  - local development
  - security
  - devops
  - best-practices
category: Security
cover_full_width: ../flame-whale-wide.webp
cover_mobile: ../flame-whale-head-square-200.webp
cover_icon: ../flame-whale-head-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
import {CodeTabs} from '../../../../components/CodeTabs';

## 施工中

**目录**

1. [⚠️ 本地网络风险](#-local-networks-at-risk)
2. [🛡️ 防火墙配置](#-firewall-configuration)
3. [🔐 本地开发的密钥管理](#-secrets-management-for-local-development)
4. [🕵️‍ 凭据泄露与侧信道攻击](#-credential-leaks-and-side-channel-attacks)
5. [🔍 监控与蜜标令牌](#-monitoring--canary-tokens)
6. [❌ 常见误解](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ 本地网络风险

说实话，我们都干过这种事。你连上了一个随机咖啡店的 Wi-Fi，或者让别人用你的家庭网络，想都没想。也许你甚至信任你的智能冰箱不会危害你的网络。现实是？这些随意的决定可能会让你的本地开发环境暴露在不必要的风险中。攻击者并不只针对生产系统——本地环境往往是更软的目标，提供了访问敏感项目的途径。

### 攻击场景

1. **流量被拦截：** 未加密的流量很容易被捕获和读取。
2. **未受保护的服务：** 暴露在 `0.0.0.0` 上的本地数据库或 API。
3. **网络欺骗：** 将流量重定向到攻击者的设备。

### 快速修复

- 优先使用私有 Docker 网络而非防火墙，以限制网络暴露。
- 避免使用公共或共享 Wi-Fi；优先使用手机热点。
- 使用 `arp-scan` 和 `nmap` 等工具监控本地网络中的未知设备。

## 🛡️ 防火墙配置

### UFW 与 Docker（Ubuntu）

> ⚠️ **警告：** 默认情况下，Ubuntu/Debian 上的 Docker 会绕过 UFW/iptables 规则，可能使你的系统暴露于攻击之下。
> 即使你将端口绑定到本地 IP 地址（例如 `-p 127.0.0.1:8080:80`）也无济于事。

每次了解到这一点都让我感到惊讶！[Docker 默认绕过 UFW 规则](https://github.com/moby/moby/issues/4737)，允许容器与宿主机及其他容器无限制地通信。

### 最佳实践

1. 🥇 **使用 Docker 网络** 来隔离并控制哪些设备可以连接到每个容器或网络。

###
2. 🥉 **更新 iptables** 如果你必须使用 `host` 网络，或者无法使用自定义网络，可以通过配置 iptables 来降低风险。这并不适合胆小者，[请查看下面的工具。](#uf)

#### Docker 网络隔离

```bash
# 创建一个新的 Docker 网络
docker network create my-network

# 使用新网络运行容器
docker run --network my-network my-container
```

#### UFW 配置（针对 `host` 网络）

网上关于这个问题的糟糕建议比比皆是。使用 UFW 配置 Docker 的预期行为，实际上可以借助 UFW 本身来实现。

我曾用 `ufw-docker` 配置过一个自托管系统，效果似乎不错。

```bash title="install-ufw-docker.sh"
# 以 root 身份安装二进制文件（反正需要 root 权限）
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# 安装并修改 `ufw` 的 `after.rules` 文件
ufw-docker install

ufw-docker help

```

该命令执行以下操作：

- 备份 `/etc/ufw/after.rules` 文件。
- 在文件末尾追加 Docker 相关规则，使其与 UFW 正确集成。

**来源：** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**使用示例：**

```bash

# 允许 Docker 容器使用端口 8080
ufw-docker allow <container_name> 8080/tcp

# 安全地管理规则，与 UFW 配置共存
ufw-docker status

```

**注意：** 大多数针对 Docker-UFW 冲突的“修复”都涉及手动 iptables 规则，这在更新时容易出错且脆弱。

### macOS 防火墙

1. 前往 **系统偏好设置 > 安全性与隐私 > 防火墙**。
2. 启用防火墙，点击“防火墙选项”。
3. 阻止所有传入连接，仅保留必要服务。

**注意：** 你可能需要查阅防火墙配置，以允许你使用的某些智能设备——例如 Google Cast/AirPlay 及其他服务。

### 高级用户命令（macOS 和 Linux）

#### macOS：

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # 阻止所有
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # 允许特定应用

```

#### Linux（ufw）：

```bash

ufw default deny incoming  # 阻止所有传入
ufw allow ssh  # 允许 SSH
# 允许 443 和 80 用于 Web 流量
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # 启用防火墙

```

**专业提示：** 在 macOS 上使用 [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) 等工具，在 Linux 上使用 [ufw](https://help.ubuntu.com/community/UFW) 以获得更友好的配置界面。

## 🔐 本地开发的秘密管理

### 主动占位符验证

<p>💡 确保在运行应用之前，秘密已正确设置为真实值。</p>

如果你在秘密中使用类似 `__WARNING_REPLACE_ME__` 的占位符，那很好，也许有人会注意到。不过，你还可以添加一点验证，在运行时提供安全保障。

你简直不敢相信，当攻击者能猜到秘密时，完全破解（修改并重新签名）一个 JWT 令牌是多么容易！

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

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

### 生成与存储密钥

<p class="inset">切勿在代码库中硬编码密钥。优先使用环境变量和安全存储服务。</p>

与其使用 `.env.example`，不如用 `.env.generate.sh` 让用户轻松获得一个包含安全“默认值”的 `.env` 文件。

#### 示例 `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# 为本地开发生成安全的 .env 文件

generate_secret() {
    local length=${1:-30}
    # 增加 4 字节以补偿填充
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# 如果 .env 文件已存在则退出
[ -f .env ] && { echo ".env 文件已存在！"; exit 1; }

cat <<EOL > .env
# 数据库设置与密钥
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# 会话密钥
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "已生成新的 .env 文件！"
```

{/*

```zig
// validate_secrets.zig
const std = @import("std");

pub fn main() void {
    var env = std.os.getenv_map();
    const placeholder = "__WARNING_REPLACE_ME__";

    for (env.items()) |entry| {
        if (std.mem.contains(u8, entry.value, placeholder)) {
            std.debug.panic("Unsafe secret in {}", .{entry.key});
        }
    }
}
``` */}

## 🕵️‍ 监控与复核

### `nmap` 示例

#### 测试内部网络

```bash

# 扫描本地主机的所有开放端口
nmap -sT localhost

# 扫描本机私有 IP 上的服务
nmap -sV 192.168.1.10

# 检测网络中的设备
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24

```

#### 测试外部网络

可以使用 `ifconfig.me` 等服务轻松查询当前（公网）IP：`curl https://ifconfig.me`。

利用外部网络或远程服务器测试公网 IP：

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# 将 target_host 替换为你的公网 IP 或主机名
# 使用高级技术检查主机
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**为何要测试两者？**
内部测试能发现内部暴露情况，而外部测试则能识别攻击者可访问的服务。

## 🛡️ 常见误解

1. **我的本地环境不是攻击目标。**
   - 事实：攻击者可以从你的机器跳转到生产系统。
2. **防火墙能阻挡一切。**
   - 事实：防火墙只阻挡你配置它阻挡的内容。
3. **私有 IP 是安全的。**
   - 事实：像 NAT 绕过之类的攻击手段仍可能影响你的网络。
````
