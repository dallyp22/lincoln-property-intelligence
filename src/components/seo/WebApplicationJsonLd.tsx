import { JsonLd } from './JsonLd';

interface WebApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}

export function WebApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory,
}: WebApplicationJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': 'WebApplication',
        name,
        description,
        url,
        applicationCategory,
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'RealEstateAgent',
          name: 'Home Design Real Estate Group of HOME Real Estate',
          member: [
            {
              '@type': 'Person',
              name: 'Marion Polivka',
              jobTitle: 'Real Estate Agent',
              telephone: '+14023093134',
            },
            {
              '@type': 'Person',
              name: 'Shawndel Polivka',
              jobTitle: 'Real Estate Agent',
              telephone: '+14024291523',
            },
          ],
        },
        areaServed: {
          '@type': 'City',
          name: 'Lincoln',
          containedInPlace: {
            '@type': 'State',
            name: 'Nebraska',
          },
        },
      }}
    />
  );
}
