---
title: Search Input Component
description: A styled search bar with icon and clear button.
lastUpdated: 2025-11-23
category: UI Elements
related: ['hooks/custom-use-debounce', 'hooks/search-filter']
---

## The Code

```typescript
import { Search, X } from 'lucide-react';

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
```