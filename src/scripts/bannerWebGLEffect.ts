/**
 * WebGL Banner Effect - Liquid Distortion with Scroll Reveal
 * Creates a stunning high-tech effect for blog post banner images
 */

interface BannerEffectOptions {
  distortionStrength?: number;
  revealDuration?: number;
  scrollSensitivity?: number;
  enableParticles?: boolean;
}

class BannerWebGLEffect {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private image: HTMLImageElement;
  private texture: WebGLTexture | null = null;
  private animationFrame: number | null = null;
  private startTime: number;
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private lastScrollY = 0;
  private scrollVelocity = 0;
  private mouseVelocity = 0;
  private targetMouseVelocity = 0;
  private lastMousePos = { x: 0, y: 0 };
  private prefersReducedMotion = false;
  private isVisible = false;
  private options: Required<BannerEffectOptions>;
  private resizeObserver?: ResizeObserver;

  // Uniform locations
  private uniforms: {
    time?: WebGLUniformLocation | null;
    resolution?: WebGLUniformLocation | null;
    texture?: WebGLUniformLocation | null;
    scrollProgress?: WebGLUniformLocation | null;
    distortionStrength?: WebGLUniformLocation | null;
    scrollVelocity?: WebGLUniformLocation | null;
    mouseVelocity?: WebGLUniformLocation | null;
    imageRatio?: WebGLUniformLocation | null;
    opacity?: WebGLUniformLocation | null;
  } = {};

  constructor(
    image: HTMLImageElement,
    options: BannerEffectOptions = {}
  ) {
    this.image = image;
    this.options = {
      distortionStrength: options.distortionStrength ?? 0.15,
      revealDuration: options.revealDuration ?? 2000,
      scrollSensitivity: options.scrollSensitivity ?? 0.5,
      enableParticles: options.enableParticles ?? true,
    };

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'banner-webgl-canvas';

    const gl = this.canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) {
      throw new Error('WebGL not supported');
    }

    this.gl = gl;
    this.startTime = Date.now();

    // Check for reduced motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  private init(): void {
    this.setupCanvas();
    this.createShaderProgram();
    this.setupGeometry();
    this.loadTexture();
    this.setupScrollListener();
    this.setupMouseListener();
    this.setupVisibilityObserver();
    this.insertCanvas();
    this.resize();

