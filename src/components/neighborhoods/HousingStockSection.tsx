import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatNumber } from '@/lib/utils';
import { AGENTS } from '@/lib/constants';
import type { HousingStock, InspectionNote } from '@/types';

interface HousingStockSectionProps {
  housingStock: HousingStock;
  inspectionNotes: InspectionNote[];
}

export function HousingStockSection({
  housingStock,
  inspectionNotes,
}: HousingStockSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold font-serif text-primary-900 mb-6">
        Housing Stock & Inspection Insights
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Housing Stock Overview */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle as="h3">Housing Stock Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-surface-100 pb-3">
                <dt className="text-sm font-medium text-primary-500">Predominant Era</dt>
                <dd className="text-sm font-semibold text-primary-900">{housingStock.predominantEra}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-surface-100 pb-3">
                <dt className="text-sm font-medium text-primary-500">Median Year Built</dt>
                <dd className="text-sm font-semibold text-primary-900">{housingStock.medianYearBuilt}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-surface-100 pb-3">
                <dt className="text-sm font-medium text-primary-500">Average Sq Ft</dt>
                <dd className="text-sm font-semibold text-primary-900">
                  {formatNumber(housingStock.averageSqft)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-surface-100 pb-3">
                <dt className="text-sm font-medium text-primary-500">Average Lot Size</dt>
                <dd className="text-sm font-semibold text-primary-900">{housingStock.averageLotSize}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-primary-500 mb-2">Common Styles</dt>
                <dd className="flex flex-wrap gap-2">
                  {housingStock.commonStyles.map((style) => (
                    <span
                      key={style}
                      className="inline-flex items-center rounded-full border border-surface-200 bg-surface-50 px-3 py-1 text-xs font-medium text-primary-700"
                    >
                      {style}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Inspection Notes */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10">
              <svg className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.175A1.5 1.5 0 014.5 17.169V6.831a1.5 1.5 0 011.536-1.176l5.384 3.175m0 0l5.384-3.175A1.5 1.5 0 0119.5 6.831v10.338a1.5 1.5 0 01-1.536 1.176l-5.384-3.175m0 0V4.5m0 10.67V19.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900">
                Inspection Notes
              </h3>
              <p className="text-xs text-primary-400">
                Expert commentary from {AGENTS.marion.name}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {inspectionNotes.map((note) => (
              <div
                key={note.category}
                className="rounded-xl border border-surface-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent-600">
                    {note.category}
                  </span>
                </div>
                <p className="text-sm text-primary-600 leading-relaxed">
                  {note.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
