---
title: How to Build a Custom useFetch Hook
description: A production-ready data fetching hook that handles loading states, errors, and prevents race conditions with AbortController.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-effect-works', 'api/axios-vs-fetch']
---

## Why build this?

Fetching data inside `useEffect` involves a lot of boilerplate: setting loading flags, handling errors, and cleaning up to avoid "memory leaks" when components unmount. A custom hook encapsulates this logic.

## The Code

```typescript
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    setState({ data: null, loading: true, error: null });

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setState({ data: json, loading: false, error: null });
      } catch (error) {
        if (!abortController.signal.aborted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return state;
}
```

## Key Features

1.  **Race Condition Protection**: Uses `AbortController` to cancel the fetch if the `url` changes or the component unmounts.
2.  **TypeScript Support**: Generic `<T>` allows you to define the expected API response shape.
3.  **Automatic Loading/Error States**: No need to manually manage boolean flags in your components.

## Usage

```typescript
interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return <h1>{data.name}</h1>;
}
```
