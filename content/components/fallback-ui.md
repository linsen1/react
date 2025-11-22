---
title: Fallback UI Component
description: Generic error and loading states to use with Suspense and Error Boundaries.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['components/error-boundary', 'components/skeleton-loading']
---

## Error Fallback

Designed to be passed to `ErrorBoundary`.

```typescript
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-red-800 font-bold text-lg mb-2">Something went wrong</h2>
      <pre className="text-sm text-red-600 bg-red-100 p-2 rounded mb-4 overflow-auto">
        {error.message}
      </pre>
      <button 
        onClick={resetErrorBoundary}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
```