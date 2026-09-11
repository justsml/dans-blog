# Translation Candidate
- Slug: protect-your-tokens
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/ru/index.mdx
- Validation: deferred
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
title: 'Защита ваших токенов, ключей API и секретов'
subTitle: Публичный? Приватный? Что?
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
## Когда следует защищать ваши токены?

<!--  Для целей этой статьи будем рассматривать следующие термины как связанные: . **Они не взаимозаменяемы** несмотря на то, что большинство документации и ответы на [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) используют их как синонимы. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service и т.д.)  -->

> Защита API‑ключей и токенов **критически важна**!

Одна ошибка может привести к потере контроля над сервером и данными в руках хакеров!

Определить, должен ли конкретный токен быть скрыт, не должно быть сложным — даже опираясь на официальную документацию!

Часто всё усложняется «супом» связанных терминов, с которыми вы столкнётесь: _токены_, _ключи_, _учётные данные_, _секреты_, _приватные_ и _публичные_.

Переформулируем это как различие между `secret` и `non-secret`.

* 🔒 [`Secret keys`](#-secret-keys) ДОЛЖНЫ оставаться скрытыми. Как правило, они НИКОГДА не должны покидать ваш приватный сервер (или сервис — вроде Heroku, Netlify или Travis‑CI).
* 🌍 [`Non-secret keys`](#-non-secret-keys) описывают строки, которые можно свободно распространять и включать в запросы браузера.

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ Важно:** `Secret keys` **ДОЛЖНЫ** игнорироваться Git‑ом _И_ исключаться из любого кода, исполняемого в браузере. [_How to use dotenv_](#-how-to-handle-secrets-safely)

<br />

_Как понять, что вы имеете дело с `Secret key`?_

<br />

**👍 Правило большого пальца:** серверы, которые возвращают `CORS errors`, не поддерживают работу в браузере. Это сильный индикатор того, что вы **ДОЛЖНЫ** проксировать сервис, рассматривая его как `secret`.

**👍 Правило большого пальца:** дорогостоящие сервисы почти всегда следует проксировать или скрывать.

**👍 Правило большого пальца:** если вы выполняете операцию записи (**загрузка файла, вставка строки в БД**), вы, вероятно, имеете дело с `secret keys`.

<br />

**_Сценарии использования и возможности:_** `Secret`‑ключи

- Долгосрочная авторизация (учётные данные, токены доступа, JSON Web Tokens)
- Краткосрочная авторизация (OAuth‑токены, хранилище сессий)
- Доступ к платным/дорогим сервисам (для аутентификации, геокодинга, файлового хранилища и т.д.)
- Приватная часть пары публичный/приватный (RECAPTCHA, Stripe, Auth0)
- Учётные данные сервиса (Email/SMTP, LDAP/Directory Services)
- Шифрование данных и проверка целостности

### Checklist: Обращение с секретами безопасно

#### Краткий обзор

Выполните следующие шаги, чтобы **исключить секреты из кода**:

- [ ] Замените жёстко прописанные ключи переменными окружения, например `process.env.API_SECRET`
- [ ] Используйте библиотеку вроде [`dotenv`](https://github.com/motdotla/dotenv#dotenv) вместе с файлом `.env`. Перенесите ранее жёстко прописанные секреты в файл `.env`.
- [ ] Добавьте строку `.env` в ваш файл `.gitignore`!

> **НЕ** создавайте файл `.env` на развернутых серверах. Пользуйтесь инструментом управления переменными окружения, предоставляемым вашим хостингом (например, [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): через **панель управления или командную строку**.

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Связанная статья: <a href="/securely-using-environment-variables-in-nodejs/">Using dotenv securely in NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 Правило большого пальца:** когда ключ необходимо отправлять в браузер в коде или инлайн (например, через тег `<script src="https://my-api/?apiKey=123-abc-456">`), **это однозначно `non-secret`**. Типичный пример — Google Maps.

<br />

**_Сценарии использования и возможности:_** `Non-secret`‑ключи

- Краткосрочный доступ (идентификаторы пользовательских сессий, JSON Web Tokens)
- Ограничение доступа к API по приложению/разработчику (для аутентификации, геокодинга и т.п.)
- Публичная часть пары публичный/приватный (RECAPTCHA, Stripe, Auth0)
- Идентификаторы аналитики

#### ✅ Обращение с non‑secret ключами:

> **Можно безопасно жёстко прописывать non‑secret (публичные) ключи!**

Упростите долгосрочное управление, вынеся общие настройки в общий `config.js` для вашего приложения.

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

**Примечание:** Существует и другие _Use Cases_ для переменных окружения. Некоторые из них я не упомянул: CI/CD/тестирование, флаги функций и конфигурация выполнения для специальных окружений!
````
