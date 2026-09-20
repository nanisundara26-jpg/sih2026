import React from 'react';
import { ShieldCheck, Calendar, MapPin, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] py-12 mt-20 no-print text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800"
        >
          {/* Identity */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-600/30">
              <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center text-cyan-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-black text-white tracking-wide uppercase">
                DNRCET <span className="text-cyan-400">SIH-2026</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                D.N.R. College of Engineering and Technology
              </p>
            </div>
          </div>

          {/* Key Facts */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-200">21 &amp; 22 September 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-violet-400" />
              <span className="font-semibold text-slate-200">Smart Class Room</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-200">Bhimavaram</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-400">
          <p>
            © 2026 D.N.R. College of Engineering and Technology. Official SIH Portal.
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Single-Team Verified Access • Google Response Sheet Source
          </p>
        </div>
      </div>
    </footer>
  );
};
