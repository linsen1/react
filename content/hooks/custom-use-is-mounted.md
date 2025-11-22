---
title: Custom useIsMounted Hook
description: Check if a component is still mounted to prevent "Can't perform a React state update on an unmounted component" errors.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-ref-explained', 'hooks/use-effect-cleanup']
---

## The Problem

You fire an async request. While it's loading, the user navigates away (unmounts the component). When the request finishes, you try to `setState`, but React yells at you.

## The Code

```typescript
import { useRef, useEffect, useCallback } from 'react';

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
```

## Usage

```typescript
function DataComponent() {
  const [data, setData] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    fetch('/api/data').then(res => {
      if (isMounted()) {
        // Only update state if still on the screen
        setData(res.data);
      }
    });
  }, [isMounted]);

  return <div>{/* ... */}</div>;
}
```
