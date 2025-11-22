---
title: Infinite Loading with useEffect
description: How to append data to a list when the user scrolls to the bottom (Load More pattern).
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/custom-use-infinite-scroll', 'hooks/use-effect-dependencies']
---

## The Logic

1.  Fetch initial data (Page 1).
2.  Listen for scroll event or intersection observer.
3.  Fetch next page.
4.  **Append** new data to existing array `setData([...old, ...new])`.

## The Code

```typescript
import { useState, useEffect } from 'react';

function InfiniteList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchAPI(page); // Mock API
    
    // Functional update to ensure we don't lose previous items
    setItems(prev => [...prev, ...newItems]);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, [page]); // Trigger when page changes

  return (
    <div>
      {items.map(item => <div key={item}>{item}</div>)}
      
      <button 
        onClick={() => setPage(p => p + 1)} 
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
```