'use client';

import { useState } from 'react';
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
import { Send, Pencil, CheckCircle2, Clock, Mail, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TouchHistoryItem {
  date: string;
  channel: 'Email' | 'Phone';
  note: string;
  opened?: boolean;
}

interface BorrowerData {
  name: string;
  contact: { name: string; email: string };
  loan: string;
  item: string;
  due: string;
  touches: number;
  status: 'Critical' | 'Overdue' | 'Pending' | 'Upcoming';
  history: TouchHistoryItem[];
  draft: { subject: string; body: string };
}

const borrowers: BorrowerData[] = [
  {
    name: 'Metro Capital',
    contact: { name: 'James Kim', email: 'j.kim@metrocapital.com' },
    loan: 'LN-4821',
    item: 'Q4 2024 Financials',
    due: '45d overdue',
    touches: 8,
    status: 'Critical',
    history: [
      { date: 'Mar 28', channel: 'Email', note: 'Delivered · No response', opened: false },
      { date: 'Mar 21', channel: 'Email', note: 'Opened · No response', opened: true },
      { date: 'Mar 14', channel: 'Phone', note: 'Voicemail left' },
      { date: 'Mar 7', channel: 'Email', note: 'Delivered · No response', opened: false },
    ],
    draft: {
      subject: 'Action Required: Q4 2024 Financial Statements — LN-4821 [45 Days Overdue]',
      body: `Dear James,\n\nI'm following up on our outstanding request for the Q4 2024 operating statement and rent roll for 2200 Market Street, San Francisco (Loan LN-4821).\n\nAs of today, we are 45 days past the submission deadline. Per the loan agreement (Section 6.3), quarterly financial statements are due within 30 days of quarter-end.\n\nOur records show the current DSCR trending toward the covenant threshold. Timely submission allows us to identify any early warning signs and work proactively with you on solutions.\n\nPlease submit via the secure portal or reply to this email with the documents attached.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Oakview LLC',
    contact: { name: 'Priya Nair', email: 'p.nair@oakviewllc.com' },
    loan: 'LN-3391',
    item: 'Insurance Certificate',
    due: '32d overdue',
    touches: 6,
    status: 'Critical',
    history: [
      { date: 'Mar 28', channel: 'Email', note: 'Opened · No response', opened: true },
      { date: 'Mar 21', channel: 'Email', note: 'Delivered · No response', opened: false },
      { date: 'Mar 14', channel: 'Phone', note: 'Spoke briefly — promised to send this week' },
    ],
    draft: {
      subject: 'Urgent: Insurance Certificate Renewal — LN-3391 [32 Days Overdue]',
      body: `Dear Priya,\n\nWe have not yet received the updated insurance certificate for Oakview Apartments, Atlanta (Loan LN-3391). The current certificate expired on March 1, 2025 and we are now 32 days past the renewal deadline.\n\nPer your loan covenants, the property must maintain continuous coverage at or above the minimum required amounts. A lapse in coverage creates a technical default condition.\n\nTo avoid formal notice, please provide the updated certificate of insurance by April 16, 2025.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Rivera Properties',
    contact: { name: 'Carlos Rivera', email: 'c.rivera@riveraproperties.com' },
    loan: 'LN-5502',
    item: 'Q4 2024 Rent Roll',
    due: '21d overdue',
    touches: 4,
    status: 'Overdue',
    history: [
      { date: 'Apr 1', channel: 'Email', note: 'Opened · No response', opened: true },
      { date: 'Mar 24', channel: 'Email', note: 'Delivered · No response', opened: false },
    ],
    draft: {
      subject: 'Follow-Up: Q4 2024 Rent Roll — LN-5502 [21 Days Overdue]',
      body: `Dear Carlos,\n\nThis is our second follow-up regarding the Q4 2024 rent roll for Riviera Plaza, Miami (Loan LN-5502).\n\nWe use the rent roll to verify occupancy and calculate the quarterly DSCR covenant test. Your submission is now 21 days past due. Please provide the rent roll at your earliest convenience.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Sunset RE',
    contact: { name: 'David Park', email: 'd.park@sunset-re.com' },
    loan: 'LN-2280',
    item: 'DSCR Certification',
    due: '15d overdue',
    touches: 3,
    status: 'Overdue',
    history: [
      { date: 'Apr 5', channel: 'Email', note: 'Delivered · No response', opened: false },
      { date: 'Mar 29', channel: 'Email', note: 'Delivered · No response', opened: false },
    ],
    draft: {
      subject: 'Outstanding Item: DSCR Certification — LN-2280 [15 Days Overdue]',
      body: `Dear David,\n\nWe're following up on the Q4 2024 DSCR certification for Sunset Office, Los Angeles (Loan LN-2280). This item is now 15 days overdue.\n\nPlease provide the signed certification or reach out if you have questions.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Park Group',
    contact: { name: 'Lisa Chen', email: 'l.chen@parkgroupre.com' },
    loan: 'LN-6710',
    item: 'Annual Financials',
    due: '8d overdue',
    touches: 2,
    status: 'Pending',
    history: [
      { date: 'Apr 8', channel: 'Email', note: 'Opened · No response', opened: true },
    ],
    draft: {
      subject: 'Reminder: Annual Financial Statements — LN-6710 [8 Days Overdue]',
      body: `Dear Lisa,\n\nThis is a reminder that the annual financial statements for Parkway Retail, Dallas (Loan LN-6710) are now 8 days past the submission deadline.\n\nPlease submit at your earliest convenience.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Harbor Investors',
    contact: { name: 'Tom Walsh', email: 't.walsh@harborinvestors.com' },
    loan: 'LN-1920',
    item: 'Insurance Certificate',
    due: 'Due in 7d',
    touches: 1,
    status: 'Pending',
    history: [],
    draft: {
      subject: 'Upcoming: Insurance Certificate Renewal — LN-1920 (Due April 20)',
      body: `Dear Tom,\n\nThis is a courtesy notice that the insurance certificate for Harbor View, Seattle (Loan LN-1920) is due for renewal on April 20, 2025 — 7 days from today.\n\nPlease ensure the updated certificate is submitted by that date.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
  {
    name: 'Summit Properties',
    contact: { name: 'Amy Torres', email: 'a.torres@summitprop.com' },
    loan: 'LN-8801',
    item: 'Q4 2024 Financials',
    due: 'Due in 14d',
    touches: 0,
    status: 'Upcoming',
    history: [],
    draft: {
      subject: 'Upcoming: Q4 2024 Financial Statements Due April 27 — LN-8801',
      body: `Dear Amy,\n\nThis is an advance notice that your Q4 2024 operating statement and rent roll for Summit Multifamily, Denver (Loan LN-8801) is due in 14 days on April 27, 2025.\n\nPlease submit via the secure portal when ready. Early submission is always welcome.\n\nBest regards,\nSarah Chen\nServicingAI – Asset Management`,
    },
  },
];

const kpis = [
  { label: 'Outstanding Requests', value: '34', sub: 'Awaiting borrower response', color: 'text-red-600' },
  { label: 'Avg Touch Count', value: '4.2', sub: 'Per item vs. 15.0 manual avg', color: 'text-gray-900' },
  { label: 'Overdue Items', value: '11', sub: '>30 days outstanding', color: 'text-red-600' },
  { label: 'Auto-Drafted Today', value: '18', sub: 'Emails ready for review', color: 'text-green-600' },
];

const statusColor = (s: string) =>
  s === 'Critical' ? 'text-red-600' : s === 'Overdue' ? 'text-amber-600' : s === 'Pending' ? 'text-blue-600' : 'text-gray-400';

const overdueCount = borrowers.filter(b => b.status === 'Critical' || b.status === 'Overdue').length;

export default function Wedge5() {
  const [selectedId, setSelectedId] = useState(borrowers[0].loan);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [followUpConfirmed, setFollowUpConfirmed] = useState<Set<string>>(new Set());

  const selected = borrowers.find(b => b.loan === selectedId) ?? borrowers[0];
  const isSent = sentIds.has(selectedId);

  const handleSend = () => {
    setSentIds(prev => new Set([...prev, selectedId]));
  };

  const handleConfirmFollowUp = () => {
    setFollowUpConfirmed(prev => new Set([...prev, selectedId]));
  };

  return (
    <AppShell>
      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">Communications</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-5">
              AI-drafted outreach · Track outstanding items · Approve and send
            </p>
          </div>
          <Button size="sm" className="gap-2 text-[13px]">
            <Pencil size={13} />
            Draft All Overdue ({overdueCount})
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

        {/* Queue + Email Draft */}
        <div className="flex gap-4 min-h-0">

          {/* Borrower queue — selection-driven */}
          <div className="bg-white rounded-xl border border-gray-200 flex-1 overflow-hidden min-w-0">
            <div className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900">Outstanding Borrower Requests</p>
              <span className="text-[13px] text-red-600 font-semibold">34 open</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Borrower</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Loan</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Item Needed</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Due</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-3">Touches</TableHead>
                  <TableHead className="text-[11px] text-gray-500 font-medium h-9 px-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowers.map((row) => (
                  <TableRow
                    key={row.loan}
                    onClick={() => setSelectedId(row.loan)}
                    className={cn(
                      'cursor-pointer border-b border-gray-50 transition-colors',
                      selectedId === row.loan ? 'bg-blue-50 hover:bg-blue-50' : 'hover:bg-gray-50'
                    )}
                  >
                    <TableCell className="px-5 py-3">
                      <p className="text-[13px] font-medium text-gray-900">{row.name}</p>
                      <p className="text-[11px] text-gray-400">{row.contact.name}</p>
                    </TableCell>
                    <TableCell className="text-[12px] text-gray-500 font-mono px-3 py-3">{row.loan}</TableCell>
                    <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.item}</TableCell>
                    <TableCell className={cn('text-[12px] px-3 py-3 font-medium', row.due.includes('overdue') ? 'text-red-600' : 'text-gray-500')}>{row.due}</TableCell>
                    <TableCell className="text-[13px] text-gray-600 px-3 py-3">{row.touches}</TableCell>
                    <TableCell className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        {sentIds.has(row.loan) && <CheckCircle2 size={11} className="text-green-500" />}
                        <span className={cn('text-[12px] font-semibold', sentIds.has(row.loan) ? 'text-green-600' : statusColor(row.status))}>
                          {sentIds.has(row.loan) ? 'Sent' : row.status}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* AI Email Draft — reactive to row selection */}
          <div className="bg-white rounded-xl border border-gray-200 w-[460px] flex-shrink-0 flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="px-5 py-4 bg-indigo-50 border-b border-indigo-100">
              <p className="text-[13px] font-semibold text-gray-800">AI-Drafted Outreach — {selected.name} / {selected.loan}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Touch #{selected.touches + 1} · {selected.due}
              </p>
            </div>

            {/* Touch history */}
            {selected.history.length > 0 && (
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Outreach History</p>
                <div className="flex flex-col gap-1.5">
                  {selected.history.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {h.channel === 'Email' ? <Mail size={10} className="text-gray-400 flex-shrink-0" /> : <Phone size={10} className="text-gray-400 flex-shrink-0" />}
                      <span className="text-[10px] text-gray-400 w-[44px] flex-shrink-0">{h.date}</span>
                      <span className="text-[10px] text-gray-500">{h.note}</span>
                      {h.opened === true && <span className="text-[10px] text-blue-400 ml-auto">opened</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Email content */}
            <div className="p-5 flex flex-col gap-3 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-gray-400 w-[52px] flex-shrink-0">To:</span>
                <span className="text-[13px] text-gray-700">{selected.contact.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[11px] font-medium text-gray-400 w-[52px] flex-shrink-0 mt-[2px]">Subject:</span>
                <span className="text-[13px] text-gray-800 font-medium leading-5">{selected.draft.subject}</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <pre className="text-[12px] text-gray-600 whitespace-pre-wrap font-sans leading-[1.65]">{selected.draft.body}</pre>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              {isSent ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-green-600">
                    <CheckCircle2 size={14} />
                    Sent to {selected.contact.email}
                  </div>
                  {!followUpConfirmed.has(selectedId) ? (
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
                        <Calendar size={11} className="text-gray-400" />
                        Auto-schedule follow-up if no response in 3 days?
                      </p>
                      <Button size="sm" variant="outline" className="text-[11px] h-7 px-2.5 gap-1" onClick={handleConfirmFollowUp}>
                        <Clock size={10} />
                        Confirm
                      </Button>
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
                      <Calendar size={11} className="text-green-500" />
                      <span>Follow-up scheduled for <span className="font-medium text-gray-700">April 16</span> if no response</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button size="sm" className="gap-1.5 text-[12px]" onClick={handleSend}>
                    <Send size={12} />
                    Approve & Send
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 text-[12px]">
                    <Pencil size={12} />
                    Edit Draft
                  </Button>
                  <span className="text-[11px] text-gray-400 ml-auto">AI drafted · Touch #{selected.touches + 1}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
