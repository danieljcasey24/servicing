'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Building2,
  ShieldCheck,
  Receipt,
  FileWarning,
  MessageSquare,
  PanelLeftClose,
  ChevronDown,
  Search,
} from 'lucide-react';

const navItems = [
  { label: 'Asset Performance', href: '/wedge3', icon: Building2 },
  { label: 'Loan Underwriting', href: '/wedge1', icon: ShieldCheck },
  { label: 'Taxes & Insurance', href: '/wedge2', icon: Receipt },
  { label: 'Delinquency Prediction', href: '/wedge4', icon: FileWarning },
  { label: 'Communications', href: '/wedge5', icon: MessageSquare },
];

const properties = [
  { name: '2200 Market St, SF', color: 'bg-gray-300' },
  { name: 'Oakview Apts, ATL', color: 'bg-green-500' },
  { name: 'Riviera Plaza, MIA', color: 'bg-gray-300' },
  { name: 'Sunset Office, LA', color: 'bg-gray-300' },
  { name: 'Parkway Retail, DFW', color: 'bg-gray-300' },
  { name: 'Harbor View, SEA', color: 'bg-red-500' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
          <span className="text-[15px] font-bold text-gray-900 tracking-tight">ServicingAI</span>
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded">
            <PanelLeftClose size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 p-3 pt-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] transition-colors',
                  active
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon size={14} className="flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-3 border-t border-gray-100 mt-1" />

        {/* All Properties */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between px-2.5 py-[7px]">
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-semibold text-gray-600">All Properties</span>
              <ChevronDown size={11} className="text-gray-400" />
            </div>
            <Search size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="flex flex-col">
            {properties.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 px-2.5 py-[6px] cursor-pointer hover:bg-gray-50 rounded-md"
              >
                <span className={cn('w-[6px] h-[6px] rounded-full flex-shrink-0', p.color)} />
                <span className="text-[12px] text-gray-600 leading-none">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
