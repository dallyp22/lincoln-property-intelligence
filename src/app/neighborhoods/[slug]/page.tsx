import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNeighborhoods, getNeighborhoodBySlug } from '@/lib/data/neighborhoods';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PlaceJsonLd } from '@/components/seo/PlaceJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Button } from '@/components/ui/Button';
import { NeighborhoodHeader } from '@/components/neighborhoods/NeighborhoodHeader';
import { MarketStatsGrid } from '@/components/neighborhoods/MarketStatsGrid';
import { HousingStockSection } from '@/components/neighborhoods/HousingStockSection';
import { SchoolInfo } from '@/components/neighborhoods/SchoolInfo';
import { CommuteInfo } from '@/components/neighborhoods/CommuteInfo';
import { SITE, AGENTS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const neighborhoods = await getAllNeighborhoods();
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return { title: 'Neighborhood Not Found' };
  }

  return {
    title: `${neighborhood.name} Neighborhood | Lincoln, NE`,
    description: `${neighborhood.tagline}. Market data, housing stock, school info, and inspection insights for ${neighborhood.name} in Lincoln, Nebraska.`,
    openGraph: {
      title: `${neighborhood.name} | Lincoln Property Intelligence`,
      description: neighborhood.tagline,
      url: `${SITE.url}/neighborhoods/${neighborhood.slug}`,
    },
  };
}

export default async function NeighborhoodProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  return (
    <>
      {/* Structured data */}
      <PlaceJsonLd
        name={`${neighborhood.name}, Lincoln, NE`}
        description={neighborhood.tagline}
        latitude={neighborhood.mapCenter.lat}
        longitude={neighborhood.mapCenter.lng}
        address={{
          addressLocality: 'Lincoln',
          addressRegion: 'NE',
          addressCountry: 'US',
        }}
        containedInPlace="Lincoln, Nebraska"
        url={`${SITE.url}/neighborhoods/${neighborhood.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.url, position: 1 },
          { name: 'Neighborhoods', url: `${SITE.url}/neighborhoods`, position: 2 },
          {
            name: neighborhood.name,
            url: `${SITE.url}/neighborhoods/${neighborhood.slug}`,
            position: 3,
          },
        ]}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Neighborhoods', href: '/neighborhoods' },
          { label: neighborhood.name, href: `/neighborhoods/${neighborhood.slug}` },
        ]}
      />

      {/* Hero header with key stats */}
      <NeighborhoodHeader neighborhood={neighborhood} />

      {/* Neighborhood description */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold font-serif text-primary-900 mb-4">
            About {neighborhood.name}
          </h2>
          <p className="text-base text-primary-600 leading-relaxed">
            {neighborhood.description}
          </p>
        </div>
      </section>

      {/* Market Intelligence Grid */}
      <div className="border-t border-surface-100">
        <MarketStatsGrid market={neighborhood.market} />
      </div>

      {/* Housing Stock & Inspection Notes */}
      <div className="border-t border-surface-100 bg-surface-50">
        <HousingStockSection
          housingStock={neighborhood.housingStock}
          inspectionNotes={neighborhood.inspectionNotes}
        />
      </div>

      {/* Schools */}
      <div className="border-t border-surface-100">
        <SchoolInfo schools={neighborhood.schools} />
      </div>

      {/* Commute Times */}
      <div className="border-t border-surface-100 bg-surface-50">
        <CommuteInfo commute={neighborhood.commute} />
      </div>

      {/* CTA Section */}
      <section className="border-t border-surface-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary-500 p-8 text-center sm:p-12 lg:p-16">
            <h2 className="text-2xl font-bold font-serif text-white sm:text-3xl">
              Schedule a Tour of {neighborhood.name}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-primary-200">
              Get inspection-informed insights on homes in {neighborhood.name}.{' '}
              {AGENTS.marion.name} and {AGENTS.shawndel.name} know every street in this neighborhood.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                href={`/contact?neighborhood=${neighborhood.slug}`}
                variant="primary"
                size="lg"
                className="bg-secondary-400 text-primary-900 hover:bg-secondary-500 w-full sm:w-auto"
              >
                Schedule a Tour
              </Button>
              <Button
                asChild
                href="/neighborhoods"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-primary-400 hover:text-white w-full sm:w-auto"
              >
                View on Map
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-300">
              Or call us directly:{' '}
              <a
                href={AGENTS.marion.phoneTel}
                className="font-medium text-white underline decoration-secondary-400 underline-offset-2 hover:text-secondary-400"
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
