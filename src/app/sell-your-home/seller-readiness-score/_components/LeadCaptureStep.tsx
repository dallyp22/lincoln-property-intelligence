'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LeadCaptureData } from '@/types';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface LeadCaptureStepProps {
  onSubmit: (leadData: LeadCaptureData) => void;
  onShowResults: () => void;
  answers: Record<string, string | string[]>;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  preferredContact?: string;
}

const inputStyles =
  'block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

export function LeadCaptureStep({
  onSubmit,
  onShowResults,
  answers,
}: LeadCaptureStepProps) {
  // Form field state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredContact, setPreferredContact] = useState<
    'phone' | 'email' | 'text'
  >('email');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Basic validation
  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!address.trim()) newErrors.address = 'Property address is required';
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Calculate a quick score to pass along with lead data
      const { calculateSellerReadiness } = await import(
        '@/lib/engines/seller-readiness'
      );
      const result = calculateSellerReadiness(answers);

      const response = await fetch('/api/seller-readiness-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          preferredContact,
          score: result.totalScore,
          grade: result.grade,
          categoryScores: result.categories.map((c) => ({
            category: c.category,
            score: c.score,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit. Please try again.');
      }

      const leadData: LeadCaptureData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        preferredContact,
      };

      onSubmit(leadData);
      onShowResults();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactOptions: {
    value: 'phone' | 'email' | 'text';
    label: string;
  }[] = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'text', label: 'Text Message' },
  ];

  return (
    <motion.div className="mx-auto max-w-xl" {...fadeUp}>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50">
          <svg
            className="h-7 w-7 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold font-serif text-primary-900">
          Get Your Personalized Score Report
        </h2>
        <p className="mt-3 text-primary-600">
          You have answered all the questions. Enter your information below to
          see your detailed Seller Readiness Score, category breakdown, and
          personalized improvement recommendations.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
        noValidate
      >
        {/* Name fields -- side by side */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="lead-firstName"
              className="block text-sm font-medium text-primary-700"
            >
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              id="lead-firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              className={cn(
                inputStyles,
                'mt-1',
                errors.firstName &&
                  'border-red-400 focus:border-red-500 focus:ring-red-500'
              )}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lead-lastName"
              className="block text-sm font-medium text-primary-700"
            >
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              id="lead-lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              className={cn(
                inputStyles,
                'mt-1',
                errors.lastName &&
                  'border-red-400 focus:border-red-500 focus:ring-red-500'
              )}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="lead-email"
            className="block text-sm font-medium text-primary-700"
          >
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={cn(
              inputStyles,
              'mt-1',
              errors.email &&
                'border-red-400 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="lead-phone"
            className="block text-sm font-medium text-primary-700"
          >
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(402) 555-0123"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            className={cn(
              inputStyles,
              'mt-1',
              errors.phone &&
                'border-red-400 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Property Address */}
        <div>
          <label
            htmlFor="lead-address"
            className="block text-sm font-medium text-primary-700"
          >
            Property Address <span className="text-red-400">*</span>
          </label>
          <input
            id="lead-address"
            type="text"
            autoComplete="street-address"
            placeholder="1234 O Street, Lincoln, NE 68508"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
            }}
            className={cn(
              inputStyles,
              'mt-1',
              errors.address &&
                'border-red-400 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {errors.address}
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <fieldset>
          <legend className="block text-sm font-medium text-primary-700">
            Preferred Contact Method
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {contactOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={option.value}
                  checked={preferredContact === option.value}
                  onChange={() => setPreferredContact(option.value)}
                  className="h-4 w-4 border-surface-300 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-primary-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Submit error */}
        {submitError && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {submitError}
          </div>
        )}

        {/* Submit button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Calculating Your Score...
              </>
            ) : (
              'See My Score'
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs leading-relaxed text-primary-400">
          By submitting, you agree to be contacted by the Home Design Real
          Estate Group. Your information is kept confidential and will never be
          shared.
        </p>
      </form>
    </motion.div>
  );
}
