---
title: useReducer + Context State Architecture
description: A scalable state management pattern that mimics Redux without external libraries.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-reducer-vs-use-state', 'state/context-api']
---

## The Pattern

1.  **StateContext**: Holds the `state` object.
2.  **DispatchContext**: Holds the `dispatch` function.

Separating them prevents unnecessary re-renders. Components that only need `dispatch` won't re-render when `state` changes.

## The Code

```typescript
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

## Usage

```typescript
// Child component
const dispatch = useContext(TasksDispatchContext);
// Does NOT re-render when tasks change!
return <button onClick={() => dispatch({ type: 'add' })}>Add</button>;
```