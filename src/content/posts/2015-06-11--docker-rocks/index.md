---
social_image: ./mobile.webp
title:  "Docker rocks & now works on OSX"
subTitle: "Docker is amazing, fast, and flexible"
date: 2015-06-11
modified: 2024-08-10
category: DevOps
subCategory: docker
tags: [docker, boot2docker, devops]
cover: guillaume-bolduc-259596-unsplash.webp
cover_mobile: w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: icon_guillaume-bolduc-259596-unsplash.webp
---

## Docker Rocks

> Updates September 2016, 2018
> Boot2Docker has been replaced by Docker for Mac

> To those on OSX or Windows: Don't let a slow experience give you an impression that Docker isn't enterprise-grade!

1. Docker is amazing, fast, and flexible.
1. Prior tools, boot2docker particularly, were slow and prone to crash.

 Docker can currently run natively on a Linux Kernel v3.4+ - and the current boot2docker vm actually runs v4.

 Best use of your hardware: Install the Latest Debian or Ubuntu on your Mac/Windows box,

 ... c'mon those games aren't helping your code...

### Check your setup

Review the output of `docker info` command.

1. Security: Check the server for unexpectedly open ports (with `nmap` from a remote network)
1. DNS: Use a local cache or low-latency DNS server.
1. Storage: Use the correct storage driver (`overlay2` is likely)

Updated 2024: 

- Docker Desktop is proprietary, but free for personal use. It's a great way to get started with Docker on OSX or Windows.
- If you're looking for a more open-source solution, check out [Rancher Desktop](https://rancherdesktop.io/).
