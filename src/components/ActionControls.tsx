import React, { useState } from 'react';
import { Download, Printer, Search, Check, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { TeamRecord } from '../types';

interface ActionControlsProps {
  team: TeamRecord;
  onSearchAnother: () => void;
}

export const ActionControls: React.FC<ActionControlsProps> = ({ team, onSearchAnother }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const element = document.getElementById('printable-record');
      if (!element) {
        throw new Error('Registration document element not found.');
      }

      // Generate canvas with optimal resolution on pure white background
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 8mm top margin
      pdf.addImage(imgData, 'PNG', 0, 8, pdfWidth, pdfHeight);
      pdf.save(`DNRCET_SIH2026_${team.teamId}_Registration_Record.pdf`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-8 no-print">
      <div className="bg-white p-6 sm:p-7 rounded-[20px] border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
        {/* Left note */}
        <div>
          <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Official Verification Credentials
          </h3>
          <p className="text-xs text-[#475569] mt-1 font-medium">
            Download your clean official registration document for entry into the Smart Class Room.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Download PDF Button with animated states */}
          <motion.button
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl font-extrabold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing your official team document...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>✓ PDF READY</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DOWNLOAD TEAM DETAILS</span>
              </>
            )}
          </motion.button>

          {/* Print Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrint}
            className="px-5 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-[#0F172A] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center gap-2 focus:outline-none"
          >
            <Printer className="w-4 h-4 text-[#64748B]" />
            <span>PRINT DETAILS</span>
          </motion.button>

          {/* Search Another Team Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSearchAnother}
            className="px-5 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all flex items-center justify-center gap-2 focus:outline-none"
          >
            <Search className="w-4 h-4" />
            <span>SEARCH ANOTHER TEAM</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
