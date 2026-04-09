import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const kpis = [
  { label: 'Current DSCR', value: '1.18x', sub: 'Underwritten: 1.35x  ↓ -12.6%', warn: true },
  { label: 'Net Operating Income', value: '$412,800', sub: 'Underwritten: $465,000  ↓ -11.2%', warn: true },
  { label: 'Occupancy Rate', value: '88%', sub: 'Underwritten: 95%  ↓ -7pp', warn: true },
  { label: 'Outstanding Balance', value: '$14.2M', sub: 'Originated: $15.0M  ·  5.3% paid', warn: false },
];

const tableRows = [
  { metric: 'DSCR', uw: '1.35x', current: '1.18x', variance: '-0.17x (-12.6%)', status: 'Watch', negative: true },
  { metric: 'Net Operating Income', uw: '$465,000', current: '$412,800', variance: '-$52,200 (-11.2%)', status: 'Watch', negative: true },
  { metric: 'Occupancy Rate', uw: '95%', current: '88%', variance: '-7pp', status: 'Breach Risk', negative: true },
  { metric: 'Avg Effective Rent/SF', uw: '$24.50', current: '$22.80', variance: '-$1.70 (-6.9%)', status: 'Watch', negative: true },
  { metric: 'Property Tax Reserve', uw: '$38,000', current: '$41,200', variance: '+$3,200 (+8.4%)', status: 'OK', negative: false },
];

const uploadedFiles = [
  'Q4_2024_OperatingStatement.pdf',
  'RentRoll_Dec2024.xlsx',
];

export default function Wedge1() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Loan Underwriting & Asset Performance</h1>
            <p className="text-sm text-gray-500 mt-1">Upload loan docs and track performance vs. underwriting baseline</p>
          </div>
          <Button>Upload Documents</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-medium text-gray-500 mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold mb-1 ${kpi.warn ? 'text-red-600' : 'text-gray-900'}`}>{kpi.value}</p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div className="flex gap-4">
          {/* Upload zone */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-[340px] flex-shrink-0 flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-900">Upload Loan Documents</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-8 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl text-gray-300">↑</span>
              <p className="text-sm text-gray-500">Drop operating statements,<br />rent rolls & loan docs</p>
              <Button variant="outline" size="sm">Browse Files</Button>
            </div>
            <div className="flex flex-col gap-2">
              {uploadedFiles.map((f) => (
                <div key={f} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-800 truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Variance table */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Performance vs. Underwriting Baseline</p>
              <Badge>AI Analyzed</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Underwritten</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    <TableCell>{row.uw}</TableCell>
                    <TableCell>{row.current}</TableCell>
                    <TableCell className={row.negative ? 'text-red-600' : 'text-green-600'}>{row.variance}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium ${row.status === 'OK' ? 'text-green-600' : row.status === 'Breach Risk' ? 'text-red-600 font-semibold' : 'text-amber-600'}`}>
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* AI Alert */}
        <Alert className="border-amber-300 bg-amber-50">
          <AlertDescription className="text-amber-800 flex items-center justify-between">
            <span>
              <strong>AI Alert:</strong> Occupancy dropped 7pp below underwriting. DSCR trending toward covenant breach (threshold: 1.15x).
              Recommend borrower outreach.
            </span>
            <Button size="sm" className="ml-4 bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0">
              Draft Outreach
            </Button>
          </AlertDescription>
        </Alert>

        {/* Bottom row: Chart + Commentary */}
        <div className="flex gap-4">
          {/* Chart placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-4">NOI & DSCR Trend — Actual vs. Underwriting</p>
            <div className="h-44 bg-gray-50 rounded-lg flex items-end gap-2 p-4 relative">
              {/* Simplified bar/line chart visual */}
              {[180, 175, 165, 150, 138, 132].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-red-400 opacity-70 transition-all"
                    style={{ height: `${h * 0.7}px` }}
                  />
                  <span className="text-xs text-gray-400">{["Q3'23", "Q4'23", "Q1'24", "Q2'24", "Q3'24", "Q4'24"][i]}</span>
                </div>
              ))}
              <div className="absolute top-4 left-4 flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block" /> Underwritten</span>
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-400 inline-block" /> Actual</span>
              </div>
            </div>
          </div>

          {/* Commentary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-[400px] flex-shrink-0 flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-900">AI-Drafted Variance Commentary</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Q4 2024 NOI of $412,800 reflects a decline of $52,200 (11.2%) vs. underwriting assumptions.
              The primary driver is occupancy compression to 88% vs. underwritten 95%, partially attributable
              to 3 tenant non-renewals in October. Effective rent/SF held near expectations at $22.80 vs. $24.50 underwritten.
              <br /><br />
              DSCR of 1.18x remains above the covenant threshold of 1.15x, but trajectory warrants monitoring
              over the next 2 quarters.
            </p>
            <Button size="sm" className="self-start">Copy to Investor Report</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
