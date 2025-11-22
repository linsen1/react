
import { CategoryNode } from '../types';

export const CATEGORIES: CategoryNode[] = [
  {
    name: 'React Hooks',
    slug: 'hooks',
    icon: 'zap',
    description: 'Complete reference for all React Hooks, from basics to advanced patterns.',
    groups: [
      {
        name: 'Core Hooks (Fundamentals)',
        articles: [
          { title: 'useState Explained', slug: 'hooks/use-state-explained' },
          { title: 'useState vs useRef', slug: 'hooks/use-state-vs-use-ref' },
          { title: 'How useEffect Works', slug: 'hooks/use-effect-works' },
          { title: 'useEffect Cleanup', slug: 'hooks/use-effect-cleanup' },
          { title: 'Dependency Array Guide', slug: 'hooks/use-effect-dependencies' },
          { title: 'Common useEffect Mistakes', slug: 'hooks/use-effect-mistakes' },
          { title: 'useContext Examples', slug: 'hooks/use-context-examples' },
          { title: 'useReducer vs useState', slug: 'hooks/use-reducer-vs-use-state' },
          { title: 'useCallback Guide', slug: 'hooks/use-callback-guide' },
          { title: 'useMemo Performance', slug: 'hooks/use-memo-performance' },
          { title: 'useRef Explained', slug: 'hooks/use-ref-explained' },
          { title: 'useLayoutEffect', slug: 'hooks/use-layout-effect' },
          { title: 'useImperativeHandle', slug: 'hooks/use-imperative-handle' },
          { title: 'useDebugValue', slug: 'hooks/use-debug-value' },
          { title: 'useId in React 19', slug: 'hooks/use-id' },
        ]
      },
      {
        name: 'Custom Hooks (High Traffic)',
        articles: [
          { title: 'Build useFetch', slug: 'hooks/custom-use-fetch' },
          { title: 'useLocalStorage', slug: 'hooks/custom-use-local-storage' },
          { title: 'useDebounce', slug: 'hooks/custom-use-debounce' },
          { title: 'useThrottle', slug: 'hooks/custom-use-throttle' },
          { title: 'useHover', slug: 'hooks/custom-use-hover' },
          { title: 'useIsMounted', slug: 'hooks/custom-use-is-mounted' },
          { title: 'useDarkMode', slug: 'hooks/custom-use-dark-mode' },
          { title: 'useEventListener', slug: 'hooks/custom-use-event-listener' },
          { title: 'useMediaQuery', slug: 'hooks/custom-use-media-query' },
          { title: 'useScrollPosition', slug: 'hooks/custom-use-scroll-position' },
          { title: 'useInfiniteScroll', slug: 'hooks/custom-use-infinite-scroll' },
          { title: 'useInterval', slug: 'hooks/custom-use-interval' },
          { title: 'useTimeout', slug: 'hooks/custom-use-timeout' },
          { title: 'useClickOutside', slug: 'hooks/custom-use-click-outside' },
          { title: 'useToggle', slug: 'hooks/custom-use-toggle' },
        ]
      },
      {
        name: 'Common Use Cases',
        articles: [
          { title: 'Form Validation', slug: 'hooks/form-validation' },
          { title: 'Fetching API Best Practice', slug: 'hooks/fetching-api-best-practice' },
          { title: 'File Upload Hook', slug: 'hooks/file-upload-hook' },
          { title: 'Pagination Hook', slug: 'hooks/pagination-hook' },
          { title: 'Infinite Loading', slug: 'hooks/infinite-loading' },
          { title: 'Search Filter', slug: 'hooks/search-filter' },
          { title: 'Theme Toggle', slug: 'hooks/theme-toggle' },
          { title: 'Window Size', slug: 'hooks/window-size' },
          { title: 'Copy to Clipboard', slug: 'hooks/copy-to-clipboard' },
          { title: 'Authentication Hook', slug: 'hooks/authentication-hook' },
        ]
      },
      {
        name: 'Advanced Topics',
        articles: [
          { title: 'Prevent Re-Renders', slug: 'hooks/prevent-re-renders' },
          { title: 'When useMemo Hurts', slug: 'hooks/when-use-memo-hurts' },
          { title: 'Deep Compare Pattern', slug: 'hooks/deep-compare-pattern' },
          { title: 'Stabilizing Functions', slug: 'hooks/stabilizing-functions' },
          { title: 'Previous Values with useRef', slug: 'hooks/previous-values-use-ref' },
          { title: 'useEffect Twice in Dev', slug: 'hooks/use-effect-twice' },
          { title: 'Race Conditions', slug: 'hooks/race-conditions' },
          { title: 'useEffect vs useEvent', slug: 'hooks/use-effect-vs-use-event' },
          { title: 'Internal Scheduling', slug: 'hooks/internal-scheduling' },
          { title: 'useReducer + Context', slug: 'hooks/usereducer-context' },
        ]
      },
      {
        name: 'React 19 / 2025 Trends',
        articles: [
          { title: 'useEvent Explained', slug: 'hooks/use-event' },
          { title: 'useTransition', slug: 'hooks/use-transition' },
          { title: 'useOptimistic', slug: 'hooks/use-optimistic' },
          { title: 'Compiler + Hooks', slug: 'hooks/react-compiler-hooks' },
          { title: 'Hooks Anti-Patterns 2025', slug: 'hooks/anti-patterns-2025' },
        ]
      }
    ]
  },
  {
    name: 'Components',
    slug: 'components',
    icon: 'box',
    description: 'Master React component architecture, patterns, and build common UI elements from scratch.',
    groups: [
      {
        name: 'Fundamentals',
        articles: [
          { title: 'Reusable Components', slug: 'components/reusable-components' },
          { title: 'Controlled vs Uncontrolled', slug: 'components/controlled-vs-uncontrolled' },
          { title: 'Lifting State Up', slug: 'components/lifting-state-up' },
          { title: 'Conditional Rendering', slug: 'components/conditional-rendering' },
          { title: 'React Children', slug: 'components/react-children' },
          { title: 'Props Drilling', slug: 'components/props-drilling' },
          { title: 'Passing Functions', slug: 'components/passing-functions' },
        ]
      },
      {
        name: 'Patterns',
        articles: [
          { title: 'Composition vs Inheritance', slug: 'components/composition-vs-inheritance' },
          { title: 'Smart vs Dumb', slug: 'components/smart-vs-dumb' },
          { title: 'Container vs Presentational', slug: 'components/container-presentational' },
          { title: 'React.memo Usage', slug: 'components/react-memo-usage' },
        ]
      },
      {
        name: 'UI Elements',
        articles: [
          { title: 'Modal Component', slug: 'components/modal-component' },
          { title: 'Dropdown Component', slug: 'components/dropdown-component' },
          { title: 'Tabs Component', slug: 'components/tabs-component' },
          { title: 'Switch Toggle', slug: 'components/switch-toggle' },
          { title: 'Pagination', slug: 'components/pagination-component' },
          { title: 'Accordion', slug: 'components/accordion-component' },
          { title: 'Toast Notification', slug: 'components/toast-notification' },
          { title: 'Skeleton Loading', slug: 'components/skeleton-loading' },
        ]
      },
      {
        name: 'Advanced & System',
        articles: [
          { title: 'Protected Route', slug: 'components/protected-route' },
          { title: 'Multi-Step Form', slug: 'components/multi-step-form' },
          { title: 'File Upload', slug: 'components/file-upload' },
          { title: 'Search Input', slug: 'components/search-input' },
          { title: 'Error Boundary', slug: 'components/error-boundary' },
          { title: 'Suspense Boundary', slug: 'components/suspense-boundary' },
          { title: 'Fallback UI', slug: 'components/fallback-ui' },
          { title: 'Drag and Drop', slug: 'components/drag-and-drop' },
          { title: 'Virtualized List', slug: 'components/virtualized-list' },
          { title: 'Image Lazy Load', slug: 'components/image-lazy-loading' },
        ]
      }
    ]
  },
  {
    name: 'State Management',
    slug: 'state',
    icon: 'database',
    articles: [
      { title: 'Context API', slug: 'state/context-api' },
      { title: 'Redux Toolkit', slug: 'state/redux-toolkit' },
      { title: 'Zustand Guide', slug: 'state/zustand' },
      { title: 'Jotai Basics', slug: 'state/jotai' },
    ]
  },
  {
    name: 'Performance',
    slug: 'performance',
    icon: 'activity',
    articles: [
       { title: 'Debouncing & Throttling', slug: 'performance/debouncing-throttling' },
       { title: 'Lazy Loading', slug: 'performance/lazy-loading' },
       { title: 'Virtualization', slug: 'performance/virtualization' },
    ]
  },
  {
    name: 'React Router',
    slug: 'router',
    icon: 'map',
    articles: [
      { title: 'Nested Routes', slug: 'router/nested-routes' },
      { title: 'Protected Routes', slug: 'router/protected-routes' },
      { title: 'Loaders & Actions', slug: 'router/loaders-actions' },
    ]
  },
  {
    name: 'React + API',
    slug: 'api',
    icon: 'server',
    articles: [
      { title: 'Axios vs Fetch', slug: 'api/axios-vs-fetch' },
      { title: 'React Query Basics', slug: 'api/react-query' },
      { title: 'Handling Errors', slug: 'api/handling-errors' },
    ]
  },
  {
    name: 'Ecosystem',
    slug: 'ecosystem',
    icon: 'globe',
    articles: [
      { title: 'Next.js Basics', slug: 'ecosystem/nextjs' },
      { title: 'Vite Setup', slug: 'ecosystem/vite' },
      { title: 'Tailwind + React', slug: 'ecosystem/tailwind' },
    ]
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    icon: 'code',
    articles: [
      { title: 'Typing Props', slug: 'typescript/typing-props' },
      { title: 'Typing Hooks', slug: 'typescript/typing-hooks' },
      { title: 'Generics in React', slug: 'typescript/generics' },
    ]
  }
];

// Helper to flatten the structure for metadata lookup
export function getArticleMetadata(slug: string) {
  for (const cat of CATEGORIES) {
    // Check simple articles
    if (cat.articles) {
      const found = cat.articles.find(a => a.slug === slug);
      if (found) return { ...found, category: cat.name };
    }
    // Check grouped articles
    if (cat.groups) {
      for (const group of cat.groups) {
        const found = group.articles.find(a => a.slug === slug);
        if (found) return { ...found, category: `${cat.name} / ${group.name}` };
      }
    }
  }
  return null;
}
