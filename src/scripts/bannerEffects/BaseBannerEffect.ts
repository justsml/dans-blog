// Base class for all banner effects
export interface BannerEffectOptions {
    distortionStrength?: number;
    scrollSensitivity?: number;
}

export abstract class BaseBannerEffect {
    protected canvas: HTMLCanvasElement;
    protected gl: WebGLRenderingContext;
    protected image: HTMLImageElement;
    protected program!: WebGLProgram;
    protected texture!: WebGLTexture;
    protected animationFrame: number | null = null;

    protected startTime: number;
    protected scrollProgress = 0;
    protected targetScrollProgress = 0;
    protected lastScrollY = 0;
    protected scrollVelocity = 0;
    protected mouseVelocity = 0;
    protected targetMouseVelocity = 0;
    protected lastMousePos = { x: 0, y: 0 };
    protected prefersReducedMotion = false;
    protected isVisible = false;
    protected options: Required<BannerEffectOptions>;
    protected resizeObserver?: ResizeObserver;

    protected uniforms: Record<string, WebGLUniformLocation | null> = {};

    constructor(
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        gl: WebGLRenderingContext,
        options: BannerEffectOptions = {}
    ) {
        this.image = image;
        this.canvas = canvas;
        this.gl = gl;
        this.startTime = Date.now();

        this.options = {
            distortionStrength: options.distortionStrength ?? 1.0,
            scrollSensitivity: options.scrollSensitivity ?? 1.0,
        };

        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    protected init(): void {
        this.setupCanvas();
        this.createShaderProgram();
        this.setupGeometry();
        this.loadTexture();
        this.setupScrollListener();
        this.setupMouseListener();
        this.setupVisibilityObserver();
        this.insertCanvas();
        this.resize();

        this.scrollProgress = this.targetScrollProgress;
    }

    protected setupCanvas(): void {
        this.canvas.className = 'banner-webgl-canvas';
        this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;
    }

    protected abstract getVertexShader(): string;
    protected abstract getFragmentShader(): string;

    protected createShaderProgram(): void {
        const vertexShader = this.compileShader(this.getVertexShader(), this.gl.VERTEX_SHADER);
        const fragmentShader = this.compileShader(this.getFragmentShader(), this.gl.FRAGMENT_SHADER);

        this.program = this.gl.createProgram()!;
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Shader program linking failed:', this.gl.getProgramInfoLog(this.program));
        }

        this.gl.useProgram(this.program);
        this.getUniformLocations();
    }

    protected abstract getUniformLocations(): void;

    protected compileShader(source: string, type: number): WebGLShader {
        const shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation failed:', this.gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    protected setupGeometry(): void {
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        const texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);

        const texCoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
        this.gl.enableVertexAttribArray(texCoordLocation);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    protected loadTexture(): void {
        this.texture = this.gl.createTexture()!;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.image
        );
    }

    protected setupScrollListener(): void {
        const updateScroll = () => {
            const rect = this.canvas.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const viewportHeight = window.innerHeight;

            const elementHeight = rect.height;
            const elementTop = rect.top;

            const progress = 1 - (elementTop + elementHeight) / (viewportHeight + elementHeight);
            this.targetScrollProgress = Math.max(0, Math.min(1, progress * this.options.scrollSensitivity));

            const velocity = Math.abs(scrollY - this.lastScrollY) / 50;
            this.lastScrollY = scrollY;

            this.scrollVelocity += velocity;
        };

        window.addEventListener('scroll', updateScroll, { passive: true });
        updateScroll();
    }

    protected setupMouseListener(): void {
        const updateMouse = (e: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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

    protected setupVisibilityObserver(): void {
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

    protected insertCanvas(): void {
        const parent = this.image.parentElement;
        if (!parent) return;

        this.image.style.opacity = '0';
        this.image.style.position = 'absolute';
        this.image.style.pointerEvents = 'none';

        parent.insertBefore(this.canvas, this.image);

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(parent);
    }

    protected resize(): void {
        const parent = this.image.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    protected startAnimation(): void {
        if (this.animationFrame !== null) return;
        this.animate();
    }

    protected stopAnimation(): void {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    protected abstract animate(): void;

    public destroy(): void {
        this.stopAnimation();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}
