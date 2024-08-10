---
title: "Using Environment Variables in NodeJS"
subTitle: Using `dotenv`
date: 2018-11-13
modified: 2020-07-30
tags: [dotenv, api-keys, secrets, tokens, security, nodejs]
category: Code
subCategory: howto
cover: john-salvino-417565-unsplash.jpg
cover_mobile: w300_john-salvino-417565-unsplash.jpg
cover_tablet: w600_john-salvino-417565-unsplash.jpg
cover_desktop: w900_john-salvino-417565-unsplash.jpg
cover_icon: icon_john-salvino-417565-unsplash.jpg
---

## Handling Secrets & API Tokens Safely

### Related Article: [Protect Your Tokens](/protect-your-tokens/)

Let's quickly recap the difference between `secret` and `non-secret`.

* 🔒 `Secret keys` MUST use a custom server (e.g. Node/Express/Heroku) in order to hide (proxy) requests to 3rd party API services.
* 🌍 `Non-secret keys` describes keys which can be sent to the browser.

<br />

---------------------------------------------

> We'll focus on dealing with 🔒 `Secret keys` using **Environment Variables** in this article.

[Code examples are included below.](#️-code-example)

#### Overview

To **safely access secrets in your NodeJS code:**

1. Replace hard-coded keys with environment variables. e.g. `process.env.API_SECRET`
1. Use a library like [`dotenv`](https://github.com/motdotla/dotenv) along with a `.env` file. Add your previously hard-coded secrets to the `.env` file.
1. Verify `.env` line in your `.gitignore` file!

> **DON'T** create a `.env` file on deployed servers. Use your hosting services' (e.g. [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2) provided environment variable management tool: e.g. **dashboard or command line.**

##️ Code Example:

We're going to define a few files.

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

First, install the [`dotenv`](https://www.npmjs.com/package/dotenv) package.

```bash
npm install dotenv
```

Next, create a `.env` in the root of your project.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```


❌ **NEVER** commit `.env` file.

❌ Avoid creating `.env` on servers.

Check your Hosting Provider docs to set up _environment variables_.

To easily make sure your `.gitignore` has a `.env` line in it.

```bash
# Automatically update .gitignore
# Run in terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# note: no output will print
```

The `./db/connection.js` provides a shared `pg.Pool` instance. It'll be used to query the database.

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

The `./api` folder contains interfaces to your tables/views.

Here's an example `./api/users.js` for the `users` table.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

-  Never commit your `.env` secrets to git!
-  Don't share `.env` files on a team. *

\* Every new development laptop or desktop should **generate new access keys & tokens.**
If it's not possible, use plenty of care sharing your `.env` (in cases where a service might invalidate all older keys, or you have a paid API's limited access token.)

#### ⚠️ Important: if necessary, always use a secure messaging service (preferably with expiring message support.)

Good luck and let me know if you have any questions! 🎉
