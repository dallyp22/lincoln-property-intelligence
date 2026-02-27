import { Badge } from '@/components/ui/Badge';
import { ChangeIndicator } from '@/components/ui/ChangeIndicator';
import { formatCurrency } from '@/lib/utils';
import type { Neighborhood } from '@/types';

interface NeighborhoodHeaderProps {
  neighborhood: Neighborhood;
}

export function NeighborhoodHeader({ neighborhood }: NeighborhoodHeaderProps) {
  const { market } = neighborhood;

  return (
    <section className="border-b border-surface-200 bg-gradient-to-b from-surface-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Name + Segment */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold font-serif text-primary-900 sm:text-4xl lg:text-5xl">
            {neighborhood.name}
          </h1>
          <Badge segment={neighborhood.segment} size="md">
            {neighborhood.segment}
          </Badge>
        </div>

        {/* Tagline */}
        <p className="mt-3 max-w-3xl text-lg text-primary-500 leading-relaxed">
          {neighborhood.tagline}
        </p>

        {/* Key Stats Bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
              Median Price
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-900">
              {formatCurrency(market.medianPrice)}
            </p>
            <div className="mt-1">
              <ChangeIndicator value={market.medianPriceChange} label="YoY" size="sm" />
            </div>
          </div>

          <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
              Days on Market
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-900">
              {market.averageDom}
            </p>
            <p className="mt-1 text-xs text-primary-400">average</p>
          </div>

          <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
              Active Inventory
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-900">
              {market.activeInventory}
            </p>
            <p className="mt-1 text-xs text-primary-400">listings</p>
          </div>

          <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
              Price / sq ft
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-900">
              {formatCurrency(market.averagePricePerSqft)}
            </p>
            <p className="mt-1 text-xs text-primary-400">average</p>
          </div>
        </div>
      </div>
    </section>
  );
}
