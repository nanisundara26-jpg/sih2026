import React from 'react';
import { Calendar, MapPin, Building2, Sparkles, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onScrollToSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSearch }) => {
  return (
    <section className="relative pt-12 pb-14 md:pt-20 md:pb-20 overflow-hidden bg-[#F8FAFC]">
      {/* Subtle Animated Gradient Blobs behind hero content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[360px] bg-gradient-to-tr from-blue-300/20 via-violet-300/15 to-cyan-300/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-24 right-12 w-72 h-72 bg-pink-300/15 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-40 left-12 w-72 h-72 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" style={{ animationDelay: '-3.5s' }} />

      {/* Floating Geometric Particles (Subtle) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-16 left-[12%] w-2.5 h-2.5 rounded-full bg-blue-400/25 animate-float-particle" style={{ animationDuration: '8s' }} />
        <div className="absolute top-32 right-[18%] w-3 h-3 rounded-sm rotate-45 border border-violet-400/30 animate-float-particle" style={{ animationDuration: '11s', animationDelay: '-2s' }} />
        <div className="absolute top-56 left-[8%] w-3 h-3 rounded-full border border-emerald-400/30 animate-float-particle" style={{ animationDuration: '10s', animationDelay: '-5s' }} />
        <div className="absolute top-64 right-[10%] w-2 h-2 rounded-full bg-cyan-400/30 animate-float-particle" style={{ animationDuration: '9s', animationDelay: '-1s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Hero Badge: linear-gradient(135deg, #172554, #1E3A8A), text: #FFFFFF */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-md shadow-slate-900/10"
          style={{
            background: 'linear-gradient(135deg, #172554, #1E3A8A)',
            border: '1px solid rgba(37,99,235,0.35)',
          }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>INTERNAL HACKATHON FOR SMART INDIA HACKATHON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-extrabold text-cyan-200">SIH-2026</span>
        </motion.div>

        {/* Hero Title: font-weight 800, color #0F172A, subtle gradient on SIH-2026 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] mb-3"
        >
          DNRCET{' '}
          <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent font-black">
            SIH-2026
          </span>
        </motion.h1>

        {/* Subtitle: TEAM DETAILS PORTAL, color: #475569 */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#475569] uppercase mb-4"
        >
          TEAM DETAILS PORTAL
        </motion.h2>

        {/* Shimmering Divider Line */}
        <div className="max-w-xs sm:max-w-md mx-auto my-5">
          <div className="animated-gradient-line rounded-full" />
        </div>

        {/* Supporting text: color #475569 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl mx-auto font-normal leading-relaxed mb-8"
        >
          Securely access your registered hackathon team information using your{' '}
          <span className="text-[#0891B2] font-semibold underline decoration-[#06B6D4]/40 decoration-2 underline-offset-4">
            Team ID
          </span>
          .
        </motion.p>

        {/* Event Information Cards: #FFFFFF background, 1px solid #E2E8F0, 18px radius */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
        >
          {/* Event Dates */}
          <div className="bg-white px-4 py-4 rounded-[18px] flex items-center gap-3.5 text-left border border-[#E2E8F0] shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-blue-300 transition-all duration-300 group">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">EVENT DATES</p>
              <p className="text-sm font-extrabold text-[#0F172A] mt-0.5">21 &amp; 22 September 2026</p>
            </div>
          </div>

          {/* Venue */}
          <div className="bg-white px-4 py-4 rounded-[18px] flex items-center gap-3.5 text-left border border-[#E2E8F0] shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-violet-300 transition-all duration-300 group">
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 text-[#7C3AED]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">VENUE</p>
              <p className="text-sm font-extrabold text-[#0F172A] mt-0.5">Smart Class Room</p>
            </div>
          </div>

          {/* College */}
          <div className="bg-white px-4 py-4 rounded-[18px] flex items-center gap-3.5 text-left border border-[#E2E8F0] shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-cyan-300 transition-all duration-300 group">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">COLLEGE</p>
              <p className="text-xs sm:text-sm font-extrabold text-[#0F172A] leading-snug mt-0.5">D.N.R. College of Engg. &amp; Tech.</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={onScrollToSearch}
            className="group inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#2563EB] transition-colors focus:outline-none py-1 px-3 rounded-full hover:bg-blue-50"
          >
            <span>ENTER TEAM ID TO VERIFY</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
