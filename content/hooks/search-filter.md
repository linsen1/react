---
title: Search Filter Hook
description: Filter an array of objects based on a search query string.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-memo-performance', 'hooks/custom-use-debounce']
---

## The Code

```typescript
import { useState, useMemo } from 'react';

export function useSearchFilter<T>(data: T[], searchKeys: (keyof T)[]) {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(lowerQuery)
      )
    );
  }, [data, query, searchKeys]);

  return { query, setQuery, filteredData };
}
```

## Usage

```typescript
const users = [{ name: 'John', role: 'Admin' }, { name: 'Jane', role: 'User' }];

function UserList() {
  const { query, setQuery, filteredData } = useSearchFilter(users, ['name']);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users..." />
      <ul>
        {filteredData.map(u => <li key={u.name}>{u.name}</li>)}
      </ul>
    </>
  );
}
```