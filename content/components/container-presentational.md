
---
title: Container vs Presentational Pattern
description: A classic React pattern. Is it still relevant with Hooks?
lastUpdated: 2025-11-23
category: Components
related: ['components/smart-vs-dumb', 'hooks/custom-use-fetch']
---

## Is it dead?

With **Hooks**, the strict separation is less necessary. You can now embed logic directly into UI components without classes.

However, the **principle** is still valid: **Separate Fetching from Rendering.**

## Why separate?

1.  **Reusability**: You can use the same `UserList` UI with different data sources.
2.  **Testing**: It's easier to test the UI (`UserList`) with mock props than to mock the API.
3.  **Readability**: Keeps JSX clean.

## Modern Implementation

Use custom hooks as the "Container".

```typescript
// Logic (Container)
function useUserList() {
  return useFetch('/users');
}

// UI (Presentational)
function UserList() {
  const { data, loading } = useUserList(); // Hook acts as container
  
  if (loading) return <p>Loading...</p>;
  return <div>{/* render */}</div>;
}
```
