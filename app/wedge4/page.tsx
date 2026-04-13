import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bell, ArrowUpRight, ArrowDownRight, Minus, ExternalLink } from 'lucide-react';

const kpis = [
  { label: 'High Risk Loans', value: '11', delta: '+3 this week', color: 'text-red-600', deltaColor: 'text-red-500', up: true },
  { label: 'Watch List', value: '23', delta: '+5 this week', color: 'text-amber-600', deltaColor: 'text-amber-500', up: true },
  { label: 'Performing', value: '53', delta: '−8 vs. last week', color: 'text-gray-900', deltaColor: 'text-gray-400', up: false },
  { label: 'Avg Portfolio Risk Score', value: '34 / 100', delta: '↑ 8pts vs. last quarter', color: 'text-amber-600', deltaColor: 'text-amber-500', up: true },
];

const loanRows = [
  { id: 'LN-4821', property: '2200 Market, SF', score: 78, movement: 'up', dscr: '1.18x', signal: 'Vacancy +7pp vs. uw', status: 'High Risk', suggestedAction: 'Send Watch Notice' },
  { id: 'LN-3391', property: 'Oakview Apts, ATL', score: 71, movement: 'up', dscr: '1.22x', signal: 'Rent growth −6%', status: 'High Risk', suggestedAction: 'Send Watch Notice' },
  { id: 'LN-5502', property: 'Riviera Plaza, MIA', score: 65, movement: 'up', dscr: '1.29x', signal: 'Insurance +18%', status: 'High Risk', suggestedAction: 'Review Covenant' },
  { id: 'LN-2280', property: 'Sunset Office, LA', score: 58, movement: 'same', dscr: '1.31x', signal: 'Office vacancy 22%', status: 'Watch', suggestedAction: 'Monitor' },
  { id: 'LN-6710', property: 'Parkway Retail, DFW', score: 52, movement: 'same', dscr: '1.33x', signal: 'New supply nearby', status: 'Watch', suggestedAction: 'Monitor' },
  { id: 'LN-1920', property: 'Harbor View, SEA', score: 44, movement: 'down', dscr: '1.38x', signal: 'Stable, rents rising', status: 'Watch', suggestedAction: 'No action needed' },
  { id: 'LN-8801', property: 'Summit MF, Denver', score: 22, movement: 'down', dscr: '1.52x', signal: 'Occupancy at 97%', status: 'Performing', suggestedAction: 'No action needed' },
  { id: 'LN-7712', property: 'Lakeside Retail, CHI', score: 18, movement: 'same', dscr: '1.61x', signal: 'NOI +8% vs. uw', status: 'Performing', suggestedAction: 'No action needed' },
];

const signals = [
  { market: 'San Francisco, CA', signal: 'Office vacancy hit 35% — multifamily renter demand declining 8% YoY.', sev: 'High', affected: 3 },
  { market: 'Miami, FL', signal: 'Property insurance premiums up 22% due to hurricane risk repricing.', sev: 'High', affected: 1 },
  { market: 'Los Angeles, CA', signal: 'Commercial office: 28% vacancy. Remote work normalization persisting.', sev: 'High', affected: 1 },
  { market: 'Atlanta, GA', signal: 'New apartment supply +12,000 units in pipeline. Rent growth softening to 1.2%.', sev: 'Medium', affected: 1 },
  { market: 'Dallas-Fort Worth, TX', signal: 'Retail absorption strong. New supply well-absorbed. Stable outlook.', sev: 'Low', affected: 1 },
  { market: 'Denver, CO', signal: 'Multifamily fundamentals strong. Job growth driving demand. Rents up 4.2%.', sev: 'Low', affected: 1 },
];

const statusColor = (s: string) => s === 'High Risk' ? 'text-red-600' : s === 'Watch' ? 'text-amber-600' : 'text-green-600';
const scoreColor = (n: number) => n >= 65 ? 'text-red-600' : n >= 40 ? 'text-amber-600' : 'text-green-600';
const sevDot = (s: string) => s === 'High' ? 'bg-red-500' : s === 'Medium' ? 'bg-amber-500' : 'bg-green-500';
const sevColor = (s: string) => s === 'High' ? 'text-red-600' : s === 'Medium' ? 'text-amber-600' : 'text-green-600';

