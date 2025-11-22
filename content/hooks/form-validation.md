---
title: React Form Validation using Hooks
description: Build a lightweight, reusable form validation hook without external libraries like React Hook Form.
lastUpdated: 2025-11-22
category: Common Use Cases
related: ['hooks/use-state-explained', 'hooks/controlled-inputs']
---

## Why build this?

For simple login or contact forms, installing a huge library might be overkill. A custom hook can handle validation rules, errors, and dirty states in < 50 lines of code.

## The Code

```typescript
import { useState, useCallback } from 'react';

type ValidationRules = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
};

type Errors = Record<string, string>;

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = useCallback((name: string, value: string, rules?: ValidationRules) => {
    if (!rules) return '';
    
    if (rules.required && !value) return 'This field is required';
    if (rules.minLength && value.length < rules.minLength) return `Min length is ${rules.minLength}`;
    if (rules.pattern && !rules.pattern.test(value)) return 'Invalid format';
    
    return '';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return { values, errors, handleChange, setErrors, validate };
}
```

## Usage

```typescript
function LoginForm() {
  const { values, errors, handleChange, setErrors, validate } = useForm({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validate('email', values.email, { required: true, pattern: /^\S+@\S+$/ });
    const passError = validate('password', values.password, { required: true, minLength: 6 });

    if (emailError || passError) {
      setErrors({ email: emailError, password: passError });
      return;
    }

    console.log('Submitting', values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input name="password" value={values.password} onChange={handleChange} />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```