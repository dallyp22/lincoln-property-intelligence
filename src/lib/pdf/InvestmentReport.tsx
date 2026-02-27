import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { InvestmentInputs, InvestmentMetrics, SavedScenario } from '@/lib/engines/investment-calculator';
import { getMetricColor } from '@/lib/engines/investment-calculator';
import { PdfHeader, PdfFooter, PdfSection, PdfTable, PdfMetricBox } from './components';
import { baseStyles, COLORS, getScoreColor } from './styles';

interface InvestmentReportProps {
  inputs: InvestmentInputs;
  metrics: InvestmentMetrics;
  scenarios?: SavedScenario[];
}

const s = StyleSheet.create({
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputItem: {
    width: '50%',
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  inputLabel: {
    fontSize: 7,
    color: COLORS.primary400,
  },
  inputValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
  },
  cashFlowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface200,
  },
  cashFlowLabel: {
    fontSize: 9,
    color: COLORS.primary700,
  },
  cashFlowValue: {
    fontSize: 9,
    color: COLORS.primary900,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: COLORS.surface50,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary500,
  },
  ctaSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.primary500,
    borderRadius: 6,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 9,
    color: COLORS.primary200,
    textAlign: 'center',
  },
});

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function colorForMetric(name: string, value: number): string {
  const color = getMetricColor(name as Parameters<typeof getMetricColor>[0], value);
  if (color === 'green') return COLORS.emerald500;
  if (color === 'yellow') return COLORS.amber500;
  return COLORS.red500;
}

