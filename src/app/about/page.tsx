import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAgentData } from '@/lib/data/agents';
import { SITE, TEAM } from '@/lib/constants';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About the Polivkas',
    description:
      'Meet Marion and Shawndel Polivka — the husband-and-wife team behind the Home Design Real Estate Group of HOME Real Estate. 75+ years combined experience in Lincoln, Nebraska.',
    openGraph: {
      title: 'About the Polivkas | Lincoln Property Intelligence',
      description:
        'Meet Marion and Shawndel Polivka — inspection-informed real estate advisory for Lincoln, Nebraska.',
      url: `${SITE.url}/about`,
    },
  };
}

export default async function AboutPage() {
  const { team, agents } = await getAgentData();

  return (
    <>
      {/* JSON-LD for both agents */}
      {agents.map((agent) => (
        <PersonJsonLd
          key={agent.slug}
          name={agent.name}
          jobTitle={agent.title}
          phone={agent.phone}
          url={agent.website}
          description={agent.shortBio}
          image={`${SITE.url}${agent.photo}`}
          sameAs={[agent.website]}
          knowsAbout={agent.specialties}
        />
      ))}

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            {team.name}
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl lg:text-6xl">
            Meet Your Lincoln Real Estate Advisors
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
            A {team.structure.toLowerCase()} with {team.combinedExperience} of
            combined real estate experience, inspection-informed insight, and
            deep roots in Lincoln, Nebraska.
          </p>
        </div>
      </section>

      {/* Team Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold font-serif text-primary-900">
            {team.name}
          </h2>
          <p className="mt-4 text-lg text-primary-600 leading-relaxed">
            We are a {team.structure.toLowerCase()} bringing a rare combination
            of certified home inspector training, hands-on construction
            experience, and deep local knowledge to every transaction. With{' '}
            {team.combinedExperience} of combined experience in Lincoln and
            Eastern Nebraska, we do not just sell homes — we provide
            inspection-informed real estate advisory that protects your
            investment.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {team.serviceAreas.map((area) => (
              <Badge key={area} size="md">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Profile Cards */}
      <section className="bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {agents.map((agent) => (
                <Card key={agent.slug} as="article" padding="none" className="overflow-hidden">
                  <div className="flex flex-col">
                    {/* Agent headshot */}
                    <div className="relative aspect-[3/4] bg-surface-100">
                      <Image
                        src={agent.photo}
                        alt={`${agent.name} — ${agent.title}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <CardContent className="p-6 lg:p-8">
                      {/* Name & Title */}
                      <h3 className="text-2xl font-bold font-serif text-primary-900">
                        {agent.name}
                      </h3>
                      <p className="mt-1 text-sm text-primary-500">{agent.title}</p>

                      {/* Phone */}
                      <a
                        href={agent.phoneTel}
                        className="mt-3 inline-flex items-center gap-2 text-accent-500 font-medium hover:text-accent-600 transition-colors"
                      >
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
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                          />
                        </svg>
                        {agent.phoneFormatted}
                      </a>

                      {/* Full Bio */}
                      <p className="mt-5 text-primary-600 leading-relaxed">
                        {agent.fullBio}
                      </p>

                      {/* Credentials */}
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-400">
                          Credentials
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {agent.credentials.map((cred) => (
                            <li
                              key={cred}
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
                              {cred}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specialties */}
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-400">
                          Specialties
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {agent.specialties.map((specialty) => (
                            <Badge key={specialty} color="#0d9488">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* HOME Real Estate Profile Link */}
                      <div className="mt-8">
                        <Button
                          asChild
                          href={agent.website}
                          variant="secondary"
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View HOME Real Estate Profile
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Framework Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-serif text-primary-900">
          The Polivka Advisory Framework
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-primary-600 leading-relaxed">
          Our advisory approach goes beyond standard real estate practice.
          Drawing on Marion&apos;s certified home inspector training and
          Shawndel&apos;s deep local expertise, we have developed three
          structured frameworks that bring data, inspection insight, and market
          intelligence to every client engagement.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Property Assessment */}
          <Card hover padding="lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
              <svg
                className="h-6 w-6 text-accent-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold font-serif text-primary-900">
              Property Assessment
            </h3>
            <p className="mt-3 text-primary-600 leading-relaxed">
              A comprehensive evaluation that combines structural analysis,
              cosmetic review, and market positioning into a single scored
              report. Marion&apos;s inspector training identifies issues most
              agents miss, while our market data ensures every recommendation
              ties directly to value.
            </p>
            <Link
              href="/sell-your-home"
              className="mt-4 inline-flex items-center text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors"
            >
              Learn more
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </Card>

          {/* Seller Readiness Score */}
          <Card hover padding="lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-400/10">
              <svg
                className="h-6 w-6 text-secondary-400"
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
            </div>
            <h3 className="mt-4 text-xl font-bold font-serif text-primary-900">
              Seller Readiness Score
            </h3>
            <p className="mt-3 text-primary-600 leading-relaxed">
              Before listing, we evaluate your property across five dimensions
              — condition, curb appeal, market timing, pricing alignment, and
              competitive positioning — producing a readiness score that
              guides our pre-listing strategy and helps you invest preparation
              dollars where they deliver the highest return.
            </p>
          </Card>

          {/* Investor Evaluation */}
          <Card hover padding="lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
              <svg
                className="h-6 w-6 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold font-serif text-primary-900">
              Investor Evaluation
            </h3>
            <p className="mt-3 text-primary-600 leading-relaxed">
              For rental and flip opportunities, we analyze cap rates, rental
              demand, renovation costs, and neighborhood trajectory using
              actual Lincoln market data. Marion&apos;s construction background
              provides accurate rehab cost estimates, so your numbers reflect
              reality — not guesswork.
            </p>
          </Card>
        </div>
      </section>

      {/* Positioning Tagline */}
      <section className="bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-white sm:text-4xl lg:text-5xl">
            &ldquo;We See What Others Miss&rdquo;
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-200 leading-relaxed">
            Most agents walk through a home and see square footage and finishes.
            Marion sees the hairline crack in the foundation, the aging HVAC
            system, and the drainage issue that will cost $15,000 if
            unaddressed. Shawndel sees the neighborhood trajectory, the school
            boundary advantage, and the community story that makes a house a
            home. Together, we deliver inspection-informed, data-driven advisory
            that protects every dollar of your investment.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold font-serif text-primary-900">
          Ready to Work With Us?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-600">
          Whether you are buying, selling, or investing in Lincoln real estate,
          start with a conversation. We will listen first, then build a strategy
          tailored to your goals.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild href="/sell-your-home" size="lg">
            Schedule a Consultation
          </Button>
          <Button asChild href="/ask-a-realtor" variant="secondary" size="lg">
            Read Our Expert Advice
          </Button>
        </div>
      </section>
    </>
  );
}
