---
title: How React Schedules Updates Internally
description: Deep dive into the Fiber architecture, Render Phase vs Commit Phase, and Automatic Batching.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-transition', 'performance/react-memo']
---

## Automatic Batching (React 18)

Prior to React 18, updates inside `setTimeout` or Promises were NOT batched.

```typescript
// React 17
setTimeout(() => {
  setCount(c => c + 1); // Render 1
  setFlag(f => !f);     // Render 2
}, 1000);
```

**React 18** batches all of these into a single render automatically.

## FlushSync

If you need to force an immediate re-render (e.g., to measure the DOM before an animation), use `flushSync`.

```typescript
import { flushSync } from 'react-dom';

const handleClick = () => {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // DOM is updated HERE
  console.log(divRef.current.innerText); // Updated value
};
```
