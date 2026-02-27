// ============================================================================
// Investment Property Calculator — Computation Engine
// Pure TypeScript. Zero React imports.
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PropertyType =
  | 'single-family'
  | 'duplex'
  | 'triplex'
  | 'fourplex'
  | 'condo';

export interface InvestmentInputs {
  purchasePrice: number;
  rehabCost: number;
  closingCostPercent: number;
  propertyType: PropertyType;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: 15 | 30;
  monthlyGrossRent: number;
  otherMonthlyIncome: number;
  annualPropertyTax: number;
  annualInsurance: number;
  monthlyMaintenance: number;
  vacancyRatePercent: number;
  managementFeePercent: number;
  appreciationRatePercent: number;
  rentIncreasePercent: number;
}

export interface MonthlyBreakdown {
  grossRent: number;
  otherIncome: number;
  totalIncome: number;
  vacancyAllowance: number;
  effectiveGrossIncome: number;
  mortgage: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  managementFee: number;
  totalExpenses: number;
  netCashFlow: number;
}

export interface YearProjection {
  year: number;
  propertyValue: number;
  loanBalance: number;
  equity: number;
  annualCashFlow: number;
  cumulativeCashFlow: number;
  annualRent: number;
  totalReturn: number;
  roi: number;
}

export interface InvestmentMetrics {
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  grossRentMultiplier: number;
  breakEvenOccupancy: number;
  fiveYearTotalROI: number;
  totalCashInvested: number;
  loanAmount: number;
  monthlyMortgagePayment: number;
  monthlyBreakdown: MonthlyBreakdown;
  fiveYearProjection: YearProjection[];
}

export type MetricColor = 'green' | 'yellow' | 'red';

