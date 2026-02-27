import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ReportPreview {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  href: string;
}

const placeholderReports: ReportPreview[] = [
  {
    title: 'Lincoln Market Update: February 2026',
    date: '2026-02-01',
    category: 'Monthly Report',
    excerpt:
      'Lincoln median home prices rose 4.2% year-over-year to $308,000, with active inventory increasing 8.7% and average days on market falling to 28 days. South Lincoln corridors continue to outperform.',
    href: '/market-intelligence',
  },
  {
    title: 'South Lincoln Growth Corridor Analysis',
    date: '2026-01-15',
    category: 'Neighborhood Deep Dive',
    excerpt:
      'Wilderness Hills, Fallbrook, and the emerging Pine Lake corridor are reshaping south Lincoln real estate. New construction permits are up 12% year-over-year, with infrastructure investment accelerating development timelines.',
    href: '/market-intelligence',
  },
  {
    title: 'Inspection Trends: What Lincoln Buyers Are Finding in 2026',
    date: '2026-01-08',
    category: 'Inspection Intelligence',
    excerpt:
      'An analysis of common inspection findings across Lincoln price segments. Foundation concerns lead in historic neighborhoods, while HVAC aging dominates mid-2000s construction. What to watch for and what it means for your offer.',
    href: '/market-intelligence',
  },
];

function formatReportDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function RecentReports() {
  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="recent-reports-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">
            Market Intelligence
          </p>
          <h2
            id="recent-reports-heading"
            className="mt-2 font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Latest Market Intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-600">
            Data-driven reports and analysis for Lincoln, Nebraska real estate.
            Stay informed with inspection insights, market trends, and
            neighborhood deep dives.
          </p>
        </div>

        {/* Report Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {placeholderReports.map((report) => (
            <Link key={report.title} href={report.href} className="group block">
              <Card hover as="article" className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{report.category}</Badge>
                    <time
                      dateTime={report.date}
                      className="text-xs text-primary-400"
                    >
                      {formatReportDate(report.date)}
                    </time>
                  </div>
                  <CardTitle
                    as="h3"
                    className="mt-3 group-hover:text-accent-600 transition-colors"
                  >
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm leading-relaxed text-primary-600 line-clamp-4">
                    {report.excerpt}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent-500 group-hover:text-accent-600 transition-colors">
                    Read Report
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-12 rounded-xl border border-surface-200 bg-surface-50 p-8 text-center sm:p-10">
          <h3 className="text-lg font-semibold text-primary-900">
            Stay ahead of the Lincoln market
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-primary-600">
            Get monthly market reports, neighborhood analysis, and inspection
            intelligence delivered to your inbox. No spam — just data.
          </p>
          <div className="mt-6">
            <Button asChild href="/market-intelligence" size="md">
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
