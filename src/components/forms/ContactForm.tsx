'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Silently handle — future: show error toast
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent-200 bg-accent-50 p-6 text-center">
        <svg className="mx-auto h-10 w-10 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-3 text-lg font-semibold text-primary-900">Message Sent</h3>
        <p className="mt-1 text-sm text-primary-500">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-primary-700 mb-1">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Your full name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-primary-700 mb-1">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="you@email.com"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-primary-700 mb-1">
          Phone <span className="text-primary-300">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="(402) 555-0100"
          {...register('phone')}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-primary-700 mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-300 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 resize-none"
          placeholder="How can we help you?"
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
