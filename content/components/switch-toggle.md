---
title: Switch Toggle Component
description: An iOS-style toggle switch component built with Tailwind CSS.
lastUpdated: 2025-11-23
category: UI Elements
related: ['components/conditional-rendering', 'hooks/custom-use-toggle']
---

## The Code

This component uses a hidden checkbox for accessibility and a styled `div` for the look.

```typescript
function Switch({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? 'bg-green-500' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
```