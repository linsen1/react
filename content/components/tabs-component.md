
---
title: Building a Tabs Component
description: Create a flexible Tabs interface with accessible keyboard navigation.
lastUpdated: 2025-11-23
category: UI Elements
related: ['components/reusable-components', 'hooks/use-state-explained']
---

## The Code

```typescript
import { useState } from 'react';

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// Usage
<Tabs tabs={[
  { label: 'Account', content: <AccountForm /> },
  { label: 'Settings', content: <SettingsForm /> }
]} />
```
