# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/es/index.mdx
- Validation: deferred
- Runtime seconds: 128.59
- Input tokens: 14956
- Output tokens: 15266
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005325
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Cuestionario: Estructuras de datos y algoritmos'
subTitle: ¿Puedes hacer una BFS en un árbol binario?
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<section class="inset">
  ¡Bienvenido a mi cuestionario sobre estructuras de datos y algoritmos!
</section>

Este cuestionario evaluará tu conocimiento sobre estructuras de datos (Pilas, Listas, Árboles, etc.), algoritmos y complejidad temporal.

### 20 preguntas... ¡Comencemos!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Estructuras de Datos"
  title="Colas vs Pilas"
  options={[
    {text: 'Ambos'},
    {text: 'Colas'},
    {text: 'Pilas', isAnswer: true},
    {text: 'Ninguno'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos es más adecuada para un patrón de acceso LIFO (Last In, First Out)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las pilas son más adecuadas para patrones de acceso LIFO. Las colas son más adecuadas para patrones de acceso FIFO (First In, First Out).
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
    ¿Cuál es la complejidad temporal de un algoritmo que siempre tarda el mismo tiempo en ejecutarse, independientemente del tamaño de la entrada?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) representa una complejidad temporal constante. Significa que el algoritmo siempre tarda el mismo tiempo en ejecutarse, sin importar el tamaño de la entrada.
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
    {text: 'O(n²)'},
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
    Para calcular la longitud de una lista enlazada simple, debes recorrer cada nodo desde la cabeza hasta la cola, lo que resulta en una complejidad temporal de O(n).
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
    ¿Cuál es la complejidad temporal promedio para buscar un elemento en un Árbol Binario de Búsqueda equilibrado?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En un BST equilibrado, la complejidad temporal promedio para la búsqueda es O(log n) porque cada nivel permite reducir a la mitad el espacio de búsqueda.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Algoritmos de ordenamiento"
  title="Complejidad del algoritmo Merge Sort"
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
    Merge Sort siempre opera con una complejidad en el peor caso de O(n log n) ya que divide repetidamente el array a la mitad y fusiona los subarrays ordenados.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Grafos"
  title="DFS vs BFS"
  options={[
    {text: 'Queue', isAnswer: true},
    {text: 'Stack'},
    {text: 'Priority Queue'},
    {text: 'Hash Map'},
    {text: 'Set'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos se utiliza típicamente para implementar la Búsqueda en Anchura (BFS)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS utiliza una Cola para explorar nodos nivel por nivel, procesando nodos en un orden breadth-first (por 'fila').
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gráficos"
  title="Detección de ciclos en gráficos"
  options={[
    {text: 'Ordenación rápida'},
    {text: 'Búsqueda en anchura'},
    {text: 'Ordenación por mezcla'},
    {text: 'Búsqueda en profundidad', isAnswer: true},
    {text: 'Ordenación por burbuja'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué algoritmo se utiliza comúnmente para detectar ciclos en un grafo dirigido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La Búsqueda en profundidad (DFS) se utiliza típicamente para detectar ciclos en un grafo manteniendo una pila de recursión para rastrear los nodos visitados.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Algoritmos de Ordenamiento"
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
    ¿Cuál es la complejidad temporal en el peor caso de Heap Sort?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Heap Sort mantiene una complejidad temporal en el peor caso de O(n log n), ya que construye un montículo y extrae repetidamente el elemento máximo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Estructuras de Datos"
  title="Complejidad Temporal de la Tabla Hash"
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
    ¿Cuál es la complejidad temporal promedio para acceder a un elemento en una tabla hash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las tablas hash tienen una complejidad temporal promedio de O(1) para acceder a elementos, suponiendo una función hash adecuada que minimice las colisiones.
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
    {text: 'Encolar, Desencolar, Peek'},
    {text: 'Insertar, Buscar, Eliminar'},
    {text: 'Recorrer, Visitar, Clasificar'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál conjunto contiene operaciones típicas realizadas en una pila?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las operaciones principales de una pila son Push (agregar elemento), Pop (eliminar elemento) y Peek (ver el elemento superior sin eliminarlo).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Algoritmos de Grafos"
  title="Algoritmo del Camino Más Corto"
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
    ¿Qué algoritmo se utiliza comúnmente para encontrar el camino más corto en un grafo ponderado con bordes no negativos?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dijkstra's Algorithm se usa con frecuencia para encontrar el camino más corto en grafos con pesos de aristas no negativos. Emplea una cola de prioridad para determinar la distancia más corta de manera eficiente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Estructuras de datos de árboles"
  title="Árboles de búsqueda autoequilibrados"
  options={[
    {text: 'Árbol de búsqueda binaria y Cola de prioridad mínima'},
    {text: 'Árbol AVL y Árbol rojo-negro', isAnswer: true},
    {text: 'Cola de prioridad mínima y Cola de prioridad máxima'},
    {text: 'Pila y Cola'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto contiene ejemplos de estructuras de datos de árboles de búsqueda autoequilibrados?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los árboles AVL y los árboles rojo-negro son tipos de árboles autoequilibrados, que garantizan que el árbol permanezca equilibrado después de cada inserción o eliminación.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Recursión"
  title="Caso base en recursión"
  options={[
    {text: 'Bucle infinito'},
    {text: 'Stack Overflow'},
    {text: 'Caso base', isAnswer: true},
    {text: 'Variable global'},
    {text: 'Limitación de alcance'},
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
    {text: 'Apilar y Desapilar'},
    {text: 'Vista previa y Tope'},
    {text: 'Recorrer y Ordenar'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son las dos operaciones principales para una cola?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las dos operaciones principales en una cola son Encolar (agregar un elemento al final) y Desencolar (eliminar un elemento del frente).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Algoritmos de grafos"
  title="Clasificación topológica"
  options={[
    {text: 'El grafo debe contener ciclos'},
    {text: 'El grafo debe ser ponderado y conexo'},
    {text: 'El grafo debe ser no dirigido y acíclico'},
    {text: 'El grafo debe ser dirigido y acíclico', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son las condiciones para realizar una clasificación topológica en un grafo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clasificación topológica se puede realizar en un grafo si es dirigido y acíclico (DAG). Este tipo de ordenamiento es útil en problemas de programación de tareas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Programación dinámica"
  title="Complejidad de la recursión de Fibonacci"
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
    La implementación recursiva ingenua de la serie de Fibonacci tiene una complejidad temporal de O(2^n) debido a los cálculos repetidos extensos para cada número de Fibonacci.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="Estructuras de Datos"
  title="Implementación de Cola de Prioridad"
  options={[
    {text: 'Arreglo'},
    {text: 'Pila'},
    {text: 'Montículo', isAnswer: true},
    {text: 'Cola'},
    {text: 'Lista Enlazada'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué estructura de datos se utiliza comúnmente para implementar una cola de prioridad?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Una cola de prioridad se implementa con mayor frecuencia usando un montículo porque permite la extracción eficiente del elemento de mayor o menor prioridad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="Estructuras de datos"
  title="Recorridos de árboles binarios"
  options={[
    {text: 'In-order, Pre-order, Post-order', isAnswer: true},
    {text: 'Breadth-First, Depth-First, Heapify'},
    {text: 'Sort, Search, Rotate'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál conjunto enumera los órdenes comunes de recorrido en profundidad para un árbol binario?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In-order, Pre-order y Post-order son los tres órdenes comunes de recorrido en profundidad para árboles binarios, cada uno con un orden diferente para visitar los nodos. El recorrido en anchura también es común, pero pertenece a una categoría de recorrido diferente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="Estructuras de Datos de Árbol"
  title="Propiedad del Montículo"
  options={[
    {text: 'Todos los nodos están ordenados de izquierda a derecha'},
    {text: 'La raíz siempre es el elemento más grande'},
    {text: 'Todas las hojas están al mismo nivel'},
    {text: 'La raíz es el elemento más pequeño y la altura es O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de las siguientes propiedades es verdadera para un montículo mínimo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En un montículo mínimo, la raíz siempre es el elemento más pequeño y la altura del árbol es O(log n), lo que hace que la inserción y la extracción sean eficientes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="Algoritmos de ordenamiento"
  title="Estabilidad del algoritmo de ordenamiento Burbuja"
  options={[
    {text: 'Inestable'},
    {text: 'Estable', isAnswer: true},
    {text: 'Depende de la implementación'},
    {text: 'Ninguna de las anteriores'},
    {text: 'La complejidad determina la estabilidad'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Es el algoritmo de ordenamiento Burbuja estable?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El algoritmo de Burbuja es un algoritmo de ordenamiento estable ya que mantiene el orden relativo de los elementos iguales durante el ordenamiento.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
