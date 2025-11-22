
---
title: Props Drilling Problem Explained
description: Why passing props down 10 levels is bad, and how to fix it using Composition or Context.
lastUpdated: 2025-11-23
category: Components
related: ['hooks/use-context-examples', 'components/composition-vs-inheritance']
---

## The Problem

**Prop Drilling** occurs when you pass data through components that **don't need it**, just to get it to a deep child component.

```typescript
// ❌ Navbar doesn't need 'user', but accepts it to pass to Avatar
<App user={user} />
  <Navbar user={user} />
    <Avatar user={user} />
```

## Solution 1: Composition (Inversion of Control)

Pass the component itself instead of the data.

```typescript
function Navbar({ avatarSlot }) {
  return <nav>{avatarSlot}</nav>;
}

// App handles the data, Navbar just renders the slot
<Navbar avatarSlot={<Avatar user={user} />} />
```

## Solution 2: Context

If data is global (User, Theme, Locale), use `useContext`.
