# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/ru/index.mdx
- Validation: deferred
- Runtime seconds: 6.61
- Input tokens: 2871
- Output tokens: 2924
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000931
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Скрипты бенчмаркинга сервера Linux
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
## Скрипты Shell для бенчмарков Linux

Текущие тесты включают CPU и HDD с использованием `sysbench` (автоматически устанавливается в Debian/Ubuntu).

> Цель: избежать запоминания аргументов для утилит производительности. Написано на bash.

**Шаг 1:** НАСТРОЙКА БЕНЧМАРКА:

```sh
# Создать папку для результатов и скриптов
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**Шаг 2:** СОЗДАТЬ СКРИПТ-ПОДСКАЗКУ: `$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# Установка зависимостей
if [ "$(which sysbench)" == "" -o "$(which inxi)" == "" -o "$(which tcpdump)" == "" ]; then
  sudo apt-get update && apt-get install -y sysbench inxi htop iotop tcpdump hddtemp
fi
# Переменные
export DATE_TAG=`date +%F` #YYYY-MM-DD
export CPU_CORES="$([ -e /proc/cpuinfo ] && grep -sc ^processor /proc/cpuinfo || sysctl -n hw.ncpu)"
export BENCH_DIR=$HOME/benchmarks/

mkdir -p $BENCH_DIR

function benchCpu() {
  thread_limit=${1:$CPU_CORES}
  prime_limit=${2:-20000}

  if [ $CPU_CORES -lt `expr 1 + $thread_limit` ]; then
    printf "\n\n${yellow}ПРЕДУПРЕЖДЕНИЕ: Пропуск тестов, ограниченных \"${thread_limit} тестом на поток\"\n${cyan}Недостаточно ядер CPU ($CPU_CORES)  ${reset}\n\n"
  else
    printf "\n\n${yellow}ПРЕДУПРЕЖДЕНИЕ: Пропуск тестов, ограниченных \"${thread_limit} тестом на поток\"\n${reset}"

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


# benchDisk - тесты случайного чтения/записи и последовательного чтения/записи, затем финальная очистка.
function benchDisk() {
  #   Генерирует тестовые файлы - до 75% от свободного места - в локальной папке, затем запускает 3 теста (по максимум 20 минут каждый)
  freeSpace=`df -k . | tail -1 | awk '{print $4}'`
  freeSpace="${freeSpace//G|T/}"
  testSize=$(awk "BEGIN {print ($freeSpace / 1024 / 1024) * 0.75; exit}")
  testSize=${testSize}G
  printf "####>>> \nЗапись $testSize тестовых данных в ${PWD}...\n"

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

  printf "\n\n####>>> \nТЕСТЫ ЗАВЕРШЕНЫ! Отличный успех!!! \n\n\n"
}
```

**Шаг 3:** Установить разрешения на скрипт

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**Шаг 4:** СОЗДАТЬ СКРИПТ ПАКЕТНОГО ЗАПУСКА (ОПЦИОНАЛЬНО)

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# Тестирование скорости HDD (в текущей директории)
###########
benchDisk

# Тестирование CPU - с разным количеством потоков (и размерами задач)
# Пропустит тест, если ядер недостаточно (чтобы иметь эффект)
# NB: результаты сравнимы между разными железками - до их количества ядер.
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

Теперь добавьте права на выполнение:

```sh
chmod +x $BENCH_DIR/*.sh
```

### Использование

Убедитесь, что вы выполнили `source ~/benchmarks/bench-library.sh`, затем запустите `benchCpu` или `benchDisk`.

```sh
benchCpu 8   250000
benchCpu 16  250000
benchDisk
```

<!--# Ввод-вывод - Живой монитор
1. Система: iotop
1. По команде: dtrace/ltrace/strace
-->
````
