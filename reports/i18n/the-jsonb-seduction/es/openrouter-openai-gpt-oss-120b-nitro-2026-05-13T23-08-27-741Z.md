# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/es/index.mdx
- Validation: deferred
- Runtime seconds: 5.24
- Input tokens: 10613
- Output tokens: 2811
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.000920
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'JSONB: La mejor manera de arruinar tu base de datos'
subTitle: >-
  JSONB es potente, útil ymuy fácil de usar incorrectamente cuando conviertes un
  blob en tu esquema real.
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQL añadió JSONB para que puedas almacenar datos semiestructurados sin definir esquemas rígidos de antemano. La idea era sólida: a veces realmente no sabes cómo será la forma de los datos, o cambian con tanta frecuencia que las columnas tradicionales pierden sentido.

Eso importa porque JSONB no es un error. En muchos sistemas es la representación más limpia del espacio del problema. Si estás almacenando cargas útiles de webhooks de terceros, cuerpos de eventos versionados, banderas de funciones o objetos de configuración de LLM donde cada proveedor y modelo expone un conjunto de opciones ligeramente diferente y en constante cambio, forzar todo a columnas de primera clase puede ser más incómodo que útil.

El problema es que JSONB también es la forma más fácil de posponer decisiones de esquema sin admitir que las estás posponiendo. En algún punto entre la intención y la implementación, se convirtió en el equivalente en la base de datos de “limpiaré mi habitación después”. Esa solución temporal a la que recurrieron hace seis meses? Sigue ahí, y ahora la producción depende de ella.

Sigo viendo el mismo patrón. Un equipo agrega una columna JSONB porque no está seguro de los requisitos. Se prometen a sí mismos que la normalizarán una vez que las cosas se estabilicen. Tres años después, esa columna contiene cuarenta versiones diferentes de lo que se suponía era un perfil de usuario, consultado por quince servicios que cada uno asume cosas distintas sobre lo que hay dentro.

La deuda técnica no es el JSONB en sí. Es la brecha entre lo que te dijiste que estabas construyendo y lo que realmente construiste: un sistema no documentado de schema‑on‑read.

## What Usually Happens

Estás añadiendo una funcionalidad y no estás seguro de si los usuarios necesitan un `twitter_handle` o un `bluesky_handle` o algo totalmente distinto. En lugar de pensar el esquema, haces esto:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

Funciona. Lanzas la característica, pasas a la siguiente, y luego a la siguiente. La columna JSONB crece silenciosamente en segundo plano.

Este es el cruce de caminos. Si `profile` sigue siendo un blob opaco obtenido por `user.id`, probablemente estés bien. Si empieza a convertirse en el lugar principal donde viven los datos de negocio, los compromisos cambian rápidamente.

Product asks: *"How many users are in New York?"*

Escribes:

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres realiza un escaneo completo de la tabla. Cada fila.

Así que añades un índice GIN. Tal vez siga siendo aceptable. A veces lo es. Pero ahora pagas complejidad real y costo de almacenamiento porque un campo que se comporta como dato relacional de primera clase nunca se convirtió en una columna de primera clase.

### Año 1: Deriva del esquema

Tienes tres versiones de datos en la misma columna.

*   Fila 1: `{"city": "NYC"}`
*   Fila 1000: `{"location": "NYC"}`
*   Fila 5000: `{"address": {"city": "New York"}}`

Tu código de aplicación ahora se ve así:

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

No eliminaste el esquema. Simplemente trasladaste la validación y las comprobaciones de consistencia de la base de datos a código de aplicación disperso.

---

## Cuándo usar JSONB de verdad


JSONB tiene casos de uso válidos. Muchas veces está perfectamente bien, y a veces es la mejor opción disponible.

La distinción crítica no es “estructurado es bueno, JSON es malo”. Es más bien esto:

- ¿Los datos se recuperan mayormente como un todo mediante una clave primaria estable?
- ¿Las claves varían materialmente entre proveedores, versiones, inquilinos o con el tiempo?
- ¿Estás consultando unos pocos campos conocidos, o inventando nuevas rutas de consulta cada sprint?
- ¿La aplicación posee versionado y validación de forma intencional, o simplemente lo improvisa?

### Casos de uso legítimos de JSONB

1.  **Payloads de Webhooks**: Recibes datos de Stripe, Slack o GitHub. No tienes control sobre el esquema. Puede que nunca los consultes. Solo necesitas almacenarlos para depuración o reproducción. **Perfecto para JSONB.**

2.  **Registros y flujos de eventos**: Logs de aplicación, auditorías, contextos de errores. Son de escritura intensiva, rara vez se consultan por campos específicos, y a menudo se analizan en bloque o se exportan a plataformas de analítica. **JSONB está bien aquí.**

3.  **Preferencias y configuraciones de usuario**: Objetos de configuración con más de 100 banderas booleanas, la mayoría falsas, y siempre recuperas el blob completo por ID de usuario. No ejecutas `WHERE preferences->>'theme' = 'dark'`. **JSONB funciona.**

