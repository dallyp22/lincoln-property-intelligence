import type { SellerReadinessResult } from '@/lib/engines/seller-readiness';
import type {
  InvestmentInputs,
  InvestmentMetrics,
  SavedScenario,
} from '@/lib/engines/investment-calculator';

function dateStamp(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function renderAndDownload(
  element: React.ReactElement,
  filename: string,
) {
  const { pdf } = await import('@react-pdf/renderer');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(element as any).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadSellerReadinessPdf(
  result: SellerReadinessResult,
  ownerName?: string,
  address?: string,
) {
  const { createElement } = await import('react');
  const { SellerReadinessReport } = await import('./SellerReadinessReport');
  const element = createElement(SellerReadinessReport, {
    result,
    ownerName,
    address,
  });
  await renderAndDownload(
    element,
    `Seller-Readiness-Score_${dateStamp()}.pdf`,
  );
}

export async function downloadInvestmentPdf(
  inputs: InvestmentInputs,
  metrics: InvestmentMetrics,
  scenarios?: SavedScenario[],
) {
  const { createElement } = await import('react');
  const { InvestmentReport } = await import('./InvestmentReport');
  const element = createElement(InvestmentReport, {
    inputs,
    metrics,
    scenarios,
  });
  await renderAndDownload(
    element,
    `Investment-Analysis_${dateStamp()}.pdf`,
  );
}
