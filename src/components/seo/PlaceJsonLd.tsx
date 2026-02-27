import { JsonLd } from './JsonLd';

interface PlaceJsonLdProps {
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  containedInPlace?: string;
  image?: string;
  url?: string;
}

export function PlaceJsonLd({
  name,
  description,
  latitude,
  longitude,
  address,
  containedInPlace,
  image,
  url,
}: PlaceJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': 'Place',
        name,
        ...(description && { description }),
        ...(url && { url }),
        ...(image && { image }),
        ...(latitude !== undefined &&
          longitude !== undefined && {
            geo: {
              '@type': 'GeoCoordinates',
              latitude,
              longitude,
            },
          }),
        ...(address && {
          address: {
            '@type': 'PostalAddress',
            ...(address.streetAddress && { streetAddress: address.streetAddress }),
            addressLocality: address.addressLocality ?? 'Lincoln',
            addressRegion: address.addressRegion ?? 'NE',
            ...(address.postalCode && { postalCode: address.postalCode }),
            addressCountry: address.addressCountry ?? 'US',
          },
        }),
        ...(containedInPlace && {
          containedInPlace: {
            '@type': 'City',
            name: containedInPlace,
          },
        }),
      }}
    />
  );
}
