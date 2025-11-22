---
title: Image Lazy Loading Component
description: A wrapper that only loads the image source when it scrolls into view.
lastUpdated: 2025-11-23
category: UI Elements
related: ['performance/lazy-loading', 'hooks/custom-use-infinite-scroll']
---

## The Code

Uses standard `loading="lazy"` for modern browsers, with a blur placeholder.

```typescript
import { useState } from 'react';

function LazyImage({ src, alt, placeholder }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-200">
      {/* Small placeholder blurred */}
      <img
        src={placeholder}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover filter blur-xl transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Real image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
```