# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 15.63
- Input tokens: 12329
- Output tokens: 3966
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.001195
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-01-26--securing-clawdbot-tailscale/ru/index.mdx reports/i18n/securing-clawdbot-tailscale/ru
## Raw Output

````mdx
---
title: Мой AI‑ассистент дал мне доступ к оболочке
subTitle: Как защитить локальную или VPS‑настройку OpenClaw/Moltbot
date: '2026-01-15'
modified: '2026-01-28'
tags:
  - security
  - moltbot
  - clawdbot
  - tailscale
  - ai
  - vpn
  - devops
  - ssh
category: Security
subCategory: AI Infrastructure
draft: false
cover_full_width: ../hero_wide.webp
cover_mobile: ../icon_square_200.webp
cover_icon: ../icon_square_200.webp
---
OpenClaw (ранее Clawdbot/Moltbot) предоставляет вам персонального AI‑ассистента, работающего в WhatsApp, Slack, Discord, iMessage и других каналах. Но если вы выставите его шлюз, управление узлами или SSH в публичный интернет без надёжной аутентификации, вы откроете незнакомцам путь к оболочке на вашей машине.

В этом руководстве показан самый безопасный вариант по умолчанию: держать шлюз OpenClaw только на loopback, открывать его лишь вашему tailnet через Tailscale Serve, жёстко ограничить SSH и проверять извне, что шлюз не доступен публично.

