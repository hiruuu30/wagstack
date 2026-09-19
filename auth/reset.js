import { SUPABASE_URL, SUPABASE_KEY, SESSION_KEY, requestPasswordReset } from '../auth-config.js';
const params = new URLSearchParams(location.hash.slice(1));
history.replaceState(null, '', location.pathname);
addEventListener('hashchange', () => { if (location.hash) location.reload(); });
const $ = id => document.getElementById(id);
const headers = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };
let recoverySession = null;
function expired() {
  $('description').textContent = 'This reset link is missing, expired or already used. Request a new link below.';
  $('verify').hidden = $('password-form').hidden = true;
  $('request-form').hidden = false;
}
function ready(session) {
  recoverySession = session;
  $('verify').hidden = $('request-form').hidden = true;
  $('password-form').hidden = false;
  $('status').textContent = '';
  $('password').focus();
}
$('verify').addEventListener('click', async () => {
  $('verify').disabled = true;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/verify`, { method:'POST', headers,
      body:JSON.stringify({token_hash:params.get('token_hash'),type:'recovery'}) });
    if (!response.ok) { if(response.status>=500||response.status===429)throw new Error(); expired();return; }
    const session = await response.json();
    if (!session.access_token || !session.refresh_token || !session.user?.id) throw new Error();
    ready(session);
  } catch { $('status').textContent = 'We couldn’t check the link. Please try again.'; }
  finally { $('verify').disabled = false; }
});
$('password-form').addEventListener('submit', async event => {
  event.preventDefault();
  const button=event.target.querySelector('button');
  if(button.disabled||!recoverySession)return;
  if($('password').value!==$('repeat').value){$('status').textContent='Your passwords don’t match.';$('repeat').focus();return;}
  button.disabled=true;$('status').textContent='Saving your password…';
  try {
    const response=await fetch(`${SUPABASE_URL}/auth/v1/user`,{method:'PUT',headers:{...headers,Authorization:`Bearer ${recoverySession.access_token}`},body:JSON.stringify({password:$('password').value})});
    if(!response.ok){if([401,403].includes(response.status)){expired();$('status').textContent='';return;}throw new Error();}
    const user=await response.json();
    // Do not carry another account's cached pet records into this recovery session.
    localStorage.removeItem('tfa-clone-workspace-v3');localStorage.removeItem('wagstack-guest-mode-v1');localStorage.removeItem('wagstack-pre-guest-workspace-v1');
    localStorage.setItem(SESSION_KEY,JSON.stringify({...recoverySession,user}));
    $('title').textContent='Password updated';$('description').textContent='Your new password is ready. Continue to WagStack.';
    event.target.reset();event.target.hidden=true;$('status').textContent='';recoverySession=null;
  }catch{$('status').textContent='We couldn’t save your password. Please try again; use at least eight characters and a password you haven’t used before.';}
  finally{button.disabled=false;}
});
$('request-form').addEventListener('submit',async event=>{
  event.preventDefault();const button=event.target.querySelector('button');if(button.disabled)return;button.disabled=true;
  try{await requestPasswordReset($('email').value.trim());$('status').textContent='If this email has an account, a reset link is on its way. Check your inbox and spam folder.';setTimeout(()=>{button.disabled=false},60000);}
  catch{$('status').textContent='We couldn’t send a reset link. Please try again shortly.';button.disabled=false;}
});
async function boot(){
  if(params.get('type')!=='recovery'||params.has('error')||params.has('error_code'))return expired();
  if(params.get('token_hash')){$('verify').hidden=false;return;}
  if(params.get('access_token')&&params.get('refresh_token')){
    try{const response=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{...headers,Authorization:`Bearer ${params.get('access_token')}`}});if(!response.ok)throw new Error();const user=await response.json();if(!user.id)throw new Error();ready({access_token:params.get('access_token'),refresh_token:params.get('refresh_token'),user});return;}catch{}
  }
  expired();
}
boot();
