# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 23.11
- Input tokens: 9908
- Output tokens: 9458
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003063
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug from-zero-to-regex-hero-extract-url-like-strings --locale it
## Raw Output

````mdx
---
title: ''
subTitle: Estrai & Analizza Stringhe Simili a URL con una Singola Regex
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../../components/CodeTabs';

**Indice**

- 🚀 [Introduzione](#-introduzione)
- 🔍 [Estrazione degli URL dal testo](#-estrazione-degli-url-dal-testo)
- 🛳️ [La regex di 120+ byte](#️-la-regex-di-120-byte)
- 🧩 [Analisi passo per passo](#-analisi-passo-per-passo)
- 🛠️ [Esempio di parsing](#-parsing)
- ☑️ [Prossimi passi](#-prossimi-passi)
- 📝 [Riepilogo](#-riepilogo)
- 📚 [Approfondimenti](#-approfondimenti)

**TL;DR:** Vai direttamente alla [regex di 120+ byte](#️-la-regex-di-120-byte).

## 🚀 Introduzione

Estrarre gli URL dal testo grezzo può sembrare a volte un gioco noioso di whack-a-mole. La punteggiatura, le parentesi e la formattazione ambigua si combinano per frustrare i tuoi sforzi. Che tu stia sviluppando uno scraper web, un analizzatore di dati o un'applicazione di chat, estrarre correttamente gli URL è essenziale.

In questo articolo, affronteremo il problema direttamente con un approccio flessibile a due passaggi. Il nostro obiettivo è **catturare tutte le _potenziali_ stringhe simili a URL** e gestire la validazione in un processo successivo.

> 💡 **Nota:** Questo schema non è per la **_validazione_** degli URL! È intenzionalmente permissivo rispetto alla punteggiatura e agli errori di ortografia.

## 🔍 Obiettivo: Estrarre URL dal testo

Quando si estraggono URL da testo grezzo, un approccio a due passaggi è efficace:

1. **Cattura Tutto il Simile a URL**: Lancia una rete larga per acquisire tutte le stringhe che *potrebbero* essere URL. È qui che la nostra "regex da 120+ byte" eccelle.
2. **Valida**: Una volta catturati questi candidati, utilizza verifiche secondarie (es. risoluzione DNS, confronto con domini noti) per eliminare le voci non valide.

### Visualizzare la Sfida

Termini come `estrarre` e `analizzare` vengono spesso usati in modo intercambiabile, ma indicano processi distinti. Estrarre gli URL implica identificare e catturare potenziali URL da un corpo più ampio di testo. L'analisi, d'altro canto, consiste nel scomporre questi URL nelle loro parti costitutive.

Quando parlo di analisi o "parti URL", mi riferisco ai seguenti componenti:

<figure>
  <figcaption>I 5 componenti di tutti gli URL</figcaption>
![Anatomia degli URL, visualizzata](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomia degli URL, visualizzata")
</figure>

<details class="inset breakout">
  <summary>Clicca per vedere uno screenshot del matching delle sottostringhe di RegEx101.</summary>

  Prima di immergerci troppo nella regex, utilizziamo uno strumento visivo per osservare come il mio pattern cattura molte corrispondenze:

  <figure>
    <figcaption>Utilizzo di [RegEx101.com](https://regex101.com/r/jO8bC4/69) per visualizzare corrispondenze multilinea</figcaption>
    ![Anteprima delle corrispondenze multilinea di massa](../RegEx101-Matches-Screenshot.webp "Anteprima dei risultati multilinea di massa")
  </figure>
</details>

## La regex da 120+ byte

Di seguito una regex concisa progettata per estrarre e analizzare gli URL in un'unica operazione. Supporta vari protocolli, domini, percorsi e sezioni opzionali di query/fragment.

Non preoccuparti—analizzeremo passo dopo passo!

```js title="Regex per URL da 120+ byte" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibilità: ES5+

// Stesso pattern, suddiviso in nuove righe per leggibilità:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Condividi la regex più folle che hai incontrato (O scritto) nei <a href="../#post-comments">commenti qui sotto!</a> 🚀</blockquote>

## 🧩 Analisi passo per passo

Analizziamo la regex suddividendola nei suoi componenti per comprendere come funziona:

<h3>1. Protocollo (Gruppo 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Scopo:** Corrisponde alla parte del protocollo dell'URL (es. `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Spiegazione:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Corrisponde a uno o più caratteri minuscoli, cifre, trattini o punti (comuni nei protocolli).</li>
      <li><code>{`:\/{1,3}`}</code>: Corrisponde a un doppio punto seguito da uno a tre slash (<code>:/</code>, <code>://</code> o <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Dominio (Gruppo 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Scopo:** Cattura la parte del dominio o host dell'URL.</li>
  <li>
    **Spiegazione:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Corrisponde a qualsiasi carattere tranne quelli speciali specificati e gli spazi bianchi.</li>
      <li><code>[^`\/\s\]?]+</code>: Corrisponde a uno o più caratteri tranne backtick, slash, spazi bianchi o parentesi quadrate chiuse.</li>
    </ul>
  </li>
</ul>

<h3>3. Percorso (Gruppo 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li><strong>Scopo:</strong> Corrisponde al componente percorso dell'URL.</li>
  <li>
    <strong>Spiegazione:</strong>
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Corrisponde a zero o più caratteri sicuri per URL comuni nei percorsi.</li>
    </ul>
  </li>
</ul>

<h3>4. Query (Gruppo 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li><strong>Scopo:</strong> Corrisponde opzionalmente a una stringa di query, iniziando con qualsiasi carattere <code>?</code>.</li>
  <li>
    <strong>Spiegazione:</strong>
    <ul>
      <li><code>[?]?</code>: Corrisponde opzionalmente a un <code>?</code>. (Le parentesi quadrate non sono strettamente necessarie, tuttavia sono leggermente più chiare rispetto all'ultra conciso doppio <code>??</code>. Forniscono anche un parallelo visivo per il gruppo di corrispondenza successivo (simile) <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Corrisponde a zero o più caratteri che non siano hash, spazi bianchi, backtick o punto interrogativo.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Gruppo 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li><strong>Scopo:</strong> Corrisponde opzionalmente all'identificatore di frammento iniziando con un <code>#</code>.</li>
  <li>
    <strong>Spiegazione:</strong>
    <ul>
      <li><code>[#]?</code>: Corrisponde opzionalmente a un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Corrisponde a zero o più caratteri che non siano punteggiatura vietata o spazi bianchi.</li>
    </ul>
  </li>
</ul>

## 🛠️ Esempio di Parsing

## ☑️ Passi successivi

A seconda del caso d'uso, potrebbe essere necessario raffinare questa espressione regolare o aggiungere ulteriore validazione e passaggi di post-elaborazione.

### Progetti diversi, esigenze diverse

I progetti hanno requisiti e preoccupazioni di sicurezza variabili:
```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocollo
    "example.com", // Dominio
    "/path",       // Percorso
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocollo
    "files.server.org", // Dominio
    "/index",           // Percorso
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocollo
    "host",               // Dominio
    "/param;weird^stuff", // Percorso
    "",                   // Query
    ""                    // Fragment
  ]
]
```

1. **Web Scraping**: Validare gli URL per assicurarsi che siano raggiungibili e attendibili.  
2. **Elaborazione dei dati**: Estrarre gli URL da contenuti generati dagli utenti garantendo la sicurezza.  
3. **Analisi dei dati**: Filtrare duplicati o link irrilevanti per ricerche o scopi di marketing.  
4. **Applicazioni a interfaccia utente**: Iperlinkare automaticamente gli URL in app di chat o forum.  

### Post-elaborazione e Validazione  

Dopo aver raccolto potenziali URL, applicare controlli aggiuntivi:  

- **Lookup DNS**: Verificare che i domini si risolvano.  
- **Controlli di sicurezza**: Usare servizi per rilevare siti dannosi o phishing.  
- **Regole personalizzate**: Applicare filtri specifici del progetto (es. TLD consentiti, lunghezza massima URL).  

## 📝 Riepilogo  

Estrarre dati da stringhe semi-strutturate potrebbe essere la parte più soddisfacente della padronanza delle espressioni regolari.

Ecco un riepilogo dei punti chiave:

- **Usare un tool visivo per scrivere, testare** e comprendere le vostre [espressioni regolari.](https://regex101.com/r/jO8bC4/69)
- **Scomporre il problema in parti** e risolvere ciascuna parte separatamente. In un certo senso, i gruppi di cattura ci forniscono delle "indicazioni figurative" per le nostre espressioni regolari.
- **Usare espressioni di corrispondenza flessibili, evitando la conformità rigorosa alle specifiche** durante l'ingestione dei dati.
- **Applicare passaggi di convalida** dopo l'estrazione iniziale è essenziale—considerate sempre le esigenze di sicurezza e specifiche del progetto.

Seguendo questi passaggi, potrete estrarre efficacemente qualsiasi dati da stringhe semi-strutturate, creando la base per ulteriori elaborazioni e convalida.

## 📚 Approfondimenti

- Ricordatevi di giocare con una [demo interattiva su RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Domanda originale su StackOverflow e [un link alla mia risposta qui](https://stackoverflow.com/a/34669019/369727).
- [Documentazione MDN sulle Espressioni Regolari](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Tecniche Avanzate per Espressioni Regolari](https://www.regular-expressions.info): Esplorate le lookaheads, le lookbehinds e altre tecniche avanzate per corrispondenze più precise.
- [RFC 3986 - URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)
````
