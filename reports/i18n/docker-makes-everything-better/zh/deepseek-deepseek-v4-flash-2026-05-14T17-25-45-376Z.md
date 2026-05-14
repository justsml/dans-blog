# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.63
- Input tokens: 1153
- Output tokens: 607
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000331
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === 爱
subTitle: Docker 无所不能！
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

> 历史说明：这是 2015 年对 Docker 热情和本地开发习惯的快照，主要作为时间胶囊保存。请将命令和安全策略视为现代化的起点，而非生产指导。

改进你的流程：

1.  测试开发工具和服务器，几乎零风险搞乱 PC 上的依赖
1.  测试你的软件
1.  促使你编写更幂等、更模块化的代码……（我会在后续文章中说明如何实际实现这一点）

看起来要学的新东西很多，**别让这阻止你**开始。

### 备注

- 如果你看到 `docker run` 命令带有 `-d` 或 `-it` 选项：
  _ `-it` 或 `-i -t` 会以交互方式运行配置的命令
  _ `-d` 会将 Docker 容器作为“守护进程”（即后台服务）启动

---

### 示例

### nginx

```bash
# 注意：使用基于主机的共享文件夹
#（共享文件夹无法通过 VOLUME Dockerfile 命令实现）
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

> 致谢：[https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
> Docker 将在整个 SDLC 中让你的生活更轻松。

> - 非常接近
````
