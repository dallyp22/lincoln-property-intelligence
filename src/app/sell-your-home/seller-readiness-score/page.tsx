import type { Metadata } from 'next';
import { SITE, TEAM } from '@/lib/constants';
import { WebApplicationJsonLd } from '@/components/seo/WebApplicationJsonLd';
import { FAQPageJsonLd } from '@/components/seo/FAQPageJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { getSellerReadinessFaqs } from '@/lib/data/seller-readiness';
import { SellerReadinessClient } from './_components/SellerReadinessClient';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Seller Readiness Score | How Ready Is Your Home to Sell?',
    description:
      'Take our free Seller Readiness assessment to find out how prepared your Lincoln, NE home is for the market. Get a personalized score, category breakdown, and improvement recommendations.',
    openGraph: {
      title: 'Seller Readiness Score | Lincoln Property Intelligence',
      description:
        "Free 5-minute assessment. Discover your home's market readiness score with category-by-category analysis and actionable improvement recommendations.",
      url: `${SITE.url}/sell-your-home/seller-readiness-score`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE.url}/sell-your-home/seller-readiness-score`,
    },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb items
// ---------------------------------------------------------------------------

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Sell Your Home', href: '/sell-your-home' },
  { label: 'Seller Readiness Score', href: '/sell-your-home/seller-readiness-score' },
];

// ---------------------------------------------------------------------------
// Grade table data
// ---------------------------------------------------------------------------

const gradeRows = [
  {
    grade: 'A+',
    range: '90 - 100',
    label: 'Excellent',
    description:
      'Your home is market-ready. List with confidence knowing your property is positioned to attract strong offers quickly. Buyers will see a well-maintained home that inspires confidence from the moment they walk through the door.',
    color: 'bg-emerald-500',
  },
  {
    grade: 'A',
    range: '80 - 89',
    label: 'Great',
    description:
      'Minor touches needed. Your home is in excellent shape overall — a few small improvements could push your score even higher and maximize your sale price in the Lincoln market.',
    color: 'bg-emerald-400',
  },
  {
    grade: 'B',
    range: '70 - 79',
    label: 'Good',
    description:
      'Strategic improvements recommended. Your home has solid bones but would benefit from targeted upgrades in one or two categories. The right investments could meaningfully increase your sale price and reduce time on market.',
    color: 'bg-amber-400',
  },
  {
    grade: 'C',
    range: '60 - 69',
    label: 'Fair',
    description:
      'Multiple areas need attention. Buyers will likely request concessions or price reductions. A pre-listing improvement plan will help you capture significantly more value at sale.',
    color: 'bg-amber-500',
  },
  {
    grade: 'D',
    range: '50 - 59',
    label: 'Needs Improvement',
    description:
      'Significant preparation needed before listing. Without addressing key issues, you risk extended time on market, multiple price reductions, and deals falling through after inspection.',
    color: 'bg-red-400',
  },
  {
    grade: 'F',
    range: 'Below 50',
    label: 'Critical',
    description:
      'Major issues to address before your home can compete effectively in the Lincoln market. Professional guidance is essential to prioritize repairs and create a realistic improvement timeline and budget.',
    color: 'bg-red-500',
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SellerReadinessScorePage() {
  const faqs = await getSellerReadinessFaqs();

  return (
    <>
      {/* Schema markup */}
      <WebApplicationJsonLd
        name="Seller Readiness Score"
        description="Free interactive tool that evaluates your Lincoln, Nebraska home across five categories — structural condition, cosmetic readiness, market alignment, pricing strategy, and presentation — to generate a personalized Seller Readiness Score with improvement recommendations."
        url={`${SITE.url}/sell-your-home/seller-readiness-score`}
        applicationCategory="RealEstateApplication"
      />
      <FAQPageJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.url, position: 1 },
          { name: 'Sell Your Home', url: `${SITE.url}/sell-your-home`, position: 2 },
          {
            name: 'Seller Readiness Score',
            url: `${SITE.url}/sell-your-home/seller-readiness-score`,
            position: 3,
          },
        ]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* ================================================================== */}
      {/* 1. Hero Section                                                    */}
      {/* ================================================================== */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Free 5-Minute Assessment
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
            How Ready Is Your Home to Sell?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-200">
            Take our free 5-minute assessment and discover your Seller Readiness
            Score — a comprehensive evaluation of your home&apos;s condition,
            market alignment, and presentation readiness. Answer 20 questions
            about your Lincoln, Nebraska home and receive a personalized score,
            category-by-category breakdown, and actionable improvement
            recommendations with estimated costs and return on investment.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#tool"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-600 hover:shadow-md"
            >
              Start Your Assessment
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </a>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-400/20">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <p className="text-sm text-primary-300">
                Powered by certified home inspector training and real-time
                Lincoln market data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. How It Works                                                    */}
      {/* ================================================================== */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold font-serif text-primary-900">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Three simple steps to understand exactly where your home stands in
            the Lincoln, Nebraska market and what you can do to maximize its
            value before listing.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-xl font-bold text-secondary-400">
                1
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary-900">
                Answer 20 Questions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                Quick multiple-choice questions about your home&apos;s structural
                condition, cosmetic appearance, neighborhood, pricing
                expectations, and presentation readiness. Most homeowners
                complete the assessment in under five minutes. No technical
                knowledge is required — just honest answers about what you see
                every day. Our questions are designed by real estate
                professionals with certified home inspector training, so they
                focus on the factors that actually matter to Lincoln buyers and
                their inspectors during the selling process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-xl font-bold text-secondary-400">
                2
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary-900">
                Get Your Score
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                Our scoring engine analyzes your answers across five weighted
                categories to produce a comprehensive Seller Readiness Score on a
                0-100 scale. Each category receives its own score, grade, and
                contextual interpretation specific to the Lincoln, Nebraska
                market. You will see exactly where your home excels and where
                strategic improvements could make the biggest difference. The
                weighted scoring model reflects real buyer priorities — structural
                integrity carries more weight than cosmetics because that is what
                drives inspection results and buyer confidence in Lincoln.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-xl font-bold text-secondary-400">
                3
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary-900">
                See Your Plan
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-600">
                For every category where your home scores below 80, you receive
                personalized improvement recommendations with estimated costs and
                ROI specific to the Lincoln market. Recommendations are
                prioritized by impact — high-priority items are flagged for
                immediate attention, while lower-priority items are noted for
                when time and budget allow. Each recommendation includes
                Lincoln-specific cost ranges so you can make informed decisions
                about where to invest your pre-listing budget for maximum return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. Interactive Tool                                                */}
      {/* ================================================================== */}
      <section className="bg-white" id="tool">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold font-serif text-primary-900">
              Start Your Seller Readiness Score
            </h2>
            <p className="mt-3 text-primary-600">
              Answer each question honestly for the most accurate results. Your
              Seller Readiness Score is calculated using the same five-category
              methodology that drives every Polivka Property Assessment in
              Lincoln, Nebraska.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-surface-200 bg-white px-4 py-8 shadow-lg sm:px-8">
            <SellerReadinessClient faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. What Your Score Means                                           */}
      {/* ================================================================== */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold font-serif text-primary-900">
            What Your Score Means
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
            Your Seller Readiness Score is graded on a scale from 0 to 100. Here
            is how each grade translates to your home&apos;s market readiness in
            Lincoln, Nebraska and what action steps you should consider at each
            level.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-200 bg-primary-900 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                    Grade
                  </th>
                  <th className="hidden px-4 py-3 text-left text-sm font-semibold sm:table-cell sm:px-6">
                    Score Range
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                    What It Means
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {gradeRows.map((row) => (
                  <tr key={row.grade}>
                    <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${row.color}`}
                        >
                          {row.grade}
                        </span>
                        <span className="text-sm font-medium text-primary-600 sm:hidden">
                          {row.range}
                        </span>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-primary-700 sm:table-cell sm:px-6">
                      {row.range}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <p className="text-sm font-medium text-primary-900">
                        {row.label}
                      </p>
                      <p className="mt-1 text-sm text-primary-500">
                        {row.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. Five Categories We Evaluate                                     */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold font-serif text-primary-900">
          Five Categories We Evaluate
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          Each category is weighted to reflect its actual impact on your home
          sale in the Lincoln, Nebraska real estate market. Our weighting model
          is informed by years of inspection experience, hands-on construction
          knowledge, and market data analysis from the {TEAM.name}.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Structural Condition */}
          <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900 text-sm font-bold text-secondary-400">
                30%
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Structural Condition
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              The foundation of your home&apos;s value — literally. We evaluate
              your roof age and condition, foundation integrity, HVAC system
              health, plumbing status, and electrical panel. These are the items
              that home inspectors scrutinize most closely and that sophisticated
              Lincoln buyers evaluate before making an offer. Structural issues
              are the number-one reason deals fall apart after inspection.
              Marion Polivka&apos;s certified home inspector training is
              specifically designed to catch what others miss in this category.
              A strong structural score means fewer surprises and more confident
              buyers, which translates directly to stronger offers and smoother
              closings in the Lincoln market.
            </p>
          </div>

          {/* Cosmetic Readiness */}
          <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900 text-sm font-bold text-secondary-400">
                20%
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Cosmetic Readiness
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              First impressions drive emotional buying decisions. We assess your
              interior paint condition, flooring quality and consistency, kitchen
              presentation, and bathroom appeal. In the Lincoln market, homes
              with updated kitchens and fresh neutral paint consistently sell
              faster and for higher prices than comparable homes with dated
              finishes. Cosmetic improvements often deliver the highest ROI of
              any pre-listing investment — a fresh coat of paint in modern
              neutral tones, for instance, can return 200-400% of its cost at
              sale. A $3,000 paint job can add $10,000 to your sale price.
            </p>
          </div>

          {/* Market Alignment */}
          <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900 text-sm font-bold text-secondary-400">
                25%
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Market Alignment
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              Your home does not exist in a vacuum — external factors set the
              ceiling on what buyers will pay. We evaluate your Lincoln
              neighborhood&apos;s demand tier, school district quality, lot
              characteristics, and recent comparable sales activity. A home in a
              high-demand neighborhood like Wilderness Hills or Fallbrook starts
              with a significant advantage, while homes in emerging areas like
              Near South or North Bottoms may need more aggressive pricing and
              creative marketing strategies to attract the right buyers and
              maximize value.
            </p>
          </div>

          {/* Pricing Strategy */}
          <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900 text-sm font-bold text-secondary-400">
                15%
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Pricing Strategy
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              Pricing is where art meets science in real estate. We assess your
              price expectations relative to comparable sales, your motivation
              level, and your listing timeline. Overpriced homes in Lincoln
              languish on the market an average of three times longer than
              competitively priced homes, and the eventual sale price is often
              lower than if the home had been priced correctly from day one.
              Correctly priced Lincoln homes attract more showings in the
              critical first two weeks, generating competing offers that drive
              the final sale price upward.
            </p>
          </div>

          {/* Presentation */}
          <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-900 text-sm font-bold text-secondary-400">
                10%
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Presentation
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              In today&apos;s market, the sale begins online. We evaluate your
              home&apos;s declutter status, curb appeal, and whether you have
              planned for professional staging and photography. Homes with
              professional photography receive 61% more online views, and staged
              homes in the Lincoln market sell 73% faster on average.
              Decluttering is the single most impactful — and free — thing you
              can do before listing. Presentation is the final polish that turns
              a good home into an irresistible listing that compels buyers to
              schedule a showing.
            </p>
          </div>

          {/* Total Score */}
          <div className="rounded-xl border-2 border-accent-500 bg-accent-50 p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-sm font-bold text-white">
                100
              </span>
              <h3 className="text-lg font-bold text-primary-900">
                Your Total Score
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-600">
              Your Seller Readiness Score combines all five categories into a
              single weighted number on a 0-100 scale. Each category&apos;s
              contribution is proportional to its weight, so a perfect score in
              structural condition (30% weight) counts more than a perfect score
              in presentation (10% weight). This reflects real-world buyer
              priorities and helps you focus your improvement efforts where they
              will make the biggest difference to your bottom line.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. Why the Polivka Property Assessment Is Different                */}
      {/* ================================================================== */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold font-serif text-primary-900">
              Why the Polivka Property Assessment Is Different
            </h2>
            <div className="mt-8 space-y-4 text-primary-600 leading-relaxed">
              <p>
                The Seller Readiness Score you receive from this online tool gives
                you a valuable starting point — but it is based on your
                self-reported answers. The Polivka Property Assessment takes it
                further with an in-person evaluation from Marion Polivka, whose
                certified home inspector training allows him to identify issues
                that most agents and even many homeowners simply miss. Marion does
                not just notice that your roof looks old — he can assess the
                remaining useful life of the shingles, identify early signs of
                decking deterioration, and estimate replacement cost with
                Lincoln-specific pricing.
              </p>
              <p>
                He does not just comment that your foundation has a crack — he can
                distinguish between normal settling typical of 1960s Lincoln
                construction and structural movement that needs immediate
                attention. This level of technical knowledge, combined with
                Shawndel&apos;s deep neighborhood expertise and their combined
                75+ years of real estate experience, means you receive guidance
                that is both technically accurate and strategically sound. Where a
                traditional CMA tells you what comparable homes sold for, and a
                standard inspection tells you what is broken, the Polivka
                Property Assessment bridges the gap — showing you which
                improvements actually move the needle on your home&apos;s value
                and which ones are not worth the investment.
              </p>
              <p>
                Both Marion and Shawndel have personal renovation experience
                across multiple properties. They have swung hammers, managed
                contractors, lived through remodels, and sold the finished
                product. The {TEAM.name} approach is simple: we see what others
                miss, and we translate what we see into a clear, prioritized
                action plan that maximizes your home&apos;s value in the Lincoln
                market. Whether you are listing next week or next year, the
                Polivka Property Assessment gives you the intelligence you need
                to make informed decisions about your most valuable asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. Testimonial                                                     */}
      {/* ================================================================== */}
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
              &ldquo;We used the Seller Readiness Score before meeting with
              Marion and Shawndel. It flagged our aging HVAC system and dated
              kitchen as the two biggest areas to address. Marion confirmed both
              during the in-home assessment and helped us prioritize a kitchen
              refresh that ended up adding $18,000 to our sale price. The online
              tool was a great starting point, and the full assessment turned it
              into a winning strategy.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 text-primary-300">
            &mdash; Lincoln seller, Highlands neighborhood
          </figcaption>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ Section (page-level, separate from tool-level)                 */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold font-serif text-primary-900">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-600">
          Everything you need to know about the Seller Readiness Score tool,
          the Polivka Property Assessment, and how they work together to help
          you sell your Lincoln, Nebraska home for the best possible price.
        </p>

        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faqs} allowMultiple />
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. Final CTA                                                       */}
      {/* ================================================================== */}
      <section className="bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-white sm:text-4xl">
            Ready for a Professional Evaluation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-200">
            Your Seller Readiness Score is an excellent first step. Schedule a
            complimentary in-person Polivka Property Assessment with Marion and
            Shawndel Polivka to get the full picture — a hands-on evaluation
            combining certified home inspector training with up-to-the-day
            Lincoln, Nebraska market intelligence. No obligation. Complimentary
            for Lincoln-area homeowners.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild href="/sell-your-home" size="lg">
              Schedule My Assessment
            </Button>
            <Button
              asChild
              href="#tool"
              size="lg"
              variant="secondary"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Take the Seller Readiness Score
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-300">
            Brought to you by the{' '}
            <strong className="text-white">{TEAM.name}</strong>. Serving
            Lincoln, Nebraska and surrounding communities with
            inspection-informed real estate advisory.
          </p>
        </div>
      </section>
    </>
  );
}
