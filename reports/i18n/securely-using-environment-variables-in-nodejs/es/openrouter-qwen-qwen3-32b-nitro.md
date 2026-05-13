# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/es/index.mdx
- Validation: passed
- Runtime seconds: 10.65
- Input tokens: 4660
- Output tokens: 4305
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001406
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Usando variables de entorno en NodeJS
subTitle: Usando `dotenv`
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
## Manejo seguro de claves secretas y tokens de API

### Artículo relacionado: [Protege tus tokens](/protect-your-tokens/)

Repasemos rápidamente la diferencia entre `clave secreta` y `clave no secreta`.

* 🔒 Las `claves secretas` DEBEN usarse en un servidor personalizado (p. ej., Node/Express/Heroku) para ocultar (proxiar) las solicitudes a servicios de API de terceros.
* 🌍 Las `claves no secretas` describen claves que pueden enviarse al navegador.

<br />

---------------------------------------------

> Nos centraremos en manejar 🔒 `claves secretas` usando **variables de entorno** en este artículo.  

[Se incluyen ejemplos de código a continuación.](#️-code-example)  

#### Visión general  

Para **acceder de forma segura a secretos en tu código NodeJS:**  

1. Reemplaza las claves codificadas de forma rígida con variables de entorno. Por ejemplo, `process.env.API_SECRET`  
1. Usa una biblioteca como [`dotenv`](https://github.com/motdotla/dotenv) junto con un archivo `.env`. Añade tus secretos previamente codificados de forma rígida al archivo `.env`.  
1. ¡Verifica la línea `.env` en tu archivo `.gitignore`!  

> **¡NO** crees un archivo `.env` en servidores implementados. Usa las herramientas de gestión de variables de entorno proporcionadas por tus servicios de alojamiento (p. ej., [Heroku](https://devcenter.heroku.com/articles/config-vars), Netlify, AWS EC2): por ejemplo, **panel de control o línea de comandos.**

### Ejemplo de código

Vamos a definir unos pocos archivos.  

1. `.env`  
1. `./db/connection.js`  
1. `./api/users.js`  

<!-- Ejemplo de objeto de configuración que utiliza `process.env.PG*`  

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

El archivo `db/config.js` es solo un ejemplo de cómo deberías almacenar tus secretos para su reutilización en tu código. -->  

Primero, instala el paquete [`dotenv`](https://www.npmjs.com/package/dotenv).

```bash
npm install dotenv
```

Luego, crea un archivo `.env` en la raíz de tu proyecto.

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **NUNCA** comprometas el archivo `.env`.

❌ Evita crear `.env` en los servidores.

Revisa la documentación de tu proveedor de alojamiento para configurar _variables de entorno_.

Para asegurarte fácilmente de que tu `.gitignore` tiene una línea con `.env`:

```bash
# Actualiza automáticamente .gitignore
# Ejecuta en terminal:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# nota: no se imprimirá ninguna salida
```

El archivo `./db/connection.js` proporciona una instancia compartida de `pg.Pool`. Se usará para consultar la base de datos.

```js
// ./db/connection.js
require('dotenv').config(); // ✅ Cargar archivo .env
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Conectando a ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ solo para mostrar variables de conexión de depuración

// pg usa automáticamente las variables de entorno PG*
module.exports = new pg.Pool();
```

La carpeta `./api` contiene interfaces a tus tablas/vistas.

Aquí hay un ejemplo de `./api/users.js` para la tabla `users`.

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- ¡Nunca comites tus claves secretas `.env` a git!
- No compartas archivos `.env` con el equipo. *

* Cada nueva computadora o escritorio de desarrollo debe **generar nuevas claves y tokens de acceso**.
Si no es posible, ten mucho cuidado al compartir tu `.env` (en casos donde un servicio pueda invalidar todas las claves antiguas, o tengas tokens de acceso limitados para APIs pagas).

#### ⚠️ Importante: si es necesario, siempre usa un servicio de mensajería segura (preferiblemente con soporte para mensajes que expiran).

¡Buena suerte y avísame si tienes alguna pregunta! 🎉
````
