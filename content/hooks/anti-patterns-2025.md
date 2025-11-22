---
title: Why some Hooks Become “Anti-Patterns” in 2025
description: Practices that were common in 2020 but are now discouraged in modern React development.
lastUpdated: 2025-11-22
category: React 19 / 2025 Trends
related: ['hooks/use-effect-mistakes', 'api/react-query']
---

## 1. Fetching in useEffect

**Why it's out:** It causes waterfalls (fetch-on-render) and requires manual boilerplate for loading/error/caching.
**The replacement:** Data Loaders (React Router 6.4+), Server Components (Next.js), or React Query.

## 2. Manual "useIsMounted" Checks

**Why it's out:** It suppresses errors rather than fixing the race condition. It usually indicates a memory leak in a promise that should have been cancelled.
**The replacement:** AbortController (see `useFetch`).

## 3. useMemo Everywhere

**Why it's out:** The React Compiler will handle this. Manually memoizing everything clutters code and can actually hurt performance (memory overhead).

## 4. Huge "useContext" Providers

**Why it's out:** Any update to the context value triggers a re-render in ALL consumers.
**The replacement:** Zustand, Jotai, or splitting Context into smaller pieces (State vs Dispatch).
