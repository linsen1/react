
---
title: Toast Notification Component
description: How to build a stacking toast notification system using React Portal and Context.
lastUpdated: 2025-11-23
category: UI Elements
related: ['hooks/use-timeout', 'components/modal-component']
---

## Architecture

1.  **ToastContext**: Exposes `addToast(message, type)`.
2.  **ToastContainer**: Renders the list of active toasts (fixed position).
3.  **ToastItem**: Renders individual toast and handles auto-dismiss.

## Usage

```typescript
const { addToast } = useToast();

const handleSave = () => {
  saveData();
  addToast("Saved successfully!", "success");
};
```

(Note: For production, libraries like `react-hot-toast` are excellent, but building one yourself teaches you about Portals and Timer management.)
