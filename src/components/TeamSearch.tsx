import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamSearchProps {
  onVerify: (teamId: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export const TeamSearch: React.FC<TeamSearchProps> = ({
  onVerify,
  isLoading,
  initialValue = '',
}) => {
  const [teamIdInput, setTeamIdInput] = useState(initialValue);
  const [errorHint, setErrorHint] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = teamIdInput.trim();
    if (!trimmed) {
      setErrorHint('Please enter your assigned Team ID.');
      return;
    }
    setErrorHint('');
    onVerify(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section id="search-section" className="relative py-8 md:py-10 scroll-mt-24 no-print">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Colorful gradient border wrapper */}
        <div className="gradient-border-light shadow-xl shadow-blue-500/10 group">
          {/* Inner Clean White Card */}
          <div className="bg-white p-6 sm:p-9 rounded-[1.4rem] relative overflow-hidden border border-slate-100">
            {/* Header / Subtitle row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <KeyRound className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    ENTER YOUR TEAM ID
                  </h2>
                  <p className="text-xs text-[#64748B] font-medium">
                    Participant verification &amp; credential access
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#0891B2] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                Single-Record Lookup
              </span>
            </div>

            <p className="text-sm text-[#475569] mb-6 leading-relaxed">
              Enter your registered <strong className="text-[#0F172A]">Team ID</strong> (e.g., <span className="font-mono font-bold text-[#0891B2]">DNRIH-26001</span>) to access your verified roster, permanent team QR, and official credentials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Team ID Input with animated border & focus glow */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    id="team-id-input"
                    type="text"
                    value={teamIdInput}
                    onChange={(e) => {
                      setTeamIdInput(e.target.value.toUpperCase());
                      if (errorHint) setErrorHint('');
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="DNRIH-26001"
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Team ID"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0] text-[#0F172A] placeholder-slate-400 font-mono text-base sm:text-lg font-bold search-input-focus transition-all duration-300 disabled:opacity-50 tracking-wider shadow-inner"
                  />
                  {teamIdInput && (
                    <button
                      type="button"
                      onClick={() => setTeamIdInput('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#64748B] hover:text-[#0F172A] font-mono focus:outline-none"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* VERIFY TEAM Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !teamIdInput.trim()}
                  className="relative group overflow-hidden px-8 py-4 rounded-2xl font-extrabold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <>
                      <span>VERIFY TEAM</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>
              </div>

              {errorHint && (
                <p className="text-xs text-rose-600 font-bold pl-1 flex items-center gap-1.5 animate-bounce">
                  <span>•</span> {errorHint}
                </p>
              )}

              {/* Status and privacy guarantees */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs text-[#64748B] border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>Direct lookup from official Google Response Sheet</span>
                </div>
                <div className="font-mono text-[11px] text-[#64748B]">
                  Case-insensitive (<span className="text-[#0891B2] font-semibold">dnrih-26001</span>)
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
