---
title: Custom useScrollPosition Hook
description: Track the scroll position of the window or an element. Great for "Sticky" headers or "Scroll to Top" buttons.
lastUpdated: 2025-11-21
category: Custom Hooks
related: ['hooks/use-layout-effect', 'hooks/custom-use-throttle']
---

## The Code

```typescript
import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}
```

> **Pro Tip:** Combine this with `useThrottle` for better performance on scroll-heavy pages.

## Usage

```typescript
function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  return (
    <nav className={isScrolled ? 'bg-white shadow' : 'bg-transparent'}>
      Logo
    </nav>
  );
}
```
