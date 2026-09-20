import React from 'react';
import { Crown, Mail, Phone, Hash, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TeamLeader } from '../types';

interface LeaderCardProps {
  leader: TeamLeader;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="mb-8"
    >
      {/* Section Subtitle */}
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-4 h-4 text-[#D97706]" />
        <h2 className="text-xs font-extrabold tracking-widest text-[#D97706] uppercase">
          TEAM LEADER
        </h2>
      </div>

      <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-amber-200 shadow-lg shadow-amber-500/5 relative overflow-hidden">
        {/* Subtle Warm Glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Top header ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#B45309] text-xs font-bold tracking-wider uppercase">
            <Crown className="w-4 h-4 text-[#D97706]" />
            <span>DESIGNATED TEAM LEADER</span>
          </div>
          <span className="text-xs font-mono text-[#64748B] font-medium">Primary Contact &amp; Presenter</span>
        </div>

        {/* Leader Identity & 2-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* Avatar & Main Credentials */}
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-md shadow-amber-500/25 shrink-0">
              {leader.name ? leader.name.charAt(0).toUpperCase() : 'L'}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight uppercase">
                {leader.name || 'Not provided'}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {leader.branch && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    {leader.branch}
                  </span>
                )}
                {leader.year && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    {leader.year}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Roll Number */}
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                <Hash className="w-3.5 h-3.5 text-blue-600" />
                <span>Roll Number</span>
              </div>
              <p className="text-sm sm:text-base font-mono font-black text-[#0F172A]">
                {leader.rollNo || 'Not provided'}
              </p>
            </div>

            {/* Department */}
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                <span>Branch / Department</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0F172A]">
                {leader.branch || 'Not provided'}
              </p>
            </div>

            {/* Email Address */}
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Email Address</span>
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold text-[#2563EB] truncate" title={leader.email}>
                {leader.email || 'Not provided'}
              </p>
            </div>

            {/* Mobile Number */}
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mobile Number</span>
              </div>
              <p className="text-sm sm:text-base font-mono font-bold text-[#059669]">
                {leader.mobile || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
