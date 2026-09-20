import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TeamSearch } from './components/TeamSearch';
import { VerificationLoader } from './components/VerificationLoader';
import { TeamHeader } from './components/TeamHeader';
import { LeaderCard } from './components/LeaderCard';
import { TeamMembersGrid } from './components/MemberCard';
import { RegistrationInfo } from './components/RegistrationInfo';
import { PermanentQrSection } from './components/PermanentQrSection';
import { TeamDocument } from './components/TeamDocument';
import { ActionControls } from './components/ActionControls';
import { ErrorState } from './components/ErrorState';
import { AboutEvent } from './components/AboutEvent';
import { Footer } from './components/Footer';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { fetchTeamById } from './services/api';
import type { TeamRecord, VerificationState, ServerHealth } from './types';

export function App() {
  const [verificationState, setVerificationState] = useState<VerificationState>('idle');
  const [currentTeamId, setCurrentTeamId] = useState('');
  const [verifiedTeam, setVerifiedTeam] = useState<TeamRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNotConfigured, setIsNotConfigured] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [serverHealth, setServerHealth] = useState<ServerHealth | null>(null);

  const teamProfileRef = useRef<HTMLDivElement>(null);

  // Handle Team ID Verification
  const handleVerifyTeam = useCallback(async (teamId: string) => {
    const trimmedId = teamId.trim().toUpperCase();
    if (!trimmedId) return;

    setCurrentTeamId(trimmedId);
    setVerificationState('loading');
    setShowVerificationSuccess(false);
    setErrorMessage('');
    setIsNotConfigured(false);

    try {
      // Minimum scan delay for futuristic verification feedback
      const minScanDelay = new Promise((resolve) => setTimeout(resolve, 700));
      const [result] = await Promise.all([fetchTeamById(trimmedId), minScanDelay]);

      if (result.success && result.team) {
        // Successful verification!
        setShowVerificationSuccess(true);

        // Update URL to /team/:teamId without reloading page
        if (typeof window !== 'undefined' && window.history) {
          const targetPath = `/team/${encodeURIComponent(trimmedId)}`;
          if (window.location.pathname !== targetPath) {
            window.history.pushState({ teamId: trimmedId }, '', targetPath);
          }
        }

        // Celebratory confetti
        try {
          confetti({
            particleCount: 75,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#7c3aed', '#06b6d4', '#10b981'],
          });
        } catch (e) {
          // ignore if canvas blocked
        }

        // Transition smoothly to verified profile
        setTimeout(() => {
          setVerifiedTeam(result.team!);
          setVerificationState('success');

          // Smooth scroll to verified team profile
          setTimeout(() => {
            teamProfileRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }, 800);
      } else {
        // Error or Not Found
        setVerificationState('error');
        if (result.configured === false) {
          setIsNotConfigured(true);
          setErrorMessage(result.message || 'GOOGLE_SHEET_API_URL is not yet configured.');
        } else {
          setErrorMessage(result.message || "We couldn't find a registered team with this ID. Please verify the Team ID and try again.");
        }
      }
    } catch (err: any) {
      console.error('API Verification error:', err);
      setVerificationState('error');
      setErrorMessage('Network or server error encountered while verifying team. Please try again.');
    }
  }, []);

  // Check health and detect URL route (/team/:teamId or ?teamId=...) on initial mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data: ServerHealth) => {
        setServerHealth(data);
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });

    // Section 14: QR URL Routing check
    const pathname = window.location.pathname;
    let urlTeamId = '';

    const teamMatch = pathname.match(/\/team\/([^/?#]+)/i);
    if (teamMatch && teamMatch[1]) {
      urlTeamId = decodeURIComponent(teamMatch[1]);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const paramId = urlParams.get('teamId');
      if (paramId) {
        urlTeamId = paramId;
      }
    }

    if (urlTeamId && urlTeamId.trim()) {
      handleVerifyTeam(urlTeamId.trim());
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const popMatch = window.location.pathname.match(/\/team\/([^/?#]+)/i);
      if (popMatch && popMatch[1]) {
        handleVerifyTeam(decodeURIComponent(popMatch[1]));
      } else {
        setVerificationState('idle');
        setVerifiedTeam(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleVerifyTeam]);

  const handleResetSearch = () => {
    setVerificationState('idle');
    setErrorMessage('');
    setShowVerificationSuccess(false);

    // Reset URL to root
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', '/');
    }

    setTimeout(() => {
      document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('team-id-input') as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    }, 100);
  };

  const scrollToSearch = () => {
    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
    const input = document.getElementById('team-id-input') as HTMLInputElement | null;
    if (input) input.focus();
  };

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Dynamic Background Mesh Gradients & Soft Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* Low-opacity blurred gradient circles */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/25 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-10 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute top-[50%] left-10 w-[550px] h-[550px] bg-cyan-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-pink-200/15 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navbar
        onSearchClick={scrollToSearch}
        onAboutClick={scrollToAbout}
        onHomeClick={scrollToHome}
        isConfigured={serverHealth?.configured}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onScrollToSearch={scrollToSearch} />

        {/* Team Search Card */}
        <TeamSearch
          onVerify={handleVerifyTeam}
          isLoading={verificationState === 'loading'}
          initialValue={currentTeamId}
        />

        {/* Dynamic State Feedback Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Loading State */}
          {verificationState === 'loading' && (
            <VerificationLoader
              teamId={currentTeamId}
              isVerified={showVerificationSuccess}
            />
          )}

          {/* 2. Error State */}
          {verificationState === 'error' && (
            <ErrorState
              searchedTeamId={currentTeamId}
              errorMessage={errorMessage}
              isNotConfigured={isNotConfigured}
              onTryAgain={handleResetSearch}
              onOpenConfig={() => setIsConfigModalOpen(true)}
            />
          )}

          {/* 3. Success State: Verified Team Profile */}
          {verificationState === 'success' && verifiedTeam && (
            <div ref={teamProfileRef} id="team-profile" className="pt-6 scroll-mt-24">
              {/* SECTION 1: TEAM OVERVIEW */}
              <TeamHeader team={verifiedTeam} />

              {/* SECTION 2: TEAM LEADER */}
              <LeaderCard leader={verifiedTeam.leader} />

              {/* SECTION 3: TEAM MEMBERS */}
              <TeamMembersGrid members={verifiedTeam.members} />

              {/* SECTION 4: REGISTRATION DETAILS */}
              <RegistrationInfo team={verifiedTeam} />

              {/* SECTION 5: PERMANENT TEAM QR */}
              <PermanentQrSection team={verifiedTeam} />

              {/* SECTION 6: DOCUMENT DOWNLOAD & OFFICIAL RECORD PREVIEW */}
              <ActionControls team={verifiedTeam} onSearchAnother={handleResetSearch} />
              <TeamDocument team={verifiedTeam} />
            </div>
          )}
        </div>

        {/* SECTION: EVENT INFORMATION */}
        <AboutEvent />
      </main>

      {/* Footer */}
      <Footer />

      {/* Google Sheet API Setup Modal */}
      <ConfigGuideModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        isConfigured={serverHealth?.configured}
      />
    </div>
  );
}

export default App;
