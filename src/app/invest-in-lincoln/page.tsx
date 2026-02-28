import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, TEAM, AGENTS } from '@/lib/constants';
import { getInvestmentReferenceData } from '@/lib/data/investment-reference';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Invest in Lincoln, NE | Rental Property Analysis & Market Data',
    description:
      'Explore Lincoln, Nebraska as a rental property investment market. Free investment calculator, market data, neighborhood profiles, and expert analysis from an agent with hands-on renovation experience.',
    openGraph: {
      title: 'Invest in Lincoln | Lincoln Property Intelligence',
      description:
        'Data-driven investment analysis tools and market intelligence for Lincoln, NE rental property investors.',
      url: `${SITE.url}/invest-in-lincoln`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Invest in Lincoln | Lincoln Property Intelligence',
      description:
        'Data-driven investment analysis tools and market intelligence for Lincoln, NE rental property investors.',
    },
  };
}

const whyLincoln = [
  {
    stat: '2.7%',
    label: 'Unemployment Rate',
    description: 'Well below the national average, driven by a diversified economy anchored by state government, the University of Nebraska, and a growing tech sector.',
  },
  {
    stat: '44%',
    label: 'Renter-Occupied',
    description: 'Over 53,000 renter-occupied housing units create consistent demand for quality rental properties across Lincoln neighborhoods.',
  },
  {
    stat: '3.7\u20138.8%',
    label: 'Annual Appreciation',
    description: 'Lincoln home values have shown strong appreciation, outpacing many Midwest markets while maintaining affordable entry points for investors.',
  },
  {
    stat: '4\u20137%',
    label: 'Vacancy Rate',
    description: 'Low vacancy rates across most Lincoln neighborhoods mean your property spends less time empty and more time generating income.',
  },
];

const investmentApproach = [
  {
    title: 'Structural Due Diligence',
    description:
      'Marion\u2019s certified home inspector training means every potential investment property gets evaluated for foundation integrity, roof condition, mechanical systems, and hidden maintenance costs. You will know the true cost of ownership before you sign.',
  },
  {
    title: 'Market Data Analysis',
    description:
      'We analyze neighborhood-level rental demand, vacancy trends, comparable sale data, and appreciation patterns to help you identify the Lincoln neighborhoods where your investment dollars work hardest.',
  },
  {
    title: 'Financial Modeling',
    description:
      'Our free Investment Property Calculator lets you model any Lincoln property with live-reactive financial analysis \u2014 cash flow projections, cap rates, cash-on-cash returns, and 5-year equity growth scenarios.',
  },
  {
    title: 'Renovation ROI Planning',
    description:
      'With hands-on construction and renovation experience across multiple investment properties, Marion knows which improvements generate returns and which ones are money pits. Every recommendation comes with cost estimates and projected ROI.',
  },
];

