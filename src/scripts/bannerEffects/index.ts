// Export all banner effects
import { BaseBannerEffect, BannerEffectOptions } from './BaseBannerEffect';
import { PixelatedBannerEffect } from './PixelatedBannerEffect';
import { ScanlineBannerEffect } from './ScanlineBannerEffect';
import { RippleBannerEffect } from './RippleBannerEffect';
import { GlitchBannerEffect } from './GlitchBannerEffect';
import { GradientWipeBannerEffect } from './GradientWipeBannerEffect';

export { BaseBannerEffect };
export type { BannerEffectOptions };

export { PixelatedBannerEffect };
export { ScanlineBannerEffect };
export { RippleBannerEffect };
export { GlitchBannerEffect };
export { GradientWipeBannerEffect };

// Effect type for easy selection
export type BannerEffectType =
    | 'pixelated'
    | 'scanline'
    | 'ripple'
    | 'glitch'
    | 'gradient'
    | 'liquid'; // Keep original as option

// Factory function to create effects
export function createBannerEffect(
    type: BannerEffectType,
    image: HTMLImageElement,
    options: BannerEffectOptions = {}
): BaseBannerEffect | null {
    const canvas = document.createElement('canvas');
    // Optimize context creation
    const gl = canvas.getContext('webgl', {
        alpha: true,
        depth: false, // No depth buffer needed for 2D quad (saves memory)
        stencil: false, // No stencil buffer needed (saves memory)
        antialias: false, // Pixelated effects don't need AA (saves perf)
        powerPreference: 'default'
    });

    if (!gl) {
        console.error('WebGL not supported');
        return null;
    }

    switch (type) {
        case 'pixelated':
            return new PixelatedBannerEffect(image, canvas, gl, options);
        case 'scanline':
            return new ScanlineBannerEffect(image, canvas, gl, options);
        case 'ripple':
            return new RippleBannerEffect(image, canvas, gl, options);
        case 'glitch':
            return new GlitchBannerEffect(image, canvas, gl, options);
        case 'gradient':
            return new GradientWipeBannerEffect(image, canvas, gl, options);
        case 'liquid':
            // Import and use original effect if needed
            return null; // Placeholder
        default:
            console.error(`Unknown effect type: ${type}`);
            return null;
    }
}

// Initialize all banner effects on page
export function initBannerEffects(
    effectType: BannerEffectType = 'pixelated',
    options?: BannerEffectOptions
): void {
    const bannerImages = document.querySelectorAll<HTMLImageElement>('.banner-image');

    bannerImages.forEach((img) => {
        if (img.dataset.webglInitialized) return;
        img.dataset.webglInitialized = 'true';

        if (img.complete) {
            createBannerEffect(effectType, img, options);
        } else {
            img.addEventListener('load', () => {
                createBannerEffect(effectType, img, options);
            });
        }
    });
}
