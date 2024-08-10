---
title: "Docker === Love"
subTitle: Docker can do :allthethings:!
date: 2015-02-26
modified: 2024-07-30
category: DevOps
subCategory: docker
tags: [docker, devops, patterns]
cover: guillaume-bolduc-259596-unsplash.jpg
cover_mobile: w300_guillaume-bolduc-259596-unsplash.jpg
cover_tablet: w600_guillaume-bolduc-259596-unsplash.jpg
cover_desktop: w900_guillaume-bolduc-259596-unsplash.jpg
cover_icon: icon_guillaume-bolduc-259596-unsplash.jpg
---

## Docker Can Do Everything!\*

Improve your process for:

1.  Testing Dev Tools & Servers WITH VIRTUALLY ZERO risk of messing up dependencies on your PC
1.  Testing your software
1.  Makes you write more idempotent, modular code... (I'll write how to actually realize this in a follow up)

There may seem like a huge volume of new stuff to learn, **don't let that stop you** from getting started.

### Notes

- If you see a `docker run` command with either options `-d` or `-it`:
  _ `-it` or `-i -t` will run the configured command interactively
  _ `-d` will start the docker container as a 'daemon' aka background service.

---

### EXAMPLES

### nginx

```bash
# Note: using host-based, shared folders
#(shared folders are not possible with the VOLUME Dockerfile cmd)
sudo docker run --name web01 -d -p 8181:80 \
  -v $(NGINX_DIR)/etc:/etc/nginx \
  -v $(NGINX_DIR)/log:/var/log/nginx \
  -v $(NGINX_DIR)/www:/var/www/html \
  nginx:latest

## Local data, isolated within instance
sudo docker run --name web01 -d -p 8181:80 nginx:latest

# nodejs
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest
```

> Credits: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)
> Docker will make your life easier throughout the _entire_ SDLC.

> - Pretty close