export function InvestmentReport({
  inputs,
  metrics,
  scenarios,
}: InvestmentReportProps) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const bd = metrics.monthlyBreakdown;

  return (
    <Document>
      {/* Page 1: Summary + Key Metrics */}
      <Page size="A4" style={baseStyles.page}>
        <PdfHeader
          title="Investment Property Analysis"
          subtitle={`${formatCurrency(inputs.purchasePrice)} | ${inputs.propertyType}`}
          date={dateStr}
        />

        {/* Key Metrics */}
        <PdfSection title="Key Metrics">
          <View style={s.metricsGrid}>
            <PdfMetricBox
              label="Monthly Cash Flow"
              value={formatCurrency(metrics.monthlyCashFlow)}
              color={colorForMetric('monthlyCashFlow', metrics.monthlyCashFlow)}
            />
            <PdfMetricBox
              label="Cash-on-Cash Return"
              value={`${metrics.cashOnCashReturn.toFixed(1)}%`}
              color={colorForMetric('cashOnCashReturn', metrics.cashOnCashReturn)}
            />
            <PdfMetricBox
              label="Cap Rate"
              value={`${metrics.capRate.toFixed(1)}%`}
              color={colorForMetric('capRate', metrics.capRate)}
            />
            <PdfMetricBox
              label="Gross Rent Multiplier"
              value={`${metrics.grossRentMultiplier.toFixed(1)}x`}
              color={colorForMetric('grossRentMultiplier', metrics.grossRentMultiplier)}
            />
            <PdfMetricBox
              label="Break-Even Occupancy"
              value={`${metrics.breakEvenOccupancy.toFixed(0)}%`}
              color={colorForMetric('breakEvenOccupancy', metrics.breakEvenOccupancy)}
            />
            <PdfMetricBox
              label="5-Year ROI"
              value={`${metrics.fiveYearTotalROI.toFixed(1)}%`}
              color={colorForMetric('fiveYearTotalROI', metrics.fiveYearTotalROI)}
            />
          </View>
        </PdfSection>

        {/* Property & Financing Inputs */}
        <PdfSection title="Property & Financing">
          <View style={s.inputsGrid}>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Purchase Price</Text>
              <Text style={s.inputValue}>{formatCurrency(inputs.purchasePrice)}</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Rehab Cost</Text>
              <Text style={s.inputValue}>{formatCurrency(inputs.rehabCost)}</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Down Payment</Text>
              <Text style={s.inputValue}>{inputs.downPaymentPercent}%</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Interest Rate</Text>
              <Text style={s.inputValue}>{inputs.interestRate}%</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Loan Term</Text>
              <Text style={s.inputValue}>{inputs.loanTermYears} years</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Total Cash Invested</Text>
              <Text style={s.inputValue}>{formatCurrency(metrics.totalCashInvested)}</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Loan Amount</Text>
              <Text style={s.inputValue}>{formatCurrency(metrics.loanAmount)}</Text>
            </View>
            <View style={s.inputItem}>
              <Text style={s.inputLabel}>Monthly Mortgage</Text>
              <Text style={s.inputValue}>{formatCurrency(metrics.monthlyMortgagePayment)}</Text>
            </View>
          </View>
        </PdfSection>

        {/* Cash Flow Breakdown */}
        <PdfSection title="Monthly Cash Flow Breakdown">
          <View style={[s.cashFlowRow, { backgroundColor: COLORS.emerald50 }]}>
            <Text style={[s.cashFlowLabel, { fontFamily: 'Helvetica-Bold' }]}>Gross Rent</Text>
            <Text style={s.cashFlowValue}>{formatCurrency(bd.grossRent)}</Text>
          </View>
          {bd.otherIncome > 0 && (
            <View style={s.cashFlowRow}>
              <Text style={s.cashFlowLabel}>Other Income</Text>
              <Text style={s.cashFlowValue}>{formatCurrency(bd.otherIncome)}</Text>
            </View>
          )}
          <View style={s.cashFlowRow}>
            <Text style={s.cashFlowLabel}>Less: Vacancy ({inputs.vacancyRatePercent}%)</Text>
            <Text style={[s.cashFlowValue, { color: COLORS.red500 }]}>
              ({formatCurrency(bd.vacancyAllowance)})
            </Text>
          </View>
          <View style={s.totalRow}>
            <Text style={[s.cashFlowLabel, { fontFamily: 'Helvetica-Bold' }]}>
              Effective Gross Income
            </Text>
            <Text style={[s.cashFlowValue, { fontFamily: 'Helvetica-Bold' }]}>
              {formatCurrency(bd.effectiveGrossIncome)}
            </Text>
          </View>

          <View style={[s.cashFlowRow, { marginTop: 4 }]}>
            <Text style={s.cashFlowLabel}>Mortgage P&amp;I</Text>
            <Text style={s.cashFlowValue}>{formatCurrency(bd.mortgage)}</Text>
          </View>
          <View style={s.cashFlowRow}>
            <Text style={s.cashFlowLabel}>Property Tax</Text>
            <Text style={s.cashFlowValue}>{formatCurrency(bd.propertyTax)}</Text>
          </View>
          <View style={s.cashFlowRow}>
            <Text style={s.cashFlowLabel}>Insurance</Text>
            <Text style={s.cashFlowValue}>{formatCurrency(bd.insurance)}</Text>
          </View>
          <View style={s.cashFlowRow}>
            <Text style={s.cashFlowLabel}>Maintenance</Text>
            <Text style={s.cashFlowValue}>{formatCurrency(bd.maintenance)}</Text>
          </View>
          {bd.managementFee > 0 && (
            <View style={s.cashFlowRow}>
              <Text style={s.cashFlowLabel}>Management ({inputs.managementFeePercent}%)</Text>
              <Text style={s.cashFlowValue}>{formatCurrency(bd.managementFee)}</Text>
            </View>
          )}
          <View style={s.totalRow}>
            <Text style={[s.cashFlowLabel, { fontFamily: 'Helvetica-Bold' }]}>
              Total Expenses
            </Text>
            <Text style={[s.cashFlowValue, { fontFamily: 'Helvetica-Bold' }]}>
              {formatCurrency(bd.totalExpenses)}
            </Text>
          </View>

          <View style={[s.totalRow, { backgroundColor: bd.netCashFlow >= 0 ? COLORS.emerald50 : COLORS.red50, marginTop: 4, borderBottomColor: bd.netCashFlow >= 0 ? COLORS.emerald500 : COLORS.red500 }]}>
            <Text style={[s.cashFlowLabel, { fontFamily: 'Helvetica-Bold', fontSize: 10 }]}>
              Net Cash Flow
            </Text>
            <Text style={[s.cashFlowValue, { fontFamily: 'Helvetica-Bold', fontSize: 10, color: bd.netCashFlow >= 0 ? COLORS.emerald500 : COLORS.red500 }]}>
              {formatCurrency(bd.netCashFlow)}/mo ({formatCurrency(bd.netCashFlow * 12)}/yr)
            </Text>
          </View>
        </PdfSection>

        <PdfFooter />
      </Page>

      {/* Page 2: 5-Year Projection + Scenarios */}
      <Page size="A4" style={baseStyles.page}>
        <PdfHeader title="5-Year Projection" date={dateStr} />

        <PdfTable
          headers={['Year', 'Property Value', 'Loan Balance', 'Equity', 'Cash Flow', 'Total Return', 'ROI']}
          columnWidths={['10%', '17%', '17%', '15%', '14%', '14%', '13%']}
          rows={metrics.fiveYearProjection
            .filter((p) => p.year > 0)
            .map((p) => [
              `${p.year}`,
              formatCurrency(p.propertyValue),
              formatCurrency(p.loanBalance),
              formatCurrency(p.equity),
              formatCurrency(p.cumulativeCashFlow),
              formatCurrency(p.totalReturn),
              `${p.roi.toFixed(1)}%`,
            ])}
        />

        {/* Scenario Comparison */}
        {scenarios && scenarios.length >= 2 && (
          <>
            <PdfSection title="Scenario Comparison">
              <PdfTable
                headers={['Metric', ...scenarios.map((s) => s.name)]}
                columnWidths={['30%', ...scenarios.map(() => `${70 / scenarios.length}%`)]}
                rows={[
                  ['Purchase Price', ...scenarios.map((s) => formatCurrency(s.inputs.purchasePrice))],
                  ['Monthly Rent', ...scenarios.map((s) => formatCurrency(s.inputs.monthlyGrossRent))],
                  ['Cash Flow', ...scenarios.map((s) => formatCurrency(s.metrics.monthlyCashFlow))],
                  ['Cash-on-Cash', ...scenarios.map((s) => `${s.metrics.cashOnCashReturn.toFixed(1)}%`)],
                  ['Cap Rate', ...scenarios.map((s) => `${s.metrics.capRate.toFixed(1)}%`)],
                  ['5-Year ROI', ...scenarios.map((s) => `${s.metrics.fiveYearTotalROI.toFixed(1)}%`)],
                ]}
              />
            </PdfSection>
          </>
        )}

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>
            Ready to Analyze a Specific Property?
          </Text>
          <Text style={s.ctaText}>
            Contact Marion for a professional, inspection-informed evaluation of
            any Lincoln investment property.
          </Text>
          <Text style={[s.ctaText, { marginTop: 8, fontFamily: 'Helvetica-Bold' }]}>
            lincolnpropertyintelligence.com/invest-in-lincoln
          </Text>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
