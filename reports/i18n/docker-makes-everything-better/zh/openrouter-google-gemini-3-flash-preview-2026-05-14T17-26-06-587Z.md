# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.43
- Input tokens: 1068
- Output tokens: 485
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001989
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === 爱
subTitle: 'Docker 无所不能 :allthethings:!'
date: '2015-02-26'
modified: '2024-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - devops
  - patterns
related:
  - docker-server-setup-notes
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker 无所不能！\*

> 历史注记：这是一份 2015 年时期对 Docker 的狂热记录和本地开发习惯的快照，主要作为时间胶囊保存。请将文中的命令和安全策略视为现代化的起点，而非生产环境指南。

优化你的流程：

1.  测试开发工具和服务器，且**几乎零风险**，不会搞乱你电脑上的依赖项。
2.  测试你的软件。
3.  促使你编写更幂等、更模块化的代码……（我会在后续文章中详细说明如何实现这一点）。

虽然看起来有海量的新知识要学，但**别让这些阻碍你**开始动手。

### 笔记

- 如果你看到带有 `-d` 或 `-it` 选项的 `docker run` 命令：
  - `-it` 或 `-i -t` 将以交互模式运行配置的命令。
  - `-d` 将以“守护进程”（即后台服务）形式启动 Docker 容器。

---

### 示例

### nginx

```bash
# 注意：使用基于宿主机的共享文件夹
#(使用 Dockerfile 的 VOLUME 指令无法实现共享文件夹)
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## 本地数据，在实例内隔离
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> 鸣谢：[https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
> Docker 将在**整个**软件开发生命周期（SDLC）中让你的生活变得更轻松。

> - 离目标不远了
````