export default async function InvestInLincolnPage() {
  const referenceData = await getInvestmentReferenceData();

  return (
    <>
      <ArticleJsonLd
        title="Invest in Lincoln, NE — Rental Property Market Intelligence"
        description="Data-driven investment analysis, market data, and expert advisory for rental property investors in Lincoln, Nebraska."
        url="/invest-in-lincoln"
        datePublished="2026-02-01"
        dateModified="2026-02-27"
        authorName={TEAM.name}
        type="Article"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.url, position: 1 },
          { name: 'Invest in Lincoln', url: `${SITE.url}/invest-in-lincoln`, position: 2 },
        ]}
      />

      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Investment Market Intelligence
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
            Lincoln, Nebraska:<br className="hidden sm:block" /> Built for Investors
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
            A university town. A state capital. A growing tech hub. Low unemployment,
            strong rental demand, and entry points that still make the numbers work.
            Lincoln is one of the Midwest&apos;s most compelling investment markets
            &mdash; and we have the data and tools to prove it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild href="/invest-in-lincoln/investment-calculator" size="lg">
              Open the Calculator
            </Button>
            <Button asChild href="#investment-approach" variant="secondary" size="lg">
              Our Approach
            </Button>
          </div>
        </div>
      </section>

      {/* Why Lincoln — Key Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
          Why Lincoln for Real Estate Investment
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          Strong economic fundamentals, consistent rental demand, and affordable
          entry points create a compelling case for investment.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyLincoln.map((item) => (
            <Card key={item.label} padding="lg" hover>
              <p className="text-3xl font-bold text-accent-500">{item.stat}</p>
              <p className="mt-1 text-sm font-semibold text-primary-900">
                {item.label}
              </p>
              <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Lincoln Market Snapshot */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
            Lincoln Market Snapshot
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Current market data for Lincoln, Nebraska rental property investors.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                Median Home Price
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.marketHighlights.medianPrice}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Affordable entry points compared to coastal markets, with strong
                appreciation potential.
              </p>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                Average 2BR Rent
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.rentAverages.find((r) => r.unitType === '2-Bedroom')?.avgRent ?? '$1,365'}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Consistent rental income driven by university students, young
                professionals, and families.
              </p>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                30-Year Mortgage Rate
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.mortgageRates.thirtyYear.rate}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Current investment property financing rates. 15-year options
                at {referenceData.mortgageRates.fifteenYear.rate} for faster equity building.
              </p>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                Renter-Occupied Units
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.marketHighlights.renterOccupied}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Nearly half of Lincoln housing units are renter-occupied, creating
                deep and consistent demand.
              </p>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                Effective Tax Rate
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.propertyTax.effectiveRate}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Property tax is your largest recurring expense. Our calculator
                auto-estimates this based on purchase price.
              </p>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                Avg Annual Appreciation
              </p>
              <p className="mt-2 text-2xl font-bold text-primary-900">
                {referenceData.marketHighlights.appreciation}
              </p>
              <p className="mt-1 text-sm text-primary-600">
                Strong year-over-year appreciation drives equity growth alongside
                rental income.
              </p>
            </Card>
          </div>

          <p className="mt-6 text-center text-xs text-primary-400">
            Data as of {referenceData.lastUpdated}. Sources: Zillow, Zumper, Freddie Mac, Lancaster County Assessor.
          </p>
        </div>
      </section>

      {/* Investment Calculator CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary-900 p-8 sm:p-12 lg:p-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Free Interactive Tool
          </p>
          <h2 className="mt-3 text-3xl font-bold font-serif text-white sm:text-4xl">
            Investment Property Calculator
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
            Model any Lincoln property with live-reactive financial analysis. Adjust
            inputs and watch cash flow, cap rate, cash-on-cash return, and 5-year
            projections update instantly. Save and compare up to three scenarios
            side by side.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-200">
              Cash Flow Analysis
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-200">
              Cap Rate &amp; Cash-on-Cash
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-200">
              5-Year Projection
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-200">
              Scenario Comparison
            </span>
          </div>
          <div className="mt-8">
            <Button asChild href="/invest-in-lincoln/investment-calculator" size="lg">
              Open the Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section id="investment-approach" className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
            Our Investment Advisory Approach
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Inspection-informed analysis combined with Lincoln market data
            means you invest with clarity, not guesswork.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {investmentApproach.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-secondary-400">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-primary-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marion's Philosophy */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900">
              Marion&apos;s Investment Philosophy
            </h2>
            <p className="mt-4 text-lg text-primary-600 leading-relaxed">
              &ldquo;Every investment property tells two stories &mdash; the one the
              listing agent wants you to see, and the one the building itself reveals.
              My job is to make sure you hear both before you write a check.&rdquo;
            </p>
            <p className="mt-4 text-primary-600 leading-relaxed">
              With certified home inspector training and hands-on renovation
              experience across multiple investment properties, Marion brings a
              perspective that most agents simply cannot offer. He has swung the
              hammer, pulled the permits, and managed the rehabs himself. That
              experience translates directly into better due diligence, more
              accurate renovation budgets, and smarter investment decisions for
              his clients.
            </p>
            <p className="mt-4 text-primary-600 leading-relaxed">
              When Marion evaluates an investment property, he is not just
              running the numbers &mdash; he is assessing the foundation, estimating
              the remaining life of the roof and HVAC system, identifying the
              deferred maintenance that will eat into your cash flow, and
              calculating whether the renovation costs justify the projected rent
              increase. That is the difference between investing with data and
              investing with hope.
            </p>
          </div>
          <Card padding="none" className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-surface-100">
              <Image
                src="/images/agents/marion-polivka.jpg"
                alt={`${AGENTS.marion.name} — Investment Property Specialist`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
            <div className="p-6 lg:p-8">
            <p className="font-semibold text-primary-900">{AGENTS.marion.name}</p>
            <p className="text-sm text-primary-500">{AGENTS.marion.title}</p>
            <p className="mt-4 text-sm text-primary-600 leading-relaxed">
              {AGENTS.marion.shortBio}
            </p>
            <ul className="mt-4 space-y-2">
              {AGENTS.marion.credentials.map((cred) => (
                <li
                  key={cred}
                  className="flex items-start gap-2 text-sm text-primary-600"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {cred}
                </li>
              ))}
            </ul>
            <a
              href={AGENTS.marion.phoneTel}
              className="mt-4 block text-sm font-medium text-accent-500 hover:text-accent-600"
            >
              Call {AGENTS.marion.phoneFormatted}
            </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <svg
            className="mx-auto h-10 w-10 text-secondary-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
          </svg>
          <blockquote className="mt-6">
            <p className="text-xl font-serif text-white leading-relaxed sm:text-2xl">
              &ldquo;Marion identified $14,000 in deferred maintenance that the
              seller&apos;s agent never disclosed. His inspection background saved
              us from a property that looked great on paper but would have been a
              cash flow disaster. He then helped us find a duplex in University
              Place that cash-flows from day one.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 text-primary-300">
            &mdash; First-time investor, Lincoln
          </figcaption>
        </div>
      </section>

      {/* Lincoln Rent Reference */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
          Lincoln Rental Market by Unit Type
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          Current average rents across Lincoln to help you model realistic income projections.
        </p>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-surface-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary-900 text-white">
                <th className="px-6 py-3 text-left font-semibold">Unit Type</th>
                <th className="px-6 py-3 text-right font-semibold">Avg Rent</th>
                <th className="px-6 py-3 text-right font-semibold">Avg Sq Ft</th>
              </tr>
            </thead>
            <tbody>
              {referenceData.rentAverages.map((row, index) => (
                <tr
                  key={row.unitType}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-surface-50'}
                >
                  <td className="px-6 py-3 font-medium text-primary-900">
                    {row.unitType}
                  </td>
                  <td className="px-6 py-3 text-right text-primary-700">
                    {row.avgRent}
                  </td>
                  <td className="px-6 py-3 text-right text-primary-500">
                    {row.sqft}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-primary-400">
          Source: Zumper &amp; Zillow, as of {referenceData.lastUpdated}.
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-primary-900">
            Ready to Analyze a Property?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-600">
            Open our free Investment Property Calculator and model any Lincoln
            property with live financial analysis. Or reach out to discuss your
            investment goals with an agent who speaks both construction and numbers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild href="/invest-in-lincoln/investment-calculator" size="lg">
              Open the Calculator
            </Button>
            <Button asChild href="/about" variant="secondary" size="lg">
              Talk to Marion
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
