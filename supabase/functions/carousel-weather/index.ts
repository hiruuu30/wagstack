import { snapshot, decide } from './logic.mjs';
const base = Deno.env.get('SUPABASE_URL')!;
const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
async function db(path: string, method = 'GET', body?: unknown) {
  const r = await fetch(`${base}/rest/v1/${path}`, { method, headers: { ...headers, Prefer: 'return=representation,resolution=merge-duplicates' }, body: body === undefined ? undefined : JSON.stringify(body) });
  if (!r.ok) throw new Error(`Weather database ${r.status}`);
  return r.status === 204 ? null : r.json();
}
const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  const token = req.headers.get('x-weather-job') || '';
  if (token.length !== 64) return reply({ error: 'Unauthorized' }, 401);
  try {
    const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))), b => b.toString(16).padStart(2, '0')).join('');
    const [state] = await db('weather_carousel_worker?id=eq.quezon-city&select=*');
    if (!state || hash !== state.secret_hash) return reply({ error: 'Unauthorized' }, 401);
    const now = Date.now();
    if (now - Date.parse(state.checked_at || '') < 60e3) return reply({ changed: false, skipped: 'Already checked' });
    let forecast = state.forecast;
    let expires = state.expires_at;
    let modified = state.last_modified;
    if (!forecast || now >= Date.parse(expires || '')) {
      const upstream = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=14.6760&lon=121.0437', {
        headers: { 'User-Agent': 'WagStack/1.0 wagstack.brickand.bond hello@brickand.bond', ...(modified ? { 'If-Modified-Since': modified } : {}) },
        signal: AbortSignal.timeout(20000)
      });
      if (upstream.status !== 304 && !upstream.ok) throw new Error(`Forecast provider ${upstream.status}`);
      if (upstream.status !== 304) forecast = await upstream.json();
      modified = upstream.headers.get('last-modified') || modified;
      const expiry = Date.parse(upstream.headers.get('expires') || '');
      expires = new Date(Number.isFinite(expiry) && expiry > now ? expiry : now + 10 * 60e3).toISOString();
    }
    const observed = snapshot(forecast, now);
    const [post] = await db('weather_carousel_posts?id=eq.quezon-city&select=*');
    const decision = decide(post?.weather, observed, state.recent || [], state.candidate, now);
    const current = decision.current || observed;
    const publishedAt = decision.publish ? new Date(now).toISOString() : post.published_at;
    // Stable published content; successful checks refresh freshness metadata only.
    await db('weather_carousel_posts?on_conflict=id', 'POST', {
      id: 'quezon-city', weather: decision.publish ? { ...current, reason: decision.reason } : post.weather,
      published_at: publishedAt, last_checked_at: new Date(now).toISOString(), source_updated_at: observed.sourceUpdatedAt
    });
    await db('weather_carousel_worker?id=eq.quezon-city', 'PATCH', {
      forecast, expires_at: expires, last_modified: modified, checked_at: new Date(now).toISOString(), candidate: decision.candidate,
      recent: [...(state.recent || []).filter((r: { checkedAt: string }) => now - Date.parse(r.checkedAt) < 65 * 60e3), observed].slice(-8)
    });
    return reply({ changed: decision.publish, published_at: publishedAt });
  } catch (error) {
    console.error('Weather check failed:', error instanceof Error ? error.message : 'Unknown error');
    return reply({ error: 'Weather check failed; retaining last published card' }, 503);
  }
});
