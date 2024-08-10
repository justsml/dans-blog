---
title: "Docker Firewall Setup"
date: 2015-06-06
modified: 2016-07-30
category: DevOps
subCategory: docker
tags: [docker, security, devops]
cover: charles-deluvio-456501-unsplash.jpg
cover_mobile: w300_charles-deluvio-456501-unsplash.jpg
cover_tablet: w600_charles-deluvio-456501-unsplash.jpg
cover_desktop: w900_charles-deluvio-456501-unsplash.jpg
cover_icon: icon_charles-deluvio-456501-unsplash.jpg
---

## Setup Docker Host's Firewall

1. Debian/Ubuntu Server is assumed
1. Designed to run on Docker Host Server


### Install Requirements

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~


### Get your Internal & External IP Addresses

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses

# OR use ip tool, example:
ip addr
~~~


### Firtewall (UFW) Setup - Example Cmds

~~~sh
ufw logging on # on=low - medium might be better for diagnostics
ufw logging medium
# First, block all the things
ufw default deny incoming

# REQUIRED: CHOOSE *ONE* OF THE FOLLOWING DEFAULT OUTBOUND RULES:
ufw default deny outgoing
ufw default allow outgoing


# Allow and log all new ssh connections,
ufw allow log proto tcp from any to any port 22
## Allow http traffic (w/o explicit logging)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Verbose: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Basic Rate limit 4 SSH brute force mitigation

# Set your ext IP
export EXTERNAL_IP=123.123.123.123
# Update docker IP if needed
export DOCKER_IP=172.17.42.1
# Forward tcp 8080 traffic to  Dockerized App
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~


## Enable / Start Firewall

> Be Careful, Don't Lock out your SSH port (sshd defaults to 22)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------


### Test Your Firewall

> Important: USE A REMOTE IP ADDR/LOCATION

~~~sh
# Verify dependency
apt-get update && apt-get install -y nmap

# Set scan target
export TARGET_HOST=123.123.123.123

# Example Scan Commands:
# Fast open port check
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Thorough scan
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Svc Inspection
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> DONE! Now you should see ONLY the ports you configured!



