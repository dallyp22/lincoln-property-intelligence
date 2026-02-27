import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { TEAM, AGENTS } from '@/lib/constants';

export function AboutSection() {
  const credentials = [
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17l-5.387 3.068A1.5 1.5 0 014.5 16.92V4.58a1.5 1.5 0 012.533-1.317l5.387 3.068a1.5 1.5 0 010 2.634l5.387 3.068A1.5 1.5 0 0119.5 16.92V4.58a1.5 1.5 0 00-2.533-1.317L11.42 15.17z"
          />
        </svg>
      ),
      title: 'Inspection-Informed Advisory',
      description:
        "Marion's certified home inspector training means he evaluates structural condition, mechanical systems, and renovation potential during every showing — identifying issues most agents miss.",
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: '75+ Years Combined Experience',
      description:
        'The Home Design Real Estate Group of HOME Real Estate brings over seven decades of combined real estate knowledge to every transaction.',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      title: "Lincoln Roots, Lincoln Knowledge",
      description:
        "Shawndel was born and raised in Lincoln, NE. Her deep neighborhood knowledge and community connections give our clients an insider's perspective on every area of the city.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image / Placeholder Column */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/team/marion-shawndel-polivka.jpg"
                alt={`${AGENTS.marion.name} and ${AGENTS.shawndel.name} — ${TEAM.name}`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative gold corner accent */}
            <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-br-2xl border-b-4 border-r-4 border-secondary-400 opacity-60" />
          </div>

          {/* Content Column */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary-500">
              About the Team
            </p>
            <h2
              id="about-heading"
              className="mt-2 font-serif text-3xl font-bold text-primary-900 sm:text-4xl"
            >
              {TEAM.positioning}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-600">
              Marion and Shawndel Polivka are a husband-and-wife real estate
              team with the{' '}
              <span className="font-medium text-primary-800">
                {TEAM.name}
              </span>
              . Their unique combination of certified inspector training,
              hands-on renovation experience, and deep Lincoln roots means
              they see things in properties that other agents simply cannot.
            </p>

            {/* Credentials */}
            <div className="mt-8 space-y-6">
              {credentials.map((cred) => (
                <div key={cred.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
                    {cred.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary-900">
                      {cred.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary-600">
                      {cred.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button asChild href="/about" variant="secondary" size="md">
                Meet the Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
