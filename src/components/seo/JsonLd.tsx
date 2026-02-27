/**
 * Base JSON-LD renderer component.
 * Accepts any structured data object and renders it as a script tag
 * with the @context automatically prepended.
 */

interface JsonLdProps {
  /** The structured data object (without @context) */
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
