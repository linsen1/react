
---
title: Controlled vs Uncontrolled Components
description: The difference between managing state yourself versus letting the DOM handle it. When to use useRef vs useState for forms.
lastUpdated: 2025-11-23
category: Components
related: ['hooks/use-state-vs-use-ref', 'forms/react-hook-form']
---

## Controlled (The React Way)

React handles the state. The input value is always synced with `useState`.

*   **Pros**: Instant validation, conditional disabling, format enforcement.
*   **Cons**: Re-renders on every keystroke.

```typescript
const [val, setVal] = useState('');
return <input value={val} onChange={e => setVal(e.target.value)} />;
```

## Uncontrolled (The DOM Way)

The DOM handles the state. You read it only when needed using a Ref.

*   **Pros**: Better performance (no re-renders), easier to integrate with non-React code.
*   **Cons**: Harder to validate on-the-fly.

```typescript
const inputRef = useRef(null);
const handleSubmit = () => console.log(inputRef.current.value);
return <input ref={inputRef} />;
```

## Which one to use?

*   Use **Uncontrolled** for simple forms or huge forms (performance).
*   Use **Controlled** if you need to validate inputs as the user types (e.g. password strength).
