// Browser regression checks; all service traffic is intercepted. No accounts or emails are created.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=process.env.QA_OUTPUT;
const server=require('http').createServer((req,res)=>{let f=path.join(root,new URL(req.url,'http://local').pathname);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())f=path.join(root,'index.html');res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))});
const user={id:'11111111-1111-4111-8111-111111111111',email:'qa@example.test',email_confirmed_at:'2026-09-19T00:00:00Z'};
const jwt=exp=>'eyJhbGciOiJIUzI1NiJ9.'+Buffer.from(JSON.stringify({exp,sub:user.id})).toString('base64url')+'.signature';
const session={access_token:jwt(Math.floor(Date.now()/1000)+3600),refresh_token:'qa-refresh',user};
(async()=>{
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'],headless:true});
const p=await browser.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(10000);const errors=[],calls=[];let apiFailure=false,verifyStatus=200;
p.on('pageerror',e=>errors.push(e.message));
await p.route('**/*',async r=>{const req=r.request(),u=new URL(req.url());if(u.origin===origin)return r.continue();
if(u.hostname.endsWith('supabase.co')){
 calls.push({path:u.pathname,query:u.search,method:req.method(),body:req.postData()?req.postDataJSON():null});
 if(u.pathname.includes('/auth/v1/')){
  if(u.pathname.endsWith('/token'))await new Promise(resolve=>setTimeout(resolve,80));
  const status=u.pathname.endsWith('/verify')?verifyStatus:apiFailure?503:200;
  return r.fulfill({status,contentType:'application/json',body:JSON.stringify(status!==200?{message:'Unavailable'}:u.pathname.endsWith('/user')?user:u.pathname.endsWith('/token')||u.pathname.endsWith('/verify')?session:{})});
 }
 if(apiFailure)return r.fulfill({status:503,contentType:'application/json',body:'{}'});
 const table=u.pathname.split('/').at(-1);let rows=[];
 if(table==='profiles')rows=[{id:user.id,full_name:'QA Parent',normalized_ready:true}];
 if(table==='admin_users')rows=[{user_id:user.id}];
 if(table==='weather_carousel_posts')rows=[{weather:{temperature:31,wind:12,rain:3,condition:'Heavy rain'},last_checked_at:new Date().toISOString()}];
 if(table==='products')rows=[{id:'22222222-2222-4222-8222-222222222222',legacy_key:'care-brush',name:'Care Brush',price:350,stock:3,active:true,category:'Grooming',image_url:'/assets/shop/shampoo.webp'}];
 return r.fulfill({contentType:'application/json',body:JSON.stringify(rows)});
}
return r.abort();});
const check=(name,condition)=>{assert.ok(condition,name);console.log('PASS '+name)};
try{
 await p.goto(origin+'/auth/reset.html#token_hash=qa-recovery&type=recovery');
 await p.locator('#verify').waitFor({state:'visible'});
 check('Recovery link is not consumed on page load',!calls.some(c=>c.path.endsWith('/verify')));
 check('Recovery credentials removed from URL',!new URL(p.url()).hash);
 await p.locator('#verify').click();await p.locator('#password-form').waitFor({state:'visible'});
 await p.getByLabel('New password',{exact:true}).fill('new-password-123');await p.getByLabel('Confirm new password').fill('different-password');await p.getByRole('button',{name:'Save new password'}).click();
 check('Mismatched passwords are rejected',(await p.locator('#status').innerText()).includes('don’t match'));
 await p.getByLabel('Confirm new password').fill('new-password-123');await p.getByRole('button',{name:'Save new password'}).click();await p.getByRole('heading',{name:'Password updated'}).waitFor();
 check('Password update uses authenticated endpoint',calls.some(c=>c.method==='PUT'&&c.path.endsWith('/user')&&c.body.password==='new-password-123'));
 await p.evaluate(()=>localStorage.clear());verifyStatus=422;
 await p.goto(origin+'/auth/reset.html#token_hash=expired&type=recovery');await p.locator('#verify').click();await p.locator('#request-form').waitFor({state:'visible'});
 await p.getByLabel('Account email').fill('qa@example.test');await p.getByRole('button',{name:'Send a new reset link'}).click();await p.getByRole('status').filter({hasText:'on its way'}).waitFor();
 check('Reset requests use production URL',calls.some(c=>c.path.endsWith('/recover')&&decodeURIComponent(c.query).includes('https://wagstack.brickand.bond/auth/reset.html')));
 await p.goto(origin+'/');await p.waitForFunction(()=>!!window.WagStackSupabase);await p.evaluate(()=>document.querySelector('.wag-cloud-btn').click());
 await p.getByLabel('Email',{exact:true}).waitFor();await p.waitForTimeout(100);
 if(out)await p.screenshot({path:path.join(out,'polished-signin.png'),fullPage:true});
 check('Sign-in initially focuses email',await p.getByLabel('Email',{exact:true}).evaluate(e=>e===document.activeElement));
 await p.getByLabel('Email',{exact:true}).fill('qa@example.test');await p.getByLabel('Password',{exact:true}).fill('wrong-password');apiFailure=true;
 await p.getByLabel('Password',{exact:true}).press('Enter');await p.locator('.wag-auth-msg').filter({hasText:'Unable to sign in'}).waitFor();
 check('Failed sign-in permits retry',!(await p.locator('[data-signin]').isDisabled()));
 await p.keyboard.press('Escape');check('Escape closes sign-in',await p.locator('.wag-auth-backdrop').count()===0);apiFailure=false;
 // A fresh real account must have no sample records, and no crashes on direct routes.
 await p.evaluate(s=>{localStorage.setItem('wagstack-supabase-session-v1',JSON.stringify(s));localStorage.removeItem('tfa-clone-workspace-v3')},session);
 const beforeAccountLoad=calls.length;await p.goto(origin+'/pets');await p.getByRole('heading',{name:/Add your first pet|No pets yet/}).waitFor();
 await p.waitForTimeout(450);check('Initial account hydration does not write blank defaults',!calls.slice(beforeAccountLoad).some(c=>c.path.includes('/rest/v1/')&&c.method!=='GET'));
 check('Real account starts without demo pets',await p.evaluate(()=>JSON.parse(localStorage.getItem('tfa-clone-workspace-v3')).pets.length===0));
 // Exercise refresh deduplication in the bridge without the app's hydration listeners.
 await p.goto(origin+'/auth/reset.html');await p.evaluate(async s=>{localStorage.setItem('wagstack-supabase-session-v1',JSON.stringify(s));await import('/supabase-bridge.js')},{...session,access_token:jwt(1)});
 await p.waitForTimeout(180);const before=calls.filter(c=>c.path.endsWith('/token')).length;
 await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('wagstack-supabase-session-v1'));s.access_token='eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjF9.x';localStorage.setItem('wagstack-supabase-session-v1',JSON.stringify(s));dispatchEvent(new StorageEvent('storage',{key:'wagstack-supabase-session-v1'}))});
 await p.evaluate(()=>Promise.all([WagStackSupabase.ensureSession(),WagStackSupabase.ensureSession(),WagStackSupabase.ensureSession()]));
 check('Concurrent requests refresh token once',calls.filter(c=>c.path.endsWith('/token')).length-before===1);
 // Isolated customer data adapter: verify queueing and explicit owner scopes with actual module code.
 await p.goto(origin+'/auth/reset.html');
 const adapter=await p.evaluate(async user=>{
   const operations=[];let slow=false;
   localStorage.setItem('tfa-clone-workspace-v3',JSON.stringify({profile:{name:'First'},pets:[],healthByPet:{},bookings:[],cart:[],points:0}));
   window.WagStackSupabase={session:{user},setCloudState:()=>{},db:{
     get:async(t,q)=>{operations.push(['get',t,q]);return t==='profiles'?[{normalized_ready:true}]:[]},
     insert:async(t,p)=>{operations.push(['insert',t,p]);if(t==='profiles'&&slow){slow=false;await new Promise(r=>setTimeout(r,180))}return []},
     update:async()=>[],delete:async(t,q)=>{operations.push(['delete',t,q]);return true}
   }};
   await import('/supabase-normalized.js');await WagStackNormalized.initialize();
   slow=true;const first=WagStackNormalized.sync();await new Promise(r=>setTimeout(r,30));
   const state=JSON.parse(localStorage.getItem('tfa-clone-workspace-v3'));state.profile.name='Latest';localStorage.setItem('tfa-clone-workspace-v3',JSON.stringify(state));
   await Promise.all([first,WagStackNormalized.sync()]);
   const realInsert=WagStackSupabase.db.insert;WagStackSupabase.db.insert=async()=>{throw new Error('Expected offline fixture')};
   const unsaved=JSON.parse(localStorage.getItem('tfa-clone-workspace-v3'));unsaved.profile.name='Offline edit';localStorage.setItem('tfa-clone-workspace-v3',JSON.stringify(unsaved));await WagStackNormalized.sync();
   operations.push(['pending',localStorage.getItem('wagstack-pending-owner-v1')]);
   WagStackSupabase.db.insert=realInsert;await WagStackNormalized.initialize();
   return operations;
 },user);
 check('Edits made during a save reach the database',adapter.some(o=>o[0]==='insert'&&o[1]==='profiles'&&o[2].full_name==='Latest'));
 check('Customer queries include account filters',adapter.filter(o=>['get','delete'].includes(o[0])&&['pets','bookings','health_records','orders','user_memberships'].includes(o[1])).every(o=>o[2].includes('owner_id=eq.'+user.id)));
 check('Failed saves remain queued for this account',adapter.some(o=>o[0]==='pending'&&o[1]===user.id));
 check('Reconnection saves offline edits before refreshing',adapter.some(o=>o[0]==='insert'&&o[1]==='profiles'&&o[2].full_name==='Offline edit'));
 // Admin owns its document and unauthorized visitors receive a recoverable state.
 await p.evaluate(()=>localStorage.clear());await p.goto(origin+'/admin');await p.getByText('Admin dashboard unavailable.').waitFor();
 check('Admin error includes retry',await p.getByRole('button',{name:'Try again'}).count()===1);
 await p.evaluate(s=>localStorage.setItem('wagstack-supabase-session-v1',JSON.stringify(s)),session);await p.reload();await p.locator('[data-wa=bookings]').waitFor();
 await p.locator('[data-wa=bookings]').click();await p.locator('[data-refresh]').click();await p.waitForTimeout(200);
 check('Admin refresh preserves the selected tab',await p.locator('[data-wa=bookings]').evaluate(e=>e.classList.contains('is-on')));
 for(const theme of ['light','dark'])for(const width of [390,1440]){await p.setViewportSize({width,height:900});await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);check(`Admin ${theme} ${width} fits viewport`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(out)await p.screenshot({path:path.join(out,`polished-admin-${theme}-${width}.png`),fullPage:true});}
 await p.setViewportSize({width:390,height:844});

 // Guest route navigation retains content, pagination and dimensions.
 await p.goto(origin+'/');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('wagstack-guest-mode-v1','1')});await p.reload();
 await p.locator('.adoption-slide').waitFor();await p.waitForTimeout(150);
 const initialHeight=await p.locator('.home__promo-card').evaluate(e=>e.getBoundingClientRect().height);
 await p.evaluate(()=>{history.pushState({},'','/shop');dispatchEvent(new PopStateEvent('popstate'))});await p.waitForTimeout(100);
 await p.evaluate(()=>{history.pushState({},'','/');dispatchEvent(new PopStateEvent('popstate'))});await p.locator('.adoption-slide').waitFor();await p.waitForTimeout(100);
 check('Returning home restores enhanced carousel',await p.locator('.weather-slide').count()===1);
 check('Carousel height stays fixed',await p.locator('.home__promo-card').evaluate(e=>e.getBoundingClientRect().height)===initialHeight);
 apiFailure=true;await p.evaluate(()=>{history.pushState({},'','/shop');dispatchEvent(new PopStateEvent('popstate'));WagStackCatalog.retry()});await p.getByRole('heading',{name:'The shop couldn’t load'}).waitFor();
 check('Failed catalog offers retry instead of mock inventory',await p.locator('.v27-product').count()===0);
 apiFailure=false;await p.locator('[data-catalog-retry]').click();await p.locator('.v27-product').waitFor();
 check('Catalog retry restores live products',(await p.locator('.v27-product').innerText()).includes('Care Brush'));
 await p.evaluate(()=>{history.pushState({},'','/');dispatchEvent(new PopStateEvent('popstate'))});await p.locator('.adoption-slide').waitFor();await p.waitForTimeout(100);
 check('Pagination exposes current slide',await p.locator('[data-promo-dot][aria-pressed=true]').count()===1);
 if(out){await p.evaluate(()=>{document.documentElement.dataset.theme='dark';dispatchEvent(new Event('themechange'));const v=document.querySelector('[data-promo-viewport]');v.scrollTo({left:v.clientWidth,behavior:'instant'})});await p.waitForTimeout(200);await p.locator('.home__promo-card').screenshot({path:path.join(out,'polished-weather-dark.png')});}
 const geometry=[];
 for(const theme of ['light','dark'])for(const width of [360,375,390,430,768,1280,1366,1440,1920]){
   await p.setViewportSize({width,height:900});await p.evaluate(t=>{if(document.documentElement.dataset.theme!==t)document.querySelector('.rail__theme')?.click()},theme);
   for(const route of ['/','/pets','/health','/grooming','/hotel','/rewards','/shop','/profile']){
     await p.evaluate(route=>{history.pushState({},'',route);dispatchEvent(new PopStateEvent('popstate'))},route);await p.waitForTimeout(80);
     const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);geometry.push({theme,width,route,overflow});assert.equal(overflow,false,`${theme} ${width} ${route} overflow`);
     if(out&&[390,1440].includes(width)&&['/','/pets','/hotel'].includes(route))await p.screenshot({path:path.join(out,`polished-${theme}-${width}-${route.slice(1)||'home'}.png`),fullPage:true});
   }
 }
 check('Responsive route checks',geometry.length===144);
 if(out)fs.writeFileSync(path.join(out,'polish-results.json'),JSON.stringify({geometry,errors},null,2));
 check('No uncaught JavaScript errors',errors.length===0);
 console.log('All production-polish regression checks passed. No live writes or emails.');
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
