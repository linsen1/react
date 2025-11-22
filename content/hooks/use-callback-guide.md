---
title: useCallback Guide
description: Prevent unnecessary re-renders in child components by stabilizing your event handlers with useCallback.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-memo-performance', 'components/smart-vs-dumb']
---

## What is useCallback?

`useCallback` is a hook that returns a **memoized version of the callback function** that only changes if one of the dependencies has changed.

It is primarily used for **performance optimization** when passing functions to optimized child components (like those using `React.memo`).

```typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

## The Problem: Function Identity

In JavaScript, functions are objects. Every time a component re-renders, all functions inside it are recreated.

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  // This is a NEW function every single render!
  // address in memory: 0x001 -> 0x002 -> 0x003...
  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      {/* Child thinks 'handleClick' changed, so it re-renders too */}
      <HeavyChild onClick={handleClick} />
    </div>
  );
}
```

## The Solution

Wrap the function in `useCallback`.

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  // React gives us the SAME function reference as long as [] deps match
  // address in memory: 0x001 -> 0x001 -> 0x001...
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No dependencies

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      {/* Child sees the same props, skips render (if using React.memo) */}
      <HeavyChild onClick={handleClick} />
    </div>
  );
}
```

## When is it Useless?

If `HeavyChild` is **not** wrapped in `React.memo`, passing a `useCallback` function does absolutely nothing. The child will re-render anyway because the parent re-rendered.

**Only use `useCallback` if:**
1.  The child component is wrapped in `React.memo`.
2.  The function is a dependency of another hook (e.g., `useEffect` depends on `fetchData`).