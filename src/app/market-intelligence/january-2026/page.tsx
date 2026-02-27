import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { getMarketReport } from '@/lib/data/market';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  NeighborhoodPriceChartWrapper,
  NeighborhoodChangeChartWrapper,
  RentalRatesChartWrapper,
} from './_components/ChartsWrapper';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const report = await getMarketReport('january-2026');
  return {
    title: `Lincoln Market Report — ${report.meta.period}`,
    description: report.meta.description,
    openGraph: {
      title: `Lincoln Residential Intelligence Report — ${report.meta.period}`,
      description: report.meta.description,
      url: `${SITE.url}/market-intelligence/january-2026`,
      type: 'article',
      publishedTime: report.meta.publishedDate,
      authors: report.meta.authors,
    },
  };
}

// ---------------------------------------------------------------------------
// Helper: change indicator
// ---------------------------------------------------------------------------

function ChangeArrow({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium tabular-nums ${
        isNeutral
          ? 'text-primary-400'
          : isPositive
            ? 'text-emerald-600'
            : 'text-red-500'
      }`}
    >
      {!isNeutral && (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path
            d={
              isPositive
                ? 'M6 2.5l4 5H2l4-5z'
                : 'M6 9.5l4-5H2l4 5z'
            }
          />
        </svg>
      )}
      {isPositive ? '+' : ''}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function JanuaryReport() {
  const report = await getMarketReport('january-2026');
  const { executiveSummary, marketOverview, neighborhoods, neighborhoodRankings, rentalMarket, investorMetrics, economic, forecast, nationalComparison, notableTransactions, momSummary, policy } = report;

  return (
    <>
      {/* JSON-LD: Article */}
      <JsonLd
        data={{
          '@type': 'Article',
          headline: `Lincoln Residential Intelligence Report — ${report.meta.period}`,
          description: report.meta.description,
          datePublished: report.meta.publishedDate,
          dateModified: report.meta.publishedDate,
          author: report.meta.authors.map((name) => ({
            '@type': 'Person',
            name,
            worksFor: {
              '@type': 'RealEstateAgent',
              name: report.meta.team,
            },
          })),
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
          },
          mainEntityOfPage: `${SITE.url}/market-intelligence/january-2026`,
          about: {
            '@type': 'Place',
            name: 'Lincoln, Nebraska',
            geo: { '@type': 'GeoCoordinates', latitude: 40.8136, longitude: -96.7026 },
          },
          keywords: [
            'Lincoln Nebraska real estate market report',
            'Lincoln NE housing market January 2026',
            'Lincoln neighborhood home prices',
            'Lincoln rental market data',
            'Lincoln real estate investment analysis',
            'Lincoln NE market forecast 2026',
          ],
        }}
      />

      {/* JSON-LD: Dataset */}
      <JsonLd
        data={{
          '@type': 'Dataset',
          name: `Lincoln NE Residential Market Data — ${report.meta.period}`,
          description: `Monthly residential real estate market data for Lincoln, Nebraska covering ${report.meta.period}. Includes median home prices, days on market, inventory levels, rental rates, cap rates, and economic indicators for 15 neighborhoods.`,
          temporalCoverage: '2026-01/2026-01',
          spatialCoverage: {
            '@type': 'Place',
            name: 'Lincoln, Nebraska, USA',
          },
          creator: {
            '@type': 'Organization',
            name: report.meta.team,
          },
          distribution: {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: `${SITE.url}/market-intelligence/january-2026`,
          },
          variableMeasured: [
            'Median Home Sale Price',
            'Days on Market',
            'Active Listings',
            'Months of Supply',
            'Rental Rates',
            'Cap Rates',
            'Unemployment Rate',
          ],
        }}
      />

      <Breadcrumbs />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")' }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-secondary-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-400">
              Monthly Report
            </span>
            <span className="text-xs text-primary-300">
              Published {new Date(report.meta.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
            Lincoln Residential Intelligence
          </h1>
          <p className="mt-2 font-serif text-2xl font-light text-secondary-400 sm:text-3xl">
            {report.meta.period} Report
          </p>
          <p className="mt-6 max-w-3xl text-lg text-primary-200 leading-relaxed">
            {report.meta.description}
          </p>

          {/* Hero metric strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {executiveSummary.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-xs font-medium text-primary-300">{h.label}</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{h.value}</p>
                <p className={`mt-0.5 text-xs font-medium ${h.direction === 'down' && h.label.includes('Mortgage') ? 'text-emerald-400' : h.direction === 'up' ? 'text-emerald-400' : 'text-primary-400'}`}>
                  {h.change}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-primary-300">
            Market Competitiveness: <span className="font-semibold text-secondary-400">{executiveSummary.competitivenessScore}/100</span> — {executiveSummary.competitivenessLabel}
          </p>
        </div>
      </section>

      {/* ── Table of Contents ────────────────────────────────────────────── */}
      <nav className="border-b border-surface-200 bg-surface-50" aria-label="Report sections">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-3 text-sm">
            {[
              { label: 'Market Overview', href: '#market-overview' },
              { label: 'Neighborhoods', href: '#neighborhoods' },
              { label: 'Rental & Investor', href: '#rental-investor' },
              { label: 'Economic Context', href: '#economic' },
              { label: 'Forecast', href: '#forecast' },
              { label: 'Sources', href: '#sources' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap font-medium text-primary-600 transition-colors hover:text-accent-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Executive Summary ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-primary-900">Executive Summary</h2>
          <p className="mt-6 text-lg text-primary-600 leading-relaxed">
            The Lincoln residential real estate market in January 2026 demonstrates continued resilience with moderate price appreciation, expanding inventory, and stabilizing mortgage rates. The market remains very competitive with a Redfin competitiveness score of 75 out of 100, though conditions are gradually shifting toward greater balance as inventory rises 27.7 percent year-over-year to 972 active listings.
          </p>
          <p className="mt-4 text-lg text-primary-600 leading-relaxed">
            The median home sale price reached $294,500, representing a 2.4 percent increase from January 2025. Mortgage rates have declined significantly from 2024 highs, with the 30-year fixed rate falling to 6.10 percent — improving affordability and supporting demand heading into the spring selling season. Rental markets remain tight at 3.5 percent vacancy with average rents climbing 3.35 percent to $1,335 per month.
          </p>
        </div>

        {/* Month-over-Month Summary */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-primary-900">Month-over-Month Trend Summary</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {momSummary.map((item) => (
              <div key={item.indicator} className="flex items-start gap-3 rounded-lg border border-surface-200 bg-white p-4">
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.direction === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d={item.direction === 'up' ? 'M6 2.5l4 5H2l4-5z' : 'M6 9.5l4-5H2l4 5z'} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-900">{item.indicator}</p>
                  <p className="text-xs text-primary-500">{item.magnitude} — {item.implication}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1: Market Overview ───────────────────────────────────── */}
      <section id="market-overview" className="bg-surface-50 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-xs font-bold text-white">1</span>
            <h2 className="font-serif text-3xl font-bold text-primary-900">Lincoln Market Overview</h2>
          </div>

          <p className="mt-4 max-w-3xl text-primary-600 leading-relaxed">
            Citywide market metrics for January 2026 with month-over-month and year-over-year comparisons. The Lincoln housing market continues its transition from the rapid appreciation of 2021 through 2022 toward a more sustainable, moderate growth trajectory.
          </p>

          {/* Metrics Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b-2 border-primary-900/10">
                  <th className="py-3 pr-4 text-left font-semibold text-primary-900">Metric</th>
                  <th className="px-3 py-3 text-right font-semibold text-primary-900">Jan 2026</th>
                  <th className="px-3 py-3 text-right font-semibold text-primary-500">Dec 2025</th>
                  <th className="px-3 py-3 text-right font-semibold text-primary-500">MoM</th>
                  <th className="px-3 py-3 text-right font-semibold text-primary-500">Jan 2025</th>
                  <th className="px-3 py-3 text-right font-semibold text-primary-500">YoY</th>
                  <th className="pl-4 py-3 text-left font-semibold text-primary-400">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {marketOverview.metrics.map((m) => {
                  const isCurrency = m.metric.includes('Price') || m.metric.includes('Sq Ft');
                  const isPercent = m.metric.includes('Ratio');
                  const fmt = (v: number) =>
                    isCurrency ? formatCurrency(v) : isPercent ? `${v}%` : v.toLocaleString();
                  return (
                    <tr key={m.metric} className="hover:bg-surface-100/50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-primary-900">{m.metric}</td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-primary-900">{fmt(m.current)}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-primary-500">{fmt(m.priorMonth)}</td>
                      <td className="px-3 py-3 text-right"><ChangeArrow value={m.momChange} /></td>
                      <td className="px-3 py-3 text-right tabular-nums text-primary-500">{fmt(m.priorYear)}</td>
                      <td className="px-3 py-3 text-right"><ChangeArrow value={m.yoyChange} /></td>
                      <td className="pl-4 py-3 text-xs text-primary-400 max-w-xs">{m.interpretation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Additional Indicators */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketOverview.additionalIndicators.map((ind) => (
              <Card key={ind.metric} padding="md">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">{ind.metric}</p>
                <p className="mt-2 text-2xl font-bold text-primary-900">{ind.value}</p>
                <p className="mt-1 text-xs text-primary-500">{ind.notes}</p>
              </Card>
            ))}
          </div>

          {/* Mortgage Rates */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Mortgage Rate Environment</h3>
            <p className="mt-2 text-sm text-primary-600 leading-relaxed">
              Mortgage rates have declined significantly from 2024 highs, with the 30-year fixed falling below 6 percent by late February 2026. This improving affordability environment is expected to bring more buyers into the market for spring 2026.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {marketOverview.mortgageRates.map((r) => (
                <div key={r.type} className="rounded-lg border border-surface-200 bg-white p-4">
                  <p className="text-xs font-medium text-primary-500">{r.type}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-primary-900">{r.rate}%</p>
                  <p className="mt-1 text-xs text-emerald-600 font-medium">{r.yoyChange > 0 ? '+' : ''}{r.yoyChange}pp YoY</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Construction */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">New Construction Activity</h3>
            <p className="mt-2 text-sm text-primary-600 leading-relaxed">
              New construction remains active with 175 listings, up 29.6 percent year-over-year. The median new construction price of {formatCurrency(marketOverview.newConstruction.medianPrice)} represents a 58 percent premium over existing homes. New construction carries 8.4 months of supply versus only 1.7 months for existing homes, giving buyers more options in the new-build segment.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-surface-200 bg-white p-4">
                <p className="text-xs text-primary-500">New Listings</p>
                <p className="mt-1 text-xl font-bold text-primary-900">{marketOverview.newConstruction.listings}</p>
                <p className="text-xs text-emerald-600">+{marketOverview.newConstruction.listingsChange}% YoY</p>
              </div>
              <div className="rounded-lg border border-surface-200 bg-white p-4">
                <p className="text-xs text-primary-500">Median Price</p>
                <p className="mt-1 text-xl font-bold text-primary-900">{formatCurrency(marketOverview.newConstruction.medianPrice)}</p>
                <p className="text-xs text-emerald-600">+{marketOverview.newConstruction.medianPriceChange}% YoY</p>
              </div>
              <div className="rounded-lg border border-surface-200 bg-white p-4">
                <p className="text-xs text-primary-500">New Construction Supply</p>
                <p className="mt-1 text-xl font-bold text-primary-900">{marketOverview.newConstruction.monthsSupply} months</p>
                <p className="text-xs text-primary-400">More balanced</p>
              </div>
              <div className="rounded-lg border border-surface-200 bg-white p-4">
                <p className="text-xs text-primary-500">Existing Home Supply</p>
                <p className="mt-1 text-xl font-bold text-primary-900">{marketOverview.newConstruction.existingMonthsSupply} months</p>
                <p className="text-xs text-red-500">Tight inventory</p>
              </div>
            </div>
          </div>

          {/* Policy */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Policy and Regulatory Changes</h3>
            <div className="mt-4 space-y-3">
              {policy.map((p) => (
                <div key={p.policy} className="flex items-start gap-3 rounded-lg border border-surface-200 bg-white p-4">
                  <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${p.status.includes('Proposed') ? 'bg-amber-50 text-amber-700' : p.status.includes('Approved') ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                    {p.status}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-primary-900">{p.policy}</p>
                    <p className="mt-0.5 text-xs text-primary-500">{p.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Neighborhood Analytics ────────────────────────────── */}
      <section id="neighborhoods" className="scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-xs font-bold text-white">2</span>
            <h2 className="font-serif text-3xl font-bold text-primary-900">Neighborhood-Level Analytics</h2>
          </div>
          <p className="mt-4 max-w-3xl text-primary-600 leading-relaxed">
            Detailed market data for 15 Lincoln neighborhoods and adjacent communities. Prices range from $200,000 in Capitol View and South Salt Creek to $570,650 in Wilderness Hills. Adjacent communities Hickman and Waverly are experiencing explosive growth with 31.2 percent and 24.9 percent year-over-year appreciation respectively.
          </p>

          {/* Median Price Chart */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Median Home Prices by Neighborhood</h3>
            <p className="mt-1 text-sm text-primary-500">
              Bar color indicates year-over-year trend: <span className="text-[#d4af37] font-medium">gold</span> = explosive growth, <span className="text-[#0d9488] font-medium">teal</span> = strong, <span className="text-[#1e3a5f] font-medium">navy</span> = stable, <span className="text-red-500 font-medium">red</span> = correction
            </p>
            <div className="mt-4 rounded-xl border border-surface-200 bg-white p-4">
              <NeighborhoodPriceChartWrapper data={neighborhoods} />
            </div>
          </div>

          {/* YoY Change Chart */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Year-over-Year Price Change</h3>
            <div className="mt-4 rounded-xl border border-surface-200 bg-white p-4">
              <NeighborhoodChangeChartWrapper data={neighborhoods} />
            </div>
          </div>

          {/* Full Data Table */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Complete Neighborhood Data</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b-2 border-primary-900/10">
                    <th className="py-3 pr-3 text-left font-semibold text-primary-900">Neighborhood</th>
                    <th className="px-3 py-3 text-right font-semibold text-primary-900">Median Price</th>
                    <th className="px-3 py-3 text-right font-semibold text-primary-900">YoY</th>
                    <th className="px-3 py-3 text-right font-semibold text-primary-900">DOM</th>
                    <th className="px-3 py-3 text-right font-semibold text-primary-900">Listings</th>
                    <th className="px-3 py-3 text-right font-semibold text-primary-900">$/SqFt</th>
                    <th className="px-3 py-3 text-left font-semibold text-primary-500">Type</th>
                    <th className="pl-3 py-3 text-left font-semibold text-primary-500">Market</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {neighborhoods.map((n) => (
                    <tr key={n.name} className="hover:bg-surface-50 transition-colors">
                      <td className="py-3 pr-3 font-medium text-primary-900">{n.name}</td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums">{formatCurrency(n.medianPrice)}</td>
                      <td className="px-3 py-3 text-right"><ChangeArrow value={n.yoyChange} /></td>
                      <td className="px-3 py-3 text-right tabular-nums text-primary-700">{n.dom}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-primary-700">{n.activeListings}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-primary-700">${n.pricePerSqft}</td>
                      <td className="px-3 py-3 text-xs text-primary-500">{n.housingType}</td>
                      <td className="pl-3 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          n.marketType.includes('Extreme') ? 'bg-red-50 text-red-700' :
                          n.marketType.includes('Premium') ? 'bg-amber-50 text-amber-700' :
                          n.marketType.includes('Seller') ? 'bg-emerald-50 text-emerald-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {n.marketType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rankings */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card padding="lg">
              <CardContent>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Best for Sellers</h4>
                <ol className="mt-3 space-y-2">
                  {neighborhoodRankings.bestForSellers.map((name, i) => (
                    <li key={name} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700">{i + 1}</span>
                      <span className="text-primary-700">{name}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card padding="lg">
              <CardContent>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-600">Best for Buyers</h4>
                <ol className="mt-3 space-y-2">
                  {neighborhoodRankings.bestForBuyers.map((name, i) => (
                    <li key={name} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">{i + 1}</span>
                      <span className="text-primary-700">{name}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card padding="lg">
              <CardContent>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-500">Best Value</h4>
                <ol className="mt-3 space-y-2">
                  {neighborhoodRankings.bestValue.map((name, i) => (
                    <li key={name} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold text-amber-700">{i + 1}</span>
                      <span className="text-primary-700">{name}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 3: Rental & Investor Metrics ─────────────────────────── */}
      <section id="rental-investor" className="bg-surface-50 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-xs font-bold text-white">3</span>
            <h2 className="font-serif text-3xl font-bold text-primary-900">Investor Metrics and Rental Market</h2>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {/* Left: Rental Overview */}
            <div>
              <h3 className="text-lg font-semibold text-primary-900">Rental Market Overview</h3>
              <p className="mt-2 text-sm text-primary-600 leading-relaxed">
                Lincoln&apos;s rental market remains tight with a 3.5 percent vacancy rate across {rentalMarket.totalHouseholds.toLocaleString()} total households. Renter-occupied households represent 44 percent of the market at {rentalMarket.renterOccupied.toLocaleString()} units. The citywide average rent of {formatCurrency(rentalMarket.cityAverage)} per month increased 3.35 percent year-over-year, outpacing the national average of 1.7 percent rent growth.
              </p>

              {/* Key metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-surface-200 bg-white p-4">
                  <p className="text-xs text-primary-500">Average Rent</p>
                  <p className="mt-1 text-2xl font-bold text-primary-900">{formatCurrency(rentalMarket.cityAverage)}<span className="text-sm font-normal text-primary-400">/mo</span></p>
                  <p className="text-xs text-emerald-600">+{rentalMarket.cityAverageChange}% YoY</p>
                </div>
                <div className="rounded-lg border border-surface-200 bg-white p-4">
                  <p className="text-xs text-primary-500">Vacancy Rate</p>
                  <p className="mt-1 text-2xl font-bold text-primary-900">{rentalMarket.vacancyRate}%</p>
                  <p className="text-xs text-primary-400">Tight market, landlord-favorable</p>
                </div>
              </div>

              {/* Rental Chart */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-700">Average Rent by Unit Type</h4>
                <div className="mt-3 rounded-xl border border-surface-200 bg-white p-4">
                  <RentalRatesChartWrapper data={rentalMarket.byUnitType} />
                </div>
              </div>
            </div>

            {/* Right: Investor Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-primary-900">Investment Analysis</h3>
              <p className="mt-2 text-sm text-primary-600 leading-relaxed">
                Multifamily cap rates have expanded to 7.2 to 7.8 percent, creating improved opportunities for income-focused investors. Investment-grade neighborhoods in Near South, Havelock, and Capitol View offer the highest cap rates at 7.5 to 8.5 percent. Cash flow remains challenging at current mortgage rates, with approximately 40 percent down payment required to break even.
              </p>

              {/* Cap Rate Table */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-700">Cap Rates by Neighborhood Tier</h4>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-200">
                        <th className="py-2 pr-3 text-left font-semibold text-primary-900">Tier</th>
                        <th className="px-3 py-2 text-right font-semibold text-primary-900">Cap Rate</th>
                        <th className="pl-3 py-2 text-left font-semibold text-primary-500">Neighborhoods</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      {investorMetrics.capRates.map((c) => (
                        <tr key={c.tier}>
                          <td className="py-2.5 pr-3 font-medium text-primary-900">{c.tier}</td>
                          <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-accent-500">{c.range}</td>
                          <td className="pl-3 py-2.5 text-xs text-primary-500">{c.neighborhoods}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Investment Scenario */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-700">Cash Flow Scenario: $250K Purchase, 20% Down</h4>
                <div className="mt-3 rounded-lg border border-surface-200 bg-white p-4 space-y-2">
                  {[
                    ['Monthly Mortgage (P&I)', formatCurrency(investorMetrics.scenarioAnalysis.monthlyMortgage)],
                    ['Estimated Rent (2BR)', formatCurrency(investorMetrics.scenarioAnalysis.estimatedRent)],
                    ['Property Tax/mo', formatCurrency(investorMetrics.scenarioAnalysis.monthlyTax)],
                    ['Insurance/mo', formatCurrency(investorMetrics.scenarioAnalysis.monthlyInsurance)],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-primary-600">{label}</span>
                      <span className="font-medium tabular-nums text-primary-900">{val}</span>
                    </div>
                  ))}
                  <div className="border-t border-surface-200 pt-2 flex justify-between text-sm">
                    <span className="font-semibold text-primary-900">Monthly Cash Flow</span>
                    <span className="font-bold tabular-nums text-red-500">{formatCurrency(investorMetrics.scenarioAnalysis.monthlyCashFlow)}</span>
                  </div>
                  <p className="text-xs text-primary-400 pt-1">
                    Break-even requires approximately {investorMetrics.scenarioAnalysis.breakEvenDownPayment}% down payment at current rates.
                  </p>
                </div>
              </div>

              {/* Renovation Costs */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-700">Typical Renovation Costs</h4>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {investorMetrics.renovationCosts.map((r) => (
                    <div key={r.project} className="rounded-lg border border-surface-200 bg-white px-3 py-2">
                      <p className="text-xs text-primary-500">{r.project}</p>
                      <p className="font-semibold text-primary-900">{r.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Economic Context ──────────────────────────────────── */}
      <section id="economic" className="scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-900 text-xs font-bold text-white">4</span>
            <h2 className="font-serif text-3xl font-bold text-primary-900">Economic and Demographic Context</h2>
          </div>
          <p className="mt-4 max-w-3xl text-primary-600 leading-relaxed">
            Lincoln&apos;s economy remains fundamentally strong, anchored by government, healthcare, education, and a growing technology sector. The city&apos;s 2.8 percent unemployment rate significantly outperforms the national average of 4.4 percent. {economic.recognition}
          </p>

          {/* Employment comparison */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Lincoln MSA', value: economic.employment.lincolnUnemployment, benchmark: false },
              { label: 'Nebraska', value: economic.employment.nebraskaUnemployment, benchmark: false },
              { label: 'National', value: economic.employment.nationalUnemployment, benchmark: true },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border p-5 ${item.benchmark ? 'border-red-200 bg-red-50/50' : 'border-emerald-200 bg-emerald-50/50'}`}>
                <p className="text-xs font-medium text-primary-500">{item.label} Unemployment</p>
                <p className={`mt-1 text-3xl font-bold tabular-nums ${item.benchmark ? 'text-red-600' : 'text-emerald-700'}`}>{item.value}%</p>
                <p className="mt-1 text-xs text-primary-400">December 2025</p>
              </div>
            ))}
          </div>

          {/* Demographics & Cost of Living */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-primary-900">Demographics</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Population (2024)', value: economic.demographics.population.toLocaleString() },
                  { label: 'Projected 2025', value: economic.demographics.projectedPopulation.toLocaleString() },
                  { label: 'Median Income', value: formatCurrency(economic.demographics.medianHouseholdIncome) },
                  { label: 'Median Age', value: `${economic.demographics.medianAge} years` },
                  { label: 'MSA Population', value: economic.demographics.msaPopulation.toLocaleString() },
                  { label: 'Labor Force', value: economic.employment.laborForce.toLocaleString() },
                ].map((d) => (
                  <div key={d.label} className="rounded-lg border border-surface-200 bg-white px-3 py-2.5">
                    <p className="text-xs text-primary-500">{d.label}</p>
                    <p className="mt-0.5 text-lg font-bold text-primary-900">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">Lincoln vs. National</h3>
              <p className="mt-2 text-sm text-primary-600">
                Lincoln remains significantly more affordable than the national market, with a cost of living index of {economic.costOfLiving.index} compared to the national baseline of 100.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="py-2 pr-3 text-left font-semibold text-primary-900">Metric</th>
                      <th className="px-3 py-2 text-right font-semibold text-emerald-700">Lincoln</th>
                      <th className="px-3 py-2 text-right font-semibold text-primary-500">National</th>
                      <th className="pl-3 py-2 text-right font-semibold text-primary-500">Diff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {nationalComparison.map((row) => (
                      <tr key={row.metric}>
                        <td className="py-2 pr-3 text-primary-700">{row.metric}</td>
                        <td className="px-3 py-2 text-right font-medium text-emerald-700">{row.lincoln}</td>
                        <td className="px-3 py-2 text-right text-primary-500">{row.national}</td>
                        <td className="pl-3 py-2 text-right text-xs font-medium text-emerald-600">{row.comparison}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Major Employers */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500 text-[10px] font-bold text-white">+</span>
                Hiring and Expansion
              </h3>
              <div className="mt-3 space-y-2">
                {economic.hiring.map((h) => (
                  <div key={h.employer} className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-primary-900">{h.employer}</p>
                      <p className="text-xs text-primary-500">{h.notes}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-emerald-600">{h.openings}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-[10px] font-bold text-white">&minus;</span>
                Layoffs and Reductions
              </h3>
              <div className="mt-3 space-y-2">
                {economic.layoffs.map((l) => (
                  <div key={l.employer} className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-primary-900">{l.employer}</p>
                      <p className="text-xs text-primary-500">{l.status}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-red-500">{l.jobs.toLocaleString()} jobs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary-900">Major Infrastructure Projects</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {economic.infrastructure.map((p) => (
                <Card key={p.project} padding="md">
                  <CardContent>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">{p.cost}</p>
                    <p className="mt-1 text-lg font-bold text-primary-900">{p.project}</p>
                    <p className="mt-1 text-xs text-primary-500">{p.timeline}</p>
                    <p className="mt-2 text-sm text-primary-600">{p.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Market Forecast ────────────────────────────────────── */}
      <section id="forecast" className="bg-primary-900 text-white scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-bold text-primary-900">5</span>
            <h2 className="font-serif text-3xl font-bold">Market Forecast and Strategic Guidance</h2>
          </div>

          <div className="mt-6 max-w-3xl">
            <p className="text-xl font-semibold text-secondary-400">{forecast.direction}</p>
            <p className="mt-3 text-primary-200 leading-relaxed">
              Lincoln home prices are expected to rise {forecast.priceGrowthRange} percent in 2026, supported by inventory remaining tight at 2 to 2.5 months supply, declining mortgage rates improving affordability, strong local employment at 2.8 percent unemployment, and steady population growth with university enrollment.
            </p>
          </div>

          {/* Guidance Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Sellers */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">For Sellers</p>
              <p className="mt-2 text-lg font-bold">{forecast.sellerGuidance.condition}</p>
              <p className="mt-3 text-sm text-primary-200 leading-relaxed">
                {forecast.sellerGuidance.narrative}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Recommendations</p>
                <ul className="mt-2 space-y-1.5">
                  {forecast.sellerGuidance.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2 text-sm text-primary-200">
                      <svg className="mt-1 h-3 w-3 shrink-0 text-emerald-400" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Buyers */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">For Buyers</p>
              <p className="mt-2 text-lg font-bold">{forecast.buyerGuidance.condition}</p>
              <p className="mt-3 text-sm text-primary-200 leading-relaxed">
                {forecast.buyerGuidance.narrative}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Recommendations</p>
                <ul className="mt-2 space-y-1.5">
                  {forecast.buyerGuidance.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2 text-sm text-primary-200">
                      <svg className="mt-1 h-3 w-3 shrink-0 text-blue-400" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Investors */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-400">For Investors</p>
              <p className="mt-2 text-lg font-bold">{forecast.investorGuidance.condition}</p>
              <p className="mt-3 text-sm text-primary-200 leading-relaxed">
                {forecast.investorGuidance.narrative}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Best Targets</p>
                <ul className="mt-2 space-y-1.5">
                  {forecast.investorGuidance.bestTargets.map((target) => (
                    <li key={target} className="flex items-start gap-2 text-sm text-primary-200">
                      <svg className="mt-1 h-3 w-3 shrink-0 text-secondary-400" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {target}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Upcoming Shifters */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold">Upcoming Market Shifters</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {forecast.upcomingShifters.map((s) => (
                <div key={s.event} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs font-semibold text-secondary-400">{s.date}</p>
                  <p className="mt-1 text-sm font-medium">{s.event}</p>
                  <p className="mt-0.5 text-xs text-primary-300">{s.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Notable Transactions ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-primary-900">Notable Transactions and Market Stories</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notableTransactions.map((t) => (
            <Card key={t.category} padding="md" hover>
              <CardContent>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">{t.category}</p>
                <p className="mt-2 text-lg font-bold text-primary-900">{t.details}</p>
                <p className="mt-2 text-sm text-primary-600">{t.significance}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Sources ──────────────────────────────────────────────────────── */}
      <section id="sources" className="bg-surface-50 scroll-mt-12">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary-900">Data Sources and Methodology</h2>
          <p className="mt-3 text-sm text-primary-600 leading-relaxed max-w-3xl">
            This report compiles data from {report.sources.length} publicly available sources including multiple listing services, federal economic databases, rental market platforms, and local government agencies. All data reflects conditions as of January 31, 2026. Neighborhood-level data may include estimates where direct MLS data is unavailable, as noted in the analysis.
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {report.sources.map((source) => (
              <p key={source} className="text-xs text-primary-500 py-1">
                {source}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-900">
          Get Expert Guidance for Your Next Move
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-600">
          Whether you are buying, selling, or investing in Lincoln real estate, our inspection-informed advisory approach provides the data-driven insight you need to make confident decisions.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild href="/sell-your-home" size="lg">
            Schedule a Consultation
          </Button>
          <Button asChild href="/neighborhoods" variant="secondary" size="lg">
            Explore Neighborhoods
          </Button>
        </div>

        {/* Authors */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-primary-900">Marion &amp; Shawndel Polivka</p>
            <p className="text-xs text-primary-500">{report.meta.team}</p>
          </div>
        </div>
      </section>
    </>
  );
}
