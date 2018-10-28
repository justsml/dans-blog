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

## When to protect your tokens?

> For the purpose of this article we'll treat the following terms as related: _tokens_, _keys_, _credentials_, _secrets_. **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such.



It can seem difficult to determine if a particular token or key (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.) must be hidden and kept out of your code (usually accessed with `process.env.API_KEY`).

First let's cover some definitions, then it's important to identify your API _use case_.

* **Terms & primary divide:**
  * `Non-secret keys` describes keys which can be sent to the browser.
  * `Secret keys` MUST use a custom server (e.g. Node/Express/Heroku) in order to hide (proxy) requests to 3rd party API services.

<!-- Public keys DO NOT need to be kept secret. In fact services with -->

### `Non-secret keys`

**👍 Rule-of-thumb:** whenever a key must be sent to the browser in code or inline (e.g. via a `<script src="https://my-api/?apiKey=123-abc-456">` tag), **it's definitely `non-secret`**. Common examples include Google Maps & Geocoder (to convert addresses to map coordinates).

<br />


**_Use cases & features:_** `Non-secret`

- Analytics IDs
- Short-term access (user session IDs, JSON Web Tokens)
- Limiting API access by app/developer (for auth, geocoding, etc)
- Public part of public/private pair (RECAPTCHA, Stripe, Auth0)

#### ✅ Handling Non-secrets:

> **It's safe to hard-code non-secret (public) keys!**

**ProTip:** Make this easier to manage long term with a shared `config.js` for your app.


### `Secret keys`

**‼️⚠️️ Important:** `Secret` access keys/tokens **MUST** be hidden from Git _AND_ any browser code.

<br />

**👍 Rule-of-thumb:** servers which return `CORS errors` lack browser support. It strongly indicates you **MUST** proxy the service, treating it as though `secret`.

**👍 Rule-of-thumb:** costly services should (almost) always be proxied or hidden.

**👍 Rule-of-thumb:** if you do a write operation (file upload, insert db row), you could be dealing with `secret keys`.


<br />


**_Use cases & features:_** `Secret`

- Long-term authorization (credentials, access tokens, JSON Web Tokens)
- Short-term authorization (OAuth tokens, session store)
- Access paid/expensive services (for auth, geocoding, file storage, etc)
- Private part of public/private pair (RECAPTCHA, Stripe, Auth0)
- Data encryption & integrity checking

#### ✅ Handling Secrets Safely:

Complete the following steps to **eliminate secrets from your code:**

1. Replace hard-coded keys with environment variables. e.g. `process.env.API_SECRET`
1. Use a library like [`dotenv`](https://github.com/motdotla/dotenv#dotenv) along with a `.env` file. Add your previously hard-coded secrets to the `.env` file.
1. Add a `.env` line in your `.gitignore` file!

> **DON'T** create a `.env` file on deployed servers. Use your hosting services' (e.g. Heroku, Netlify, AWS EC2) provided env var management method: e.g. **dashboard or command line tool.**
