---
title: useState vs useRef: When to Use Which
description: Understand the crucial difference between re-rendering state and mutable references. A key concept for React performance.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-state-explained', 'hooks/use-ref-explained']
---

## The Core Difference

| Feature | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Updates Trigger Re-render?** | **YES** | **NO** |
| **Mutable?** | No (Must use setter) | Yes (`.current` is mutable) |
| **Best For** | UI Data (Input, Toggles) | Timers, DOM Access, Previous Values |

## When to use `useState`

Use `useState` when the change **should reflect on the screen**.

*   User types in an input field.
*   Opening/closing a modal.
*   Showing a loading spinner.

```typescript
// Changing this MUST update the DOM
const [text, setText] = useState('');
```

## When to use `useRef`

Use `useRef` when you want to track a value **without** causing the component to update.

### 1. Accessing DOM Elements
This is the most common use case.

```typescript
const inputRef = useRef<HTMLInputElement>(null);

const focusInput = () => {
  // accessing the DOM directly
  inputRef.current?.focus(); 
};

return <input ref={inputRef} />;
```

### 2. Storing Interval/Timeout IDs
Timers don't affect the visual UI directly, so storing their ID in state would cause unnecessary renders.

```typescript
const intervalId = useRef<number | null>(null);

const startTimer = () => {
  intervalId.current = window.setInterval(() => {
    console.log('Tick');
  }, 1000);
};

const stopTimer = () => {
  if (intervalId.current) clearInterval(intervalId.current);
};
```

### 3. Tracking "Previous" State
You can use a ref to remember what a prop was during the *last* render.

```typescript
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

## Summary

*   Need to see the change? -> **`useState`**
*   Need to remember value behind the scenes? -> **`useRef`**