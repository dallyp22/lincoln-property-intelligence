'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';

interface AssessmentFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  message: string;
}

export function AssessmentRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssessmentFormData>();

  async function onSubmit(data: AssessmentFormData) {
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Future: show error toast
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-xl font-bold font-serif text-primary-900">Assessment Request Received</h3>
        <p className="mt-2 text-sm text-primary-500">
          We&apos;ll contact you within 24 hours to schedule your complimentary Polivka Property Assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="assessment-name" className="block text-sm font-medium text-primary-700 mb-1">
            Full Name *
          </label>
          <input
            id="assessment-name"
            type="text"
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            placeholder="Your full name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="assessment-email" className="block text-sm font-medium text-primary-700 mb-1">
            Email *
          </label>
          <input
            id="assessment-email"
            type="email"
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            placeholder="you@email.com"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="assessment-phone" className="block text-sm font-medium text-primary-700 mb-1">
            Phone *
          </label>
          <input
            id="assessment-phone"
            type="tel"
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            placeholder="(402) 555-0100"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="assessment-timeline" className="block text-sm font-medium text-primary-700 mb-1">
            Timeline
          </label>
          <select
            id="assessment-timeline"
            className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            {...register('timeline')}
          >
            <option value="">Select a timeline</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3months">1–3 months</option>
            <option value="3-6months">3–6 months</option>
            <option value="6-12months">6–12 months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="assessment-address" className="block text-sm font-medium text-primary-700 mb-1">
          Property Address *
        </label>
        <input
          id="assessment-address"
          type="text"
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="123 Main St, Lincoln, NE 68502"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
      <div>
        <label htmlFor="assessment-message" className="block text-sm font-medium text-primary-700 mb-1">
          Additional Details <span className="text-primary-300">(optional)</span>
        </label>
        <textarea
          id="assessment-message"
          rows={3}
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 resize-none"
          placeholder="Any specific concerns about your property?"
          {...register('message')}
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Request Your Assessment'}
      </Button>
      <p className="text-center text-xs text-primary-400">
        Complimentary assessment. No obligation. We&apos;ll respond within 24 hours.
      </p>
    </form>
  );
}
