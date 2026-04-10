import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const rawLines = [
  'OPERATING STATEMENT',
  '2200 Market Street, SF',
  'Period: Oct–Dec 2024',
  '',
  'INCOME',
  'Rental Income ......... $48,200',
  'CAM Reimbursements .... $3,100',
  'Parking ............... $2,400',
  'Misc Income ........... $800',
  'TOTAL INCOME .......... $54,500',
  '',
  'EXPENSES',
  'Property Taxes ........ $9,800',
  'Insurance ............. $2,100',
  'Maintenance ........... $4,200',
  'Management Fee ........ $2,180',
  'Utilities ............. $3,100',
  'TOTAL EXPENSES ........ $21,380',
  '',
  'NET OPERATING ......... $33,120',
];

const extractedRows = [
  { field: 'Rental Income', value: '$192,800 (ann.)', confidence: '99%' },
  { field: 'CAM Reimbursements', value: '$12,400', confidence: '98%' },
  { field: 'Parking Revenue', value: '$9,600', confidence: '99%' },
  { field: 'Misc Income', value: '$3,200', confidence: '97%' },
  { field: 'Total Revenue', value: '$218,000', confidence: '99%' },
  { field: 'Property Taxes', value: '$39,200', confidence: '99%' },
  { field: 'Insurance', value: '$8,400', confidence: '98%' },
  { field: 'Maintenance', value: '$16,800', confidence: '96%' },
  { field: 'Mgmt Fee', value: '$8,720', confidence: '99%' },
  { field: 'Utilities', value: '$12,400', confidence: '99%' },
  { field: 'Total Expenses', value: '$85,520', confidence: '99%' },
  { field: 'NOI', value: '$132,480 (ann.)', confidence: '99%' },
  { field: 'DSCR (est.)', value: '1.18x', confidence: 'Calc.' },
];

const spreadRows = [
  { metric: 'Total Revenue', uw: '$232K', q3: '$224K', q4: '$218K', delta: '−2.7%', neg: true },
  { metric: 'NOI', uw: '$148K', q3: '$138K', q4: '$132K', delta: '−4.3%', neg: true },
  { metric: 'DSCR', uw: '1.35x', q3: '1.26x', q4: '1.18x', delta: '−0.08x', neg: true },
  { metric: 'Occupancy', uw: '95%', q3: '91%', q4: '88%', delta: '−3pp', neg: true },
  { metric: 'Eff. Rent/SF', uw: '$24.50', q3: '$23.80', q4: '$22.80', delta: '−$1.00', neg: true },
  { metric: 'OpEx Ratio', uw: '36%', q3: '38%', q4: '39%', delta: '+1pp', neg: false },
  { metric: 'Taxes', uw: '$38K', q3: '$39.2K', q4: '$39.2K', delta: '+3.2%', neg: false },
  { metric: 'Insurance', uw: '$8.0K', q3: '$8.4K', q4: '$8.4K', delta: '+5.0%', neg: false },
];

export default function Wedge3() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6 h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Asset Performance — Rent Roll Ingestion</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">
              2200 Market St, San Francisco · LN-4821 · Q4 2024 Submission
            </p>
          </div>
          <Badge className="mt-1 text-[11px]">AI Processed</Badge>
        </div>

        {/* Three-panel spread */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* Panel 1: Raw */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden flex flex-col min-w-0">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
              <p className="text-[13px] font-semibold text-gray-800">Raw Document (PDF)</p>
            </div>
            <div className="p-4 flex-1 bg-gray-50 overflow-y-auto">
              <pre className="text-[11px] text-gray-500 font-mono leading-[1.7] whitespace-pre-wrap">
                {rawLines.join('\n')}
              </pre>
            </div>
          </div>

          {/* Panel 2: AI Extraction */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden flex flex-col min-w-0">
            <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-blue-500 bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
              <p className="text-[13px] font-semibold text-gray-800">AI Extraction & Normalization</p>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Field</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Extracted Value</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedRows.map((row, i) => (
                    <tr key={row.field} className={`border-b border-gray-50 ${i % 2 === 1 ? 'bg-gray-50/60' : ''}`}>
                      <td className="px-4 py-2.5 text-[12px] text-gray-600">{row.field}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-900 font-medium">{row.value}</td>
                      <td className="px-4 py-2.5 text-[12px] text-green-600 font-medium">{row.confidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel 3: Spread */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden flex flex-col min-w-0">
            <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-green-600 bg-green-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                <p className="text-[13px] font-semibold text-gray-800">Spread — Prior vs. Current vs. UW</p>
              </div>
              <Button size="sm" variant="outline" className="text-[11px] h-7 px-2.5 gap-1.5">
                <Download size={11} />
                Export
              </Button>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Metric</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Underwritten</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Q3 2024</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Q4 2024</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-500">Δ QoQ</th>
                  </tr>
                </thead>
                <tbody>
                  {spreadRows.map((row, i) => (
                    <tr key={row.metric} className={`border-b border-gray-50 ${i % 2 === 1 ? 'bg-gray-50/60' : ''}`}>
                      <td className="px-4 py-2.5 text-[12px] text-gray-700 font-semibold">{row.metric}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-400">{row.uw}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-600">{row.q3}</td>
                      <td className="px-4 py-2.5 text-[12px] text-gray-900 font-semibold">{row.q4}</td>
                      <td className={`px-4 py-2.5 text-[12px] font-semibold ${row.neg ? 'text-red-600' : 'text-green-600'}`}>{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 bg-amber-50">
              <p className="text-[11px] text-amber-800 leading-[1.5]">
                ⚠ 4 metrics exceed 20% variance threshold. AI-drafted commentary ready for review.
              </p>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
