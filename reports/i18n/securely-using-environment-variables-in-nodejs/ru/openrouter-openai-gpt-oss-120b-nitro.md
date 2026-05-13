# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.14
- Input tokens: 5229
- Output tokens: 1429
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000461
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ru/index.mdx reports/i18n/securely-using-environment-variables-in-nodejs/ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Использование переменных окружения в NodeJS
subTitle: Использование `dotenv`
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
## Обработка секретов и токенов безопасно

### Связанная статья: [Защитите свои токены](../protect-your-tokens/)

Кратко повторим различие между `секретным` и `несекретным`.

* 🔒 `Секретные ключи` ДОЛЖНЫ использовать кастомный сервер (например Node/Express/Heroku), чтобы скрывать (прокси‑ировать) запросы к сторонним API‑сервисам.
* 🌍 `Несекретные ключи` — это ключи, которые можно отправлять в браузер.

> Мы сосредоточимся на работе с 🔒 `секретными ключами`, используя **переменные окружения** в этой статье.

[Примеры кода приведены ниже.](#️-code-example)

#### Обзор

Чтобы **безопасно получать секреты в вашем NodeJS‑коде**:

1. Замените жёстко прописанные ключи переменными окружения, например `process.env.API_SECRET`.
2. Используйте библиотеку вроде [`dotenv`](https://github.com/motdotla/dotenv) совместно с файлом `.env`. Перенесите ранее жёстко прописанные секреты в файл `.env`.
3. Убедитесь, что строка `.env` присутствует в вашем файле `.gitignore`!

> **НЕ** создавайте файл `.env` на продакшн‑серверах. Пользуйтесь средствами управления переменными окружения, предоставляемыми вашими хостинг‑провайдерами (например, [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): через **панель управления или командную строку**.

### Пример кода

Мы определим несколько файлов.

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- Example config object which uses `process.env.PG*`

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

The `db/config.js` file is just an example of how your secrets should be stored for re-use in your code.
-->

Сначала установите пакет [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

Далее создайте файл `.env` в корне проекта.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **НИКОГДА** не коммитьте файл `.env`.

❌ Не размещайте `.env` на серверах.

Изучите документацию вашего хостинг‑провайдера, чтобы настроить _переменные окружения_.

Чтобы быстро убедиться, что в `.gitignore` есть строка `.env`.

```bash
# Автоматически обновить .gitignore
# Запустить в терминале:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# примечание: вывод будет пустым
```

Файл `./db/connection.js` предоставляет общий экземпляр `pg.Pool`. Он будет использоваться для запросов к базе данных.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Load .env file
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ only for showing debug connection vars

// pg automatically uses PG* env variables
module.exports = new pg.Pool();
```

Папка `./api` содержит интерфейсы к вашим таблицам/представлениям.

Ниже пример `./api/users.js` для таблицы `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- Никогда не коммитьте ваши секреты из `.env` в git!
- Не распространяйте файлы `.env` внутри команды. *

\* Каждый новый ноутбук или настольный компьютер разработчика должен **генерировать новые ключи доступа и токены**.  
Если это невозможно, будьте предельно осторожны при обмене `.env` (например, когда сервис может аннулировать все старые ключи или у вас ограниченный токен платного API).

#### ⚠️ Важно: при необходимости всегда используйте защищённый мессенджер (желательно с поддержкой самоуничтожающихся сообщений).

Удачи, и дайте знать, если возникнут вопросы! 🎉
````
