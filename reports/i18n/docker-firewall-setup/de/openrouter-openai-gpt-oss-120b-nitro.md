# Translation Candidate
- Slug: docker-firewall-setup
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.54
- Input tokens: 3963
- Output tokens: 875
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000312
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-firewall-setup --locale de
## Raw Output

````mdx
---
title: Docker‑Firewalleinrichten
subTitle: Firewall für Docker‑Host einrichten
draft: true
date: '2015-06-06'
modified: '2016-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - security
  - devops
cover: ../charles-deluvio-456501-unsplash.webp
cover_mobile: ../w300_charles-deluvio-456501-unsplash.webp
cover_icon: ../icon_charles-deluvio-456501-unsplash.webp
---
## Setup Docker Host's Firewall

1. Debian/Ubuntu Server wird vorausgesetzt  
1. Für den Einsatz auf einem Docker‑Host‑Server konzipiert  

### Install Requirements

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### Get your Internal & External IP Addresses

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses


# ODER das ip‑Tool verwenden, Beispiel:
ip addr
~~~

### Firewall (UFW) Einrichtung – Beispielbefehle

~~~sh
ufw logging on # on=low – medium könnte für die Fehlersuche besser sein
ufw logging medium
# Zuerst alles blockieren
ufw default deny incoming

# ERFORDERLICH: WÄHLEN SIE *EINE* DER FOLGENDEN DEFAULT OUTBOUND‑REGELN:
ufw default deny outgoing
ufw default allow outgoing

# Alle neuen SSH‑Verbindungen erlauben und protokollieren,
ufw allow log proto tcp from any to any port 22
## HTTP‑Verkehr erlauben (ohne explizites Logging)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Ausführlich: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Basis‑Rate‑Limit, reduziert SSH‑Brute‑Force‑Angriffe


# Setze deine externe IP
export EXTERNAL_IP=123.123.123.123
# Aktualisiere die Docker‑IP falls nötig
export DOCKER_IP=172.17.42.1
# Leite TCP‑Port 8080 zum Docker‑Container weiter
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Firewall aktivieren / starten

> Vorsicht: Nicht den SSH‑Port sperren (sshd verwendet standardmäßig 22)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------

### Testen Sie Ihre Firewall

> Wichtig: VERWENDEN SIE EINE REMOTE‑IP‑ADRESSE/LOCATION

```sh
# Abhängigkeit prüfen
apt-get update && apt-get install -y nmap

# Scan‑Ziel festlegen
export TARGET_HOST=123.123.123.123

# Beispiel‑Scan‑Befehle:
# Schnelle Prüfung offener Ports
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Gründlicher Scan
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Dienst‑Inspektion
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
```

> ERLEDIGT! Jetzt sollten Sie NUR die Ports sehen, die Sie konfiguriert haben!
````
