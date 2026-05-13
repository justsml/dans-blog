# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/ru/index.mdx
- Validation: passed
- Runtime seconds: 28.52
- Input tokens: 9486
- Output tokens: 9642
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003073
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Безопасность Docker: Забытое руководство для разработчиков'
subTitle: 'Узнайте, как защитить сеть от угроз и опасных конф'
date: '2025-01-04'
modified: '2025-01-13'
tags:
  - local development
  - security
  - devops
  - best-practices
category: Security
cover_full_width: ../flame-whale-wide.webp
cover_mobile: ../flame-whale-head-square-200.webp
cover_icon: ../flame-whale-head-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
import {CodeTabs} from '../../../../../components/CodeTabs';

## В процессе разработки

**Содержание**

1. [⚠️ Локальные сети под угрозой](#-локальные-сети-под-угрозой)
2. [🛡️ Настройка брандмауэра](#-настройка-брандмауэра)
3. [🔐 Управление секретами для локальной разработки](#-управление-секретами-для-локальной-разработки)
4. [🕵️‍ Утечки учетных данных и боковые каналы атак](#-утечки-учетных-данных-и-боковые-каналы-атак)
5. [🔍 Мониторинг и Canary Tokens](#-мониторинг--canary-tokens)
6. [❌ Распространенные заблуждения](#-распространенные-заблуждения)

<p class="inset"></p>

## ⚠️ Локальные сети под угрозой

Давайте честно: мы все это делали. Вы подключались к случайному Wi-Fi в кофейне или позволяли кому-то использовать ваш домашний интернет без лишних раздумий. Даже доверяете своей умной холодильной установке, что она не скомпрометирует сеть. Реальность? Эти необдуманные решения могут подвергнуть вашу локальную среду разработки ненужным рискам. Атакующие не ограничиваются продуктивными системами — локальные окружения часто становятся более уязвимыми целями, предоставляя доступ к конфиденциальным проектам.

### Сценарии атак

1. **Перехват трафика:** Незашифрованный трафик легко перехватывается и читается.
2. **Не защищенные сервисы:** Локальные базы данных или API, доступные через `0.0.0.0`.
3. **Подмена сети:** Перенаправление трафика на устройство злоумышленника.

### Быстрые решения

- Используйте приватные сети Docker вместо брандмауэров для ограничения сетевого доступа.
- Избегайте публичного или общего Wi-Fi; предпочтительно использовать мобильный хот-спот.
- Мониторьте локальную сеть на наличие неизвестных устройств с помощью `arp-scan` и `nmap`.

## 🛡️ Настройка брандмауэра

### UFW с Docker (Ubuntu)

> ⚠️ **Предупреждение:** По умолчанию Docker на Ubuntu/Debian обходит правила UFW/iptables, что может подвергнуть вашу систему атакам.  
> Не имеет значения, привязываете ли вы порты к локальным IP-адресам (например, `-p 127.0.0.1:8080:80`).  

Это всегда меня удивляет! [Docker по умолчанию обходит правила UFW](https://github.com/moby/moby/issues/4737), позволяя контейнерам общаться с хостом и другими контейнерами без ограничений.  

### Рекомендации  

1. 🥇 **Используйте сети Docker** для изоляции и контроля, что может подключаться к каждому контейнеру или сети.  
2. 🥉 **Обновите iptables**, если вы вынуждены использовать сеть `host` или не можете применять пользовательские сети. Чтобы снизить риск, настройте iptables. Не для слабонервных, [посмотрите утилиту ниже.](#uf)

#### Изоляция сети Docker

```bash
# Создайте новую сеть Docker
docker network create my-network

# Запустите контейнер с новой сетью
docker run --network my-network my-container
```

#### Настройка UFW (для сетей host)

Существует множество плохих советов по исправлению этой проблемы. Настройте UFW для работы с Docker примерно так, как вы могли бы ожидать.

Я использовал `ufw-docker` для настройки самой себя в системе с хост-сетью, и он работает хорошо.

```bash title="install-ufw-docker.sh"
# Установите бинарный файл от имени root (требуются права суперпользователя)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Установите и измените файл `after.rules` в `ufw`
ufw-docker install

ufw-docker help
```

Эта команда выполняет следующие действия:

- Создаёт резервную копию файла `/etc/ufw/after.rules`.
- Добавляет правила, связанные с Docker, в конец файла для правильной интеграции с UFW.

**Источник:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Пример использования:**

```bash
# Разрешить контейнер Docker на порту 8080
ufw-docker allow <container_name> 8080/tcp

# Управлять правилами вместе с вашей конфигурацией UFW
ufw-docker status
```

**Примечание:** Большинство «решений» для конфликтов Docker-UFW включают ручные правила iptables, которые могут быть ошибочными и хрупкими при обновлениях.

### Брандмауэр macOS

1. Перейдите в **Системные настройки > Безопасность и конфиденциальность > Брандмауэр**.
2. Включите брандмауэр и нажмите «Параметры брандмауэра».
3. Заблокируйте все входящие соединения, кроме необходимых сервисов.

**Примечание:** Возможно, потребуется настроить параметры брандмауэра для разрешения определённых «умных» устройств, которые вы используете — например, Google Cast/AirPlay и другие сервисы.

### Команды для продвинутых пользователей (macOS и Linux)

#### macOS:

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # Заблокировать всё
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # Разрешить конкретное приложение
```

#### Linux (ufw):

```bash
ufw default deny incoming  # Заблокировать всё входящее
ufw allow ssh  # Разрешить SSH
# Разрешить 443 и 80 для веб-трафика
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Включить брандмауэр
```

**Профессиональный совет:** Используйте инструменты вроде [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) на macOS и [ufw](https://help.ubuntu.com/community/UFW) на Linux для более удобной настройки.

## 🔐 Управление секретами для локальной разработки

### Предварительная проверка заполнителей

<p>💡 Убедитесь, что секреты правильно настроены с реальными значениями перед запуском приложения.</p>

Если вы используете заполнители вроде `__WARNING_REPLACE_ME__` в своих секретах, это неплохо, может, кто-то заметит. На всякий случай вы также можете добавить небольшую проверку, чтобы обеспечить безопасность во время выполнения.

Вы не поверите, насколько легко полностью взломать (изменить и повторно подписать) JWT-токен, когда злоумышленники могут угадать секрет!

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Обнаружены небезопасные секреты:", missingSecrets);
    process.exit(1);
  }
};

validateSecrets();
```

```rust
// validate_secrets.rs
use std::env;

fn validate_secrets() {
    let unsafe_placeholder = "__WARNING_REPLACE_ME__";
    for (key, value) in env::vars() {
        if value.contains(unsafe_placeholder) {
            panic!("Небезопасный секрет в {}", key);
        }
    }
}

fn main() {
    validate_secrets();
}
```

```go
// validate_secrets.go
package main

import (
	"fmt"
	"os"
	"strings"
)

func validateSecrets() {
	placeholder := "__WARNING_REPLACE_ME__"
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 && strings.Contains(pair[1], placeholder) {
			panic(fmt.Sprintf("Небезопасный секрет в %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```

</CodeTabs>

### Генерация и хранение секретов

<p class="inset">Никогда не встраивайте секреты напрямую в код. Используйте переменные окружения и безопасные хранилища.</p>

Вместо `.env.example` используйте `.env.generate.sh`, чтобы упростить пользователям создание файла `.env` с безопасными "по умолчанию" значениями.

#### Пример `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Генерирует безопасный .env файл для локальной разработки

generate_secret() {
    local length=${1:-30}
    # добавить 4 байта для учёта заполнения
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Прервать выполнение, если .env файл уже существует
[ -f .env ] && { echo ".env файл уже существует!"; exit 1; }

cat <<EOL > .env
# Настройки базы данных и секреты
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Секреты сессий
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "Новый .env файл сгенерирован!"
```

{/*

```zig
// validate_secrets.zig
const std = @import("std");

pub fn main() void {
    var env = std.os.getenv_map();
    const placeholder = "__WARNING_REPLACE_ME__";

    for (env.items()) |entry| {
        if (std.mem.contains(u8, entry.value, placeholder)) {
            std.debug.panic("Unsafe secret in {}", .{entry.key});
        }
    }
}
``` */}

## 🕵️‍ Мониторинг и двойная проверка

### Примеры `nmap`

#### Тестирование внутри вашей сети

```bash

# Сканирует ваш localhost на наличие всех открытых портов
nmap -sT localhost

# Сканирует частный IP вашей машины на наличие сервисов
nmap -sV 192.168.1.10

# Обнаруживает устройства в вашей сети
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

#### Тестирование вне вашей сети

Вы можете легко определить ваш текущий (общедоступный) IP с помощью сервисов вроде `ifconfig.me`: `curl https://ifconfig.me`.

Используйте внешнюю сеть или удаленный сервер для тестирования ваших общедоступных IP:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Измените target_host на ваш общий IP или имя хоста
# Проверьте хост с использованием продвинутых техник
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**Почему тестировать оба?**  
Тестирование изнутри выявляет внутреннюю экспозицию, а внешние тесты определяют сервисы, доступные атакующим.

## 🛡️ Распространенные заблуждения

1. **Мое локальное окружение не является целью.**  
   - Факт: Атакующие могут перейти с вашего компьютера на системы продакшена.  
2. **Мои фаерволы блокируют всё.**  
   - Факт: Они блокируют только то, что вы настроили.  
3. **Приватные IP-адреса безопасны.**  
   - Факт: Эксплойты, такие как обход NAT, могут повлиять на вашу сеть.
````
