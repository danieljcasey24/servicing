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
      {/* Sidebar — 240px per Figma spec */}
      <aside className="w-[240px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        {/* Logo row */}
        <div className="flex items-center justify-between px-4 py-[14px]">
          <span className="text-[14px] font-semibold tracking-tight text-gray-900">ServicingAI</span>
          <button className="text-gray-400 hover:text-gray-600 transition-colors rounded p-0.5">
            <PanelLeftClose size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3 pb-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-[10px] px-3 py-[7px] rounded-lg text-[13px] leading-5 transition-colors',
                  active
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon size={14} className="flex-shrink-0 opacity-80" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-3 my-1" />

        {/* All Properties */}
        <div className="px-3 pt-1 pb-3">
          <div className="flex items-center justify-between px-3 py-[7px]">
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-medium text-gray-500">All Properties</span>
              <ChevronDown size={11} className="text-gray-400" />
            </div>
            <Search size={12} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <div className="flex flex-col gap-0">
            {properties.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-[10px] px-3 py-[6px] cursor-pointer hover:bg-gray-50 rounded-lg"
              >
                <span className={cn('w-[7px] h-[7px] rounded-full flex-shrink-0', p.color)} />
                <span className="text-[12px] text-gray-600 leading-none">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
