import { JsonLd } from './JsonLd';
import { TEAM, SITE } from '@/lib/constants';

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  phone: string;
  url: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  phone,
  url,
  description,
  image,
  sameAs,
  knowsAbout,
}: PersonJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': 'Person',
        name,
        jobTitle,
        telephone: phone,
        url,
        ...(description && { description }),
        ...(image && { image }),
        ...(sameAs && { sameAs }),
        ...(knowsAbout && { knowsAbout }),
        worksFor: {
          '@type': 'Organization',
          name: TEAM.name,
          url: SITE.url,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lincoln',
          addressRegion: 'NE',
          addressCountry: 'US',
        },
      }}
    />
  );
}
