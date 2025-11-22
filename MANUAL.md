# 📘 React.wiki Content Management Manual (操作手册)

Welcome to the **react.wiki** content management guide. This system is designed to be simple: **Static Markdown files** drive the content, and a **Data file** drives the navigation.

---

## 🚀 Quick Workflow (三步发布法)

To add a new article (e.g., "How to use useMemo"), follow these 3 steps:

### Step 1: Create the Markdown File
Go to the `public/content/` folder. Create a file corresponding to your category.
*   **Path:** `public/content/performance/use-memo-guide.md`

### Step 2: Add Frontmatter (Metadata)
At the very top of your new `.md` file, you **MUST** add the metadata block (Frontmatter) between three dashes `---`.

```markdown
---
title: The Ultimate Guide to useMemo
description: Learn when to use useMemo to optimize performance and when to avoid it.
lastUpdated: 2025-11-20
category: Performance
related: ['hooks/use-callback-guide', 'performance/react-memo']
---

## Introduction

Start writing your content here using standard Markdown...
```

### Step 3: Register in Sidebar
Open `src/data/articles.ts`. Find the `Performance` category and add your link.

```typescript
// src/data/articles.ts

{
  name: 'Performance',
  slug: 'performance',
  icon: 'activity',
  articles: [
     // ... existing articles
     // ADD THIS LINE:
     { title: 'useMemo Guide', slug: 'performance/use-memo-guide' }, 
  ]
}
```

**Done!** Refresh your website, and the link will appear in the sidebar. Clicking it will load your markdown file.

---

## 📂 Folder Structure

```text
root/
├── public/
│   └── content/           <-- ALL YOUR ARTICLES LIVE HERE
│       ├── hooks/
│       │   ├── use-state.md
│       │   └── ...
│       ├── components/
│       └── ...
├── src/
│   └── data/
│       └── articles.ts    <-- THE MENU / SIDEBAR CONFIGURATION
```

> **Note:** The `slug` in `articles.ts` must match the file path in `public/content/` (excluding `.md`).
> *   File: `public/content/hooks/my-hook.md`
> *   Slug: `hooks/my-hook`

---

## 📝 Markdown Guide & Features

We support **GitHub Flavored Markdown**. Here are specific features available in react.wiki:

### 1. Code Blocks (With Copy Button)
Use triple backticks and specify the language (typescript, javascript, bash, etc.).

    ```typescript
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      document.title = `Count: ${count}`;
    }, [count]);
    ```

### 2. Callouts / Notes
To create a highlighted note or warning, use the `blockquote` syntax (`>`).

> **Note:** Always add dependencies to your useEffect array to avoid stale closures.

### 3. Tables
Standard markdown tables are automatically styled.

| Hook | Purpose |
| :--- | :--- |
| useState | Local state |
| useEffect | Side effects |

### 4. Images
Place images in `public/images/`.

```markdown
![React Lifecycle Diagram](/images/lifecycle.png)
```

---

## ⚙️ Metadata Reference (Frontmatter)

| Field | Required? | Description |
| :--- | :--- | :--- |
| `title` | **Yes** | The H1 title displayed at the top of the page. |
| `description` | **Yes** | The SEO description and summary shown below the title. |
| `category` | No | Used for breadcrumbs (e.g., "React Hooks"). |
| `lastUpdated` | No | Date string (e.g., "2025-10-24"). |
| `related` | No | Array of slugs `['hooks/use-state']` to show at the bottom as "Read Next". |

---

## ❓ Troubleshooting

**Q: My page shows a "Loading..." spinner forever.**
*   **Check 1:** Did you create the `.md` file in `public/content/`?
*   **Check 2:** Does the filename match the `slug` in `articles.ts` exactly? (Case sensitive!)
*   **Check 3:** Did you accidentally verify the file path relative to `src`? It must be in `public`.

**Q: My sidebar link says "Untitled" or shows weird text.**
*   Check your `src/data/articles.ts` file. The `title` property there controls the Sidebar text. The `title` in the Markdown file controls the Page Header text.

**Q: The content shows raw HTML code.**
*   This usually means the app couldn't find the `.md` file and returned the 404 HTML page instead. Check your file naming.
