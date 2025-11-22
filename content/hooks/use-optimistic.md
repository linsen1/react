---
title: useOptimistic Updates
description: A React 19 hook for managing optimistic UI updates (showing the result before the server confirms).
lastUpdated: 2025-11-22
category: React 19 / 2025 Trends
related: ['hooks/use-transition', 'api/react-query']
---

## The Use Case

When a user sends a message, you want it to appear in the chat **instantly**, even before the server responds.

## The Code

```typescript
import { useOptimistic, useState, useRef } from 'react';

function Thread({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }]
  );

  return (
    <div>
      {optimisticMessages.map((m) => (
        <div key={m.text} style={{ opacity: m.sending ? 0.5 : 1 }}>
          {m.text}
        </div>
      ))}
      <form action={async (formData) => {
        const text = formData.get('text');
        addOptimisticMessage(text); // Show immediately
        await sendMessage(text);    // Server call
      }}>
        <input name="text" />
      </form>
    </div>
  );
}
```