'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-client';

interface AppUser {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'premium';
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/ventures/crypto-transaction-log/app',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Transactions',
    href: '/ventures/crypto-transaction-log/app/transactions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    label: 'Import',
    href: '/ventures/crypto-transaction-log/app/import',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    label: 'Export',
    href: '/ventures/crypto-transaction-log/app/export',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/ventures/crypto-transaction-log/app/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AppShell({
  user,
  children,
}: {
  user: AppUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = '/ventures/crypto-transaction-log';
  }

  function isActive(href: string) {
    if (href === '/ventures/crypto-transaction-log/app') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-[#041833] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0B2850] border-r border-[#132E4B] transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-[#132E4B]">
            <Link href="/ventures/crypto-transaction-log/app" className="block">
              <h1 className="text-lg font-bold text-white">
                Crypto Transaction <span className="text-orange-500">Log</span>
              </h1>
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-[#3EE5E5]/20 to-[#1B3781]/20 text-[#3EE5E5]'
                    : 'text-[#9DA9B9] hover:text-white hover:bg-[#132E4B]'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="px-3 py-4 border-t border-[#132E4B]">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      user.tier === 'premium'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-[#132E4B] text-[#9DA9B9]'
                    }`}
                  >
                    {user.tier === 'premium' ? 'PREMIUM' : 'FREE'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-3 py-2 text-sm text-[#9DA9B9] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-[#0B2850] border-b border-[#132E4B] px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#9DA9B9] hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-white">
            Crypto <span className="text-orange-500">Log</span>
          </h1>
          <div className="w-6" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
