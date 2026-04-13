import { AppShell } from '@/components/app-shell';
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
import { Bell, Send, Calendar, TrendingUp } from 'lucide-react';

const kpis = [
  { label: 'Total Escrow Balance', value: '$12.4M', sub: 'Across 87 active loans', color: 'text-gray-900', action: null },
  { label: 'Projected Shortfall', value: '$5.0M', sub: '23 loans at risk', color: 'text-red-600', action: 'Initiate top-up requests →' },
  { label: 'Tax Disbursements Due', value: '$2.1M', sub: 'Next 60 days', color: 'text-red-600', action: 'View disbursement schedule →' },
  { label: 'Insurance Renewals', value: '14 loans', sub: 'Expiring this quarter', color: 'text-amber-600', action: 'Review expiring certs →' },
];

const loanRows = [
  { id: 'LN-4821', property: '2200 Market St, SF', reserve: '$82,000', projected: '$127,400', shortfall: '−$45,400', disbDue: '18 days', risk: 'Critical', action: 'Send top-up notice' },
  { id: 'LN-3391', property: 'Oakview Apts, ATL', reserve: '$41,000', projected: '$68,200', shortfall: '−$27,200', disbDue: '18 days', risk: 'Critical', action: 'Send top-up notice' },
  { id: 'LN-5502', property: 'Riviera Plaza, MIA', reserve: '$96,000', projected: '$121,000', shortfall: '−$25,000', disbDue: '32 days', risk: 'Elevated', action: 'Review coverage' },
  { id: 'LN-2280', property: 'Sunset Office, LA', reserve: '$33,000', projected: '$54,800', shortfall: '−$21,800', disbDue: '32 days', risk: 'Elevated', action: 'Review coverage' },
  { id: 'LN-6710', property: 'Parkway Retail, DFW', reserve: '$58,000', projected: '$76,500', shortfall: '−$18,500', disbDue: '45 days', risk: 'Elevated', action: 'Monitor' },
  { id: 'LN-1920', property: 'Harbor View, SEA', reserve: '$44,000', projected: '$59,200', shortfall: '−$15,200', disbDue: '60 days', risk: 'Low', action: 'Monitor' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const reserveH = [180, 175, 170, 165, 160, 155, 150, 148, 145, 143, 140, 138];
const forecastH = [180, 188, 200, 215, 228, 248, 260, 268, 275, 282, 290, 295];

const forecastLoans = [
  { id: 'LN-4821', q1: '$127,400', q2: '$134,200', q3: '$141,000', q4: '$148,500', topUp: '$66,500' },
  { id: 'LN-3391', q1: '$68,200', q2: '$71,800', q3: '$75,400', q4: '$79,200', topUp: '$38,200' },
  { id: 'LN-5502', q1: '$121,000', q2: '$127,400', q3: '$133,800', q4: '$140,200', topUp: '$44,200' },
  { id: 'LN-2280', q1: '$54,800', q2: '$57,700', q3: '$60,600', q4: '$63,600', topUp: '$30,600' },
  { id: 'LN-6710', q1: '$76,500', q2: '$80,600', q3: '$84,700', q4: '$88,800', topUp: '$30,800' },
  { id: 'LN-1920', q1: '$59,200', q2: '$62,400', q3: '$65,600', q4: '$68,800', topUp: '$24,800' },
];

const riskPill = (risk: string) => {
  const styles: Record<string, string> = {
    Critical: 'text-red-600 bg-red-50',
    Elevated: 'text-amber-600 bg-amber-50',
    Low: 'text-green-600 bg-green-50',
  };
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${styles[risk]}`}>{risk}</span>;
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
          <Button size="sm" className="gap-2 text-[13px]">
            <Bell size={13} />
            Send Top-up Notices (23)
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecast">12-Month Forecast</TabsTrigger>
          </TabsList>

          {/* ── OVERVIEW TAB ── */}
          <TabsContent value="overview">
            <div className="flex flex-col gap-5 pt-5">

              {/* Alert */}
              <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-[3px]" />
                <p className="text-[13px] text-red-700 leading-5">
                  <span className="font-semibold">Projected shortfall of $5.0M across portfolio</span>
                  {' '}— AI detected 23 loans with tax/insurance cost spikes exceeding reserve coverage. Immediate review recommended.
                </p>
              </div>

              {/* KPIs with micro-CTAs */}
              <div className="grid grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-1">
                    <p className="text-[11px] font-medium text-gray-500">{kpi.label}</p>
                    <p className={`text-2xl font-bold leading-tight ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-[11px] text-gray-400 leading-4">{kpi.sub}</p>
                    {kpi.action && (
                      <button className="text-[11px] text-blue-600 hover:text-blue-700 text-left mt-1 font-medium transition-colors">
                        {kpi.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Table + mini chart */}
              <div className="flex gap-4">
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
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Disb. Due</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Risk</TableHead>
                        <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanRows.map((row) => (
                        <TableRow key={row.id} className="border-b border-gray-50">
                          <TableCell className="text-[13px] font-medium px-5 py-3">{row.id}</TableCell>
                          <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.property}</TableCell>
                          <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.reserve}</TableCell>
                          <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.projected}</TableCell>
                          <TableCell className="text-[13px] text-red-600 font-semibold px-3 py-3">{row.shortfall}</TableCell>
                          <TableCell className={`text-[12px] px-3 py-3 font-medium ${parseInt(row.disbDue) <= 20 ? 'text-red-600' : 'text-gray-600'}`}>{row.disbDue}</TableCell>
                          <TableCell className="px-3 py-3">{riskPill(row.risk)}</TableCell>
                          <TableCell className="px-5 py-3">
                            <Button variant="ghost" size="sm" className="text-[11px] h-7 px-2 gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Send size={10} />
                              {row.action}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── FORECAST TAB ── */}
          <TabsContent value="forecast">
            <div className="flex flex-col gap-5 pt-5">

              {/* Insight callout — above chart */}
              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <TrendingUp size={14} className="text-amber-600 flex-shrink-0 mt-[1px]" />
                <div>
                  <p className="text-[13px] font-semibold text-amber-800">AI-Projected Portfolio Shortfall reaches $7.2M by Q4 without action</p>
                  <p className="text-[12px] text-amber-700 mt-0.5">Tax costs projected to increase 18% in Q2 driven by reassessments in CA, FL markets. 23 loans will require reserve top-ups averaging $22K each. Initiating adjustments now avoids out-of-pocket advances.</p>
                </div>
              </div>

              {/* Chart — full width, prominent */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">Escrow Cost Forecast — Next 12 Months</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">AI-predicted tax & insurance costs vs. current reserve funding</p>
                  </div>
                  <div className="flex gap-4 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-400 rounded-sm inline-block" /> Current Reserve
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-orange-400 rounded-sm inline-block" /> AI Forecast
                    </span>
                  </div>
                </div>
                <div className="flex items-end gap-[5px] h-52 bg-gray-50 rounded-lg px-4 pb-4 pt-6">
                  {months.map((m, i) => (
                    <div key={m} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-[2px]" style={{ height: '168px' }}>
                        <div className="flex-1 bg-blue-400 rounded-t opacity-80" style={{ height: `${(reserveH[i] / 295) * 100}%` }} />
                        <div className="flex-1 bg-orange-400 rounded-t opacity-90" style={{ height: `${(forecastH[i] / 295) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Per-loan 12-month projection table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
                  <p className="text-[13px] font-semibold text-gray-900">Per-Loan Projected Costs & Required Top-Ups</p>
                  <Button variant="outline" size="sm" className="gap-1.5 text-[12px]">
                    <Calendar size={12} />
                    Export Schedule
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-gray-100">
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Loan</TableHead>
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Q1 Projected</TableHead>
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Q2 Projected</TableHead>
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Q3 Projected</TableHead>
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Q4 Projected</TableHead>
                      <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Required Top-Up</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastLoans.map((row) => (
                      <TableRow key={row.id} className="border-b border-gray-50">
                        <TableCell className="text-[13px] font-medium px-5 py-3">{row.id}</TableCell>
                        <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.q1}</TableCell>
                        <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.q2}</TableCell>
                        <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.q3}</TableCell>
                        <TableCell className="text-[12px] text-gray-600 px-3 py-3">{row.q4}</TableCell>
                        <TableCell className="text-[13px] font-semibold text-red-600 px-5 py-3">{row.topUp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
