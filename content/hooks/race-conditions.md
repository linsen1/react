---
title: How to Handle Race Conditions in Hooks
description: Prevent bugs where an earlier network request finishes after a later one, showing the wrong data.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-effect-cleanup', 'hooks/fetching-api-best-practice']
---

## The Scenario

1. User clicks "User A". Request A starts.
2. User clicks "User B". Request B starts.
3. Request B finishes (shows User B).
4. **Request A finishes** (overwrites with User A).
5. **Result:** User sees "User B" selected but "User A" content.

## The Fix: Boolean Flag

```typescript
useEffect(() => {
  let active = true;

  fetchData(id).then(data => {
    if (active) {
      setData(data);
    }
  });

  return () => {
    active = false;
  };
}, [id]);
```

When `id` changes, the cleanup function runs, setting `active = false` for the *previous* effect closure. When the old request returns, the `if (active)` check fails, and the data is ignored.
