'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ChangeIndicator } from '@/components/ui/ChangeIndicator';
import { formatCurrency } from '@/lib/utils';
import type { Neighborhood } from '@/types';

interface NeighborhoodExplorerPreviewProps {
  neighborhoods: Neighborhood[];
}

export function NeighborhoodExplorerPreview({
  neighborhoods,
}: NeighborhoodExplorerPreviewProps) {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="neighborhoods-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="neighborhoods-heading"
            className="font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Explore Lincoln Neighborhoods
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-600">
            Discover detailed market data, school ratings, inspection insights,
            and investment metrics for Lincoln&apos;s most sought-after
            neighborhoods.
          </p>
        </div>

        {/* Neighborhood Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.slice(0, 5).map((neighborhood) => (
            <Link
              key={neighborhood.slug}
              href={`/neighborhoods/${neighborhood.slug}`}
              className="group block"
            >
              <Card hover className="h-full transition-colors group-hover:border-accent-400">
                {/* Header row: name + segment */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                      {neighborhood.name}
                    </h3>
                    <p className="mt-1 text-sm text-primary-500 line-clamp-2">
                      {neighborhood.tagline}
                    </p>
                  </div>
                  <Badge segment={neighborhood.segment} size="sm">
                    {neighborhood.segment}
                  </Badge>
                </div>

                {/* Stats grid */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-surface-200 pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-400">
                      Median Price
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary-900">
                      {formatCurrency(neighborhood.market.medianPrice)}
                    </p>
                    <ChangeIndicator
                      value={neighborhood.market.medianPriceChange}
                      size="sm"
                      label="YoY"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-400">
                      Avg. DOM
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary-900">
                      {neighborhood.market.averageDom} days
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-400">
                      Active Listings
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary-900">
                      {neighborhood.market.activeInventory}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-400">
                      Price / sqft
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary-900">
                      ${neighborhood.market.averagePricePerSqft}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {/* "View All" card for the sixth slot if there are exactly 5 neighborhoods */}
          {neighborhoods.length >= 5 && (
            <Link href="/neighborhoods" className="group block">
              <Card
                hover
                className="flex h-full flex-col items-center justify-center border-dashed border-primary-300 bg-surface-50 text-center group-hover:border-accent-400 group-hover:bg-white"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-500 group-hover:bg-accent-100 transition-colors">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-semibold text-primary-700 group-hover:text-accent-600 transition-colors">
                  View Interactive Map
                </p>
                <p className="mt-1 text-sm text-primary-500">
                  Explore all Lincoln neighborhoods
                </p>
              </Card>
            </Link>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Button asChild href="/neighborhoods" size="lg" variant="secondary">
            View All Neighborhoods
          </Button>
        </div>
      </div>
    </section>
  );
}
