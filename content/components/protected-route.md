
---
title: Protected Route Component (Auth)
description: How to secure routes in React Router. Redirect unauthenticated users to login.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['hooks/authentication-hook', 'router/protected-routes']
---

## The Code

This wrapper checks if a user is logged in. If not, it redirects them.

```typescript
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, but save the current location 
    // so we can send them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes
  return <Outlet />;
}
```

## Usage

```typescript
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```
