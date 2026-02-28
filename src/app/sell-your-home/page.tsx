import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, TEAM, AGENTS } from '@/lib/constants';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sell Your Home in Lincoln, NE | Data-Driven Seller Tools',
    description:
      'Maximize your Lincoln, Nebraska home sale with inspection-informed advisory, a free Seller Readiness Score, and the comprehensive Polivka Property Assessment. Know exactly where your home stands before listing.',
    openGraph: {
      title: 'Sell Your Home | Lincoln Property Intelligence',
      description:
        'Data-driven tools and inspection-informed advisory to help Lincoln homeowners sell with confidence.',
      url: `${SITE.url}/sell-your-home`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sell Your Home | Lincoln Property Intelligence',
      description:
        'Data-driven tools and inspection-informed advisory to help Lincoln homeowners sell with confidence.',
    },
  };
}

const sellerTools = [
  {
    title: 'Seller Readiness Score',
    description:
      'Take our free 5-minute assessment and get a personalized 0\u2013100 score across five categories: structural condition, cosmetic readiness, market alignment, pricing strategy, and presentation. Receive actionable recommendations with estimated costs and ROI for each improvement.',
    href: '/sell-your-home/seller-readiness-score',
    cta: 'Take the Assessment',
    badge: 'Free Online Tool',
    badgeColor: '#0d9488',
    features: [
      '20 targeted questions across 5 categories',
      'Instant score with letter grade',
      'Personalized improvement recommendations',
      'Cost estimates and ROI projections',
    ],
  },
  {
    title: 'Polivka Property Assessment',
    description:
      'Schedule an in-person evaluation where Marion combines certified home inspector training with current Lincoln market data to create a prioritized action plan. This is not a standard CMA or a basic walkthrough \u2014 it is a comprehensive, data-driven property evaluation that tells you exactly what to do and why.',
    href: '#request-assessment',
    cta: 'Request Your Assessment',
    badge: 'In-Person Service',
    badgeColor: '#d4af37',
    features: [
      'On-site structural and systems evaluation',
      'Neighborhood-specific market analysis',
      'Prioritized improvement plan with ROI',
      'Customized timeline for your goals',
    ],
  },
];

const processSteps = [
  {
    number: 1,
    title: 'Take the Seller Readiness Score',
    description:
      'Start with our free online assessment. Answer 20 questions about your home\u2019s condition, location, pricing expectations, and presentation. In five minutes, you will have a clear picture of where your home stands across five critical categories, plus specific recommendations for improvement.',
  },
  {
    number: 2,
    title: 'Schedule Your Property Assessment',
    description:
      'Ready for a deeper evaluation? Marion conducts an on-site review covering structural systems, mechanical components, cosmetic condition, and exterior elements. He cross-references physical findings with current Lincoln market data to identify the improvements that deliver the highest return.',
  },
  {
    number: 3,
    title: 'Get Your Action Plan',
    description:
      'You receive a detailed, prioritized action plan with estimated costs, projected ROI for each improvement, and a recommended timeline. Whether you are listing in two weeks or two years, the plan adapts to your schedule, budget, and the current state of the Lincoln market.',
  },
  {
    number: 4,
    title: 'List with Confidence',
    description:
      'With a clear picture of your home\u2019s strengths, addressed weaknesses, and a data-backed pricing strategy, you list knowing exactly where you stand. Our clients consistently achieve faster sales and higher prices because they go to market prepared, not hopeful.',
  },
];

