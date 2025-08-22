---
title: "Python Environments Using Docker"
subTitle: Without all the versioning pain!
date: 2021-01-04
modified: 2021-03-05
tags: [python,environments,development,docker]
category: python
cover: pexels-pixabay-45246.jpg
photo: pexels-pixabay-45246-cropped.jpg
---

## Overview

Have you ever wanted to run a project (safely) without messing with your local environment?

For this exercise we'll rely on docker's ability to run many versions of Python without affecting each other or your current OS environment.

While there are already [many guides](https://pythonspeed.com/docker/) on how to setup isolated development environments, they generally all use a `Dockerfile`. This method isn't quite as flexible as we might need...

- We'll use only `docker` commands and some shell scripting.
- Setup: One-time
    - [Helper shell functions](https://www.notion.so/dansthoughts/Python-Versioning-with-Docker-256ab97774744d28996dcf6f87a8e222#4efe262324bc4bb48cec097f2462abe0) get the closest git repo's path & folder name.
- Setup: Per-project & Python version
    - [Creating an Environment](https://www.notion.so/dansthoughts/Python-Versioning-with-Docker-256ab97774744d28996dcf6f87a8e222#4bc9e44e6af840fd9d32bc8f7af2ba69)
- [Operations Guide](https://www.notion.so/dansthoughts/Python-Versioning-with-Docker-256ab97774744d28996dcf6f87a8e222#1c7f01d9de6c4040a6f9d9561766647b)
    - List Environments (containers) `docker ps -a`
    - Stop & Start Environments
        - (Type `docker stop dev[TAB][TAB][TAB]` or `docker start ...`.)
    - Getting a Shell Prompt `docker exec -it CONTAINER_NAME /bin/bash`
- [Tips & Gotchas](https://www.notion.so/dansthoughts/Python-Versioning-with-Docker-256ab97774744d28996dcf6f87a8e222#c10ed8705d754bb5b94acf53a112b3f9)

Let's talk high-level how this **docker development workflow** actually works.

For every platform & version you want to run, you'll need to create a fresh container. Say you wanted to run both a `python:2.7` and `python3.7` environment, you'd need to run a `docker run ...` command for each. (See example below.)

## Shared Helpers

Copy the following to the end of your `~/.zshrc` or `~/.bashrc`

```bash
function project_directory () { git rev-parse --show-toplevel }
function project_name () { basename "$(project_directory)" }
```

Then **don't forget** to restart your terminal window (or `source` the rc file.)

## Creating an Environment

### Python 3.9, w/ interactive shell

```bash
docker run \
  --interactive \
  --tty \
  --workdir /app \
  --volume $(project_directory):/app/ \
  --name="dev-$(project_name)-v39" \
   python:3.9 \
   /bin/bash
# Note: If you need access to a network service add the option: `--publish 8000:8000`
```

### Python 3.7, in background

```bash
docker run \
  --daemon \
  --workdir /app \
  --volume $(project_directory):/app/ \
  --name="dev-$(project_name)-v37" \
   python:3.7 \
   /bin/bash
# Note: If you need access to a network service add the option: `--publish 8000:8000`
```

After the shell prompt is ready, install any OS tools you might need, and install dependencies for your project:

```bash
# Setup OS Dev Tools
apt-get update
apt-get install -y --no-install-recommends software-properties-common
apt-get install -y ca-certificates curl git libjpeg-dev build-essential make libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev
# With pipenv
pip install pipenv
pipenv install --deploy --dev

```

Changes will persist in your container, unless you delete it.

## Operations Guide

## Tips & Gotchas

### Networking

When dealing with Web Servers (and other networked apps), you'll need to 'publish' local port(s) by adding the `--publish localPort:containerPort` (or `-p` for short) argument to your `docker run ...` commands. For a web server that runs on 8080 you would add `-p 8080:8080`. Add additional ports by appending additional `--publish` options.

### Multiple Required Paths

For each path add a `--volume hostPath:containerPath` 

### Environment Variables

Use docker's command arguments to get environment variables in containers as you need them.

### Debugging

You can debug apps running inside containers, see instructions for VS Code here: [https://code.visualstudio.com/docs/containers/debug-python](https://code.visualstudio.com/docs/containers/debug-python)

Related: "Remote" Machine: [https://code.visualstudio.com/docs/containers/choosing-dev-environment#_remote-machine](https://code.visualstudio.com/docs/containers/choosing-dev-environment#_remote-machine)
