---
title: useTransition Explained
description: How to mark state updates as "non-urgent" to keep your UI responsive during heavy renders.
lastUpdated: 2025-11-22
category: React 19 / 2025 Trends
related: ['hooks/use-optimistic', 'performance/debouncing-throttling']
---

## The Logic

`useTransition` lets you tell React: "Update this state, but if the user clicks something else, interrupt this and handle the user input first."

## Syntax

```typescript
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  
  // Urgent: Update input immediately
  setInputValue(value);

  // Non-Urgent: Filter list (slow)
  startTransition(() => {
    setFilter(value);
  });
};

return (
  <div>
    <input onChange={handleChange} />
    {isPending ? <Spinner /> : <List filter={filter} />}
  </div>
);
```

This keeps the input typing smooth (60fps) even if filtering the list takes 500ms.