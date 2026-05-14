# Translation Candidate
- Slug: docker-rocks
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-11--docker-rocks/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.56
- Input tokens: 1038
- Output tokens: 518
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000290
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker 超赞，现已支持 OSX
subTitle: Docker 令人惊叹、快速且灵活。
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker 真棒

> 更新于 2016 年 9 月、2018 年  
> Boot2Docker 已被 Docker for Mac 取代

> 历史说明：本文有意保留为 2015 年 Docker-for-Mac 的快照。其中的性能建议和工具名称反映了当时的状况；当前的 Docker Desktop 和 Compose 工作流已经演进。

1. Docker 令人惊叹，快速且灵活。  
1. 之前的工具，尤其是 boot2docker，运行缓慢且容易崩溃。

Docker 目前可以在 Linux 内核 v3.4+ 上原生运行——而当前的 boot2docker 虚拟机实际上运行的是 v4。

硬件的最佳用法：在你的 Mac/Windows 机器上安装最新的 Debian 或 Ubuntu，

……得了吧，那些游戏对你的代码可没帮助……

### 检查你的设置

查看 `docker info` 命令的输出。

1. 安全性：从远程网络使用 `nmap` 检查服务器是否有意外开放的端口  
1. DNS：使用本地缓存或低延迟 DNS 服务器。  
1. 存储：使用正确的存储驱动（很可能是 `overlay2`）

2024 年更新：

- Docker Desktop 是专有软件，但个人使用免费。这是在 OSX 或 Windows 上开始使用 Docker 的好方法。  
- 如果你在寻找更开源的选择，可以试试 [Rancher Desktop](https://rancherdesktop.io/)。
````
