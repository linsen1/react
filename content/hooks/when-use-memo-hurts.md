---
title: When useMemo Hurts Performance
description: Memoization isn't free. Learn the cost of useMemo and when you should avoid using it.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-memo-performance', 'performance/react-memo']
---

## The Cost of Memoization

`useMemo` incurs two costs:
1.  **Memory**: Storing the cached value and the dependency array.
2.  **Computation**: Comparing the dependencies on every render.

## Example: Premature Optimization

```typescript
// ❌ SLOWER than standard JS
const value = useMemo(() => {
  return a + b;
}, [a, b]);
```

JavaScript engines (V8) are incredibly fast at math. React's overhead to check `prevDependencies !== nextDependencies` takes longer than just adding `a + b`.

## When to Avoid It

1.  **Simple primitive transformations**: Strings, numbers, booleans.
2.  **Cheap array methods**: `map` or `filter` on small arrays (< 100 items).
3.  **Components that render often**: If dependencies change every render, `useMemo` does nothing but add overhead.
