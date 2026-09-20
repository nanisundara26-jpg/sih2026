import React from 'react';
import { User, Hash, BookOpen, GraduationCap, Mail, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../types';

interface MemberCardProps {
  member: TeamMember;
  index: number;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: 0.07 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-[20px] p-5 border border-[#E2E8F0] shadow-sm relative overflow-hidden group hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Top Number, Badge, and Icon */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          {/* Member Number: #2563EB */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            className="font-mono text-2xl font-black text-[#2563EB]"
          >
            {member.num}
          </motion.span>

          {/* Member Badge: background #EEF2FF, text #3730A3 */}
          <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#3730A3] border border-indigo-100">
            MEMBER
          </span>
        </div>

        {/* Member icon container: light blue/violet background, icon: #2563EB */}
        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:rotate-6 group-hover:scale-105 transition-transform duration-200">
          <User className="w-4 h-4" />
        </div>
      </div>

      {/* Member Name: #0F172A, font-weight: 700 */}
      <motion.h4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 * (index + 1) }}
        className="text-lg font-bold text-[#0F172A] mb-3 uppercase tracking-tight"
      >
        {member.name}
      </motion.h4>

      {/* Structured Details with high contrast */}
      <div className="space-y-2 pt-2.5 border-t border-slate-100 text-xs">
        {member.rollNo && member.rollNo !== 'Not provided' && (
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
              <Hash className="w-3.5 h-3.5 text-blue-600" />
              Roll No
            </span>
            <span className="font-mono font-bold text-[#0F172A]">{member.rollNo}</span>
          </div>
        )}

        {member.branch && member.branch !== 'Not provided' && (
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-violet-600" />
              Branch
            </span>
            <span className="font-semibold text-[#475569]">{member.branch}</span>
          </div>
        )}

        {member.year && member.year !== 'Not provided' && (
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              Year
            </span>
            <span className="font-semibold text-[#475569]">{member.year}</span>
          </div>
        )}

        {member.email && member.email !== 'Not provided' && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email
            </span>
            <span className="font-mono text-[11px] font-bold text-[#2563EB] truncate max-w-[160px]" title={member.email}>
              {member.email}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface TeamMembersGridProps {
  members: TeamMember[];
}

export const TeamMembersGrid: React.FC<TeamMembersGridProps> = ({ members }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-extrabold tracking-widest text-[#0F172A] uppercase">
            TEAM MEMBERS ({members.length} CONFIRMED)
          </h2>
        </div>
        <span className="text-xs font-mono font-medium text-[#64748B]">
          Official Team Lineup
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, idx) => (
          <MemberCard key={`${member.num}-${idx}`} member={member} index={idx} />
        ))}
      </div>
    </section>
  );
};
