import type { Metadata } from 'next';
import { SITE, TEAM } from '@/lib/constants';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Polivka Property Assessment',
    description:
      'The Polivka Property Assessment combines certified home inspector training with market-aligned strategy to deliver a comprehensive property evaluation for Lincoln, Nebraska homeowners.',
    openGraph: {
      title: 'Polivka Property Assessment | Lincoln Property Intelligence',
      description:
        'A comprehensive property evaluation combining inspection expertise with market data for Lincoln, NE.',
      url: `${SITE.url}/polivka-property-assessment`,
    },
  };
}

const processSteps = [
  {
    number: 1,
    title: 'Schedule Your Assessment',
    description:
      'Contact us to set up a convenient time. We will gather initial details about your property, your goals (selling, renovating, or investing), and any specific concerns you want addressed.',
  },
  {
    number: 2,
    title: 'Comprehensive Property Review',
    description:
      'Marion conducts an on-site evaluation covering structural systems, mechanical components, cosmetic condition, and exterior elements. This is not a pass/fail inspection — it is a strategic assessment of how your property compares to current Lincoln market expectations.',
  },
  {
    number: 3,
    title: 'Market-Aligned Strategy',
    description:
      'We cross-reference our physical findings with current neighborhood data — median prices, days on market, buyer preferences, and competitive listings — to identify the improvements that will deliver the highest return in your specific market.',
  },
  {
    number: 4,
    title: 'Action Plan Delivery',
    description:
      'You receive a detailed, prioritized action plan with estimated costs, projected ROI for each improvement, and a recommended timeline. Whether you are listing in two weeks or two years, the plan adapts to your schedule and budget.',
  },
];

const categories = [
  {
    name: 'Structural',
    items: [
      'Foundation integrity',
      'Framing condition',
      'Roof system age and condition',
      'Load-bearing wall assessment',
      'Basement moisture and drainage',
    ],
    color: '#1e3a5f',
  },
  {
    name: 'Cosmetic',
    items: [
      'Interior finishes and surfaces',
      'Flooring condition',
      'Paint and wall treatments',
      'Kitchen and bathroom presentation',
      'Lighting and fixtures',
    ],
    color: '#d4af37',
  },
  {
    name: 'Market Alignment',
    items: [
      'Comparable property analysis',
      'Neighborhood price trajectory',
      'Buyer demographic preferences',
      'Feature gap analysis',
      'Competitive positioning',
    ],
    color: '#0d9488',
  },
  {
    name: 'Pricing',
    items: [
      'Current market value estimate',
      'As-improved value projection',
      'Cost-to-cure analysis',
      'Price-per-square-foot benchmarking',
      'Seasonal timing impact',
    ],
    color: '#7c3aed',
  },
  {
    name: 'Presentation',
    items: [
      'Curb appeal evaluation',
      'Staging recommendations',
      'Photography readiness',
      'Declutter and depersonalization',
      'First impression scoring',
    ],
    color: '#059669',
  },
];

