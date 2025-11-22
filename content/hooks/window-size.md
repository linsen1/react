---
title: Window Size Hook
description: Track the browser window dimensions. Useful for responsive rendering (conditional logic based on width).
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-effect-cleanup', 'hooks/custom-use-throttle']
---

## The Code

```typescript
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    
    // Run once to init
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```