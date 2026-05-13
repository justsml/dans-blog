# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/it/index.mdx
- Validation: deferred
- Runtime seconds: 6.91
- Input tokens: 2431
- Output tokens: 2824
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000872
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Script di Benchmarking per Server Linux
subTitle: ''
date: '2017-05-01'
modified: '2019-07-03'
category: DevOps
draft: true
publish: true
subCategory: servers
tags:
  - benchmarks
  - servers
  - performance
cover: ../rod-long-1052613-unsplash.webp
cover_mobile: ../w300_rod-long-1052613-unsplash.webp
cover_icon: ../icon_rod-long-1052613-unsplash.webp
---
## Script Shell per Benchmark su Linux

I test attuali includono CPU & HDD da `sysbench` (verrà installato automaticamente su distribuzioni Debian/Ubuntu.)

> Obiettivo: Evitare di ricordare gli argomenti per gli strumenti di prestazioni. Scritto in bash.

**Passo 1:** CONFIGURAZIONE BENCHMARK:

```sh
# Creare una cartella per i risultati e gli script
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**Passo 2:** CREARE LO SCRIPT DI RIFERIMENTO: `$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# Installa alcune dipendenze
if [ "$(which sysbench)" == "" -o "$(which inxi)" == "" -o "$(which tcpdump)" == "" ]; then
  sudo apt-get update && apt-get install -y sysbench inxi htop iotop tcpdump hddtemp
fi
# Variabili
export DATE_TAG=`date +%F` #YYYY-MM-DD
export CPU_CORES="$([ -e /proc/cpuinfo ] && grep -sc ^processor /proc/cpuinfo || sysctl -n hw.ncpu)"
export BENCH_DIR=$HOME/benchmarks/

mkdir -p $BENCH_DIR

function benchCpu() {
  thread_limit=${1:$CPU_CORES}
  prime_limit=${2:-20000}

  if [ $CPU_CORES -lt `expr 1 + $thread_limit` ]; then
    printf "\n\n${yellow}AVVISO: Salto test limitati da \"${thread_limit} thread test\"\n${cyan}Non ci sono abbastanza core CPU ($CPU_CORES)  ${reset}\n\n"
  else
    printf "\n\n${yellow}AVVISO: Salto test limitati da \"${thread_limit} thread test\"\n${reset}"

    sudo sysbench --test=cpu \
      --cpu-max-prime=${prime_limit} \
      --num-threads=${CPU_CORES} \
      run | tee -a $BENCH_DIR/results/cpu-test.log
  fi
}

# benchSingleDisk seqrd 120G 8K 300
function benchSingleDisk () {
  sudo sysbench --test=fileio --init-rng=on  --file-test-mode=${1:-seqrd} --file-block-size=${3:-64K} \
    --num-threads=${CPU_CORES} --max-time=${4:-180} --file-total-size=${2:-60G} \
    --max-requests=0 run | tee -a $BENCH_DIR/results/sysbench-fileio.log
}


# benchDisk - test di lettura e scrittura casuale, e sequenziale, prima della pulizia finale.
function benchDisk() {
  #   Genera file di test fino al 75% dello spazio libero - nella directory locale, quindi esegue i 3 test (fino a 20 minuti ciascuno)
  freeSpace=`df -k . | tail -1 | awk '{print $4}'`
  freeSpace="${freeSpace//G|T/}"
  testSize=$(awk "BEGIN {print ($freeSpace / 1024 / 1024) * 0.75; exit}")
  testSize=${testSize}G
  printf "####>>> \nScrittura di $testSize di dati di test in ${PWD}...\n"

  benchSingleDisk seqrd ${testSize} 8K 300
  benchSingleDisk seqwr ${testSize} 8K 300
  benchSingleDisk seqrw ${testSize} 8K 300
  benchSingleDisk rndrd ${testSize} 8K 300
  benchSingleDisk rndwr ${testSize} 8K 300
  benchSingleDisk rndrw ${testSize} 8K 300

  benchSingleDisk seqrd ${testSize} 64K 300
  benchSingleDisk seqwr ${testSize} 64K 300
  benchSingleDisk seqrw ${testSize} 64K 300
  benchSingleDisk rndrd ${testSize} 64K 300
  benchSingleDisk rndwr ${testSize} 64K 300
  benchSingleDisk rndrw ${testSize} 64K 300

  printf "\n\n####>>> \nTEST COMPLETATI! Grande successo!!! \n\n\n"
}
```

**Passo 3:** Impostare i permessi dello script

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**Passo 4:** CREARE LO SCRIPT PER L'ESECUZIONE BATCH (OPZIONALE)

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# Benchmark velocità HDD (nella directory corrente)
###########
benchDisk

# Benchmark CPU - testando diversi numeri di thread (e dimensioni lavoro)
# Salterà automaticamente il test se non abbiamo abbastanza core (per avere impatto)
# NB: risultati confrontabili tra diversi hardware - fino al loro stesso numero di CORE CPU.
###########
benchCpu 1
benchCpu 4
benchCpu 8  50000
benchCpu 12 100000
benchCpu 16 100000
benchCpu 32 250000
benchCpu 48 500000
benchCpu 64 2000000
```

E ora aggiungere i permessi di esecuzione:

```sh
chmod +x $BENCH_DIR/*.sh
```

### Utilizzo

Assicurarsi di eseguire `source ~/benchmarks/bench-library.sh`, quindi lanciare `benchCpu` o `benchDisk`.

```sh
benchCpu 8   250000
benchCpu 16  250000
benchDisk
```

<!--# I/O - Monitoraggio in tempo reale
1. Sistema: iotop
1. Per comando: dtrace/ltrace/strace
-->
````
