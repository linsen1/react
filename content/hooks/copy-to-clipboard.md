---
title: Copy to Clipboard Hook
description: Easily copy text to the user's clipboard and show a temporary "Copied!" state.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-state-explained', 'hooks/use-timeout']
---

## The Code

```typescript
import { useState } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset after 2s
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy] as const;
}
```