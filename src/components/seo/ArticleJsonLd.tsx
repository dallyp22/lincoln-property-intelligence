import { JsonLd } from './JsonLd';
import { SITE, TEAM } from '@/lib/constants';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  /** 'Article' | 'BlogPosting' | 'NewsArticle' */
  type?: 'Article' | 'BlogPosting' | 'NewsArticle';
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  image,
  type = 'Article',
}: ArticleJsonLdProps) {
  return (
    <JsonLd
      data={{
        '@type': type,
        headline: title,
        description,
        url: url.startsWith('http') ? url : `${SITE.url}${url}`,
        datePublished,
        ...(dateModified && { dateModified }),
        author: {
          '@type': 'Organization',
          name: authorName ?? TEAM.name,
          url: SITE.url,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
        },
        ...(image && {
          image: {
            '@type': 'ImageObject',
            url: image.startsWith('http') ? image : `${SITE.url}${image}`,
          },
        }),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url.startsWith('http') ? url : `${SITE.url}${url}`,
        },
      }}
    />
  );
}
