'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { AGENTS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import type { NeighborhoodGeoProperties } from '@/types';

interface NeighborhoodBasicPanelProps {
  properties: NeighborhoodGeoProperties;
  onClose: () => void;
}

export function NeighborhoodBasicPanel({ properties, onClose }: NeighborhoodBasicPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  const hasMarketData = properties.medianPrice > 0;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-label={`${properties.name} neighborhood details`}
        className="fixed z-50 overflow-y-auto bg-white shadow-2xl outline-none
          inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl
          lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:bottom-0 lg:max-h-none lg:w-[420px] lg:rounded-t-none lg:rounded-l-2xl
          animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-surface-200 bg-white/95 backdrop-blur-sm px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-xl font-bold font-serif text-primary-900 truncate">
              {properties.name}
            </h2>
            <p className="mt-1 text-sm text-primary-500">
              Lincoln, Nebraska
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
          {hasMarketData ? (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-3">
                Market Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-surface-200 bg-surface-50 p-3">
                  <p className="text-lg font-bold text-primary-900">
                    {formatCurrency(properties.medianPrice)}
                  </p>
                  <p className="text-xs text-primary-400">Median Price</p>
                </div>
                {properties.averageDom > 0 && (
                  <div className="rounded-lg border border-surface-200 bg-surface-50 p-3">
                    <p className="text-lg font-bold text-primary-900">
                      {properties.averageDom}
                    </p>
                    <p className="text-xs text-primary-400">Avg Days on Market</p>
                  </div>
                )}
                {properties.activeInventory > 0 && (
                  <div className="rounded-lg border border-surface-200 bg-surface-50 p-3">
                    <p className="text-lg font-bold text-primary-900">
                      {properties.activeInventory}
                    </p>
                    <p className="text-xs text-primary-400">Active Listings</p>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="text-center py-4">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-100">
                <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <p className="text-sm text-primary-600 font-medium">
                Full market data coming soon
              </p>
              <p className="mt-1 text-xs text-primary-400">
                We&apos;re building out detailed profiles for every Lincoln neighborhood.
              </p>
            </section>
          )}

          {/* CTA */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              asChild
              href="/polivka-property-assessment"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Get a Property Assessment
            </Button>
            <Button
              asChild
              href={`/ask-a-realtor`}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Ask About This Area
            </Button>
          </div>

          {/* Agent quick contact */}
          <p className="text-center text-xs text-primary-400">
            Questions about {properties.name}? Call {AGENTS.marion.name} at{' '}
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
