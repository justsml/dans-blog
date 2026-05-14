# Translation Candidate
- Slug: docker-rocks
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/zh/index.mdx
- Validation: deferred
- Runtime seconds: 1.30
- Input tokens: 1074
- Output tokens: 347
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000104
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker 很棒，现在支持 macOS
subTitle: Docker 既惊艳又高速且灵活
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
## Docker Rocks

> Updates September 2016, 2018  
> Boot2Docker 已被 Docker for Mac 替代

> 历史注记：本文特意保留为 2015 年版 Docker-for-Mac 的快照。性能建议和工具名称反映当时的情况；当前的 Docker Desktop 与 Compose 工作流已有所演进。

1. Docker 令人惊叹，速度快，灵活性高。  
1. 之前的工具，尤其是 boot2docker，慢且容易崩溃。

Docker 现在可以在 Linux Kernel v3.4+ 上原生运行——而当前的 boot2docker 虚拟机实际上运行的是 v4。

最佳硬件利用方式：在你的 Mac/Windows 机器上安装最新的 Debian 或 Ubuntu，

…算了，那些游戏对你的代码没有帮助…

### Check your setup

检查 `docker info` 命令的输出。

1. 安全：检查服务器是否有意外开放的端口（使用来自远程网络的 `nmap`）  
1. DNS：使用本地缓存或低延迟 DNS 服务器。  
1. 存储：使用正确的存储驱动（`overlay2` 很可能是最佳选择）

Updated 2024:

- Docker Desktop 为专有软件，但个人使用免费。它是在 OSX 或 Windows 上入门 Docker 的好方式。  
- 如果你想要更开源的方案，看看 [Rancher Desktop](https://rancherdesktop.io/)。
````
