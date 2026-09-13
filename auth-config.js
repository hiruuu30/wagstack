// Public client configuration. Sender credentials belong in Supabase's SMTP settings.
export const SUPABASE_URL = 'https://qarfgpzicxooywztgopg.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_Tt20ZQAbsBguy6cvXmuZRQ_65gtGqqq';
export const SESSION_KEY = 'wagstack-supabase-session-v1';
export const CONFIRM_REDIRECT_URL = 'https://wagstack.brickand.bond/auth/confirm.html';

export async function resendConfirmation(email) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/resend?redirect_to=${encodeURIComponent(CONFIRM_REDIRECT_URL)}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'signup', email })
  });
  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'Please wait a minute before requesting another email.'
      : 'We couldn’t send the email. Please try again shortly.');
  }
}
