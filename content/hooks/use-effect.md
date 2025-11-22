---
title: useEffect Explained
description: The ultimate guide to handling side effects in React components. Learn dependency arrays, cleanup functions, and common pitfalls.
lastUpdated: 2025-11-15
category: React Hooks
related: ['hooks/use-state-vs-use-ref', 'performance/debouncing-throttling']
---

## What is useEffect?

`useEffect` is a React Hook that lets you synchronize a component with an external system. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

### Basic Syntax

```typescript
useEffect(() => {
  // Setup code (run effects)
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array
```

## When to Use It?

You should use `useEffect` for:

1.  **Data Fetching**: Loading data from an API.
2.  **Subscriptions**: Listening to events (window resize, sockets).
3.  **DOM Manipulation**: Changing document title, managing focus.
4.  **Timers**: using `setTimeout` or `setInterval`.

## The Dependency Array

The second argument controls **when** the effect runs.

| Array Value | Behavior |
| :--- | :--- |
| **No Argument** | Runs after **every** render. |
| **`[]` (Empty)** | Runs **only once** (on mount). |
| **`[prop, state]`** | Runs when `prop` or `state` **changes**. |

## Common Mistakes

### 1. Missing Dependencies
One of the most common bugs is omitting values from the dependency array that are used inside the effect.

```typescript
// ❌ BAD: 'count' is used but not listed
useEffect(() => {
  console.log(count);
}, []); 

// ✅ GOOD: 'count' is tracked
useEffect(() => {
  console.log(count);
}, [count]);
```

### 2. Infinite Loops
If your effect updates a state that is also in the dependency array, you create an infinite loop.

```typescript
// ❌ BAD: Causes infinite re-renders
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

## Best Practices

*   **Keep effects small**: Split complex logic into multiple `useEffect` calls.
*   **Always cleanup**: If you start a timer or subscription, clear it in the return function.
*   **Don't lie to React**: If you use a variable, put it in the dependency array.
