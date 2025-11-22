---
title: useDebugValue for Custom Hooks
description: How to improve your debugging experience in React DevTools by labeling your custom hooks.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/custom-use-fetch', 'hooks/use-state-explained']
---

## What is it?

`useDebugValue` is a simple hook that adds a label to React DevTools for your custom hooks. It has no effect on your application logic.

## Example

Imagine you built a `useFriendStatus` hook. In DevTools, it normally just says `State: "Online"`. You can make it prettier.

```typescript
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ... logic ...

  // Show "Online" or "Offline" next to the hook name in DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

## Lazy Formatting

If calculating the debug value is expensive (like parsing a date), pass a formatting function as the second argument. React will only run this function when you actually inspect the component in DevTools.

```typescript
useDebugValue(date, date => date.toDateString());
```
