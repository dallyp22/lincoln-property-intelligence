import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/data/articles';
import { SITE, AGENTS } from '@/lib/constants';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { FAQPageJsonLd } from '@/components/seo/FAQPageJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const { frontmatter } = article;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: `${frontmatter.title} | Lincoln Property Intelligence`,
      description: frontmatter.description,
      url: `${SITE.url}/ask-a-realtor/${frontmatter.slug}`,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      images: frontmatter.featuredImage
        ? [`${SITE.url}${frontmatter.featuredImage}`]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${frontmatter.title} | Lincoln Property Intelligence`,
      description: frontmatter.description,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;

  return (
    <>
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={`/ask-a-realtor/${frontmatter.slug}`}
        datePublished={frontmatter.publishedAt}
        dateModified={frontmatter.updatedAt}
        authorName={frontmatter.author}
        image={frontmatter.featuredImage}
        type="BlogPosting"
      />

      {frontmatter.faqSchema && frontmatter.faqSchema.length > 0 && (
        <FAQPageJsonLd faqs={frontmatter.faqSchema} />
      )}

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE.url, position: 1 },
          { name: 'Ask a Realtor', url: `${SITE.url}/ask-a-realtor`, position: 2 },
          { name: frontmatter.title, url: `${SITE.url}/ask-a-realtor/${frontmatter.slug}`, position: 3 },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ask a Realtor', href: '/ask-a-realtor' },
          { label: frontmatter.title, href: `/ask-a-realtor/${frontmatter.slug}` },
        ]}
      />

      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-primary-500">
              <Badge>{frontmatter.category}</Badge>
              <span>{frontmatter.readingTime} min read</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold font-serif text-primary-900 sm:text-4xl lg:text-5xl leading-tight">
              {frontmatter.title}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              {/* Author photo */}
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={
                    frontmatter.author.includes('Marion')
                      ? '/images/agents/marion-polivka.jpg'
                      : frontmatter.author.includes('Shawndel')
                        ? '/images/agents/shawndel-polivka.jpg'
                        : '/images/agents/marion-polivka.jpg'
                  }
                  alt={frontmatter.author}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-medium text-primary-900">
                  {frontmatter.author}
                </p>
                <p className="text-sm text-primary-500">
                  Published {formatDate(frontmatter.publishedAt)}
                  {frontmatter.updatedAt !== frontmatter.publishedAt && (
                    <> &middot; Updated {formatDate(frontmatter.updatedAt)}</>
                  )}
                </p>
              </div>
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary-900 prose-p:text-primary-700 prose-p:leading-relaxed prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-primary-800 prose-li:text-primary-700 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-ul:my-4 prose-ol:my-4 prose-blockquote:border-l-accent-500 prose-blockquote:text-primary-600 prose-blockquote:font-serif">
            <MDXRemote source={content} />
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-12 border-t border-surface-200 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-400">
                Topics
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Neighborhoods */}
          {frontmatter.neighborhoods && frontmatter.neighborhoods.length > 0 && (
            <div className="mt-8 rounded-xl border border-surface-200 bg-surface-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-400">
                Related Neighborhoods
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {frontmatter.neighborhoods.map((neighborhood) => (
                  <Link
                    key={neighborhood}
                    href={`/neighborhoods/${neighborhood}`}
                    className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1 text-sm font-medium text-primary-700 transition-colors hover:border-accent-500 hover:text-accent-500"
                  >
                    {neighborhood
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-primary-900 p-8 text-center">
            <h3 className="text-xl font-bold font-serif text-white">
              Have a Real Estate Question?
            </h3>
            <p className="mt-2 text-primary-200">
              The Polivka team brings inspection-informed expertise to every
              conversation. Reach out — we are happy to help.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild href="/polivka-property-assessment" size="md">
                Schedule a Consultation
              </Button>
              <Button asChild href="/ask-a-realtor" variant="ghost" size="md" className="text-white hover:bg-primary-800 hover:text-white">
                Browse More Articles
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
