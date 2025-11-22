---
title: useEffect Dependency Array Explained
description: Master the dependency array to control when your effects run. Learn about referential equality and infinite loops.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-effect-works', 'hooks/use-memo-performance']
---

## The Golden Rule

> **"If you use a variable inside useEffect, it belongs in the dependency array."**

React relies on this array to know when to re-synchronize your component.

## Scenarios

### 1. Empty Array `[]`
**When:** You want the effect to run **only once** (on mount).
**Use case:** Initial data fetching, setting up a WebSocket.

### 2. No Array (Omitted)
**When:** You want it to run after **every single render**.
**Use case:** Logging every update (rare).

### 3. Specific Props/State `[userId]`
**When:** You want to run it only when `userId` changes.
**Use case:** Fetching new user data when the ID in the URL changes.

## The "Object Reference" Trap

This is the #1 source of bugs. In JavaScript, `{ id: 1 } !== { id: 1 }`.

```typescript
// ❌ This causes an INFINITE LOOP or constant re-runs
function Profile({ options }) {
  useEffect(() => {
    console.log('Options changed');
  }, [options]); // 'options' is a new object every render!
}

// Usage in parent
<Profile options={{ color: 'red' }} /> 
```

**The Fix:**
1.  Wrap the object in `useMemo` in the parent.
2.  Pass primitive values (`options.color`) instead of the whole object.

## The Linter is Your Friend

Install `eslint-plugin-react-hooks`. It will auto-fix missing dependencies for you. **Never ignore its warnings.** If the linter says you are missing a dependency, you usually have a bug in your logic, not a bug in the linter.
