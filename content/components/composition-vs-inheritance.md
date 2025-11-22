
---
title: Composition vs Inheritance
description: Why React chooses Composition over Class-based Inheritance. How to build flexible UIs by combining components.
lastUpdated: 2025-11-23
category: Components
related: ['components/reusable-components', 'components/react-children']
---

## Inheritance (The OOP Way)

In languages like Java, you might create a `BaseDialog` class, then extend it to `WelcomeDialog`.

React teams says: **"We haven't found any use cases where inheritance is better than composition."**

## Composition (The React Way)

Build a generic component and configure it with props and children.

```typescript
function Dialog({ title, children }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-bold">{title}</h2>
      {children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <Dialog title="Welcome">
      <p>Thank you for visiting our spacecraft!</p>
    </Dialog>
  );
}
```

This is more flexible because you can compose multiple behaviors (Dialog + ErrorBoundary + Suspense) without building a complex class hierarchy.
