
---
title: Building a Modal Component
description: A reusable Modal/Dialog using React Portals to escape the DOM hierarchy.
lastUpdated: 2025-11-23
category: UI Elements
related: ['hooks/custom-use-click-outside', 'components/react-children']
---

## The Code

We use `createPortal` to render the modal at the end of the `<body>` tag, avoiding z-index issues.

```typescript
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-md w-full m-4">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## Key Features
1.  **Backdrop Click**: Closes modal.
2.  **Portal**: Renders outside parent overflow.
3.  **Accessibility**: (Homework) Add `Escape` key listener.
