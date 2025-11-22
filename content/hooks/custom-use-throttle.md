---
title: Custom useThrottle Hook
description: Limit the execution rate of a function. Perfect for scroll events and window resizing.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/custom-use-debounce', 'performance/debouncing-throttling']
---

## Debounce vs Throttle

*   **Debounce**: Wait for silence. (Good for typing)
*   **Throttle**: Ensure function runs at most once every X ms. (Good for scroll/resize)

## The Code

```typescript
import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;

    if (timeElapsed >= interval) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      // Set a timeout for the remaining time to ensure the final value is captured
      const timerId = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, interval - timeElapsed);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}
```
