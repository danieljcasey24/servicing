import { AppShell } from '@/components/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';

const kpis = [
  { label: 'Total Escrow Balance', value: '$12.4M', sub: 'Across 87 active loans', warn: false },
  { label: 'Projected Shortfall', value: '$5.0M', sub: '23 loans at risk', warn: true },
  { label: 'Tax Disbursements Due', value: '$2.1M', sub: 'Next 60 days', warn: true },
  { label: 'Insurance Renewals', value: '14 loans', sub: 'Expiring this quarter', warn: true },
];

const loanRows = [
  { id: 'LN-4821', property: '2200 Market St, SF', reserve: '$82,000', projected: '$127,400', shortfall: '−$45,400', risk: 'High' },
  { id: 'LN-3391', property: 'Oakview Apts, ATL', reserve: '$41,000', projected: '$68,200', shortfall: '−$27,200', risk: 'High' },
  { id: 'LN-5502', property: 'Riviera Plaza, MIA', reserve: '$96,000', projected: '$121,000', shortfall: '−$25,000', risk: 'Medium' },
  { id: 'LN-2280', property: 'Sunset Office, LA', reserve: '$33,000', projected: '$54,800', shortfall: '−$21,800', risk: 'Medium' },
  { id: 'LN-6710', property: 'Parkway Retail, DFW', reserve: '$58,000', projected: '$76,500', shortfall: '−$18,500', risk: 'Medium' },
  { id: 'LN-1920', property: 'Harbor View, SEA', reserve: '$44,000', projected: '$59,200', shortfall: '−$15,200', risk: 'Low' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const reserveHeights = [180, 175, 170, 165, 160, 155];
const predictedHeights = [180, 188, 200, 215, 228, 248];

const riskBadge = (risk: string) => {
  if (risk === 'High') return <Badge variant="destructive">Destructive</Badge>;
  if (risk === 'Medium') return <Badge variant="secondary">Secondary</Badge>;
  return <Badge variant="outline">Low</Badge>;
};

export default function Wedge2() {
  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Taxes & Insurance</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">Forecast shortfalls · Track disbursements · Monitor insurance renewals</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-[13px]">
            <Pencil size={13} />
            Draft Email
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="flex flex-col gap-5 pt-5">
              {/* Alert */}
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-700 leading-5">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Projected shortfall of $5.0M across portfolio</span>
                  {' '}— AI detected 23 loans with tax/insurance cost spikes exceeding reserve coverage. Immediate review recommended.
                </span>
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

              {/* Table + Chart */}
              <div className="flex gap-4">
                {/* Loans table */}
                <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden min-w-0">
                  <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
                    <p className="text-[13px] font-semibold text-gray-900">Loans with Projected Escrow Shortfall</p>
                    <span className="text-[13px] text-red-600 font-semibold">23 loans</span>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b border-gray-100">
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Loan ID</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Property</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Reserve Bal.</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Projected Cost</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Shortfall</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Risk</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanRows.map((row) => (
                        <TableRow key={row.id} className="border-b border-gray-50">
                          <TableCell className="text-[13px] font-medium px-5 py-3">{row.id}</TableCell>
                          <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.property}</TableCell>
                          <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.reserve}</TableCell>
                          <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.projected}</TableCell>
                          <TableCell className="text-[13px] text-red-600 font-semibold px-3 py-3">{row.shortfall}</TableCell>
                          <TableCell className="px-5 py-3">{riskBadge(row.risk)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Forecast chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 w-[340px] flex-shrink-0 flex flex-col gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">Escrow Cost Forecast — Next 12 Months</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-4">AI-predicted tax & insurance vs. current reserves</p>
                  </div>

                  <div className="flex items-end gap-[6px] h-44 bg-gray-50 rounded-lg p-3">
                    {months.map((m, i) => (
                      <div key={m} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end gap-[2px]" style={{ height: '140px' }}>
                          <div
                            className="flex-1 bg-blue-400 rounded-t"
                            style={{ height: `${(reserveHeights[i] / 248) * 100}%` }}
                          />
                          <div
                            className="flex-1 bg-orange-400 rounded-t"
                            style={{ height: `${(predictedHeights[i] / 248) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-400 rounded-sm inline-block" /> Reserve
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-orange-400 rounded-sm inline-block" /> AI Forecast
                    </span>
                  </div>

                  <p className="text-[11px] text-amber-800 leading-[1.5] bg-amber-50 border border-amber-200 rounded-lg p-3">
                    ⚡ Tax costs projected to increase 18% in Q2 driven by reassessments in CA, FL markets. 23 loans will require reserve top-ups averaging $22K each.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecast">
            <div className="pt-5 text-[13px] text-gray-500">Forecast view coming soon.</div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