4.  **Configuración de proveedores/modelos LLM**: Este es uno de los ejemplos modernos más claros. OpenAI, Anthropic, Gemini, modelos locales de peso abierto y pasarelas específicas de proveedores exponen parámetros superpuestos pero diferentes. Incluso dentro de un mismo proveedor, las capacidades del modelo y los nombres de opciones evolucionan. Un blob de configuración JSONB suele ser mucho más honesto que pretender que `temperature`, `top_p`, `reasoning_effort`, `json_schema`, `tool_choice` y veinte perillas más deben ser columnas universales. **JSONB es a menudo la abstracción correcta aquí.**

5.  **Cacheo de respuestas de API**: Estás almacenando respuestas completas de API. La base de datos actúa como un Redis más rápido. Recuperas por clave de caché, nunca por propiedades anidadas. **JSONB es apropiado.**

6.  **Event Sourcing**: Guardas payloads de eventos inmutables. Tus consultas son siempre “dame todos los eventos del agregado X” ordenados por tiempo. Nunca ejecutas cláusulas `WHERE` sobre propiedades del evento. **JSONB encaja.**

7.**Superficies de Extensibilidad**: Integraciones, configuraciones de plugins, sobrescrituras por inquilino, metadatos del marketplace, capacidades del proveedor, o campos “extras” donde esperas explícitamente que la forma varíe según el subtipo. **JSONB puede ser el contrato correcto, no una concesión.**

Regla práctica: si la aplicación recupera el documento mediante una clave conocida y sabe cómo validarlo/versionarlo, JSONB puede ser excelente. Si el negocio sigue haciendo preguntas relacionales sobre claves anidadas, esos campos están intentando convertirse en columnas.

## El Mejor Patrón Suele Ser Híbrido

Muchos sistemas maduros terminan aquí:

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

Esto suele ser mejor que cualquiera de los extremos.

- `provider`, `model`, `status` y `created_at` son columnas de primera clase porque los filtrarás, unirás, agregarás e indexarás.
- `config` permanece como JSONB porque la superficie exacta de opciones es específica del modelo, del proveedor y probablemente evolucione.

Eso no es “no normalizar”. Es trazar la línea en el lugar correcto.

### A Gran Escala: Versionado de Objetos > Normalización

Aquí es donde se pone interesante. A escalas suficientemente grandes, la solución “correcta” no es la normalización—es el versionado de objetos.

Si manejas miles de millones de filas y una evolución frecuente del esquema, migrar columnas se vuelve costoso. Empresas como Stripe, GitHub y Netflix no normalizan todo. En su lugar:

```sqlCREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

Su aplicación sabe cómo leer `version: 1`, `version: 2`, `version: 3`. No hay migraciones de base de datos para nuevos campos. El código maneja la compatibilidad hacia atrás.

Esto es una decisión arquitectónica, no pereza. Cambia la complejidad de la base de datos por complejidad en la aplicación. A veces es exactamente el intercambio correcto, sobre todo cuando el documento está naturalmente versionado y la aplicación es el intérprete canónico.

El modo de falla no es “usar JSONB”. El modo de falla es usar JSONB sin versionado, sin validación, sin reglas de promoción o sin una frontera clara entre los datos del documento y los datos relacionales.

## Las Preguntas Que Realmente Importan

Antes de añadir una columna JSONB, pregunte:

1.  ¿Consultaremos campos anidados en `WHERE`, `JOIN`, `GROUP BY` o `ORDER BY` de forma regular?
2.  ¿Controlamos este esquema, o está definido externamente y es volátil?
3.  ¿La forma es intencionalmente heterogénea entre registros?
4.  ¿Tenemos validación a nivel de aplicación y versionado?
5.  ¿Qué campos podrían convertirse en dimensiones operacionales más adelante?

Si la respuesta a la #1 es “sí, constantemente”, eso es una señal fuerte de que se necesitan columnas.

Si las respuestas a la #2 y la #3 son “sí”, JSONB probablemente está haciendo un trabajo real para usted.

---
## Escapando la Trampa

Si ya está en este agujero, deje de cavar.

1.  Auditoría: Ejecute `jsonb_object_keys` y examine la deriva real de la forma, no la forma que asume que existe.  
2.  Promoción: Identifique los campos que filtra, une, ordena o informa con mayor frecuencia. Conviértalos en columnas reales.  
3.  Validación: Añada validación a nivel de aplicación o base de datos para lo que quede en JSONB.  
4.  Versionado: Si el blob es datos de dominio reales, versionelo explícitamente.  
5.  Recorte: Elimine claves duplicadas del blob una vez que las columnas promovidas estén establecidas.  

No se diga a sí mismo que todo blob debe normalizarse. Tampoco se diga que un blob con semántica de negocio permanente es “temporal”.  

JSONB es excelente cuando el documento es verdaderamente de forma documental. Es peligroso cuando es un esquema relacional usando un bigote falso.  

## Recursos

- [Documentación de PostgreSQL JSONB](https://www.postgresql.org/docs/current/datatype-json.html)  
- [Estrategias de Indexación JSONB](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)  
- [Cuándo usar JSONB vs columnas relacionales](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)  
- [Mejores prácticas de diseño de esquemas en PostgreSQL](https://www.postgresql.org/docs/current/ddl.html)
````
