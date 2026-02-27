'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';

interface NewsletterFormData {
  email: string;
}

export function NewsletterSignup({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>();

  async function onSubmit(data: NewsletterFormData) {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Future: show error
    }
  }

  if (submitted) {
    return (
      <div className={className}>
        <p className="text-sm text-accent-400 font-medium">
          You&apos;re subscribed! Watch for our next market report.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 rounded-lg border border-surface-200 px-3 py-2 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="your@email.com"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Subscribe'}
        </Button>
      </div>
      {errors.email && <p className="mt-1 text-xs text-red-400">Please enter a valid email.</p>}
    </form>
  );
}
