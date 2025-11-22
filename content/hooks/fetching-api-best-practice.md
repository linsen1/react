---
title: Fetching API with useEffect Best Practice
description: The definitive guide to fetching data in React. Handling loading states, errors, and race conditions correctly.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/custom-use-fetch', 'hooks/use-effect-cleanup']
---

## The Pattern

When fetching data in `useEffect`, you must handle three things:
1.  **Loading State**: Show a spinner while waiting.
2.  **Error State**: Show a message if it fails.
3.  **Cleanup**: Cancel the request if the component unmounts (Race Condition).

## The Code

```typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Reset state on dependency change
    setLoading(true);
    setError(null);
    setUser(null);

    // 2. Create cancel flag
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          signal: controller.signal
        });
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();

        // 3. Update state only if mounted
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && (err as Error).name !== 'AbortError') {
          setError((err as Error).message);
          setLoading(false);
        }
      }
    };

    fetchData();

    // 4. Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <h1>{user?.name}</h1>;
}
```