import type { Metadata } from 'next';
import { getMarketStats } from '@/lib/data/market';
import { getFaqs } from '@/lib/data/faq';
import { getTestimonials } from '@/lib/data/testimonials';
import { getAllNeighborhoods } from '@/lib/data/neighborhoods';
import { SITE } from '@/lib/constants';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import { FAQPageJsonLd } from '@/components/seo/FAQPageJsonLd';
import { ReviewJsonLd } from '@/components/seo/ReviewJsonLd';

export const metadata: Metadata = {
  title: 'Lincoln Property Intelligence | Marion & Shawndel Polivka | HOME Real Estate',
  description:
    'Data-driven Lincoln, NE real estate advisory from Marion & Shawndel Polivka. Market intelligence on homes for sale in Lincoln NE, neighborhood analytics, the Polivka Property Assessment, and Seller Readiness Score. Lincoln NE housing market 2026 data from the Home Design Real Estate Group of HOME Real Estate.',
  openGraph: {
    title: 'Lincoln Property Intelligence | Marion & Shawndel Polivka',
    description:
      'Data-driven real estate advisory, market intelligence, and inspection-informed analysis for Lincoln, Nebraska from the Polivka team.',
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lincoln Property Intelligence | Marion & Shawndel Polivka',
    description:
      'Data-driven real estate advisory and market intelligence for Lincoln, Nebraska.',
  },
};
import { Hero } from '@/components/home/Hero';
import { MarketSnapshotCards } from '@/components/home/MarketSnapshotCards';
import { NeighborhoodExplorerPreviewWrapper } from '@/components/home/NeighborhoodExplorerPreviewWrapper';
import { AdvisoryFrameworkCards } from '@/components/home/AdvisoryFrameworkCards';
import { RecentReports } from '@/components/home/RecentReports';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { AboutSection } from '@/components/home/AboutSection';
import { LincolnVsNational } from '@/components/home/LincolnVsNational';
import { FAQBlock } from '@/components/home/FAQBlock';

export default async function HomePage() {
  const [marketStats, faqs, testimonials, neighborhoods] =
    await Promise.all([
      getMarketStats(),
      getFaqs(),
      getTestimonials(),
      getAllNeighborhoods(),
    ]);

  return (
    <>
      {/* Structured Data */}
      <LocalBusinessJsonLd />
      <FAQPageJsonLd faqs={faqs} />
      <ReviewJsonLd reviews={testimonials} />

      {/* 1. Hero with animated stat counters */}
      <Hero heroStats={marketStats.heroStats} />

      {/* 2. Market Snapshot Cards */}
      <MarketSnapshotCards
        cards={marketStats.snapshotCards}
        lastUpdated={marketStats.lastUpdated}
      />

      {/* 3. Lincoln vs National Comparison */}
      <LincolnVsNational />

      {/* 4. Neighborhood Explorer Preview */}
      <NeighborhoodExplorerPreviewWrapper neighborhoods={neighborhoods} />

      {/* 4. Advisory Framework */}
      <AdvisoryFrameworkCards />

      {/* 5. Recent Reports */}
      <RecentReports />

      {/* 6. Testimonial Carousel */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* 7. About Section */}
      <AboutSection />

      {/* 8. FAQ Block */}
      <FAQBlock faqs={faqs} />
    </>
  );
}
