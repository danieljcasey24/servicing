import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Upload } from 'lucide-react';

const kpis = [
  { label: 'Current DSCR', value: '1.18x', sub: 'Underwritten: 1.35x  ↓ −12.6%', warn: true },
  { label: 'Net Operating Income', value: '$412,800', sub: 'Underwritten: $465,000  ↓ −11.2%', warn: true },
  { label: 'Occupancy Rate', value: '88%', sub: 'Underwritten: 95%  ↓ −7pp', warn: true },
  { label: 'Outstanding Balance', value: '$14.2M', sub: 'Originated: $15.0M  ·  5.3% paid', warn: false },
];

const tableRows = [
  { metric: 'DSCR', uw: '1.35x', current: '1.18x', variance: '−0.17x (−12.6%)', status: 'Watch', neg: true },
  { metric: 'Net Operating Income', uw: '$465,000', current: '$412,800', variance: '−$52,200 (−11.2%)', status: 'Watch', neg: true },
  { metric: 'Occupancy Rate', uw: '95%', current: '88%', variance: '−7pp', status: 'Breach Risk', neg: true },
  { metric: 'Avg Effective Rent/SF', uw: '$24.50', current: '$22.80', variance: '−$1.70 (−6.9%)', status: 'Watch', neg: true },
  { metric: 'Property Tax Reserve', uw: '$38,000', current: '$41,200', variance: '+$3,200 (+8.4%)', status: 'OK', neg: false },
];

const uploadedFiles = [
  'Q4_2024_OperatingStatement.pdf',
  'RentRoll_Dec2024.xlsx',
];

const statusStyle = (s: string) => {
  if (s === 'OK') return 'text-green-600';
  if (s === 'Breach Risk') return 'text-red-600';
  return 'text-amber-600';
};

export default function Wedge1() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Loan Underwriting & Asset Performance</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">Upload loan docs and track performance vs. underwriting baseline</p>
          </div>
          <Button size="sm" className="gap-2 text-[13px]">
            <Upload size={13} />
            Upload Documents
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-[11px] font-medium text-gray-500 mb-[6px]">{kpi.label}</p>
              <p className={`text-2xl font-bold leading-tight mb-[4px] ${kpi.warn ? 'text-red-600' : 'text-gray-900'}`}>{kpi.value}</p>
              <p className="text-[11px] text-gray-400 leading-4">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Upload zone + Variance table */}
        <div className="flex gap-4">
          {/* Upload zone */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 w-[300px] flex-shrink-0 flex flex-col gap-4">
            <p className="text-[13px] font-semibold text-gray-900">Upload Loan Documents</p>
            <div className="border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 p-8 flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload size={16} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[13px] text-gray-600 font-medium">Drop files here</p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-4">Operating statements,<br />rent rolls & loan docs</p>
              </div>
              <Button variant="outline" size="sm" className="text-[12px]">Browse Files</Button>
            </div>
            <div className="flex flex-col gap-2">
              {uploadedFiles.map((f) => (
                <div key={f} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="w-[6px] h-[6px] rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-[12px] text-gray-700 truncate leading-none">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Variance table */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden min-w-0">
            <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">Performance vs. Underwriting Baseline</p>
              <Badge variant="secondary" className="text-[11px]">AI Analyzed</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Metric</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Underwritten</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Current</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Variance</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((row) => (
                  <TableRow key={row.metric} className="border-b border-gray-50">
                    <TableCell className="text-[13px] font-medium px-5 py-3">{row.metric}</TableCell>
                    <TableCell className="text-[13px] text-gray-500 px-3 py-3">{row.uw}</TableCell>
                    <TableCell className="text-[13px] text-gray-700 px-3 py-3">{row.current}</TableCell>
                    <TableCell className={`text-[13px] font-semibold px-3 py-3 ${row.neg ? 'text-red-600' : 'text-green-600'}`}>{row.variance}</TableCell>
                    <TableCell className="px-5 py-3">
                      <span className={`text-[12px] font-semibold ${statusStyle(row.status)}`}>{row.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* AI Alert */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-[13px] text-amber-800 leading-5">
            <span className="font-semibold">AI Alert:</span> Occupancy dropped 7pp below underwriting. DSCR trending toward covenant breach (threshold: 1.15x). Recommend borrower outreach.
          </p>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0 text-[12px]">
            Draft Outreach
          </Button>
        </div>

        {/* Chart + Commentary */}
        <div className="flex gap-4">
          {/* Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 mb-4">NOI & DSCR Trend — Actual vs. Underwriting</p>
            <div className="h-44 bg-gray-50 rounded-lg flex items-end gap-2 px-4 pb-4 pt-8 relative">
              {[180, 175, 165, 150, 138, 132].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-red-400"
                    style={{ height: `${h * 0.7}px` }}
                  />
                  <span className="text-[10px] text-gray-400">{["Q3'23", "Q4'23", "Q1'24", "Q2'24", "Q3'24", "Q4'24"][i]}</span>
                </div>
              ))}
              <div className="absolute top-3 left-4 flex gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-[2px] bg-blue-400 inline-block rounded" /> Underwritten
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-[2px] bg-red-400 inline-block rounded" /> Actual
                </span>
              </div>
            </div>
          </div>

          {/* Commentary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 w-[360px] flex-shrink-0 flex flex-col gap-4">
            <p className="text-[13px] font-semibold text-gray-900">AI-Drafted Variance Commentary</p>
            <p className="text-[12px] text-gray-600 leading-[1.6]">
              Q4 2024 NOI of $412,800 reflects a decline of $52,200 (11.2%) vs. underwriting assumptions.
              The primary driver is occupancy compression to 88% vs. underwritten 95%, partially attributable
              to 3 tenant non-renewals in October. Effective rent/SF held near expectations at $22.80 vs. $24.50 underwritten.
              <br /><br />
              DSCR of 1.18x remains above the covenant threshold of 1.15x, but trajectory warrants monitoring
              over the next 2 quarters.
            </p>
            <Button size="sm" variant="outline" className="self-start text-[12px]">Copy to Investor Report</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
