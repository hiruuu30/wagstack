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

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded',mountBrewedOpsBackground,{once:true});
}else{
  mountBrewedOpsBackground();
}
