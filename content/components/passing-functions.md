
---
title: Passing Functions as Props
description: How to communicate from Child to Parent. Best practices for naming event handlers.
lastUpdated: 2025-11-23
category: Components
related: ['hooks/use-callback-guide', 'components/lifting-state-up']
---

## Naming Conventions

*   **Prop Name**: Start with `on` (e.g., `onClick`, `onSubmit`, `onUserDelete`).
*   **Handler Name**: Start with `handle` (e.g., `handleClick`, `handleSubmit`).

```typescript
function Parent() {
  const handleDelete = (id) => { ... };

  return <Child onDelete={handleDelete} />;
}

function Child({ onDelete }) {
  return <button onClick={onDelete}>Delete</button>;
}
```

## Common Mistake: Invoking Immediately

```typescript
// ❌ Wrong: Calls function immediately on render
<button onClick={handleClick()} />

// ✅ Correct: Passes function reference
<button onClick={handleClick} />

// ✅ Correct: Passes inline arrow function (if you need arguments)
<button onClick={() => handleDelete(123)} />
```
