---
title: Understanding useId in React 19
description: Generate unique IDs for accessibility attributes (aria-describedby) that are safe for Server-Side Rendering (SSR).
lastUpdated: 2025-11-21
category: React Hooks
related: ['forms/react-hook-form', 'components/controlled-inputs']
---

## The Problem with Random IDs

In the past, people used `Math.random()` to generate IDs for form labels.

```typescript
// ❌ BAD: Causes Hydration Mismatch
const id = Math.random();
return <label htmlFor={id}>...</label>
```

This breaks in Next.js or SSR because the server generates `0.123` but the client generates `0.456`. React throws an error because the HTML doesn't match.

## The `useId` Solution

`useId` generates a stable, unique ID that is the same on both the server and the client.

```typescript
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();

  return (
    <>
      <label>
        Password:
        <input 
          type="password" 
          aria-describedby={passwordHintId} 
        />
      </label>
      <p id={passwordHintId}>
        Password should be 18 characters long.
      </p>
    </>
  );
}
```

## Notes

*   **Do not use it for CSS selectors**. It contains colons (`:r1:`) which are invalid in CSS selectors unless escaped.
*   **Do not use it for list keys**. Use data IDs (`item.id`) for list keys, not `useId`.
