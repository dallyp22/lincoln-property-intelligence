/* ──────────────────────────────────────────────────────────────────────────────
 * Lincoln Property Intelligence — Shared TypeScript Types
 * ────────────────────────────────────────────────────────────────────────────── */

// ── Neighborhood ─────────────────────────────────────────────────────────────

export type NeighborhoodSegment =
  | 'Premium'
  | 'Established'
  | 'Mid-Range'
  | 'Investment'
  | 'Historic'
  | 'Emerging'
  | 'Growth'
  | 'Urban'
  | 'Unassigned';

export interface NeighborhoodMarket {
  medianPrice: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  medianPriceChange: number; // YoY percentage, e.g. 4.2
  averageDom: number; // average days on market
  activeInventory: number;
  averagePricePerSqft: number;
  lastUpdated: string; // ISO-8601 date
}

export interface School {
  name: string;
  type: 'elementary' | 'middle' | 'high';
  rating: number; // 1–10
  district: string;
}

export interface Commute {
  toDowntown: string; // e.g. "12 min"
  toUNL: string;
  toAirport: string;
  nearestInterstate: string;
}

export interface InvestorMetrics {
  averageRent: number;
  estimatedCapRate: number; // percentage
  rentalDemand: 'Low' | 'Moderate' | 'High' | 'Very High';
  vacancyRate: number; // percentage
}

export interface HousingStock {
  predominantEra: string; // e.g. "2000s–present"
  commonStyles: string[];
  averageSqft: number;
  averageLotSize: string; // e.g. "0.20 acres"
  medianYearBuilt: number;
}

export interface InspectionNote {
  category: string;
  note: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  tagline: string;
  segment: NeighborhoodSegment;
  description: string;
  heroImage: string;
  market: NeighborhoodMarket;
  housingStock: HousingStock;
  inspectionNotes: InspectionNote[];
  schools: School[];
  commute: Commute;
  investorMetrics: InvestorMetrics;
  relatedArticles: string[]; // slugs referencing ask-a-realtor articles
  mapCenter: { lng: number; lat: number };
  mapZoom: number;
}

// ── Market Intelligence ──────────────────────────────────────────────────────

export type StatFormat = 'currency' | 'number' | 'percent' | 'days';

export interface HeroStat {
  label: string;
  value: number;
  format: StatFormat;
  change: number; // percentage change, e.g. 4.2
}

export type ChangeDirection = 'up' | 'down' | 'flat';

export interface SnapshotCard {
  title: string;
  value: number;
  format: StatFormat;
  changePercent: number;
  changeDirection: ChangeDirection;
  period: string; // e.g. "vs. last month"
  icon: string; // icon identifier, e.g. "home", "clock", "chart-bar", "list"
}

export interface LincolnOverall {
  medianPrice: number;
  medianPriceChange: number;
  averageDom: number;
  averageDomChange: number;
  activeInventory: number;
  activeInventoryChange: number;
  newListings: number;
  newListingsChange: number;
  medianPricePerSqft: number;
  closedSales: number;
  closedSalesChange: number;
  averageSaleToListRatio: number;
}

export interface MarketStats {
  lastUpdated: string; // ISO-8601 date
  lincolnOverall: LincolnOverall;
  heroStats: HeroStat[];
  snapshotCards: SnapshotCard[];
}

// ── Articles / Ask-a-Realtor ─────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  author: string;
  authorSlug: string;
  publishedAt: string; // ISO-8601 date
  updatedAt: string; // ISO-8601 date
  category: string;
  tags: string[];
  neighborhoods: string[]; // neighborhood slugs
  readingTime: number; // minutes
  featuredImage: string;
  faqSchema: FAQ[];
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string; // raw MDX source
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  author: string;
  neighborhood: string;
  neighborhoodSlug: string;
  text: string;
  rating: number; // 1–5
  date: string; // ISO-8601 date
  highlights: string[];
}

// ── Agents & Team ────────────────────────────────────────────────────────────

export interface Agent {
  name: string;
  slug: string;
  title: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  email: string;
  website: string;
  photo: string;
  shortBio: string;
  fullBio: string;
  credentials: string[];
  specialties: string[];
}

export interface TeamInfo {
  name: string;
  brokerage: string;
  positioning: string;
  tagline: string;
  combinedExperience: string;
  structure: string;
  serviceAreas: string[];
  website: string;
}

export interface AgentData {
  team: TeamInfo;
  agents: Agent[];
}

// ── GeoJSON (typed subset for neighborhood boundaries) ───────────────────────

export interface NeighborhoodGeoProperties {
  id: string;
  slug: string;
  name: string;
  segment: NeighborhoodSegment;
  medianPrice: number;
  priceChange: number;
  averageDom: number;
  activeInventory: number;
}

export interface NeighborhoodGeoFeature {
  type: 'Feature';
  properties: NeighborhoodGeoProperties;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface NeighborhoodGeoCollection {
  type: 'FeatureCollection';
  features: NeighborhoodGeoFeature[];
}

// ── Seller Readiness Score ──────────────────────────────────────────────────

export interface LeadCaptureData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: 'phone' | 'email' | 'text';
}

// ── Investment Reference Data ───────────────────────────────────────────────

// ── Market Report ──────────────────────────────────────────────────────────

export interface ReportNeighborhood {
  name: string;
  medianPrice: number;
  yoyChange: number;
  dom: number;
  activeListings: number;
  housingType: string;
  characterization: string;
  pricePerSqft: number;
  marketType: string;
}

