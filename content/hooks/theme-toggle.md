---
title: Theme Toggle Hook
description: Switch between Light and Dark modes and persist the choice in LocalStorage.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/custom-use-local-storage', 'hooks/use-layout-effect']
---

## The Code

```typescript
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
```