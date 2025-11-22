---
title: Deep Compare useEffect Pattern
description: How to handle objects in the dependency array without causing infinite loops using Deep Comparison.
lastUpdated: 2025-11-22
category: Advanced Topics
related: ['hooks/use-effect-dependencies', 'hooks/use-ref-explained']
---

## The Problem

```typescript
const options = { color: 'red' };

useEffect(() => {
  // Runs on EVERY render because options !== options (reference check)
}, [options]);
```

## Solution 1: JSON.stringify (Cheap Hack)

For small objects, this works.

```typescript
useEffect(() => {
  // ...
}, [JSON.stringify(options)]);
```

## Solution 2: useDeepCompareEffect (Professional)

Use a custom hook that uses `useRef` to hold the previous value and Lodash's `isEqual` to compare.

```typescript
import { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

function useDeepCompareEffect(callback, dependencies) {
  const currentDepsRef = useRef();

  if (!isEqual(currentDepsRef.current, dependencies)) {
    currentDepsRef.current = dependencies;
  }

  useEffect(callback, [currentDepsRef.current]);
}
```