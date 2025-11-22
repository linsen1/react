---
title: Custom useDarkMode Hook
description: Manage dark/light themes with support for system preference (OS settings) and local storage persistence.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/custom-use-local-storage', 'hooks/custom-use-media-query']
---

## The Code

This hook combines `useLocalStorage` and system preferences.

```typescript
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage'; // Assuming previous hook exists
import { useMediaQuery } from './useMediaQuery';     // Assuming next hook exists

export function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>('dark-mode-enabled', false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // If user hasn't set a preference yet, default to OS setting
  const enabled = enabledState ?? prefersDarkMode;

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    if (enabled) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [enabled]);

  return [enabled, setEnabledState] as const;
}
```
