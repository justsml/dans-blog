# Translation Candidate
- Slug: docker-firewall-setup
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.32
- Input tokens: 3986
- Output tokens: 1068
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000348
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-06--docker-firewall-setup/es/index.mdx reports/i18n/docker-firewall-setup/es
## Raw Output

````mdx
---
title: Configuración del firewall de Docker
subTitle: Configura el firewall del host Docker
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
## Configurar el firewall del host Docker

1. Se asume un servidor Debian/Ubuntu
1. Diseñado para ejecutarse en un servidor host Docker

### Instalar los requisitos

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### Obtener sus direcciones IP internas y externas

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses


# O use la herramienta ip, ejemplo:
~~~
ip addr
~~~

### Configuración del firewall (UFW) - Comandos de ejemplo

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
~~~

# Establece tu IP externa
export EXTERNAL_IP=123.123.123.123
# Actualiza la IP de Docker si es necesario
export DOCKER_IP=172.17.42.1
# Redirige el tráfico TCP 8080 a la aplicación en Docker
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Habilitar / Iniciar el firewall

> Ten cuidado, no bloquees tu puerto SSH (sshd usa el 22 por defecto)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------

### Prueba tu firewall

> Importante: USA UNA DIRECCIÓN IP/UBICACIÓN REMOTA

~~~sh
# Verificar dependencia
apt-get update && apt-get install -y nmap

# Definir objetivo del escaneo
export TARGET_HOST=123.123.123.123

# Ejemplos de comandos de escaneo:
# Comprobación rápida de puertos abiertos
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Escaneo exhaustivo
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Inspección de servicios
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> ¡HECHO! Ahora deberías ver SÓLO los puertos que configuraste!
````
