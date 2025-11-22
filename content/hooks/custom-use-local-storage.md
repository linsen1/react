---
title: Custom useLocalStorage Hook
description: Persist state to the browser's LocalStorage with an API identical to useState. Includes SSR safety checks.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-state-explained', 'hooks/custom-use-dark-mode']
---

## Why build this?

You often want UI state (like Theme, Sidebar position, or Form drafts) to survive a page refresh.

## The Code

```typescript
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Initialize state via a function to avoid reading LS on every render
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // 2. Wrap the setter to update both State and LocalStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Usage

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```
