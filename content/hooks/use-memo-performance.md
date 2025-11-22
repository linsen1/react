---
title: useMemo Performance Guide
description: React is fast, but expensive calculations can slow it down. Learn when to use useMemo to cache results and when it's premature optimization.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-callback-guide', 'performance/react-memo']
---

## What is useMemo?

`useMemo` caches the **result** of a calculation between re-renders. It only re-calculates if the dependencies change.

```typescript
const cachedValue = useMemo(() => calculateExpensiveValue(a, b), [a, b]);
```

## When to Use It?

### 1. Heavy Calculations
If you are filtering a list of 10,000 items, sorting a huge dataset, or doing complex math.

```typescript
// ❌ Runs on every render, blocking the UI
const visibleTodos = filterTodos(todos, tab);

// ✅ Runs only when 'todos' or 'tab' changes
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab);
}, [todos, tab]);
```

### 2. Referential Equality (Objects/Arrays)
In React, `{} === {}` is `false`.
If you pass an object to a child component wrapped in `React.memo`, it will still re-render unless you memoize the object.

```typescript
// ❌ This object is "new" every render
const config = { color: 'red', theme: currentTheme };

// ✅ This object stays the same reference
const config = useMemo(() => ({
  color: 'red', theme: currentTheme
}), [currentTheme]);

return <ChildComponent config={config} />;
```

## When NOT to Use It

**Don't use it for everything.** `useMemo` has a cost:
1.  Memory to store the cache.
2.  CPU overhead to compare dependencies.

If your calculation is simple (like `a + b` or `todos.length`), just do it directly.

> **Rule of thumb:** If the operation takes less than 1ms, you probably don't need `useMemo`.

## Difference from useCallback

*   `useMemo` caches the **result** of calling the function (a value).
*   `useCallback` caches the **function itself**.

```typescript
// Returns the number 42
const value = useMemo(() => {
  return calculateMagicNumber();
}, []);

// Returns the function () => { ... }
const func = useCallback(() => {
  doSomething();
}, []);
```