export interface ReportRentalUnit {
  type: string;
  avgRent: number;
  marketShare: number;
  yoyChange: number | null;
}

export interface ReportCapRate {
  tier: string;
  range: string;
  low: number;
  high: number;
  neighborhoods: string;
}

export interface MarketReportMeta {
  period: string;
  slug: string;
  publishedDate: string;
  reportDate: string;
  authors: string[];
  team: string;
  description: string;
}

export interface MarketReport {
  meta: MarketReportMeta;
  executiveSummary: {
    highlights: Array<{ label: string; value: string; change: string; direction: string }>;
    competitivenessScore: number;
    competitivenessLabel: string;
    marketCondition: string;
  };
  marketOverview: {
    metrics: Array<{
      metric: string;
      current: number;
      priorMonth: number;
      momChange: number;
      priorYear: number;
      yoyChange: number;
      interpretation: string;
    }>;
    additionalIndicators: Array<{ metric: string; value: string; notes: string }>;
    mortgageRates: Array<{ type: string; rate: number; priorMonth: number; yoyChange: number }>;
    newConstruction: {
      listings: number;
      listingsChange: number;
      medianPrice: number;
      medianPriceChange: number;
      monthsSupply: number;
      existingMonthsSupply: number;
    };
  };
  neighborhoods: ReportNeighborhood[];
  neighborhoodRankings: {
    largestPriceGains: Array<{ rank: number; name: string; yoyChange: number; driver: string }>;
    bestForSellers: string[];
    bestForBuyers: string[];
    bestValue: string[];
  };
  rentalMarket: {
    cityAverage: number;
    cityAverageChange: number;
    vacancyRate: number;
    renterOccupied: number;
    ownerOccupied: number;
    totalHouseholds: number;
    byUnitType: ReportRentalUnit[];
    mostExpensiveAreas: Array<{ name: string; avgRent: number }>;
    mostAffordableAreas: Array<{ name: string; avgRent: number }>;
  };
  investorMetrics: {
    capRates: ReportCapRate[];
    grm: Array<{ tier: string; range: string }>;
    scenarioAnalysis: {
      purchasePrice: number;
      downPayment: number;
      loanAmount: number;
      mortgageRate: number;
      monthlyMortgage: number;
      estimatedRent: number;
      monthlyTax: number;
      monthlyInsurance: number;
      monthlyCashFlow: number;
      breakEvenDownPayment: number;
    };
    propertyTax: { medianAnnual: number; effectiveRate: string };
    insurance: { landlordAnnual: number; homeownerAnnual: number };
    renovationCosts: Array<{ project: string; cost: string }>;
  };
  economic: {
    employment: {
      lincolnUnemployment: number;
      nebraskaUnemployment: number;
      nationalUnemployment: number;
      laborForce: number;
      laborForceChange: number;
    };
    layoffs: Array<{ employer: string; jobs: number; status: string }>;
    hiring: Array<{ employer: string; openings: string; notes: string }>;
    demographics: {
      population: number;
      projectedPopulation: number;
      msaPopulation: number;
      medianHouseholdIncome: number;
      medianAge: number;
    };
    university: {
      totalEnrollment: number;
      enrollmentChange: number;
      undergraduate: number;
      undergraduateChange: number;
      freshmen: number;
      freshmenChange: number;
      nebraskaResidents: number;
      nebraskaChange: number;
    };
    infrastructure: Array<{ project: string; cost: string; timeline: string; impact: string }>;
    costOfLiving: {
      index: number;
      nationalIndex: number;
      difference: number;
      medianHomePrice: number;
      nationalMedianHome: number;
      homePriceDifference: number;
      medianRent2BR: number;
      nationalMedianRent: number;
      rentDifference: number;
    };
    recognition: string;
  };
  forecast: {
    direction: string;
    priceGrowthRange: string;
    sellerGuidance: {
      condition: string;
      narrative: string;
      bestNeighborhoods: string[];
      recommendations: string[];
    };
    buyerGuidance: {
      condition: string;
      narrative: string;
      bestNeighborhoods: string[];
      recommendations: string[];
    };
    investorGuidance: {
      condition: string;
      narrative: string;
      bestTargets: string[];
      recommendations: string[];
    };
    upcomingShifters: Array<{ date: string; event: string; impact: string }>;
  };
  nationalComparison: Array<{ metric: string; lincoln: string; national: string; comparison: string }>;
  notableTransactions: Array<{ category: string; details: string; significance: string }>;
  momSummary: Array<{ indicator: string; direction: string; magnitude: string; implication: string }>;
  policy: Array<{ policy: string; status: string; impact: string }>;
  sources: string[];
}

// ── Investment Reference Data ───────────────────────────────────────────────

export interface InvestmentReferenceData {
  lastUpdated: string;
  mortgageRates: {
    thirtyYear: { rate: string; source: string };
    fifteenYear: { rate: string; source: string };
    fiveOneArm: { rate: string; source: string };
  };
  rentAverages: Array<{
    unitType: string;
    avgRent: string;
    sqft: string;
  }>;
  propertyTax: {
    effectiveRate: string;
    medianBill: string;
    defaultRate: number;
  };
  insurance: {
    range: string;
    defaultAnnual: number;
  };
  marketHighlights: {
    renterOccupied: string;
    unemployment: string;
    appreciation: string;
    medianPrice: string;
  };
}
