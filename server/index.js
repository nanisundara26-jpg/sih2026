import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper function to safely clean string fields
function cleanValue(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str.toLowerCase() === 'undefined' || str.toLowerCase() === 'null' || str.toLowerCase() === 'nan') {
    return '';
  }
  return str;
}

// Normalize incoming team record from Google Apps Script
function normalizeTeamRecord(raw) {
  if (!raw || typeof raw !== 'object') return null;

  // Case-insensitive / whitespace-tolerant lookup for sheet headers
  const getField = (...candidates) => {
    for (const key of Object.keys(raw)) {
      const normalizedKey = key.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      for (const candidate of candidates) {
        const normalizedCandidate = candidate.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (normalizedKey === normalizedCandidate) {
          const val = cleanValue(raw[key]);
          if (val) return val;
        }
      }
    }
    return '';
  };

  const teamId = getField('TEAM ID', 'TEAMID', 'ID');
  const teamName = getField('TEAM NAME', 'TEAMNAME', 'NAME OF TEAM') || `Team ${teamId}`;
  const category = getField('CATEGORY OF PROJECT', 'CATEGORY', 'PROJECT CATEGORY', 'DOMAIN') || 'General Hackathon Track';
  const timestamp = getField('Timestamp', 'TIME STAMP', 'DATE');

  // Team Leader fields
  const leaderName = getField('TEAM LEADER NAME', 'FULL NAME', 'LEADER NAME', 'NAME');
  const leaderBranch = getField('BRANCH', 'DEPARTMENT');
  const leaderYearRaw = getField('YEAR');
  const leaderYear = leaderYearRaw ? (leaderYearRaw.toUpperCase().includes('YEAR') ? leaderYearRaw : `${leaderYearRaw} Year`) : '';
  const leaderRollNo = getField('ROLL NO', 'ROLL NUMBER', 'REGISTRATION NO', 'REG NO');
  const leaderEmail = getField('EMAIL', 'Email Address', 'LEADER EMAIL');
  const leaderMobile = getField('MOBILE NUMBER', 'MOBILE', 'PHONE NUMBER', 'PHONE', 'CONTACT');

  // Members 1 through 6
  const members = [];
  for (let i = 1; i <= 6; i++) {
    const memberName = getField(`TEAM MEMBER ${i}`, `TEAM MEMBER${i}`, `MEMBER ${i}`, `MEMBER${i}`);
    if (memberName) {
      members.push({
        num: String(i).padStart(2, '0'),
        name: memberName,
        rollNo: getField(`MEMBER ${i} ROLL NO`, `MEMBER ${i} ROLL`) || '',
        branch: getField(`MEMBER ${i} BRANCH`) || '',
        year: getField(`MEMBER ${i} YEAR`) || '',
        email: getField(`MEMBER ${i} EMAIL`) || '',
      });
    }
  }

  // If no member slots were numbered but leader is present, ensure at least leader is in members list
  if (members.length === 0 && leaderName) {
    members.push({
      num: '01',
      name: leaderName,
      rollNo: leaderRollNo,
      branch: leaderBranch,
      year: leaderYear,
      email: leaderEmail,
    });
  }

  return {
    teamId,
    teamName,
    category,
    timestamp,
    college: 'D.N.R. College of Engineering and Technology',
    venue: 'Smart Class Room',
    dates: '21 & 22 September 2026',
    event: 'DNRCET SIH-2026',
    leader: {
      name: leaderName || 'Not specified',
      branch: leaderBranch || 'Not specified',
      year: leaderYear || 'Not specified',
      rollNo: leaderRollNo || 'Not specified',
      email: leaderEmail || 'Not specified',
      mobile: leaderMobile || 'Not specified',
    },
    members,
    raw,
  };
}

// Health and config status endpoint
app.get('/api/health', (req, res) => {
  const isConfigured = Boolean(process.env.GOOGLE_SHEET_API_URL && process.env.GOOGLE_SHEET_API_URL.trim().length > 0);

  res.json({
    status: 'ok',
    configured: isConfigured,
    hasRealGoogleSheetUrl: isConfigured,
    timestamp: new Date().toISOString(),
  });
});

// Primary single team lookup endpoint
// GET /api/team?teamId=DNRIH-26001
app.get('/api/team', async (req, res) => {
  const rawId = req.query.teamId;

  if (!rawId || !String(rawId).trim()) {
    return res.status(400).json({
      success: false,
      error: 'Missing Team ID',
      message: 'Please enter a valid Team ID to verify.',
    });
  }

  // Normalize ID: trim and uppercase
  const normalizedId = String(rawId).trim().toUpperCase();
  const googleSheetUrl = process.env.GOOGLE_SHEET_API_URL ? process.env.GOOGLE_SHEET_API_URL.trim() : '';

  if (!googleSheetUrl) {
    return res.status(503).json({
      success: false,
      configured: false,
      error: 'GOOGLE_SHEET_API_URL Not Configured',
      message: 'The portal is not yet connected to the Google Response Sheet. Please set GOOGLE_SHEET_API_URL in .env.',
      code: 'NOT_CONFIGURED',
    });
  }

  try {
    const targetUrl = `${googleSheetUrl}?teamId=${encodeURIComponent(normalizedId)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout for Apps Script

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      redirect: 'follow', // Essential for Google Apps Script 302 redirects
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok && response.status !== 404) {
      throw new Error(`Google Apps Script responded with HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data && data.success && data.team) {
      const normalized = normalizeTeamRecord(data.team);
      return res.json({
        success: true,
        team: normalized,
      });
    }

    // Team not found in Google Sheet
    return res.status(404).json({
      success: false,
      error: 'Team ID Not Found',
      message: "We couldn't find a registered team with this ID. Please verify the Team ID and try again.",
    });

  } catch (err) {
    console.error('[API Proxy Error]', err);

    if (err.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Gateway Timeout',
        message: 'Connecting to Google Sheets timed out. Please check your network or Google Apps Script deployment.',
      });
    }

    return res.status(502).json({
      success: false,
      error: 'Google Sheet Connection Error',
      message: 'Unable to query the Google Response Sheet. Please ensure the Web App is deployed and accessible.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Serve frontend build if dist exists
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

app.use(express.static(distPath));

// Direct SPA fallback for /team/:teamId routes
app.get(['/team/:teamId', '/team', '/'], (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // In development, Vite server handles the frontend rendering
      next();
    }
  });
});

app.listen(PORT, () => {
  console.log(`[DNRCET SIH-2026 Portal API] Server running on http://localhost:${PORT}`);
  console.log(`[DNRCET SIH-2026 Portal API] GOOGLE_SHEET_API_URL: ${process.env.GOOGLE_SHEET_API_URL ? 'Configured ✓' : 'Not configured'}`);
});

