import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  searchedTeamId: string;
  errorMessage?: string;
  onTryAgain: () => void;
  isNotConfigured?: boolean;
  onOpenConfig?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  searchedTeamId,
  errorMessage,
  onTryAgain,
  isNotConfigured = false,
  onOpenConfig,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: [0, -8, 8, -6, 6, -3, 3, 0], // Error shake animation
      }}
      transition={{
        duration: 0.5,
        x: { duration: 0.45, ease: 'easeInOut' }
      }}
      className="max-w-md mx-auto my-8 px-4"
    >
      <div className="bg-white p-8 rounded-3xl border border-rose-200 text-center relative overflow-hidden shadow-xl shadow-rose-500/10">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-100/40 via-amber-100/30 to-purple-100/40 rounded-3xl blur-lg -z-10" />

        {/* Error icon with circular badge */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-md shadow-rose-500/15">
          {isNotConfigured ? (
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <span className="text-2xl font-black text-rose-600 leading-none select-none">×</span>
            </div>
          )}
        </div>

        {/* Title: #0F172A */}
        <h3 className="text-xl font-black text-[#0F172A] mb-2 tracking-tight">
          {isNotConfigured ? 'API Connection Required' : 'Team ID Not Found'}
        </h3>

        {/* Searched ID Tag */}
        {searchedTeamId && (
          <div className="inline-block font-mono text-xs px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-bold mb-3">
            {searchedTeamId}
          </div>
        )}

        {/* Message: #475569 */}
        <p className="text-sm text-[#475569] mb-6 leading-relaxed font-medium">
          {errorMessage || "We couldn't find a registered team with this ID. Please verify the Team ID and try again."}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={onTryAgain}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-md shadow-rose-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>TRY AGAIN</span>
          </button>

          {isNotConfigured && onOpenConfig && (
            <button
              onClick={onOpenConfig}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex items-center justify-center gap-2"
            >
              <span>VIEW SETUP GUIDE</span>
            </button>
          )}
        </div>

        {/* Privacy reassurance */}
        <p className="text-[11px] text-[#64748B] mt-5 pt-4 border-t border-slate-100 font-medium">
          🔒 Participant confidentiality is strictly maintained. Unmatched queries are rejected.
        </p>
      </div>
    </motion.div>
  );
};
