---
title: Common useEffect Mistakes Beginners Make
description: Stop writing buggy effects. Learn to avoid infinite loops, stale closures, and race conditions in React.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-effect-dependencies', 'hooks/custom-use-fetch']
---

## Mistake 1: Not handling Race Conditions

When fetching data based on a prop (like `userId`), responses can arrive out of order.

```typescript
// ❌ Bad: The first request might finish last, overwriting the correct data
useEffect(() => {
  fetch(`/user/${id}`).then(setData);
}, [id]);
```

**Fix:** Use a cleanup flag or AbortController (see "useEffect Cleanup").

## Mistake 2: The "Stale Closure"

This happens when you use a variable inside an effect but lie to React about it by leaving it out of the dependency array.

```typescript
useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // ❌ Always prints 0 (initial value)
  }, 1000);
  return () => clearInterval(id);
}, []); // Missing 'count'
```

**Fix:** Add `count` to dependencies OR use the functional update form: `setCount(c => c + 1)`.

## Mistake 3: Using Objects in Dependencies

Passing an object literal as a dependency causes the effect to run on **every render**.

```typescript
// ❌ Bad: Runs on every render because {} !== {}
useEffect(() => {
  api.get(options);
}, [options]); 

// ✅ Fix: Deconstruct only what you need
useEffect(() => {
  api.get(options.url);
}, [options.url]);
```

## Mistake 4: Updating State without Conditions

This causes an infinite loop.

```typescript
useEffect(() => {
  // ❌ Sets state -> Re-renders -> Runs effect -> Sets state...
  setCount(count + 1);
}, [count]);
```

**Fix:** Only update state if necessary, or rethink why you are syncing state inside an effect (you might just need derived state).
