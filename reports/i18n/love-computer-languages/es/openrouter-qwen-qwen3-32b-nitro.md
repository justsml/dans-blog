# Translation Candidate
- Slug: love-computer-languages
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/es/index.mdx
- Validation: passed
- Runtime seconds: 19.43
- Input tokens: 7605
- Output tokens: 8440
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002634
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Notas sobre lenguajes de programación

#### Estoy seguro de que mis observaciones misceláneas ya han sido hechas antes, pero aquí está mi lista de lenguajes más interesantes:

### JavaScript

Mi Único Verdadero Amor, supremamente versátil y ubicuo, el campeón todo terreno, increíblemente poderoso.
Es el #1 lenguaje más activo/popular en GitHub.com durante _años_ seguidos.

Odio admitirlo, pero durante años tontamente no tenía más que desprecio y burla hacia lo que ahora es **mi lenguaje favorito**.

**ES6** solo ha aumentado mi ~~~adicción~~~ amor. Mientras que el puro ES5 siempre tendrá un lugar especial en mi corazón, cada vez que uso algo de **ES6**, siento esa mordida de araña radiactiva...

Hubo 4 factores que me convencieron para unirme al **Campamento ES6**:

1.  Es divertido. En serio. Hay ganancias tangibles en belleza, claridad y productividad.

- ¿Afirmaciones subjetivas, dirás? Déjame mostrarte un poco de ES6:  
- `let expired = users.filter(u => Date.now() > u.trialDate)`  
- Ahora no tienes que fingir que sabes cómo usar `Object.create` o `Object.defineProperty`  
- Mira los ejemplos a continuación  

