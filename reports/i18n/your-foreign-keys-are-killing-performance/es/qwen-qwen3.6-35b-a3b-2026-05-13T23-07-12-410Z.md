# Translation Candidate
- Slug: your-foreign-keys-are-killing-performance
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/es/index.mdx
- Validation: deferred
- Runtime seconds: 131.63
- Input tokens: 7688
- Output tokens: 28620
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.029773
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Claves foráneas: deja de preguntar si son rápidas'
subTitle: Pregunta qué estás optimizando realmente.
date: '2025-12-29'
modified: '2026-01-10'
tags:
  - postgres
  - postgresql
  - databases
  - performance
  - foreign-keys
  - constraints
  - indexing
category: Code
subCategory: Databases
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La optimización de base de datos más costosa que he presenciado empezó cuando alguien eliminó todas las claves foráneas.

No porque hubieran medido un cuello de botella. No porque las escrituras fueran realmente lentas. Porque leyeron en algún lado que "las claves foráneas no escalan". Seis meses después, tenían 2000 millones de registros huérfanos, un sistema de facturación cobrando a usuarios eliminados y analíticas con una desviación del 40%.

¿Qué pasó cuando intentaron restaurar las restricciones? La base de datos se detuvo en seco intentando validar registros existentes que ya estaban corruptos.

En el desarrollo web circula la idea generalizada de que las claves foráneas son inherentemente lentas, como ruedas auxiliares que se quitan al pasar a sistemas "reales". Pero eso ignora por completo el propósito de una restricción. No estás eligiendo entre rápido y lento. Estás eligiendo entre diferentes modos de fallo.

Piénsalo así: el vidrio laminado, los cinturones de seguridad y los airbags agregan peso al auto. Definitivamente lo hacen más lento y menos eficiente en combustible. Pero no los arrancas para mejorar tu tiempo 0-60, porque estás optimizando para otra cosa por completo.

La pregunta no es si las claves foráneas te ralentizan. Por supuesto que lo hacen. La pregunta es qué obtienes a cambio y si realmente lo necesitas.

## Qué estás intercambiando realmente

Déjame darte un ejemplo concreto. Estás construyendo un sistema de monitoreo meteorológico con tablas para estaciones meteorológicas, dispositivos de sensores, lecturas de sensores y estados de EE. UU.

¿Vinculas todo con claves foráneas? Pensemos en qué cambia realmente y cuáles son las consecuencias:

Los estados de EE. UU. probablemente no van a cambiar. Wyoming no va a cambiar de nombre en el corto plazo. No necesitas una clave foránea para validar códigos de estado en cada inserción cuando sabes que los datos de referencia son estáticos. Eso es sobrecarga innecesaria.

Las estaciones meteorológicas se agregan, se reubican y se dan de baja. Pero aquí va una pregunta: ¿quieres que las lecturas históricas "pierdan" su estación si alguien elimina accidentalmente un registro de estación? Quizás prefieras que esos datos permanezcan intactos incluso si la estación ya no existe. Eso implicaría tratar las lecturas como un instantáneo histórico en lugar de una referencia en tiempo real, lo cual cambia por completo si una clave foránea tiene sentido o no.

Las lecturas de los sensores se insertan miles de veces por minuto. Cada validación de clave foránea implica una búsqueda. Cada búsqueda genera contención en tus tablas. Si una validación lenta hace que tu cola de inserciones se sature y pierdas datos en tiempo real, eso es un tipo de pérdida de datos distinto a tener un registro huérfano.

Ya ves hacia dónde va esto. La elección no se trata de rendimiento versus corrección como conceptos abstractos. Se trata de qué fallo específico estás más dispuesto a tolerar, dados tus restricciones reales y sus consecuencias reales.

Si referencias incorrectas significan datos de facturación corruptos o violaciones regulatorias, probablemente quieras claves foráneas que te protejan, sin importar el costo de rendimiento. Si una validación lenta hace que pierdas para siempre los datos de sensores en tiempo real porque tu cola se desborda, entonces quizás la validación sea el intercambio incorrecto.

## Cuando las escrituras rápidas realmente importan

Así que has decidido que necesitas la máxima velocidad de escritura. Tu cola se está acumulando, las transacciones están expirando y las validaciones de clave foránea están causando problemas reales que has medido (no solo teorizado).

