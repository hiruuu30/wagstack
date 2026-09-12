import {
  S as Scene,
  O as OrthographicCamera,
  W as WebGLRenderer,
  P as PlaneGeometry,
  a as ShaderMaterial,
  V as Vector2,
  M as Mesh
} from './three-yEJwMVQ6.js';

// Adapted directly from the user-supplied BrewedOps HeroCanvasV2 bundle.
// The React/theme wrapper was removed; shader constants and animation math are preserved.
const simplexNoise = `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMousePace;
  uniform float uAspect;
  uniform float uDarkMix;
  varying vec2 vUv;
  ${simplexNoise}

  const float SCALE             = 0.72;
  const float NOISE_DETAIL      = 3.0;
  const float DISTORT_SCALE     = 0.55;
  const float DISTORT_INTENSITY = 0.50;
  const float HAIRLINE_PIXELS   = 1.5;
  const float CURSOR_SCALE      = 1.5;
  const float CURSOR_INTENSITY  = 0.05;
  const vec2  ANISOTROPY        = vec2(1.0, 1.0);

  void main(){
    vec2 uv = vUv;
    uv.x *= uAspect;

    vec2 mouse = uMouse * 0.5 + 0.5;
    mouse.x *= uAspect;
    float cursor = 1.0 - distance(mouse, uv) * CURSOR_SCALE;
    cursor *= uMousePace;
    cursor = clamp(cursor, 0.0, 1.0);

    float noiseDistort = 0.5 + snoise(vec3(uv * DISTORT_SCALE, uTime * 0.1)) * 0.5;
    vec2 warpedUv = (uv + cursor * CURSOR_INTENSITY + noiseDistort * DISTORT_INTENSITY) * SCALE * ANISOTROPY;
    float n = snoise(vec3(warpedUv, uTime));

    float bands = (n * 0.5 + 0.5) * NOISE_DETAIL;
    float contour = fract(bands);
    float dist    = abs(contour - 0.5);
    float w       = fwidth(bands) * HAIRLINE_PIXELS * 0.5;
    float line    = 1.0 - smoothstep(0.0, w, dist);

    vec3 bgLight   = vec3(0.957, 0.957, 0.929);
    vec3 lineLight = vec3(0.46,  0.46,  0.46);
    vec3 bgDark    = vec3(0.024, 0.047, 0.102);
    vec3 lineDark  = vec3(1.0,   1.0,   1.0);

    vec3 bg      = mix(bgLight, bgDark, uDarkMix);
    vec3 lineCol = mix(lineLight, lineDark, uDarkMix);
    lineCol += cursor * 0.04;

    float lineAlpha = line * mix(0.55, 0.45, uDarkMix);
    vec3 color = mix(bg, lineCol, lineAlpha);
    gl_FragColor = vec4(color, 1.0);
  }
`;



