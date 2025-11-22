
---
title: Lifting State Up Explained
description: A core React pattern for sharing state between sibling components. Moving useState to the closest common ancestor.
lastUpdated: 2025-11-23
category: Components
related: ['hooks/use-state-explained', 'state/context-api']
---

## The Problem

Sibling A needs to know what Sibling B is doing. But siblings can't talk to each other directly.

```text
      Parent
     /      \
Child A    Child B
```

## The Solution

Move the state to the **Parent**, and pass it down via props.

```typescript
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildA count={count} />
      <ChildB onIncrement={() => setCount(c => c + 1)} />
    </>
  );
}

function ChildA({ count }) {
  return <h1>Count: {count}</h1>;
}

function ChildB({ onIncrement }) {
  return <button onClick={onIncrement}>+</button>;
}
```

## When to stop lifting?

If you find yourself lifting state 4-5 levels up, consider using **Context** or a state management library like Zustand.
