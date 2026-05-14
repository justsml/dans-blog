# Translation Candidate
- Slug: docker-rocks
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/zh/index.mdx
- Validation: deferred
- Runtime seconds: 12.22
- Input tokens: 978
- Output tokens: 863
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000285
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker 很强大，现已支持 macOS
subTitle: Docker 强大、快速且灵活
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
## Docker很强大

> 2016年9月、2018年更新  
> Boot2Docker已被Docker for Mac取代

> 历史说明：本文档有意保留为2015年Docker for Mac的快照。性能建议和工具名称反映了那个时期；当前的Docker Desktop和Compose工作流已有所发展。

1. Docker非常出色，快速且灵活。  
1. 之前的工具（尤其是boot2docker）运行缓慢且容易崩溃。

Docker目前可以在Linux内核v3.4+上原生运行——当前的boot2docker虚拟机实际上运行的是v4。

充分利用你的硬件：在Mac/Windows系统上安装最新版Debian或Ubuntu，

... 来吧，那些游戏可帮不了你的代码...

### 检查你的配置

查看`docker info`命令的输出结果。

1. 安全性：检查服务器是否有意外开放的端口（通过远程网络使用`nmap`）  
1. DNS：使用本地缓存或低延迟DNS服务器  
1. 存储：使用正确的存储驱动（`overlay2`可能是最佳选择）

2024年更新：

- Docker Desktop现在是专有软件，但个人使用免费。这是在OSX或Windows上开始使用Docker的好方法。  
- 如果你寻求更开源的解决方案，请查看 [Rancher Desktop](https://rancherdesktop.io/)。
````
