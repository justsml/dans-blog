# Translation Candidate
- Slug: security-notes-regex
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.14
- Input tokens: 1162
- Output tokens: 1276
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000399
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 安全说明：正则表达式
subTitle: 正则表达式会有漏洞吗？
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## 正则表达式拒绝服务：ReDOS

我发现的一个令人惊讶且难以察觉的漏洞与正则表达式有关，无论是编写不当还是实现不佳。

大型或精心设计的用户输入可能导致内存/CPU耗尽。

> 这是一个拒绝服务漏洞，而不仅仅是性能问题。如果恶意输入能长时间占用CPU资源，导致真实用户资源饥饿，它必须纳入你的安全威胁模型。

### 警告信号

1. 嵌套量词、重复分组或重叠交替
2. 没有超时或输入长度限制的回溯密集型引擎
3. 表达式用于未经验证的用户输入
4. 正则验证运行在高频请求路径上

### 缓解/解决方案

1. 正则表达式很难处理。
    1. 例如，[OWASP推荐的IP验证方式][owasp]：`^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`
    2. 这个表达式比一条老式推文还要长，仅仅是为了验证一个4字节的IP地址！！！
2. 在正则评估前限制输入长度。
3. 添加超时、静态分析，或在平台支持时使用非回溯引擎。
4. 几乎影响所有语言和平台：.NET/Node/Python/PERL/Java。

### 参考

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
