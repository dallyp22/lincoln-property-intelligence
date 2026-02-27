import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item) => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
