# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.20
- Input tokens: 2017
- Output tokens: 1275
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000308
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Linux 服务器基准测试脚本
subTitle: 快速基准 CPU 与 HDD
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
## Linux 基准 Shell 脚本

当前测试包括来自 `sysbench` 的 CPU 与 HDD（在 Debian/Ubuntu 系统上会自动安装）。

> 目标：避免记忆性能工具的参数。使用 bash 编写。

**步骤 1：** 设置基准环境：

```sh
# 创建用于保存结果和脚本的文件夹
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**步骤 2：** 创建快捷脚本：`$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# 安装部分依赖
if [ "$(which sysbench)" == "" -o "$(which inxi)" == "" -o "$(which tcpdump)" == "" ]; then
  sudo apt-get update && apt-get install -y sysbench inxi htop iotop tcpdump hddtemp
fi
# 变量
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

**步骤 3：** 设置脚本权限

```sh
chmod +x $BENCH_DIR/*.sh
source $HOME/benchmarks/bench-library.sh
```

**步骤 4：** 创建批量运行脚本（可选）

`$HOME/benchmarks/run-bench.sh`

```sh
#!/bin/bash
set -e

source ./bench-library.sh

# 基准 HDD 速度（在当前目录）
###########
benchDisk

# 基准 CPU——尝试不同线程数（以及工作负载大小）
# 若 CPU 核心不足会自动跳过测试（避免无效测量）
# NB: 结果在不同硬件之间可比——只要 CPU 核心数相同。
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

随后添加执行权限：

```sh
chmod +x $BENCH_DIR/*.sh
```

### 使用方法

确保先 `source ~/benchmarks/bench-library.sh`，然后运行 `benchCpu` 或 `benchDisk`。

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
