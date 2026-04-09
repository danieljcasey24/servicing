import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AppShell } from '@/components/app-shell';

const wedges = [
  {
    id: 1,
    href: '/wedge1',
    title: 'Loan Underwriting & Asset Performance',
    description:
      'Upload loan documents, compare current performance against underwriting baseline, detect covenant breach risk early, and auto-draft variance commentary for investor reporting.',
    tags: ['Financial Analysis', 'Covenant Monitoring', 'AI Commentary'],
    color: 'bg-blue-50 border-blue-200',
    accent: 'bg-blue-600',
    stat: { label: 'Time saved per loan', value: '45–60 min' },
  },
  {
    id: 2,
    href: '/wedge2',
    title: 'Escrow Administration — Taxes & Insurance',
    description:
      'Forecast tax and insurance costs using external market signals, proactively identify reserve shortfalls before they trap capital, and prioritize loans needing immediate attention.',
    tags: ['Escrow Forecasting', 'Shortfall Alerts', 'Cost Modeling'],
    color: 'bg-orange-50 border-orange-200',
    accent: 'bg-orange-500',
    stat: { label: 'Trapped capital at risk', value: '$5M+' },
  },
  {
    id: 3,
    href: '/wedge3',
    title: 'Reported Asset Performance — Rent Roll Ingestion',
    description:
      'Ingest rent rolls and operating statements in any format, extract and normalize data with AI, spread across periods, and automatically detect variances above threshold.',
    tags: ['Document Extraction', 'Financial Spreading', 'Variance Detection'],
    color: 'bg-green-50 border-green-200',
    accent: 'bg-green-600',
    stat: { label: 'Formats handled', value: '50+ unique' },
  },
  {
    id: 4,
    href: '/wedge4',
    title: 'Delinquency Prediction — Market Monitoring',
    description:
      'Surface external market signals (vacancy trends, insurance spikes, new supply) as leading indicators of loan stress months before a covenant breach or delinquency occurs.',
    tags: ['Predictive Analytics', 'Market Signals', 'Risk Scoring'],
    color: 'bg-red-50 border-red-200',
    accent: 'bg-red-600',
    stat: { label: 'Loans monitored', value: '87 active' },
  },
  {
    id: 5,
    href: '/wedge5',
    title: 'Borrower Communications & Automation',
    description:
      'Auto-draft context-aware outreach for overdue financial statements and insurance certificates, track outstanding items, and reduce average borrower follow-up from 15 touches to under 5.',
    tags: ['Outreach Automation', 'Document Tracking', 'AI Drafting'],
    color: 'bg-purple-50 border-purple-200',
    accent: 'bg-purple-600',
    stat: { label: 'Reduction in manual touches', value: '15 → 4.2' },
  },
];

export default function HubPage() {
  return (
    <AppShell>
      <div className="p-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">AI for CRE Loan Servicing</h1>
            <Badge variant="outline" className="text-xs">Design Partner Prototypes</Badge>
          </div>
          <p className="text-gray-500 text-base max-w-3xl">
            Five independent prototype experiences — each targeting a distinct pain point in commercial loan servicing.
            Select a wedge below to explore the workflow.
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-400">
            <span>87 loans monitored</span>
            <span>·</span>
            <span>$5T addressable CRE debt</span>
            <span>·</span>
            <span>10 discovery calls completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {wedges.map((w) => (
            <Link key={w.id} href={w.href} className="group block">
              <div className={`rounded-xl border-2 ${w.color} p-6 h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}>
                <div className="w-full h-36 rounded-lg bg-white/70 border border-white/80 mb-5 flex items-center justify-center relative">
                  <span className="text-5xl font-black text-gray-200 select-none">{w.id}</span>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="text-xs">Prototype Ready</Badge>
                  </div>
                </div>
                <h2 className="text-base font-semibold text-gray-900 mb-2 leading-snug">{w.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{w.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {w.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-white/80 text-gray-600 rounded-full border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{w.stat.label}</span>
                  <span className="text-sm font-semibold text-gray-800">{w.stat.value}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">About These Prototypes</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-4xl">
            Each prototype represents a distinct product wedge for an AI-native CRE loan servicing intelligence layer.
            They are designed to be tested independently with design partners without blending use cases.
            The underlying opportunity: ~$5T in U.S. CRE mortgage debt serviced on platforms built in the 1980s–90s
            with no automation, no inference, and no forward-looking intelligence.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
