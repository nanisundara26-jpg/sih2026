import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerificationLoaderProps {
  teamId: string;
  isVerified?: boolean;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({ teamId, isVerified = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="max-w-md mx-auto my-8 px-4"
    >
      <div className="bg-white p-8 rounded-3xl border border-blue-200 text-center relative overflow-hidden shadow-xl shadow-blue-500/10">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/40 via-violet-100/30 to-cyan-100/40 rounded-3xl blur-md -z-10" />

        {/* Status Graphic */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          {!isVerified ? (
            <>
              {/* Radar scanner rings */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" style={{ animationDuration: '1.8s' }} />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-violet-200 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
              
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-md shadow-blue-500/20">
                <Cpu className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>

              {/* Scanning light sweep */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan shadow-[0_0_8px_#06b6d4]" />
            </>
          ) : (
            /* Spring checkmark animation */
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25"
            >
              <CheckCircle2 className="w-11 h-11 text-emerald-600" />
            </motion.div>
          )}
        </div>

        {/* Text Details */}
        {!isVerified ? (
          <div>
            <h3 className="text-lg font-black text-[#0F172A] mb-1 tracking-wide flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              Verifying Team ID...
            </h3>
            <p className="font-mono text-base text-[#0891B2] font-black mb-2">{teamId}</p>
            <p className="text-xs text-[#64748B] font-medium">
              Querying Google Response Sheet &amp; validating credentials...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-extrabold tracking-wider mb-2">
              ✓ TEAM VERIFIED
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] uppercase">{teamId}</h3>
            <p className="text-xs text-[#64748B] font-medium mt-1">
              Loading official team registration profile...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
