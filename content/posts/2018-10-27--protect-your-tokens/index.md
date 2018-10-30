---
title: "Protecting Your Tokens, API Keys and Secrets"
subTitle: Public? Private? Wat?
date: 2018-10-27
modified: null
tags: [tokens, api keys, secrets, json web tokens]
category: security
cover: dayne-topkin-78982-unsplash.jpg
---

![credit: dayne-topkin-78982-unsplash.jpg](dayne-topkin-78982-unsplash.jpg)

# When to protect your tokens?

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->


<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->


> Securing API keys & tokens is **critically important**!

One mistake can lead to lost control of your server and data to hackers!

It shouldn't be so difficult determining if any particular token must be hidden - even based on official documentation!

It is often made worse with the soup of related terms you'll encounter: _tokens_, _keys_, _credentials_, _secrets_, _private_, and _public_.

Let's re-frame this as between `secret` and `non-secret`.

* `Secret keys` MUST use a custom server (e.g. Node/Express/Heroku) in order to hide (proxy) requests to 3rd party API services.
* `Non-secret keys` describes keys which can be sent to the browser.



<br />

---------------------------------------------


## `Secret keys`

**‼️ Important:** `Secret keys` **MUST** be ignored by Git _AND_ omitted by browser code.

<br />

_How do you know when you're dealing with a `Secret key`?_

<br />

**👍 Rule-of-thumb:** servers which return `CORS errors` lack browser support. It strongly indicates you **MUST** proxy the service, treating it as though `secret`.

**👍 Rule-of-thumb:** costly services should (almost) always be proxied or hidden.

**👍 Rule-of-thumb:** if you do a write operation (**file upload, insert db row**), you could be dealing with `secret keys`.


<br />


**_Use cases & features:_** `Secret` keys

- Long-term authorization (credentials, access tokens, JSON Web Tokens)
- Short-term authorization (OAuth tokens, session store)
- Access paid/expensive services (for auth, geocoding, file storage, etc)
- Private part of public/private pair (RECAPTCHA, Stripe, Auth0)
- Service credentials (Email/SMTP, LDAP/Directory Services)
- Data encryption & integrity checking

#### ✅ Handling Secrets Safely:

Complete the following steps to **eliminate secrets from your code:**

1. Replace hard-coded keys with environment variables. e.g. `process.env.API_SECRET`
1. Use a library like [`dotenv`](https://github.com/motdotla/dotenv#dotenv) along with a `.env` file. Add your previously hard-coded secrets to the `.env` file.
1. Add a `.env` line in your `.gitignore` file!

> **DON'T** create a `.env` file on deployed servers. Use your hosting services' (e.g. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) provided environment variable management tool: e.g. **dashboard or command line.**


---------------------------------------------


## `Non-secret keys`

**👍 Rule-of-thumb:** whenever a key must be sent to the browser in code or inline (e.g. via a `<script src="https://my-api/?apiKey=123-abc-456">` tag), **it's definitely a `non-secret`**. A common example is Google Maps.

<br />


**_Use cases & features:_** `Non-secret` keys

- Short-term access (user session IDs, JSON Web Tokens)
- Limiting API access by app/developer (for auth, geocoding, etc)
- Public part of public/private pair (RECAPTCHA, Stripe, Auth0)
- Analytics IDs

#### ✅ Handling Non-secrets:

> **It's safe to hard-code non-secret (public) keys!**

Make this easier to manage long term with a shared `config.js` for your app.

**Example:**

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


**Note:** There are other Use Cases for environment variables. One of the biggest I didn't cover is for runtime configuration/feature flags!
