'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white shadow-sm'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label={`${SITE.name} — Home`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 lg:h-10 lg:w-10">
              <span className="text-lg font-bold text-white lg:text-xl">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-primary-500 lg:text-xl font-serif">
                Lincoln
              </span>
              <span className="ml-1 text-lg font-light tracking-tight text-primary-500 lg:text-xl">
                Property Intelligence
              </span>
            </div>
            <span className="sm:hidden text-lg font-bold tracking-tight text-primary-500 font-serif">
              LPI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-0 xl:gap-1" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative whitespace-nowrap px-2 py-2 text-[13px] font-medium rounded-md transition-colors duration-200 xl:px-3 xl:text-sm',
                  isActive(item.href)
                    ? 'text-accent-500 bg-accent-50'
                    : 'text-primary-700 hover:text-accent-500 hover:bg-surface-50'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link
              href="/sell-your-home"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-accent-500 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 xl:px-5 xl:py-2.5 xl:text-sm"
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-primary-700 hover:bg-surface-100 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className={cn('h-6 w-6 transition-transform duration-200', mobileMenuOpen && 'rotate-90')}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out lg:hidden',
          mobileMenuOpen ? 'max-h-96 border-t border-surface-200' : 'max-h-0'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-6" aria-label="Mobile navigation">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150',
                  isActive(item.href)
                    ? 'bg-accent-50 text-accent-500'
                    : 'text-primary-700 hover:bg-surface-50 hover:text-accent-500'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 border-t border-surface-200 pt-4">
            <Link
              href="/sell-your-home"
              className="block w-full rounded-lg bg-accent-500 px-4 py-3 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-600"
            >
              Schedule Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
