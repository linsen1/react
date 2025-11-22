---
title: File Upload Component
description: A drag-and-drop file uploader with progress bars and visual feedback.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['hooks/file-upload-hook', 'hooks/custom-use-fetch']
---

## The UI

This component handles the drag events (dragover, drop) to highlight the zone.

```typescript
import { useState } from 'react';

function FileUploader({ onUpload }) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-8 rounded-lg text-center transition-colors 
        ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <p>Drag & Drop files here or click to upload</p>
    </div>
  );
}
```