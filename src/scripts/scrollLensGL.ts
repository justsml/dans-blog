// Chroma-wave lens over the page background: a few liquid ribbons that show the blurred hero image through
// them, refracted and split into colour fringes (theme colours where there is no hero). It drifts for a moment
// on arrival, settles into a near-still drift, and speeds up while the reader scrolls, following the scroll
// velocity. Hovering an article card previews that card's image, which the post's own hero then takes over
// from across the page transition. Colour changes cross-fade in OKLCH.
// Rendered at a third of CSS resolution: the ribbons are soft, so bilinear upscaling costs nothing visible.

type RGB = [number, number, number];
type Layer = { texture: WebGLTexture | null; aspect: number };

const SCALE = 0.34;
const MAX_WIDTH = 720;
const INTRO_SPEED = 0.5;
const INTRO_DECAY_MS = 1400;
const SETTLE_MS = 4500;
const IDLE_SPEED = 0.03;
// The idle drift is too slow to need 60fps; ~11fps keeps it smooth for a fraction of the work.
const IDLE_FRAME_MS = 90;
const FADE_MS = 1400;
const CARDS = "a.article-card, a.footer-article-card";
const CARD_IMAGE = ".article-card__media img, .footer-article-card__media img";
const PREVIEW_DELAY_MS = 120;
const TEXTURE_WIDTH = 48;

const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

