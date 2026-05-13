# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.64
- Input tokens: 4751
- Output tokens: 4528
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001467
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ru/index.mdx reports/i18n/securely-using-environment-variables-in-nodejs/ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Работа с переменными окружения в Node.js
subTitle: Использование dotenv
date: '2018-11-13'
modified: '2020-07-30'
tags:
  - dotenv
  - api-keys
  - secrets
  - tokens
  - security
  - nodejs
category: Code
subCategory: howto
cover: ../john-salvino-417565-unsplash.webp
cover_mobile: ../w300_john-salvino-417565-unsplash.webp
cover_icon: ../icon_john-salvino-417565-unsplash.webp
---
## Безопасное управление секретами и токенами API

### Связанная статья: [Защитите свои токены](../protect-your-tokens/)

Быстро вспомним разницу между `secret` и `non-secret`.

* 🔒 `Секретные ключи` **обязательно** должны использоваться с пользовательским сервером (например, Node/Express/Heroku), чтобы скрыть (проксировать) запросы к сторонним API-сервисам.
* 🌍 `Несекретные ключи` описывают ключи, которые можно отправлять в браузер.

<br />

---------------------------------------------

> Мы сосредоточимся на работе с 🔒 `Секретными ключами` с использованием **Переменных окружения** в этой статье.  

[Примеры кода приведены ниже.](#️-code-example)  

#### Обзор  

Чтобы **безопасно использовать секреты в вашем NodeJS-коде:**  

1. Замените жестко заданные ключи переменными окружения. Например, `process.env.API_SECRET`  
1. Используйте библиотеку вроде [`dotenv`](https://github.com/motdotla/dotenv) вместе с файлом `.env`. Добавьте туда секреты, которые ранее были жестко заданы.  
1. Убедитесь, что строка `.env` присутствует в вашем файле `.gitignore`!  

> **НЕ** создавайте файл `.env` на серверах, на которых развертываете приложение. Используйте инструменты управления переменными окружения, предоставляемые вашими сервисами хостинга (например, [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): например, **дэшборд или командную строку**.

### Пример кода

Мы определим несколько файлов.

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- Пример конфигурационного объекта, использующего `process.env.PG*`

```js
// ./db/config.js
module.exports = {
  postgres: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5234,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'postgres',
  }
};
```

Файл `db/config.js` — это просто пример того, как должны храниться ваши секреты для повторного использования в коде.
-->

Сначала установите пакет [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

Далее создайте файл `.env` в корне вашего проекта.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **НИКОГДА** не коммитьте файл `.env`.

❌ Избегайте создания `.env` на серверах.

Проверьте документацию вашего хостинг-провайдера, чтобы настроить _переменные окружения_.

Чтобы убедиться, что ваш `.gitignore` содержит строку `.env`:

```bash
# Автоматически обновить .gitignore
# Запустите в терминале:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# Примечание: никакой вывод не будет напечатан
```

Файл `./db/connection.js` предоставляет общий экземпляр `pg.Pool`. Он будет использоваться для выполнения запросов к базе данных.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Загрузить файл .env
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Подключение к ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ только для отображения переменных подключения в отладке

// pg автоматически использует переменные окружения PG*
module.exports = new pg.Pool();
```

Папка `./api` содержит интерфейсы для ваших таблиц/представлений.

Вот пример `./api/users.js` для таблицы `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- Никогда не коммитьте секреты из `.env` в git!
- Не делитесь файлами `.env` в команде. *

* Каждый новый ноутбук или настольный ПК должен **создавать новые ключи доступа и токены.**
Если это невозможно, будьте осторожны при делении `.env` (в случаях, когда сервис может аннулировать все старые ключи, или вы используете платные API с ограниченным токеном доступа.)

#### ⚠️ Важно: если необходимо, всегда используйте безопасный мессенджер (желательно с поддержкой исчезающих сообщений.)

Удачи, и пишите, если у вас возникнут вопросы! 🎉
````
