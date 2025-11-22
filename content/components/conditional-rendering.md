
---
title: Conditional Rendering Best Practices
description: Stop writing messy ternary operators. Learn clean patterns for showing and hiding elements in React.
lastUpdated: 2025-11-23
category: Components
related: ['components/smart-vs-dumb', 'hooks/custom-use-toggle']
---

## 1. The "&&" Operator (Short Circuit)

Best for "Show if true, hide if false".

```typescript
// ⚠️ Careful with number 0:  {0 && <Component />} renders "0"
{count > 0 && <Badge count={count} />}
```

## 2. The Ternary (If/Else)

Best for "Show A if true, Show B if false".

```typescript
{isLoggedIn ? <Dashboard /> : <Login />}
```

## 3. Early Return (Guard Clauses)

Keep your JSX clean by returning `null` early.

```typescript
function UserProfile({ user }) {
  if (!user) return null; // or <Spinner />

  return <div>{user.name}</div>;
}
```

## 4. Enums / Config Objects

Best for multiple states (Switch case).

```typescript
const STATUS_COMPONENTS = {
  loading: <Spinner />,
  error: <ErrorMsg />,
  success: <DataView />,
};

return <div>{STATUS_COMPONENTS[status]}</div>;
```
