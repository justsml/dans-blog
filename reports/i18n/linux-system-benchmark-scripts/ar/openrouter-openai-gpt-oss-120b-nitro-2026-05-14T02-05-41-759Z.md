# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/ar/index.mdx
- Validation: deferred
- Runtime seconds: 4.60
- Input tokens: 2991
- Output tokens: 1430
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000374
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: نصوص قياس أداء خوادم لينكس
subTitle: قياس CPU و HDD بسرعة
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
## سكريبتات شل لقياس أداء لينكس

الاختبارات الحالية تشمل CPU و HDD من `sysbench` (سيتم تثبيتها تلقائيًا على توزيعات Debian/Ubuntu).

> الهدف: تجنّب حفظ الوسائط الخاصة بأدوات الأداء. مكتوبة بـ bash.

**الخطوة 1:** إعداد بيئة القياس:

```sh
# إنشاء مجلد للنتائج والسكريبتات
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**الخطوة 2:** إنشاء سكريبت الاختصار: `$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# تثبيت بعض الاعتمادات
if [ "$(which sysbench)" == "" -o "$(which inxi)" == "" -o "$(which tcpdump)" == "" ]; then
  sudo apt-get update && apt-get install -y sysbench inxi htop iotop tcpdump hddtemp
fi
# المتغيّرات
export DATE_TAG=`date +%F` #YYYY-MM-DD
export CPU_CORES="$([ -e /proc/cpuinfo ] && grep -sc ^processor /proc/cpuinfo || sysctl -n hw.ncpu)"
export BENCH_DIR=$HOME/benchmarks/

mkdir -p $BENCH_DIR

function benchCpu() {
  thread_limit=${1:$CPU_CORES}
  prime_limit=${2:-20000}

  if [ $CPU_CORES -lt `expr 1 + $thread_limit` ]; then
    printf "\n\n${yellow}ALERT: Skipping tests limited by \"${thread_limit} thread test\"\n${cyan}Not enough CPU Cores ($CPU_CORES)  ${reset}\n\n"
  else
    printf "\n\n${yellow}ALERT: Skipping tests limited by \"${thread_limit} thread test\"\n${reset}"

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


# benchDisk - اختبارات القراءة والكتابة العشوائية، والقراءة المتسلسلة، والكتابة المتسلسلة، ثم التنظيف النهائي.
function benchDisk() {
  #   يولّد ملفات اختبار - حتى 75 % من مساحة التخزين الفارغة - في الدليل المحلي، ثم ينفّذ الاختبارات الثلاث (حتى 20 دقيقة لكل منها)
  freeSpace=`df -k . | tail -1 | awk '{print $4}'`
  freeSpace="${freeSpace//G|T/}"
  testSize=$(awk "BEGIN {print ($freeSpace / 1024 / 1024) * 0.75; exit}")
  testSize=${testSize}G
  printf "####>>> \nWriting $testSize test data to ${PWD}...\n"

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

  printf "\n\n####>>> \nCOMPLETED TESTS! Great Success!!! \n\n\n"
}
```

**الخطوة 3:** ضبط أذونات السكريبت

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**الخطوة 4:** إنشاء سكريبت تشغيل دفعي (اختياري)

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# قياس سرعة HDD (في الدليل الحالي)
###########
benchDisk

# قياس CPU - تجربة عدد مختلف من الخيوط (وأحجام العمل)
# سيتخطى الاختبار تلقائيًا إذا لم تتوفر عدد كافٍ من الأنوية (لتكون ذات تأثير)
# ملاحظة: النتائج قابلة للمقارنة بين عتاد مختلف - حتى عدد أنوية CPU نفسه.
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

ثم أضف أذونات التنفيذ:

```sh
chmod +x $BENCH_DIR/*.sh
```

### الاستخدام

تأكد من `source ~/benchmarks/bench-library.sh`، ثم شغِّل `benchCpu` أو `benchDisk`.

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
