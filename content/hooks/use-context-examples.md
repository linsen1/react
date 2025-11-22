---
title: useContext Explained with Real Examples
description: Stop prop drilling. Learn how to use the Context API to share state globally (like themes or user auth) across your React app.
lastUpdated: 2025-11-20
category: React Hooks
related: ['hooks/use-reducer-vs-use-state', 'state/context-api']
---

## The Problem: Prop Drilling

Imagine you have a `User` object in your top-level `<App />`. You want to display the user's avatar in a `<Navbar />` -> `<UserMenu />` -> `<Avatar />` component.

Passing `props={user}` down 4 layers is tedious and hard to maintain. **Context** solves this.

## How to Implement Context

There are 3 steps: **Create**, **Provide**, **Consume**.

### Step 1: Create the Context

```typescript
// UserContext.ts
import { createContext } from 'react';

export const UserContext = createContext(null);
```

### Step 2: Provide the Data

Wrap your component tree with the Provider.

```typescript
// App.tsx
import { UserContext } from './UserContext';

function App() {
  const user = { name: 'Alice', role: 'Admin' };

  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <MainContent />
    </UserContext.Provider>
  );
}
```

### Step 3: Consume with `useContext`

Any child component can now grab the value directly, skipping the middle layers.

```typescript
// Avatar.tsx
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Avatar() {
  const user = useContext(UserContext); // { name: 'Alice', role: 'Admin' }

  if (!user) return <button>Login</button>;

  return <img src={user.avatar} alt={user.name} />;
}
```

## Best Practice: The Custom Provider Pattern

Don't export the raw Context. Instead, create a custom hook and a wrapper component. This encapsulates the logic.

```typescript
// hooks/useAuth.tsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

Now your app code is much cleaner:

```typescript
// Profile.tsx
import { useAuth } from './hooks/useAuth';

function Profile() {
  const { user, logout } = useAuth(); // Clean API!
  return <button onClick={logout}>Logout {user.name}</button>;
}
```