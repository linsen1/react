---
title: Custom useInfiniteScroll Hook
description: Implement infinite scrolling efficiently using the Intersection Observer API (no scroll event listeners).
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-ref-explained', 'hooks/use-callback-guide']
---

## The Code

This hook returns a ref. Assign this ref to the *last* element in your list. When that element becomes visible, the callback fires.

```typescript
import { useRef, useCallback } from 'react';

export function useInfiniteScroll(
  isLoading: boolean,
  hasMore: boolean,
  callback: () => void
) {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, callback]
  );

  return lastElementRef;
}
```
