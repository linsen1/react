---
title: Drag and Drop Component
description: How to implement sortable lists using native HTML5 Drag and Drop API (no libraries).
lastUpdated: 2025-11-23
category: Advanced & System
related: ['components/file-upload', 'hooks/custom-use-hover']
---

## The Code

```typescript
import { useState, useRef } from 'react';

function SortableList({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _items = [...items];
    // Remove dragged item
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    // Insert at new position
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_items);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          className="p-4 bg-white border rounded shadow-sm cursor-move hover:bg-gray-50"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```