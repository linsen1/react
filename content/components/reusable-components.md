
---
title: How to Build Reusable Components
description: Learn the principles of DRY (Don't Repeat Yourself) in React. How to design APIs for your components that scale.
lastUpdated: 2025-11-23
category: Components
related: ['components/composition-vs-inheritance', 'typescript/typing-props']
---

## The Golden Rule

> "Build components that are open for extension, but closed for modification."

## 1. Avoid "God Components"

A common mistake is creating a `Button` component that takes 50 props.

```typescript
// ❌ Too many props = hard to maintain
<Button 
  text="Click" 
  icon="user" 
  red 
  large 
  onClick={...} 
  toolTip="Hi" 
/>
```

Instead, use **Composition**.

```typescript
// ✅ Composable API
<Button variant="danger" size="lg">
  <Icon name="user" />
  <span>Click me</span>
</Button>
```

## 2. Merge Refs and Classes

Reusable components must accept `className` and `style` from the parent to allow customization. Use libraries like `clsx` or `tailwind-merge`.

```typescript
function Card({ children, className, ...props }) {
  return (
    <div className={`bg-white rounded shadow ${className}`} {...props}>
      {children}
    </div>
  );
}
```

## 3. Forward Refs

Always use `forwardRef` for core UI elements so parents can manage focus or measure dimensions.
