import QRCode from 'qrcode';

/**
 * Returns the permanent, deterministic URL for a given Team ID.
 * Example: https://YOUR-PRODUCTION-DOMAIN.com/team/DNRIH-26001
 * NEVER uses random numbers, timestamps, or session tokens.
 */
export function getTeamPermanentUrl(teamId: string): string {
  const normalizedId = teamId.trim().toUpperCase();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dnrcet-sih-2026.edu';
  return `${origin}/team/${encodeURIComponent(normalizedId)}`;
}

/**
 * Generates a high-resolution, static, deterministic PNG Data URL of the permanent QR code.
 */
export async function generateTeamQrDataUrl(teamId: string, size = 600): Promise<string> {
  const targetUrl = getTeamPermanentUrl(teamId);
  return QRCode.toDataURL(targetUrl, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H', // High error tolerance for crisp scanning
    color: {
      dark: '#0f172a', // Deep charcoal for maximum contrast
      light: '#ffffff', // Pure white background
    },
  });
}

/**
 * Triggers instant download of the QR image as DNRIH-26001-Team-QR.png.
 */
export function downloadQrImage(dataUrl: string, teamId: string): void {
  const cleanId = teamId.trim().toUpperCase();
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${cleanId}-Team-QR.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
