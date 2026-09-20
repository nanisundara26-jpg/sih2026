import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateTeamQrDataUrl, getTeamPermanentUrl } from '../utils/qr';
import type { TeamRecord } from '../types';

interface TeamDocumentProps {
  team: TeamRecord;
}

export const TeamDocument: React.FC<TeamDocumentProps> = ({ team }) => {
  const [docQrUrl, setDocQrUrl] = useState<string>('');
  const permanentUrl = getTeamPermanentUrl(team.teamId);

  useEffect(() => {
    let isMounted = true;
    generateTeamQrDataUrl(team.teamId, 320).then((url) => {
      if (isMounted) setDocQrUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [team.teamId]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="my-10"
    >
      <div className="flex items-center justify-between mb-4 no-print">
        <div>
          <h2 className="text-xs font-bold tracking-widest text-slate-700 uppercase">
            DOCUMENT DOWNLOAD &amp; PRINT PREVIEW
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official Minimalist Registration Record (Includes Permanent Team QR)
          </p>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-100 text-blue-700 border border-slate-300">
          A4 PORTRAIT • OFFICIAL TEMPLATE
        </span>
      </div>

      {/* Classic Editorial Light Document Container */}
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-slate-100/80 p-2 sm:p-5 no-print border border-slate-200">
        <div
          id="printable-record"
          className="bg-white text-slate-900 p-8 sm:p-12 md:p-14 font-sans text-left mx-auto select-text shadow-sm"
          style={{
            maxWidth: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box',
          }}
        >
          {/* 1. Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                D.N.R. College of Engineering and Technology
              </p>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase mt-0.5">
                DNRCET SIH-2026
              </h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                Team Registration Record
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5">
              <p><strong className="text-slate-800">Event Dates:</strong> 21 &amp; 22 September 2026</p>
              <p><strong className="text-slate-800">Venue:</strong> Smart Class Room</p>
              <p><strong className="text-slate-800">Host:</strong> D.N.R. College of Engg. &amp; Tech.</p>
            </div>
          </div>

          {/* Thin vibrant accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 my-4" />

          {/* 2. Team Identity Section */}
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200/80 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  REGISTERED TEAM NAME
                </span>
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                  {team.teamName}
                </h2>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  OFFICIAL TEAM ID
                </span>
                <p className="font-mono text-xl font-bold text-blue-700 tracking-wider">
                  {team.teamId}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-medium">Project Category:</span>{' '}
                <strong className="text-slate-900 uppercase">{team.category || 'General Track'}</strong>
              </div>
              <div className="font-mono text-slate-500 text-[11px]">
                Status: <span className="text-emerald-700 font-bold">Verified Registration</span>
              </div>
            </div>
          </div>

          {/* 3. Team Leader Section */}
          <div className="mb-5">
            <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-2 border-b border-slate-200 pb-1">
              TEAM LEADER
            </h3>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-base font-bold text-slate-950 uppercase mb-3">
                {team.leader.name}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Branch</span>
                  <span className="font-medium text-slate-900">{team.leader.branch || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Year</span>
                  <span className="font-medium text-slate-900">{team.leader.year || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Roll Number</span>
                  <span className="font-mono font-medium text-slate-900">{team.leader.rollNo || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Contact Mobile</span>
                  <span className="font-mono font-medium text-slate-900">{team.leader.mobile || 'Not specified'}</span>
                </div>
              </div>
              {team.leader.email && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] uppercase text-slate-500 font-semibold mr-1.5">Email:</span>
                  <span className="font-mono text-slate-800">{team.leader.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Team Members Table */}
          <div className="mb-5">
            <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-2 border-b border-slate-200 pb-1">
              TEAM MEMBERS ROSTER ({team.members.length} Confirmed)
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-2 px-3 w-12 text-center">No.</th>
                    <th className="py-2 px-3">Member Name</th>
                    <th className="py-2 px-3">Roll Number</th>
                    <th className="py-2 px-3">Branch</th>
                    <th className="py-2 px-3">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {team.members.map((member, index) => {
                    const isAlt = index % 2 === 1;
                    return (
                      <tr key={index} className={isAlt ? 'bg-slate-50/60' : 'bg-white'}>
                        <td className="py-2 px-3 font-mono font-bold text-slate-500 text-center">
                          {member.num}
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-950 uppercase">
                          {member.name}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-700">
                          {member.rollNo || '—'}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {member.branch || (member.name === team.leader.name ? team.leader.branch : '—')}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          {member.year || (member.name === team.leader.name ? team.leader.year : '—')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Event Information */}
          <div className="mb-5">
            <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-2 border-b border-slate-200 pb-1">
              EVENT INFORMATION
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/80 text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Event</span>
                <span className="font-bold text-slate-900">DNRCET SIH-2026</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Date</span>
                <span className="font-medium text-slate-900">21 &amp; 22 September 2026</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Venue</span>
                <span className="font-medium text-slate-900">Smart Class Room</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">College</span>
                <span className="font-medium text-slate-900">D.N.R. College of Engg. &amp; Tech.</span>
              </div>
            </div>
          </div>

          {/* 6. Section 20: PERMANENT TEAM QR Inside PDF */}
          <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase block mb-1">
                PERMANENT TEAM QR
              </span>
              <p className="text-sm font-bold text-slate-900 uppercase">
                {team.teamName} ({team.teamId})
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Scan with any device to access the official team record.
              </p>
              <p className="font-mono text-[10px] text-slate-400 mt-1">
                {permanentUrl}
              </p>
            </div>

            <div className="shrink-0 bg-white p-1.5 rounded-lg border border-slate-300">
              {docQrUrl ? (
                <img
                  src={docQrUrl}
                  alt={`QR for ${team.teamId}`}
                  className="w-24 h-24 block"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-100 animate-pulse rounded" />
              )}
            </div>
          </div>

          {/* 7. Footer: Official Record Notice */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              <p className="font-bold text-slate-800 uppercase">DNRCET SIH-2026</p>
              <p>Official Team Registration Record</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-slate-600">Generated from the Team Details Portal</p>
              <p className="text-[10px] text-slate-400">D.N.R. College of Engineering and Technology</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
