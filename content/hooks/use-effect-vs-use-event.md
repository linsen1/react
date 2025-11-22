---
title: useEffect vs useEvent (React 19)
description: The separation of Events (interactive) vs Effects (synchronization) is the future of React.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-event', 'hooks/use-effect-dependencies']
---

## The Problem

You want to log something inside `useEffect`, but `logger` changes every render, causing the effect to re-run unnecessarily.

```typescript
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  // We just want to log, not re-connect!
  logger.log('Connected'); 

  return () => connection.disconnect();
}, [logger]); // ❌ Re-connects every time logger changes
```

## The useEvent Solution (React 19)

`useEvent` wraps a function so it is **stable** (doesn't change identity) but always sees the **latest props/state**.

```typescript
const onConnected = useEvent(() => {
  logger.log('Connected');
});

useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  onConnected(); // ✅ Safe to call, not a dependency!

  return () => connection.disconnect();
}, []); // ✅ No dependencies needed
```
