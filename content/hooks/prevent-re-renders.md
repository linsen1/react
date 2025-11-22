---
title: Prevent Re-Renders with useCallback
description: The most misunderstood optimization in React. Learn exactly when useCallback actually prevents a re-render.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-callback-guide', 'performance/react-memo']
---

## The Misconception

Many beginners wrap **every** function in `useCallback`.

```typescript
// ❌ This does NOTHING for performance
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);

return <button onClick={handleClick}>Click</button>;
```

Using `useCallback` here is actually **slower** than a standard function because of the overhead of creating the hook and dependency array.

## The Only Case It Works

`useCallback` prevents re-renders **only** if the child component is wrapped in `React.memo`.

```typescript
// Child MUST be memoized
const HeavyChild = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  // ✅ REQUIRED: If we don't use useCallback, the function reference changes
  // every render, breaking React.memo in the child.
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <HeavyChild onClick={handleClick} />;
}
```