import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConfigured?: boolean;
}

const APPS_SCRIPT_SAMPLE = `function doGet(e) {
  try {
    var rawTeamId = (e && e.parameter && (e.parameter.teamId || e.parameter.id)) || "";
    var requestedTeamId = rawTeamId.toString().trim().toUpperCase();

    if (!requestedTeamId) {
      return createJsonResponse({ success: false, error: "Missing Team ID" }, 400);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) return createJsonResponse({ success: false, error: "No Data" }, 404);

    var headers = data[0].map(function(h) { return (h || "").toString().trim(); });
    var teamIdColIndex = -1;
    for (var col = 0; col < headers.length; col++) {
      if (headers[col].toUpperCase().replace(/[^A-Z0-9]/g, "") === "TEAMID") {
        teamIdColIndex = col;
        break;
      }
    }

    if (teamIdColIndex === -1) {
      return createJsonResponse({ success: false, error: "TEAM ID column missing" }, 500);
    }

    for (var r = 1; r < data.length; r++) {
      var rowVal = (data[r][teamIdColIndex] || "").toString().trim().toUpperCase();
      if (rowVal === requestedTeamId) {
        var teamRecord = {};
        for (var c = 0; c < headers.length; c++) {
          teamRecord[headers[c]] = data[r][c] instanceof Date 
            ? Utilities.formatDate(data[r][c], "GMT+05:30", "dd/MM/yyyy HH:mm:ss")
            : (data[r][c] || "").toString().trim();
        }
        return createJsonResponse({ success: true, team: teamRecord }, 200);
      }
    }

    return createJsonResponse({ 
      success: false, 
      error: "Team ID Not Found",
      message: "We couldn't find a registered team with this ID. Please verify the Team ID and try again."
    }, 404);
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() }, 500);
  }
}

function createJsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}`;

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({
  isOpen,
  onClose,
  isConfigured,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_SAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto no-print">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Google Sheet API Connection
                </h3>
                <p className="text-xs text-slate-400">
                  Setup instructions for Google Response Sheet integration
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto py-4 space-y-4 text-xs text-slate-300 pr-1">
            {/* Connection Status Banner */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isConfigured
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              }`}
            >
              <div className={`w-3 h-3 rounded-full shrink-0 ${isConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <div>
                <p className="font-bold text-sm">
                  {isConfigured ? 'Google Sheet API Ready / Connected' : 'Google Sheet URL Not Yet Configured'}
                </p>
                <p className="text-xs opacity-90 mt-0.5">
                  {isConfigured
                    ? 'The backend is ready to query your deployed Google Apps Script.'
                    : 'Follow the 3-step setup below to connect your live Google Sheet responses.'}
                </p>
              </div>
            </div>

            {/* Quick Steps */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                Deployment Steps:
              </h4>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
                <li>Open your Google Response Sheet.</li>
                <li>Go to <strong className="text-white">Extensions &gt; Apps Script</strong>.</li>
                <li>Paste the script below and click <strong className="text-white">Deploy &gt; New deployment</strong>.</li>
                <li>Select type <strong className="text-white">Web app</strong>, set access to <strong className="text-cyan-300">Anyone</strong>, and deploy.</li>
                <li>Copy the Web App URL and add it to your <strong className="text-white">.env</strong> file as:
                  <code className="block my-1.5 p-2 rounded-lg bg-slate-950 font-mono text-cyan-300 text-[11px] select-all border border-slate-800">
                    GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
                  </code>
                </li>
              </ol>
            </div>

            {/* Code Snippet Box */}
            <div className="relative">
              <div className="flex items-center justify-between pb-1.5">
                <span className="font-mono text-slate-400 text-[11px]">google-apps-script/Code.gs</span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY SCRIPT</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto max-h-48 border border-slate-800">
                {APPS_SCRIPT_SAMPLE}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
