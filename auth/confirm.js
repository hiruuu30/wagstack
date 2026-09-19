import { SUPABASE_URL, SUPABASE_KEY, SESSION_KEY, resendConfirmation } from '../auth-config.js';

const params = new URLSearchParams(location.hash.slice(1));
// Keep one-use credentials out of the address bar, referrers and subsequent navigation.
history.replaceState(null, '', location.pathname);
// A second email can open in the same tab without a full document navigation.
window.addEventListener('hashchange', () => { if (location.hash) location.reload(); });
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const confirm = document.querySelector('#confirm');
const continueLink = document.querySelector('#continue');
const form = document.querySelector('#resend-form');
const status = document.querySelector('#status');
const headers = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };
let busy = false;

function recovery(heading, message) {
  title.textContent = heading;
  description.textContent = message;
  confirm.hidden = true;
  form.hidden = false;
  continueLink.hidden = true;
}

function saveSession(data) {
  if (!data.access_token || !data.refresh_token || !data.user?.id) throw new Error('invalid_session');
  try {
    const previous=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
    if(previous?.user?.id&&previous.user.id!==data.user.id){localStorage.removeItem('tfa-clone-workspace-v3');localStorage.removeItem('wagstack-pending-owner-v1');}
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    description.textContent = 'You’re all set. Your pet’s care, bookings and everyday moments are waiting in WagStack.';
  } catch {
    description.textContent = 'Your email is confirmed. Continue to WagStack and sign in to your account.';
  }
  title.textContent = 'Email confirmed';
  confirm.hidden = true;
  form.hidden = true;
  continueLink.hidden = false;
  status.textContent = '';
}

async function verify() {
  if (busy) return;
  busy = true;
  confirm.disabled = true;
  status.textContent = 'Confirming your email…';
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: 'POST', headers,
      body: JSON.stringify({ token_hash: params.get('token_hash'), type: 'email' })
    });
    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) throw new Error('retry');
      recovery('Let’s get you a fresh link', 'This confirmation link has expired or already been used. If you’ve confirmed your email, you can sign in. Otherwise, request a new link below.');
      continueLink.textContent = 'Back to WagStack';
      continueLink.hidden = false;
      status.textContent = '';
      return;
    }
    saveSession(await response.json());
  } catch {
    status.textContent = 'We couldn’t finish confirming your email. Please try again shortly. If you already confirmed, return to WagStack to sign in.';
  } finally {
    busy = false;
    confirm.disabled = false;
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  if (button.disabled) return;
  button.disabled = true;
  status.textContent = 'Sending your confirmation email…';
  try {
    await resendConfirmation(form.elements.email.value.trim());
    status.textContent = 'If this email has an unconfirmed account, a new link is on its way. Check your inbox and spam folder, then open the newest email.';
    window.setTimeout(() => { button.disabled = false; }, 60000);
  } catch (error) {
    status.textContent = error instanceof TypeError ? 'We couldn’t connect. Check your connection and try again.' : error.message;
    button.disabled = false;
  }
});

confirm.addEventListener('click', verify);

async function boot() {
  if (params.has('error') || params.has('error_code')) {
    recovery('Let’s get you a fresh link', 'This confirmation link is invalid or has expired. Request a new email below, or return to WagStack to sign in if you’ve already confirmed.');
    continueLink.textContent = 'Back to WagStack';
    continueLink.hidden = false;
    return;
  }
  if (params.get('token_hash') && ['email', 'signup'].includes(params.get('type'))) {
    // Do not consume the token on page load: email scanners may open this page.
    confirm.hidden = false;
    return;
  }
  if (params.get('access_token') && params.get('refresh_token') && ['signup', 'email'].includes(params.get('type'))) {
    status.textContent = 'Checking your confirmation…';
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { ...headers, Authorization: `Bearer ${params.get('access_token')}` }
      });
      if (!response.ok) throw new Error('invalid_session');
      const user = await response.json();
      if (!user.email_confirmed_at) throw new Error('unconfirmed');
      saveSession({ access_token: params.get('access_token'), refresh_token: params.get('refresh_token'), token_type: 'bearer', user });
      return;
    } catch {
      status.textContent = '';
      recovery('We couldn’t finish signing you in', 'Return to WagStack and sign in with your email and password. If your email still needs confirmation, request a new link below.');
    }
  } else {
    recovery('Need a confirmation email?', 'Open the newest confirmation email to finish setting up your account. If you need a new link, enter your account email below.');
  }
  continueLink.textContent = 'Back to WagStack';
  continueLink.hidden = false;
}

boot();
