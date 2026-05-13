# Translation Candidate
- Slug: docker-firewall-setup
- Locale: it
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2015-06-06--docker-firewall-setup/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-firewall-setup --locale it --model qwen/qwen3.6-plus --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
title: Configurazione del firewall Docker
subTitle: Configurare il firewall di un host Docker
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
## Configurare il firewall dell'host Docker

1. Si presuppone un server Debian/Ubuntu
1. Progettato per essere eseguito sul server host Docker

### Installare i requisiti

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### Ottenere gli indirizzi IP interni ed esterni

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses

# OPPURE usa lo strumento ip, esempio:
ip addr
~~~

### Firtewall (UFW) Setup - Comandi di esempio

~~~sh
ufw logging on # on=low - medium potrebbe essere meglio per la diagnostica
ufw logging medium
# Prima, blocca tutto
ufw default deny incoming

# RICHIESTO: SCEGLI *UNA* DELLE SEGUENTI REGOLE DI DEFAULT PER IL TRAFFICO IN USCITA:
ufw default deny outgoing
ufw default allow outgoing

# Permetti e registra tutte le nuove connessioni SSH,
ufw allow log proto tcp from any to any port 22
## Permetti traffico HTTP (senza logging esplicito)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Verbose: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Limitazione di base del rate per mitigare brute force SSH

# Imposta il tuo IP esterno
export EXTERNAL_IP=123.123.123.123
# Aggiorna l'IP di Docker se necessario
export DOCKER_IP=172.17.42.1
# Inoltra il traffico tcp sulla porta 8080 verso l'app containerizzata
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Abilita / Avvia il Firewall

> Attenzione: non bloccare la tua porta SSH (sshd di default è sulla 22)

~~~sh
ufw --force enable

ufw reset
~~~

### Test del tuo Firewall

> Importante: USA UN INDIRIZZO IP/LUOGO REMOTO

~~~sh
# Verifica dipendenza
apt-get update && apt-get install -y nmap

# Imposta target dello scan
export TARGET_HOST=123.123.123.123

# Comandi di esempio per lo scan:
# Controllo rapido porte aperte
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Scan approfondito
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Ispezione servizi
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> FATTO! Ora dovresti vedere SOLO le porte che hai configurato!
````
