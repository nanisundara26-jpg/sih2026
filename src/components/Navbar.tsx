import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onAboutClick: () => void;
  onHomeClick: () => void;
  isConfigured?: boolean;
  onOpenConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onAboutClick,
  onHomeClick,
  isConfigured,
  onOpenConfig,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-md transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3 text-left group focus:outline-none rounded-lg"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                DNRCET <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-black">SIH-2026</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-blue-950/80 text-blue-300 border border-blue-500/30 uppercase">
                OFFICIAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Team Details Portal</p>
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onHomeClick}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-[#E2E8F0] hover:text-[#67E8F9] hover:bg-slate-800/80 transition-colors focus:outline-none"
          >
            Home
          </button>
          <button
            onClick={onSearchClick}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-[#E2E8F0] hover:text-[#67E8F9] hover:bg-slate-800/80 transition-colors focus:outline-none"
          >
            Team Search
          </button>
          <button
            onClick={onAboutClick}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-[#E2E8F0] hover:text-[#67E8F9] hover:bg-slate-800/80 transition-colors focus:outline-none"
          >
            About Event
          </button>

          {onOpenConfig && (
            <button
              onClick={onOpenConfig}
              title="Google Sheet Integration Status"
              className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#172554] hover:bg-[#1e3a8a] border border-blue-900 text-[#E2E8F0] hover:text-[#67E8F9] transition-all focus:outline-none shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden sm:inline">{isConfigured ? 'Connected' : 'API Setup'}</span>
            </button>
          )}
        </nav>
      </div>

      {/* Subtle bottom gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 opacity-80" />
    </header>
  );
};
