import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, AGENTS, TEAM } from '@/lib/constants';
import { getInvestmentReferenceData, getInvestmentFaqs } from '@/lib/data/investment-reference';
import { WebApplicationJsonLd } from '@/components/seo/WebApplicationJsonLd';
import { FAQPageJsonLd } from '@/components/seo/FAQPageJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InvestmentCalculatorClient } from './_components/InvestmentCalculatorClient';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Investment Property Calculator | Lincoln, NE Rental Analysis',
    description:
      'Free investment property calculator for Lincoln, Nebraska. Analyze cash flow, cap rate, cash-on-cash return, and 5-year projections for rental properties.',
    openGraph: {
      title: 'Investment Property Calculator | Lincoln, NE Rental Analysis',
      description:
        'Free investment property calculator for Lincoln, Nebraska. Analyze cash flow, cap rate, cash-on-cash return, and 5-year projections for rental properties.',
      url: `${SITE.url}/invest-in-lincoln/investment-calculator`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Investment Property Calculator | Lincoln, NE',
      description:
        'Free calculator to analyze Lincoln, Nebraska rental property returns. Cash flow, cap rate, cash-on-cash return, and 5-year projections.',
    },
    alternates: {
      canonical: `${SITE.url}/invest-in-lincoln/investment-calculator`,
    },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb Items
// ---------------------------------------------------------------------------

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Invest in Lincoln', href: '/invest-in-lincoln' },
  { label: 'Investment Calculator', href: '/invest-in-lincoln/investment-calculator' },
];

// ---------------------------------------------------------------------------
// Market Stat Card (inline — simple presentational component)
// ---------------------------------------------------------------------------

