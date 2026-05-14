# Translation Candidate
- Slug: docker-firewall-setup
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/zh/index.mdx
- Validation: deferred
- Runtime seconds: 2.31
- Input tokens: 2471
- Output tokens: 755
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000232
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Docker 防火墙配置
subTitle: 为 Docker 主机设置防火墙
draft: true
date: '2015-06-06'
modified: '2016-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - security
  - devops
cover: ../charles-deluvio-456501-unsplash.webp
cover_mobile: ../w300_charles-deluvio-456501-unsplash.webp
cover_icon: ../icon_charles-deluvio-456501-unsplash.webp
---
## 设置 Docker 主机的防火墙

1. 假设使用 Debian/Ubuntu 服务器  
1. 设计用于在 Docker 主机服务器上运行  

### 安装依赖

```sh
# 需要的终极防火墙
apt-get update && apt-get install -y ufw nmap curl
```

### 获取内部和外部 IP 地址

```sh
# 获取 IP 地址，简洁输出：
hostname --all-ip-addresses

# 或者使用 ip 工具，例如：
ip addr
```

### 防火墙 (UFW) 设置 - 示例命令

```sh
ufw logging on # on=low - medium 可能更适合诊断
ufw logging medium
# 首先，阻止所有流量
ufw default deny incoming

# 必须：从以下两种默认出站规则中*选择其一*：
ufw default deny outgoing
ufw default allow outgoing

# 允许并记录所有新的 ssh 连接，
ufw allow log proto tcp from any to any port 22
## 允许 http 流量（不显式记录）
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# 冗长写法：ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # 基础速率限制，减轻 SSH 暴力破解

# 设置你的外部 IP
export EXTERNAL_IP=123.123.123.123
# 如有需要，更新 Docker IP
export DOCKER_IP=172.17.42.1
# 将 tcp 8080 流量转发到 Docker 化的应用
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
```

## 启用 / 启动防火墙

> 小心操作，别把自己的 SSH 端口锁住（sshd 默认是 22）

```sh
ufw --force enable

ufw reset
```

### 测试防火墙

> 重要提示：请使用远程 IP 地址/位置

~~~sh
# 验证依赖
apt-get update && apt-get install -y nmap

# 设置扫描目标
export TARGET_HOST=123.123.123.123

# 示例扫描命令：
# 快速开放端口检查
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# 彻底扫描
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# 服务检查
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> 完成！现在你应该只会看到你配置的端口！
````
