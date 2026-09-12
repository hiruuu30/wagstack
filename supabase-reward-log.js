const STORE_KEY='tfa-clone-workspace-v3';
const REWARDS={
  nails:{name:'Complimentary Nail Trim',cost:100},
  spa:{name:'Spa Add-on',cost:200},
  hotel:{name:'Hotel Care Credit',cost:300}
};
const readState=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
const cloud=()=>window.WagStackSupabase;
const unique=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;

document.addEventListener('click',e=>{
  const btn=e.target.closest?.('[data-redeem]');
  if(!btn)return;
  const reward=REWARDS[btn.dataset.redeem];
  const owner=cloud()?.session?.user?.id;
  if(!reward||!owner)return;
  const before=Number(readState().points||0);
  setTimeout(async()=>{
    const after=Number(readState().points||0);
    if(before-after!==reward.cost)return;
    try{
      await cloud().db.insert('reward_transactions',{
        owner_id:owner,
        legacy_id:`redeem-${btn.dataset.redeem}-${unique()}`,
        points:-reward.cost,
        type:'redeem',
        description:reward.name,
        created_at:new Date().toISOString()
      });
    }catch(err){console.error('[WagStack reward ledger]',err)}
  },0);
},true);
