import { BaseBannerEffect, BannerEffectOptions } from './BaseBannerEffect';

export class GradientWipeBannerEffect extends BaseBannerEffect {
    constructor(
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        gl: WebGLRenderingContext,
        options: BannerEffectOptions = {}
    ) {
        super(image, canvas, gl, options);
    }

    protected getVertexShader(): string {
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

    protected getFragmentShader(): string {
        return `
      precision mediump float;
      
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_scrollProgress;
      uniform float u_mouseVelocity;
      uniform float u_imageRatio;
      uniform float u_opacity;
      uniform float u_distortionStrength;
      
      varying vec2 v_texCoord;
      
      void main() {
        float canvasRatio = u_resolution.x / u_resolution.y;
        vec2 uv = v_texCoord;
        
        // Aspect-correct mapping with subtle parallax
        if (u_imageRatio > canvasRatio) {
            float scale = canvasRatio / u_imageRatio;
            uv.x = (uv.x - 0.5) * scale + 0.5;
            // Subtle horizontal parallax
            uv.x += (u_scrollProgress - 0.5) * 0.02;
        } else {
            float scale = u_imageRatio / canvasRatio;
            uv.y = (uv.y - 0.5) * scale + 0.5;
            float panFactor = (1.0 - scale) * (u_scrollProgress - 0.5);
            uv.y += panFactor;
        }
        
        vec3 color = texture2D(u_texture, uv).rgb;
        
        // Gradient wipe effect - diagonal reveal
        float wipeProgress = u_scrollProgress * 1.5 - 0.25;
        float wipePos = v_texCoord.x * 0.7 + v_texCoord.y * 0.3;
        float wipe = smoothstep(wipePos - 0.1, wipePos + 0.1, wipeProgress);
        
        // Subtle color tint at wipe edge
        float edgeDist = abs(wipePos - wipeProgress);
        float edgeGlow = smoothstep(0.15, 0.0, edgeDist);
        vec3 tintColor = vec3(1.0, 0.0, 0.6); // Neon pink
        color = mix(color, color * (1.0 + tintColor * 0.3 * u_distortionStrength), edgeGlow * wipe);
        
        // Apply wipe
        color *= wipe;
        
        gl_FragColor = vec4(color, u_opacity * wipe);
      }
    `;
    }

    protected getUniformLocations(): void {
        this.uniforms = {
            resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            texture: this.gl.getUniformLocation(this.program, 'u_texture'),
            scrollProgress: this.gl.getUniformLocation(this.program, 'u_scrollProgress'),
            mouseVelocity: this.gl.getUniformLocation(this.program, 'u_mouseVelocity'),
            imageRatio: this.gl.getUniformLocation(this.program, 'u_imageRatio'),
            opacity: this.gl.getUniformLocation(this.program, 'u_opacity'),
            distortionStrength: this.gl.getUniformLocation(this.program, 'u_distortionStrength'),
        };
    }

    protected animate = (): void => {
        if (!this.isVisible) return;

        const currentTime = Date.now() - this.startTime;

        this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.1;

        if (this.prefersReducedMotion) {
            this.scrollVelocity = 0;
            this.mouseVelocity = 0;
        } else {
            this.scrollVelocity *= 0.92;
            if (this.scrollVelocity < 0.001) this.scrollVelocity = 0;

            this.mouseVelocity += (this.targetMouseVelocity - this.mouseVelocity) * 0.08;
            this.targetMouseVelocity *= 0.9;
        }

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        const revealOpacity = this.prefersReducedMotion ? 1.0 : Math.min(1.0, currentTime / 800);

        if (this.uniforms.resolution) {
            this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        }
        if (this.uniforms.scrollProgress) {
            this.gl.uniform1f(this.uniforms.scrollProgress, this.scrollProgress);
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
        if (this.uniforms.distortionStrength) {
            this.gl.uniform1f(this.uniforms.distortionStrength, this.options.distortionStrength);
        }

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.animationFrame = requestAnimationFrame(this.animate);
    };
}
