# Translation Candidate
- Slug: protect-your-tokens
- Locale: ru
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-10-27--protect-your-tokens/ru/index.mdx
- Validation: deferred
- Runtime seconds: 70.77
- Input tokens: 4653
- Output tokens: 16048
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.016746
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Защита токенов, ключей API и секретов'
subTitle: Публичный? Приватный? Ват?
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
## Когда стоит защищать свои токены?

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> Защита API-ключей и токенов имеет **критическое значение**!

Одна ошибка может привести к потере контроля над вашим сервером и попаданию данных к хакерам!

Определить, нужно ли скрывать конкретный токен, не должно быть так сложно — даже опираясь на официальную документацию!

Ситуация часто усугубляется терминологическим супом, с которым вы столкнётесь: _токены_, _ключи_, _учётные данные_, _секреты_, _приватные_ и _публичные_.

Давайте переосмыслим это через призму `secret` и `non-secret`.

* 🔒 [`Секретные ключи`](#-secret-keys) ДОЛЖНЫ оставаться скрытыми. Как правило, они НИКОГДА не должны покидать ваш приватный сервер (или сервис вроде Heroku, Netlify или Travis CI).
* 🌍 [`Несекретные ключи`](#-non-secret-keys) описывает строки, которые можно свободно распространять и включать в запросы браузера.

<br />

## 🔒 `Секретные ключи`

** ‼️ Важно:** `Секретные ключи` **ДОЛЖНЫ** игнорироваться Git _И_ отсутствовать в любом коде для браузера. [_Как использовать dotenv_](#-how-to-handle-secrets-safely)

<br />

_How do you know when you're dealing with a `Secret key`?_

<br />

**👍 Правило большого пальца:** серверы, возвращающие `CORS-ошибки`, не поддерживают работу из браузера. Это чётко указывает, что вам **НЕОБХОДИМО** проксировать этот сервис, обращаясь с ним как с `секретным`.

**👍 Правило большого пальца:** платные сервисы следует (почти) всегда проксировать или скрывать.

**👍 Правило большого пальца:** если выполняется операция записи (**загрузка файла, вставка строки в БД**), вы, скорее всего, имеете дело с `секретными ключами`.

<br />

**_Сценарии использования и особенности:_** `Секретные` ключи

- Долгосрочная авторизация (учётные данные, токены доступа, JSON Web Tokens)
- Краткосрочная авторизация (OAuth-токены, хранилища сессий)
- Доступ к платным/дорогостоящим сервисам (аутентификация, геокодирование, хранение файлов и т. д.)
- Приватная часть пары «публичный/приватный» ключ (reCAPTCHA, Stripe, Auth0)
- Учётные данные сервисов (Email/SMTP, LDAP/сервисы каталогов)
- Шифрование данных и проверка целостности

### Чек-лист: Безопасная работа с секретами

#### Краткий обзор

Выполните следующие шаги, чтобы **полностью исключить секреты из кода:**

- [ ] Замените жёстко заданные ключи на переменные окружения. Например: `process.env.API_SECRET`
- [ ] Используйте библиотеку вроде [`dotenv`](https://github.com/motdotla/dotenv#dotenv) в связке с файлом `.env`. Перенесите ранее захардкоженные секреты в этот `.env` файл.
- [ ] Добавьте правило `.env` в ваш `.gitignore`!

> **НЕ** создавайте файл `.env` на деплоящихся серверах. Используйте встроенные инструменты управления переменными окружения от вашего хостинг-провайдера (например, [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): **дашборд или командную строку.**

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Похожая статья: <a href="../securely-using-environment-variables-in-nodejs/">Безопасное использование dotenv в NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Несекретные` ключи

**👍 Правило большого пальца:** если ключ должен передаваться в браузер через код или инлайн-разметку (например, через тег `<script src="https://my-api/?apiKey=123-abc-456">`), **это точно `non-secret`**. Классический пример — Google Maps.

<br />

**_Сценарии использования и особенности:_** `Non-secret` ключи

- Краткосрочный доступ (идентификаторы пользовательских сессий, JSON Web Tokens)
- Ограничение доступа к API по приложению/разработчику (для аутентификации, геокодирования и т. д.)
- Публичная часть пары публичный/приватный (RECAPTCHA, Stripe, Auth0)
- Идентификаторы аналитики

#### ✅ Работа с несекретными ключами:

> **Несекретные (публичные) ключи можно безопасно зашивать в код!**

Для долгосрочного управления вынесите их в общий `config.js` вашего приложения.

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

**Примечание:** У переменных окружения есть и другие _сценарии использования_. То, что я не охватил: CI/CD/тестирование, флаги функций (feature flags) и конфигурация среды выполнения для специфичных окружений!
````
