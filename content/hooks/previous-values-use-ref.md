---
title: Storing Previous Values with useRef
description: How to access the previous state or props in a functional component (replicating componentDidUpdate's prevProps).
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-ref-explained', 'hooks/use-state-vs-use-ref']
---

## The Hook

React doesn't provide a `usePrevious` hook out of the box, but it's easy to write.

```typescript
import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]); // Update ref AFTER render

  return ref.current; // Return value BEFORE update
}
```

## Usage

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <h1>
      Now: {count}, Before: {prevCount}
    </h1>
  );
}
```
