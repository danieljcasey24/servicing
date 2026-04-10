'use client';

import { useState } from 'react';
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
import { Send, Pencil, CheckCircle } from 'lucide-react';

const kpis = [
  { label: 'Outstanding Requests', value: '34', sub: 'Awaiting borrower response', color: 'text-red-600' },
  { label: 'Avg Touch Count', value: '4.2', sub: 'Per item vs. 15 manual avg', color: 'text-gray-900' },
  { label: 'Overdue Items', value: '11', sub: '>30 days outstanding', color: 'text-red-600' },
  { label: 'Auto-Drafted Today', value: '18', sub: 'Emails ready for review', color: 'text-green-600' },
];

const borrowers = [
  { name: 'Metro Capital', loan: 'LN-4821', item: 'Q4 Financials', due: '45d overdue', touches: 8, status: 'Critical' },
  { name: 'Oakview LLC', loan: 'LN-3391', item: 'Insurance Cert', due: '32d overdue', touches: 6, status: 'Critical' },
  { name: 'Rivera Prop.', loan: 'LN-5502', item: 'Rent Roll', due: '21d overdue', touches: 4, status: 'Overdue' },
  { name: 'Sunset RE', loan: 'LN-2280', item: 'DSCR Update', due: '15d overdue', touches: 3, status: 'Overdue' },
  { name: 'Park Group', loan: 'LN-6710', item: 'Annual Financials', due: '8d overdue', touches: 2, status: 'Pending' },
  { name: 'Harbor Inv.', loan: 'LN-1920', item: 'Insurance Cert', due: 'Due in 7d', touches: 1, status: 'Pending' },
  { name: 'Summit Prop.', loan: 'LN-8801', item: 'Q4 Financials', due: 'Due in 14d', touches: 0, status: 'Upcoming' },
];

const statusColor = (s: string) =>
  s === 'Critical' ? 'text-red-600' : s === 'Overdue' ? 'text-amber-600' : s === 'Pending' ? 'text-blue-600' : 'text-gray-400';

const draftEmail = `Dear James,

I'm following up on our outstanding request for the Q4 2024 operating statement and rent roll for the property at 2200 Market Street, San Francisco (Loan LN-4821).

As of today, we are 45 days past the submission deadline. Per the loan agreement (Section 6.3), quarterly financial statements are due within 30 days of quarter-end.

Our records show the current DSCR trending toward the covenant threshold. Timely submission allows us to identify any early warning signs and work proactively with you on solutions.

Please submit via the secure portal or reply to this email with the documents attached.

Best regards,
Sarah Chen
ServicingAI – Asset Management`;

export default function Wedge5() {
  const [sent, setSent] = useState(false);

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
            <p className="text-sm text-gray-500 mt-1">
              Auto-draft outreach · Track outstanding items · Reduce manual follow-up touches
            </p>
          </div>
          <Button className="gap-2">
            <Pencil size={14} />
            Draft All Overdue
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-medium text-gray-500 mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold mb-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Queue + Email Draft */}
        <div className="flex gap-4">
          {/* Borrower queue */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Outstanding Borrower Requests</p>
              <span className="text-sm text-red-600 font-semibold">34 open</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan</TableHead>
                  <TableHead>Item Needed</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Touches</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowers.map((row) => (
                  <TableRow key={row.loan} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium text-xs">{row.name}</TableCell>
                    <TableCell className="text-xs font-mono text-gray-500">{row.loan}</TableCell>
                    <TableCell className="text-xs">{row.item}</TableCell>
                    <TableCell className="text-xs text-gray-500">{row.due}</TableCell>
                    <TableCell className="text-xs">{row.touches}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold ${statusColor(row.status)}`}>{row.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* AI Email Draft */}
          <div className="bg-white rounded-xl border border-gray-200 w-[480px] flex-shrink-0 flex flex-col overflow-hidden">
            <div className="px-5 py-4 bg-indigo-50 border-b border-indigo-100">
              <p className="text-sm font-semibold text-gray-800">AI-Drafted Outreach — Metro Capital / LN-4821</p>
              <p className="text-xs text-gray-500 mt-0.5">Touch #8 of 15 · 45 days overdue</p>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-gray-400 w-14">To:</span>
                <span className="text-gray-800">j.kim@metrocapital.com</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="font-medium text-gray-400 w-14 mt-0.5">Subject:</span>
                <span className="text-gray-800 font-medium">Action Required: Q4 2024 Financial Statements — LN-4821 [45 Days Overdue]</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{draftEmail}</pre>
              </div>
            </div>

            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
              {sent ? (
                <span className="text-sm font-medium text-green-600 flex items-center gap-2">
                  <CheckCircle size={15} />
                  Email sent successfully
                </span>
              ) : (
                <>
                  <Button size="sm" className="gap-2" onClick={() => setSent(true)}>
                    <Send size={13} />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Pencil size={13} />
                    Edit Draft
                  </Button>
                  <span className="text-xs text-gray-400 ml-auto">↩ Auto-schedule follow-up in 3 days</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