export interface EducationCallout {
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface SavedScenario {
  id: string;
  name: string;
  inputs: InvestmentInputs;
  metrics: InvestmentMetrics;
  savedAt: string;
}

// ---------------------------------------------------------------------------
// Lincoln, NE Reference Data
// ---------------------------------------------------------------------------

export const LINCOLN_REFERENCE = {
  medianHomePrice: '$302K\u2013$314K',
  avg2BRRent: '$1,322\u2013$1,409/mo',
  mortgageRate30yr: '5.98%\u20136.04%',
  mortgageRate15yr: '5.37%\u20135.45%',
  effectiveTaxRate: '~1.52%\u20131.66%',
  avgInsurance300k: '$2,561\u2013$4,260/yr',
  avgVacancy: '4\u20137%',
  avgAppreciation: '3.7%\u20138.8% YoY',
  rentGrowth: '~2.7%\u20133.6% YoY',
  renterOccupied: '44% (53,360 units)',
  unemployment: '2.7%',
  rentByType: {
    studio: { label: 'Studio', range: '$941\u2013$990', avg: 965 },
    oneBed: { label: '1-Bedroom', range: '$1,066\u2013$1,237', avg: 1149 },
    twoBed: { label: '2-Bedroom', range: '$1,322\u2013$1,409', avg: 1365 },
    threeBed: { label: '3-Bedroom', range: '$1,611\u2013$1,784', avg: 1697 },
    fourPlusBed: { label: '4+ Bedroom', range: '$1,650\u2013$2,114', avg: 1882 },
  },
} as const;

// ---------------------------------------------------------------------------
// Default Inputs (tuned for Lincoln, NE)
// ---------------------------------------------------------------------------

export function getDefaultInputs(): InvestmentInputs {
  return {
    purchasePrice: 250000,
    rehabCost: 0,
    closingCostPercent: 2.5,
    propertyType: 'single-family',
    downPaymentPercent: 20,
    interestRate: 6.0,
    loanTermYears: 30,
    monthlyGrossRent: 1400,
    otherMonthlyIncome: 0,
    annualPropertyTax: 250000 * 0.0155, // 1.55% of purchase price
    annualInsurance: 2800,
    monthlyMaintenance: Math.round((250000 * 0.01) / 12), // 1% annually / 12
    vacancyRatePercent: 5,
    managementFeePercent: 0,
    appreciationRatePercent: 3.5,
    rentIncreasePercent: 3.0,
  };
}

// ---------------------------------------------------------------------------
// Core Financial Formulas
// ---------------------------------------------------------------------------

/**
 * Standard amortization formula.
 *
 *   M = P * [r(1+r)^n] / [(1+r)^n - 1]
 *
 * where r = annualRate / 100 / 12 and n = termYears * 12.
 * Returns 0 when principal is 0.  Handles a 0% interest rate gracefully.
 */
export function calculateMonthlyMortgage(
  principal: number,
  annualRate: number,
  termYears: number,
): number {
  if (principal <= 0) return 0;

  const n = termYears * 12;
  if (n <= 0) return 0;

  // Edge case: 0% interest
  if (annualRate === 0) {
    return principal / n;
  }

  const r = annualRate / 100 / 12;
  const compounded = Math.pow(1 + r, n);
  return (principal * r * compounded) / (compounded - 1);
}

/**
 * Remaining loan balance after `monthsPaid` payments.
 *
 *   B = P * [(1+r)^n - (1+r)^p] / [(1+r)^n - 1]
 *
 * where p = monthsPaid.
 */
export function calculateLoanBalance(
  principal: number,
  annualRate: number,
  termYears: number,
  monthsPaid: number,
): number {
  if (principal <= 0) return 0;

  const n = termYears * 12;
  if (monthsPaid >= n) return 0;

  // Edge case: 0% interest — straight-line principal reduction
  if (annualRate === 0) {
    const paymentPerMonth = principal / n;
    const remaining = principal - paymentPerMonth * monthsPaid;
    return Math.max(0, remaining);
  }

  const r = annualRate / 100 / 12;
  const compoundedN = Math.pow(1 + r, n);
  const compoundedP = Math.pow(1 + r, monthsPaid);

  return (principal * (compoundedN - compoundedP)) / (compoundedN - 1);
}

/**
 * Build a detailed monthly income/expense breakdown from the provided inputs.
 */
export function calculateMonthlyBreakdown(inputs: InvestmentInputs): MonthlyBreakdown {
  const loanAmount = inputs.purchasePrice * (1 - inputs.downPaymentPercent / 100);

  const grossRent = inputs.monthlyGrossRent;
  const otherIncome = inputs.otherMonthlyIncome;
  const totalIncome = grossRent + otherIncome;
  const vacancyAllowance = totalIncome * (inputs.vacancyRatePercent / 100);
  const effectiveGrossIncome = totalIncome - vacancyAllowance;

  const mortgage = calculateMonthlyMortgage(loanAmount, inputs.interestRate, inputs.loanTermYears);
  const propertyTax = inputs.annualPropertyTax / 12;
  const insurance = inputs.annualInsurance / 12;
  const maintenance = inputs.monthlyMaintenance;
  const managementFee = effectiveGrossIncome * (inputs.managementFeePercent / 100);

  const totalExpenses = mortgage + propertyTax + insurance + maintenance + managementFee;
  const netCashFlow = effectiveGrossIncome - totalExpenses;

  return {
    grossRent,
    otherIncome,
    totalIncome,
    vacancyAllowance,
    effectiveGrossIncome,
    mortgage,
    propertyTax,
    insurance,
    maintenance,
    managementFee,
    totalExpenses,
    netCashFlow,
  };
}

/**
 * Master calculation — produces every metric the UI needs.
 */
export function calculateMetrics(inputs: InvestmentInputs): InvestmentMetrics {
  // --- Up-front costs ---
  const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
  const closingCosts = inputs.purchasePrice * (inputs.closingCostPercent / 100);
  const totalCashInvested = downPayment + closingCosts + inputs.rehabCost;

  // --- Loan ---
  const loanAmount = inputs.purchasePrice * (1 - inputs.downPaymentPercent / 100);
  const monthlyMortgagePayment = calculateMonthlyMortgage(
    loanAmount,
    inputs.interestRate,
    inputs.loanTermYears,
  );

  // --- Monthly breakdown (Year 1 / base) ---
  const monthlyBreakdown = calculateMonthlyBreakdown(inputs);
  const monthlyCashFlow = monthlyBreakdown.netCashFlow;
  const annualCashFlow = monthlyCashFlow * 12;

  // --- Cash-on-cash return ---
  const cashOnCashReturn =
    totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

  // --- NOI (Net Operating Income) ---
  // Annual effective gross income
  const annualEffectiveGrossIncome =
    (inputs.monthlyGrossRent + inputs.otherMonthlyIncome) *
    12 *
    (1 - inputs.vacancyRatePercent / 100);
  const annualManagementFee =
    annualEffectiveGrossIncome * (inputs.managementFeePercent / 100);
  const noi =
    annualEffectiveGrossIncome -
    inputs.annualPropertyTax -
    inputs.annualInsurance -
    inputs.monthlyMaintenance * 12 -
    annualManagementFee;

  // --- Cap rate ---
  const capRate = inputs.purchasePrice > 0 ? (noi / inputs.purchasePrice) * 100 : 0;

  // --- Gross rent multiplier ---
  const annualGrossRent = (inputs.monthlyGrossRent + inputs.otherMonthlyIncome) * 12;
  const grossRentMultiplier = annualGrossRent > 0 ? inputs.purchasePrice / annualGrossRent : 0;

  // --- Break-even occupancy ---
  // All monthly expenses excluding vacancy, divided by gross monthly income.
  // Management fee is calculated on effective (post-vacancy) income, but for
  // break-even purposes we use the management fee as computed (which already
  // accounts for the current vacancy assumption).
  const monthlyExpensesExVacancy =
    monthlyBreakdown.mortgage +
    monthlyBreakdown.propertyTax +
    monthlyBreakdown.insurance +
    monthlyBreakdown.maintenance +
    monthlyBreakdown.managementFee;
  const breakEvenOccupancy =
    monthlyBreakdown.totalIncome > 0
      ? (monthlyExpensesExVacancy / monthlyBreakdown.totalIncome) * 100
      : 0;

  // --- 5-Year Projection (Years 0-5) ---
  const fiveYearProjection: YearProjection[] = [];
  let cumulativeCashFlow = 0;

  for (let year = 0; year <= 5; year++) {
    const propertyValue =
      inputs.purchasePrice * Math.pow(1 + inputs.appreciationRatePercent / 100, year);
    const loanBalance = calculateLoanBalance(
      loanAmount,
      inputs.interestRate,
      inputs.loanTermYears,
      year * 12,
    );
    const equity = propertyValue - loanBalance;

    // Rent for this year: Year 0 and Year 1 use base rent (no increase yet).
    // Year N (N >= 2) uses base rent * (1 + rentIncrease)^(N-1).
    const rentMultiplier =
      year <= 1 ? 1 : Math.pow(1 + inputs.rentIncreasePercent / 100, year - 1);
    const yearMonthlyGrossRent = inputs.monthlyGrossRent * rentMultiplier;
    const yearMonthlyOtherIncome = inputs.otherMonthlyIncome * rentMultiplier;
    const yearTotalMonthlyIncome = yearMonthlyGrossRent + yearMonthlyOtherIncome;
    const annualRent = yearTotalMonthlyIncome * 12;

    // Recalculate cash flow for this year based on projected rent
    let yearAnnualCashFlow: number;
    if (year === 0) {
      yearAnnualCashFlow = 0;
    } else {
      const yearVacancy = yearTotalMonthlyIncome * (inputs.vacancyRatePercent / 100);
      const yearEGI = yearTotalMonthlyIncome - yearVacancy;
      const yearMgmtFee = yearEGI * (inputs.managementFeePercent / 100);
      const yearMonthlyExpenses =
        monthlyMortgagePayment +
        inputs.annualPropertyTax / 12 +
        inputs.annualInsurance / 12 +
        inputs.monthlyMaintenance +
        yearMgmtFee;
      yearAnnualCashFlow = (yearEGI - yearMonthlyExpenses) * 12;
    }

    cumulativeCashFlow += yearAnnualCashFlow;

    const totalReturn = equity + cumulativeCashFlow - totalCashInvested;
    const roi = totalCashInvested > 0 ? (totalReturn / totalCashInvested) * 100 : 0;

    fiveYearProjection.push({
      year,
      propertyValue: roundTwo(propertyValue),
      loanBalance: roundTwo(loanBalance),
      equity: roundTwo(equity),
      annualCashFlow: roundTwo(yearAnnualCashFlow),
      cumulativeCashFlow: roundTwo(cumulativeCashFlow),
      annualRent: roundTwo(annualRent),
      totalReturn: roundTwo(totalReturn),
      roi: roundTwo(roi),
    });
  }

  const fiveYearTotalROI = fiveYearProjection[5].roi;

  return {
    monthlyCashFlow: roundTwo(monthlyCashFlow),
    annualCashFlow: roundTwo(annualCashFlow),
    cashOnCashReturn: roundTwo(cashOnCashReturn),
    capRate: roundTwo(capRate),
    grossRentMultiplier: roundTwo(grossRentMultiplier),
    breakEvenOccupancy: roundTwo(breakEvenOccupancy),
    fiveYearTotalROI: roundTwo(fiveYearTotalROI),
    totalCashInvested: roundTwo(totalCashInvested),
    loanAmount: roundTwo(loanAmount),
    monthlyMortgagePayment: roundTwo(monthlyMortgagePayment),
    monthlyBreakdown: {
      grossRent: roundTwo(monthlyBreakdown.grossRent),
      otherIncome: roundTwo(monthlyBreakdown.otherIncome),
      totalIncome: roundTwo(monthlyBreakdown.totalIncome),
      vacancyAllowance: roundTwo(monthlyBreakdown.vacancyAllowance),
      effectiveGrossIncome: roundTwo(monthlyBreakdown.effectiveGrossIncome),
      mortgage: roundTwo(monthlyBreakdown.mortgage),
      propertyTax: roundTwo(monthlyBreakdown.propertyTax),
      insurance: roundTwo(monthlyBreakdown.insurance),
      maintenance: roundTwo(monthlyBreakdown.maintenance),
      managementFee: roundTwo(monthlyBreakdown.managementFee),
      totalExpenses: roundTwo(monthlyBreakdown.totalExpenses),
      netCashFlow: roundTwo(monthlyBreakdown.netCashFlow),
    },
    fiveYearProjection,
  };
}

// ---------------------------------------------------------------------------
// Metric Color Thresholds
// ---------------------------------------------------------------------------

/**
 * Return a traffic-light color for the given metric value.
 *
 * Color semantics follow real-estate investor conventions:
 *   green  = healthy / attractive
 *   yellow = marginal / watch closely
 *   red    = poor / risky
 */
export function getMetricColor(
  metricName:
    | 'monthlyCashFlow'
    | 'cashOnCashReturn'
    | 'capRate'
    | 'grossRentMultiplier'
    | 'breakEvenOccupancy'
    | 'fiveYearTotalROI',
  value: number,
): MetricColor {
  switch (metricName) {
    case 'monthlyCashFlow':
      if (value >= 0) return 'green';
      if (value >= -200) return 'yellow';
      return 'red';

    case 'cashOnCashReturn':
      if (value >= 8) return 'green';
      if (value >= 4) return 'yellow';
      return 'red';

    case 'capRate':
      if (value >= 7) return 'green';
      if (value >= 5) return 'yellow';
      return 'red';

    case 'grossRentMultiplier':
      // Lower is better
      if (value <= 12) return 'green';
      if (value <= 15) return 'yellow';
      return 'red';

    case 'breakEvenOccupancy':
      // Lower is better
      if (value <= 75) return 'green';
      if (value <= 90) return 'yellow';
      return 'red';

    case 'fiveYearTotalROI':
      if (value >= 40) return 'green';
      if (value >= 20) return 'yellow';
      return 'red';

    default:
      return 'yellow';
  }
}

// ---------------------------------------------------------------------------
// Education Callouts
// ---------------------------------------------------------------------------

/**
 * Produce context-sensitive educational callouts based on the computed metrics.
 * Each callout includes a CTA that links deeper into the site.
 */
export function getEducationCallouts(metrics: InvestmentMetrics): EducationCallout[] {
  const callouts: EducationCallout[] = [];

  if (metrics.monthlyCashFlow < 0) {
    callouts.push({
      type: 'info',
      title: 'Negative Cash Flow',
      message:
        'This property currently shows negative monthly cash flow. That does not necessarily ' +
        'make it a bad investment \u2014 equity growth through appreciation and mortgage paydown ' +
        'can still produce strong long-term returns. Consider adjusting the purchase price, ' +
        'increasing rent, or reducing expenses to improve cash flow.',
      ctaText: 'Talk to an Expert',
      ctaHref: '/about',
    });
  }

  if (metrics.capRate < 5) {
    callouts.push({
      type: 'warning',
      title: 'Low Cap Rate',
      message:
        'A cap rate below 5% suggests the property is priced high relative to its income. ' +
        'This is common in appreciating markets like Lincoln, but it means you are relying more ' +
        'on appreciation than on current income. Make sure the deal still works if appreciation ' +
        'slows down.',
      ctaText: 'Explore Lincoln Listings',
      ctaHref: '/sell-your-home',
    });
  }

  if (metrics.cashOnCashReturn > 10) {
    callouts.push({
      type: 'success',
      title: 'Strong Cash-on-Cash Return',
      message:
        'A cash-on-cash return above 10% is excellent. This property generates healthy ' +
        'income relative to the cash you have invested. Double-check your assumptions \u2014 if ' +
        'these numbers hold up, this could be a great deal.',
      ctaText: 'Get a Professional Analysis',
      ctaHref: '/about',
    });
  }

  if (metrics.breakEvenOccupancy > 85) {
    callouts.push({
      type: 'warning',
      title: 'Thin Vacancy Margin',
      message:
        'Your break-even occupancy is above 85%, meaning the property needs to stay nearly ' +
        'full to cover expenses. In Lincoln\u2019s market (average vacancy 4\u20137%), this may ' +
        'be manageable, but unexpected vacancies or maintenance could push you into negative ' +
        'cash flow. Building a cash reserve is strongly recommended.',
      ctaText: 'Talk to an Expert',
      ctaHref: '/about',
    });
  }

  if (metrics.grossRentMultiplier > 15) {
    callouts.push({
      type: 'warning',
      title: 'High Gross Rent Multiplier',
      message:
        'A GRM above 15 means it would take more than 15 years of gross rent to equal the ' +
        'purchase price. This indicates slower payback and may signal that the property is ' +
        'overpriced for its rental income. Consider negotiating the price down or looking for ' +
        'properties with stronger rent-to-price ratios.',
      ctaText: 'See Available Properties',
      ctaHref: '/sell-your-home',
    });
  }

  return callouts;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Round to two decimal places. */
function roundTwo(value: number): number {
  return Math.round(value * 100) / 100;
}
