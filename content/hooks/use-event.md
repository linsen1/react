---
title: useEvent Explained
description: The missing hook in React. How useEvent solves the dependency array dilemma permanently.
lastUpdated: 2025-11-22
category: React 19 / 2025 Trends
related: ['hooks/use-effect-vs-use-event', 'hooks/use-callback-guide']
---

## What is it?

`useEvent` is a hook proposed for React 19 that returns a function that:
1.  Has a **stable identity** (never changes).
2.  Always has access to the **latest state/props**.

## Why is this huge?

It eliminates the need for `useCallback` in 90% of cases and fixes the `useEffect` dependency problem.

```typescript
function Chat() {
  const [text, setText] = useState('');

  // ❌ Old way: 'text' forces this to change, breaking any child memo
  const onClick = useCallback(() => {
    sendMessage(text);
  }, [text]);

  // ✅ New way: Stable function, but reads fresh 'text'
  const onClick = useEvent(() => {
    sendMessage(text);
  });

  return <SendButton onClick={onClick} />;
}
```