const categories = [
  {
    name: 'Structural',
    weight: '30%',
    description:
      'Foundation integrity, roof condition, HVAC age and function, plumbing and electrical systems, and basement moisture management. These are the systems that inspectors scrutinize and buyers worry about most.',
    items: [
      'Foundation integrity',
      'Roof system age and condition',
      'HVAC, plumbing, and electrical',
      'Basement moisture and drainage',
    ],
    color: '#1e3a5f',
  },
  {
    name: 'Cosmetic',
    weight: '20%',
    description:
      'Interior paint, flooring condition, kitchen and bathroom presentation, lighting, and overall finish quality. These are the details that create emotional impact during showings and in listing photos.',
    items: [
      'Interior paint and finishes',
      'Flooring condition throughout',
      'Kitchen and bathroom presentation',
      'Lighting and fixture quality',
    ],
    color: '#d4af37',
  },
  {
    name: 'Market Alignment',
    weight: '25%',
    description:
      'Neighborhood demand, school district quality, lot characteristics, and comparable sale activity. Your home does not exist in a vacuum \u2014 understanding how it fits the current Lincoln buyer landscape is critical to pricing and positioning.',
    items: [
      'Neighborhood demand tier',
      'School district desirability',
      'Lot type and location factors',
      'Comparable sale performance',
    ],
    color: '#0d9488',
  },
  {
    name: 'Pricing',
    weight: '15%',
    description:
      'Price expectations versus market data, motivation level, listing timeline, and seasonal timing. The right price is not just about what your home is worth \u2014 it is about where it sits in the competitive landscape of active Lincoln listings.',
    items: [
      'Price expectation vs. market data',
      'Motivation and timeline alignment',
      'Seasonal timing considerations',
      'Competitive positioning strategy',
    ],
    color: '#7c3aed',
  },
  {
    name: 'Presentation',
    weight: '10%',
    description:
      'Decluttering progress, curb appeal, staging readiness, and photography preparation. In a market where 97% of buyers start online, your home\u2019s first impression happens in a listing photo, not at the front door.',
    items: [
      'Declutter and depersonalization',
      'Curb appeal evaluation',
      'Staging readiness',
      'Photography preparation',
    ],
    color: '#059669',
  },
];

