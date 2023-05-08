---
title: "Pro Tip: Get Stats for Any Shell Command"
subTitle: CPU Time, Memory, Sockets and More!
date: 2023-05-06
modified: 2023-05-08
tags: [shell,bash,gnu-time,time,performance,stats,runtime,snapshots,profile]
category: performance
cover: null
---

# Pro Tip: Get Stats for Any Shell Command

```sh
❯ time sleep 2
sleep 2  0.00s user 0.00s system 0% cpu 2.013 total
```

```sh
❯ gtime -v sleep 2
  Command being timed: "sleep 2"
  User time (seconds): 0.00
  System time (seconds): 0.00
  Percent of CPU this job got: 0%
  Elapsed (wall clock) time (h:mm:ss or m:ss): 0:02.00
  Average shared text size (kbytes): 0
  Average unshared data size (kbytes): 0
  Average stack size (kbytes): 0
  Average total size (kbytes): 0
  Maximum resident set size (kbytes): 1088
  Average resident set size (kbytes): 0
  Major (requiring I/O) page faults: 2
  Minor (reclaiming a frame) page faults: 182
  Voluntary context switches: 0
  Involuntary context switches: 9
  Swaps: 0
  File system inputs: 0
  File system outputs: 0
  Socket messages sent: 0
  Socket messages received: 0
  Signals delivered: 0
  Page size (bytes): 16384
  Exit status: 0
```

As you may have noticed, the commands `time` and `gtime` are different!

`time` is a common shell builtin (in ZSH, Bash, etc), and `gnu-time` is a GNU utility with far more details.

You can install it on MacOS with `brew install gnu-time`. On Linux, you can 'override' the builtin shell alias by using `/usr/bin/time`. The [`gnu-time` manual has some helpful](https://www.gnu.org/software/time/) platform-specific instructions.

Thanks to my colleague Kevin McCormack for introducing me to [gnu-time](https://www.gnu.org/software/time/)!
