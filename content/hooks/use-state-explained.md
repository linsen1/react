---
title: useState Explained with Simple Examples
description: A complete guide to React's most fundamental hook. Learn how to manage state, handle objects, and use functional updates correctly.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-state-vs-use-ref', 'hooks/use-reducer-vs-use-state']
---

## What is useState?

`useState` is the most basic hook in React. It allows function components to have "memory". Unlike normal variables that disappear when a function exits, state variables are preserved by React between renders.

```typescript
const [state, setState] = useState(initialValue);
```

## Basic Usage

Here is a standard counter example:

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Key Concepts

### 1. Updates are Asynchronous (Sort of)
React batches state updates for performance. If you call `setCount` multiple times in the same event loop, React might group them into a single render pass.

### 2. Functional Updates
If your new state depends on the *previous* state, you should always use the functional update form. This avoids "stale closure" bugs.

```typescript
// ❌ Potentially buggy if called multiple times quickly
setCount(count + 1);

// ✅ Safe: Uses the latest pending state
setCount(prevCount => prevCount + 1);
```

### 3. Objects in State
Unlike `this.setState` in class components, `useState` **does not automatically merge** objects. You must manually spread the old properties.

```typescript
const [user, setUser] = useState({ name: 'John', age: 25 });

// ❌ This wipes out 'age'!
setUser({ name: 'Doe' });

// ✅ Correct: Spread previous state first
setUser(prev => ({ ...prev, name: 'Doe' }));
```

## Common Mistakes

### Mutating State Directly
Never modify the state variable directly. React won't know it changed, and won't re-render.

```typescript
// ❌ Won't trigger re-render
user.name = 'Jane';

// ✅ Correct
setUser({ ...user, name: 'Jane' });
```

### Initializer Function
If your initial state is expensive to calculate (e.g., reading from LocalStorage), pass a function to `useState`. This ensures the logic only runs on the **first render**.

```typescript
// ❌ Runs on every render (slow)
const [data, setData] = useState(calculateExpensiveData());

// ✅ Runs only on mount (fast)
const [data, setData] = useState(() => calculateExpensiveData());
```