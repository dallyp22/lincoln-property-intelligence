import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllNeighborhoods, getNeighborhoodGeoJson } from '@/lib/data/neighborhoods';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PlaceJsonLd } from '@/components/seo/PlaceJsonLd';
import { NeighborhoodExplorerWrapper } from '@/components/map/NeighborhoodExplorerWrapper';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { SITE, LINCOLN_MAP_CENTER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Lincoln Neighborhood Explorer',
  description:
    'Explore Lincoln, Nebraska neighborhoods with interactive market data, median prices, school info, and inspection insights. Find the right neighborhood for you.',
  openGraph: {
    title: 'Lincoln Neighborhood Explorer | Lincoln Property Intelligence',
    description:
      'Interactive map of Lincoln, NE neighborhoods with real-time market data, school ratings, and expert inspection insights.',
    url: `${SITE.url}/neighborhoods`,
  },
};

export default async function NeighborhoodsPage() {
  const [neighborhoods, geojson] = await Promise.all([
    getAllNeighborhoods(),
    getNeighborhoodGeoJson(),
  ]);

  return (
    <>
      <PlaceJsonLd
        name="Lincoln, Nebraska"
        description="Capital city of Nebraska with diverse neighborhoods offering a range of housing styles, price points, and community character."
        latitude={LINCOLN_MAP_CENTER.lat}
        longitude={LINCOLN_MAP_CENTER.lng}
        address={{
          addressLocality: 'Lincoln',
          addressRegion: 'NE',
          addressCountry: 'US',
        }}
      />

      <Breadcrumbs />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-primary-900 sm:text-4xl lg:text-5xl">
            Lincoln Neighborhood Explorer
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-500">
            Explore market data, housing stock, and inspection insights across
            Lincoln&apos;s most sought-after neighborhoods. Click any neighborhood
            on the map to see details.
          </p>
        </div>

        {/* Interactive map */}
        <NeighborhoodExplorerWrapper
          neighborhoods={neighborhoods}
          geojson={geojson}
        />

        {/* Neighborhood directory grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold font-serif text-primary-900 mb-6">
            All Neighborhoods
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-500 transition-colors">
                    {n.name}
                  </h3>
                  <Badge segment={n.segment} size="sm">
                    {n.segment}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-primary-500 line-clamp-2">
                  {n.tagline}
                </p>
                <div className="mt-4 flex items-center gap-4 border-t border-surface-100 pt-3">
                  <div>
                    <p className="text-lg font-bold text-primary-900">
                      {formatCurrency(n.market.medianPrice)}
                    </p>
                    <p className="text-xs text-primary-400">Median Price</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary-900">
                      {n.market.averageDom}
                    </p>
                    <p className="text-xs text-primary-400">Avg DOM</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary-900">
                      {n.market.activeInventory}
                    </p>
                    <p className="text-xs text-primary-400">Active</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
