
---
title: Accordion Component
description: A collapsible section component. Learn how to make it accessible and animate the height.
lastUpdated: 2025-11-23
category: UI Elements
related: ['components/conditional-rendering', 'hooks/custom-use-toggle']
---

## The Code

```typescript
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-2 hover:bg-slate-50"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="p-4 text-slate-600 animate-in slide-in-from-top-2">
          {children}
        </div>
      )}
    </div>
  );
}
```
