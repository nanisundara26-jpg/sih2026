import React, { useState, useEffect } from 'react';
import { QrCode, Download, Printer, Sparkles, Check, ShieldCheck, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateTeamQrDataUrl, downloadQrImage, getTeamPermanentUrl } from '../utils/qr';
import type { TeamRecord } from '../types';

interface PermanentQrSectionProps {
  team: TeamRecord;
}

export const PermanentQrSection: React.FC<PermanentQrSectionProps> = ({ team }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const permanentUrl = getTeamPermanentUrl(team.teamId);

  useEffect(() => {
    let isMounted = true;
    generateTeamQrDataUrl(team.teamId, 600).then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [team.teamId]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    downloadQrImage(qrDataUrl, team.teamId);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrintQr = () => {
    const printWindow = window.open('', '_blank', 'width=700,height=800');
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${team.teamId} - Permanent Team QR Card</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
              color: #0f172a;
              background: #ffffff;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .card {
              border: 2px solid #0f172a;
              border-radius: 20px;
              padding: 36px 44px;
              text-align: center;
              max-width: 440px;
              box-sizing: border-box;
            }
            .institution {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #2563eb;
              letter-spacing: 1px;
            }
            .event {
              font-size: 22px;
              font-weight: 900;
              margin: 4px 0 2px 0;
              color: #0f172a;
            }
            .badge {
              display: inline-block;
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              padding: 4px 12px;
              border-radius: 999px;
              background: #f1f5f9;
              border: 1px solid #cbd5e1;
              color: #334155;
              letter-spacing: 0.5px;
              margin-bottom: 16px;
            }
            .team-name {
              font-size: 24px;
              font-weight: 900;
              text-transform: uppercase;
              margin: 0;
              color: #0f172a;
            }
            .team-id {
              font-family: monospace;
              font-size: 18px;
              font-weight: 800;
              color: #0891b2;
              margin: 4px 0 16px 0;
            }
            .qr-img {
              width: 240px;
              height: 240px;
              margin: 0 auto;
              display: block;
            }
            .notice {
              font-size: 11px;
              color: #64748b;
              margin-top: 18px;
              line-height: 1.5;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="institution">D.N.R. College of Engineering &amp; Technology</div>
            <div class="event">DNRCET SIH-2026</div>
            <div class="badge">PERMANENT TEAM QR</div>
            <div class="team-name">${team.teamName}</div>
            <div class="team-id">${team.teamId}</div>
            <img class="qr-img" src="${qrDataUrl}" alt="${team.teamId} QR" />
            <div class="notice">
              Keep this QR safely for future event verification and attendance access.
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(permanentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10 no-print"
    >
      <div className="flex items-center gap-2 mb-3">
        <QrCode className="w-4 h-4 text-blue-600" />
        <h2 className="text-xs font-extrabold tracking-widest text-blue-700 uppercase">
          PERMANENT TEAM QR
        </h2>
      </div>

      {/* Outer Card with Animated Gradient Border */}
      <div className="gradient-border-light shadow-2xl shadow-slate-900/15">
        {/* Card Background: #0F172A (Deep dark navy for contrast) */}
        <div className="bg-[#0F172A] rounded-[1.4rem] p-6 sm:p-9 relative overflow-hidden text-white border border-slate-800">
          
          {/* Subtle Ambient Scan Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950/80 text-cyan-300 border border-blue-500/40 flex items-center justify-center font-bold shadow-sm">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  PERMANENT TEAM QR
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Deterministic identity URL for team verification
                </p>
              </div>
            </div>

            {/* PERMANENT TEAM ACCESS badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>PERMANENT TEAM ACCESS</span>
            </div>
          </div>

          {/* QR Presentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Pure WHITE Background with BLACK QR Pattern */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-2xl qr-glow-pulse">
                {qrDataUrl ? (
                  /* QR is 100% static for pristine readability and immediate scanning */
                  <img
                    src={qrDataUrl}
                    alt={`Permanent QR for Team ${team.teamId}`}
                    className="w-56 h-56 sm:w-60 sm:h-60 rounded-xl select-none block bg-white"
                    loading="eager"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center bg-white">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <span className="mt-3 text-[11px] font-bold text-cyan-300 tracking-wider uppercase font-mono">
                SCAN-READY OFFICIAL CREDENTIAL
              </span>
            </div>

            {/* Right Column: Identity Details & Actions */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
                  REGISTERED TEAM NAME
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white uppercase mt-0.5 tracking-tight">
                  {team.teamName}
                </h4>

                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mt-3">
                  TEAM ID
                </span>
                <p className="font-mono text-xl sm:text-2xl font-black text-[#67E8F9] tracking-wider">
                  {team.teamId}
                </p>
              </div>

              {/* Notice Box */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 my-5 text-xs text-slate-300 leading-relaxed shadow-inner">
                <p className="font-bold text-white uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>PERMANENT TEAM ACCESS</span>
                </p>
                <p className="text-slate-300">
                  Keep this QR for future team verification and attendance. This QR code permanently maps to your registered team record.
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-700 flex items-center justify-between font-mono text-[11px] text-slate-400 truncate">
                  <span className="truncate pr-2 text-cyan-200">{permanentUrl}</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 shrink-0 focus:outline-none"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 focus:outline-none"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>QR SAVED ✓</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD QR</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrintQr}
                  className="px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 focus:outline-none"
                >
                  <Printer className="w-4 h-4 text-slate-400" />
                  <span>PRINT QR</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
