import Link from 'next/link';
import { NAV_ITEMS, SITE, TEAM, AGENTS } from '@/lib/constants';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-200" role="contentinfo">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white font-serif">Lincoln</span>
              <span className="ml-1 text-xl font-light text-white">Property Intelligence</span>
            </Link>
            <p className="text-sm leading-relaxed text-primary-300 mb-4">
              {SITE.description}
            </p>
            <p className="text-sm font-semibold text-secondary-400 italic">
              &ldquo;{TEAM.positioning}&rdquo;
            </p>
            <p className="mt-3 text-xs text-primary-400">
              {TEAM.name}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-300 transition-colors duration-200 hover:text-accent-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sell-your-home"
                  className="text-sm font-medium text-accent-400 transition-colors duration-200 hover:text-accent-300"
                >
                  Schedule Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="space-y-5">
              {/* Marion */}
              <div>
                <p className="text-sm font-semibold text-white">{AGENTS.marion.name}</p>
                <p className="text-xs text-primary-400">{AGENTS.marion.title}</p>
                <a
                  href={AGENTS.marion.phoneTel}
                  className="mt-1 block text-sm text-primary-300 transition-colors duration-200 hover:text-accent-400"
                >
                  {AGENTS.marion.phoneFormatted}
                </a>
                <a
                  href={AGENTS.marion.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-sm text-primary-300 transition-colors duration-200 hover:text-accent-400"
                >
                  HOME Real Estate Profile
                  <span className="sr-only"> for {AGENTS.marion.name}</span>
                </a>
              </div>
              {/* Shawndel */}
              <div>
                <p className="text-sm font-semibold text-white">{AGENTS.shawndel.name}</p>
                <p className="text-xs text-primary-400">{AGENTS.shawndel.title}</p>
                <a
                  href={AGENTS.shawndel.phoneTel}
                  className="mt-1 block text-sm text-primary-300 transition-colors duration-200 hover:text-accent-400"
                >
                  {AGENTS.shawndel.phoneFormatted}
                </a>
                <a
                  href={AGENTS.shawndel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-sm text-primary-300 transition-colors duration-200 hover:text-accent-400"
                >
                  HOME Real Estate Profile
                  <span className="sr-only"> for {AGENTS.shawndel.name}</span>
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs text-primary-400">
              Service Areas: {TEAM.serviceAreas.join(' | ')}
            </p>
            <p className="mt-1 text-xs text-primary-400">
              Serving Lincoln ZIP codes: {TEAM.zipCodes.join(', ')}
            </p>

            {/* Directory Profiles */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                Find Us On
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href="https://www.zillow.com/profile/shawndel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  Zillow
                </a>
                <a
                  href="https://www.realtor.com/realestateagents/5682dfcb7e54f70100200c8f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  Realtor.com
                </a>
                <a
                  href="https://www.homes.com/real-estate-agents/shawndel-polivka/mqrwebj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  Homes.com
                </a>
                <a
                  href="https://www.linkedin.com/in/marion-polivka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/buyandsellwithShawndel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/shawndel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-300 transition-colors hover:text-accent-400"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Market Updates
            </h3>
            <p className="mb-4 text-sm text-primary-300">
              Get monthly Lincoln market intelligence and neighborhood insights
              delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-400">
              &copy; {currentYear} {SITE.name}. Real Estate Agents in Lincoln, NE &middot; Brokered by{' '}
              {TEAM.brokerage}.
            </p>
            <p className="text-xs text-primary-400">
              {TEAM.tagline} &middot; {TEAM.combinedExperience} Combined Experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
