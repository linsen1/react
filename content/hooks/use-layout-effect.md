---
title: Why useLayoutEffect Exists
description: 99% of the time you want useEffect. Learn the 1% case where useLayoutEffect prevents UI flickering.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-effect-works', 'hooks/use-ref-explained']
---

## The Difference

*   **`useEffect`**: Runs **asynchronously** after the browser has painted the screen. The user sees the initial render, then the effect runs.
*   **`useLayoutEffect`**: Runs **synchronously** immediately after React calculates the DOM, but **before** the browser paints.

## When to use it?

Use `useLayoutEffect` when you need to **measure the DOM** and then update it immediately to prevent a visual "flicker".

### The Flicker Problem

Imagine you want a tooltip to appear right next to a button.
1. Render Tooltip at `(0, 0)`.
2. `useEffect` runs -> Measures button position -> Moves Tooltip to `(100, 200)`.
3. **Result:** The user sees the tooltip jump from top-left to the correct spot.

### The Fix

```typescript
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);
}, []);
```

Because `useLayoutEffect` blocks painting, the browser waits until you calculate the final position before showing anything to the user. They never see the jump.

## Warning

Because it is synchronous, `useLayoutEffect` hurts performance if you do slow things inside it. **Always start with `useEffect`** and only switch if you see a visual glitch.
