// Run with Playwright installed. Optional PLAYWRIGHT_MODULE and CHROMIUM_PATH select an existing runtime.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs'), path = require('path'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = require('http').createServer((req, res) => {
  let file = path.join(root, new URL(req.url, 'http://localhost').pathname);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
  res.setHeader('Content-Type', ({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml'})[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH || undefined, args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844}});
    const calls = [], errors = [];
    page.on('pageerror', e => errors.push(e.message));
    let verifyStatus=200, resendStatus=200, userStatus=200;
    const user={id:'qa-user',email:'qa@example.test',email_confirmed_at:'2026-09-13T00:00:00Z'};
    const session={access_token:'qa-access',refresh_token:'qa-refresh',user};
    await page.route('**/*', route => {
      const req=route.request(),url=new URL(req.url());
      if(url.origin===origin)return route.continue();
      if(url.hostname==='qarfgpzicxooywztgopg.supabase.co'){
        calls.push({path:url.pathname,redirect:url.searchParams.get('redirect_to'),body:req.postDataJSON()});
        const status=url.pathname.endsWith('/verify')?verifyStatus:url.pathname.endsWith('/resend')?resendStatus:url.pathname.endsWith('/user')?userStatus:200;
        const body=status!==200?{error_code:'otp_expired'}:url.pathname.endsWith('/verify')?session:url.pathname.endsWith('/user')?user:{};
        return route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
      }
      return route.abort();
    });
    const callback='/auth/confirm.html';
    await page.goto(origin+callback+'#token_hash=qa-hash&type=email');
    await page.locator('#confirm').waitFor({state:'visible'});
    assert.equal(calls.length,0,'Page load must not consume token');
    assert.equal(new URL(page.url()).hash,'','Token removed from address bar');
    await page.locator('#confirm').click();
    await page.getByRole('heading',{name:'Email confirmed',exact:true}).waitFor();
    assert.deepEqual(calls[0].body,{token_hash:'qa-hash',type:'email'});
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('wagstack-supabase-session-v1')).user.id),'qa-user');
    await page.evaluate(()=>localStorage.clear());
    verifyStatus=422;
    await page.goto(origin+callback+'#token_hash=qa-expired&type=email');
    await page.locator('#confirm').click();
    await page.getByRole('heading',{name:'Let’s get you a fresh link'}).waitFor();
    assert.equal(await page.evaluate(()=>localStorage.getItem('wagstack-supabase-session-v1')),null);
    await page.getByLabel('Account email').fill('qa@example.test');
    await page.getByRole('button',{name:'Send a new confirmation email'}).click();
    await page.getByRole('status').filter({hasText:'a new link is on its way'}).waitFor();
    const resend=calls.find(c=>c.path.endsWith('/resend'));
    assert.equal(resend.redirect,'https://wagstack.brickand.bond/auth/confirm.html');
    assert.deepEqual(resend.body,{type:'signup',email:'qa@example.test'});
    assert.equal(await page.locator('#resend-form button').isDisabled(),true);
    await page.goto(origin+callback+'#error=access_denied&error_code=otp_expired&error_description=%3Cimg%20src=x%20onerror=alert(1)%3E');
    await page.locator('#resend-form').waitFor({state:'visible'});
    assert.equal(await page.locator('img').count(),0,'Untrusted errors must not render HTML');
    resendStatus=429;
    await page.getByLabel('Account email').fill('qa@example.test');
    await page.locator('#resend-form button').click();
    await page.getByRole('status').filter({hasText:'Please wait a minute'}).waitFor();
    userStatus=200;
    await page.goto(origin+callback+'#access_token=qa-access&refresh_token=qa-refresh&type=signup');
    await page.getByRole('heading',{name:'Email confirmed',exact:true}).waitFor();
    await page.evaluate(()=>localStorage.clear());
    userStatus=401;
    await page.goto(origin+callback+'#access_token=untrusted&refresh_token=untrusted&type=signup');
    await page.getByRole('heading',{name:'We couldn’t finish signing you in'}).waitFor();
    assert.equal(await page.evaluate(()=>localStorage.getItem('wagstack-supabase-session-v1')),null);
    verifyStatus=503;
    await page.goto(origin+callback+'#token_hash=qa-hash&type=email');
    await page.locator('#confirm').click();
    await page.getByRole('status').filter({hasText:'Please try again shortly'}).waitFor();
    assert.equal(await page.locator('#confirm').isDisabled(),false);
    const before=calls.length;
    await page.goto(origin+callback+'#token_hash=qa-hash&type=recovery');
    await page.locator('#resend-form').waitFor({state:'visible'});
    assert.equal(calls.length,before,'Unsupported verification type must not be submitted');
    await page.goto(origin+'/#error_code=otp_expired');
    await page.waitForURL(origin+callback);
    // Exercise the real bridge signup handler in an isolated document.
    await page.goto(origin+callback);
    await page.evaluate(async()=>{await import('/supabase-bridge.js');await window.WagStackSupabase.signUp('qa@example.test','test-password','QA');});
    assert.equal(calls.find(c=>c.path.endsWith('/signup')).redirect,'https://wagstack.brickand.bond/auth/confirm.html');
    await page.getByRole('button',{name:'Sign in',exact:true}).click();
    await page.getByLabel('Email',{exact:true}).fill('qa@example.test');
    resendStatus=200;
    await page.getByRole('button',{name:'Resend confirmation email',exact:true}).click();
    await page.locator('.wag-auth-msg').filter({hasText:'a new link is on its way'}).waitFor();
    await page.goto(origin+callback+'#token_hash=qa-preview&type=email');
    for(const theme of ['light','dark'])for(const width of [320,390,900]){
      await page.emulateMedia({colorScheme:theme});await page.setViewportSize({width,height:844});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      if(process.env.QA_OUTPUT && width===390)await page.screenshot({path:path.join(process.env.QA_OUTPUT,`confirm-${theme}.png`),fullPage:true});
    }
    await page.goto(origin+'/emails/confirm-signup.html');
    for(const width of [320,600]){
      await page.setViewportSize({width,height:1000});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      if(process.env.QA_OUTPUT)await page.screenshot({path:path.join(process.env.QA_OUTPUT,`email-${width}.png`),fullPage:true});
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: explicit signup/resend redirect; no automatic verification; successful/expired/rate-limited/server-error/unsupported links; validated legacy sessions; root callback; resend UI; mobile/dark layouts. No emails sent.');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