Tienes algunas opciones. Podrías cambiar el nivel de aislamiento de transacción de `SERIALIZABLE` a `READ COMMITTED`, que es más rápido pero renuncia a algunas garantías de consistencia. Podrías agrupar tus commits, insertando 1000 filas por transacción en lugar de una a una para amortizar la sobrecarga de las FK. O podrías desnormalizar hacia una estructura de registro append-only donde ni siquiera intentas validar referencias.

Esa tercera opción, por cierto, no es hacer trampa. Es simplemente un diseño diferente:

```sql
CREATE TABLE sensor_log (
  id BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL  -- { station_id, sensor_id, temp, humidity, ... }
);

CREATE INDEX ON sensor_log USING GIN (data);
CREATE INDEX ON sensor_log (recorded_at);
```

Sin joins. Sin validaciones de clave foránea. Solo añade datos y consulta por rango de tiempo o por el índice GIN sobre el blob JSONB. ¿Es esto "mejor práctica"? Probablemente no en el sentido que enseñan los libros de texto de bases de datos. ¿Funciona cuando insertas 50.000 filas por minuto en una Raspberry Pi? Absolutamente.

La desconexión ocurre cuando la gente trata la "mejor práctica" como un imperativo moral en lugar de un patrón que funciona bien en escenarios comunes pero que quizás no se ajuste al tuyo.

## La trampa de la normalización

Los cursos de bases de datos adoran enseñar normalización. Evita la duplicación a toda costa. Tercera Forma Normal o nada.

Así terminas con algo como: `Orders` → `OrderItems` → `Products` → `Variants` → `Colors` → `Sizes`

Seis `JOIN` de tablas solo para responder: "¿Pedí la camisa roja o la azul la Navidad pasada?" Y que no te falte incluir el nombre del producto, porque eso son tres `JOIN` más en la jerarquía del catálogo.

Pero espera. La justificación suele ser: "¿Y si la marca cambia cómo etiqueta el azul?" Si eso pasa, ¿realmente quieres que los pedidos históricos cambien de color retroactivamente? Claro que no. Cuando alguien realizó ese pedido, compró una "Camiseta Azul, Talla M" tal como existía en ese momento, no como una referencia abstracta a una entrada de catálogo que podría actualizarse después.

Vale la pena detenerse en esto porque es sutil. Algunos datos son fundamentalmente una instantánea, no una referencia. Cuando tratas los datos de instantánea como si fueran una referencia en vivo, terminas con una proliferación absurda de `JOIN` para reconstruir algo que debería haberse desnormalizado directamente al escribir.

Almacena `{"color": "blue", "size": "M"}` directamente en el pedido. Listo.

### Identificar datos de instantánea

¿Cómo sabes cuándo algo debería ser una instantánea? Pregúntate si se trata de un registro de un punto en el tiempo:

Los pedidos capturan los detalles del producto tal como existían al momento de la compra. Los registros de auditoría registran el estado del usuario cuando ejecutó una acción. Las tablas de historial preservan el estado del registro antes de una actualización. Los flujos de eventos capturan qué sucedió, cuándo y con qué datos.

Si la respuesta es "sí, esto registra un instante en el tiempo", deja de normalizarlo. Empieza a tomar instantáneas.

### Bloques opacos

Hay otra categoría más allá de las instantáneas: datos que nunca consultas por campos. Simplemente los almacenas y los recuperas completos.

Las configuraciones de modelos LLM como `{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}` no son algo que consultes por temperatura. Obtienes toda la configuración por ID de solicitud cuando la necesitas. Payloads de JWT después de descodificarlos, registros de peticiones/respuestas de API para depuración, objetos de preferencias de usuario con ajustes de tema y banderas de notificación. Todos estos son bloques opacos. No necesitas normalización. No necesitas claves foráneas. Mételos en JSONB y sigue con tu vida.

¿Un join de 6 tablas para saber qué color de camisa se pidió? Eso no es una normalización adecuada. Es una confusión conceptual sobre si estás almacenando una referencia o un valor.

(Aunque ten cuidado: esto puede salir mal estrepitosamente si más adelante necesitas consultar esos datos. Consulta [La seducción de JSONB](../the-jsonb-seduction) para ver cuándo este enfoque genera su propia pesadilla.)