export default function SellYourHomePage() {
  return (
    <>
      <ArticleJsonLd
        title="Sell Your Home in Lincoln, NE"
        description="Data-driven seller tools and inspection-informed advisory to help Lincoln homeowners maximize their sale price and minimize time on market."
        url="/sell-your-home"
        datePublished="2026-01-15"
        dateModified="2026-02-27"
        authorName={TEAM.name}
        type="Article"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.url, position: 1 },
          { name: 'Sell Your Home', url: `${SITE.url}/sell-your-home`, position: 2 },
        ]}
      />

      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Inspection-Informed Advisory
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
            Sell Your Lincoln Home<br className="hidden sm:block" /> with Confidence
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
            Most homeowners go to market hoping for the best. Our clients go to market
            knowing exactly where their home stands, what to improve, and how to price it.
            That is the difference data-driven, inspection-informed advisory makes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild href="/sell-your-home/seller-readiness-score" size="lg">
              Check Your Readiness Score
            </Button>
            <Button asChild href="#request-assessment" variant="secondary" size="lg">
              Request Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Seller Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-serif text-primary-900">
            Two Ways to Get Started
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-600">
            Whether you want a quick self-assessment or a comprehensive in-person evaluation,
            we have the tools to help you sell smarter.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {sellerTools.map((tool) => (
            <Card key={tool.title} padding="lg" hover>
              <Badge color={tool.badgeColor} size="md">
                {tool.badge}
              </Badge>
              <h3 className="mt-4 text-2xl font-bold font-serif text-primary-900">
                {tool.title}
              </h3>
              <p className="mt-3 text-primary-600 leading-relaxed">
                {tool.description}
              </p>
              <ul className="mt-5 space-y-2">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
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
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild href={tool.href} size="md">
                  {tool.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary-900">
                Why the Polivka Approach Is Different
              </h2>
              <p className="mt-4 text-lg text-primary-600 leading-relaxed">
                Most real estate agents walk through a home and comment on the
                countertops. Marion walks through and identifies the aging water
                heater, the foundation settlement pattern typical of 1960s Lincoln
                construction, and the HVAC system that has two winters left.
              </p>
              <p className="mt-4 text-primary-600 leading-relaxed">
                That is the difference certified home inspector training makes.
                Marion does not just know what to look for &mdash; he understands why it
                matters, what it costs to fix, and how it affects your home&apos;s
                value in today&apos;s Lincoln market. Combined with Shawndel&apos;s
                neighborhood expertise and our team&apos;s market data, the
                Polivka approach delivers actionable intelligence, not
                just observations.
              </p>
              <p className="mt-4 text-primary-600 leading-relaxed">
                Where a traditional CMA tells you what comparable homes sold for,
                and a standard inspection tells you what is broken, our assessment
                bridges the gap &mdash; showing you which improvements actually move the
                needle on your home&apos;s value and which ones are not worth the
                investment. That distinction saves our Lincoln sellers thousands of
                dollars in unnecessary improvements and helps them invest strategically
                in the updates that buyers actually pay premiums for.
              </p>
            </div>
            <div className="rounded-xl border border-surface-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-900">
                Our Approach vs. Standard Methods
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    X
                  </span>
                  <div>
                    <p className="font-medium text-primary-800">Standard CMA</p>
                    <p className="text-sm text-primary-500">
                      Compares sale prices but ignores property condition entirely
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    X
                  </span>
                  <div>
                    <p className="font-medium text-primary-800">Home Inspection</p>
                    <p className="text-sm text-primary-500">
                      Identifies defects but does not connect findings to market value
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
                      into a prioritized action plan for the Lincoln market
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          From first assessment to confident listing &mdash; four clear steps.
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
      </section>

      {/* Categories We Evaluate */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
            Five Categories We Evaluate
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Every dimension of your property&apos;s condition and market potential,
            weighted by impact on your sale outcome.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card key={cat.name} padding="lg" hover>
                <div className="flex items-center justify-between">
                  <Badge color={cat.color} size="md">
                    {cat.name}
                  </Badge>
                  <span className="text-sm font-semibold text-primary-400">
                    {cat.weight}
                  </span>
                </div>
                <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                  {cat.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-primary-700"
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

      {/* Meet the Team Teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold font-serif text-primary-900">
              Your Selling Team
            </h2>
            <p className="mt-4 text-lg text-primary-600 leading-relaxed">
              The Home Design Real Estate Group of HOME Real Estate brings a rare
              combination of skills to the Lincoln market. With {TEAM.combinedExperience} of
              combined experience, we approach every listing from both sides &mdash;
              the physical condition of the property and the data driving buyer decisions.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card padding="none" className="overflow-hidden">
              <div className="relative aspect-[4/5] bg-surface-100">
                <Image
                  src="/images/agents/marion-polivka.jpg"
                  alt={AGENTS.marion.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <div className="p-5">
                <p className="font-semibold text-primary-900">{AGENTS.marion.name}</p>
                <p className="text-sm text-primary-500">{AGENTS.marion.title}</p>
                <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                  {AGENTS.marion.shortBio}
                </p>
                <a
                  href={AGENTS.marion.phoneTel}
                  className="mt-3 block text-sm font-medium text-accent-500 hover:text-accent-600"
                >
                  {AGENTS.marion.phoneFormatted}
                </a>
              </div>
            </Card>
            <Card padding="none" className="overflow-hidden">
              <div className="relative aspect-[4/5] bg-surface-100">
                <Image
                  src="/images/agents/shawndel-polivka.jpg"
                  alt={AGENTS.shawndel.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <div className="p-5">
                <p className="font-semibold text-primary-900">{AGENTS.shawndel.name}</p>
                <p className="text-sm text-primary-500">{AGENTS.shawndel.title}</p>
                <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                  {AGENTS.shawndel.shortBio}
                </p>
                <a
                  href={AGENTS.shawndel.phoneTel}
                  className="mt-3 block text-sm font-medium text-accent-500 hover:text-accent-600"
                >
                  {AGENTS.shawndel.phoneFormatted}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA / Assessment Request Form */}
      <section id="request-assessment" className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold font-serif text-primary-900 text-center">
              Request Your Polivka Property Assessment
            </h2>
            <p className="mt-4 text-center text-lg text-primary-600">
              Tell us about your property and goals. We will reach out within
              one business day to schedule your assessment.
            </p>

            <form
              className="mt-10 space-y-6"
              action="#"
              method="POST"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sell-name"
                    className="block text-sm font-medium text-primary-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="sell-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sell-email"
                    className="block text-sm font-medium text-primary-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="sell-email"
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
                    htmlFor="sell-phone"
                    className="block text-sm font-medium text-primary-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="sell-phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="(402) 555-0123"
                    className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sell-address"
                    className="block text-sm font-medium text-primary-700"
                  >
                    Property Address
                  </label>
                  <input
                    type="text"
                    id="sell-address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="1234 O Street, Lincoln, NE"
                    className="mt-1 block w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-primary-900 placeholder-primary-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sell-message"
                  className="block text-sm font-medium text-primary-700"
                >
                  Tell Us About Your Goals
                </label>
                <textarea
                  id="sell-message"
                  name="message"
                  rows={4}
                  placeholder="Are you looking to sell soon, preparing for a future sale, or just want to understand your home's current value?"
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold font-serif text-primary-900">
          Not Ready for an Assessment Yet?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-600">
          Start with our free Seller Readiness Score. Five minutes, twenty questions,
          and you will know exactly where your home stands.
        </p>
        <div className="mt-8">
          <Button asChild href="/sell-your-home/seller-readiness-score" size="lg">
            Take the Seller Readiness Score
          </Button>
        </div>
      </section>
    </>
  );
}
