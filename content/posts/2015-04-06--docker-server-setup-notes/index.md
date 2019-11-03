---
layout: post
title:  "Docker server Setup"
date:   2015-04-06 01:00:59
modified: 2019-11-03 13:00:00
category: docker
tags: [devops, docker, server, setup, shell script]
cover: markus-spiske-193031-unsplash.jpg
---

# Docker **Host Server** Setup

![credit: markus-spiske-193031-unsplash.jpg](markus-spiske-193031-unsplash.jpg)

## Quick Install

Install Docker, with 1 shell command!

~~~sh
curl -sSL https://get.docker.com/ | sh
~~~

# Complex `run` Command Examples

> NOTE: the `-p 127.0.0.1:27017:27017` option prevents access to your instance except from the server 'localhost network'.
> Remove the local IP address prefix to allow other containers access: `-p 27017:27017`

## MongoDB Server

~~~sh
mkdir -p $HOME/.mongodb/data

docker run -d \
  --name mongodb \
  --restart on-failure:15 \
  -p 127.0.0.1:27017:27017 \
  -v $HOME/.mongodb:/data \
  mongo:4 bash -c 'mongod --bind_ip 0.0.0.0 --storageEngine=wiredTiger'
~~~

Now that your server is setup, verify your data is at `$HOME/.mongodb` with:

```sh
ls -lach $HOME/.mongodb
```

Let's connect to the server with `mongo` CLI tool. (If you don't have it installed see below.)

```sh
#> Using default arguments:
mongo
```

And you should see something like this:

<img width="807" alt="image" src="https://user-images.githubusercontent.com/397632/68092978-2ac57a80-fe4e-11e9-9b15-d365da0b4637.png">


### Setup mongo CLI tools

#### Using brew & OSX

```sh
brew tap mongodb/brew
brew install mongodb-community-shell
```


## Mysql Server

> **WARNING:** CHANGE THE PASSWORD IN `MYSQL_ROOT_PASSWORD` BELOW.

```sh
mkdir -p $HOME/.mysql

docker run -d \
  -v $HOME/.mysql:/var/lib/mysql \
  -p 127.0.0.1:3306:3306 \
  --name mysql-$USER \
  -e MYSQL_DATABASE=$USER \
  -e MYSQL_ROOT_HOST='172.*.*.*' \
  -e MYSQL_ROOT_PASSWORD='p@ssw0rd' \
  mysql/mysql-server:8
```

## Elastic Search

~~~sh
mkdir -p $HOME/.elastic

docker run -d \
  --name elastic \
  -p 127.0.0.1:9200:9200 \
  -p 127.0.0.1:9300:9300 \
  -v $HOME/.elastic:/data \
  elasticsearch bash -c 'elasticsearch --cluster.name elastic_cluster --node.name elastic01 --path.data /data/elastic-data --path.logs /data/elastic-logs '
~~~


## Package up your NodeJS/Ruby/Python/Web App

1. Add a blank file named `Dockerfile` in your project root.
1. _(Optional, Recommended)_ Add a `.dockerignore` using .gitignore rules to exclude large non-essential paths. By default all project files are included.

## Create a `Dockerfile` in your apps root

~~~dockerfile
# Example for NodeJS
FROM node:12
EXPOSE [3000]
COPY . /app/
WORKDIR /app
RUN apt-get update && apt-get dist-upgrade -yqq
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

## Build Docker Image

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

> Important: Any data not stored on a mounted volume path will be lost!!

~~~sh
# Delete Image
docker rmi -f app-name-here
docker rm -f webapp01
# now re-run your `docker run...` from ^^^
# So for example, let's kill your db instances above, run: ( start with something like `docker stop {mongo,elastic}` )
docker rm -f mongo elastic
~~~


<!--

## Optional Config & Monitoring Tools

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
~~~

> Only for SELinux Enabled Systems

~~~sh
# SELinux fixes (optional)
# chcon -Rt svirt_sandbox_file_t /mongodb
# chcon -Rt svirt_sandbox_file_t /elastic
~~~

-->


