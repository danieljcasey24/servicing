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
import { Download } from 'lucide-react';

const kpis = [
  { label: 'High Risk Loans', value: '11', sub: 'Delinquency probability >40%', color: 'text-red-600' },
  { label: 'Watch List', value: '23', sub: 'Trending negative indicators', color: 'text-amber-600' },
  { label: 'Performing', value: '53', sub: 'On track vs. baseline', color: 'text-gray-900' },
  { label: 'Avg Portfolio Risk Score', value: '34 / 100', sub: 'Up 8pts vs. last quarter', color: 'text-amber-600' },
];

const loanRows = [
  { id: 'LN-4821', property: '2200 Market, SF', score: 78, dscr: '1.18x ↓', signal: 'Vacancy +7pp vs. uw', status: 'High Risk' },
  { id: 'LN-3391', property: 'Oakview Apts, ATL', score: 71, dscr: '1.22x ↓', signal: 'Rent growth −6%', status: 'High Risk' },
  { id: 'LN-5502', property: 'Riviera Plaza, MIA', score: 65, dscr: '1.29x ↓', signal: 'Insurance +18%', status: 'High Risk' },
  { id: 'LN-2280', property: 'Sunset Office, LA', score: 58, dscr: '1.31x ↓', signal: 'Office vacancy 22%', status: 'Watch' },
  { id: 'LN-6710', property: 'Parkway Retail, DFW', score: 52, dscr: '1.33x →', signal: 'New supply nearby', status: 'Watch' },
  { id: 'LN-1920', property: 'Harbor View, SEA', score: 44, dscr: '1.38x ↑', signal: 'Stable, rents rising', status: 'Watch' },
  { id: 'LN-8801', property: 'Summit MF, Denver', score: 22, dscr: '1.52x ↑', signal: 'Occupancy at 97%', status: 'Performing' },
  { id: 'LN-7712', property: 'Lakeside Retail, CHI', score: 18, dscr: '1.61x ↑', signal: 'NOI +8% vs. uw', status: 'Performing' },
];

const signals = [
  { market: 'San Francisco, CA', signal: 'Office vacancy hit 35% — multifamily renter demand declining 8% YoY. 3 affected loans.', sev: 'High' },
  { market: 'Atlanta, GA', signal: 'New apartment supply +12,000 units in pipeline. Rent growth softening to 1.2%.', sev: 'Medium' },
  { market: 'Miami, FL', signal: 'Property insurance premiums up 22% due to hurricane risk repricing.', sev: 'High' },
  { market: 'Los Angeles, CA', signal: 'Commercial office market: 28% vacancy. Remote work normalization persisting.', sev: 'High' },
  { market: 'Dallas-Fort Worth, TX', signal: 'Retail absorption strong. New supply well-absorbed. Stable outlook.', sev: 'Low' },
  { market: 'Denver, CO', signal: 'Multifamily fundamentals strong. Job growth driving demand. Rents up 4.2%.', sev: 'Low' },
];

const statusColor = (s: string) =>
  s === 'High Risk' ? 'text-red-600' : s === 'Watch' ? 'text-amber-600' : 'text-green-600';

const scoreColor = (n: number) =>
  n >= 65 ? 'text-red-600' : n >= 40 ? 'text-amber-600' : 'text-green-600';

const sevColor = (s: string) =>
  s === 'High' ? 'text-red-600' : s === 'Medium' ? 'text-amber-600' : 'text-green-600';

const sevDot = (s: string) =>
  s === 'High' ? 'bg-red-500' : s === 'Medium' ? 'bg-amber-500' : 'bg-green-500';

export default function Wedge4() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Delinquency Prediction & Market Monitoring</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">
              AI-powered early warning system · External market signals · 87 active loans monitored
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-[13px]">
            <Download size={13} />
            Export Risk Report
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-[11px] font-medium text-gray-500 mb-[6px]">{kpi.label}</p>
              <p className={`text-2xl font-bold leading-tight mb-[4px] ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[11px] text-gray-400 leading-4">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Table + Signals */}
        <div className="flex gap-4">
          {/* Loan risk table */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden min-w-0">
            <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">Portfolio Risk Ranking</p>
              <Badge variant="outline" className="text-[11px]">Sorted by Risk Score</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Loan</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Property / Market</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Risk Score</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">DSCR Trend</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Key Signal</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanRows.map((row) => (
                  <TableRow key={row.id} className="border-b border-gray-50">
                    <TableCell className="text-[13px] font-medium px-5 py-3">{row.id}</TableCell>
                    <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.property}</TableCell>
                    <TableCell className={`text-[15px] font-bold px-3 py-3 ${scoreColor(row.score)}`}>{row.score}</TableCell>
                    <TableCell className="text-[13px] text-gray-600 px-3 py-3 font-mono">{row.dscr}</TableCell>
                    <TableCell className="text-[12px] text-gray-500 px-3 py-3">{row.signal}</TableCell>
                    <TableCell className="px-5 py-3">
                      <span className={`text-[12px] font-semibold ${statusColor(row.status)}`}>{row.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Market signals */}
          <div className="bg-white rounded-xl border border-gray-200 w-[360px] flex-shrink-0 flex flex-col overflow-hidden">
            <div className="px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">External Market Signals</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {signals.map((sig) => (
                <div key={sig.market} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${sevDot(sig.sev)}`} />
                    <span className="text-[12px] font-semibold text-gray-800">{sig.market}</span>
                    <span className={`text-[11px] font-semibold ml-auto ${sevColor(sig.sev)}`}>{sig.sev}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-[1.6] pl-[17px]">{sig.signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
