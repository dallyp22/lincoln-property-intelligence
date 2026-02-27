import { StyleSheet } from '@react-pdf/renderer';

// Brand colors
export const COLORS = {
  primary900: '#0f172a',
  primary700: '#334155',
  primary600: '#475569',
  primary500: '#1e3a5f',
  primary400: '#64748b',
  primary200: '#e2e8f0',
  secondary400: '#d4af37',
  accent500: '#0d9488',
  accent50: '#f0fdfa',
  surface50: '#f8fafc',
  surface200: '#e2e8f0',
  white: '#ffffff',
  emerald500: '#10b981',
  emerald50: '#ecfdf5',
  amber500: '#f59e0b',
  amber50: '#fffbeb',
  red500: '#ef4444',
  red50: '#fef2f2',
} as const;

// Shared styles
export const baseStyles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: COLORS.primary700,
    padding: 40,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary500,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary500,
  },
  headerSubtitle: {
    fontSize: 8,
    color: COLORS.primary400,
    marginTop: 2,
  },
  headerDate: {
    fontSize: 8,
    color: COLORS.primary400,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.surface200,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: COLORS.primary400,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
    marginBottom: 8,
    marginTop: 16,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary700,
    marginBottom: 6,
    marginTop: 12,
  },
  bodyText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: COLORS.primary600,
    marginBottom: 6,
  },
  // Table styles
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface200,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary500,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
  },
  tableCell: {
    fontSize: 9,
    color: COLORS.primary700,
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary900,
  },
  // Metric box
  metricBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.surface200,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    width: '48%',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  metricLabel: {
    fontSize: 8,
    color: COLORS.primary400,
    marginTop: 2,
  },
  // Priority badge
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
});

export function getScoreColor(score: number): string {
  if (score >= 80) return COLORS.emerald500;
  if (score >= 60) return COLORS.amber500;
  return COLORS.red500;
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return COLORS.emerald50;
  if (score >= 60) return COLORS.amber50;
  return COLORS.red50;
}