export default function AssessmentPage() {
  return (
    <>
      <ArticleJsonLd
        title="The Polivka Property Assessment"
        description="A comprehensive property evaluation combining certified home inspector training with market-aligned strategy for Lincoln, Nebraska homeowners."
        url="/polivka-property-assessment"
        datePublished="2026-01-15"
        dateModified="2026-02-27"
        authorName={TEAM.name}
        type="Article"
      />

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Inspection-Informed Advisory
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
            The Polivka Property Assessment
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
            Not a standard inspection. Not a basic CMA. A comprehensive,
            data-driven property evaluation that tells you exactly where your
            home stands — and exactly what to do about it.
          </p>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900">
              What Makes It Different
            </h2>
            <p className="mt-4 text-lg text-primary-600 leading-relaxed">
              Most real estate agents walk through a home and comment on the
              countertops. Marion walks through and identifies the aging water
              heater, the foundation settlement pattern typical of 1960s Lincoln
              construction, and the HVAC system that has two winters left.
            </p>
            <p className="mt-4 text-primary-600 leading-relaxed">
              That is the difference certified home inspector training makes.
              Marion does not just know what to look for — he understands why it
              matters, what it costs to fix, and how it affects your home&apos;s
              value in today&apos;s Lincoln market. Combined with Shawndel&apos;s
              neighborhood expertise and our team&apos;s market data, the
              Polivka Property Assessment delivers actionable intelligence, not
              just observations.
            </p>
            <p className="mt-4 text-primary-600 leading-relaxed">
              Where a traditional CMA tells you what comparable homes sold for,
              and a standard inspection tells you what is broken, our assessment
              bridges the gap — showing you which improvements actually move the
              needle on your home&apos;s value and which ones are not worth the
              investment.
            </p>
          </div>
          <div className="rounded-xl border border-surface-200 bg-surface-50 p-8">
            <h3 className="text-lg font-semibold text-primary-900">
              Assessment vs. Standard Approaches
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                  X
                </span>
                <div>
                  <p className="font-medium text-primary-800">Standard CMA</p>
                  <p className="text-sm text-primary-500">
                    Compares sale prices but ignores property condition
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                  X
                </span>
                <div>
                  <p className="font-medium text-primary-800">
                    Home Inspection
                  </p>
                  <p className="text-sm text-primary-500">
                    Identifies defects but does not connect to market value
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-xs font-bold text-accent-600">
                  &#10003;
                </span>
                <div>
                  <p className="font-medium text-primary-800">
                    Polivka Property Assessment
                  </p>
                  <p className="text-sm text-primary-500">
                    Combines inspection insight, market data, and ROI analysis
                    into a prioritized action plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Four clear steps from first conversation to actionable plan.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-900 text-lg font-bold text-secondary-400">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-primary-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Evaluated */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
          What We Evaluate
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          Five comprehensive categories cover every dimension of your
          property&apos;s current condition and market potential.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.name} padding="lg" hover>
              <div className="flex items-center gap-3">
                <Badge color={cat.color} size="md">
                  {cat.name}
                </Badge>
              </div>
              <ul className="mt-4 space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
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
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial Pull Quote */}
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
              &ldquo;Marion found three issues during our initial walkthrough
              that the previous inspector missed entirely. His assessment saved
              us over $12,000 in unexpected repairs and helped us negotiate a
              better purchase price. This is what sets the Polivka team apart
              from every other agent we interviewed.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 text-primary-300">
            &mdash; Lincoln home buyer, Piedmont neighborhood
          </figcaption>
        </div>
      </section>

      {/* CTA Form Placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
            Request Your Assessment
          </h2>
          <p className="mt-4 text-center text-lg text-primary-600">
            Tell us about your property and goals. We will reach out within
            one business day to schedule your Polivka Property Assessment.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={undefined}
            action="#"
            method="POST"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="assessment-name"
                  className="block text-sm font-medium text-primary-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="assessment-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>
              <div>
                <label
                  htmlFor="assessment-email"
                  className="block text-sm font-medium text-primary-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="assessment-email"
                  name="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="assessment-phone"
                  className="block text-sm font-medium text-primary-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="assessment-phone"
                  name="phone"
                  autoComplete="tel"
                  placeholder="(402) 555-0123"
                  className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>
              <div>
                <label
                  htmlFor="assessment-address"
                  className="block text-sm font-medium text-primary-700"
                >
                  Property Address
                </label>
                <input
                  type="text"
                  id="assessment-address"
                  name="address"
                  autoComplete="street-address"
                  placeholder="1234 O Street, Lincoln, NE"
                  className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="assessment-message"
                className="block text-sm font-medium text-primary-700"
              >
                Tell Us About Your Goals
              </label>
              <textarea
                id="assessment-message"
                name="message"
                rows={4}
                placeholder="Are you looking to sell, buy, invest, or just understand your property's current value?"
                className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
              />
            </div>

            <div className="text-center">
              <Button type="submit" size="lg">
                Request My Assessment
              </Button>
              <p className="mt-3 text-xs text-primary-400">
                No obligation. We will respond within one business day.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
