import React from 'react';
import { Calendar, MapPin, Building2, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

export const AboutEvent: React.FC = () => {
  return (
    <section id="about-section" className="py-12 md:py-16 scroll-mt-24 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-extrabold tracking-widest text-blue-700 uppercase">
            EVENT INFORMATION
          </h2>
        </div>

        {/* Official Event Identity Block */}
        <div className="gradient-border-light shadow-lg shadow-blue-500/10">
          <div className="bg-white rounded-[1.4rem] p-6 sm:p-10 relative overflow-hidden border border-slate-100">
            {/* Ambient Background Glows */}
            <div className="absolute -top-12 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute -bottom-12 left-0 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Event Header Identity */}
            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                OFFICIAL HACKATHON
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight uppercase">
                DNRCET SIH-2026
              </h2>
              <p className="text-sm sm:text-base text-[#475569] mt-2 font-medium">
                Internal Selection &amp; Hackathon for the Smart India Hackathon 2026
              </p>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 mb-8">
              {/* Dates */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 w-fit mb-3">
                  <Calendar className="w-5 h-5 text-[#2563EB]" />
                </div>
                <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Dates</p>
                <h3 className="text-base sm:text-lg font-black text-[#0F172A] uppercase mt-0.5">21 &amp; 22 SEPTEMBER 2026</h3>
                <p className="text-xs text-[#475569] mt-1 font-medium">48-Hour intensive ideation and development marathon.</p>
              </div>

              {/* Venue */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-violet-300 transition-all">
                <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 w-fit mb-3">
                  <MapPin className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Central Venue</p>
                <h3 className="text-base sm:text-lg font-black text-[#0F172A] uppercase mt-0.5">SMART CLASS ROOM</h3>
                <p className="text-xs text-[#475569] mt-1 font-medium">Equipped with gigabit LAN, presentation screens &amp; backup power.</p>
              </div>

              {/* College */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-cyan-300 transition-all">
                <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 w-fit mb-3">
                  <Building2 className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Host Institution</p>
                <h3 className="text-sm sm:text-base font-black text-[#0F172A] uppercase mt-0.5 leading-snug">
                  D.N.R. COLLEGE OF ENGG. &amp; TECH.
                </h3>
                <p className="text-xs text-[#475569] mt-1 font-medium">Bhimavaram, Andhra Pradesh.</p>
              </div>
            </div>

            {/* Participant Guidelines */}
            <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 relative z-10">
              <h4 className="text-xs font-extrabold tracking-wider text-blue-900 uppercase mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-700" />
                Hackathon Protocol &amp; Instructions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#334155]">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Download or print your official registration record before reporting to the Smart Class Room.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>All registered team members must be present with valid institutional ID cards.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>Ensure your presentation aligns with the registered SIH Problem Statement.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>For any inquiries, contact the SIH SPOC with your assigned Team ID.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
