---
title: Custom useTimeout Hook
description: A simple wrapper around setTimeout that handles cleanup automatically when the component unmounts.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-effect-cleanup', 'hooks/custom-use-interval']
---

## The Code

```typescript
import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}
```
