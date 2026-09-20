import React from 'react';
import { FileText, Calendar, MapPin, Building2, Tag, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TeamRecord } from '../types';

interface RegistrationInfoProps {
  team: TeamRecord;
}

export const RegistrationInfo: React.FC<RegistrationInfoProps> = ({ team }) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      {/* Dark readable heading: #0F172A with colorful icon */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-[#7C3AED]" />
        <h2 className="text-xs font-extrabold tracking-widest text-[#0F172A] uppercase">
          REGISTRATION DETAILS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Assigned Team ID Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-cyan-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <Tag className="w-4 h-4 text-[#0891B2]" />
            <span>ASSIGNED TEAM ID</span>
          </div>
          <p className="text-2xl font-black font-mono text-[#0891B2]">{team.teamId}</p>
          <p className="text-xs text-[#64748B] mt-1 font-medium">Unique SIH-2026 identifier</p>
        </div>

        {/* Registered Team Name Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
            <span>TEAM NAME</span>
          </div>
          <p className="text-xl font-black text-[#7C3AED] uppercase truncate">{team.teamName}</p>
          <p className="text-xs text-[#059669] mt-1 font-bold">Verified Active Squad</p>
        </div>

        {/* Project Track Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <Tag className="w-4 h-4 text-[#7C3AED]" />
            <span>PROJECT TRACK</span>
          </div>
          <p className="text-lg font-black text-[#7C3AED] uppercase truncate">{team.category || 'General Track'}</p>
          <p className="text-xs text-[#64748B] mt-1 font-medium">SIH Evaluation Category</p>
        </div>

        {/* College / Institution Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>COLLEGE / INSTITUTION</span>
          </div>
          <p className="text-sm font-bold text-[#0F172A]">{team.college}</p>
          <p className="text-xs text-[#64748B] mt-1 font-medium">Host &amp; Organizing Center</p>
        </div>

        {/* Timeline & Venue Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4 text-[#D97706]" />
            <span>DATES &amp; VENUE</span>
          </div>
          <p className="text-sm font-bold text-[#0F172A]">{team.dates}</p>
          <p className="text-xs text-[#D97706] mt-1 flex items-center gap-1 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{team.venue}</span>
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="bg-white p-5 rounded-[18px] border border-[#E2E8F0] shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4 text-[#059669]" />
            <span>VERIFICATION STATUS</span>
          </div>
          <p className="text-sm font-mono font-extrabold text-[#059669] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>CONFIRMED ELIGIBLE</span>
          </p>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            {team.timestamp ? `Logged: ${team.timestamp}` : 'Google Response Sheet Sync'}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
