import React from 'react';
import { Tag, Layers, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TeamRecord } from '../types';

interface TeamHeaderProps {
  team: TeamRecord;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      {/* Section Subtitle */}
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-blue-600" />
        <h2 className="text-xs font-extrabold tracking-widest text-blue-700 uppercase">
          TEAM OVERVIEW
        </h2>
      </div>

      {/* Card Wrapper with Clean White Surface & Gradient Border */}
      <div className="gradient-border-light shadow-lg shadow-blue-500/10">
        <div className="bg-white rounded-[1.4rem] p-6 sm:p-8 relative overflow-hidden border border-slate-100">
          {/* Subtle Ambient Radial Blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Status Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-100 pb-4">
            {/* Verified Team Pill in Emerald */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-extrabold tracking-widest uppercase shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>✓ VERIFIED TEAM</span>
            </div>

            {/* Team ID badge in Cyan/Blue with subtle underline */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 shadow-sm"
            >
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-bold">
                OFFICIAL ID:
              </span>
              <span className="font-mono text-base font-black text-[#0891B2] tracking-wider relative">
                {team.teamId}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-[#06B6D4] to-[#2563EB] rounded-full" />
              </span>
            </motion.div>
          </div>

          {/* Main Identity Block */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-extrabold tracking-widest text-[#64748B] uppercase block mb-1">
                REGISTERED TEAM
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111827] uppercase break-words leading-tight">
                {team.teamName}
              </h1>
              <p className="text-sm text-[#475569] mt-2.5 flex flex-wrap items-center gap-2 font-medium">
                <span className="text-[#0F172A] font-semibold">{team.college}</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#0F172A]">{team.venue}</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#D97706] font-bold">{team.dates}</span>
              </p>
            </div>

            {/* Badges / Quick Cards */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              {/* Category Card */}
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                  <Tag className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>Project Category</span>
                </div>
                <div className="text-base font-black text-[#7C3AED] uppercase">
                  {team.category || 'General Track'}
                </div>
              </div>

              {/* Members Count Card */}
              <div className="bg-[#F8FAFC] px-4 py-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#475569] font-bold">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Registered Members</span>
                </div>
                <span className="text-sm font-black text-[#2563EB] font-mono">
                  {team.members.length} {team.members.length === 1 ? 'Slot' : 'Slots Confirmed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
