# Translation Candidate
- Slug: your-foreign-keys-are-killing-performance
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/es/index.mdx
- Validation: passed
- Runtime seconds: 34.04
- Input tokens: 10039
- Output tokens: 9722
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003136
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Claves foráneas: Deja de preguntar si son rápidas'
subTitle: Pregúntate por lo que realmente estás optimizando.
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
La optimización de base de datos más costosa que he visto comenzó con que alguien eliminara todas las claves foráneas.

No porque hubieran medido un cuello de botella. No porque las escrituras fueran realmente lentas. Sino porque leyeron en algún lugar que "las claves foráneas no escalan". Seis meses después, tenían 2.000 millones de registros huérfanos, un sistema de facturación cobrando a usuarios eliminados y análisis con errores del 40 %.

Cuando intentaron agregar las restricciones nuevamente, la base de datos se detuvo en seco al tratar de validar datos existentes que ya estaban corruptos.

Hay esta idea extendida en desarrollo web de que las claves foráneas son inherentemente lentas, que son ruedas de entrenamiento que quitas cuando pasas a sistemas "reales". Pero eso ignora completamente la finalidad de una restricción. No estás eligiendo entre rápido y lento. Estás eligiendo entre diferentes modos de fallo.

Piénsalo así: el vidrio de seguridad, los cinturones de seguridad y los airbags añaden peso a tu auto. Sin duda hacen que tu vehículo sea más lento y menos eficiente en combustible. Pero no los arrancas para optimizar tu aceleración de 0 a 100 km/h, porque estás optimizando para algo completamente distinto.

La pregunta no es si las claves foráneas te ralentizan. Por supuesto que lo hacen. La pregunta es qué obtienes a cambio y si realmente lo necesitas.

## Lo que realmente estás intercambiando  

Dame un ejemplo concreto. Estás construyendo un sistema de monitoreo climático con tablas para estaciones meteorológicas, dispositivos de sensores, lecturas de sensores y estados de EE. UU.  

¿Deberías vincular todo con claves foráneas? Analicemos qué cambia realmente y cuáles son las consecuencias:  

Los estados de EE. UU. probablemente no cambien. Wyoming no va a ser renombrado en un futuro cercano. No necesitas una clave foránea para validar códigos de estado en cada inserción si sabes que los datos de referencia son estáticos. Ese es un sobrecoste innecesario.  

Las estaciones meteorológicas se agregan, mueven y descomisionan. Pero aquí surge una pregunta: ¿quieres que las lecturas históricas "pierdan" su estación si alguien accidentalmente elimina un registro de estación? Es posible que desees que esos datos permanezcan intactos incluso si la estación ya no existe. Eso significaría que estás tratando las lecturas como una captura histórica en lugar de una referencia en vivo, lo que cambia si una clave foránea incluso tiene sentido.  

Las lecturas de sensores se insertan miles de veces por minuto. Cada verificación de clave foránea implica una búsqueda. Cada búsqueda genera contención en tus tablas. Si la validación lenta hace que tu cola de inserción se atasque y pierdas datos en tiempo real, esa es una pérdida de datos de un tipo completamente diferente a tener un registro huérfano.

Ya puedes ver a dónde va esto. La elección no es una cuestión abstracta de rendimiento versus corrección. Es una cuestión de cuál de los fallos específicos estás más dispuesto a tolerar, dados tus verdaderos límites y consecuencias reales.

Si referencias incorrectas significan datos de facturación corruptos o incumplimientos regulatorios, probablemente quieras que las claves foráneas te protejan independientemente del costo en rendimiento. Si la validación lenta significa que pierdas datos en tiempo real para siempre porque tu cola se desborda, entonces quizás la validación sea el intercambio equivocado.

## Cuando realmente importan las escrituras rápidas

Entonces has decidido que necesitas la velocidad máxima de escritura. Tu cola se acumula, se agotan los tiempos de transacción, y las comprobaciones de clave foránea están causando problemas que has medido realmente (no solo teorizados).

