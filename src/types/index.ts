export interface TeamLeader {
  name: string;
  branch: string;
  year: string;
  rollNo: string;
  email: string;
  mobile: string;
}

export interface TeamMember {
  num: string; // e.g. "01", "02"
  name: string;
  rollNo?: string;
  branch?: string;
  year?: string;
  email?: string;
}

export interface TeamRecord {
  teamId: string;
  teamName: string;
  category: string;
  timestamp?: string;
  college: string;
  venue: string;
  dates: string;
  event: string;
  leader: TeamLeader;
  members: TeamMember[];
  raw?: Record<string, string>;
}

export type VerificationState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  error: string;
  message: string;
  code?: string;
  configured?: boolean;
}

export interface ServerHealth {
  status: string;
  configured: boolean;
  hasRealGoogleSheetUrl: boolean;
  devMockActive: boolean;
  timestamp: string;
}