function MarketStatCard({
  label,
  value,
  source,
}: {
  label: string;
  value: string;
  source?: string;
}) {
  return (
    <Card padding="md" hover>
      <p className="text-sm font-medium text-primary-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-primary-900">{value}</p>
      {source && (
        <p className="mt-1 text-xs text-primary-400">{source}</p>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function InvestmentCalculatorPage() {
  const [referenceData, faqs] = await Promise.all([
    getInvestmentReferenceData(),
    getInvestmentFaqs(),
  ]);

  return (
    <>
      {/* ── Structured Data ──────────────────────────────────────────── */}
      <WebApplicationJsonLd
        name="Lincoln Investment Property Calculator"
        description="Free investment property calculator for analyzing rental returns in Lincoln, Nebraska. Computes cash flow, cap rate, cash-on-cash return, gross rent multiplier, break-even occupancy, and 5-year ROI projections using real Lincoln market data."
        url={`${SITE.url}/invest-in-lincoln/investment-calculator`}
        applicationCategory="FinanceApplication"
      />
      <FAQPageJsonLd faqs={faqs} />

      {/* ── Breadcrumbs ──────────────────────────────────────────────── */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: Hero
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary-400">
              Free Investment Analysis Tool
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Lincoln Investment{' '}
              <span className="text-secondary-400">Property Calculator</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-200">
              Analyze any Lincoln, Nebraska rental property in seconds. Calculate monthly
              cash flow, cap rate, cash-on-cash return, and 5-year equity projections
              using real Lancaster County tax rates, current mortgage rates, and local
              market data from the {TEAM.name}.
            </p>
            <p className="mt-4 text-sm text-primary-300">
              Built by{' '}
              <Link href="/about" className="font-medium text-secondary-400 transition-colors hover:text-secondary-300">
                {AGENTS.marion.name}
              </Link>{' '}
              &amp;{' '}
              <Link href="/about" className="font-medium text-secondary-400 transition-colors hover:text-secondary-300">
                {AGENTS.shawndel.name}
              </Link>{' '}
              | {TEAM.name}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2: Lincoln Market Snapshot
          ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-surface-200 bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl">
              Lincoln Market Snapshot for Investors
            </h2>
            <p className="mt-3 text-primary-600">
              Current market conditions as of {referenceData.lastUpdated}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MarketStatCard
              label="Median Home Price"
              value={referenceData.marketHighlights.medianPrice}
              source="Source: NNRMLS, Zillow, Redfin"
            />
            <MarketStatCard
              label="Average 2BR Rent"
              value={referenceData.rentAverages.find((r) => r.unitType === '2-Bedroom')?.avgRent ?? '$1,322-$1,409'}
              source="Source: Zillow, ApartmentList, RentData"
            />
            <MarketStatCard
              label="30-Year Mortgage Rate"
              value={referenceData.mortgageRates.thirtyYear.rate}
              source={referenceData.mortgageRates.thirtyYear.source}
            />
            <MarketStatCard
              label="Renter-Occupied Households"
              value={referenceData.marketHighlights.renterOccupied}
              source="Source: U.S. Census ACS"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3: The Interactive Tool
          ══════════════════════════════════════════════════════════════ */}
      <section id="calculator" className="bg-white">
        <InvestmentCalculatorClient referenceData={referenceData} faqs={faqs} />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4: How to Read Your Results
          ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-surface-200 bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl">
            How to Read Your Investment Property Calculator Results
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-600">
            Our Lincoln Investment Property Calculator produces six key metrics that experienced real estate investors use
            to evaluate whether a rental property is worth pursuing. Understanding what each number means, and what constitutes
            a strong result in the Lincoln, Nebraska market specifically, is essential for making informed decisions. Here is
            a detailed breakdown of each metric and how to interpret it in the context of Lancaster County real estate.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-primary-900">Monthly Cash Flow</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                Cash flow is the money left over each month after collecting rent and paying every expense, including
                mortgage principal and interest, property taxes, insurance, maintenance, vacancy reserves, and property
                management fees. Positive cash flow means the property pays for itself and puts money in your pocket.
                Negative cash flow means you are subsidizing the property out of your own savings each month. In Lincoln,
                Nebraska, where purchase prices remain moderate relative to rental income, achieving positive cash flow
                is realistic for well-researched deals. A cash flow of $100 to $300 per month is a solid starting
                target for a single-family rental in Lincoln. Properties in neighborhoods like Hartley, Belmont, or
                Clinton often produce stronger cash flow because of lower purchase prices and stable tenant demand from
                the University of Nebraska and local workforce.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">Cash-on-Cash Return</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                Cash-on-cash return measures your annual pre-tax cash flow divided by the total cash you invested
                upfront, including your down payment, closing costs, and any immediate rehab expenses. Unlike cap rate,
                cash-on-cash accounts for your financing terms, making it the best measure of how efficiently your
                actual dollars are working. An 8% or higher cash-on-cash return is generally considered strong in the
                Lincoln market. For investors using conventional financing with 20% down, the leverage effect of a
                mortgage can amplify your cash-on-cash return well above the unlevered cap rate. This calculator
                automatically computes your cash-on-cash return based on the specific financing terms and purchase
                price you enter, so you can see how different down payments or interest rates change the efficiency
                of your invested capital.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">Cap Rate</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                The capitalization rate, or cap rate, measures a property&apos;s net operating income as a percentage of
                its purchase price, without considering financing. Think of it as the return you would earn if you paid
                all cash. In Lincoln, Nebraska, residential cap rates typically fall between 5% and 8% depending on the
                neighborhood, property condition, and unit count. A higher cap rate generally means better current income
                relative to the price, while a lower cap rate may indicate an appreciating neighborhood where investors are
                willing to accept less current income in exchange for stronger long-term equity growth. Cap rate is most
                useful for comparing properties on an apples-to-apples basis because it strips out financing variables.
                Lancaster County investors often find that duplexes and fourplexes deliver higher cap rates than single-family
                rentals due to better rent-to-price ratios.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">Gross Rent Multiplier (GRM)</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                The gross rent multiplier is a quick screening metric calculated by dividing the purchase price by the
                annual gross rent. A GRM of 12 means it would take 12 years of gross rent to equal the purchase price.
                Lower GRMs indicate better value from a rental income standpoint. In the Lincoln real estate market,
                a GRM below 12 is excellent, 12 to 15 is acceptable, and above 15 signals that the property may be
                overpriced relative to its rental income. GRM does not account for expenses, vacancies, or financing,
                so it should always be used alongside cap rate and cash flow, not as a standalone decision metric.
                However, it is an efficient way to quickly filter properties when browsing listings in Lincoln, Nebraska
                and identifying which ones are worth a deeper analysis with this calculator.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">Break-Even Occupancy</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                Break-even occupancy tells you the minimum percentage of time the property needs to be occupied and
                generating rent in order to cover all operating expenses, including your mortgage payment. A break-even
                occupancy of 80% means you can absorb up to 20% vacancy before the property starts losing money each
                month. Given that Lincoln&apos;s rental vacancy rate consistently hovers between 4% and 7%, a break-even
                occupancy below 85% provides comfortable margin. Properties with break-even occupancy above 90% carry
                significantly more risk because even a single month of unexpected vacancy or a major repair could push
                you into negative cash flow. This metric is especially important in Lancaster County, where tenant
                turnover around the University of Nebraska academic calendar can create predictable but manageable vacancy
                windows each summer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-900">5-Year Total ROI</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                The 5-year total return on investment combines three sources of wealth: cumulative cash flow over five
                years, equity built through mortgage principal paydown, and appreciation in property value. This metric
                captures the full picture of real estate investing in Lincoln, Nebraska, where moderate but steady
                appreciation of 3.7% to 8.8% per year compounds into meaningful equity growth over a holding period.
                A 5-year ROI above 40% is considered strong in the current Lincoln market. Our calculator projects
                these returns using the appreciation rate and rent increase assumptions you provide, defaulting to
                conservative estimates grounded in recent Lincoln, Nebraska market data. This forward-looking projection
                helps you understand total wealth creation, not just month-to-month cash flow, giving you a more
                complete framework for evaluating each potential deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5: Why Lincoln for Investment
          ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-surface-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl">
              Why Lincoln, Nebraska for Real Estate Investment
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-primary-600">
              <p>
                Lincoln, Nebraska stands out as one of the most investor-friendly real estate markets in the Midwest, and the
                data consistently backs that up. With approximately 44% of Lincoln households occupied by renters, totaling
                over 53,360 rental units, the demand side of the equation is robust and reliable. The University of Nebraska
                at Lincoln, the state&apos;s flagship university with over 25,000 students, creates a perpetual cycle of
                rental demand that insulates Lincoln landlords from the kind of catastrophic vacancy swings that plague markets
                dependent on a single employer or industry.
              </p>
              <p>
                Lincoln&apos;s economy is among the most diversified and recession-resistant in the Great Plains. Anchored by
                state government, the University of Nebraska system, a growing healthcare sector, and an expanding technology
                corridor, the city maintains unemployment at a remarkably low 2.7%. This economic stability translates directly
                into reliable tenants who pay rent consistently and take care of their homes. For real estate investors, tenant
                quality matters as much as the numbers on a spreadsheet, and Lincoln delivers on both fronts.
              </p>
              <p>
                From a pricing standpoint, Lincoln remains considerably more affordable than peer markets in the Midwest and
                significantly below the national median. The median home price of $302K to $314K allows investors to enter the
                market with reasonable capital requirements while still collecting rents that are competitive on a national
                basis. Lincoln rents currently average $1,322 to $1,409 per month for a two-bedroom unit, and rent growth has
                been tracking at 2.7% to 3.6% year-over-year. When you model those numbers in this calculator, you will find
                that Lincoln&apos;s rent-to-price ratios produce cap rates and cash flow projections that are difficult to
                replicate in larger, more expensive cities.
              </p>
              <p>
                Home price appreciation in Lincoln has been notably strong in recent years, ranging from 3.7% to 8.8%
                year-over-year. That appreciation, combined with steady rental income and manageable property taxes in
                Lancaster County, creates a compounding wealth-building engine that rewards patient, long-term investors.
                The 5-year ROI projections in our calculator reflect this multi-dimensional return profile, helping you
                see beyond just monthly cash flow to the full picture of real estate wealth creation in Lincoln.
              </p>
              <p>
                Property taxes in Lancaster County deserve specific mention. With an effective rate of approximately 1.52%
                to 1.66%, Nebraska is not a low-tax state, and taxes represent one of the largest line items in any Lincoln
                rental property budget. However, the relatively affordable purchase prices mean that absolute tax bills
                remain manageable, typically ranging from $3,561 to $4,158 annually for a median-priced property. Our
                calculator defaults to a 1.55% effective rate based on current Lancaster County data, giving you a
                realistic baseline for your operating expense projections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6: Marion's Investment Philosophy
          ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-surface-200 bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl">
              Marion&apos;s Investment Philosophy
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-primary-600">
              <p>
                {AGENTS.marion.name} built this Investment Property Calculator based on personal experience buying,
                renovating, and managing rental properties in Lincoln, Nebraska. Marion&apos;s background in certified
                home inspection training means he evaluates investment properties differently from most agents. Where
                others see cosmetic potential, Marion sees the mechanical systems, structural integrity, and hidden
                maintenance costs that determine whether a rental property will actually deliver the returns the numbers
                promise.
              </p>
              <p>
                Marion&apos;s investment philosophy centers on buying properties where the math works conservatively,
                using realistic vacancy rates, actual Lancaster County property tax data, and current mortgage rates
                rather than aspirational projections. Every default value in this calculator is calibrated to Lincoln,
                Nebraska market reality. {AGENTS.shawndel.name}, Marion&apos;s partner at the {TEAM.name}, brings deep
                community knowledge and renovation experience that further strengthens the team&apos;s ability to advise
                investors on which Lincoln neighborhoods and property types match their goals and risk tolerance.
              </p>
              <p>
                The goal of this calculator is not to make every property look like a good deal. It is to give you
                honest, data-driven numbers so you can make decisions with confidence. If a deal does not pencil out,
                the calculator will show you that clearly. If it does, you will have the detailed breakdown to move
                forward with conviction. Either way, {AGENTS.marion.name} and {AGENTS.shawndel.name} are available to
                walk you through the analysis and help you find the right investment property in Lincoln.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 7: Testimonial
          ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-surface-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card padding="lg" className="border-l-4 border-l-secondary-400">
              <blockquote>
                <svg
                  className="mb-4 h-8 w-8 text-secondary-400/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-lg italic leading-relaxed text-primary-700">
                  Marion&apos;s inspection background completely changed how I evaluate rental properties. He spotted
                  a foundation issue that would have cost me $20,000 after closing. Instead, we negotiated the price
                  down and I still got a property that cash flows $280 a month. That kind of insight is worth its
                  weight in gold for any investor.
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-semibold text-primary-900">
                    Lincoln Real Estate Investor
                  </p>
                  <p className="text-xs text-primary-400">
                    Single-family rental, Near South neighborhood
                  </p>
                </footer>
              </blockquote>
            </Card>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: Final CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Ready to Analyze a{' '}
              <span className="text-secondary-400">Specific Property</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-200">
              Run the numbers with our calculator, then let {AGENTS.marion.name} and{' '}
              {AGENTS.shawndel.name} help you find the right property. Inspection-informed
              advice, real Lancaster County data, and years of hands-on investment experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild href="/about" size="lg">
                Schedule a Consultation
              </Button>
              <Button
                asChild
                href="/invest-in-lincoln"
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-primary-900"
              >
                Explore Lincoln Investments
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-300">
              Call {AGENTS.marion.name} directly at{' '}
              <a
                href={AGENTS.marion.phoneTel}
                className="font-medium text-secondary-400 underline underline-offset-2 transition-colors hover:text-secondary-300"
              >
                {AGENTS.marion.phoneFormatted}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
