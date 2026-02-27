'use client';

import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency } from '@/lib/utils';
import { AGENTS } from '@/lib/constants';
import type { Neighborhood } from '@/types';

interface NeighborhoodPanelProps {
  neighborhood: Neighborhood;
  onClose: () => void;
}

export function NeighborhoodPanel({ neighborhood, onClose }: NeighborhoodPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus trap: focus the panel on mount
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const { market, housingStock, inspectionNotes } = neighborhood;

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-label={`${neighborhood.name} neighborhood details`}
        className="fixed z-50 overflow-y-auto bg-white shadow-2xl outline-none
          inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl
          lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:bottom-0 lg:max-h-none lg:w-[420px] lg:rounded-t-none lg:rounded-l-2xl
          animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-surface-200 bg-white/95 backdrop-blur-sm px-5 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold font-serif text-primary-900 truncate">
                {neighborhood.name}
              </h2>
              <Badge segment={neighborhood.segment} size="sm">
                {neighborhood.segment}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-primary-500 line-clamp-2">
              {neighborhood.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-primary-400 transition-colors hover:bg-surface-100 hover:text-primary-700"
            aria-label="Close panel"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 px-5 py-5">
          {/* Market Stats */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-3">
              Market Snapshot
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                value={formatCurrency(market.medianPrice)}
                label="Median Price"
                change={market.medianPriceChange}
                changeLabel="YoY"
              />
              <StatCard
                value={`${market.averageDom}`}
                label="Avg Days on Market"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                value={`${market.activeInventory}`}
                label="Active Listings"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                  </svg>
                }
              />
              <StatCard
                value={formatCurrency(market.averagePricePerSqft)}
                label="Price / sq ft"
              />
            </div>
          </section>

          {/* Housing Stock Summary */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-3">
              Housing Stock
            </h3>
            <div className="rounded-lg border border-surface-200 bg-surface-50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-primary-700">Era</span>
                <span className="text-sm text-primary-900 font-semibold">{housingStock.predominantEra}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-sm font-medium text-primary-700">Common Styles</span>
                <span className="text-sm text-primary-600 text-right max-w-[55%]">
                  {housingStock.commonStyles.slice(0, 3).join(', ')}
                </span>
              </div>
            </div>
          </section>

          {/* Inspection Notes (first 2-3) */}
          {inspectionNotes.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-3">
                Inspection Insights
              </h3>
              <div className="space-y-3">
                {inspectionNotes.slice(0, 3).map((note) => (
                  <div
                    key={note.category}
                    className="rounded-lg border border-surface-200 bg-white p-3"
                  >
                    <p className="text-xs font-semibold text-accent-500 uppercase tracking-wide">
                      {note.category}
                    </p>
                    <p className="mt-1 text-sm text-primary-600 leading-relaxed line-clamp-3">
                      {note.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              asChild
              href={`/neighborhoods/${neighborhood.slug}`}
              variant="primary"
              size="lg"
              className="w-full"
            >
              View Full Profile
            </Button>
            <Button
              asChild
              href={`/contact?neighborhood=${neighborhood.slug}`}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Schedule a Tour
            </Button>
          </div>

          {/* Agent quick contact */}
          <p className="text-center text-xs text-primary-400">
            Questions? Call {AGENTS.marion.name} at{' '}
            <a
              href={AGENTS.marion.phoneTel}
              className="font-medium text-accent-500 hover:text-accent-600"
            >
              {AGENTS.marion.phoneFormatted}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
