# Dan's Personal Blog

Powered by GatsbyJS!

### Trimming SSR index HTML size

#### Before

```text
$ ll public/index.html public/you-may-not-need-axios/index.html public/visualizing-promises/index.html public/pitfalls-in-promise-docs/index.html public/promise-gotchas/index.html public/protect-your-tokens/index.html

 64K    public/index.html
 96K    public/pitfalls-in-promise-docs/index.html
 90K    public/promise-gotchas/index.html
 91K    public/protect-your-tokens/index.html
 91K    public/visualizing-promises/index.html
205K    public/you-may-not-need-axios/index.html
```

> After minor cleanup

```sh
 38K    public/index.html
 70K    public/pitfalls-in-promise-docs/index.html
 63K    public/promise-gotchas/index.html
 65K    public/protect-your-tokens/index.html
 65K    public/visualizing-promises/index.html
179K    public/you-may-not-need-axios/index.html

### May, 7th 01:41
 35K    public/index.html
 63K    public/pitfalls-in-promise-docs/index.html
 58K    public/promise-gotchas/index.html
 59K    public/protect-your-tokens/index.html
 59K    public/visualizing-promises/index.html
176K    public/you-may-not-need-axios/index.html
```

> After gist plugin fixes

```sh
### May, 7th 01:41
```
