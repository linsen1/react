---
title: Stabilizing Functions in Hooks
description: How to use Refs to prevent functions from changing identity, removing the need for them in dependency arrays.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-callback-guide', 'hooks/use-ref-explained']
---

## The "Latest Ref" Pattern

Sometimes you want to use a function inside `useEffect`, but you don't want that function to trigger the effect when it changes.

```typescript
function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Always keep the latest callback in a ref
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      // Call the ref, not the prop directly
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]); // 'callback' is NOT a dependency!
}
```

This pattern is so useful it is being standardized in React 19 as `useEvent`.
