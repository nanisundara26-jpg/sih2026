import type { TeamRecord } from '../types';

// Helper to safely clean string fields
function cleanValue(val: any): string {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str.toLowerCase() === 'undefined' || str.toLowerCase() === 'null' || str.toLowerCase() === 'nan') {
    return '';
  }
  return str;
}

// Client-side normalizer ensuring raw Google Sheet response maps cleanly to UI types
export function normalizeTeamData(raw: Record<string, any>): TeamRecord {
  const getField = (...candidates: string[]): string => {
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

export interface FetchTeamResponse {
  success: boolean;
  team?: TeamRecord;
  error?: string;
  message?: string;
  configured?: boolean;
}

/**
 * Fetches a single team's details by Team ID.
 * Makes a GET request: /api/team?teamId=${encodeURIComponent(teamId)}
 * (or directly to VITE_GOOGLE_SHEET_API_URL with redirect follow if running standalone frontend)
 */
export async function fetchTeamById(teamId: string): Promise<FetchTeamResponse> {
  const normalizedId = teamId.trim().toUpperCase();
  if (!normalizedId) {
    return {
      success: false,
      error: 'Missing Team ID',
      message: 'Please enter a valid Team ID to verify.',
    };
  }

  // 1. First attempt: Query via backend proxy /api/team
  try {
    const res = await fetch(`/api/team?teamId=${encodeURIComponent(normalizedId)}`, {
      headers: { 'Accept': 'application/json' },
    });

    const data = await res.json();

    if (res.ok && data.success && data.team) {
      // If data.team is already normalized or raw, ensure it conforms to TeamRecord
      const teamRecord = (data.team.leader && data.team.members)
        ? data.team
        : normalizeTeamData(data.team.raw || data.team);
      return { success: true, team: teamRecord };
    }

    if (data.configured === false || data.code === 'NOT_CONFIGURED') {
      return {
        success: false,
        configured: false,
        error: data.error || 'API Connection Required',
        message: data.message || 'GOOGLE_SHEET_API_URL is not configured.',
      };
    }

    return {
      success: false,
      error: data.error || 'Team ID Not Found',
      message: data.message || "We couldn't find a registered team with this ID. Please verify the Team ID and try again.",
    };
  } catch (proxyErr) {
    // 2. If proxy fails (e.g. standalone Vite client without backend), try direct VITE_GOOGLE_SHEET_API_URL
    const directApiUrl = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
    if (directApiUrl) {
      try {
        const directRes = await fetch(`${directApiUrl}?teamId=${encodeURIComponent(normalizedId)}`);
        const directData = await directRes.json();
        if (directData && directData.success && directData.team) {
          const teamRecord = normalizeTeamData(directData.team);
          return { success: true, team: teamRecord };
        }
        return {
          success: false,
          error: directData.error || 'Team ID Not Found',
          message: directData.message || "We couldn't find a registered team with this ID. Please verify the Team ID and try again.",
        };
      } catch (directErr) {
        console.error('Direct Google Apps Script fetch failed:', directErr);
      }
    }

    return {
      success: false,
      error: 'Network Error',
      message: 'Network or server error encountered while verifying team. Please check your connection and try again.',
    };
  }
}
