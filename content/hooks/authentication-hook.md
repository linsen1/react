---
title: React Authentication Hook
description: A reusable hook pattern for managing user login sessions using Context and LocalStorage.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-context-examples', 'state/context-api']
---

## The Architecture

Do not store auth state in a single component. Use a **Context Provider** that wraps your App.

## The Provider

```typescript
// auth-context.tsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally validate token via API here
      setUser({ token }); 
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```