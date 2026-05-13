# Translation Candidate
- Slug: protect-your-tokens
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/ru/index.mdx
- Validation: passed
- Runtime seconds: 4.73
- Input tokens: 6973
- Output tokens: 1723
- Thinking tokens: unknown
- Cached input tokens: 3712
- Cache write tokens: 0
- Estimated cost: $0.000582
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Защита токенов, API‑ключей и секретов'
subTitle: Публичный? Приватный? Что?
date: '2018-10-27'
modified: '2024-07-30'
tags:
  - tokens
  - api-keys
  - secrets
  - security
  - nodejs
  - json-web-tokens
category: Guides
subCategory: security
cover: ../dayne-topkin-78982-unsplash.webp
cover_mobile: ../w300_dayne-topkin-78982-unsplash.webp
cover_icon: ../icon_dayne-topkin-78982-unsplash.webp
---
##When to protect your tokens?

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> Securing API keys & tokens is **critically important**!

One mistake can lead to lost control of your server and data to hackers!

It shouldn't be so difficult determining if any particular token must be hidden - even based on official documentation!

It часто усложняется «супом» связанных терминов, с которыми вы столкнётесь: _tokens_, _keys_, _credentials_, _secrets_, _private_ и _public_.

Переформулируем это как различие между `secret` и `non-secret`.

* 🔒 [`Secret keys`](#-secret-keys) ДОЛЖНЫ оставаться скрытыми. Как правило, их НИКОГДА не следует выводить за пределы вашего приватного сервера (или сервиса — например, heroku, netlify или travis-ci).
* 🌍 [`Non-secret keys`](#-non-secret-keys) описывает строки, которые можно свободно делиться и включать в запросы браузера.

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ Важно:** `Secret keys` **ДОЛЖНЫ** игнорироваться Git‑ом _И_ исключаться из любого кода, исполняемого в браузере. [_Как использовать dotenv_](#-how-to-handle-secrets-safely)

<br />

_Как понять, что вы имеете дело с `Secret key`?_

<br />

**👍 Ориентир:** серверы, которые возвращают `CORS errors`, не поддерживают работу в браузере. Это сильный сигнал, что их **НАДО** проксировать, рассматривая их как `secret`.

**👍 Ориентир:** дорогостоящие сервисы почти всегда следует проксировать или скрывать.

**👍 Ориентир:** если вы выполняете операцию записи (**загрузка файла, вставка строки в БД**), вероятно, имеете дело с `secret keys`.

<br />

**_Сценарии использования и возможности:_** `Secret` keys

- Долгосрочная авторизация (учётные данные, токены доступа, JSON Web Tokens)
- Краткосрочная авторизация (OAuth‑токены, хранилище сессий)
- Доступ к платным/дорогим сервисам (для аутентификации, геокодинга, хранения файлов и т.п.)
- Приватная часть публично‑приватной пары (RECAPTCHA, Stripe, Auth0)
- Учётные данные сервиса (Email/SMTP, LDAP/Directory Services)
- Шифрование данных и проверка целостности

### Список проверок: безопасное обращение с секретами

#### Краткий обзор

Выполните следующие шаги, чтобы **удалить секреты из вашего кода**:

- [ ] Замените жёстко прописанные ключи переменными окружения, например `process.env.API_SECRET`.
- [ ] Используйте библиотеку вроде [`dotenv`](https://github.com/motdotla/dotenv#dotenv) совместно с файлом `.env`. Перенесите ранее жёстко прописанные секреты в `.env`.
- [ ] Добавьте строку `.env` в ваш файл `.gitignore`!

> **НЕ** создавайте файл `.env` на развернутых серверах. Пользуйтесь инструментом управления переменными окружения, предоставляемым вашим хостингом (например, [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): через **панель управления или командную строку**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Связанная статья: <a href="../securely-using-environment-variables-in-nodejs/">Безопасное использование переменных окружения в NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 Правило‑практика:** если ключ необходимо передать браузеру в коде или инлайн (например, через тег `<script src="https://my-api/?apiKey=123-abc-456">`), **это однозначно `non-secret`**. Типичный пример — Google Maps.

<br />

**_Сценарии использования и особенности:_** `Non-secret`‑ключи

- Краткосрочный доступ (идентификаторы пользовательских сессий, JSON Web Token)
- Ограничение доступа к API по приложению/разработчику (для аутентификации, геокодинга и т.п.)
- Публичная часть публично‑приватной пары (RECAPTCHA, Stripe, Auth0)
- Идентификаторы аналитики

#### ✅ Обработка Non‑secrets:

> **Можно безопасно хард‑кодировать non‑secret (публичные) ключи!**

Упростите долгосрочное управление, вынеся общие параметры в `config.js` вашего приложения.

**Пример:**

```js
// config.js
module.exports = {
  googleMapsKey: '123-abc'
};
```

```js
// load-map.js
const config = require('./config.js');
const key = config.googleMapsKey;
const src = `//maps.googleapis.com/maps/api/js?key=${key}`;
// ...
```

-----------------------------------

**Примечание:** Существует и другие варианты — использование переменных окружения. Некоторые из них я не рассмотрел: CI/CD/тестирование, флаги функций и конфигурация времени выполнения для специальных окружений.
````
