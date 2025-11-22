---
title: How useEffect Actually Works (2025 Guide)
description: Master the React render cycle. Understand side effects, synchronization, and why your effects might be running twice.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-effect-cleanup', 'hooks/use-effect-dependencies']
---

## The Mental Model

Don't think of `useEffect` as "lifecycle methods" (like `componentDidMount`).

Instead, think of it as **Synchronization**.
> "Keep this component synchronized with some external system (DOM, Network, Subscription) whenever [dependencies] change."

## The Render Cycle

1.  **Render Phase**: React calls your component function to determine what the UI should look like.
2.  **Commit Phase**: React updates the DOM.
3.  **Effect Phase**: After the browser paints the screen, React runs your effects.

This means `useEffect` does **not** block the browser from updating the screen. It happens *after* the user sees the update.

## The Dependency Array

The array `[]` at the end of `useEffect` tells React when to re-run your sync logic.

*   **No Array**: Runs after **every single render**. (Rarely what you want).
*   **Empty Array `[]`**: Runs **only once** after the component mounts.
*   **`[prop, state]`**: Runs only when `prop` or `state` has changed since the last render.

## Why Does It Run Twice?

If you are in **Development Mode** (Strict Mode), React intentionally mounts, unmounts, and re-mounts your component immediately.

**Why?** To verify that your cleanup logic works correctly.

```typescript
useEffect(() => {
  console.log('Connected');
  return () => console.log('Disconnected');
}, []);
```

In Dev, you will see:
1. `Connected`
2. `Disconnected`
3. `Connected`

If this breaks your app, your cleanup function is missing or incorrect. **Do not remove Strict Mode**; fix the bug instead.

## When NOT to use useEffect

You don't need `useEffect` for:
1.  **Transforming data**: Do it at the top level of the component or use `useMemo`.
2.  **Handling user events**: Do it in the `onClick` handler, not in an effect that watches state.

```typescript
// ❌ Bad: Chain reaction
const [firstName, setFirst] = useState('John');
const [fullName, setFull] = useState('');

useEffect(() => {
  setFull(firstName + ' Doe');
}, [firstName]);

// ✅ Good: Derived state (calculated during render)
const fullName = firstName + ' Doe';
```