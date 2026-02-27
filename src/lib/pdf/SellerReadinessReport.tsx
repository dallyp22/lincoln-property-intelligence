import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { SellerReadinessResult } from '@/lib/engines/seller-readiness';
import { PdfHeader, PdfFooter, PdfSection, PdfTable, PdfPriorityBadge } from './components';
import { baseStyles, COLORS, getScoreColor, getScoreBgColor } from './styles';

interface SellerReadinessReportProps {
  result: SellerReadinessResult;
  ownerName?: string;
  address?: string;
}

const s = StyleSheet.create({
  scoreHero: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    backgroundColor: COLORS.surface50,
    borderRadius: 6,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Helvetica-Bold',
  },
  scoreGrade: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
    marginTop: 4,
  },
  scoreLabel: {
    fontSize: 10,
    color: COLORS.primary400,
    marginTop: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface200,
  },
  categoryName: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
  },
  categoryBar: {
    width: '40%',
    height: 8,
    backgroundColor: COLORS.surface200,
    borderRadius: 4,
  },
  categoryBarFill: {
    height: 8,
    borderRadius: 4,
  },
  categoryScore: {
    width: '15%',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  categoryWeight: {
    width: '15%',
    fontSize: 8,
    color: COLORS.primary400,
    textAlign: 'right',
  },
  recCard: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.surface200,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  recTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 8,
    color: COLORS.primary600,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  recMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  recMetaItem: {
    fontSize: 7,
    color: COLORS.primary400,
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

export function SellerReadinessReport({
  result,
  ownerName,
  address,
}: SellerReadinessReportProps) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Page 1: Score Summary */}
      <Page size="A4" style={baseStyles.page}>
        <PdfHeader
          title="Seller Readiness Score Report"
          subtitle={
            ownerName
              ? `Prepared for ${ownerName}${address ? ` — ${address}` : ''}`
              : undefined
          }
          date={dateStr}
        />

        {/* Score Hero */}
        <View style={s.scoreHero}>
          <Text style={[s.scoreValue, { color: getScoreColor(result.totalScore) }]}>
            {result.totalScore}
          </Text>
          <Text style={s.scoreGrade}>{result.grade}</Text>
          <Text style={s.scoreLabel}>{result.gradeLabel}</Text>
          <Text style={[baseStyles.bodyText, { marginTop: 8, textAlign: 'center' }]}>
            Based on current Lincoln, NE market conditions as of{' '}
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </View>

        {/* Category Breakdown */}
        <PdfSection title="Category Breakdown">
          {result.categories.map((cat) => (
            <View key={cat.category} style={s.categoryRow}>
              <Text style={s.categoryName}>{cat.label}</Text>
              <View style={s.categoryBar}>
                <View
                  style={[
                    s.categoryBarFill,
                    {
                      width: `${Math.min(100, cat.score)}%`,
                      backgroundColor: getScoreColor(cat.score),
                    },
                  ]}
                />
              </View>
              <Text style={[s.categoryScore, { color: getScoreColor(cat.score) }]}>
                {cat.score}
              </Text>
              <Text style={s.categoryWeight}>
                {Math.round(cat.weight * 100)}%
              </Text>
            </View>
          ))}
        </PdfSection>

        {/* Category Interpretations */}
        <PdfSection title="Category Analysis">
          {result.categories.map((cat) => (
            <View key={cat.category} style={{ marginBottom: 6 }}>
              <Text style={baseStyles.sectionSubtitle}>
                {cat.label} — {cat.grade} ({cat.score}/100)
              </Text>
              <Text style={baseStyles.bodyText}>{cat.interpretation}</Text>
            </View>
          ))}
        </PdfSection>

        <PdfFooter />
      </Page>

      {/* Page 2: Recommendations */}
      {result.topImprovements.length > 0 && (
        <Page size="A4" style={baseStyles.page}>
          <PdfHeader title="Improvement Recommendations" date={dateStr} />

          <Text style={baseStyles.bodyText}>
            The following improvements are recommended based on your score. They are
            prioritized by potential impact on your sale price and time on market in
            the Lincoln, NE market.
          </Text>

          {result.topImprovements.map((rec, i) => (
            <View key={i} style={s.recCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={s.recTitle}>{rec.title}</Text>
                <PdfPriorityBadge priority={rec.priority} />
              </View>
              <Text style={s.recDescription}>{rec.description}</Text>
              <View style={s.recMeta}>
                <Text style={s.recMetaItem}>Est. Cost: {rec.estimatedCost}</Text>
                <Text style={s.recMetaItem}>Est. ROI: {rec.estimatedROI}</Text>
              </View>
            </View>
          ))}

          {/* CTA */}
          <View style={s.ctaSection}>
            <Text style={s.ctaTitle}>
              Ready for a Professional Assessment?
            </Text>
            <Text style={s.ctaText}>
              Schedule your complimentary Polivka Property Assessment for a
              comprehensive, in-person evaluation of your home.
            </Text>
            <Text style={[s.ctaText, { marginTop: 8, fontFamily: 'Helvetica-Bold' }]}>
              lincolnpropertyintelligence.com/sell-your-home
            </Text>
          </View>

          <PdfFooter />
        </Page>
      )}
    </Document>
  );
}