Tienes algunas opciones. Puedes cambiar tu nivel de aislamiento de transacción de `SERIALIZABLE` a `READ COMMITTED`, lo cual es más rápido pero sacrifica algunas garantías de consistencia. Puedes agrupar tus confirmaciones, insertando 1000 filas por transacción en lugar de una a la vez para amortizar la sobrecarga de las claves foráneas. O puedes denormalizar en una estructura de registro de solo-append donde ni siquiera intentes validar referencias.

Por cierto, esa tercera opción no es un atajo. Es solo un diseño diferente:

```sql
CREATE TABLE sensor_log (
  id BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL  -- { station_id, sensor_id, temp, humidity, ... }
);

CREATE INDEX ON sensor_log USING GIN (data);
CREATE INDEX ON sensor_log (recorded_at);
```

Sin uniones. Sin comprobaciones de claves foráneas. Solo agregar datos y consultar por rangos de tiempo o mediante el índice GIN en el blob JSONB. ¿Es esto "mejor práctica"? Probablemente no en el sentido que enseñan los libros de texto de bases de datos. ¿Funciona cuando estás insertando 50,000 filas por minuto en una Raspberry Pi? Absolutamente.

La brecha surge cuando la gente trata "mejor práctica" como un imperativo moral en lugar de un patrón que funciona bien en escenarios comunes pero que puede no encajar en los tuyos.

## La trampa de la normalización

Los cursos de bases de datos suelen enseñar normalización. Evita la duplicación a toda costa. Tercer Formato Normal o nada.

Terminas con algo como: `Orders` → `OrderItems` → `Products` → `Variants` → `Colors` → `Sizes`

Seis uniones de tablas solo para responder "¿Ordené la camiseta roja o la azul el último Navidad?". Y olvídate de incluir el nombre del producto, porque eso está tres uniones más allá en la jerarquía del catálogo.

Pero espera. La justificación suele ser: "¿Y si la marca cambia cómo etiqueta el Azul?". Si eso ocurre, ¿realmente quieres que las órdenes históricas cambien retroactivamente de color? Por supuesto que no. Cuando alguien realizó esa orden, compró una "Camiseta Azul, Talla M" según existía en ese momento específico, no como una referencia abstracta a una entrada del catálogo que podría actualizarse más tarde.  

Esto vale la pena detenerse a analizarlo porque es sutil. Algunos datos son fundamentalmente una instantánea, no una referencia. Cuando tratas datos de instantánea como si fueran referencias vivas, terminas con esta proliferación absurda de uniones para reconstruir algo que debería haberse denormalizado en el momento de la escritura.  

Almacena `{"color": "blue", "size": "M"}` directamente en la orden. Listo.  

### Reconociendo datos de instantánea  

¿Cómo sabes cuándo algo debe ser una instantánea? Pregúntate si es un registro de un momento específico:  

- Las órdenes capturan los detalles del producto según existían en el momento de la compra.  
- Los registros de auditoría capturan el estado del usuario cuando realizaron una acción.  
- Las tablas de historial preservan el estado de un registro antes de una actualización.  
- Las secuencias de eventos capturan qué sucedió, cuándo y con qué datos.

Si la respuesta es "sí, esto está registrando un momento en el tiempo", deja de normalizarlo. Comienza a tomar instantáneas.

### Bloques opacos

Hay otra categoría más allá de las instantáneas: datos que nunca consultas internamente. Solo los almacenas y los recuperas enteros.

Las configuraciones de modelos de lenguaje como `{"modelo": "gpt-4", "temperatura": 0.7, "max_tokens": 2000}` no son algo que consultes por temperatura. Recuperas toda la configuración por ID de solicitud cuando la necesitas. Cargas de JWT después de decodificarlas, registros de solicitudes/respuestas de API para depuración, objetos de preferencias de usuario con configuraciones de tema y banderas de notificación. Todos son bloques opacos. No necesitas normalización. No necesitas claves foráneas. Almacénalos en JSONB y sigue con tu vida.

La unión de 6 tablas para descubrir qué color de camisa se ordenó? Eso no es normalización adecuada. Eso es confusión sobre si estás almacenando una referencia o un valor.

(Aunque ten cuidado: esto puede volverse en tu contra espectacularmente si más adelante necesitas consultar esos datos. Ver [La seducción de JSONB](../la-seducción-de-jsonb) para cuando este enfoque crea sus propios infiernos).

