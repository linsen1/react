---
title: Custom useHover Hook
description: Detect if an element is being hovered using vanilla JS events instead of CSS.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-ref-explained', 'hooks/use-event-listener']
---

## Why build this?

Sometimes you need to trigger logic (like prefetching data or playing a video) when a user hovers over an element, which CSS `:hover` cannot do.

## The Code

```typescript
import { MutableRefObject, useState, useEffect, useRef } from 'react';

export function useHover<T extends HTMLElement>(): [MutableRefObject<T | null>, boolean] {
  const [value, setValue] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]); // Re-run if ref changes

  return [ref, value];
}
```

## Usage

```typescript
function Card() {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div ref={hoverRef}>
      {isHovered ? '😁' : '☹️'}
    </div>
  );
}
```
