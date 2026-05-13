# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/fr/index.mdx
- Validation: passed
- Runtime seconds: 6.70
- Input tokens: 2722
- Output tokens: 3105
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000963
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: Évaluez rapidement CPU & HDD
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
## Scripts Shell de Benchmark pour Linux

Les tests actuels incluent CPU & HDD depuis `sysbench` (s'installera automatiquement sur les distributions Debian/Ubuntu.)

> Objectif : Éviter de se rappeler les arguments des utilitaires de performance. Écrit en bash.

**Étape 1 :** CONFIGURATION DU BENCHMARK :

```sh
# Créer un dossier pour les résultats et les scripts
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**Étape 2 :** CRÉER LE SCRIPT RACCOURCI : `$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# Installer certaines dépendances
if [ "$(which sysbench)" == "" -o "$(which inxi)" == "" -o "$(which tcpdump)" == "" ]; then
  sudo apt-get update && apt-get install -y sysbench inxi htop iotop tcpdump hddtemp
fi
# Variables
export DATE_TAG=`date +%F` #YYYY-MM-DD
export CPU_CORES="$([ -e /proc/cpuinfo ] && grep -sc ^processor /proc/cpuinfo || sysctl -n hw.ncpu)"
export BENCH_DIR=$HOME/benchmarks/

mkdir -p $BENCH_DIR

function benchCpu() {
  thread_limit=${1:$CPU_CORES}
  prime_limit=${2:-20000}

  if [ $CPU_CORES -lt `expr 1 + $thread_limit` ]; then
    printf "\n\n${yellow}ALERTE : Tests ignorés en raison de la limite de \"${thread_limit} threads\"\n${cyan}Pas assez de cœurs CPU ($CPU_CORES)  ${reset}\n\n"
  else
    printf "\n\n${yellow}ALERTE : Tests ignorés en raison de la limite de \"${thread_limit} threads\"\n${reset}"

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


# benchDisk - teste les lectures/écritures aléatoires, séquentielles, avant le nettoyage final.
function benchDisk() {
  #   Génère des fichiers de test - jusqu'à 75 % de l'espace libre - dans le répertoire local, puis exécute les 3 tests (jusqu'à 20 minutes chacun)
  freeSpace=`df -k . | tail -1 | awk '{print $4}'`
  freeSpace="${freeSpace//G|T/}"
  testSize=$(awk "BEGIN {print ($freeSpace / 1024 / 1024) * 0.75; exit}")
  testSize=${testSize}G
  printf "####>>> \nÉcriture de $testSize de données de test dans ${PWD}...\n"

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

  printf "\n\n####>>> \nTESTS TERMINÉS ! Grand Succès !!! \n\n\n"
}
```

**Étape 3 :** Définir les permissions du script

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**Étape 4 :** Créer le script exécuteur de lots (optionnel)

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# Mesurer la vitesse du disque dur (dans le répertoire courant)
###########
benchDisk

# Benchmarker le CPU - en testant différentes configurations de cœurs (et tailles de travail)
# Il sautera automatiquement les tests si le nombre de cœurs est insuffisant (pour avoir un impact)
# NB : résultats comparables entre différentes configurations matérielles - tant qu'elles partagent le même nombre de cœurs CPU.
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

Et maintenant ajouter les permissions d'exécution :

```sh
chmod +x $BENCH_DIR/*.sh
```

### Utilisation

Assurez-vous d'exécuter `source ~/benchmarks/bench-library.sh`, puis lancez `benchCpu` ou `benchDisk`.

```sh
benchCpu 8   250000
benchCpu 16  250000
benchDisk
```

<!--# I/O - Live Monitor
1. System: iotop
1. Per command: dtrace/ltrace/strace
-->
````
