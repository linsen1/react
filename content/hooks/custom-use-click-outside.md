---
title: Custom useClickOutside Hook
description: Detect clicks outside of a specific element. Essential for closing Modals, Dropdowns, and Flyout menus.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-ref-explained', 'hooks/custom-use-event-listener']
---

## The Code

```typescript
import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains((event.target as Node))) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```

## Usage

```typescript
function Modal({ onClose }) {
  const ref = useRef(null);
  useClickOutside(ref, onClose);

  return (
    <div className="overlay">
      <div ref={ref} className="modal-content">
        Click outside me to close!
      </div>
    </div>
  );
}
```
