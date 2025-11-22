---
title: Custom useDebounce Hook
description: optimize performance by delaying API calls until the user stops typing. Essential for search inputs.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-effect-works', 'performance/debouncing-throttling']
---

## Why build this?

When a user types into a search box, you don't want to fire an API request for every single keystroke. `useDebounce` delays the update of a value until a specified time has passed without change.

## The Code

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debouncedValue from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## Usage

```typescript
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  // API will only be called 500ms after user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchApi(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
```
