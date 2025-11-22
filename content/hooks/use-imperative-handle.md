---
title: useImperativeHandle in 3 Minutes
description: How to expose custom functions from a child component to a parent using Refs.
lastUpdated: 2025-11-21
category: React Hooks
related: ['hooks/use-ref-explained', 'components/forward-ref']
---

## What is it?

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`.

Normally, you shouldn't need this. React flows data down via props. But sometimes, you need to imperatively trigger a child function (like `scrollBy`, `focus`, or `playVideo`).

## Syntax

It must be used with `forwardRef`.

```typescript
import { forwardRef, useImperativeHandle, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // We only expose these two methods to the parent
    // The parent CANNOT access the real DOM node or other internals
    alertHi: () => alert('Hi'),
    focus: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} />;
});
```

## Usage in Parent

```typescript
function Parent() {
  const ref = useRef();

  return (
    <>
      <CustomInput ref={ref} />
      <button onClick={() => ref.current.alertHi()}>
        Trigger Child Alert
      </button>
    </>
  );
}
```

## Best Practices

Avoid this hook. It breaks the declarative nature of React. Only use it for:
1.  Managing focus / selection / media playback.
2.  Triggering imperative animations.
3.  Integrating with third-party DOM libraries.
