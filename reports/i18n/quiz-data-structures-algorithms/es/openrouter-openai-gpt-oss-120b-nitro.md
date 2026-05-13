# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/es/index.mdx
- Validation: passed
- Runtime seconds: 34.59
- Input tokens: 15941
- Output tokens: 8121
- Thinking tokens: unknown
- Cached input tokens: 5824
- Cache write tokens: 0
- Estimated cost: $0.002083
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Cuestionario: Estructuras de datos y algoritmos'
subTitle: ¿Puedes hacer BS en un árbol binario?
label: Algorithms & DS
unlisted: true
date: '2024-10-31'
modified: '2024-11-08'
social_image: ../desktop-social.webp
category: Quiz
subCategory: Data Structures
tags:
  - quiz
  - data-structures
  - algorithms
  - intermediate
  - advanced
cover: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_full_width: ../redcharlie-mugDbuNnbd0-unsplash-wide.webp
cover_mobile: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_icon: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<section class="inset">
  ¡Bienvenido a mi quiz de Estructuras de Datos y Algoritmos!
</section>

Este quiz evaluará tu dominio de las estructuras de datos (pilas, listas, árboles, etc.), los algoritmos y la complejidad temporal.

### 20 preguntas… ¡Comencemos!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Estructuras de datos"
  title="Pilas vs Colas"
  options={[
    {text: 'Ambas'},
    {text: 'Colas'},
    {text: 'Pilas', isAnswer: true},
    {text: 'Ninguna'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos es la más adecuada para un patrón de acceso LIFO (Last In, First Out)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las pilas son las más adecuadas para patrones de acceso LIFO. Las colas son las más adecuadas para patrones de acceso FIFO (First In, First Out).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Algoritmos"
  title="Notación Big O"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal de un algoritmo que siempre tarda la misma cantidad de tiempo en ejecutarse, sin importar el tamaño de la entrada?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) representa complejidad temporal constante. Significa que el algoritmo siempre tarda la misma cantidad de tiempo en ejecutarse, sin importar el tamaño de la entrada.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Estructuras de datos"
  title="Cálculo de la longitud de una lista enlazada"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
    {text: 'O(n)', isAnswer: true},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal para calcular la longitud de una lista enlazada simple?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Para calcular la longitud de una lista enlazada simple, debes recorrer cada nodo desde la cabeza hasta el final, lo que resulta en una complejidad temporal O(n).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Estructuras de Datos"
  title="Búsqueda en Árbol Binario de Búsqueda"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal promedio para buscar un elemento en un Árbol Binario de Búsqueda balanceado?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En un BST balanceado, la complejidad temporal promedio para la búsqueda es O(log n) porque cada nivel reduce a la mitad el espacio de búsqueda.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Algoritmos de Ordenación"
  title="Complejidad de Merge Sort"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(log n)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal del algoritmo Merge Sort en el peor caso?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Merge Sort siempre opera con una complejidad de peor caso de O(n log n) ya que divide repetidamente el arreglo a la mitad y fusiona los subarreglos ordenados.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Grafos"
  title="DFS vs BFS"
  options={[
    {text: 'Cola', isAnswer: true},
    {text: 'Pila'},
    {text: 'Cola de prioridad'},
    {text: 'Mapa hash'},
    {text: 'Conjunto'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos se usa típicamente para implementar la búsqueda en anchura (BFS)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS utiliza una Cola para explorar los nodos nivel por nivel, procesando los nodos de forma amplia (por "fila").
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Grafos"
  title="Detección de ciclos en grafos"
  options={[
    {text: 'Quick Sort'},
    {text: 'Breadth-First Search'},
    {text: 'Merge Sort'},
    {text: 'Depth-First Search', isAnswer: true},
    {text: 'Bubble Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué algoritmo se usa comúnmente para detectar ciclos en un grafo dirigido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La búsqueda en profundidad (DFS) se usa típicamente para detectar ciclos en un grafo manteniendo una pila de recursión que rastrea los nodos visitados.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Algoritmos de Ordenación"
  title="Complejidad de Heap Sort"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal de Heap Sort en el peor caso?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Heap Sort mantiene una complejidad temporal de peor caso de O(n log n), ya que construye un heap y extrae repetidamente el elemento máximo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Estructuras de Datos"
  title="Complejidad de Tiempo de la Tabla Hash"
  options={[
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad de tiempo promedio para acceder a un elemento en una tabla hash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las tablas hash tienen una complejidad de tiempo promedio de O(1) para acceder a los elementos, asumiendo una buena función hash que minimice colisiones.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Estructuras de datos"
  title="Operaciones de pila"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto contiene las operaciones típicas que se realizan en una pila?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las operaciones principales de una pila son Push (añadir elemento), Pop (eliminar elemento) y Peek (ver el elemento superior sin eliminarlo).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Algoritmos de Grafos"
  title="Algoritmo de Ruta Más Corta"
  options={[
    {text: 'Kruskal\'s Algorithm'},
    {text: 'Prim\'s Algorithm'},
    {text: 'Bellman-Ford Algorithm'},
    {text: 'Dijkstra\'s Algorithm', isAnswer: true},
    {text: 'Floyd-Warshall Algorithm'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué algoritmo se usa comúnmente para encontrar la ruta más corta en un grafo ponderado con aristas no negativas?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El algoritmo de Dijkstra se usa frecuentemente para encontrar la ruta más corta en grafos con pesos de arista no negativos. Emplea una cola de prioridad para determinar la distancia mínima de manera eficiente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Estructuras de Datos de Árboles"
  title="Árboles de Búsqueda Autobalanceados"
  options={[
    {text: 'Árbol de Búsqueda Binario y Montículo Mínimo'},
    {text: 'Árbol AVL y Árbol Rojo-Negro', isAnswer: true},
    {text: 'Montículo Mínimo y Montículo Máximo'},
    {text: 'Pila y Cola'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto contiene ejemplos de estructuras de datos de árbol binario de búsqueda autobalanceado?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los árboles AVL y los árboles Rojo‑Negro son tipos de árboles autobalanceados, que garantizan que el árbol permanezca equilibrado después de cada inserción o eliminación.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Recursión"
  title="Caso Base de Recursión"
  options={[
    {text: 'Bucle Infinito'},
    {text: 'Desbordamiento de Pila'},
    {text: 'Caso Base', isAnswer: true},
    {text: 'Variable Global'},
    {text: 'Limitación de Alcance'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué debe definirse en una función recursiva para evitar la recursión infinita?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un caso base es necesario en una función recursiva para detener las llamadas recursivas cuando se cumple una condición específica, evitando la recursión infinita.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Estructuras de Datos"
  title="Operaciones de Cola"
  options={[
    {text: 'Encolar y Desencolar', isAnswer: true},
    {text: 'Push y Pop'},
    {text: 'Peek y Top'},
    {text: 'Recorrer y Ordenar'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son las dos operaciones principales de una cola?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las dos operaciones principales en una cola son Enqueue (agregar un elemento al final) y Dequeue (eliminar un elemento del frente).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Algoritmos de grafos"
  title="Ordenamiento topológico"
  options={[
    {text: 'El grafo debe contener ciclos'},
    {text: 'El grafo debe ser ponderado y conectado'},
    {text: 'El grafo debe ser no dirigido y acíclico'},
    {text: 'El grafo debe ser dirigido y acíclico', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son las condiciones para realizar un ordenamiento topológico en un grafo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El ordenamiento topológico se puede realizar en un grafo si es dirigido y acíclico (DAG). Este tipo de ordenación es útil en problemas de planificación de tareas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Programación Dinámica"
  title="Complejidad de la Recursión de Fibonacci"
  options={[
    {text: 'O(1)'},
    {text: 'O(2^n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la complejidad temporal de una implementación recursiva ingenua de la serie de Fibonacci?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La implementación recursiva ingenua de la serie de Fibonacci tiene una complejidad temporal de O(2^n) debido a los extensos cálculos repetidos para cada número de Fibonacci.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="Estructuras de Datos"
  title="Implementación de Cola de Prioridad"
  options={[
    {text: 'Array'},
    {text: 'Pila'},
    {text: 'Montículo', isAnswer: true},
    {text: 'Cola'},
    {text: 'Lista Enlazada'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos se usa comúnmente para implementar una cola de prioridad?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Una cola de prioridad se implementa normalmente usando un montículo porque permite extraer de forma eficiente el elemento de mayor o menor prioridad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="Estructuras de Datos"
  title="Recorridos de Árbol Binario"
  options={[
    {text: 'En orden, Preorden, Postorden', isAnswer: true},
    {text: 'Anchura primero, Profundidad primero, Heapify'},
    {text: 'Ordenar, Buscar, Rotar'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto enumera los órdenes de recorrido en profundidad comunes para un árbol binario?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En orden, preorden y postorden son los tres órdenes de recorrido en profundidad comunes para los árboles binarios, cada uno con un orden diferente de visita a los nodos. El recorrido en anchura también es común, pero pertenece a una categoría de recorrido distinta.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="Estructuras de Datos de Árbol"
  title="Propiedad del Heap"
  options={[
    {text: 'Todos los nodos están ordenados de izquierda a derecha'},
    {text: 'La raíz siempre es el elemento más grande'},
    {text: 'Todas las hojas están al mismo nivel'},
    {text: 'La raíz es el elemento más pequeño y la altura es O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles de las siguientes propiedades son verdaderas para un min‑heap?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En un min‑heap, la raíz siempre es el elemento más pequeño y la altura del árbol es O(log n), lo que hace que la inserción y la extracción sean eficientes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="Algoritmos de ordenamiento"
  title="Estabilidad de Bubble Sort"
  options={[
    {text: 'Inestable'},
    {text: 'Estable', isAnswer: true},
    {text: 'Depende de la implementación'},
    {text: 'Ninguno'},
    {text: 'La complejidad determina la estabilidad'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Es estable el algoritmo Bubble Sort?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Bubble Sort es un algoritmo de ordenamiento estable porque preserva el orden relativo de los elementos iguales durante la ordenación.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
