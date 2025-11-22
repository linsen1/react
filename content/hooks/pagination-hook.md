---
title: React Pagination Hook
description: Manage current page, page size, and slicing data arrays for table pagination.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-memo-performance', 'hooks/use-state-explained']
---

## The Code

```typescript
import { useState, useMemo } from 'react';

export function usePagination<T>(data: T[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [data, currentPage, itemsPerPage]);

  const next = () => {
    setCurrentPage((curr) => Math.min(curr + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((curr) => Math.max(curr - 1, 1));
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentData, currentPage, maxPage };
}
```