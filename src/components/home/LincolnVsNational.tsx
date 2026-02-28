import { Card } from '@/components/ui/Card';

interface ComparisonRow {
  metric: string;
  lincoln: string;
  national: string;
  advantage: string;
}

const comparisonData: ComparisonRow[] = [
  {
    metric: 'Median Home Price',
    lincoln: '$308,000',
    national: '$412,000',
    advantage: '25% more affordable',
  },
  {
    metric: 'Average Rent (2BR)',
    lincoln: '$1,050',
    national: '$1,585',
    advantage: '34% lower rents',
  },
  {
    metric: 'Cost of Living Index',
    lincoln: '94',
    national: '100',
    advantage: '6% below average',
  },
  {
    metric: 'Unemployment Rate',
    lincoln: '2.7%',
    national: '4.0%',
    advantage: 'Exceptionally low',
  },
  {
    metric: 'Renter-Occupied Rate',
    lincoln: '44%',
    national: '34%',
    advantage: 'Strong rental demand',
  },
];

export function LincolnVsNational() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">
            Market Context
          </p>
          <h2
            id="comparison-heading"
            className="mt-2 font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Lincoln vs. National: Real Estate at a Glance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-600">
            Nebraska&apos;s capital city consistently outperforms national
            averages on affordability, employment, and rental demand — making it
            one of the Midwest&apos;s strongest real estate markets.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mt-12 overflow-hidden" padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary-900 text-white">
                  <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                    Metric
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold tracking-wide">
                    Lincoln, NE
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold tracking-wide">
                    National Avg
                  </th>
                  <th className="hidden px-6 py-4 text-sm font-semibold tracking-wide sm:table-cell">
                    Lincoln Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {comparisonData.map((row) => (
                  <tr
                    key={row.metric}
                    className="transition-colors hover:bg-surface-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-primary-900">
                      {row.metric}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-accent-600">
                      {row.lincoln}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-primary-500">
                      {row.national}
                    </td>
                    <td className="hidden px-6 py-4 text-sm font-medium text-accent-500 sm:table-cell">
                      {row.advantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-surface-200 bg-surface-50 px-6 py-3">
            <p className="text-xs text-primary-400">
              Sources: U.S. Census Bureau, BLS, Lincoln Board of Realtors.
              Data as of February 2026.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
