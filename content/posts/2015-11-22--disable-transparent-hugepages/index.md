---
layout: post
title:  "MongoDB Tuning: disable-transparent-hugepages fix for Debian/Ubuntu"
date:   2015-12-22
modified:   2015-11-23
category: programming
tags: [programming, patterns, models, source code, organization]
cover: victor-garcia-645096-unsplash.jpg
---

# MongoDB Tuning: Disable THP

## disable-transparent-hugepages fix for Debian/Ubuntu

![credit: victor-garcia-645096-unsplash.jpg](victor-garcia-645096-unsplash.jpg)

## Seeing: "WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'." ?

Run the following commands to quickly do what [MongoDB describes at greater length](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/).


```sh
  # Currently just debian
  sudo curl -sSL -o /etc/init.d/disable-transparent-hugepages https://gist.githubusercontent.com/justsml/5e8f10892070072c4ffb/raw/disable-transparent-hugepages
  sudo chmod 755 /etc/init.d/disable-transparent-hugepages
  sudo update-rc.d disable-transparent-hugepages defaults

```

### References:

1. [https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/](https://docs.mongodb.org/v3.0/tutorial/transparent-huge-pages/)