const MovementIcon = ({ dir }: { dir: string }) => {
  if (dir === 'up') return <ArrowUpRight size={13} className="text-red-500" />;
  if (dir === 'down') return <ArrowDownRight size={13} className="text-green-500" />;
  return <Minus size={13} className="text-gray-300" />;
};

const watchCount = loanRows.filter(r => r.status === 'High Risk' || r.status === 'Watch').length;

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
          <Button size="sm" className="gap-2 text-[13px]">
            <Bell size={13} />
            Send Watch Notices ({watchCount})
          </Button>
        </div>

        {/* Movement banner */}
        <div className="flex items-center gap-6 px-4 py-3 bg-white border border-gray-200 rounded-xl">
          <p className="text-[12px] font-semibold text-gray-600">This week:</p>
          <div className="flex items-center gap-1.5 text-[12px]">
            <ArrowUpRight size={13} className="text-red-500" />
            <span className="text-red-600 font-semibold">3 loans moved to High Risk</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-[12px]">
            <ArrowUpRight size={13} className="text-amber-500" />
            <span className="text-amber-600 font-semibold">5 loans moved to Watch</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 text-[12px]">
            <ArrowDownRight size={13} className="text-green-500" />
            <span className="text-green-600 font-semibold">2 loans improved</span>
          </div>
          <div className="ml-auto text-[11px] text-gray-400">Score last updated Apr 13 · Powered by AI + CoStar feeds</div>
        </div>

        {/* KPI Cards with deltas */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-[11px] font-medium text-gray-500 mb-[6px]">{kpi.label}</p>
              <p className={`text-2xl font-bold leading-tight mb-[4px] ${kpi.color}`}>{kpi.value}</p>
              <p className={`text-[11px] leading-4 font-medium ${kpi.deltaColor}`}>{kpi.delta}</p>
            </div>
          ))}
        </div>

        {/* Table + Signals */}
        <div className="flex gap-4">
          {/* Risk table */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden min-w-0">
            <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">Portfolio Risk Ranking</p>
              <span className="text-[11px] text-gray-400">↑↓ = moved this week · Score: DSCR + Market + Occupancy factors</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Loan</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Property / Market</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Risk Score</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Movement</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">DSCR</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Key Signal</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Status</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanRows.map((row) => (
                  <TableRow key={row.id} className="border-b border-gray-50">
                    <TableCell className="text-[13px] font-medium px-5 py-3">{row.id}</TableCell>
                    <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.property}</TableCell>
                    <TableCell className={`text-[15px] font-bold px-3 py-3 ${scoreColor(row.score)}`}>{row.score}</TableCell>
                    <TableCell className="px-3 py-3"><MovementIcon dir={row.movement} /></TableCell>
                    <TableCell className="text-[12px] text-gray-600 px-3 py-3 font-mono">{row.dscr}</TableCell>
                    <TableCell className="text-[12px] text-gray-500 px-3 py-3">{row.signal}</TableCell>
                    <TableCell className="px-3 py-3">
                      <span className={`text-[12px] font-semibold ${statusColor(row.status)}`}>{row.status}</span>
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      {row.suggestedAction !== 'No action needed' ? (
                        <Button variant="ghost" size="sm" className="text-[11px] h-7 px-2 gap-1 text-blue-600 hover:bg-blue-50">
                          {row.suggestedAction}
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

          {/* Market signals with affected loan counts */}
          <div className="bg-white rounded-xl border border-gray-200 w-[340px] flex-shrink-0 flex flex-col overflow-hidden">
            <div className="px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">External Market Signals</p>
              <p className="text-[11px] text-gray-400 mt-0.5">CoStar · MSCI · Local tax assessment feeds</p>
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
                  <div className="pl-[17px] mt-1.5">
                    <button className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                      <ExternalLink size={9} />
                      {sig.affected} loan{sig.affected > 1 ? 's' : ''} affected — view
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
