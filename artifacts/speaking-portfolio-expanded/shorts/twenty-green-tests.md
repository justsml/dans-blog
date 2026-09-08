# Twenty for Twenty, One in Seven

3 min · video · parent: [Stop Looking at My Benchmarks](../talks/benchmarks/index.md), slide 8

Twenty for twenty feels like a wrap party. Do the arithmetic and it bought you less than you think, and only if you sampled honestly, which you didn't.

## Hook

Twenty cases. All green. Ship it? Here is what twenty green cases actually establishes about your failure rate.

## Beat: the math, on camera

If the true failure probability is p, the chance of seeing zero failures in twenty independent draws is (1 − p)²⁰. Set that to 5% and solve. p ≈ 13.9%. The quick version is Hanley and Lippman-Hand's rule of three: 3/20 = 15%. So after twenty clean runs, the honest statement is "the exact upper bound is one in 7.2; about one in seven describes the scale, not the estimated rate."

## Beat: and that's the good case

That bound assumes independent, representative sampling. Your twenty are the incidents you remember, the cases your team argued about, and three you added last Tuesday. They are great at catching known mechanisms. They certify nothing about the population. More decimal places do not create more observations.

## Landing

Twenty green cases is where a test suite starts, not where confidence does. Attach the limitation to the number and go collect fresh cases from production instead of the greatest hits.

## On screen

Start with (1 − p)²⁰ = 0.05 and p = ?. Reveal p = 13.9% only after solving. Then show the rule of three: 3/20 = 15%, and **one in 7.2** as the exact-bound scale.

## Source

Hanley and Lippman-Hand (1983), If Nothing Goes Wrong, Is Everything All Right? JAMA 249(13). Card et al. (2020), With Little Power Comes Great Responsibility, EMNLP.
