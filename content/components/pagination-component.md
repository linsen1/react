---
title: Pagination Component
description: A reusable pagination control with Next, Previous, and Page Number buttons.
lastUpdated: 2025-11-23
category: UI Elements
related: ['hooks/pagination-hook', 'components/reusable-components']
---

## The Logic

We need to render a list of page numbers, plus "Prev" and "Next".

```typescript
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
```