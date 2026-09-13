const STORE='tfa-clone-workspace-v3';
const SESSION='wagstack-supabase-session-v1';
try {
  const account=JSON.parse(localStorage.getItem(SESSION)||'null');
  const workspace=JSON.parse(localStorage.getItem(STORE)||'null');
  if(account?.user?.id && workspace && !sessionStorage.getItem('wagstack-prod-init')) {
    const names=(workspace.pets||[]).map(p=>String(p.name||'').toLowerCase()).sort().join('|');
    if(names==='biscuit|bubbles|mochi') {
      workspace.pets=[];
      workspace.bookings=[];
      workspace.healthByPet={};
      workspace.activePet='';
      workspace.points=0;
      workspace.membership={active:false,since:'',tier:'Wag Club'};
      workspace.cart=[];
      localStorage.setItem(STORE,JSON.stringify(workspace));
    }
    sessionStorage.setItem('wagstack-prod-init','1');
  }
} catch {}
