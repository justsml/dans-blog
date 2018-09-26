---
layout: post
title:  "Docker server Setup"
date:   2015-04-06 01:00:59
category: docker
tags: [devops, docker, server, setup, shell script]
cover: markus-spiske-193031-unsplash.jpg
---

# Docker **Host Server** Setup

![credit: markus-spiske-193031-unsplash.jpg](markus-spiske-193031-unsplash.jpg)

## Basic Monitoring Tools

~~~sh
# Debian/BSD Requirements / Updates + monitoring tools: atop & htop
apt-get update && apt-get install -y vim-nox git-core curl atop htop build-essential libssl-dev linux-image-amd64 linux-headers-amd64 sudo

# OSX, Debian & RHEL: Host OS Tuning
sysctl -w vm.max_map_count=262144

# Updates Profile init scripts before appending new scripts below
mkdir ~/backups
cp ~/.bash* ~/backups/

# Debian/BSD:  Append Shell Environment Shortcuts + XTERM Colors
curl -o- https://raw.githubusercontent.com/justsml/system-setup-tools/master/modules/vim-update.sh | bash

curl -sSL https://raw.githubusercontent.com/justsml/system-setup-tools/master/home-scripts/.bashrc >> ~/.bashrc
curl -sSL https://raw.githubusercontent.com/justsml/system-setup-tools/master/home-scripts/.bash_aliases >> ~/.bash_aliases
# Read into current shell (login steps already missed the aliases file)
source ~/.bashrc

# Docker pre reqs
# sudo apt-get install -y linux-image-virtual linux-image-extra-virtual
# Install Docker, straight from the horses mouth
curl -sSL https://get.docker.com/ | sh

~~~

> Only for SELinux Enabled Systems

~~~sh
# SELinux fixes (optional)
# chcon -Rt svirt_sandbox_file_t /mongodb
# chcon -Rt svirt_sandbox_file_t /elastic
~~~

# Simple Database Setup/Startup

## MongoDB v3 Server

~~~sh
mkdir /mongodb
docker run --name mongo -p 27017:27017 -v /mongodb:/data -d mongo:latest bash -c 'mongod --logpath /data/mongodb.log --logappend --dbpath /data/data --storageEngine=wiredTiger'
~~~

## Elastic Search

~~~sh
mkdir /elastic
docker run --name elastic -d -p 9200:9200 -p 9300:9300 -v /elastic:/data elasticsearch bash -c 'elasticsearch --cluster.name elastic_cluster --node.name elastic01 --path.data /data/elastic-data --path.logs /data/elastic-logs '
~~~

> You just lit up 2 database docker instances!!!
> If it were any easier, I'm pretty sure you couldn't invoice for it.


# Package up your NodeJS/Ruby/Python/Web App

1. Add a blank file named `Dockerfile` in your project root.
1. _(Optional, Recommended)_ Add a `.dockerignore` using .gitignore rules to exclude large non-essential paths. By default all project files are included.

## Create a `Dockerfile`

~~~dockerfile
# Example for NodeJS
FROM node:0.12
EXPOSE [3000]
COPY . /app/
WORKDIR /app
RUN apt-get update \
	&& apt-get dist-upgrade -y
RUN ["npm", "install"]
# Overridable Command
CMD ["npm", "start"]
~~~

It's easier to show how to start using the Dockerfile and demonstrate the results via console (see commands below).

In terminal, `cd` to your project folder and run the following `build` command _everytime_ you deploy changes - or want to change/upgrade OS or Env config)

```sh
docker build -t app-name-here .
```


# Docker Commands to Learn

## Build Docker Image Every Deploy/Change

~~~sh
docker build -t app-name-here .
~~~

## Create/Run Web App w/ Links to DB Servers

~~~sh
docker run -d --name webapp01 -p 3000:3000 --link mongo:mongo --link elastic:elastic app-name-here
~~~

## Run Interactively (non-daemon, in terminal)

~~~sh
docker run -it --name webapp01 -p 3000:3000 --link mongo:mongo --link elastic:elastic app-name-here bash
~~~

## Delete Container Instance or Image

> Important: Any data not stored on the mounted volume path will be lost!!

~~~sh
# Delete Image
docker rmi -f app-name-here
docker rm -f webapp01
# now re-run your `docker run...` from ^^^
# So for example, let's kill your db instances above, run: ( start with something like `docker stop {mongo,elastic}` )
docker rm -f mongo elastic
~~~

