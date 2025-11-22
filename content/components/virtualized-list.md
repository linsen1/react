---
title: Virtualized List Component
description: Render huge lists (10,000+ items) efficiently by only rendering what is visible in the viewport.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['performance/virtualization', 'hooks/custom-use-infinite-scroll']
---

## The Concept (Windowing)

Instead of rendering 10,000 `<div>`s, we create a container with the total height (`itemHeight * count`) and use `absolute` positioning to place only the ~10 items currently visible based on `scrollTop`.

## The Code

```typescript
import { useState } from 'react';

function VirtualList({ itemCount, itemHeight, renderItem, windowHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push(
      renderItem({
        index: i,
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          height: `${itemHeight}px`,
          width: '100%',
        },
      })
    );
  }

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: `${windowHeight}px`, overflowY: 'auto', position: 'relative' }}
      className="border rounded"
    >
      <div style={{ height: `${itemCount * itemHeight}px` }}>
        {visibleItems}
      </div>
    </div>
  );
}
```