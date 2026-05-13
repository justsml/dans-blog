# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/es/index.mdx
- Validation: deferred
- Runtime seconds: 372.91
- Input tokens: 16277
- Output tokens: 71528
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.073970
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Cuestionario: Estructuras de datos y algoritmos'
subTitle: ¿Puedes inventarte un Árbol Binario?
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<section class="inset">
  Bienvenido a mi evaluación de Estructuras de Datos y Algoritmos.
</section>

Esta evaluación validará tu dominio práctico de estructuras de datos (Pilas, Listas, Árboles, etc.), algoritmos (), y complejidad temporal. El enfoque es estrictamente técnico: prioriza la eficiencia operativa, la gestión correcta de memoria y la escalabilidad sobre la sintaxis vacía. Responde con precisión para validar tu nivel de competencia antes de abordar sistemas de producción.

### 20 Preguntas... ¡Comienza!
---

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
    Las pilas están diseñadas para procesar datos en orden LIFO. Las colas, por su parte, están hechas para seguir el orden FIFO (First In, First Out).
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
    ¿Qué complejidad temporal tiene un algoritmo que siempre tarda lo mismo en ejecutarse, sin importar qué tan grande sea la entrada?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) denota complejidad temporal constante. Significa que el tiempo de ejecución no depende del tamaño de la entrada: el algoritmo siempre realiza la misma cantidad de operaciones, sin importar cuántos datos reciba.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Estructuras de datos"
  title="Cálculo de la longitud de una lista simplemente enlazada"
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
    ¿Cuál es la complejidad temporal de calcular la longitud de una lista simplemente enlazada?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Para determinar la longitud, es obligatorio recorrer cada nodo desde la cabeza hasta la cola. No hay atajos ni índices que permitan saltar el recorrido, por lo que la complejidad temporal es O(n).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Estructuras de Datos"
  title="Búsqueda en un Árbol Binario de Búsqueda"
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
    En un BST equilibrado, la complejidad temporal promedio para la búsqueda es O(log n) porque cada nivel permite reducir el espacio de búsqueda a la mitad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Algoritmos de Ordenamiento"
  title="Complejidad del Merge Sort"
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
    Merge Sort siempre opera con una complejidad en el peor caso de O(n log n), ya que divide el arreglo repetidamente a la mitad y fusiona los subarreglos ordenados.
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
    ¿Qué estructura de datos se utiliza típicamente para implementar la búsqueda en anchura (BFS)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS emplea una Cola para explorar los nodos nivel por nivel, procesándolos de manera amplia (por "fila").
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Grafos"
  title="Detección de ciclos en grafos"
  options={[
    {text: 'Quicksort'},
    {text: 'Búsqueda en anchura'},
    {text: 'Quicksort'},
    {text: 'Búsqueda en profundidad', isAnswer: true},
    {text: 'Ordenamiento burbuja'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué algoritmo se usa comúnmente para detectar ciclos en un grafo dirigido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La Búsqueda en Profundidad (DFS) es el método típico para detectar ciclos en un grafo, ya que mantiene una pila de recursión para rastrear los nodos visitados y identificar retrocesos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Algoritmos de Ordenamiento"
  title="Complejidad del Heap Sort"
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
    ¿Cuál es la complejidad temporal del Heap Sort en el peor de los casos?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El Heap Sort garantiza una complejidad temporal de O(n log n) en el peor caso, ya que la estructura de montículo y las extracciones repetidas del elemento máximo mantienen un rendimiento predecible y evitan la degradación cuadrática.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Estructuras de datos"
  title="Complejidad temporal de las tablas hash"
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
    ¿Cuál es la complejidad temporal promedio al acceder a un elemento en una tabla hash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las tablas hash ofrecen una complejidad temporal promedio de O(1) para acceder a elementos, siempre que se utilice una función hash adecuada que minimice las colisiones.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Estructuras de datos"
  title="Operaciones de pila"
  options={[
    {text: 'Apilar, Desapilar, Consultar', isAnswer: true},
    {text: 'Encolar, Desencolar, Consultar'},
    {text: 'Insertar, Buscar, Eliminar'},
    {text: 'Recorrer, Visitar, Ordenar'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto incluye las operaciones típicas de una pila?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las operaciones principales de una pila son Push (agregar un elemento), Pop (eliminar un elemento) y Peek (consultar el elemento superior sin eliminarlo). Esto se debe a que una pila funciona bajo el principio LIFO, donde el último elemento en entrar es el primero en salir.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Algoritmos de grafos"
  title="Algoritmo de camino más corto"
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
    ¿Qué algoritmo se usa comúnmente para encontrar el camino más corto en un grafo ponderado con aristas no negativas?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El algoritmo de Dijkstra es el estándar para encontrar el camino más corto en grafos con aristas de peso no negativo. Utiliza una cola de prioridad para calcular la distancia mínima de manera eficiente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Estructuras de datos de árbol"
  title="Árboles de búsqueda autoequilibrados"
  options={[
    {text: 'Árbol de búsqueda binario y montículo mínimo'},
    {text: 'Árbol AVL y árbol rojo-negro', isAnswer: true},
    {text: 'Montículo mínimo y montículo máximo'},
    {text: 'Pila y cola'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto contiene ejemplos de árboles binarios de búsqueda autoequilibrados?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los árboles AVL y los árboles rojo-negro son tipos de árboles autoequilibrados. Su diseño garantiza que la estructura se mantenga balanceada tras cada inserción o eliminación, lo cual es esencial para preservar la eficiencia de las operaciones.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Recursión"
  title="Caso base de la recursión"
  options={[
    {text: 'Bucle infinito'},
    {text: 'Desbordamiento de pila'},
    {text: 'Caso base', isAnswer: true},
    {text: 'Variable global'},
    {text: 'Limitación de ámbito'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué debe definirse en una función recursiva para evitar la recursión infinita?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un caso base es obligatorio en una función recursiva para detener las llamadas recursivas al cumplirse una condición específica, evitando así la recursión infinita.
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
    {text: 'Consultar y Obtener el tope'},
    {text: 'Recorrer y Ordenar'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son las dos operaciones fundamentales de una cola?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las dos operaciones que definen una cola son Encolar (añadir un elemento al final) y Desencolar (eliminar un elemento del frente).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Algoritmos de grafos"
  title="Ordenación topológica"
  options={[
    {text: 'El grafo debe contener ciclos'},
    {text: 'El grafo debe estar ponderado y ser conexo'},
    {text: 'El grafo debe ser no dirigido y acíclico'},
    {text: 'El grafo debe ser dirigido y acíclico', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué condiciones debe cumplir un grafo para aplicar un ordenamiento topológico?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El ordenamiento topológico solo es posible en grafos dirigidos y acíclicos (DAG). Esta restricción es fundamental porque elimina los ciclos, garantizando un orden de ejecución sin dependencias circulares, lo que lo hace ideal para planificar tareas.
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
    La implementación recursiva ingenua de la serie de Fibonacci presenta una complejidad temporal de O(2^n) debido a la enorme cantidad de cálculos repetidos que se realizan para cada número de Fibonacci.
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
    Una cola de prioridad se implementa casi siempre con un montículo, ya que esta estructura permite extraer de manera eficiente el elemento de mayor o menor prioridad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="Estructuras de Datos"
  title="Recorridos de Árboles Binarios"
  options={[
    {text: 'En orden, Preorden, Postorden', isAnswer: true},
    {text: 'Por anchura, Por profundidad, Heapify'},
    {text: 'Ordenar, Buscar, Rotar'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos conjuntos enumera los recorridos por profundidad estándar en un árbol binario?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En orden, Preorden y Postorden son los tres recorridos por profundidad estándar en árboles binarios, cada uno definiendo un orden distinto para visitar los nodos. El recorrido por anchura es común, pero pertenece a una categoría de exploración diferente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="Estructuras de datos de árbol"
  title="Propiedad del heap"
  options={[
    {text: 'Todos los nodos están ordenados de izquierda a derecha'},
    {text: 'La raíz es siempre el elemento más grande'},
    {text: 'Todas las hojas están en el mismo nivel'},
    {text: 'La raíz es el elemento más pequeño y la altura es O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de las siguientes propiedades es verdadera para un min-heap?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En un min-heap, la raíz siempre contiene el elemento más pequeño y la altura del árbol es O(log n), lo que garantiza que las inserciones y extracciones sean eficientes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="Algoritmos de Ordenamiento"
  title="Estabilidad del Ordenamiento Burbuja"
  options={[
    {text: 'Inestable'},
    {text: 'Estable', isAnswer: true},
    {text: 'Depende de la implementación'},
    {text: 'Ninguna'},
    {text: 'La complejidad determina la estabilidad'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿El algoritmo Bubble Sort es estable?
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
