'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Portfolio Hub', href: '/' },
  { label: 'Loan Underwriting', href: '/wedge1', description: 'Upload & Asset Performance' },
  { label: 'Escrow Admin', href: '/wedge2', description: 'Taxes & Insurance' },
  { label: 'Asset Performance', href: '/wedge3', description: 'Rent Roll Ingestion' },
  { label: 'Delinquency Prediction', href: '/wedge4', description: 'Market Monitoring' },
  { label: 'Borrower Comms', href: '/wedge5', description: 'Outreach Automation' },
  { label: 'Reports', href: '#' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col py-6 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 mb-6">
          <div className="w-7 h-7 bg-gray-900 rounded-md" />
          <span className="text-[15px] font-bold text-gray-900">ServicingAI</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  active
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <span className={cn('w-2 h-2 rounded-full flex-shrink-0', active ? 'bg-gray-900' : 'bg-gray-400')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-[60px] flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <span className="text-sm text-gray-500">
            {navItems.find((i) => i.href === pathname)?.label || 'Portfolio Hub'}
          </span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-gray-900">Sarah Chen</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