1.  ¡ES6 es oficialmente un estándar finalizado desde julio de 2015!  
1.  ¡Soporte efectivamente del 100%\*!... Bueno, se necesita BabelJS para parchear tu código y hacerlo compatible con ES5. Históricamente, los transpiladores de JS han sido desestimados. Sin embargo, desde hace poco (2014-15) las cosas han cambiado, ya que BabelJS se ha convertido en un impulsor clave del avance del lenguaje. Empresas como Microsoft y Facebook lo usan en algunos de los sitios más grandes del mundo.  
1.  Las [últimas versiones de Node](https://nodejs.org/en/blog/release/v4.0.0/) incluyen el mismo motor V8 de JS que Chrome v45, es decir, la versión 4.5  

#### Ejemplos

> Voy a mostrarte qué me hizo _empezar_ a beber ese KoolAid de ES6.

En mi experiencia reciente, ES6 te ayuda a escribir código más rápido. Hasta el punto.  
Porque el código es más conciso, se necesita significativamente menos esfuerzo mental para revisar y entender tu código antiguo (o el de un compañero de equipo).

He visto ahorros regulares de KLOC de aproximadamente 20-50%. ¡Como si fuera un Kate Moss trim!  

**_IMAGEN FALTANTE:_ EcmaScript 5 vs ES 2016 - Demo: Classes, Destructuring, Slick**  
{/* ](/images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- No más código tedioso para 'extraer' y 'verificar' campos pasados a una función. Vamos directo al ejemplo `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // Almacenar el hash de la contraseña, solo necesitamos definir 1 variable explícita `var/let` - las otras variables se definen con la magia de `{fields}` arriba ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // agregar usuario tras la respuesta del servicio
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

#### Saltar a ES6 puede sentirse como pasar de:

<div class="anigif top">
  <img alt='huh' title="¿Eh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>A</h3>
<div class="anigif">
  <img alt='wtf' title="¿Qué demonios?!!!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>A</h3>
<div class="anigif end">
  <img alt='#winning' title="#Ganando" src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

Sigue explorando las nuevas características. Echa un vistazo a las plantillas de cadenas, el enlace automático de `this`, la herencia más coherente...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Sitio Oficial](http://www.rust-lang.org/)

- **Ventajas**

- Imagina un lenguaje tan rápido como C y tan poderoso como Python/C++, pero sin la complejidad o trampas que normalmente atrapan incluso a los desarrolladores más experimentados.  
  - De hecho, apostaría a que Rust es aproximadamente tan complejo como la especificación de ES6.  
  - Incluye una tonelada de extras:  
    1.  Esencialmente, Rust transpila desde una sintaxis semi-dinámica a **código C puro**.  
    1.  Incluye **todas las mejores prácticas** de C que probablemente cometerías errores, las cuales yo ~~eventualmente~~ siempre cometo.  
    - Automáticamente obtienes:  
    - Gestión automática de memoria (¡no necesitas un colector de basura lento!).  
    - Propiedad y bloqueo de objetos perfectamente delimitados (minimizando al mínimo el uso de mutex y conmutación de contexto).  
    - Duración de objetos (implementados automáticamente\*, y codificados como si conocieras todos los casos extremos).  
    - Evita virtualmente todos los errores en tiempo de ejecución (en serio, tus rutas de código se vuelven explícitas: simplemente no puedes ignorar una ruta de código).  
  - Oh, y sí, incluye extensibilidad real del lenguaje mediante una característica de macros sensata.  
    - ¿Necesitas comprensiones? [Estilo Scala? Hecho](https://gist.github.com/hanny24/5749688), ¿Y estilo Python? [Hecho](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).  
    1.  ¿Demasiado bueno para ser cierto? No, mejora:  
    - Indicadores de vanguardia (estadísticas de github.com) revelan que Rust es altamente competitivo o incluso supera a Go (el nuevo lenguaje popular de Google).  
      - Aproximadamente 4K más estrellas que Go (actualmente alrededor de 12,200).  
      - Más contribuyentes totales (¡2 veces más! - 1,071 vs. 479 de Go).  
      - Más bifurcaciones (¡3 veces más! - 2,343 vs. 765).  
      - Número de problemas abiertos, pierde por poco (2,000 vs. 1,730 de Go).  
      - Solicitudes de extracción (Rust 70+ vs. 1 de Go).  
    - Tuve que verificar tres veces los números.  
  - Otras bibliotecas son muy estables debido a las construcciones y reglas de Rust.  
  - Modelo de hilos utilizable por mortales comunes.  

- **Desventajas**  
  - Marcos de trabajo web decentes son relativamente nuevos, no probados y generalmente sin documentación (aunque están siendo muy impresionantes - desde marzo de 2015).  
  - Muchos cambios rotos en versiones pre-1.0.  

### Python  

- **Ventajas**  
  - Una asombrosa variedad de algoritmos ya están implementados en Python (ve: scilearnkit, numpy, matplotlib, pil/pillow, etc.).  
  - Muy divertido de escribir. Las comprensiones y la descomposición son características excelentes que hacen que otros lenguajes parezcan simplemente engorrosos.  
  - Arrays, 'Secuencias', Tuplas, etc., son relativamente simples.

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Contras**
  - Molesto: Python 2.x y 3.x son incompatibles. La Gran Escisión continúa, muchos años después.
  - Algunas bibliotecas esenciales no son necesariamente entendidas por algunos desarrolladores (numpy)

### Haskell

- **Ventajas**
  - Muy recompensador cuando finalmente memorizas suficiente sintaxis para crear patrones expresivos basados en comprensiones
  - Aprenderás patrones de código que doblan la mente - a menudo aplicables a otros lenguajes.
- **Contras**
  - La sintaxis y los patrones pueden ser difíciles de acostumbrar.

<div class="anigif end">
  <img alt='bucle infinito' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **Ventajas**
  - Compiladores increíblemente simples (especialmente el original)
  - Grandes recursos: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Contras**
  - Probablemente nunca uses este lenguaje para nada. Cero proyectos. Sin embargo, tendrá más impacto en tu estilo de codificación que otros lenguajes funcionales... Esto debería estar en la lista de ventajas).

#### _Trabajo en progreso (actualizado en diciembre de 2015)_
````
