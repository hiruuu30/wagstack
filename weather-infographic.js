// Exact SVG typography; weather values come only from the scheduled forecast feed.
export function weatherSvg(post, width = 720, height = 174) {
  const w = Math.max(280, Math.round(width)), h = Math.max(150, Math.round(height));
  const data = post.weather;
  const x = w < 440 ? 136 : Math.round(w * .34);
  const warning = data.rainLevel > 0 || data.windy || data.hot;
  const bg = warning ? '#152d4b' : '#152f39';
  const accent = warning ? '#ffc38e' : '#b6e4cd';
  const label = data.rainLevel > 0 ? data.condition : data.windy ? 'Strong winds' : data.hot ? 'Hot conditions' : data.condition;
  const advice = data.rainLevel === 3 ? 'Keep pets indoors during thunder.' : data.rainLevel > 0 ? 'Plan a dry, sheltered walk.' : data.windy ? 'Keep walks short and sheltered.' : data.hot ? 'Choose shade and bring water.' : 'A little outdoor time, together.';
  const date = new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(post.published_at));
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const text = (tx,y,size,fill,value,weight=500) => `<text x="${tx}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${esc(value)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>Quezon City weather outlook</title><rect width="${w}" height="${h}" fill="${bg}"/><g font-family="Arial,Helvetica,sans-serif">${text(18,29,12,accent,'QUEZON CITY',700)}${text(18,108,48,'#ffffff',Math.round(data.temperature)+'°',700)}${text(84,107,14,'#c6d6dc','C')}${text(x,77,w<360?16:19,'#ffffff',label,700)}${text(x,99,12,'#d3dfe5',`Rain  ${Number(data.rain).toFixed(1)} mm / h`)}${text(x,118,12,'#d3dfe5',`Wind  ${Math.round(data.wind)} km / h`)}<path d="M18 ${h-43}H${w-18}" stroke="#ffffff" stroke-opacity=".15"/>${text(18,h-25,13,accent,advice)}${text(18,h-8,10,'#bacdd5',`Last change · ${date}`)}</g></svg>`;
}
