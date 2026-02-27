import Link from 'next/link';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { SnapshotCard, StatFormat } from '@/types';

interface MarketSnapshotCardsProps {
  cards: SnapshotCard[];
  lastUpdated: string;
}

function formatValue(value: number, format: StatFormat): string {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'days':
      return `${value} days`;
    case 'number':
      return formatNumber(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    default:
      return String(value);
  }
}

function CardIcon({ icon }: { icon: string }) {
  const iconPaths: Record<string, React.ReactNode> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
    clock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    'chart-bar': (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    ),
    list: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    ),
  };

  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      {iconPaths[icon] ?? iconPaths.home}
    </svg>
  );
}

function formatUpdatedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function MarketSnapshotCards({
  cards,
  lastUpdated,
}: MarketSnapshotCardsProps) {
  return (
    <section className="bg-surface-50 py-16 sm:py-20" aria-labelledby="market-snapshot-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2
            id="market-snapshot-heading"
            className="font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Lincoln Market Snapshot
          </h2>
          <p className="mt-2 text-sm text-primary-500">
            Updated {formatUpdatedDate(lastUpdated)}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const change =
              card.changeDirection === 'down'
                ? -card.changePercent
                : card.changePercent;

            return (
              <StatCard
                key={card.title}
                value={formatValue(card.value, card.format)}
                label={card.title}
                change={change}
                changeLabel={card.period}
                icon={<CardIcon icon={card.icon} />}
              />
            );
          })}
        </div>

        {/* CTA Link */}
        <div className="mt-8 text-center">
          <Link
            href="/market-intelligence"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500 transition-colors hover:text-accent-600"
          >
            View Full Market Intelligence
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
