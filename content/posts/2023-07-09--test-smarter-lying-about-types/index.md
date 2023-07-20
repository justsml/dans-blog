---
title: "Test Smarter: Lying About Types"
subTitle: How to test better in TypeScript - with lies!
date: 2023-07-05
modified: 2023-07-09
tags: [typescript,lying about types,testing, unit testing, integration testing, mocking, jest, express, http, middleware]
category: TypeScript
cover: null
---

# Test Smarter: Lying About Types

When testing code, generally speaking, you often _should_ lie about things.

This is because we want to test **something specific**, (hopefully) for an **actual reason**.

1.  `If shipping is not free, return warning to customer.`
    1.  If we only need a shipping cost, we don't need to test the entire checkout process, or include large 'accurate' fixtures.
2.  `If order total price is less than $0, throw an Invalid Price error.`
    1.  Here only 2 things matter: the price, and the error. Each extra bit of info needed to test this makes the test harder to read & maintain.
3.  `If HTTP auth header is missing, return 401 Unauthorized.`
    1.  You don't need to mock or stub an HTTP request, just an object like `{headers: {}}`.

This is NOT another article about throwing `any` about, or treating everything `as whateverYouNeedItToBe;`! There is a better way - using the type system's own behavior to our advantage.

## Situation: Excess Arguments

### Tips & Fixes

1.  Use minimal parameters & types. (Using derived types, where appropriate.)
    1.  e.g. `Pick<Request, 'headers'>` or `Request["headers"]` instead of `Request` for an object like `{headers: {}}`.
        1.  `Pick<object>` can pull out multiple properties, and `Omit<object>` removes properties.
        2.  For single properties, `{headers: Request["headers"]}` may be clearer.
2.  Use parameter destructuring to get the exact bits you need.
    1.  e.g. `({headers}: Pick<Request, 'headers'>)` instead of `(request: Request)`.

### Why

By narrowing what your function claims to need, you make it easier to understand what your code actually cares about, cheaper to maintain over time, and it has zero impact on any place already calling it.

### Example

```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new Error("Missing auth token"));
  }
  next();
};
```

## Situation: Excess Test Surface Area

### Tips & Fixes
