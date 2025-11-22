---
title: File Upload Hook (with Preview)
description: Handle drag-and-drop file uploads and generate image previews automatically.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-effect-cleanup', 'hooks/use-state-explained']
---

## The Code

```typescript
import { useState, useEffect } from 'react';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Create a preview URL when file changes
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    // Create blob URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Free memory when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    setFile(e.target.files[0]);
  };

  return { file, preview, onSelectFile };
}
```

## Usage

```typescript
function AvatarUpload() {
  const { file, preview, onSelectFile } = useFileUpload();

  return (
    <div>
      <input type="file" onChange={onSelectFile} accept="image/*" />
      {preview && (
        <img src={preview} alt="Preview" style={{ width: 100, height: 100 }} />
      )}
    </div>
  );
}
```