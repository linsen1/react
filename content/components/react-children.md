
---
title: React Children Deep Dive
description: Understanding props.children. How to build slot-based components and layout wrappers.
lastUpdated: 2025-11-23
category: Components
related: ['components/composition-vs-inheritance', 'patterns/render-props']
---

## What is `children`?

It is a special prop that automatically passes whatever is nested inside the opening and closing tags of a component.

```typescript
<Card>
  <h1>This is passed as children</h1>
</Card>
```

## Manipulating Children

React provides `React.Children` utilities (though modern React prefers array methods if children is an array).

```typescript
import { Children } from 'react';

function List({ children }) {
  return (
    <ul>
      {Children.map(children, (child) => (
        <li className="p-2 border-b">{child}</li>
      ))}
    </ul>
  );
}
```

## Multiple "Slots"

You don't have to use `children`. You can pass components as regular props (Slots pattern).

```typescript
function Layout({ sidebar, content }) {
  return (
    <div className="flex">
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  );
}

// Usage
<Layout 
  sidebar={<Menu />} 
  content={<Dashboard />} 
/>
```
