# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/hi/index.mdx
- Validation: deferred
- Runtime seconds: 0.87
- Input tokens: 2797
- Output tokens: 1367
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000355
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Linux सर्वर बेंचमार्क स्क्रिप्ट्स
subTitle: CPU और HDD को तेज़ी से बेंचमार्क करें
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
## Linux Benchmark Shell Scripts

वर्तमान परीक्षणों में CPU & HDD शामिल हैं, `sysbench` से (Debian/Ubuntu प्रकारों पर स्वचालित रूप से इंस्टॉल हो जाएगा।)

> लक्ष्य: प्रदर्शन यूटिलिटीज़ के आर्ग्युमेंट याद रखने से बचना। Bash में लिखा गया।

**Step 1:** SETUP BENCHMARK:

```sh
# Create folder for results & scripts
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**Step 2:** CREATE SHORTCUT SCRIPT: `$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# Install some deps
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


# benchDisk - tests random read & write, and sequential r, and sequential write, before final cleanup.
function benchDisk() {
  #   Generates test files - up to 75% of your free space - in local dir, then runs the 3 tests (up to 20 minutes each)
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

**Step 3:** Set script permissions

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**चरण 4:** बैच रनर स्क्रिप्ट बनाएँ (वैकल्पिक)

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# वर्तमान डायरेक्टरी में HDD गति बेंचमार्क
###########
benchDisk

# CPU बेंचमार्क – विभिन्न थ्रेड काउंट और वर्क साइज आज़माएँ
# यदि पर्याप्त कोर नहीं हैं तो टेस्ट स्वचालित रूप से स्किप हो जाएगा (प्रभाव के लिए)
# नोट: परिणाम विभिन्न हार्डवेयर पर तुलनीय होते हैं – समान CPU कोर संख्या तक।
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

और अब निष्पादन अधिकार जोड़ें:

```sh
chmod +x $BENCH_DIR/*.sh
```

### उपयोग

पहले `source ~/benchmarks/bench-library.sh` चलाएँ, फिर `benchCpu` या `benchDisk` को कॉल करें।

```sh
benchCpu 8   250000
benchCpu 16  250000
benchDisk
```

<!--# I/O - लाइव मॉनिटर
1. सिस्टम: iotop
1. प्रति कमांड: dtrace/ltrace/strace
-->
````
