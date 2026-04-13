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
import { FileText, MessageSquare, Copy, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const covenantRows = [
  { metric: 'DSCR', threshold: '≥ 1.20x', uw: '1.35x', current: '1.18x', variance: '−0.17x (−12.6%)', status: 'Breach Risk', trend: [1.35,1.32,1.28,1.24,1.21,1.18] },
  { metric: 'Occupancy Rate', threshold: '≥ 90%', uw: '95%', current: '88%', variance: '−7pp', status: 'Watch', trend: [95,94,93,91,90,88] },
  { metric: 'Net Operating Income', threshold: '≥ $440K', uw: '$465,000', current: '$412,800', variance: '−$52,200 (−11.2%)', status: 'Watch', trend: [465,460,452,440,430,412] },
  { metric: 'Avg Effective Rent/SF', threshold: '≥ $23.00', uw: '$24.50', current: '$22.80', variance: '−$1.70 (−6.9%)', status: 'Watch', trend: [24.5,24.2,23.9,23.5,23.1,22.8] },
  { metric: 'Property Tax Reserve', threshold: 'Funded', uw: '$38,000', current: '$41,200', variance: '+$3,200 (+8.4%)', status: 'OK', trend: [38,38.5,39,40,41,41.2] },
];

const sourceDocs = [
  { name: 'Q4_2024_OperatingStatement.pdf', extracted: 'Nov 15', confidence: 99 },
  { name: 'RentRoll_Dec2024.xlsx', extracted: 'Nov 15', confidence: 97 },
];

const statusBadge = (s: string) => {
  if (s === 'Breach Risk') return <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Breach Risk</span>;
  if (s === 'Watch') return <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Watch</span>;
  return <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">OK</span>;
};

// Mini sparkline as inline bars
const Sparkline = ({ values, neg }: { values: number[]; neg: boolean }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-[2px] h-[14px]">
      {values.map((v, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-sm ${neg ? 'bg-red-300' : 'bg-green-300'}`}
          style={{ height: `${Math.max(3, ((v - min) / range) * 14)}px` }}
        />
      ))}
    </div>
  );
};

export default function Wedge1() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-5">

        {/* Loan context header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">LN-4821</span>
              <span className="text-[11px] text-gray-400">·</span>
              <span className="text-[11px] text-gray-400">2200 Market St, San Francisco</span>
              <span className="text-[11px] text-gray-400">·</span>
              <span className="text-[11px] text-gray-400">Q4 2024 Submission</span>
            </div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Loan Underwriting & Asset Performance</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">Compare Q4 actuals to underwriting baseline · Surface covenant exceptions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
              <CheckCircle size={12} className="text-green-500" />
              <span>2 docs extracted · Nov 15 · 97% avg confidence</span>
            </div>
          </div>
        </div>

        {/* Exception banner — FIRST */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-[1px]" />
            <div>
              <p className="text-[13px] font-semibold text-red-800">2 covenant conditions require review based on Q4 2024 submission</p>
              <p className="text-[12px] text-red-700 mt-0.5">DSCR at 1.18x is below the 1.20x covenant threshold. Occupancy at 88% is below the 90% floor. Borrower explanation required within 30 days per Section 6.3.</p>
            </div>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0 gap-1.5 text-[12px]">
            <MessageSquare size={12} />
            Draft Borrower Request
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Current DSCR', value: '1.18x', sub: 'Covenant threshold: 1.20x', color: 'text-red-600', icon: '↓' },
            { label: 'Net Operating Income', value: '$412,800', sub: 'Underwritten: $465,000 (−11.2%)', color: 'text-amber-600', icon: '↓' },
            { label: 'Occupancy Rate', value: '88%', sub: 'Covenant floor: 90%', color: 'text-red-600', icon: '↓' },
            { label: 'Submission Status', value: '2 docs', sub: 'Last extracted Nov 15 · 97% confidence', color: 'text-green-600', icon: '✓' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-[11px] font-medium text-gray-500 mb-[6px]">{kpi.label}</p>
              <p className={`text-2xl font-bold leading-tight mb-[4px] ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[11px] text-gray-400 leading-4">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Covenant table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
            <p className="text-[13px] font-semibold text-gray-900">Covenant Test Results — Q4 2024 vs. Underwriting Baseline</p>
            <span className="text-[11px] text-gray-400">Updated Nov 15 from AI extraction</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Metric</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Covenant Threshold</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Underwritten</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Q4 2024 Actual</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Variance</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Trend</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Status</TableHead>
                <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {covenantRows.map((row) => (
                <TableRow key={row.metric} className="border-b border-gray-50">
                  <TableCell className="text-[13px] font-medium px-5 py-3">{row.metric}</TableCell>
                  <TableCell className="text-[12px] text-gray-500 px-3 py-3 font-mono">{row.threshold}</TableCell>
                  <TableCell className="text-[12px] text-gray-500 px-3 py-3">{row.uw}</TableCell>
                  <TableCell className={`text-[13px] font-semibold px-3 py-3 ${row.status === 'OK' ? 'text-gray-800' : row.status === 'Breach Risk' ? 'text-red-600' : 'text-amber-700'}`}>{row.current}</TableCell>
                  <TableCell className={`text-[12px] font-medium px-3 py-3 ${row.status === 'OK' ? 'text-green-600' : 'text-red-600'}`}>{row.variance}</TableCell>
                  <TableCell className="px-3 py-3">
                    <Sparkline values={row.trend} neg={row.status !== 'OK'} />
                  </TableCell>
                  <TableCell className="px-3 py-3">{statusBadge(row.status)}</TableCell>
                  <TableCell className="px-5 py-3">
                    {row.status !== 'OK' ? (
                      <Button variant="outline" size="sm" className="text-[11px] h-7 px-2.5 gap-1.5 text-gray-600">
                        <MessageSquare size={10} />
                        Request Explanation
                      </Button>
                    ) : (
                      <span className="text-[11px] text-gray-300">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* AI Commentary + Source Docs */}
        <div className="flex gap-4">
          {/* Commentary — promoted */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-gray-900">AI-Drafted Variance Commentary</p>
              <Badge variant="secondary" className="text-[10px]">Ready for investor report</Badge>
            </div>
            <p className="text-[12px] text-gray-600 leading-[1.65]">
              Q4 2024 NOI of $412,800 reflects a decline of $52,200 (11.2%) versus underwriting assumptions of $465,000.
              The primary driver is occupancy compression to 88% versus underwritten 95%, attributable to three tenant
              non-renewals in October. Effective rent per square foot held near expectations at $22.80 versus $24.50 underwritten.
              <br /><br />
              DSCR of 1.18x is below the 1.20x covenant threshold and below the underwritten 1.35x.
              The trajectory over the past four quarters shows consistent compression, warranting active monitoring
              and borrower engagement over the next two quarters. Tax reserve position remains adequate at $41,200
              versus the underwritten $38,000 requirement.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1.5 text-[12px]">
                <Copy size={11} />
                Copy to Investor Report
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 text-[12px]">
                <MessageSquare size={11} />
                Draft Borrower Letter
              </Button>
            </div>
          </div>

          {/* Source Documents — demoted */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 w-[280px] flex-shrink-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-gray-900">Source Documents</p>
              <Button variant="ghost" size="sm" className="text-[11px] h-6 px-2 text-gray-500">Upload New</Button>
            </div>
            <div className="flex flex-col gap-2">
              {sourceDocs.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                  <FileText size={14} className="text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-gray-700 font-medium truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-400">Extracted {doc.extracted}</span>
                      <span className="text-[10px] text-green-600 font-medium">{doc.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center gap-1.5 text-center">
                <Clock size={14} className="text-gray-300" />
                <p className="text-[11px] text-gray-400">Next submission due Jan 30</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
