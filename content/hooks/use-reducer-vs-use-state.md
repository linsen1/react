---
title: useReducer vs useState: Best Practices
description: When should you switch from useState to useReducer? Learn how to manage complex state logic and state transitions.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-state-explained', 'hooks/use-context-examples']
---

## The Rule of Thumb

*   Use **`useState`** for simple values (strings, booleans, numbers).
*   Use **`useReducer`** for complex objects or when the next state depends on the previous one in complex ways.

## When `useState` becomes messy

Imagine a form with multiple loading states, data, and errors.

```typescript
// ❌ Hard to read and maintain updates
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchUser = () => {
  setLoading(true);
  setError(null); // Forgot to reset data?
  fetch().then(res => {
     setLoading(false);
     setData(res);
  }).catch(err => {
     setLoading(false);
     setError(err);
  });
}
```

## The `useReducer` Solution

Reducers let you describe **"What happened"** (Actions) rather than **"How to update"**.

```typescript
const initialState = { loading: false, error: null, data: null };

function reducer(state, action) {
  switch (action.type) {
    case 'START': 
      return { ...state, loading: true, error: null };
    case 'SUCCESS': 
      return { loading: false, data: action.payload, error: null };
    case 'ERROR': 
      return { loading: false, error: action.payload, data: null };
  }
}

function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUser = () => {
    dispatch({ type: 'START' });
    fetch()
      .then(res => dispatch({ type: 'SUCCESS', payload: res }))
      .catch(err => dispatch({ type: 'ERROR', payload: err }));
  };
}
```

## Benefits

1.  **Predictable state transitions**: You can't accidentally end up in an impossible state (like `loading: true` AND `error: 'Failed'`).
2.  **Decoupled Logic**: The reducer function is pure JavaScript. You can move it to another file and test it easily without rendering React components.
