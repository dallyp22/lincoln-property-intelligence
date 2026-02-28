import Link from 'next/link';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQ } from '@/types';

interface FAQBlockProps {
  faqs: FAQ[];
}

export function FAQBlock({ faqs }: FAQBlockProps) {
  return (
    <section
      className="bg-surface-50 py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">
            Have Questions?
          </p>
          <h2
            id="faq-heading"
            className="mt-2 font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Lincoln Real Estate: Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-primary-600">
            Common questions about buying, selling, and investing in Lincoln,
            Nebraska real estate.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10">
          <Accordion items={faqs} />
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-primary-600">
            Have a specific question about Lincoln real estate?
          </p>
          <Link
            href="/ask-a-realtor"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 transition-colors hover:text-accent-600"
          >
            Browse all articles in Ask a Realtor
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
