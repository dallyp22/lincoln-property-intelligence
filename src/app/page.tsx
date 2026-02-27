import { getMarketStats } from '@/lib/data/market';
import { getFaqs } from '@/lib/data/faq';
import { getTestimonials } from '@/lib/data/testimonials';
import { getAllNeighborhoods } from '@/lib/data/neighborhoods';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import { FAQPageJsonLd } from '@/components/seo/FAQPageJsonLd';
import { Hero } from '@/components/home/Hero';
import { MarketSnapshotCards } from '@/components/home/MarketSnapshotCards';
import { NeighborhoodExplorerPreviewWrapper } from '@/components/home/NeighborhoodExplorerPreviewWrapper';
import { AdvisoryFrameworkCards } from '@/components/home/AdvisoryFrameworkCards';
import { RecentReports } from '@/components/home/RecentReports';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { AboutSection } from '@/components/home/AboutSection';
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

      {/* 1. Hero with animated stat counters */}
      <Hero heroStats={marketStats.heroStats} />

      {/* 2. Market Snapshot Cards */}
      <MarketSnapshotCards
        cards={marketStats.snapshotCards}
        lastUpdated={marketStats.lastUpdated}
      />

      {/* 3. Neighborhood Explorer Preview */}
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
