---
title: React Compiler + Hooks New Rules
description: How the new React Compiler (React Forget) changes how we write hooks. Say goodbye to useMemo and useCallback.
lastUpdated: 2025-11-22
category: React 19 / 2025 Trends
related: ['hooks/when-use-memo-hurts', 'hooks/prevent-re-renders']
---

## What is React Compiler?

It is an automatic optimization tool that memoizes everything for you at build time.

## The Impact on Hooks

### 1. No more `useMemo` / `useCallback`
The compiler automatically detects expensive calculations and stable function references. You can just write standard JavaScript.

```typescript
// Before
const value = useMemo(() => compute(a), [a]);

// After (With Compiler)
const value = compute(a); // Automatically memoized!
```

### 2. No more Dependency Arrays?
Ideally, the compiler manages dependencies. However, `useEffect` still requires them for logical correctness (synchronization timing), though the compiler can validate them strictly.
