
---
title: Building a Dropdown Component
description: A custom Select/Dropdown menu with click-outside detection.
lastUpdated: 2025-11-23
category: UI Elements
related: ['hooks/custom-use-click-outside', 'hooks/use-state-explained']
---

## The Code

```typescript
import { useState, useRef } from 'react';
import { useClickOutside } from './useClickOutside'; // Custom hook

function Dropdown({ options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded px-4 py-2 bg-white shadow-sm"
      >
        {selected.label}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setSelected(opt);
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```
