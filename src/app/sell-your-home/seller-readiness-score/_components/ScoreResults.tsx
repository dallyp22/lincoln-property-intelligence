'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScoreDial } from '@/components/tools/ScoreDial';
import { CategoryBar } from '@/components/tools/CategoryBar';
import { Button } from '@/components/ui/Button';
import type { SellerReadinessResult } from '@/lib/engines/seller-readiness';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ScoreResultsProps {
  result: SellerReadinessResult;
  ownerName?: string;
  address?: string;
  onReset: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRIORITY_BADGE_COLORS = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
} as const;

const currentDate = new Date();
const monthYear = currentDate.toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScoreResults({ result, ownerName, address, onReset }: ScoreResultsProps) {
  const lowScoringCategories = result.categories.filter((c) => c.score < 80);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const { downloadSellerReadinessPdf } = await import('@/lib/pdf/download');
      await downloadSellerReadinessPdf(result, ownerName, address);
    } catch {
      // Silently fail — PDF generation is a nice-to-have
    } finally {
      setDownloading(false);
    }
  }, [result, ownerName, address]);

  return (
    <motion.div
      aria-live="polite"
      className="space-y-12"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero score section                                              */}
      {/* ------------------------------------------------------------------ */}
      <motion.div className="text-center" variants={fadeUp}>
        <h2 className="text-3xl font-bold font-serif text-primary-900">
          Your Seller Readiness Score
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex">
            <ScoreDial
              score={result.totalScore}
              grade={result.grade}
              gradeLabel={result.gradeLabel}
              size="lg"
              animated
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-primary-500">
          Based on current Lincoln, NE market conditions as of {monthYear}
        </p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Category breakdown                                              */}
      {/* ------------------------------------------------------------------ */}
      <motion.section variants={fadeUp}>
        <h3 className="text-xl font-bold font-serif text-primary-900">
          Category Breakdown
        </h3>
        <p className="mt-1 text-sm text-primary-500">
          Your score across the five evaluation categories, weighted by their
          impact on a successful sale in the Lincoln, Nebraska market.
        </p>
        <div className="mt-6 space-y-6">
          {result.categories.map((cat) => (
            <CategoryBar
              key={cat.category}
              label={cat.label}
              score={cat.score}
              weight={cat.weight}
              color={cat.color}
              interpretation={cat.interpretation}
              animated
            />
          ))}
        </div>
      </motion.section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Recommendations (only for categories < 80)                      */}
      {/* ------------------------------------------------------------------ */}
      {result.topImprovements.length > 0 && (
        <motion.section variants={fadeUp}>
          <h3 className="text-xl font-bold font-serif text-primary-900">
            Recommended Improvements
          </h3>
          <p className="mt-1 text-sm text-primary-500">
            Actionable steps to improve your score and maximize your home&apos;s
            value in the Lincoln market. Recommendations are sorted by priority
            and potential impact.
          </p>

          <div className="mt-6 space-y-4">
            {result.topImprovements.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="rounded-xl border border-surface-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-base font-semibold text-primary-900">
                    {rec.title}
                  </h4>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      PRIORITY_BADGE_COLORS[rec.priority]
                    )}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-primary-600">
                  {rec.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-primary-600">
                      Estimated cost: {rec.estimatedCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                    <span className="text-xs font-medium text-primary-600">
                      Expected ROI: {rec.estimatedROI}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Summary for high-scoring results (all categories >= 80) */}
      {lowScoringCategories.length === 0 && (
        <motion.section
          variants={fadeUp}
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center"
        >
          <svg
            className="mx-auto h-12 w-12 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
          <h3 className="mt-3 text-lg font-bold text-emerald-800">
            Outstanding! Your Home Is Market-Ready
          </h3>
          <p className="mt-2 text-sm text-emerald-700">
            Every category scored 80 or above. Your home is well-positioned for
            a strong sale in the Lincoln market. A Polivka Property Assessment
            will confirm these results and fine-tune your strategy.
          </p>
        </motion.section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. CTA block                                                       */}
      {/* ------------------------------------------------------------------ */}
      <motion.section
        variants={fadeUp}
        className="rounded-xl bg-primary-900 p-8 text-center text-white sm:p-10"
      >
        <h3 className="text-2xl font-bold font-serif">
          Schedule Your Complimentary Polivka Property Assessment
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-primary-200">
          Your Seller Readiness Score gives you a strong starting point. A full
          in-home Polivka Property Assessment from Marion and Shawndel Polivka
          will validate these findings with hands-on inspection and
          up-to-the-day Lincoln market data.
        </p>
        <div className="mt-6">
          <Button asChild href="/sell-your-home" size="lg">
            Schedule My Assessment
          </Button>
        </div>
        <p className="mt-4 text-xs text-primary-300">
          No obligation. Marion and Shawndel Polivka will personally conduct
          your assessment.
        </p>
      </motion.section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Download PDF + Start Over                                       */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
        <Button
          variant="secondary"
          size="md"
          onClick={handleDownload}
          disabled={downloading}
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          {downloading ? 'Generating...' : 'Download PDF Report'}
        </Button>
        <Button variant="ghost" size="md" onClick={onReset}>
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            />
          </svg>
          Start Over
        </Button>
      </motion.div>
    </motion.div>
  );
}
