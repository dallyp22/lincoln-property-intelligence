import { View, Text } from '@react-pdf/renderer';
import { baseStyles, COLORS } from './styles';

interface PdfHeaderProps {
  title: string;
  subtitle?: string;
  date: string;
}

export function PdfHeader({ title, subtitle, date }: PdfHeaderProps) {
  return (
    <View style={baseStyles.header}>
      <View>
        <Text style={baseStyles.headerTitle}>{title}</Text>
        {subtitle && <Text style={baseStyles.headerSubtitle}>{subtitle}</Text>}
      </View>
      <View>
        <Text style={baseStyles.headerDate}>{date}</Text>
        <Text style={baseStyles.headerDate}>Lincoln Property Intelligence</Text>
      </View>
    </View>
  );
}

interface PdfFooterProps {
  pageLabel?: string;
}

export function PdfFooter({ pageLabel }: PdfFooterProps) {
  return (
    <View style={baseStyles.footer} fixed>
      <Text style={baseStyles.footerText}>
        Home Design Real Estate Group of HOME Real Estate
      </Text>
      <Text style={baseStyles.footerText}>
        {pageLabel ?? 'lincolnpropertyintelligence.com'}
      </Text>
      <Text style={baseStyles.footerText}>
        Marion: (402) 309-3134 | Shawndel: (402) 429-1523
      </Text>
    </View>
  );
}

interface PdfSectionProps {
  title: string;
  children: React.ReactNode;
}

export function PdfSection({ title, children }: PdfSectionProps) {
  return (
    <View>
      <Text style={baseStyles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

interface PdfMetricBoxProps {
  label: string;
  value: string;
  color?: string;
}

export function PdfMetricBox({ label, value, color }: PdfMetricBoxProps) {
  return (
    <View style={baseStyles.metricBox}>
      <Text style={[baseStyles.metricValue, { color: color ?? COLORS.primary900 }]}>
        {value}
      </Text>
      <Text style={baseStyles.metricLabel}>{label}</Text>
    </View>
  );
}

interface PdfTableProps {
  headers: string[];
  rows: string[][];
  columnWidths?: string[];
}

export function PdfTable({ headers, rows, columnWidths }: PdfTableProps) {
  const widths = columnWidths ?? headers.map(() => `${100 / headers.length}%`);

  return (
    <View>
      {/* Header row */}
      <View style={baseStyles.tableHeaderRow}>
        {headers.map((header, i) => (
          <View key={i} style={{ width: widths[i] }}>
            <Text style={baseStyles.tableHeaderText}>{header}</Text>
          </View>
        ))}
      </View>
      {/* Data rows */}
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            baseStyles.tableRow,
            rowIndex % 2 === 0
              ? { backgroundColor: COLORS.white }
              : { backgroundColor: COLORS.surface50 },
          ]}
        >
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={{ width: widths[cellIndex] }}>
              <Text
                style={
                  cellIndex === 0 ? baseStyles.tableCellBold : baseStyles.tableCell
                }
              >
                {cell}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

interface PdfPriorityBadgeProps {
  priority: 'High' | 'Medium' | 'Low';
}

export function PdfPriorityBadge({ priority }: PdfPriorityBadgeProps) {
  const colorMap = {
    High: { bg: COLORS.red50, text: COLORS.red500 },
    Medium: { bg: COLORS.amber50, text: COLORS.amber500 },
    Low: { bg: COLORS.emerald50, text: COLORS.emerald500 },
  };
  const colors = colorMap[priority];

  return (
    <Text
      style={[
        baseStyles.badge,
        { backgroundColor: colors.bg, color: colors.text },
      ]}
    >
      {priority}
    </Text>
  );
}
