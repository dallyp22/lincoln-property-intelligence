'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Custom breadcrumb items. If omitted, auto-generated from pathname. */
  items?: BreadcrumbItem[];
  /** Additional className for the container */
  className?: string;
}

/**
 * Format a URL segment into a human-readable label.
 * e.g. "market-intelligence" -> "Market Intelligence"
 */
function segmentToLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Auto-generate breadcrumb items from a pathname.
 * e.g. "/neighborhoods/near-south" -> [{ label: "Home", href: "/" }, { label: "Neighborhoods", href: "/neighborhoods" }, { label: "Near South", href: "/neighborhoods/near-south" }]
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  if (pathname === '/') return items;

  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      label: segmentToLabel(segment),
      href: currentPath,
    });
  }

  return items;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const breadcrumbs = items ?? generateBreadcrumbs(pathname);

  // Don't render breadcrumbs on the homepage
  if (pathname === '/' && !items) return null;

  const jsonLdItems = breadcrumbs.map((item, index) => ({
    name: item.label,
    url: item.href.startsWith('http') ? item.href : `${SITE.url}${item.href}`,
    position: index + 1,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <nav
        aria-label="Breadcrumb"
        className={cn('mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8', className)}
      >
        <ol className="flex flex-wrap items-center gap-1 text-sm" role="list">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <svg
                    className="h-4 w-4 shrink-0 text-surface-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
                {isLast ? (
                  <span
                    className="font-medium text-primary-700"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-primary-400 transition-colors duration-150 hover:text-accent-500"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
