import { JsonLd } from './JsonLd';
import { TEAM, SITE } from '@/lib/constants';

interface RealEstateAgentJsonLdProps {
  name: string;
  phone: string;
  url: string;
  description?: string;
  image?: string;
  areaServed?: string[];
}

export function RealEstateAgentJsonLd({
  name,
  phone,
  url,
  description,
  image,
  areaServed,
}: RealEstateAgentJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': 'RealEstateAgent',
        name,
        telephone: phone,
        url,
        ...(description && { description }),
        ...(image && { image }),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lincoln',
          addressRegion: 'NE',
          addressCountry: 'US',
        },
        areaServed: (areaServed ?? TEAM.serviceAreas).map((area) => ({
          '@type': 'City',
          name: area,
        })),
        parentOrganization: {
          '@type': 'RealEstateAgent',
          name: TEAM.brokerage,
        },
        memberOf: {
          '@type': 'Organization',
          name: TEAM.name,
          url: SITE.url,
        },
      }}
    />
  );
}
