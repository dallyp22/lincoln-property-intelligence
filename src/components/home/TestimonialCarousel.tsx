'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={cn('h-5 w-5', i < rating ? 'text-secondary-400' : 'text-surface-200')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = testimonials.length;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    advance();
  }, [advance]);

  // Auto-advance every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;

    intervalRef.current = setInterval(advance, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, advance, total]);

  if (total === 0) return null;

  const testimonial = testimonials[current];

  return (
    <section
      className="bg-primary-900 py-16 sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl"
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative mx-auto max-w-3xl">
            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-800 text-primary-300 transition-colors hover:bg-primary-700 hover:text-white sm:-left-14"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-800 text-primary-300 transition-colors hover:bg-primary-700 hover:text-white sm:-right-14"
              aria-label="Next testimonial"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Testimonial Content */}
            <div
              key={testimonial.id}
              className="rounded-xl bg-primary-800/50 p-8 sm:p-10"
            >
              {/* Quote icon */}
              <div className="mb-6 text-secondary-400/40">
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              <StarRating rating={testimonial.rating} />

              <blockquote className="mt-4">
                <p className="text-base leading-relaxed text-primary-100 sm:text-lg">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-400 text-sm font-bold text-primary-900">
                  {testimonial.author
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-primary-300">
                    {testimonial.neighborhood}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              {testimonial.highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {testimonial.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-medium text-primary-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation dots */}
          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  index === current
                    ? 'w-8 bg-secondary-400'
                    : 'w-2.5 bg-primary-600 hover:bg-primary-500'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