// Production visual-QA hardening. This runs before the app's deferred script so
// layout fixes and route-flash protection are in place as early as possible.
function applyProductionVisualQA(){
  // WagStack must not rely on a third-party live stylesheet for production UI.
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link=>{
    if((link.href||'').includes('portfolio.brewedops.cloud/assets/index-')){
      link.disabled=true;
      link.remove();
    }
  });

  const style=document.createElement('style');
  style.id='wagstack-production-qa-v24';
  style.textContent=`
  @media (min-width:901px){
    .shell__panel:not([data-fixed="true"]){overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
    .shell__panel:not([data-fixed="true"]) .clone-page{min-height:100%;padding-bottom:64px}
  }
  @media (max-width:900px){
    .rail{padding:14px 16px 12px!important;background:rgba(244,244,237,.68);backdrop-filter:blur(18px) saturate(1.15);border-bottom:1px solid rgba(11,30,63,.09)}
    [data-theme="dark"] .rail{background:rgba(7,18,36,.72);border-bottom-color:rgba(244,244,237,.09)}
    .rail__inner{grid-template-columns:54px minmax(0,1fr) auto!important;column-gap:10px!important}
    .rail__avatar{width:50px!important;height:50px!important}
    .rail__name{font-size:16px!important;min-width:0}
    .rail__handle{font-size:10.5px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .rail__edit-profile{margin-top:4px;height:23px;font-size:8.5px}
    .rail__actions{display:flex!important;grid-column:3!important;grid-row:1/3!important;margin:0!important;gap:5px!important;width:auto!important;height:auto!important}
    .rail__socials{display:flex!important;width:auto!important;height:auto!important;gap:5px!important}
    .rail__social,.rail__theme{width:36px!important;height:36px!important;flex:0 0 36px}
    .rail__social .ph-duo{width:17px!important;height:17px!important}.rail__theme .tg{width:18px!important;height:18px!important}
    .rail__action-badge{transform:scale(.86);transform-origin:100% 0}
    .rail__nav{grid-column:1/-1!important;width:100%!important;margin:10px 0 0!important;padding:9px 0 0!important;overflow:visible!important;border-top:1px solid rgba(11,30,63,.10)!important;mask-image:none!important;-webkit-mask-image:none!important}
    .rail__nav ul{display:grid!important;grid-template-columns:repeat(8,minmax(0,1fr))!important;gap:6px!important;width:100%!important}
    .rail__link{width:100%!important;height:54px!important;padding:6px 4px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;border-radius:12px!important;font-size:9px!important;line-height:1.05!important;text-align:center!important;white-space:normal!important}
    .rail__link .ricon--phosphor,.rail__link .ph-duo--nav,.rail__link .ph-duo--dynamic{width:18px!important;height:18px!important;flex:0 0 18px}
    .rail__link:hover{transform:none!important}.rail__copy{display:none!important}
  }
  @media (max-width:620px){
    .rail__inner{grid-template-columns:48px minmax(0,1fr) auto!important}.rail__avatar{width:44px!important;height:44px!important}
    .rail__actions{gap:4px!important}.rail__socials{gap:4px!important}.rail__social,.rail__theme{width:32px!important;height:32px!important;flex-basis:32px}
    .rail__nav ul{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important}.rail__link{height:52px!important;font-size:9.5px!important}
    .home{padding:16px 12px 96px!important;gap:12px!important}.home__topbar{gap:9px!important}.home__brand-slot{height:76px!important}.home__promo-card{min-height:142px!important;padding:11px 12px!important}
    .home__glass--showcase{padding:10px!important;border-radius:22px!important;overflow:visible!important}.bento{grid-template-columns:1fr!important;grid-auto-rows:auto!important;gap:11px!important}
    .bento__card{grid-column:1!important;min-height:210px!important;padding:14px!important;border-radius:20px!important}.bento__card--projects{min-height:252px!important}.bento__card--ai{min-height:220px!important}.bento__card--about{min-height:218px!important}.bento__card--creds{min-height:200px!important}.bento__card--reward-compact{min-height:188px!important}.bento__card--services{min-height:228px!important}
    .bento__desc{font-size:11px!important;line-height:1.45!important}.bento__card--projects .bento__reel{left:53%!important}.bento__card--services .bento__offers{height:82px!important}.bento__card--ai .bento__chips{height:76px!important;bottom:16px!important}
  }
  .shell,.shell__panel,.home,.home__topbar,.home__glass,.bento,.clone-page,.clone-grid,.clone-card{min-width:0;max-width:100%}.clone-card,.pet-card,.pet-profile-card,.pet-booking-card{overflow-wrap:anywhere}img,svg{max-width:100%}
  .bento__booking-shot.is-placeholder{display:flex;align-items:center;justify-content:center;padding:10px;text-align:center;background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(236,241,250,.92));color:var(--ink);font-weight:700}
  `;
  document.head.appendChild(style);

  const railCopy=document.querySelector('.rail__copy');
  if(railCopy) railCopy.textContent='Private pet care workspace';
  const placeholder=document.querySelector('.bento__booking-shot.is-placeholder');
  if(placeholder) placeholder.textContent='Full Grooming · Sep 18';

  // Direct SPA routes initially receive index.html. Hide only the main panel until
  // app.js replaces the dashboard markup, avoiding a visible wrong-page flash.
  if(location.pathname!=='/'){
    const main=document.querySelector('#main-content');
    if(main){
      main.style.visibility='hidden';
      let released=false;
      const release=()=>{if(released)return;released=true;main.style.visibility='';observer.disconnect();};
      const observer=new MutationObserver(()=>release());
      observer.observe(main,{childList:true,subtree:false});
      setTimeout(release,1800);
    }
  }
}

function isDarkTheme(){
  return document.documentElement.dataset.theme === 'dark';
}

function motionDisabled(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-reduce-motion');
}

function coarsePointer(){
  return 'ontouchstart' in window ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
    navigator.maxTouchPoints > 0;
}

