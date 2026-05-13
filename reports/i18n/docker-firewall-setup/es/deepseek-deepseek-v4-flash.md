# Translation Candidate
- Slug: docker-firewall-setup
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-06--docker-firewall-setup/es/index.mdx
- Validation: deferred
- Runtime seconds: 59.02
- Input tokens: 3683
- Output tokens: 3134
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001393
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Configuración del firewall de Docker
subTitle: Configurar el firewall de un host Docker
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
## Configurar el Firewall del Host Docker

1. Se asume un servidor Debian/Ubuntu
1. Diseñado para ejecutarse en el servidor host Docker

### Instalar requisitos

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### Obtener tus direcciones IP internas y externas

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses

# O usa la herramienta ip, ejemplo:
ip addr
~~~

### Configuración del Firewall (UFW) - Comandos de Ejemplo

~~~sh
ufw logging on # on=low - medium podría ser mejor para diagnósticos
ufw logging medium
# Primero, bloquear todo
ufw default deny incoming

# REQUERIDO: ELIGE *UNA* DE LAS SIGUIENTES REGLAS DE SALIDA POR DEFECTO:
ufw default deny outgoing
ufw default allow outgoing

# Permitir y registrar todas las nuevas conexiones ssh,
ufw allow log proto tcp from any to any port 22
## Permitir tráfico http (sin registro explícito)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Verboso: ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Límite de tasa básico para mitigar fuerza bruta SSH
--- CHUNK END ---

# Establece tu IP externa
export EXTERNAL_IP=123.123.123.123
# Actualiza la IP de Docker si es necesario
export DOCKER_IP=172.17.42.1
# Reenvía tráfico tcp del puerto 8080 a la app dockerizada
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Habilitar / Iniciar Firewall

> Ten cuidado, no bloquees tu puerto SSH (sshd por defecto usa el 22)

~~~sh
ufw --force enable

ufw reset
~~~

### Prueba tu Firewall

> Importante: USA UNA DIRECCIÓN IP/UBICACIÓN REMOTA

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

> ¡HECHO! ¡Ahora deberías ver SOLO los puertos que configuraste!
````
