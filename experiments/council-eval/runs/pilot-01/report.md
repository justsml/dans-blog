# Council eval: pilot-01

Split: **all**. Rows scored: 254.

## review · claude

| Arm | Weighted recall | Recall | Precision | Hi-sev false alarms / case | Clean-control false alarms | Cost / case | Critical path | Failures | Canary |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| F1 | 100.0% | 100.0% | 58.8% | 0.00 | 0.00 | $0.085 | 29s | 0/13 | 0 |
| M3council | 100.0% | 100.0% | 53.4% | 0.00 | 0.00 | $0.153 | 39s | 0/13 | n/a |
| M1 | 100.0% | 100.0% | 58.2% | 0.00 | 0.00 | $0.032 | 16s | 0/13 | 0 |
| M3same | 100.0% | 100.0% | 56.4% | 0.00 | 0.00 | $0.133 | 34s | 0/13 | 0 |
| M3style | 100.0% | 100.0% | 54.6% | 0.00 | 0.00 | $0.144 | 36s | 0/13 | n/a |
| M1R | 100.0% | 100.0% | 56.2% | 0.00 | 0.00 | $0.070 | 34s | 0/13 | 0 |

| Contrast | n cases | Mean diff | 95% CI | p (boot, Holm) | Wilcoxon p | Cost ratio |
|---|---:|---:|---|---:|---:|---:|
| M3council − F1 (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.80× |
| M3council − M3same (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.15× |
| M3council − M3style (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.06× |
| M3council − M1R (secondary) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.19× |
| F1 − M1 (secondary) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.68× |

### Recall by defect class (H4)

| Class | aligned | F1 | M3council | M1 | M3same | M3style | M1R |
|---|---|---:|---:|---:|---:|---:|---:|
| cost | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| data-migration | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| edge-case | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| failure-mode | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| performance | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| security | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| state | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

H4 vs F1: aligned-class delta 0.0%, unaligned-class delta 0.0%.
H4 vs M3same: aligned-class delta 0.0%, unaligned-class delta 0.0%.

Judge agreement on defect matches: 98.6% over 138 decisions, Cohen's κ = 0.00.

### By case author

| Author | F1 | M3council | M1 | M3same | M3style | M1R |
|---|---:|---:|---:|---:|---:|---:|
| claude | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| codex | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

## review · codex

| Arm | Weighted recall | Recall | Precision | Hi-sev false alarms / case | Clean-control false alarms | Cost / case | Critical path | Failures | Canary |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M1 | 100.0% | 100.0% | 83.3% | 0.00 | 0.00 | $0.016 | 21s | 0/13 | 0 |
| M3council | 100.0% | 100.0% | 75.6% | 0.00 | 0.00 | $0.060 | 48s | 0/13 | n/a |
| F1 | 100.0% | 100.0% | 84.6% | 0.00 | 0.00 | $0.356 | 35s | 0/13 | 0 |
| M3style | 100.0% | 100.0% | 89.7% | 0.00 | 0.00 | $0.049 | 51s | 0/13 | n/a |
| M3same | 100.0% | 100.0% | 80.1% | 0.00 | 0.00 | $0.053 | 53s | 0/13 | 0 |
| M1R | 100.0% | 100.0% | 80.1% | 0.00 | 0.00 | $0.026 | 48s | 0/13 | 0 |

| Contrast | n cases | Mean diff | 95% CI | p (boot, Holm) | Wilcoxon p | Cost ratio |
|---|---:|---:|---|---:|---:|---:|
| M3council − F1 (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 0.17× |
| M3council − M3same (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.14× |
| M3council − M3style (**primary**) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.22× |
| M3council − M1R (secondary) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.33× |
| F1 − M1 (secondary) | 11 | 0.000 | [0.000, 0.000] | 1.000 | – | 22.28× |

### Recall by defect class (H4)

| Class | aligned | M1 | M3council | F1 | M3style | M3same | M1R |
|---|---|---:|---:|---:|---:|---:|---:|
| cost | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| data-migration | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| edge-case | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| failure-mode | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| performance | no | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| security | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| state | yes | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

H4 vs F1: aligned-class delta 0.0%, unaligned-class delta 0.0%.
H4 vs M3same: aligned-class delta 0.0%, unaligned-class delta 0.0%.

Judge agreement on defect matches: 95.7% over 138 decisions, Cohen's κ = 0.00.

### By case author

| Author | M1 | M3council | F1 | M3style | M3same | M1R |
|---|---:|---:|---:|---:|---:|---:|
| claude | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| codex | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

## plan · claude

| Arm | Hidden tests passed | Requirement coverage | Cost / case (plan) | Implementer cost | Critical path | Failures | Canary |
|---|---:|---:|---:|---:|---:|---:|---:|
| M3same | 97.1% | 94.8% | $0.264 | $0.038 | 71s | 0/7 | 0 |
| F1 | 97.1% | 97.1% | $0.129 | $0.037 | 49s | 0/7 | 0 |
| P0 | 94.3% | – | $0.000 | $0.029 | 0s | 0/7 | 0 |
| M1 | 97.1% | 97.1% | $0.062 | $0.035 | 36s | 0/7 | 0 |
| M1R | 97.1% | 97.1% | $0.138 | $0.036 | 75s | 0/7 | 0 |
| M3style | 94.3% | 94.3% | $0.257 | $0.039 | 69s | 0/7 | n/a |
| M3council | 97.1% | 97.1% | $0.277 | $0.037 | 79s | 0/7 | n/a |

| Contrast | n cases | Mean diff | 95% CI | p (boot, Holm) | Wilcoxon p | Cost ratio |
|---|---:|---:|---|---:|---:|---:|
| M3council − F1 (**primary**) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.14× |
| M3council − M3same (**primary**) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.05× |
| M3council − M3style (**primary**) | 7 | 0.029 | [0.000, 0.086] | 1.000 | – | 1.08× |
| M3council − M1R (secondary) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.01× |
| F1 − M1 (secondary) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 2.08× |
| M1 − P0 (secondary) | 7 | 0.029 | [0.000, 0.086] | 0.691 | – | Infinity× |

### By case author

| Author | M3same | F1 | P0 | M1 | M1R | M3style | M3council |
|---|---:|---:|---:|---:|---:|---:|---:|
| claude | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |
| codex | 93.3% | 93.3% | 86.7% | 93.3% | 93.3% | 86.7% | 93.3% |

## plan · codex

| Arm | Hidden tests passed | Requirement coverage | Cost / case (plan) | Implementer cost | Critical path | Failures | Canary |
|---|---:|---:|---:|---:|---:|---:|---:|
| P0 | 91.4% | – | $0.000 | $0.028 | 0s | 0/7 | 0 |
| M3style | 97.6% | 97.6% | $0.059 | $0.049 | 87s | 0/7 | n/a |
| M1R | 97.6% | 97.6% | $0.029 | $0.045 | 69s | 0/7 | 0 |
| M1 | 97.6% | 97.6% | $0.015 | $0.046 | 35s | 0/7 | 0 |
| M3council | 97.6% | 94.8% | $0.053 | $0.048 | 90s | 0/7 | n/a |
| F1 | 100.0% | 100.0% | $0.264 | $0.042 | 63s | 0/7 | 0 |
| M3same | 97.6% | 94.8% | $0.051 | $0.047 | 81s | 0/7 | 0 |

| Contrast | n cases | Mean diff | 95% CI | p (boot, Holm) | Wilcoxon p | Cost ratio |
|---|---:|---:|---|---:|---:|---:|
| M3council − F1 (**primary**) | 7 | -0.024 | [-0.071, 0.000] | 1.000 | – | 0.20× |
| M3council − M3same (**primary**) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.03× |
| M3council − M3style (**primary**) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 0.90× |
| M3council − M1R (secondary) | 7 | 0.000 | [0.000, 0.000] | 1.000 | – | 1.85× |
| F1 − M1 (secondary) | 7 | 0.024 | [0.000, 0.071] | 0.672 | – | 17.65× |
| M1 − P0 (secondary) | 7 | 0.062 | [-0.048, 0.200] | 0.325 | – | Infinity× |

### By case author

| Author | P0 | M3style | M1R | M1 | M3council | F1 | M3same |
|---|---:|---:|---:|---:|---:|---:|---:|
| claude | 100.0% | 95.8% | 95.8% | 95.8% | 95.8% | 100.0% | 95.8% |
| codex | 80.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% |

## Reading this report

- Review primary metric: severity-weighted recall of seeded defects (clean controls excluded). Plan primary metric: share of hidden acceptance tests passing after the fixed implementer executes the plan.
- A failed or refused final answer scores 0. Costs are list prices from token counts; `?` means the price table has no entry.
- Canary: runs whose output names the council skill or its personas without being told to. Must be 0 for the result to stand.
- Headline numbers come from the held-out split. Dev-split numbers may reflect prompt tuning.
