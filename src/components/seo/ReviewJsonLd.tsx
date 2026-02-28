import { JsonLd } from './JsonLd';
import { TEAM, SITE } from '@/lib/constants';

interface ReviewItem {
  author: string;
  text: string;
  rating: number;
  date: string;
}

interface ReviewJsonLdProps {
  reviews: ReviewItem[];
}

export function ReviewJsonLd({ reviews }: ReviewJsonLdProps) {
  if (!reviews.length) return null;

  const totalRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <JsonLd
      data={{
        '@type': 'LocalBusiness',
        name: TEAM.name,
        url: SITE.url,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: totalRating.toFixed(1),
          reviewCount: reviews.length,
          bestRating: '5',
          worstRating: '1',
        },
        review: reviews.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: '5',
            worstRating: '1',
          },
          reviewBody: r.text,
          datePublished: r.date,
        })),
      }}
    />
  );
}