## La escala es contexto

Escucharás a personas decir: "Las claves foráneas no escalan". Pero la escala es completamente relativa a tu hardware y arquitectura.

Una Raspberry Pi registrando 10,000 lecturas de sensores por minuto en una tarjeta microSD? Esa es una escala legítimamente alta para ese hardware. AWS Aurora con IOPS provisionados manejando miles de millones de filas? Puedes usar claves foráneas sin sudar ni un poco.

El límite real no depende del número de filas ni del volumen de escritura. Depende de la distribución en shards (sharding).

Cuando tu tabla `Users` vive en el Servidor A y tu tabla `Orders` vive en el Servidor B, las claves foráneas físicamente no pueden funcionar. El sistema de base de datos no tiene un mecanismo para garantizar una restricción a través de límites de red. En ese punto, ya estás ejecutando trabajos en segundo plano para encontrar registros huérfanos e implementando patrones de consistencia eventual.

Esto ocurre en SaaS multiinquilino donde cada cliente tiene su propia base de datos aislada por cumplimiento normativo, o en despliegues de IoT donde tienes 50,000 dispositivos de borde que ejecutan SQLite localmente. Una vez que estás ahí, las claves foráneas ya no son una opción (literalmente) independientemente de consideraciones de rendimiento.

Pero hasta que no alcances ese límite arquitectónico, quizás no debas optimizar prematuramente para los problemas de Netflix cuando estés construyendo una herramienta interna para 10 usuarios.

## ¿Qué se ve en la práctica?

En lugar de preguntar "¿debo usar claves foráneas?", intenta preguntarte estas tres cosas:

¿Qué se rompe si esta referencia está equivocada? ¿Es una demanda legal, facturación corrupta, violación regulatoria? ¿O es solo una unión faltante que devuelve nulo en tu panel de análisis?

¿Qué se rompe si la validación es lenta? ¿Pierdes datos en tiempo real irreemplazables? ¿O tus consultas solo toman 50 milisegundos adicionales?

¿Este dato es un instante o una referencia? ¿Estás registrando cómo se veía algo en un momento específico, o estás apuntando al valor actual autoritativo?

Desde allí, los patrones surgen de manera bastante natural:

Transacciones financieras, sesiones de autenticación, cualquier cosa donde la corrupción de datos implique responsabilidad legal probablemente necesiten claves foráneas independientemente del sobrecoste de rendimiento.

Registros de alta volumen, series temporales de solo-append, cualquier cosa donde escribas un millón de eventos por minuto probablemente no necesiten sobrecoste de validación en cada escritura.

Snapshots históricos como órdenes y registros de auditoría, datos que siempre se obtienen como un blob completo como las preferencias de usuario, esquemas que no controlas como payloads de webhooks de APIs externas... estos suelen funcionar mejor denormalizados.

Pero nota que dije "probablemente" y "a menudo". Porque el contexto importa, y tu contexto es diferente al mío.

## Reflexiones finales

Las claves foráneas no son un problema de rendimiento. Son un compromiso entre la velocidad de escritura y la integridad de los datos, y si este compromiso tiene sentido depende enteramente de tus cuellos de botella específicos y de las consecuencias específicas que tengas.  

El verdadero problema surge cuando las personas eliminan las claves foráneas por algo que leyeron sobre "web scale" sin medir realmente si tienen un problema de rendimiento en escritura o considerar lo que están sacrificando. Terminas imitando ciegamente la arquitectura de Netflix en un proyecto nuevo que procesa 100 transacciones al día.  

Quizás el costo de rendimiento valga la pena para tu caso de uso. Quizás no lo haga. Pero al menos toma esa decisión basada en lo que realmente estás optimizando, no en lo que crees que deberías optimizar.  

¿Para qué estás optimizando?  

## Recursos  

- [Documentación de restricciones de claves foráneas de PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)  
- [Sugerencias de rendimiento de PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html)  
- [Use The Index, Luke! - Claves foráneas](https://use-the-index-luke.com/sql/clustering/data-clustering)  
- [Normalización vs. denormalización de bases de datos](https://www.postgresql.org/docs/current/tutorial-concepts.html)
````
