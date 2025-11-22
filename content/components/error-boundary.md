
---
title: Error Boundary Component
description: How to catch JavaScript errors anywhere in your child component tree using Class Components.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['components/suspense-boundary', 'components/fallback-ui']
---

## Why Classes?

As of 2025, **Error Boundaries** are the only component type that *must* be written as a Class Component. Hooks do not yet support `componentDidCatch`.

## The Code

```typescript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## Usage

```typescript
<ErrorBoundary fallback={<p>Could not load feed.</p>}>
  <NewsFeed />
</ErrorBoundary>
```