    // Set initial scroll progress immediately to prevent jump
    this.scrollProgress = this.targetScrollProgress;
  }

  private setupCanvas(): void {
    const parent = this.image.parentElement;
    if (!parent) return;

    // Match original image dimensions
    const rect = this.image.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  private createShaderProgram(): void {
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      this.getVertexShader()
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      this.getFragmentShader()
    );

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create shaders');
    }

    this.program = this.gl.createProgram();
    if (!this.program) {
      throw new Error('Failed to create program');
    }

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(this.program));
      throw new Error('Failed to link program');
    }

    this.gl.useProgram(this.program);

    // Get uniform locations
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, 'u_time'),
      resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
      texture: this.gl.getUniformLocation(this.program, 'u_texture'),
      scrollProgress: this.gl.getUniformLocation(this.program, 'u_scrollProgress'),
      distortionStrength: this.gl.getUniformLocation(this.program, 'u_distortionStrength'),
      scrollVelocity: this.gl.getUniformLocation(this.program, 'u_scrollVelocity'),
      mouseVelocity: this.gl.getUniformLocation(this.program, 'u_mouseVelocity'),
      imageRatio: this.gl.getUniformLocation(this.program, 'u_imageRatio'),
      opacity: this.gl.getUniformLocation(this.program, 'u_opacity'),
    };
  }

  private createShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private getVertexShader(): string {
    return `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;
  }

  private getFragmentShader(): string {
    return `
      precision mediump float;
      
      uniform sampler2D u_texture;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_scrollProgress;
      uniform float u_distortionStrength;
      uniform float u_scrollVelocity;
      uniform float u_mouseVelocity;
      uniform float u_imageRatio;
      uniform float u_opacity;
      
      varying vec2 v_texCoord;
      
      // Noise function for fluid movement
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      float fractalNoise(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for(int i = 0; i < 4; i++) {
          value += amplitude * smoothNoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      vec2 liquidDistortion(vec2 uv, float time, float activity) {
        // Toned down intensity Logic
        float intensity = u_distortionStrength * (0.05 + activity * 2.5); 

        float wave1 = sin(uv.x * 6.0 + time * 1.2) * cos(uv.y * 5.0 + time * 1.0);
        float wave2 = cos(uv.x * 5.0 - time * 0.8) * sin(uv.y * 6.0 - time * 0.7);
        
        float noise1 = fractalNoise(uv * 4.0 + vec2(time * 0.2, time * 0.1));
        
        vec2 distortion = vec2(
          (wave1 + noise1 * 0.4) * intensity,
          (wave2 + noise1 * 0.2) * intensity
        );
        
        return uv + distortion * 0.025;
      }
      
      vec3 chromaticAberration(sampler2D tex, vec2 uv, float amount) {
        vec2 offset = vec2(amount * 0.006, amount * 0.001);
        float r = texture2D(tex, uv + offset).r;
        float g = texture2D(tex, uv).g;
        float b = texture2D(tex, uv - offset).b;
        return vec3(r, g, b);
      }
      
      void main() {
        // Calculate the aspect ratio of the canvas (200px high window)
        float canvasRatio = u_resolution.x / u_resolution.y;
        
        // Start with basic UVs
        vec2 uv = v_texCoord;
        
        // --- Aspect-Correct (Cover) Mapping Logic ---
        // We want the image to fill the canvas without stretching.
        // If image is wider than canvas relative to height...
        if (u_imageRatio > canvasRatio) {
            float scale = canvasRatio / u_imageRatio;
            uv.x = (uv.x - 0.5) * scale + 0.5;
        } else {
            // If image is taller (common for banners), we scale Y to cover height.
            // But we have excess height - this is what we pan through!
            float scale = u_imageRatio / canvasRatio;
            uv.y = (uv.y - 0.5) * scale + 0.5;
            
            // Pan: move the "window" through the excess height based on scroll
            // ScrollProgress: 0 (top) to 1 (bottom)
            // Offset shifts the sampled slice.
            float panFactor = (1.0 - scale) * (u_scrollProgress - 0.5);
            uv.y += panFactor;
        }

        float time = u_time * 0.001;
        float activity = u_scrollVelocity + u_mouseVelocity;

        // Apply subtler liquid distortion
        vec2 distortedUV = liquidDistortion(uv, time, activity);
        
        // Aberration scales with velocity (chrome splitting)
        float aberrationAmount = activity * 1.2 + 0.01 * u_distortionStrength; 

        // Sample with distortion and aberration
        vec3 color = chromaticAberration(u_texture, distortedUV, aberrationAmount);
        
        // Simple smoothing near edges
        float vignette = 1.0 - smoothstep(0.45, 0.5, abs(v_texCoord.y - 0.5));
        vignette *= 1.0 - smoothstep(0.48, 0.5, abs(v_texCoord.x - 0.5));
        color *= mix(0.95, 1.0, vignette);
        
        gl_FragColor = vec4(color, u_opacity);
      }
    `;
  }

  private setupGeometry(): void {
    if (!this.program) return;

    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const texCoords = new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      1, 0,
    ]);

    // Position attribute
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

    // Texture coordinate attribute
    const texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);

    const texCoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
    this.gl.enableVertexAttribArray(texCoordLocation);
    this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private loadTexture(): void {
    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    // Upload the image
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.image
    );

    // Set texture parameters
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
  }

  private setupScrollListener(): void {
    const updateScroll = () => {
      const rect = this.canvas.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress (0 when banner enters bottom, 1 when leaves top)
      const elementHeight = rect.height;
      const elementTop = rect.top; // Relative to viewport

      // Normalized position: 0 at bottom, 1 at top
      const progress = 1 - (elementTop + elementHeight) / (viewportHeight + elementHeight);
      this.targetScrollProgress = Math.max(0, Math.min(1, progress));

      // Calculate velocity
      const velocity = Math.abs(scrollY - this.lastScrollY) / 50; // More sensitive
      this.lastScrollY = scrollY;

      // Accumulate velocity impulsively
      this.scrollVelocity += velocity;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }

  private setupMouseListener(): void {
    const updateMouse = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only track if mouse is over or near the canvas
      const padding = 100;
      if (
        x < -padding ||
        x > rect.width + padding ||
        y < -padding ||
        y > rect.height + padding
      ) return;

      const dx = x - this.lastMousePos.x;
      const dy = y - this.lastMousePos.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / 20;

      this.targetMouseVelocity = Math.min(2.0, velocity);
      this.lastMousePos = { x, y };
    };

    window.addEventListener('mousemove', updateMouse, { passive: true });
  }

  private setupVisibilityObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isVisible) {
            this.isVisible = true;
            this.startAnimation();
          } else if (!entry.isIntersecting && this.isVisible) {
            this.isVisible = false;
            this.stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.canvas);
  }

  private insertCanvas(): void {
    const parent = this.image.parentElement;
    if (!parent) return;

    // Hide original image
    this.image.style.opacity = '0';
    this.image.style.position = 'absolute';
    this.image.style.pointerEvents = 'none';

    // Insert canvas
    parent.insertBefore(this.canvas, this.image);

    // Setup resize observer
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(parent);
  }

  private resize(): void {
    const parent = this.image.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private startAnimation(): void {
    if (this.animationFrame !== null) return;
    this.animate();
  }

  private stopAnimation(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private animate = (): void => {
    if (!this.isVisible) return;

    const currentTime = Date.now() - this.startTime;

    // Smooth scroll progress
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.1;

    // Calculate velocities (Zero if reduced motion)
    if (this.prefersReducedMotion) {
      this.scrollVelocity = 0;
      this.mouseVelocity = 0;
    } else {
      // Decay and smooth scroll velocity
      this.scrollVelocity *= 0.92;
      if (this.scrollVelocity < 0.001) this.scrollVelocity = 0;

      // Smooth mouse velocity
      this.mouseVelocity += (this.targetMouseVelocity - this.mouseVelocity) * 0.08;
      this.targetMouseVelocity *= 0.9; // Fast decay for target
    }

    // Clear and render
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Enable blending for transparency
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    // Update uniforms
    const revealOpacity = this.prefersReducedMotion ? 1.0 : Math.min(1.0, currentTime / 800);

    if (this.uniforms.time) {
      this.gl.uniform1f(this.uniforms.time, this.prefersReducedMotion ? 0 : currentTime);
    }
    if (this.uniforms.resolution) {
      this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    }
    if (this.uniforms.scrollProgress) {
      this.gl.uniform1f(this.uniforms.scrollProgress, this.scrollProgress);
    }
    if (this.uniforms.distortionStrength) {
      this.gl.uniform1f(this.uniforms.distortionStrength, this.options.distortionStrength);
    }
    if (this.uniforms.scrollVelocity) {
      this.gl.uniform1f(this.uniforms.scrollVelocity, this.scrollVelocity);
    }
    if (this.uniforms.mouseVelocity) {
      this.gl.uniform1f(this.uniforms.mouseVelocity, this.mouseVelocity);
    }
    if (this.uniforms.imageRatio) {
      this.gl.uniform1f(this.uniforms.imageRatio, this.image.naturalWidth / this.image.naturalHeight);
    }
    if (this.uniforms.opacity) {
      this.gl.uniform1f(this.uniforms.opacity, revealOpacity);
    }

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    this.stopAnimation();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.texture) {
      this.gl.deleteTexture(this.texture);
    }
    if (this.program) {
      this.gl.deleteProgram(this.program);
    }

    this.canvas.remove();
    this.image.style.opacity = '1';
    this.image.style.position = '';
    this.image.style.pointerEvents = '';
  }
}

// Initialize all banner images
export function initBannerWebGLEffects(options?: BannerEffectOptions): void {
  const bannerImages = document.querySelectorAll<HTMLImageElement>('.banner-image');

  bannerImages.forEach((img) => {
    // Prevent double initialization
    if (img.dataset.webglInitialized) return;
    img.dataset.webglInitialized = 'true';

    // Wait for image to load
    if (img.complete) {
      try {
        new BannerWebGLEffect(img, options);
      } catch (error) {
        console.warn('Failed to initialize WebGL effect:', error);
      }
    } else {
      img.addEventListener('load', () => {
        try {
          new BannerWebGLEffect(img, options);
        } catch (error) {
          console.warn('Failed to initialize WebGL effect:', error);
        }
      });
    }
  });
}

