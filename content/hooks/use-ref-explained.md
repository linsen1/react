---
title: useRef Explained
description: Learn how to use Refs to access DOM nodes imperatively or store mutable variables that persist without causing re-renders.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-state-vs-use-ref', 'hooks/use-imperative-handle']
---

## What is useRef?

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`).

The key feature: **Changing `.current` does NOT trigger a re-render.**

```typescript
const refContainer = useRef(initialValue);
```

## Use Case 1: Accessing DOM

This is the most common usage. If you need to focus an input, scroll to an element, or measure a div's size, use a Ref.

```typescript
function TextInputWithFocusButton() {
  // 1. Create the ref (initialize null)
  const inputEl = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // 3. Access the DOM node
    if (inputEl.current) {
      inputEl.current.focus();
    }
  };

  return (
    <>
      {/* 2. Attach to element */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## Use Case 2: Mutable Variables

Sometimes you want to keep track of something (like "was this component mounted?") but you don't want to update the UI when it changes.

```typescript
function Timer() {
  const intervalRef = useRef<number>();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    // Store ID in ref so we can clear it later
    intervalRef.current = id;
    
    return () => clearInterval(intervalRef.current);
  }, []);
}
```

## Common Questions

**Q: Can I use `useRef` instead of `useState`?**
A: Only if the data is *not* shown on the screen. If you render `{ref.current}` in your JSX, it won't update when the value changes.

**Q: When is the ref updated?**
A: React sets `ref.current` before `useEffect` runs and before `useLayoutEffect` runs.