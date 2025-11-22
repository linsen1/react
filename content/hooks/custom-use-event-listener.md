---
title: Custom useEventListener Hook
description: A safe way to add global event listeners (like window resize or keydown) that automatically clean themselves up.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-effect-cleanup', 'hooks/use-ref-explained']
---

## Why build this?

Adding `addEventListener` directly in `useEffect` can be repetitive. You also need to make sure your callback always has access to the latest state without re-attaching the listener on every render.

## The Code

```typescript
import { useRef, useEffect } from 'react';

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: Window | HTMLElement = window
) {
  // 1. Create a ref that stores handler
  const savedHandler = useRef(handler);

  // 2. Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler 
  // without needing to pass it in effect deps array causing re-binds.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```
