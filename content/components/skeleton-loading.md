
---
title: Skeleton Loading Component
description: Improve perceived performance by showing a placeholder structure while data loads.
lastUpdated: 2025-11-23
category: UI Elements
related: ['components/suspense-boundary', 'hooks/fetching-api-best-practice']
---

## The CSS (Tailwind)

Use `animate-pulse` and gray backgrounds.

## The Component

```typescript
function Skeleton({ className, ...props }) {
  return (
    <div 
      className={`animate-pulse bg-slate-200 rounded ${className}`} 
      {...props} 
    />
  );
}

// Usage in a Card
function CardSkeleton() {
  return (
    <div className="border p-4 rounded">
      <Skeleton className="h-4 w-3/4 mb-4" /> {/* Title */}
      <Skeleton className="h-20 w-full mb-4" /> {/* Image */}
      <Skeleton className="h-3 w-1/2" />        {/* Meta */}
    </div>
  );
}
```