## La escala es contexto

Escucharás a gente decir que "las claves foráneas no escalan". Pero la escala es completamente relativa a tu hardware y arquitectura.

¿Un Raspberry Pi registrando 10.000 lecturas de sensores por minuto en una tarjeta microSD? Eso es una escala legítimamente alta para ese hardware. ¿AWS Aurora con IOPS provisionados manejando billones de filas? Puedes aplicar claves foráneas sin sudar la gota gorda.

El límite duro real no tiene que ver con el número de filas ni con el volumen de escrituras. Es el sharding.

Cuando tu tabla `Users` reside en el Servidor A y tu tabla `Orders` en el Servidor B, las claves foráneas no pueden funcionar físicamente. La base de datos carece de un mecanismo para aplicar una restricción a través de límites de red. En ese punto, ya estás ejecutando trabajos en segundo plano para detectar huérfanos e implementando patrones de consistencia eventual.

Esto ocurre en entornos SaaS multiinquilino donde cada cliente obtiene su propia base de datos aislada por cumplimiento normativo, o en despliegues de IoT con 50.000 dispositivos de borde ejecutando SQLite localmente. Una vez que llegas ahí, las claves foráneas quedan descartadas (literalmente), independientemente de las consideraciones de rendimiento.

Pero hasta que no cruces ese límite arquitectónico, quizás no convenga optimizar prematuramente para los problemas de Netflix cuando estás construyendo una herramienta interna para 10 usuarios.

## Cómo se ve esto realmente en la práctica

En lugar de preguntar «¿debería usar claves foráneas?», prueba a hacerte estas tres preguntas:

¿Qué se rompe si esta referencia es incorrecta? ¿Una demanda, facturación corrupta, incumplimiento regulatorio? ¿O es solo un join faltante que devuelve null en tu dashboard de analíticas?

¿Qué se rompe si la validación es lenta? ¿Pierdes datos en tiempo real irrecuperables? ¿O tus consultas simplemente tardan 50 milisegundos más?

¿Son estos datos un snapshot o una referencia? ¿Estás grabando cómo se veía algo en un momento concreto, o estás apuntando al valor actual de referencia?

A partir de ahí, los patrones emergen con bastante naturalidad:

Las transacciones financieras, las sesiones de autenticación, cualquier cosa donde la corrupción de datos implique responsabilidad legal probablemente justifica el uso de claves foráneas, independientemente de la sobrecarga de rendimiento.

Los registros de alto volumen, los datos de series temporales append-only, cualquier cosa donde estés escribiendo un millón de eventos por minuto probablemente no necesite sobrecarga de validación en cada escritura.

Las instantáneas históricas como pedidos y registros de auditoría, los datos que siempre consultas como un bloque completo como las preferencias de usuario, los esquemas que no controlas como los payloads de webhook de APIs externas… estos suelen funcionar mejor desnormalizados.

Pero fíjate que dije "probablemente" y "suelen". Porque el contexto importa, y el tuyo es distinto al mío.

## Reflexiones finales

Las claves foráneas no son un problema de rendimiento. Son un compromiso entre la velocidad de escritura y la integridad de los datos, y si ese compromiso tiene sentido depende por completo de tus cuellos de botella específicos y de las consecuencias específicas que asumas.

El verdadero problema surge cuando la gente elimina las claves foráneas por algo que leyeron sobre "escala web" sin medir realmente si tienen un problema de rendimiento de escritura ni considerar lo que están renunciando. Terminas copiando a ciegas la arquitectura de Netflix en un proyecto desde cero que procesa 100 transacciones al día.

Quizás el coste de rendimiento valga la pena para tu caso de uso. Quizás no. Pero al menos toma esa decisión basándote en lo que realmente estás optimizando, no en lo que crees que deberías optimizar.

¿En qué estás optimizando?

## Recursos

- [Documentación sobre restricciones de claves foráneas de PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [Consejos de rendimiento de PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html)
- [Use The Index, Luke! - Claves foráneas](https://use-the-index-luke.com/sql/clustering/data-clustering)
- [Normalización vs desnormalización de bases de datos](https://www.postgresql.org/docs/current/tutorial-concepts.html)
````