Быстрое распространение проекта выявило реальные проблемы безопасности: [сканирование Shodan обнаружило 2 847 открытых экземпляров](https://socradar.io/blog/clawdbot-is-it-safe/) за первые несколько недель, а [issue аудита безопасности на GitHub зафиксировал 512 находок](https://github.com/moltbot/moltbot/issues/1796) в кодовой базе. Часть из этого — автоматический вывод сканеров, часть изменилось после переименования в январе 2026 года в OpenClaw, поэтому воспринимайте цифры как предупредительный сигнал, а не точный текущий счётчик уязвимостей. Вам не нужен глубокий опыт в безопасности — достаточно не публиковать «операторские поверхности» до развертывания.

---

## Что именно вы раскрываете

В зависимости от способа установки и экспозиции, есть три поверхности, которые стоит проверить:

- **Порт 22**: SSH‑доступ к VPS  
- **Порт 18789**: UI управления шлюзом и WebSocket‑API  
- **Управление браузером/узлом**: удалённое выполнение кода и автоматизация браузера через модель сопряжения шлюза / узла  

Текущая [документация OpenClaw по удалённому доступу](https://docs.molt.bot/gateway/remote) указывает, что WebSocket шлюза привязывается к loopback по умолчанию и советует оставлять его только на loopback, если вы специально не выбираете LAN / tailnet / какое‑то пользовательское привязывание. Это правильно. Риск появляется, когда вы переопределяете это значение, публикуете порты Docker, добавляете обратный прокси, включаете Funnel или оставляете SSH открытым для всего мира.  

Шлюз — главный вектор. Это «операторская поверхность» вашего помощника, включая пути вызова инструментов. Если он доступен из интернета и аутентификация отсутствует, слабая, обойдена или утекла, злоумышленник может управлять агентом или вызывать инструменты с правами вашего пользователя.  

Управление браузером почти столь же чувствительно. Текущие документы OpenClaw советуют запускать управление браузером через сопряжённый узел‑хост на машине браузера и рассматривать сопряжение узлов как операторский доступ. Если шлюз может выполнить `system.run` на сопряжённом узле, это удалённое выполнение кода на этом узле, подчинённое политике узла шлюза и собственным одобрениям выполнения узла.  

SSH — это SSH. Если у вас включена аутентификация по паролю, попытки перебора неизбежны на публичном VPS.

## Решение от Tailscale

Для OpenClaw Tailscale предоставляет удалённый доступ без публикации операторских сервисов:

1. Ваш экземпляр OpenClaw работает на VPS или локальной машине  
2. Шлюз остаётся привязанным к loopback и доступен через Tailscale Serve, либо привязывается напрямую к IP‑адресу tailnet с явной аутентификацией  
3. Вы устанавливаете Tailscale как на сервер, так и на свои личные устройства  
4. Доступ к OpenClaw осуществляется по его Tailscale IP или имени MagicDNS  
5. Все остальные в интернете ничего не видят, если вы специально не включите Funnel или иной публичный прокси  

### Стоит ли позволять OpenClaw управлять Tailscale?

OpenClaw имеет [встроенную интеграцию с Tailscale](https://docs.molt.bot/gateway/tailscale), способную настроить `tailscale serve` или `tailscale funnel` для шлюза.

**Режим Serve** оставляет всё внутри вашего tailnet. Шлюз остаётся привязанным к `127.0.0.1`, а Tailscale берёт на себя маршрутизацию и HTTPS. Когда включён `gateway.auth.allowTailscale`, OpenClaw может аутентифицировать трафик Control UI/WebSocket, используя заголовки идентификации Tailscale, и проверять источник через `tailscale whois`. Этот режим подходит для большинства личных развертываний.

**Режим Funnel** делает шлюз общедоступным через публичный эндпоинт Tailscale. В официальной документации Tailscale Funnel описывается как маршрутизация трафика из интернета к локальному сервису. OpenClaw отказывается запускать Funnel, если режим аутентификации шлюза не `password`, но вы всё равно выбираете публичное раскрытие операционной поверхности.

В [документации по безопасности OpenClaw](https://docs.molt.bot/gateway/security) чётко указано, что инъекции подсказок и доступ к инструментам являются основными рисками для персонального помощника. Не позволяйте агенту тихо делать себя публичным. Используйте Serve осознанно, избегайте Funnel, если только действительно не нужен публичный доступ, и требуйте подтверждения выполнения для любой команды `tailscale`.

---

## Безопасная настройка OpenClaw

### Шаг 1: Установить Tailscale

На вашем VPS или локальном сервере:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

На клиентском компьютере установите Tailscale со страницы официального скачивания и войдите в тот же tailnet.

Теперь обе машины находятся в одной приватной сети. Вы можете пинговать ваш VPS по его Tailscale‑IP, и трафик будет проходить через зашифрованный туннель.

### Шаг 2: Настроить OpenClaw для работы с Tailscale

Самый надёжный на данный момент подход: оставить шлюз привязанным к loopback и открыть его в вашем tailnet через Tailscale Serve.

В конфигурации OpenClaw:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Затем запустите шлюз с помощью Serve:

```bash
openclaw gateway --tailscale serve
```

Документация OpenClaw гласит, что при этом шлюз остаётся привязанным к `127.0.0.1`, а Tailscale обеспечивает HTTPS и маршрутизацию по tailnet. Доступ будет по адресу `https://<magicdns-name>/`, а не по публичному IP вашего VPS.

Если вместо Serve вам нужен прямой bind к tailnet, используйте явную аутентификацию шлюза:

```js
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "replace-with-a-long-random-token",
    },
  },
}
```

Затем подключитесь с другого устройства в tailnet:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Если вы запускаете OpenClaw в Docker или другом контейнерном окружении, будьте особенно внимательны к публикации портов. Команда `-p 18789:18789` обычно привязывает порт ко всем интерфейсам хоста. Предпочтительно оставлять привязку к loopback и использовать Tailscale Serve, либо явно привязывать сторону хоста к IP‑адресу Tailscale после проверки, что контейнер всё ещё получает трафик:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

После любого изменения в Docker проверьте доступность извне с помощью `nmap` и локально с помощью `ss`. Docker может обойти или изменить предположения о правилах брандмауэра хоста, если это не учтено.

### Шаг 3: Защита SSH

Даже при использовании Tailscale необходимо правильно защитить SSH:

```bash
# Оставьте текущий SSH‑сеанс открытым, пока вносите изменения.
# Сначала, с клиентской машины, убедитесь, что можете подключиться по SSH через Tailscale:
ssh your-user@SERVER_TAILSCALE_IP

# Поместите настройки ужесточения в drop‑in‑файл, а не переписывайте sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Проверьте конфигурацию перед перезапуском. Не пропускайте этот шаг.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

Это отключает вход по паролю и вход под root. Далее используем UFW, чтобы полностью блокировать публичный SSH, оставив доступ только через `tailscale0`.

### Шаг 4: Правила брандмауэра

Настройте брандмауэр как второй уровень защиты:

```bash
# Через UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

В официальном руководстве по ужесточению Ubuntu от Tailscale используется тот же шаблон: разрешить `tailscale0`, отклонить весь остальной входящий трафик, затем убедиться, что публичный SSH не отвечает, а подключение к адресу `100.x.y.z` работает. Если на том же VPS размещён публичный сайт, оставляйте только действительно необходимые публичные правила, например `80/tcp` и `443/tcp`.

## Проверка вашей экспозиции

### Проверка открытых портов из внешней сети

С машины, **не находящейся** в вашей сети Tailscale:

```bash
# Проверяем, не выставлены ли наружу типичные публичные порты
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Ожидаемый вывод для защищённого экземпляра:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

Если `22` или `18789` отображаются как `open` вместо `filtered` или `closed`, у вас проблема. Если `80` или `443` открыты, убедитесь, что это только ваш преднамеренно публичный веб‑сайт или конечная точка Tailscale Funnel, а не случайно открытый шлюз OpenClaw.

### Проверка локального прослушивания

На вашем сервере OpenClaw:

```bash
# Show all listening ports and what they're bound to
sudo ss -tulpn | grep LISTEN

# Look for lines like this (good for Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# Or this (acceptable for direct tailnet bind with auth):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NOT like this (bad):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

Если вы видите `0.0.0.0` или `:::` (эквивалент IPv6), значит сервис доступен из‑вне.

### Встроенный аудит безопасности

OpenClaw поставляется с [командой аудита безопасности](https://docs.molt.bot/gateway/security), которая проверяет конфигурацию на соответствие рекомендациям по защите:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

Аудит проверяет открытость шлюза, режим Tailscale, настройки аутентификации, доступ к каналам, политику инструментов, инвентарь плагинов и права доступа к файлам. Рассматривайте `--fix` как удобный помощник, а не замену тщательного изучения результатов.

---

## Что это не решает


Tailscale устраняет самую большую ошибку: публичное раскрытие операторов. Но он не решает всё:

**Хранение учётных данных**: OpenClaw сохраняет журналы сеансов, OAuth‑токены и API‑ключи на диске. Убедитесь, что у этих файлов правильные права доступа (`chmod 600` для файлов, `chmod 700` для закрытых конфигурационных каталогов) и они не находятся под контролем версий. Встроенный аудит проверяет это.

**Песочница плагинов**: Плагины работают с полными правами вашего пользователя. Устанавливайте плагины только из доверенных источников и проверяйте, какие возможности они запрашивают. Инструмент аудита перечисляет установленные плагины.

**Безопасность устройств**: Если кто‑то получит доступ к вашей учётной записи Tailscale или украдёт устройство в вашем tailnet, он сможет попасть в ваш экземпляр OpenClaw. Включите [авторизацию устройств Tailscale](https://tailscale.com/kb/1099/device-authorization/), чтобы требовать одобрения новых устройств.

---

## Список проверок перед развертыванием

Перед тем как считать ваш экземпляр OpenClaw/Moltbot готовым к продакшену:

- [ ] Tailscale установлен и аутентифицирован как на сервере, так и на клиенте
- [ ] Шлюз оставлен привязанным к loopback через Tailscale Serve, либо привязан к `tailnet` с явной авторизацией
- [ ] SSH настроен на отключение аутентификации по паролю и входа под root
- [ ] Брандмауэр (UFW или iptables/nftables) сконфигурирован для разрешения трафика только через `tailscale0` и блокировки ненужного публичного входящего трафика
- [ ] Внешнее сканирование nmap показывает все порты `filtered` или `closed`
- [ ] Внутренний вывод `ss -tulpn` показывает, что шлюз привязан к `127.0.0.1`, `::1` или только к IP‑адресу Tailscale
- [ ] Файлы учётных данных имеют права 600, а каталоги с приватными конфигурациями — 700
- [ ] Выполнить `openclaw security audit --deep` и устранить все найденные проблемы
- [ ] При использовании управления Tailscale в OpenClaw включены подтверждения выполнения
- [ ] Настроены регулярные резервные копии (данные OpenClaw + конфиги)

---

## Ресурсы

- [OpenClaw Security Guide](https://docs.molt.bot/gateway/security)
- [OpenClaw Tailscale Integration](https://docs.molt.bot/gateway/tailscale)
- [Tailscale Serve CLI Reference](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [Use UFW to Lock Down an Ubuntu Server](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [Security Audit: 512 Findings (GitHub Issue)](https://github.com/moltbot/moltbot/issues/1796)
- [Nmap Network Scanning Guide](https://nmap.org/book/man.html)
````
