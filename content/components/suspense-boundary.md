
---
title: Suspense Boundary Examples
description: Managing loading states for lazy-loaded components and data fetching with React Suspense.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['components/error-boundary', 'performance/lazy-loading']
---

## What is Suspense?

Suspense lets you declaratively "wait" for something to load (code or data) and show a fallback UI in the meantime.

## 1. Code Splitting (Lazy Load)

```typescript
import React, { Suspense } from 'react';

// Load this chunk only when needed
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <div>
      <h1>Stats</h1>
      <Suspense fallback={<Spinner />}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

## 2. Data Fetching (React 19 / Next.js)

Modern frameworks support Suspense for API calls.

```typescript
<Suspense fallback={<Skeleton />}>
  <AsyncProfileData />
</Suspense>
```
