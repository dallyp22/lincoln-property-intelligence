// Canonical NAP (Name, Address, Phone) data
// Every directory profile, schema markup instance, and external mention must use these exact strings
export const SITE = {
  name: 'Lincoln Property Intelligence',
  tagline: 'Inspection-Informed Real Estate Advisory | Data-Driven Market Intelligence for Lincoln, Nebraska',
  url: 'https://lincolnpropertyintelligence.com',
  description:
    'Data-driven market intelligence and inspection-informed real estate advisory for Lincoln, Nebraska. Interactive neighborhood maps, market reports, and analytical tools from the Home Design Real Estate Group of HOME Real Estate.',
} as const;

export const TEAM = {
  name: 'Home Design Real Estate Group of HOME Real Estate',
  brokerage: 'HOME Real Estate',
  positioning: 'We See What Others Miss',
  tagline: 'Inspection-Informed Real Estate Advisory',
  combinedExperience: '75+ years',
  structure: 'Husband-and-wife team',
  serviceAreas: ['Lincoln, NE', 'Omaha, NE', 'Eastern Nebraska'],
  zipCodes: ['68502', '68503', '68506', '68508', '68510', '68516', '68520', '68521', '68526', '68528'],
} as const;

export const AGENTS = {
  marion: {
    name: 'Marion Polivka',
    slug: 'marion-polivka',
    title: 'Real Estate Agent',
    phone: '402-309-3134',
    phoneFormatted: '(402) 309-3134',
    phoneTel: 'tel:+14023093134',
    website: 'https://marionpolivka.homerealestate.com/',
    shortBio:
      'Certified home inspector training. Hands-on construction and renovation experience across multiple investment properties.',
    credentials: [
      'Certified Home Inspector Training',
      'Personal renovation and investment property experience',
      'Hands-on construction background',
    ],
    directoryProfiles: [
      'https://marionpolivka.homerealestate.com/',
      'https://www.linkedin.com/in/marion-polivka/',
      'https://www.homerelincoln.com/agents/1764951/Marion+Polivka',
    ],
  },
  shawndel: {
    name: 'Shawndel Polivka',
    slug: 'shawndel-polivka',
    title: 'Real Estate Agent',
    phone: '402-429-1523',
    phoneFormatted: '(402) 429-1523',
    phoneTel: 'tel:+14024291523',
    website: 'https://shawndel.homerealestate.com/',
    shortBio:
      'Born and raised in Lincoln, NE. Personal renovation experience across multiple homes. Community-focused real estate advisory.',
    credentials: [
      'Lincoln native',
      'Multiple personal home renovations',
      'Community-focused advisory approach',
    ],
    directoryProfiles: [
      'https://shawndel.homerealestate.com/',
      'https://www.realtor.com/realestateagents/5682dfcb7e54f70100200c8f',
      'https://www.zillow.com/profile/shawndel',
      'https://www.homes.com/real-estate-agents/shawndel-polivka/mqrwebj/',
      'https://www.facebook.com/buyandsellwithShawndel/',
      'https://www.linkedin.com/in/shawndel-polivka-crs-gri-85107539/',
      'https://www.instagram.com/shawndel/',
    ],
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Market Intelligence', href: '/market-intelligence' },
  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'Sell Your Home', href: '/sell-your-home' },
  { label: 'Invest in Lincoln', href: '/invest-in-lincoln' },
  { label: 'Ask a Realtor', href: '/ask-a-realtor' },
  { label: 'About', href: '/about' },
] as const;

export const SEGMENT_COLORS: Record<string, string> = {
  Premium: '#d4af37',
  Established: '#2563eb',
  'Mid-Range': '#059669',
  Investment: '#7c3aed',
  Historic: '#b45309',
  Emerging: '#dc2626',
  Growth: '#0891b2',
  Urban: '#6366f1',
  Unassigned: '#94a3b8',
};

/**
 * Generate a distinct color for each neighborhood using golden-angle HSL
 * distribution for maximum perceptual separation.
 */
export function generateNeighborhoodColorMap(
  names: string[]
): Record<string, string> {
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  const map: Record<string, string> = {};
  const goldenAngle = 137.508;

  for (let i = 0; i < sorted.length; i++) {
    const hue = (i * goldenAngle) % 360;
    // Alternate saturation and lightness bands for extra distinction
    const saturation = 50 + (i % 3) * 10; // 50, 60, 70
    const lightness = 42 + (i % 4) * 6;   // 42, 48, 54, 60
    map[sorted[i]] = `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
  }

  return map;
}

export const LINCOLN_MAP_CENTER = {
  lng: -96.7,
  lat: 40.803,
} as const;

export const LINCOLN_MAP_ZOOM = 11.5;
