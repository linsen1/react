---
title: Multi-Step Form Component
description: Manage complex wizard-style forms with validation between steps.
lastUpdated: 2025-11-23
category: Advanced & System
related: ['hooks/form-validation', 'state/context-api']
---

## The Strategy

1.  Keep all form data in a central state object.
2.  Track `currentStep` index.
3.  Render different components based on step.

## The Code

```typescript
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div>
      {/* Progress Bar */}
      <div className="flex mb-8">
        <div className={`h-2 flex-1 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`} />
        <div className={`h-2 flex-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
        <div className={`h-2 flex-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`} />
      </div>

      {/* Steps */}
      {step === 1 && <StepOne data={formData} update={setFormData} />}
      {step === 2 && <StepTwo data={formData} update={setFormData} />}
      {step === 3 && <Review data={formData} />}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} disabled={step === 1}>Back</button>
        <button onClick={nextStep} disabled={step === 3}>Next</button>
      </div>
    </div>
  );
}
```