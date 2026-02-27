import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, AGENTS } from '@/lib/constants';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Lincoln Market Intelligence',
  description:
    'Monthly market reports, neighborhood analytics, and data-driven real estate intelligence for Lincoln, Nebraska from the Home Design Real Estate Group.',
  openGraph: {
    title: 'Lincoln Market Intelligence | Lincoln Property Intelligence',
    description:
      'Data-driven market reports and neighborhood analytics for Lincoln, Nebraska real estate.',
    url: `${SITE.url}/market-intelligence`,
  },
};

export default function MarketIntelligencePage() {
  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
                Data-Driven Advisory
              </p>
              <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
                Lincoln Market Intelligence
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
                Comprehensive market data, neighborhood-level analytics, and
                actionable insights for buyers, sellers, and investors in the
                Lincoln, Nebraska real estate market.
              </p>
            </div>
            <div className="hidden md:block shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-white/10 lg:h-56 lg:w-56">
                <Image
                  src="/images/team/marion-shawndel-polivka.jpg"
                  alt={`${AGENTS.marion.name} and ${AGENTS.shawndel.name}`}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Report */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-primary-900">Latest Report</h2>
        <p className="mt-2 text-primary-600">
          Our monthly intelligence reports deliver comprehensive data on Lincoln&apos;s
          residential market, including 15-neighborhood analysis, investor metrics,
          rental data, and economic context.
        </p>

        <Link
          href="/market-intelligence/january-2026"
          className="group mt-8 block rounded-xl border border-surface-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-accent-500/30 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                New
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold text-primary-900 group-hover:text-accent-500 transition-colors">
                Lincoln Residential Intelligence Report — January 2026
              </h3>
              <p className="mt-2 text-primary-600 max-w-2xl">
                Median home price $294,500 (+2.4% YoY), inventory up 27.7%,
                mortgage rates declining to 6.10%. Full 15-neighborhood
                analysis with investor metrics, rental data, and strategic guidance.
              </p>
              <p className="mt-2 text-xs text-primary-400">
                Published February 28, 2026 by Marion &amp; Shawndel Polivka
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-500 group-hover:text-accent-600 transition-colors">
              Read Full Report
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Key stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {[
              { label: 'Median Price', value: '$294,500' },
              { label: 'Active Listings', value: '972' },
              { label: 'Days on Market', value: '26' },
              { label: 'Months Supply', value: '2.5' },
              { label: '30-Year Rate', value: '6.10%' },
              { label: 'Avg Rent', value: '$1,335' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-surface-50 px-3 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-primary-400">{s.label}</p>
                <p className="mt-0.5 text-lg font-bold text-primary-900">{s.value}</p>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* What Each Report Includes */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary-900 text-center">
            What Each Report Covers
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Neighborhood Analytics',
                description: 'Median prices, days on market, inventory levels, and price-per-square-foot trends for 15 Lincoln neighborhoods.',
                icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z',
              },
              {
                title: 'Market Trends',
                description: 'Monthly and year-over-year pricing, absorption rates, new construction activity, and seasonal patterns.',
                icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
              },
              {
                title: 'Investor Metrics',
                description: 'Cap rates, rental demand indicators, vacancy data, cash flow analysis, and renovation ROI estimates.',
                icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              },
              {
                title: 'Economic Context',
                description: 'Employment data, major employer updates, population trends, infrastructure projects, and cost of living comparison.',
                icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
              },
            ].map((item) => (
              <Card key={item.title} padding="lg" hover>
                <CardContent>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900/5">
                    <svg className="h-5 w-5 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-primary-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-primary-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-surface-200 bg-surface-50 p-8 text-center">
            <h3 className="text-xl font-bold font-serif text-primary-900">
              Get Monthly Reports in Your Inbox
            </h3>
            <p className="mt-2 text-primary-600">
              Subscribe to receive the Lincoln Residential Intelligence Report
              each month with the latest data and analysis.
            </p>

            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              action="#"
              method="POST"
            >
              <label htmlFor="market-email" className="sr-only">
                Email address
              </label>
              <input
                id="market-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
              />
              <Button type="submit" size="md">
                Subscribe
              </Button>
            </form>

            <p className="mt-3 text-xs text-primary-400">
              No spam. Monthly reports only. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* More Links */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-primary-600">
            Explore our neighborhood guides and expert Q&amp;A for more Lincoln
            market insights.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild href="/neighborhoods" variant="secondary" size="md">
              Explore Neighborhoods
            </Button>
            <Button asChild href="/ask-a-realtor" variant="ghost" size="md">
              Read Expert Advice
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
