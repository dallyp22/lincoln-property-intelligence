// ============================================================================
// Seller Readiness Score — Computation Engine
// Pure TypeScript. Zero React imports.
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SellerCategory =
  | 'structural'
  | 'cosmetic'
  | 'market-alignment'
  | 'pricing'
  | 'presentation';

export interface QuestionOption {
  label: string;
  value: string;
  score: number;
}

export interface Question {
  id: string;
  category: SellerCategory;
  text: string;
  helpText?: string;
  type: 'single' | 'multi-select';
  options: QuestionOption[];
}

export interface CategoryWeight {
  category: SellerCategory;
  weight: number;
  label: string;
}

export interface Recommendation {
  title: string;
  description: string;
  estimatedCost: string;
  estimatedROI: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface CategoryResult {
  category: SellerCategory;
  label: string;
  score: number;
  weight: number;
  weightedScore: number;
  grade: string;
  gradeLabel: string;
  color: 'green' | 'yellow' | 'red';
  interpretation: string;
  recommendations: Recommendation[];
}

export interface SellerReadinessResult {
  totalScore: number;
  grade: string;
  gradeLabel: string;
  categories: CategoryResult[];
  topImprovements: Recommendation[];
}

// ---------------------------------------------------------------------------
// Category Weights
// ---------------------------------------------------------------------------

export const CATEGORY_WEIGHTS: CategoryWeight[] = [
  { category: 'structural', weight: 0.30, label: 'Structural Condition' },
  { category: 'cosmetic', weight: 0.20, label: 'Cosmetic Readiness' },
  { category: 'market-alignment', weight: 0.25, label: 'Market Alignment' },
  { category: 'pricing', weight: 0.15, label: 'Pricing Strategy' },
  { category: 'presentation', weight: 0.10, label: 'Presentation' },
];

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

export const NEIGHBORHOODS: { name: string; tier: string; score: number }[] = [
  // Premium tier (95)
  { name: 'Wilderness Hills', tier: 'Premium', score: 95 },
  { name: 'Fallbrook', tier: 'Premium', score: 95 },
  { name: 'Theresa Street', tier: 'Premium', score: 95 },
  { name: 'Boulder Ridge', tier: 'Premium', score: 95 },
  // High tier (85)
  { name: 'Highlands', tier: 'High', score: 85 },
  { name: 'East Campus', tier: 'High', score: 85 },
  { name: 'Country Club', tier: 'High', score: 85 },
  { name: 'Sheridan Blvd', tier: 'High', score: 85 },
  { name: 'Piedmont', tier: 'High', score: 85 },
  // Mid-High tier (75)
  { name: 'Waverly', tier: 'Mid-High', score: 75 },
  { name: 'Hickman', tier: 'Mid-High', score: 75 },
  { name: 'Colonial Hills', tier: 'Mid-High', score: 75 },
  { name: 'Lincoln Airport area', tier: 'Mid-High', score: 75 },
  // Mid tier (65)
  { name: 'University Place', tier: 'Mid', score: 65 },
  { name: 'Havelock', tier: 'Mid', score: 65 },
  { name: 'Bethany', tier: 'Mid', score: 65 },
  { name: 'Capitol View', tier: 'Mid', score: 65 },
  // Emerging tier (55)
  { name: 'Near South', tier: 'Emerging', score: 55 },
  { name: 'Clinton', tier: 'Emerging', score: 55 },
  { name: 'Hartley', tier: 'Emerging', score: 55 },
  { name: 'North Bottoms', tier: 'Emerging', score: 55 },
  // Catch-all
  { name: 'Other / Not Listed', tier: 'Other', score: 60 },
];

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const QUESTIONS: Question[] = [
  // =========================================================================
  // Step 1 — Structural Condition
  // =========================================================================
  {
    id: 'q1_1',
    category: 'structural',
    text: 'How old is your roof?',
    helpText: 'If you are unsure, a home inspection report or insurance documents may have this information.',
    type: 'single',
    options: [
      { label: 'Less than 5 years', value: 'less_5', score: 100 },
      { label: '5 - 10 years', value: '5_10', score: 85 },
      { label: '10 - 15 years', value: '10_15', score: 70 },
      { label: '15 - 20 years', value: '15_20', score: 50 },
      { label: '20+ years', value: '20_plus', score: 25 },
      { label: "Don't know", value: 'unknown', score: 40 },
    ],
  },
  {
    id: 'q1_2',
    category: 'structural',
    text: 'What is the condition of your foundation?',
    helpText: 'Look for cracks in basement walls or uneven floors as indicators.',
    type: 'single',
    options: [
      { label: 'No visible issues', value: 'no_issues', score: 100 },
      { label: 'Minor cracks (hairline)', value: 'minor', score: 75 },
      { label: 'Moderate cracks', value: 'moderate', score: 45 },
      { label: 'Significant damage', value: 'significant', score: 15 },
      { label: "Don't know", value: 'unknown', score: 40 },
    ],
  },
  {
    id: 'q1_3',
    category: 'structural',
    text: 'How old is your HVAC system?',
    helpText: 'Check the label on your furnace or AC unit for the manufacture date.',
    type: 'single',
    options: [
      { label: 'Less than 5 years', value: 'less_5', score: 100 },
      { label: '5 - 10 years', value: '5_10', score: 85 },
      { label: '10 - 15 years', value: '10_15', score: 65 },
      { label: '15 - 20 years', value: '15_20', score: 40 },
      { label: '20+ years', value: '20_plus', score: 20 },
      { label: "Don't know", value: 'unknown', score: 35 },
    ],
  },
  {
    id: 'q1_4',
    category: 'structural',
    text: 'Have you had any plumbing issues in the past 2 years?',
    helpText: 'Include any faucet leaks, running toilets, slow drains, or water heater problems.',
    type: 'single',
    options: [
      { label: 'No issues', value: 'none', score: 100 },
      { label: 'Minor (dripping faucets)', value: 'minor', score: 80 },
      { label: 'Moderate (slow drains, small leaks)', value: 'moderate', score: 50 },
      { label: 'Major (burst pipes, sewer backup)', value: 'major', score: 15 },
    ],
  },
  {
    id: 'q1_5',
    category: 'structural',
    text: 'What is the age and condition of your electrical panel?',
    helpText: 'A modern 200-amp panel is standard for most buyers today.',
    type: 'single',
    options: [
      { label: 'Updated in last 10 years', value: 'updated', score: 100 },
      { label: 'Original but functional', value: 'original', score: 70 },
      { label: 'Has known issues', value: 'issues', score: 30 },
      { label: "Don't know", value: 'unknown', score: 50 },
    ],
  },

  // =========================================================================
  // Step 2 — Cosmetic Readiness
  // =========================================================================
  {
    id: 'q2_1',
    category: 'cosmetic',
    text: 'How would you rate the interior paint condition?',
    helpText: 'Neutral, modern colors photograph best and appeal to the widest buyer pool.',
    type: 'single',
    options: [
      { label: 'Fresh / recent (< 2 years)', value: 'fresh', score: 100 },
      { label: 'Good condition', value: 'good', score: 85 },
      { label: 'Visible wear', value: 'wear', score: 60 },
      { label: 'Needs repainting', value: 'needs_repaint', score: 35 },
      { label: 'Dated colors', value: 'dated', score: 45 },
    ],
  },
  {
    id: 'q2_2',
    category: 'cosmetic',
    text: 'What is the condition of your flooring?',
    helpText: 'Flooring is one of the first things buyers notice when walking through a home.',
    type: 'single',
    options: [
      { label: 'Recently updated', value: 'updated', score: 100 },
      { label: 'Good condition', value: 'good', score: 80 },
      { label: 'Moderate wear', value: 'moderate', score: 55 },
      { label: 'Needs replacement', value: 'needs_replacement', score: 20 },
      { label: 'Mixed (some good, some worn)', value: 'mixed', score: 50 },
    ],
  },
  {
    id: 'q2_3',
    category: 'cosmetic',
    text: 'How would you describe your kitchen?',
    helpText: 'Kitchens are often the most important room for buyer decisions.',
    type: 'single',
    options: [
      { label: 'Recently remodeled (< 5 years)', value: 'remodeled', score: 100 },
      { label: 'Updated and functional', value: 'updated', score: 80 },
      { label: 'Dated but clean', value: 'dated', score: 55 },
      { label: 'Needs significant work', value: 'needs_work', score: 25 },
    ],
  },
  {
    id: 'q2_4',
    category: 'cosmetic',
    text: 'How would you describe your bathrooms?',
    helpText: 'Updated bathrooms consistently rank among the top value-adds for sellers.',
    type: 'single',
    options: [
      { label: 'Recently remodeled (< 5 years)', value: 'remodeled', score: 100 },
      { label: 'Updated and functional', value: 'updated', score: 80 },
      { label: 'Dated but clean', value: 'dated', score: 55 },
      { label: 'Needs significant work', value: 'needs_work', score: 25 },
    ],
  },

  // =========================================================================
  // Step 3 — Market Alignment
  // =========================================================================
  {
    id: 'q3_1',
    category: 'market-alignment',
    text: 'What Lincoln neighborhood is your home in?',
    helpText: 'Neighborhood demand directly affects time on market and sale price.',
    type: 'single',
    options: NEIGHBORHOODS.map((n) => ({
      label: n.name,
      value: n.name.toLowerCase().replace(/[\s/]+/g, '_'),
      score: n.score,
    })),
  },
  {
    id: 'q3_2',
    category: 'market-alignment',
    text: 'How would you rate your school district?',
    helpText: 'School quality is the number-one factor for families with children.',
    type: 'single',
    options: [
      { label: 'Highly sought-after', value: 'highly_sought', score: 100 },
      { label: 'Above average', value: 'above_avg', score: 80 },
      { label: 'Average', value: 'average', score: 60 },
      { label: 'Below average', value: 'below_avg', score: 35 },
      { label: 'Not sure', value: 'not_sure', score: 55 },
    ],
  },
  {
    id: 'q3_3',
    category: 'market-alignment',
    text: 'What type of lot does your property sit on?',
    helpText: 'Select all that apply. Lot characteristics can significantly impact buyer interest.',
    type: 'multi-select',
    options: [
      { label: 'Corner lot', value: 'corner', score: 5 },
      { label: 'Cul-de-sac', value: 'cul_de_sac', score: 10 },
      { label: 'Backs to green space', value: 'green_space', score: 10 },
      { label: 'Standard interior lot', value: 'standard', score: 0 },
      { label: 'Near busy road', value: 'busy_road', score: -15 },
      { label: 'Near commercial', value: 'commercial', score: -10 },
      { label: 'Large lot (0.25+ acres)', value: 'large_lot', score: 5 },
    ],
  },
  {
    id: 'q3_4',
    category: 'market-alignment',
    text: 'How have comparable homes in your area performed recently?',
    helpText: 'Your agent can provide a Comparative Market Analysis (CMA) for detailed data.',
    type: 'single',
    options: [
      { label: 'Selling above asking', value: 'above', score: 100 },
      { label: 'Selling at asking', value: 'at', score: 80 },
      { label: 'Selling below asking', value: 'below', score: 50 },
      { label: 'Multiple price reductions common', value: 'reductions', score: 30 },
      { label: 'Not sure', value: 'not_sure', score: 60 },
    ],
  },

  // =========================================================================
  // Step 4 — Pricing Strategy
  // =========================================================================
  {
    id: 'q4_1',
    category: 'pricing',
    text: 'What do you believe your home is worth?',
    helpText: 'This helps us compare your expectations with market data in your report.',
    type: 'single',
    options: [
      { label: 'Entered', value: 'entered', score: 70 },
    ],
  },
  {
    id: 'q4_2',
    category: 'pricing',
    text: 'How does your expected price compare to recent sales in your neighborhood?',
    helpText: 'Pricing in line with comps is the strongest predictor of a fast sale.',
    type: 'single',
    options: [
      { label: 'Below recent comps', value: 'below', score: 90 },
      { label: 'In line with recent comps', value: 'in_line', score: 100 },
      { label: 'Slightly above comps', value: 'slightly_above', score: 65 },
      { label: 'Significantly above comps', value: 'significantly_above', score: 30 },
      { label: 'Not sure', value: 'not_sure', score: 60 },
    ],
  },
  {
    id: 'q4_3',
    category: 'pricing',
    text: 'How motivated are you to sell?',
    helpText: 'Motivation level helps us tailor our pricing and marketing recommendations.',
    type: 'single',
    options: [
      { label: 'Must sell within 60 days', value: 'must_60', score: 85 },
      { label: 'Prefer to sell within 6 months', value: 'within_6mo', score: 100 },
      { label: 'Flexible — waiting for right offer', value: 'flexible', score: 70 },
      { label: 'Just exploring options', value: 'exploring', score: 50 },
    ],
  },
  {
    id: 'q4_4',
    category: 'pricing',
    text: 'What is your timeline for listing?',
    helpText: 'Knowing your timeline helps us plan pre-listing improvements.',
    type: 'single',
    options: [
      { label: 'Ready now', value: 'now', score: 100 },
      { label: 'Within 1 - 3 months', value: '1_3mo', score: 90 },
      { label: '3 - 6 months', value: '3_6mo', score: 75 },
      { label: '6 - 12 months', value: '6_12mo', score: 55 },
      { label: '12+ months', value: '12_plus', score: 35 },
    ],
  },

  // =========================================================================
  // Step 5 — Presentation
  // =========================================================================
  {
    id: 'q5_1',
    category: 'presentation',
    text: 'How decluttered is your home currently?',
    helpText: 'Decluttering is the single most impactful — and free — thing you can do before listing.',
    type: 'single',
    options: [
      { label: 'Minimal possessions / organized', value: 'minimal', score: 100 },
      { label: 'Lived-in but tidy', value: 'tidy', score: 80 },
      { label: 'Cluttered', value: 'cluttered', score: 55 },
      { label: 'Packed with belongings', value: 'packed', score: 25 },
    ],
  },
  {
    id: 'q5_2',
    category: 'presentation',
    text: 'How would you rate your curb appeal?',
    helpText: 'Buyers form an opinion within 7 seconds of seeing your home from the street.',
    type: 'single',
    options: [
      { label: 'Excellent — manicured, inviting', value: 'excellent', score: 100 },
      { label: 'Good — maintained', value: 'good', score: 80 },
      { label: 'Average', value: 'average', score: 55 },
      { label: 'Needs work', value: 'needs_work', score: 25 },
    ],
  },
  {
    id: 'q5_3',
    category: 'presentation',
    text: 'Have you considered professional staging or photography?',
    helpText: 'Professionally staged homes sell 73% faster on average in the Lincoln market.',
    type: 'single',
    options: [
      { label: 'Already arranged', value: 'arranged', score: 100 },
      { label: 'Open to it', value: 'open', score: 85 },
      { label: 'Not planning on it', value: 'not_planning', score: 40 },
      { label: 'Not sure what that involves', value: 'not_sure', score: 50 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers — Step Questions
// ---------------------------------------------------------------------------

const STEP_CATEGORIES: SellerCategory[] = [
  'structural',
  'cosmetic',
  'market-alignment',
  'pricing',
  'presentation',
];

/**
 * Returns the questions for a given step (0-indexed, 0-4).
 */
export function getStepQuestions(step: number): Question[] {
  const category = STEP_CATEGORIES[step];
  if (!category) return [];
  return QUESTIONS.filter((q) => q.category === category);
}

// ---------------------------------------------------------------------------
// Grading
// ---------------------------------------------------------------------------

/**
 * Maps a numeric score (0-100) to a letter grade and human-readable label.
 */
export function getGrade(score: number): { grade: string; label: string } {
  if (score >= 90) return { grade: 'A+', label: 'Excellent' };
  if (score >= 80) return { grade: 'A', label: 'Great' };
  if (score >= 70) return { grade: 'B', label: 'Good' };
  if (score >= 60) return { grade: 'C', label: 'Fair' };
  if (score >= 50) return { grade: 'D', label: 'Needs Improvement' };
  return { grade: 'F', label: 'Critical Attention Needed' };
}

/**
 * Returns a traffic-light color for a given score.
 */
export function getScoreColor(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 80) return 'green';
  if (score >= 60) return 'yellow';
  return 'red';
}

// ---------------------------------------------------------------------------
// Interpretation
// ---------------------------------------------------------------------------

/**
 * Returns a one-sentence contextual interpretation for a category + score.
 */
export function getInterpretation(category: SellerCategory, score: number): string {
  switch (category) {
    case 'structural': {
      if (score >= 90)
        return 'Your home\'s major systems are in excellent condition, giving buyers confidence and reducing inspection risk.';
      if (score >= 80)
        return 'Your structural components are in great shape with only minor maintenance items to address before listing.';
      if (score >= 70)
        return 'Your home is structurally sound, but a few systems are aging and may raise questions during inspections.';
      if (score >= 60)
        return 'Several structural components are approaching the end of their useful life and could deter some buyers.';
      if (score >= 50)
        return 'Buyers and inspectors will likely flag multiple structural concerns that could affect your sale price.';
      return 'Significant structural issues exist that will need to be addressed or disclosed, likely impacting offers.';
    }
    case 'cosmetic': {
      if (score >= 90)
        return 'Your home shows beautifully and is move-in ready — buyers will feel like they can unpack and settle in immediately.';
      if (score >= 80)
        return 'Your home presents well with only minor cosmetic touches needed to maximize its appeal.';
      if (score >= 70)
        return 'Your home is clean and presentable, but targeted cosmetic updates could meaningfully increase buyer interest.';
      if (score >= 60)
        return 'Buyers may see your home as a project; strategic cosmetic improvements would broaden your buyer pool.';
      if (score >= 50)
        return 'Cosmetic updates are needed in several areas — without them, buyers will discount their offers to account for the work.';
      return 'Extensive cosmetic work is needed, which will significantly impact perceived value and time on market.';
    }
    case 'market-alignment': {
      if (score >= 90)
        return 'Your home is in a highly desirable Lincoln location with strong market fundamentals driving demand.';
      if (score >= 80)
        return 'Market conditions in your area are favorable, with solid demand and positive comparable sales activity.';
      if (score >= 70)
        return 'Your location and market factors are working in your favor, though some elements could be stronger.';
      if (score >= 60)
        return 'Market conditions in your area are mixed — pricing strategy will be especially important for your listing.';
      if (score >= 50)
        return 'Your market area faces some headwinds; a competitive price and strong marketing will be essential.';
      return 'Market conditions in your area present challenges that will require aggressive pricing and creative marketing.';
    }
    case 'pricing': {
      if (score >= 90)
        return 'Your pricing expectations and timeline are well-aligned with the market, setting you up for a strong outcome.';
      if (score >= 80)
        return 'Your pricing strategy is solid and your timeline gives you flexibility to maximize your sale price.';
      if (score >= 70)
        return 'Your pricing approach is reasonable, but fine-tuning based on a detailed CMA could improve your results.';
      if (score >= 60)
        return 'There may be a gap between your price expectations and the market — a candid pricing discussion would be valuable.';
      if (score >= 50)
        return 'Your pricing expectations or timeline may not align with current market realities, which could lead to a longer time on market.';
      return 'A significant disconnect exists between pricing expectations and market data that needs to be addressed before listing.';
    }
    case 'presentation': {
      if (score >= 90)
        return 'Your home is presentation-ready and will photograph and show exceptionally well to buyers.';
      if (score >= 80)
        return 'Your home presents nicely — a few finishing touches will make it truly shine in photos and showings.';
      if (score >= 70)
        return 'Your home is presentable, but investing in staging and professional photography could significantly boost buyer interest.';
      if (score >= 60)
        return 'Presentation improvements are needed to help buyers envision themselves living in your home.';
      if (score >= 50)
        return 'Your home\'s presentation may be holding it back — decluttering, curb appeal, and staging should be prioritized.';
      return 'Significant presentation work is needed; without it, online photos will not attract the foot traffic you need.';
    }
    default:
      return 'Score evaluation is not available for this category.';
  }
}

// ---------------------------------------------------------------------------
// Recommendations
// ---------------------------------------------------------------------------

/**
 * Returns 1-3 actionable recommendations for a category scoring below 80.
 * Includes Lincoln-specific cost ranges and ROI estimates.
 */
export function getRecommendations(category: SellerCategory, score: number): Recommendation[] {
  if (score >= 80) return [];

  switch (category) {
    case 'structural': {
      const recs: Recommendation[] = [];
      if (score < 50) {
        recs.push({
          title: 'Get a Pre-Listing Home Inspection',
          description:
            'Hire a licensed inspector to identify all structural concerns before listing. This lets you address issues proactively and avoids surprises that kill deals. Lincoln-area inspectors typically complete reports within 48 hours.',
          estimatedCost: '$350 - $500',
          estimatedROI: 'Prevents 5-15% price reductions from buyer inspection findings',
          priority: 'High',
        });
      }
      if (score < 70) {
        recs.push({
          title: 'Address Major System Repairs',
          description:
            'Prioritize HVAC, roof, and plumbing repairs before listing. In the Lincoln market, buyers heavily discount homes with aging systems. Getting ahead of these repairs signals a well-maintained home.',
          estimatedCost: '$2,000 - $15,000 depending on systems',
          estimatedROI: '150-300% return — every $1 in structural repair typically returns $1.50 - $3.00 at sale',
          priority: 'High',
        });
      }
      if (score < 80) {
        recs.push({
          title: 'Obtain Repair Receipts and Warranties',
          description:
            'Gather documentation for all maintenance and repairs. Transferable warranties (roof, HVAC, appliances) are valuable selling points that give Lincoln buyers confidence.',
          estimatedCost: '$0 (time only)',
          estimatedROI: 'Builds buyer confidence and can reduce negotiation concessions by $1,000 - $3,000',
          priority: 'Medium',
        });
      }
      return recs;
    }

    case 'cosmetic': {
      const recs: Recommendation[] = [];
      if (score < 60) {
        recs.push({
          title: 'Invest in a Kitchen Refresh',
          description:
            'You don\'t need a full remodel — painting cabinets, updating hardware, and replacing dated fixtures can transform a kitchen. Lincoln buyers consistently rank the kitchen as their top priority.',
          estimatedCost: '$1,500 - $5,000 for a refresh; $15,000 - $30,000 for a remodel',
          estimatedROI: 'Kitchen updates return 60-80% of cost and dramatically reduce time on market',
          priority: 'High',
        });
      }
      if (score < 70) {
        recs.push({
          title: 'Repaint with Neutral, Modern Colors',
          description:
            'A fresh coat of paint in warm neutral tones (greige, soft white, light gray) is the highest-ROI improvement you can make. It photographs beautifully and appeals to the broadest buyer pool.',
          estimatedCost: '$1,200 - $3,500 for professional interior painting',
          estimatedROI: '200-400% return — one of the best investments in pre-listing preparation',
          priority: 'High',
        });
      }
      if (score < 80) {
        recs.push({
          title: 'Update Flooring in High-Traffic Areas',
          description:
            'Replace worn carpet or damaged flooring in main living areas. Luxury vinyl plank (LVP) is a popular, durable, and cost-effective option that Lincoln buyers love.',
          estimatedCost: '$3 - $7 per sq ft installed; $2,000 - $6,000 for main areas',
          estimatedROI: '100-150% return, plus faster sale timeline',
          priority: 'Medium',
        });
      }
      return recs;
    }

    case 'market-alignment': {
      const recs: Recommendation[] = [];
      if (score < 60) {
        recs.push({
          title: 'Price Competitively for Your Micro-Market',
          description:
            'In areas with lower demand, pricing 2-3% below comparable sales can generate urgency and multiple offers. Work with your agent to analyze sold comps within a half-mile radius.',
          estimatedCost: '$0 (pricing strategy)',
          estimatedROI: 'Competitive pricing reduces average days on market by 30-50% in Lincoln',
          priority: 'High',
        });
      }
      if (score < 70) {
        recs.push({
          title: 'Highlight Neighborhood Strengths in Marketing',
          description:
            'Every Lincoln neighborhood has unique selling points — proximity to trails, parks, schools, or downtown. Make sure your listing highlights these assets with specific details and distances.',
          estimatedCost: '$0 - $500 for enhanced listing materials',
          estimatedROI: 'Strong neighborhood marketing increases listing views by 20-40%',
          priority: 'Medium',
        });
      }
      if (score < 80) {
        recs.push({
          title: 'Request a Detailed Comparative Market Analysis',
          description:
            'A thorough CMA looking at the last 90 days of sales activity in your specific area will reveal exactly where your home fits. This is essential for setting the right list price.',
          estimatedCost: '$0 (provided by your listing agent)',
          estimatedROI: 'Accurate pricing prevents costly price reductions that average $5,000 - $15,000 in Lincoln',
          priority: 'Medium',
        });
      }
      return recs;
    }

    case 'pricing': {
      const recs: Recommendation[] = [];
      if (score < 60) {
        recs.push({
          title: 'Reassess Your Price Expectations',
          description:
            'Your pricing expectations may be out of alignment with current market data. Meet with your agent to review recent closed sales, pending sales, and active listings in your area to set a realistic price range.',
          estimatedCost: '$0 (strategy session with your agent)',
          estimatedROI: 'Correctly priced Lincoln homes sell 3x faster and for 2-5% more than overpriced homes that require reductions',
          priority: 'High',
        });
      }
      if (score < 70) {
        recs.push({
          title: 'Consider a Strategic Pricing Approach',
          description:
            'Pricing just below a key threshold (e.g., $299,900 instead of $305,000) captures more online search traffic and can generate competing offers. Discuss bracket pricing with your agent.',
          estimatedCost: '$0 (pricing strategy)',
          estimatedROI: 'Strategic pricing increases showing requests by 15-30%',
          priority: 'Medium',
        });
      }
      if (score < 80) {
        recs.push({
          title: 'Align Your Timeline with Market Seasonality',
          description:
            'The Lincoln market peaks from March through June. If your timeline is flexible, listing during peak season can mean faster sales and higher prices. Late fall and winter listings typically see 5-8% fewer buyers.',
          estimatedCost: '$0 (timing strategy)',
          estimatedROI: 'Spring listings in Lincoln historically sell for 3-6% more than winter listings',
          priority: 'Low',
        });
      }
      return recs;
    }

    case 'presentation': {
      const recs: Recommendation[] = [];
      if (score < 60) {
        recs.push({
          title: 'Declutter and Depersonalize',
          description:
            'Remove 40-50% of your belongings, personal photos, and collections. Rent a storage unit if needed. Buyers need to envision their own life in the space, which is difficult when your personality fills every room.',
          estimatedCost: '$75 - $200/month for a storage unit in Lincoln',
          estimatedROI: 'Decluttered homes sell for 3-5% more on average',
          priority: 'High',
        });
      }
      if (score < 70) {
        recs.push({
          title: 'Invest in Professional Staging',
          description:
            'Professional staging highlights your home\'s best features and helps buyers connect emotionally. In Lincoln, staged homes sell 73% faster. Many stagers offer consultation-only packages if full staging isn\'t in your budget.',
          estimatedCost: '$500 - $2,500 for staging; $150 - $300 for consultation only',
          estimatedROI: 'Staged homes in Lincoln sell for 5-10% more and spend fewer days on market',
          priority: 'High',
        });
      }
      if (score < 80) {
        recs.push({
          title: 'Boost Curb Appeal and Hire a Professional Photographer',
          description:
            'First impressions happen online and at the curb. Power-wash the exterior, refresh landscaping, and add a welcoming front entry. Then hire a real estate photographer — phone photos simply cannot compete.',
          estimatedCost: '$200 - $800 for curb appeal; $150 - $400 for professional photography',
          estimatedROI: 'Listings with professional photos get 61% more views and sell faster',
          priority: 'Medium',
        });
      }
      return recs;
    }

    default:
      return [];
  }
}

// ---------------------------------------------------------------------------
// Score Calculation
// ---------------------------------------------------------------------------

/**
 * Calculates the score for a single category based on the user's answers.
 *
 * - For standard (single) questions the score comes directly from the selected
 *   option's score value.
 * - For multi-select questions (q3_3 — lot type) the score is computed as
 *   base 60 + sum of selected modifiers, clamped to the range 10 - 100.
 */
export function calculateCategoryScore(
  answers: Record<string, string | string[]>,
  category: SellerCategory,
): number {
  const categoryQuestions = QUESTIONS.filter((q) => q.category === category);
  if (categoryQuestions.length === 0) return 0;

  let totalScore = 0;
  let answeredCount = 0;

  for (const question of categoryQuestions) {
    const answer = answers[question.id];
    if (answer === undefined || answer === null) continue;

    if (question.type === 'multi-select') {
      // Multi-select: base 60 + modifiers, clamped 10-100
      const selectedValues = Array.isArray(answer) ? answer : [answer];
      let modifier = 0;
      for (const val of selectedValues) {
        const opt = question.options.find((o) => o.value === val);
        if (opt) {
          modifier += opt.score;
        }
      }
      const raw = 60 + modifier;
      totalScore += Math.max(10, Math.min(100, raw));
      answeredCount++;
    } else {
      // Single-select: direct score lookup
      const selectedValue = Array.isArray(answer) ? answer[0] : answer;
      const opt = question.options.find((o) => o.value === selectedValue);
      if (opt) {
        totalScore += opt.score;
        answeredCount++;
      }
    }
  }

  if (answeredCount === 0) return 0;
  return Math.round(totalScore / answeredCount);
}

// ---------------------------------------------------------------------------
// Main Calculation
// ---------------------------------------------------------------------------

/**
 * Computes the full Seller Readiness result from all user answers.
 *
 * Returns category breakdowns, weighted total score, overall grade,
 * per-category recommendations, and a prioritised list of the top
 * improvements the seller should tackle first.
 */
export function calculateSellerReadiness(
  answers: Record<string, string | string[]>,
): SellerReadinessResult {
  const categories: CategoryResult[] = CATEGORY_WEIGHTS.map((cw) => {
    const score = calculateCategoryScore(answers, cw.category);
    const { grade, label: gradeLabel } = getGrade(score);
    const color = getScoreColor(score);
    const interpretation = getInterpretation(cw.category, score);
    const recommendations = getRecommendations(cw.category, score);
    const weightedScore = Math.round(score * cw.weight * 100) / 100;

    return {
      category: cw.category,
      label: cw.label,
      score,
      weight: cw.weight,
      weightedScore,
      grade,
      gradeLabel,
      color,
      interpretation,
      recommendations,
    };
  });

  const totalScore = Math.round(
    categories.reduce((sum, c) => sum + c.weightedScore, 0),
  );

  const { grade, label: gradeLabel } = getGrade(totalScore);

  // Collect all recommendations across categories, sorted by priority then
  // lowest category score first (so the most impactful improvements surface).
  const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
  const topImprovements = categories
    .flatMap((c) =>
      c.recommendations.map((r) => ({
        ...r,
        _categoryScore: c.score,
      })),
    )
    .sort((a, b) => {
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return a._categoryScore - b._categoryScore;
    })
    .map(({ _categoryScore: _, ...rest }) => rest);

  return {
    totalScore,
    grade,
    gradeLabel,
    categories,
    topImprovements,
  };
}
