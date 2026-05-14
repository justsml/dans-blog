# Translation Judge Summary

- Slug: quiz-master-modern-html5
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.20
- Input tokens: 17647
- Output tokens: 309
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009751
- Estimated cost: $0.009751

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 10.07
- Input tokens: 14614
- Output tokens: 2085
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013562
- Estimated cost: $0.013562

### Pass 2
- Runtime seconds: 2.02
- Input tokens: 17020
- Output tokens: 160
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008990
- Estimated cost: $0.008990

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title=\"\"" Replacement: "title=\"Uso de <dd>\"" Reason: The title attribute is empty in the current translation for several challenges, which degrades the UI experience compared to the English version. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ {text: 'Definición de descripción'}, {text: 'Término de descripción'}, {text: 'Visualización de datos'}, {text: 'Detalles de descripción', isAnswer: true }, ]}" Reason: The options array is empty in the current translation for most challenges, making the quiz unplayable. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "index={2} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={2} group=\"HTML Semántico Avanzado\" title=\"Uso de <figure>/<figcaption>\" options={[ {text: 'Para mostrar imágenes con información de copyright'}, {text: 'Describir imágene..." Reason: Restoring missing title and options for Challenge index 2 to make the quiz functional. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "index={3} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={3} group=\"HTML Semántico Avanzado\" title=\"Uso de <article>\" options={[ {text: 'Para contenido, barras laterales e información de copyright'}, {text: 'Una sección de conte..." Reason: Restoring missing title and options for Challenge index 3. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "index={4} group=\"HTML semántico avanzado\" title=\"\" options={[ ]}" Replacement: "index={4} group=\"HTML Semántico Avanzado\" title=\"Uso de <fieldset>/<legend>\" options={[ {text: 'Agrupar elementos de formulario bajo un título', isAnswer: true }, {text: 'Defini..." Reason: Restoring missing title and options for Challenge index 4. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "index={5} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={5} group=\"HTML Semántico Avanzado\" title=\"Propósito de <meter>\" options={[ {text: 'Una barra de progreso en unidades métricas'}, {text: 'Representar un valor numérico den..." Reason: Restoring missing title and options for Challenge index 5. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "index={6} group=\"HTML semántico\" title=\"\" options={[ ]}" Replacement: "index={6} group=\"HTML Semántico\" title=\"Uso de <source>\" options={[ {text: 'Usado para definir una fuente de datos'}, {text: 'Declarar formato(s) de archivo multimedia disponibl..." Reason: Restoring missing title and options for Challenge index 6. Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "index={7} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={7} group=\"HTML Semántico Avanzado\" title=\"Uso de <hgroup>\" options={[ {text: 'Elemento heredado, ya no se usa'}, {text: 'Para agrupar encabezados'}, {text: 'Definir una t..." Reason: Restoring missing title and options for Challenge index 7. Note: Applied exact replacement to selected MDX.
9. Pass 2: applied high priority suggestion. Match: "index={8} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={8} group=\"HTML Semántico Avanzado\" title=\"Uso de <menu>\" options={[ {text: 'Para definir una lista ordenada'}, {text: 'Para listar comandos o controles de barra de herram..." Reason: Restoring missing title and options for Challenge index 8. Note: Applied exact replacement to selected MDX.
10. Pass 2: applied high priority suggestion. Match: "index={9} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={9} group=\"HTML Semántico Avanzado\" title=\"Rol de <details>/<summary>\" options={[ {text: 'Contenido colapsable nativo', isAnswer: true }, {text: 'Tooltips nativos'}, {text..." Reason: Restoring missing title and options for Challenge index 9. Note: Applied exact replacement to selected MDX.
11. Pass 2: applied high priority suggestion. Match: "index={10} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={10} group=\"HTML Semántico Avanzado\" title=\"Propósito de <dialog>\" options={[ {text: 'Formato para guionistas'}, {text: 'Declarar un modal o ventana emergente', isAnswer: ..." Reason: Restoring missing title and options for Challenge index 10. Note: Applied exact replacement to selected MDX.
12. Pass 2: applied high priority suggestion. Match: "index={11} group=\"HTML Semántico Avanzado\" title=\"\" options={[ ]}" Replacement: "index={11} group=\"HTML Semántico Avanzado\" title=\"Uso de <time>\" options={[ {text: 'Para representar fecha y hora', isAnswer: true }, {text: 'Para definir una marca de tiempo'},..." Reason: Restoring missing title and options for Challenge index 11. Note: Applied exact replacement to selected MDX.
13. Pass 2: applied high priority suggestion. Match: "index={12} group=\"HTML semántico avanzado\" title=\"Propósito de los atributos ARIA\" options={[ ]}" Replacement: "index={12} group=\"HTML Semántico Avanzado\" title=\"Propósito de los atributos ARIA\" options={[ {text: 'Ayudantes para dispositivos táctiles'}, {text: 'Mejorar la accesibilidad', ..." Reason: Restoring missing options for Challenge index 12. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-01--quiz-master-modern-html5/es/index.mdx
- 5a64b4b5ce5194b05f06cb6deedfd1d06e1c957d i18n candidate(es): quiz-master-modern-html5 via openrouter/openai/gpt-oss-120b:nitro
- 41ceb27bd1a83686ea4bc0f324e6714548dccbb6 i18n candidate(es): quiz-master-modern-html5 via openrouter/qwen/qwen3-32b:nitro
