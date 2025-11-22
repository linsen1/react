---
title: Why useEffect Runs Twice in Dev Mode
description: Understanding React Strict Mode double-invocation and why you shouldn't disable it.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-effect-works', 'hooks/use-effect-cleanup']
---

## The Behavior

In React 18+, if you are wrapped in `<StrictMode>`, components mount, unmount, and remount instantly.

1.  **Mount** -> Effect runs.
2.  **Unmount** -> Cleanup runs.
3.  **Remount** -> Effect runs again.

## Why?

React is preparing for a future where components can be unmounted and preserved (Offscreen API). It ensures your effects are resilient to being stopped and started.

## How to Handle It?

**Do not use a ref to block it.** Fix your cleanup function instead.

```typescript
// ❌ BAD: Trying to "fix" React
const ranOnce = useRef(false);
useEffect(() => {
  if (ranOnce.current) return;
  ranOnce.current = true;
  // ...
}, []);

// ✅ GOOD: Proper cleanup
useEffect(() => {
  const connection = connect();
  return () => connection.disconnect(); // Handles the unmount perfectly
}, []);
```