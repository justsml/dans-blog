# Translation Candidate
- Slug: docker-firewall-setup
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.67
- Input tokens: 3975
- Output tokens: 1040
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.000342
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-firewall-setup --locale ru
## Raw Output

````mdx
---
title: Настройка брандмауэра Docker
subTitle: Настройка брандмауэра Docker‑хоста
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
## Настройка брандмауэра Docker‑хоста

1. Предполагается Debian/Ubuntu Server
1. Предназначено для работы на сервере Docker‑хоста

### Установка требований

~~~sh
# Ultimate Firewall Needed
apt-get update && apt-get install -y ufw nmap curl
~~~

### Получите свои внутренние и внешние IP‑адреса

~~~sh
# Get your IP Addresses, simple output:
hostname --all-ip-addresses
```

# ИЛИ используйте ip, пример:
ip addr
~~~

### Настройка брандмауэра (UFW) — пример команд

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

# Установите внешний IP
export EXTERNAL_IP=123.123.123.123
# При необходимости обновите IP Docker‑сети
export DOCKER_IP=172.17.42.1
# Перенаправьте TCP‑трафик 8080 к приложению в Docker
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Включить / Запустить брандмауэр

> Будьте осторожны, не заблокируйте свой SSH‑порт (по умолчанию sshd слушает 22)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------

### Протестировать брандмауэр

> Важно: ИСПОЛЬЗУЙТЕ УДАЛЁННЫЙ IP‑АДРЕС/ЛОКАЦИЮ

```sh
# Проверяем зависимости
apt-get update && apt-get install -y nmap

# Задаём цель сканирования
export TARGET_HOST=123.123.123.123

# Примеры команд сканирования:
# Быстрая проверка открытых портов
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Тщательный скан
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Инспекция сервисов
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
```

> Готово! Теперь вы должны видеть ТОЛЬКО те порты, которые настроили!
````
