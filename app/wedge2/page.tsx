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
  { label: 'Total Escrow Balance', value: '$12.4M', sub: 'Across 87 active loans', warn: false },
  { label: 'Projected Shortfall', value: '$5.0M', sub: '23 loans at risk', warn: true },
  { label: 'Tax Disbursements Due', value: '$2.1M', sub: 'Next 60 days', warn: true },
  { label: 'Insurance Renewals', value: '14 loans', sub: 'Expiring this quarter', warn: true },
];

const loanRows = [
  { id: 'LN-4821', property: '2200 Market St, SF', reserve: '$82,000', projected: '$127,400', shortfall: '-$45,400', risk: 'High' },
  { id: 'LN-3391', property: 'Oakview Apts, ATL', reserve: '$41,000', projected: '$68,200', shortfall: '-$27,200', risk: 'High' },
  { id: 'LN-5502', property: 'Riviera Plaza, MIA', reserve: '$96,000', projected: '$121,000', shortfall: '-$25,000', risk: 'Medium' },
  { id: 'LN-2280', property: 'Sunset Office, LA', reserve: '$33,000', projected: '$54,800', shortfall: '-$21,800', risk: 'Medium' },
  { id: 'LN-6710', property: 'Parkway Retail, DFW', reserve: '$58,000', projected: '$76,500', shortfall: '-$18,500', risk: 'Medium' },
  { id: 'LN-1920', property: 'Harbor View, SEA', reserve: '$44,000', projected: '$59,200', shortfall: '-$15,200', risk: 'Low' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const reserveHeights = [180, 175, 170, 165, 160, 155];
const predictedHeights = [180, 188, 200, 215, 228, 248];

export default function Wedge2() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Escrow Administration — Taxes & Insurance</h1>
            <p className="text-sm text-gray-500 mt-1">Forecast shortfalls · Track disbursements · Monitor insurance renewals</p>
          </div>
          <Button>Run Forecast</Button>
        </div>

        {/* Alert */}
        <Alert className="border-red-300 bg-red-50">
          <AlertDescription className="text-red-800">
            <strong>Projected shortfall of $5.0M across portfolio</strong> — AI detected 23 loans with tax/insurance cost
            spikes exceeding reserve coverage. Immediate review recommended.
          </AlertDescription>
        </Alert>

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

        {/* Table + Chart */}
        <div className="flex gap-4">
          {/* Loans table */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Loans with Projected Escrow Shortfall</p>
              <span className="text-sm text-red-600 font-medium">23 loans</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Reserve Bal.</TableHead>
                  <TableHead>Projected Cost</TableHead>
                  <TableHead>Shortfall</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-xs">{row.id}</TableCell>
                    <TableCell className="text-xs">{row.property}</TableCell>
                    <TableCell className="text-xs">{row.reserve}</TableCell>
                    <TableCell className="text-xs">{row.projected}</TableCell>
                    <TableCell className="text-xs text-red-600 font-medium">{row.shortfall}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium ${row.risk === 'High' ? 'text-red-600' : row.risk === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                        {row.risk}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Forecast chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-[400px] flex-shrink-0 flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Escrow Cost Forecast — Next 12 Months</p>
              <p className="text-xs text-gray-500 mt-0.5">AI-predicted tax & insurance vs. current reserves</p>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-48 bg-gray-50 rounded-lg p-4">
              {months.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5" style={{ height: '160px' }}>
                    <div
                      className="flex-1 bg-blue-400 opacity-70 rounded-t"
                      style={{ height: `${(reserveHeights[i] / 248) * 100}%` }}
                    />
                    <div
                      className="flex-1 bg-orange-400 opacity-80 rounded-t"
                      style={{ height: `${(predictedHeights[i] / 248) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{m}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-400 rounded inline-block opacity-70" /> Reserve</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-400 rounded inline-block opacity-80" /> AI Forecast</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-amber-50 border border-amber-200 rounded-md p-3">
              ⚡ Tax costs projected to increase 18% in Q2 driven by reassessments in CA, FL markets.
              23 loans will require reserve top-ups averaging $22K each.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
