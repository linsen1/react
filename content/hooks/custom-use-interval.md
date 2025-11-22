---
title: Custom useInterval Hook
description: A declarative version of setInterval that fits the React programming model and avoids stale closure bugs.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-ref-explained', 'hooks/use-effect-dependencies']
---

## Why build this?
Standard `setInterval` inside `useEffect` often grabs "stale" state from the first render. `useInterval` fixes this by using a Ref to store the latest callback.

## The Code (Dan Abramov's Pattern)

```typescript
import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```
