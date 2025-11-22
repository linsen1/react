
---
title: Smart vs Dumb Component Pattern
description: Organizing your code by separating logic (Smart) from UI (Dumb). Also known as Container/Presentational.
lastUpdated: 2025-11-23
category: Components
related: ['components/container-presentational', 'hooks/custom-use-fetch']
---

## Dumb Components (Presentational)

*   Concerned with **how things look**.
*   Receive data via props.
*   Have no dependency on the rest of the app (Redux, API).
*   **Examples**: `Button`, `Card`, `Sidebar`.

```typescript
const UserList = ({ users }) => (
  <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
);
```

## Smart Components (Containers)

*   Concerned with **how things work**.
*   Provide data and behavior.
*   Call hooks, APIs, or Context.
*   **Examples**: `UserPage`, `DashboardContainer`.

```typescript
const UserPage = () => {
  const { data } = useFetch('/users');
  if (!data) return <Spinner />;
  return <UserList users={data} />;
};
```
