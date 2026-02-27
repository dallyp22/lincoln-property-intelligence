import { JsonLd } from './JsonLd';
import { SITE } from '@/lib/constants';

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE.url}/neighborhoods?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}
