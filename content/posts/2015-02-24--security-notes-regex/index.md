---
layout: post
title:  "Security Notes: RegEx"
subTitle: Even RegEx can be vulnerable
date: 2015-02-24
modified: 2018-10-01
category: security
tags: [security, regex, dos, remote-exploit]
cover_credit: Photo by Markus Spiske on Unsplash
cover: markus-spiske-666905-unsplash.jpg
---

# Denial-of-Service Regex Vulnerability

![credit: markus-spiske-666905-unsplash.jpg](markus-spiske-666905-unsplash.jpg)

One of the more suprising, and yet hard-to-spot vulnerabilities I've found is related to regular expressions.
Either poorly written or poorly implemented.

Memory/CPU can be exhausted with large or specially crafted user input.

## Warning Signs

1. You have multiple capture groups
2. Global matching
3. Expression is used with un-checked user input

## Mitigation / Resolution

1. RegEx is hard
    1.  For example, here is how the really smart folks at [OWASP recommend handling IP validation][owasp]: ```^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$```
    2.  That's longer than a tweet, for a 4-byte IP Address!!!
2. Make sure user input isn't unduly long, when I know input data is reliably less than 40 chars, I'll make sure I prevent anything over 64 - otherwise, an attacker could overwhelm my system with a flood of 4Kb requests.
3. This affects almost every language and platform .NET/Node/Python/PERL/Java


## Reference

[Regular Expression DoS and Node.js](https://blog.liftsecurity.io/2014/11/03/regular-expression-dos-and-node.js?utm_source=nodeweekly&utm_medium=email)

[owasp]: https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository

