---
title: useEffect Cleanup Function Examples
description: Learn how to prevent memory leaks by cleaning up subscriptions, timers, and event listeners in React's useEffect hook.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-effect-works', 'hooks/use-effect-mistakes']
---

## Why do we need cleanup?

When you create a side effect in React (like setting a timer or connecting to a chat server), you often need to undo it when the component is destroyed. If you don't, you create **memory leaks**.

The `useEffect` hook lets you return a function. React runs this function when:
1.  The component unmounts.
2.  **Before** the effect runs again (if dependencies changed).

## Syntax

```typescript
useEffect(() => {
  // 1. Run effect (Mount)
  const connection = createConnection();
  connection.connect();

  // 2. Cleanup (Unmount)
  return () => {
    connection.disconnect();
  };
}, []);
```

## Example 1: Clearing Timers

If you use `setInterval`, you MUST clear it. Otherwise, the timer keeps running in the background even after the user navigates away.

```typescript
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('Tick...');
  }, 1000);

  // ✅ Cleanup prevents zombies
  return () => clearInterval(timerId);
}, []);
```

## Example 2: Event Listeners

Adding global event listeners (like `window.resize` or `keydown`) requires removal.

```typescript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  
  window.addEventListener('resize', handleResize);

  // ✅ Important: Remove the exact same function reference
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Example 3: Aborting API Requests

Race conditions happen when a user clicks "Next" quickly. The first request might finish *after* the second one. Use `AbortController` to cancel stale requests.

```typescript
useEffect(() => {
  let active = true;
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(data => {
      if (active) setData(data);
    });

  return () => {
    active = false;
    controller.abort(); // Cancel the network request
  };
}, [url]);
```