function mountBrewedOpsBackground(){
  const host = document.querySelector('.hero-canvas');
  if(!host || coarsePointer()) return;

  // Remove the old approximation canvas if an earlier build left it in the markup.
  host.querySelectorAll('canvas').forEach(node => node.remove());

  const scene = new Scene();
  const camera = new OrthographicCamera(-1,1,1,-1,0,10);
  camera.position.z = 1;

  const renderer = new WebGLRenderer({antialias:false});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  renderer.domElement.dataset.engine = 'three.js-r183-brewedops-herocanvas';
  renderer.domElement.setAttribute('aria-hidden','true');
  host.appendChild(renderer.domElement);

  const mouse = new Vector2(0,0);
  const darkMix = {value:isDarkTheme()?1:0};
  let darkTarget = darkMix.value;
  renderer.setClearColor(darkMix.value ? 461588 : 16053485, 1);

  const onThemeChange = () => {
    const dark = isDarkTheme();
    darkTarget = dark ? 1 : 0;
    renderer.setClearColor(dark ? 461588 : 16053485, 1);
  };
  window.addEventListener('themechange', onThemeChange);

  const geometry = new PlaneGeometry(2,2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms:{
      uTime:{value:0},
      uMouse:{value:mouse},
      uMousePace:{value:0},
      uAspect:{value:window.innerWidth/window.innerHeight},
      uDarkMix:darkMix
    }
  });
  scene.add(new Mesh(geometry,material));

  let mouseTarget = {x:0,y:0};
  let mouseSmooth = {x:0,y:0};
  const onMouseMove = event => {
    mouseTarget.x = event.clientX/window.innerWidth*2-1;
    mouseTarget.y = -(event.clientY/window.innerHeight)*2+1;
  };
  window.addEventListener('mousemove', onMouseMove);

  const onResize = () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    material.uniforms.uAspect.value = window.innerWidth/window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  let visible = document.visibilityState !== 'hidden';
  let raf = 0;
  const onVisibilityChange = () => {
    const nextVisible = document.visibilityState !== 'hidden';
    if(nextVisible && !visible){
      visible = true;
      raf = requestAnimationFrame(frame);
    }else{
      visible = nextVisible;
    }
  };
  document.addEventListener('visibilitychange',onVisibilityChange);

  let time = 0;
  let previousFrame = performance.now();
  const frameInterval = 1000/30;
  const timeSpeed = 0.09;
  let previousX = 0;
  let previousY = 0;
  let mousePace = 0;

  function frame(now=performance.now()){
    if(!visible || motionDisabled()){
      if(visible) raf=requestAnimationFrame(frame);
      return;
    }

    raf=requestAnimationFrame(frame);
    if(now-previousFrame < frameInterval-1) return;

    const dt = Math.min(0.05,(now-previousFrame)/1000);
    previousFrame = now;
    time += timeSpeed*dt;

    const mouseEase = 1-Math.exp(-4*dt);
    mouseSmooth.x += (mouseTarget.x-mouseSmooth.x)*mouseEase;
    mouseSmooth.y += (mouseTarget.y-mouseSmooth.y)*mouseEase;
    mouse.set(mouseSmooth.x,mouseSmooth.y);

    const vx=(mouseSmooth.x-previousX)/Math.max(dt,0.001);
    const vy=(mouseSmooth.y-previousY)/Math.max(dt,0.001);
    const targetPace=Math.min(1,Math.sqrt(vx*vx+vy*vy)*0.4);
    const paceEase=1-Math.exp(-8*dt);
    mousePace += (targetPace-mousePace)*paceEase;
    previousX=mouseSmooth.x;
    previousY=mouseSmooth.y;

    const themeEase=1-Math.exp(-7*dt);
    darkMix.value += (darkTarget-darkMix.value)*themeEase;

    material.uniforms.uTime.value=time;
    material.uniforms.uMousePace.value=mousePace;
    renderer.render(scene,camera);
  }

  // Render immediately, then continue using the exact 30fps throttled loop.
  if(!motionDisabled()) frame();
  else renderer.render(scene,camera);

  // Keep the accessibility Reduce Motion control synchronized with the renderer.
  const observer = new MutationObserver(() => {
    if(!motionDisabled() && !raf) raf=requestAnimationFrame(frame);
  });
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});

  window.__tfaBrewedOpsBackground = {
    renderer, scene, camera, material,
    destroy(){
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange',onVisibilityChange);
      window.removeEventListener('mousemove',onMouseMove);
      window.removeEventListener('themechange',onThemeChange);
      window.removeEventListener('resize',onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}

applyProductionVisualQA();

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded',mountBrewedOpsBackground,{once:true});
}else{
  mountBrewedOpsBackground();
}
