# Twenty for Twenty, One in Seven

3 min · video · parent: [Stop Looking at My Benchmarks](../outlines/benchmarks-40min.md), slide 8

Twenty for twenty feels like a wrap party. Do the arithmetic and it bought you less than you think, and only if you sampled honestly, which you didn't.

## Hook

Twenty cases. All green. Ship it? Here is what twenty green cases actually establishes about your failure rate.

## Beat: the math, on camera

If the true failure probability is p, the chance of seeing zero failures in twenty independent draws is (1 − p)²⁰. Set that to 5% and solve. p ≈ 13.9%. The quick version is Hanley and Lippman-Hand's rule of three: 3/20 = 15%. So after twenty clean runs, the honest statement is "we have not ruled out failing about one time in seven."

## Beat: and that's the good case

That bound assumes independent, representative sampling. Your twenty are the incidents you remember, the cases your team argued about, and three you added last Tuesday. They are great at catching known mechanisms. They certify nothing about the population. More decimal places do not create more observations.

## Landing

Twenty green cases is where a test suite starts, not where confidence does. Attach the limitation to the number and go collect fresh cases from production instead of the greatest hits.

## On screen

(1 − p)²⁰ = 0.05 → p = 13.9%. Rule of three: 3/20 = 15%. Big text: **about one in seven**.

## Source

Hanley and Lippman-Hand (1983), If Nothing Goes Wrong, Is Everything All Right? JAMA 249(13). Card et al. (2020), With Little Power Comes Great Responsibility, EMNLP.
