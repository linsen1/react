---
title: Custom useMediaQuery Hook
description: Subscribe to CSS media queries in JavaScript. Useful for conditional rendering based on screen size.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/custom-use-event-listener', 'hooks/use-effect-works']
---

## The Code

```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    // Modern browsers
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
```

## Usage

```typescript
function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? <MobileMenu /> : <DesktopSidebar />}
    </div>
  );
}
```
