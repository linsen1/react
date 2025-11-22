---
title: Custom useToggle Hook
description: Reduce boilerplate for boolean state toggling (True/False). Common for modals, checkboxes, and menus.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-state-explained', 'hooks/use-callback-guide']
---

## The Code

```typescript
import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  // Define a function that toggles the value
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle] as const;
}
```

## Usage

```typescript
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <button onClick={toggleOpen}>
        {isOpen ? 'Close' : 'Open'} Modal
      </button>
      {isOpen && <div>Modal Content</div>}
    </>
  );
}
```
