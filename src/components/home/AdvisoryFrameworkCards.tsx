import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FrameworkItem {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: React.ReactNode;
}

const frameworkItems: FrameworkItem[] = [
  {
    title: 'Polivka Property Assessment',
    description:
      'Go beyond the standard inspection. Our assessment combines certified home inspector training with market-aware analysis to evaluate condition, value impact, renovation potential, and resale positioning — producing a scored report with prioritized improvements and estimated ROI.',
    href: '/polivka-property-assessment',
    ctaLabel: 'Learn About the Assessment',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
  },
  {
    title: 'Seller Readiness Score',
    description:
      'Know exactly where your home stands before listing. We evaluate curb appeal, interior condition, mechanical systems, and market positioning to produce a readiness score with actionable improvement recommendations ranked by return on investment.',
    href: '/polivka-property-assessment',
    ctaLabel: 'Get Your Readiness Score',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    title: 'Investor Property Evaluation',
    description:
      'Make data-driven investment decisions. Our evaluation analyzes cap rates, rental demand, vacancy trends, deferred maintenance costs, and neighborhood trajectory to help you identify properties with the strongest cash-flow and appreciation potential in the Lincoln market.',
    href: '/polivka-property-assessment',
    ctaLabel: 'Evaluate an Investment',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
  },
];

export function AdvisoryFrameworkCards() {
  return (
    <section
      className="bg-surface-50 py-16 sm:py-20"
      aria-labelledby="advisory-framework-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-500">
            Our Approach
          </p>
          <h2
            id="advisory-framework-heading"
            className="mt-2 font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            The Polivka Advisory Framework
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-600">
            Three proprietary tools that combine inspection expertise, market
            data, and renovation intelligence to give you an unfair advantage
            in Lincoln real estate.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {frameworkItems.map((item) => (
            <Card
              key={item.title}
              hover
              as="article"
              className="flex flex-col"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-900 text-secondary-400">
                {item.icon}
              </div>

              <CardHeader className="mt-5 mb-0">
                <CardTitle as="h3" className="text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="flex-1 text-sm leading-relaxed text-primary-600">
                  {item.description}
                </p>
                <div className="mt-6">
                  <Button asChild href={item.href} size="sm" variant="ghost">
                    {item.ctaLabel}
                    <svg
                      className="ml-1.5 h-4 w-4"
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
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
