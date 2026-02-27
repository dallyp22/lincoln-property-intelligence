import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/data/articles';
import { SITE } from '@/lib/constants';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Ask a Realtor',
  description:
    'Expert real estate advice for Lincoln, Nebraska — home inspections, neighborhoods, buying, selling, and investment insights from the Polivka team.',
  openGraph: {
    title: 'Ask a Realtor | Lincoln Property Intelligence',
    description:
      'Expert real estate Q&A for Lincoln, Nebraska from the Polivka team.',
    url: `${SITE.url}/ask-a-realtor`,
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function AskARealtorPage() {
  const articles = await getAllArticles();

  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-400">
            Expert Advice
          </p>
          <h1 className="mt-3 text-4xl font-bold font-serif sm:text-5xl">
            Ask a Realtor
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-200 leading-relaxed">
            Real answers to real questions about buying, selling, and investing
            in Lincoln, Nebraska real estate — written by Marion and Shawndel
            Polivka.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="text-center text-lg text-primary-500">
            Articles are coming soon. Check back shortly.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const { frontmatter } = article;
              const authorInitials = frontmatter.author
                .split(' ')
                .map((n) => n[0])
                .join('');

              return (
                <Link
                  key={frontmatter.slug}
                  href={`/ask-a-realtor/${frontmatter.slug}`}
                  className="group"
                >
                  <Card
                    as="article"
                    hover
                    padding="none"
                    className="flex h-full flex-col overflow-hidden"
                  >
                    {/* Image placeholder */}
                    <div className="flex h-44 items-center justify-center bg-primary-800 transition-colors group-hover:bg-primary-700">
                      <span className="text-3xl font-bold font-serif text-secondary-400/50">
                        Q&amp;A
                      </span>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-5">
                      {/* Category & Reading Time */}
                      <div className="flex items-center gap-2">
                        <Badge>{frontmatter.category}</Badge>
                        <span className="text-xs text-primary-400">
                          {frontmatter.readingTime} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mt-3 text-lg font-bold font-serif text-primary-900 leading-snug group-hover:text-accent-500 transition-colors">
                        {frontmatter.title}
                      </h2>

                      {/* Description */}
                      <p className="mt-2 flex-1 text-sm text-primary-600 leading-relaxed line-clamp-3">
                        {frontmatter.description}
                      </p>

                      {/* Author & Date */}
                      <div className="mt-4 flex items-center gap-3 border-t border-surface-100 pt-4">
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
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
                            sizes="32px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-primary-800">
                            {frontmatter.author}
                          </p>
                          <p className="text-xs text-primary-400">
                            {formatDate(frontmatter.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
