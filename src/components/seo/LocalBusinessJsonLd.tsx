import { JsonLd } from './JsonLd';
import { SITE, TEAM, AGENTS } from '@/lib/constants';

interface LocalBusinessJsonLdProps {
  /** Override the business name */
  name?: string;
}

export function LocalBusinessJsonLd({ name }: LocalBusinessJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': ['LocalBusiness', 'RealEstateAgent'],
        name: name ?? TEAM.name,
        description: SITE.description,
        url: SITE.url,
        telephone: AGENTS.marion.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lincoln',
          addressRegion: 'NE',
          addressCountry: 'US',
        },
        areaServed: TEAM.serviceAreas.map((area) => ({
          '@type': 'City',
          name: area,
        })),
        employee: [
          {
            '@type': 'Person',
            name: AGENTS.marion.name,
            jobTitle: AGENTS.marion.title,
            telephone: AGENTS.marion.phone,
            url: AGENTS.marion.website,
          },
          {
            '@type': 'Person',
            name: AGENTS.shawndel.name,
            jobTitle: AGENTS.shawndel.title,
            telephone: AGENTS.shawndel.phone,
            url: AGENTS.shawndel.website,
          },
        ],
        parentOrganization: {
          '@type': 'RealEstateAgent',
          name: TEAM.brokerage,
        },
        slogan: TEAM.positioning,
      }}
    />
  );
}
