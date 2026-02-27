'use client';

export function NewsletterForm() {
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter signup"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        className="w-full rounded-lg border border-primary-700 bg-primary-800 px-4 py-2.5 text-sm text-white placeholder-primary-400 transition-colors duration-200 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
      >
        Subscribe
      </button>
    </form>
  );
}
