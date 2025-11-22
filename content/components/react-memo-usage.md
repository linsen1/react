---
title: Avoid Re-Renders with React.memo
description: How to memoize functional components to prevent unnecessary re-renders when props haven't changed.
lastUpdated: 2025-11-23
category: Components
related: ['hooks/use-memo-performance', 'hooks/use-callback-guide']
---

## What does it do?

React usually re-renders a component whenever its parent re-renders. `React.memo` wraps a component and says:
> "Only re-render me if my **Props** have changed."

```typescript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

## When to use it?

1.  **Pure Functional Components**: Given the same props, it renders the same output.
2.  **Heavy Rendering**: The component has many children or complex styles.
3.  **Frequent Parent Updates**: The parent updates often (e.g., typing in an input), but the child data remains static.

## The Trap: Object Props

If you pass a **new object** or **new function** every time, `React.memo` fails because `{ a: 1 } !== { a: 1 }`.

**Fix:** Use `useMemo` and `useCallback` in the parent to stabilize props.