// OKLab matrices from Björn Ottosson's reference, written column-major for GLSL.
const FRAGMENT = `precision mediump float;
uniform vec2 uRes,uFitA,uFitB;uniform float uTime,uStrength,uPeak,uMix;uniform sampler2D uImgA,uImgB;
const mat3 RGB2LMS=mat3(.4122,.2119,.0883,.5363,.6807,.2817,.0514,.1074,.63);
const mat3 LMS2LAB=mat3(.2105,1.978,.0259,.7936,-2.4286,.7828,-.0041,.4506,-.8087);
const mat3 LAB2LMS=mat3(1.,1.,1.,.3963,-.1056,-.0895,.2158,-.0639,-1.2915);
const mat3 LMS2RGB=mat3(4.0767,-1.2684,-.0042,-3.3077,2.6098,-.7034,.231,-.3413,1.7076);
vec3 toLch(vec3 c){
  vec3 lab=LMS2LAB*pow(max(RGB2LMS*pow(c,vec3(2.2)),0.),vec3(1./3.));
  return vec3(lab.x,length(lab.yz),atan(lab.z,lab.y));
}
vec3 fromLch(vec3 c){
  vec3 lms=LAB2LMS*vec3(c.x,c.y*cos(c.z),c.y*sin(c.z));
  return pow(max(LMS2RGB*(lms*lms*lms),0.),vec3(1./2.2));
}
// Hue takes the short way round; a near-grey end borrows the other end's hue instead of swinging through it.
vec3 mixLch(vec3 a,vec3 b,float t){
  a=toLch(a);b=toLch(b);
  if(a.y<.02)a.z=b.z;
  if(b.y<.02)b.z=a.z;
  float dh=mod(b.z-a.z+3.14159,6.28318)-3.14159;
  return fromLch(vec3(mix(a.xy,b.xy,t),a.z+dh*t));
}
float ribbon(vec2 p,float i,float t){
  float k=1.+i*.35;
  float y=.16*sin(p.x*1.6*k+t*(.5+.12*i)+i*2.1)+.07*sin(p.x*3.7-t*.8+i*4.3)+(i-1.5)*.21+.04;
  float d=p.y-y;
  return exp(-d*d*1400.)*.9+exp(-d*d*60.)*.14;
}
// The same cover crop as .post-ambient, bent along the ribbon, each channel bent a little differently.
vec3 lens(sampler2D img,vec2 fit,vec2 uv,vec2 o){
  vec2 tc=vec2(.5,.65)+(uv-.5)*fit;
  return vec3(texture2D(img,tc+o*1.3).r,texture2D(img,tc+o).g,texture2D(img,tc+o*.7).b);
}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  p.x+=.05*sin(p.y*3.+uTime*.3);
  vec3 m=vec3(0.);
  for(int n=0;n<4;n++){
    float i=float(n);
    m+=vec3(ribbon(p+vec2(0.,.006),i,uTime),ribbon(p,i,uTime),ribbon(p-vec2(0.,.006),i,uTime));
  }
  vec2 uv=gl_FragCoord.xy/uRes,o=vec2(.01,.05)*m.g;
  vec3 img=lens(uImgB,uFitB,uv,o);
  if(uMix<1.)img=mixLch(lens(uImgA,uFitA,uv,o),img,uMix);
  // Lifted so the hero's dark tones still glow.
  img=img/max(max(img.r,img.g),max(img.b,.08))*uPeak;
  vec3 col=min((img*m.g+max(m-m.g,0.)*.7)*uStrength,1.);
  gl_FragColor=vec4(col,max(col.r,max(col.g,col.b)));
}`;

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const hex = (value: string, fallback: RGB): RGB => {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(value.trim());
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : fallback;
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const decoded = (src: string) => {
  const image = new Image();
  image.src = src;
  return image.decode().then(() => image, () => null);
};

// The post's tiny ambient hero, or null where there is none.
function heroImage() {
  const ambient = document.querySelector<HTMLElement>(".post-ambient");
  const src = /url\(["']?([^"')]+)/.exec(ambient?.style.getPropertyValue("--ambient-image") ?? "")?.[1];
  return src ? decoded(src) : Promise.resolve(null);
}

// Card images are full size; shrinking them to the hero's 48px gives the same blur and a cheap upload.
const shrink = document.createElement("canvas").getContext("2d");
function blurred(image: HTMLImageElement): TexImageSource {
  if (!shrink || image.naturalWidth <= TEXTURE_WIDTH) return image;
  shrink.canvas.width = TEXTURE_WIDTH;
  shrink.canvas.height = Math.max(1, Math.round((TEXTURE_WIDTH * image.naturalHeight) / image.naturalWidth));
  shrink.drawImage(image, 0, 0, shrink.canvas.width, shrink.canvas.height);
  return shrink.canvas;
}

// Software GL (no GPU, VMs, headless) renders this at a few frames per second while blocking the page; skip it.
function isSoftware(gl: WebGLRenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  return /swiftshader|llvmpipe|softpipe|software/i.test(renderer);
}

// Links off the main thread where the driver allows it, polling instead of stalling on the link status.
async function compile(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
    const shader = gl.createShader(type);
    if (!shader || !program) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  if (!program) return null;
  gl.bindAttribLocation(program, 0, "p");
  gl.linkProgram(program);
  const parallel = gl.getExtension("KHR_parallel_shader_compile");
  if (parallel) {
    while (!gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  // One oversized triangle covers the viewport without a diagonal seam.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  const at = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1i(at("uImgA"), 0);
  gl.uniform1i(at("uImgB"), 1);
  return {
    res: at("uRes"), fitA: at("uFitA"), fitB: at("uFitB"), time: at("uTime"),
    strength: at("uStrength"), peak: at("uPeak"), mix: at("uMix"),
  };
}

function createTexture(gl: WebGLRenderingContext) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  for (const [key, value] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) {
    gl.texParameteri(gl.TEXTURE_2D, key, value);
  }
  return texture;
}

let started = false;

export async function start() {
  if (started) return;
  started = true;

  const canvas = document.createElement("canvas");
  canvas.className = "scroll-lens";
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", {
    alpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true,
  });
  if (!gl || isSoftware(gl)) return;
  const u = await compile(gl);
  if (!u) return;

  // `from` is what was showing, `to` is what is arriving; the shader blends them by uMix.
  let from: Layer = { texture: createTexture(gl), aspect: 1 };
  let to: Layer = { texture: createTexture(gl), aspect: 1 };
  let fadeStart = -Infinity;
  let painted = false;
  let paintId = 0;
  let previewing: Element | null = null;
  let previewTimer = 0;

  let time = Math.random() * 40;
  let introStart = performance.now();
  let scrollSpeed = 0;
  let lastY = scrollY;
  let lastFrame = 0;
  let raf = 0;
  let idleTimer = 0;

  const fadeProgress = (now: number) => (reducedMotion.matches ? 1 : Math.min(1, (now - fadeStart) / FADE_MS));

  const draw = (now = performance.now()) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(u.time, time);
    gl.uniform1f(u.mix, easeInOut(fadeProgress(now)));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // Fraction of each image a cover-fit shows along each axis.
  const fit = () => {
    const viewport = canvas.width / Math.max(canvas.height, 1);
    gl.uniform2f(u.res, canvas.width, canvas.height);
    for (const [location, layer] of [[u.fitA, from], [u.fitB, to]] as const) {
      const ratio = viewport / layer.aspect;
      gl.uniform2f(location, Math.min(1, ratio), Math.min(1, 1 / ratio));
    }
  };

  const resize = () => {
    const width = Math.min(MAX_WIDTH, Math.round(innerWidth * SCALE));
    const height = Math.round((width * innerHeight) / Math.max(innerWidth, 1));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    fit();
    draw();
  };

  // Fade towards `source` (a hero or card image), or the theme colours when it is null.
  const fadeTo = (source: HTMLImageElement | null) => {
    const now = performance.now();
    // A fade interrupted past halfway carries on from where it was heading, otherwise from where it came:
    // either way the jump is under half a fade, and the sweep across a card grid stays calm.
    if (easeInOut(fadeProgress(now)) >= 0.5) [from, to] = [to, from];
    const styles = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.theme === "dark";
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, to.texture);
    if (source) {
      to.aspect = source.naturalWidth / Math.max(source.naturalHeight, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, blurred(source));
    } else {
      to.aspect = 1;
      const accent = hex(styles.getPropertyValue("--paper-accent"), [0.59, 0.29, 0.18]);
      const blue = hex(styles.getPropertyValue("--paper-blue"), [0.19, 0.31, 0.36]);
      const bytes = [...accent, ...blue, ...blue, ...accent].map((c) => Math.round(c * 255));
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 2, 2, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array(bytes));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, from.texture);
    fit();
    gl.uniform1f(u.peak, dark ? 0.9 : 0.75);
    gl.uniform1f(u.strength, dark ? 0.42 : 0.34);
    // The first paint has nothing to fade from; the canvas's own opacity fade covers it.
    fadeStart = painted ? now : -Infinity;
    painted = true;
    draw(now);
    wake();
  };

  // The page's own colours. Later calls win, so a slow decode never overwrites a newer preview.
  const paint = async () => {
    const id = ++paintId;
    const image = await heroImage();
    if (id === paintId && !previewing) fadeTo(image);
  };

  const preview = (card: Element | null) => {
    if (card === previewing) return;
    previewing = card;
    clearTimeout(previewTimer);
    // A short delay keeps a pointer passing over the grid from flickering through every card.
    previewTimer = window.setTimeout(async () => {
      if (!card) return void paint();
      const src = card.querySelector<HTMLImageElement>(CARD_IMAGE)?.currentSrc;
      const image = src ? await decoded(src) : null;
      if (previewing === card && image) fadeTo(image);
    }, PREVIEW_DELAY_MS);
  };

  const frame = (now: number) => {
    raf = 0;
    const dt = Math.min(0.25, (now - lastFrame) / 1000);
    lastFrame = now;
    const velocity = (scrollY - lastY) / Math.max(dt, 0.001);
    lastY = scrollY;
    const target = Math.max(-3, Math.min(3, velocity / 1600));
    // Pick up quickly when the reader scrolls, coast down slowly when they stop.
    const tau = Math.abs(target) > Math.abs(scrollSpeed) ? 0.15 : 0.6;
    scrollSpeed += (target - scrollSpeed) * (1 - Math.exp(-dt / tau));
    const elapsed = now - introStart;
    const speed = IDLE_SPEED + INTRO_SPEED * Math.exp(-elapsed / INTRO_DECAY_MS) + scrollSpeed;
    time += dt * speed;
    draw(now);
    const idle = Math.abs(speed - IDLE_SPEED) < 0.005 && elapsed > SETTLE_MS && fadeProgress(now) >= 1;
    if (idle) idleTimer = window.setTimeout(() => { idleTimer = 0; raf = requestAnimationFrame(frame); }, IDLE_FRAME_MS);
    else raf = requestAnimationFrame(frame);
  };

  const sleep = () => {
    cancelAnimationFrame(raf);
    clearTimeout(idleTimer);
    raf = idleTimer = 0;
  };

  // Full frame rate from the next frame, cutting short any idle wait.
  const wake = () => {
    if (raf || document.hidden) return;
    if (reducedMotion.matches) return void draw();
    if (!idleTimer) lastFrame = performance.now() - 16;
    clearTimeout(idleTimer);
    idleTimer = 0;
    raf = requestAnimationFrame(frame);
  };

  const attach = () => {
    if (!canvas.isConnected) document.body.append(canvas);
    lastY = scrollY;
    introStart = performance.now();
    previewing = null;
    clearTimeout(previewTimer);
    void paint();
    wake();
  };

  const cardFrom = (target: EventTarget | null) => (target instanceof Element ? target.closest(CARDS) : null);

  canvas.addEventListener("webglcontextlost", () => { sleep(); canvas.remove(); });
  addEventListener("scroll", wake, { passive: true });
  addEventListener("resize", () => requestAnimationFrame(resize), { passive: true });
  document.addEventListener("pointerover", (event) => { if (event.pointerType !== "touch") preview(cardFrom(event.target)); });
  document.addEventListener("pointerout", (event) => { if (!cardFrom(event.relatedTarget)) preview(null); });
  document.addEventListener("focusin", (event) => preview(cardFrom(event.target)));
  document.addEventListener("visibilitychange", () => (document.hidden ? sleep() : wake()));
  reducedMotion.addEventListener("change", () => (reducedMotion.matches ? (sleep(), draw()) : wake()));
  // ClientRouter replaces <body> on navigation; carry the canvas (and its GL context) across. A previewed
  // card's image is still showing, so the post's hero arrives as a near-invisible cross-fade.
  document.addEventListener("astro:after-swap", attach);
  new MutationObserver(() => void paint()).observe(document.documentElement, { attributeFilter: ["data-theme"] });

  resize();
  attach();
  requestAnimationFrame(() => canvas.classList.add("is-ready"));
}
