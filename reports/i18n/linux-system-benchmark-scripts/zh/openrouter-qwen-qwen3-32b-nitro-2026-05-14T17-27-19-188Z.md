# Translation Candidate
- Slug: linux-system-benchmark-scripts
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-01--linux-system-benchmark-scripts/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.23
- Input tokens: 1972
- Output tokens: 2150
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000674
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Linux服务器基准测试脚本
subTitle: 快速基准测试 CPU 和 HDD
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
## Linux 基准测试 Shell 脚本

当前测试包括来自 `sysbench` 的 CPU 和 HDD 测试（将在 Debian/Ubuntu 系统上自动安装。）

> 目标：避免记忆性能工具的参数。使用 bash 编写。

**步骤 1：** 设置基准测试环境：

```sh
# 创建结果和脚本文件夹
export BENCH_DIR=$HOME/benchmarks
mkdir -p $BENCH_DIR/results
```

**步骤 2：** 创建快捷脚本：`$HOME/benchmarks/bench-library.sh`

```sh
#!/bin/bash
set -e

# 安装依赖项
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
    printf "\n\n${yellow}警告：跳过由 \"${thread_limit} 线程测试\" 限制的测试\n${cyan}CPU 核心不足 ($CPU_CORES)  ${reset}\n\n"
  else
    printf "\n\n${yellow}警告：跳过由 \"${thread_limit} 线程测试\" 限制的测试\n${reset}"

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


# benchDisk - 测试随机读写和顺序读写，最后进行清理。
function benchDisk() {
  #   在本地目录生成测试文件（最多使用 75% 的可用空间），然后运行 3 个测试（每个测试最多 20 分钟）
  freeSpace=`df -k . | tail -1 | awk '{print $4}'`
  freeSpace="${freeSpace//G|T/}"
  testSize=$(awk "BEGIN {print ($freeSpace / 1024 / 1024) * 0.75; exit}")
  testSize=${testSize}G
  printf "####>>> \n正在将 $testSize 测试数据写入 ${PWD}...\n"

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

  printf "\n\n####>>> \n测试完成！大功告成！！！\n\n\n"
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

# 硬盘速度基准测试（在当前目录中）
###########
benchDisk

# CPU 基准测试 - 尝试不同的线程数（和工作负载大小）
# 如果核心数不足（无法产生影响），它会自动跳过测试
# 注意：不同硬件之间的结果具有可比性 - 限于相同的 CPU 核心数。
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

现在添加执行权限：

```sh
chmod +x $BENCH_DIR/*.sh
```

### 使用方法

确保执行 `source ~/benchmarks/bench-library.sh`，然后运行 `benchCpu` 或 `benchDisk`。

```sh
benchCpu 8   250000
benchCpu 16  250000
benchDisk
```

<!--# I/O - 实时监控
1. 系统：iotop
1. 按命令：dtrace/ltrace/strace
-->
````
