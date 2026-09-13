import { observeUI } from './ui-lifecycle.js';

(()=>{
  const PATH='/admin';
  const money=v=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(Number(v||0));
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtDate=v=>{if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?'—':d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})};
  const fmtTime=v=>{if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?'—':d.toLocaleTimeString('en-PH',{hour:'numeric',minute:'2-digit'})};
  const statusLabel=v=>String(v||'').split('_').map(x=>x?x[0].toUpperCase()+x.slice(1):'').join(' ');
  const cloud=()=>window.WagStackSupabase;
  let data=null;

  const css=`
  .admin-demo-link:after{display:none!important}.wa-demo{display:none!important}.wa-chip[data-demo]{display:none!important}
  .wa-btn{cursor:pointer!important;opacity:1!important}.wa-btn:disabled{cursor:not-allowed!important;opacity:.5!important}
  .wa-select{border:1px solid rgba(11,30,63,.12);border-radius:10px;padding:7px 9px;background:#fff;color:#0b1e3f;font:700 8px Poppins;outline:none}.wa-empty{padding:28px;text-align:center;color:#8592a4;font-size:10px}.wa-error{margin:20px 0;padding:14px;border-radius:14px;background:#fff0f0;color:#b42318;font-size:10px}.wa-loading{padding:40px;text-align:center;color:#7d8a9b;font-size:10px}.wa-live{display:inline-flex;align-items:center;gap:6px}.wa-live:before{content:'';width:7px;height:7px;border-radius:50%;background:#22a06b}.wa-owner{font-size:7px;color:#8794a5}.wa-refresh{border:0;border-radius:999px;padding:10px 13px;background:#eef1f4;color:#0b1e3f;font:700 9px Poppins;cursor:pointer}
  [data-theme='dark'] .wa-select{background:#17314f;color:#eef3fb;border-color:rgba(255,255,255,.12)}
  `;

  function injectCss(){if(document.getElementById('wag-admin-prod-css'))return;const s=document.createElement('style');s.id='wag-admin-prod-css';s.textContent=css;document.head.appendChild(s)}

  async function getAll(){
    const c=cloud();
    const session=await c?.ensureSession?.();
    if(!session?.access_token)throw new Error('Sign in with your admin account to open the business dashboard.');
    const admin=await c.db.get('admin_users',`select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`);
    if(!admin.length)throw new Error('This account does not have WagStack admin access.');
    const [profiles,pets,bookings,wallets,userMemberships,memberships,orders,items,products]=await Promise.all([
      c.db.get('profiles','select=id,full_name,phone,avatar_url,created_at,updated_at&order=created_at.desc'),
      c.db.get('pets','select=id,owner_id,name,species,breed,sex,birth_date,weight_kg,avatar_url,pixel_avatar_url,created_at,updated_at&order=created_at.desc'),
      c.db.get('bookings','select=id,owner_id,pet_id,booking_type,service_name,starts_at,ends_at,status,total_amount,special_requests,created_at,updated_at&order=starts_at.desc'),
      c.db.get('reward_wallets','select=owner_id,points_balance,lifetime_points,updated_at'),
      c.db.get('user_memberships','select=id,owner_id,membership_id,status,starts_at,ends_at,created_at&order=created_at.desc'),
      c.db.get('memberships','select=id,name,monthly_price,annual_price,active'),
      c.db.get('orders','select=id,owner_id,status,subtotal,total,created_at,updated_at&order=created_at.desc'),
      c.db.get('order_items','select=id,order_id,product_id,quantity,unit_price,product_name,created_at'),
      c.db.get('products','select=id,name,price,stock,active,updated_at&order=name.asc')
    ]);
    const profileById=new Map(profiles.map(x=>[x.id,x]));
    const petById=new Map(pets.map(x=>[x.id,x]));
    const walletByOwner=new Map(wallets.map(x=>[x.owner_id,x]));
    const membershipById=new Map(memberships.map(x=>[x.id,x]));
    const activeMembershipByOwner=new Map();
    for(const m of userMemberships){if(!activeMembershipByOwner.has(m.owner_id)||m.status==='active')activeMembershipByOwner.set(m.owner_id,m)}
    const itemsByOrder=new Map();for(const i of items){if(!itemsByOrder.has(i.order_id))itemsByOrder.set(i.order_id,[]);itemsByOrder.get(i.order_id).push(i)}
    const today=new Date().toISOString().slice(0,10);
    const goodRevenue=new Set(['paid','processing','ready','completed']);
    return {
      profiles,pets,products,
      bookings:bookings.map(b=>({...b,owner:profileById.get(b.owner_id)?.full_name||'Customer',pet:petById.get(b.pet_id)?.name||'Pet'})),
      clients:pets.map(p=>{const um=activeMembershipByOwner.get(p.owner_id);return {...p,owner:profileById.get(p.owner_id)?.full_name||'Customer',points:Number(walletByOwner.get(p.owner_id)?.points_balance||0),membership:um?membershipById.get(um.membership_id)?.name||'Membership':null,membership_status:um?.status||null}}),
      orders:orders.map(o=>({...o,customer:profileById.get(o.owner_id)?.full_name||'Customer',items:itemsByOrder.get(o.id)||[]})),
      members:userMemberships.map(m=>({...m,customer:profileById.get(m.owner_id)?.full_name||'Customer',plan:membershipById.get(m.membership_id)?.name||'Membership'})),
      kpis:{
        todayBookings:bookings.filter(b=>String(b.starts_at||'').slice(0,10)===today&&b.status!=='cancelled').length,
        activePets:pets.length,
        revenue:orders.filter(o=>goodRevenue.has(o.status)).reduce((a,o)=>a+Number(o.total||0),0),
        activeMembers:userMemberships.filter(m=>m.status==='active').length,
        customers:profiles.length,
        pendingOrders:orders.filter(o=>['pending','paid','processing','ready'].includes(o.status)).length
      }
    };
  }

  const rowTable=(heads,rows)=>`<div class="wa-card wa-panel"><div class="wa-tablewrap"><table class="wa-table"><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${heads.length}"><div class="wa-empty">No records yet.</div></td></tr>`}</tbody></table></div></div>`;

  function render(){
    if(location.pathname!==PATH)return;
    injectCss();document.title='WagStack Admin';
    if(!data){document.body.innerHTML='<main class="wa-main"><div class="wa-loading">Loading live WagStack data…</div></main>';return}
    const {kpis,bookings,clients,orders,members}=data;
    const bookingRows=bookings.map(b=>`<tr><td>${fmtDate(b.starts_at)}<div class="wa-owner">${fmtTime(b.starts_at)}</div></td><td><strong>${esc(b.pet)}</strong><div class="wa-owner">${esc(b.owner)}</div></td><td>${esc(b.service_name||statusLabel(b.booking_type))}</td><td>${b.total_amount==null?'—':money(b.total_amount)}</td><td><select class="wa-select" data-booking-status="${esc(b.id)}">${['pending','confirmed','checked_in','completed','cancelled','no_show'].map(s=>`<option value="${s}" ${s===b.status?'selected':''}>${statusLabel(s)}</option>`).join('')}</select></td></tr>`);
    const clientRows=clients.map(p=>`<tr><td><strong>${esc(p.name)}</strong><div class="wa-owner">${esc(p.owner)}</div></td><td>${esc(p.breed||statusLabel(p.species))}</td><td>${esc(p.sex||'—')}</td><td>${p.weight_kg==null?'—':`${esc(p.weight_kg)} kg`}</td><td>${esc(p.points)}</td><td>${esc(p.membership||'—')}</td></tr>`);
    const orderRows=orders.map(o=>`<tr><td><strong>${esc(String(o.id).slice(0,8).toUpperCase())}</strong><div class="wa-owner">${fmtDate(o.created_at)}</div></td><td>${esc(o.customer)}</td><td>${esc(o.items.map(i=>`${i.product_name||'Item'} ×${i.quantity}`).join(', ')||'—')}</td><td>${money(o.total)}</td><td><select class="wa-select" data-order-status="${esc(o.id)}">${['pending','paid','processing','ready','completed','cancelled','refunded'].map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${statusLabel(s)}</option>`).join('')}</select></td></tr>`);
    const memberRows=members.map(m=>`<tr><td>${esc(m.customer)}</td><td>${esc(m.plan)}</td><td>${statusLabel(m.status)}</td><td>${fmtDate(m.starts_at)}</td><td>${fmtDate(m.ends_at)}</td></tr>`);
    document.body.innerHTML=`<div class="wa"><aside class="wa-side"><a class="wa-brand" href="/admin"><img src="/assets/wagstack-brandmark.svg" alt=""><span><strong>wagstack.</strong><small>Business Admin</small></span></a><nav class="wa-nav"><button class="is-on" data-wa="overview">Overview</button><button data-wa="bookings">Bookings</button><button data-wa="clients">Pets & Clients</button><button data-wa="orders">Orders</button><button data-wa="members">Memberships</button></nav><button class="wa-exit" data-wa-exit>← Back to customer app</button></aside><main class="wa-main"><header class="wa-top"><div><div class="wa-kicker">Business workspace</div><h1>WagStack Admin</h1><p class="wa-sub"><span class="wa-live">Live Supabase data</span> · ${kpis.customers} customer account${kpis.customers===1?'':'s'}</p></div><div class="wa-actions"><button class="wa-refresh" data-refresh>Refresh</button></div></header><section class="wa-view is-on" data-view="overview"><div class="wa-kpis">${[['Today’s bookings',kpis.todayBookings,'Live schedule'],['Active pets',kpis.activePets,'Saved pet profiles'],['Revenue',money(kpis.revenue),'Paid / processing / completed orders'],['Club members',kpis.activeMembers,'Active memberships']].map(x=>`<article class="wa-card wa-kpi"><div class="wa-label">${esc(x[0])}</div><div class="wa-value">${esc(x[1])}</div><div class="wa-note">${esc(x[2])}</div></article>`).join('')}</div><div class="wa-grid"><article class="wa-card wa-panel"><div class="wa-head"><h2>Upcoming / recent bookings</h2><span>${bookings.length} total</span></div><div class="wa-activity">${bookings.slice(0,6).map(b=>`<div class="wa-act"><strong>${esc(b.pet)} · ${esc(b.service_name||statusLabel(b.booking_type))}</strong><small>${fmtDate(b.starts_at)} ${fmtTime(b.starts_at)} · ${esc(statusLabel(b.status))}</small></div>`).join('')||'<div class="wa-empty">No bookings yet.</div>'}</div></article><article class="wa-card wa-panel"><div class="wa-head"><h2>Operations</h2><span>Current</span></div><div class="wa-activity"><div class="wa-act"><strong>${kpis.pendingOrders} open shop orders</strong><small>Pending through ready</small></div><div class="wa-act"><strong>${kpis.customers} customer accounts</strong><small>Authenticated profiles</small></div><div class="wa-act"><strong>${data.products.filter(p=>p.active).length} active products</strong><small>${data.products.reduce((a,p)=>a+Number(p.stock||0),0)} units in stock</small></div></div></article></div></section><section class="wa-view" data-view="bookings"><div class="wa-titlebar"><h2>Bookings</h2><span class="wa-chip">${bookings.length} records</span></div>${rowTable(['Date','Pet / Owner','Service','Amount','Status'],bookingRows)}</section><section class="wa-view" data-view="clients"><div class="wa-metrics"><article class="wa-card wa-mini"><strong>${kpis.activePets}</strong><span>Pet profiles</span></article><article class="wa-card wa-mini"><strong>${kpis.customers}</strong><span>Customer accounts</span></article><article class="wa-card wa-mini"><strong>${kpis.activeMembers}</strong><span>Active memberships</span></article></div>${rowTable(['Pet / Owner','Breed','Sex','Weight','Paw Points','Club'],clientRows)}</section><section class="wa-view" data-view="orders"><div class="wa-titlebar"><h2>Shop orders</h2><span class="wa-chip">${orders.length} records</span></div>${rowTable(['Order','Customer','Items','Total','Status'],orderRows)}</section><section class="wa-view" data-view="members"><div class="wa-metrics"><article class="wa-card wa-mini"><strong>${kpis.activeMembers}</strong><span>Active members</span></article><article class="wa-card wa-mini"><strong>${members.length}</strong><span>Total membership records</span></article><article class="wa-card wa-mini"><strong>${data.products.filter(p=>p.active).length}</strong><span>Active shop products</span></article></div>${rowTable(['Member','Plan','Status','Started','Ends'],memberRows)}</section></main></div>`;
  }

  async function refresh(){
    try{data=await getAll();render()}catch(err){injectCss();document.title='WagStack Admin';document.body.innerHTML=`<main class="wa-main"><div class="wa-error"><strong>Admin dashboard unavailable.</strong><br>${esc(err?.message||err)}</div><button class="wa-refresh" onclick="location.href='/'">Back to WagStack</button></main>`}
  }

  async function update(table,id,status){
    const c=cloud();
    const allowed=table==='bookings'?['pending','confirmed','checked_in','completed','cancelled','no_show']:['pending','paid','processing','ready','completed','cancelled','refunded'];
    if(!allowed.includes(status))throw new Error('Invalid status');
    await c.db.update(table,`id=eq.${encodeURIComponent(id)}`,{status,updated_at:new Date().toISOString()});
  }

  document.addEventListener('click',e=>{
    if(location.pathname!==PATH)return;
    const tab=e.target.closest('[data-wa]');if(tab){document.querySelectorAll('[data-wa]').forEach(x=>x.classList.toggle('is-on',x===tab));document.querySelectorAll('.wa-view').forEach(v=>v.classList.toggle('is-on',v.dataset.view===tab.dataset.wa))}
    if(e.target.closest('[data-wa-exit]'))location.href='/';
    if(e.target.closest('[data-refresh]'))refresh();
  });
  document.addEventListener('change',async e=>{
    const b=e.target.closest('[data-booking-status]');const o=e.target.closest('[data-order-status]');if(!b&&!o)return;
    const el=b||o;el.disabled=true;
    try{await update(b?'bookings':'orders',b?b.dataset.bookingStatus:o.dataset.orderStatus,el.value);await refresh()}catch(err){alert(err.message);el.disabled=false}
  });

  function patchAdminEntry(){
    if(location.pathname===PATH)return;
    document.querySelectorAll('[data-admin-demo-login]').forEach(btn=>{btn.textContent='Open business admin';const note=btn.nextElementSibling;if(note?.classList.contains('wag-auth-guest-note'))note.textContent='For authorized business administrators.'});
  }

  if(location.pathname===PATH){setTimeout(refresh,0)}
  observeUI(patchAdminEntry);patchAdminEntry();
})();