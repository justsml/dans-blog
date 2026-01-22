# WebGL Banner Effect Documentation

## Overview

A stunning, modern WebGL-powered effect for blog post banner images featuring:

- **Liquid Distortion**: Smooth, flowing wave-like distortion effect
- **Scroll-Based Animation**: Responds to user scroll position
- **Reveal Animation**: Beautiful top-to-bottom reveal with edge glow
- **Chromatic Aberration**: RGB split effect for high-tech aesthetic
- **Fractal Noise**: Complex, organic-looking distortion patterns

## Features

### Visual Effects
1. **Liquid Distortion** - Combines sine waves and fractal noise for organic movement
2. **Chromatic Aberration** - RGB color split that responds to scroll
3. **Edge Glow** - Cyan glow effect during the reveal animation
4. **Dynamic Intensity** - Effects adjust based on reveal progress
5. **Subtle Vignette** - Focuses attention on the center

### Performance Optimizations
- Hardware-accelerated rendering via WebGL
- Intersection Observer for visibility detection
- Automatic cleanup when off-screen
- Responsive to device pixel ratio
- Respects `prefers-reduced-motion`

### Accessibility
- Falls back to original image if WebGL not supported
- Respects reduced motion preferences
- Maintains original image for screen readers
- Print-friendly (shows original image)

## Technical Details

### Shader Implementation
The effect uses GLSL shaders running on the GPU:

- **Vertex Shader**: Simple pass-through for texture coordinates
- **Fragment Shader**: Complex pixel manipulation including:
  - Fractal noise generation (4 octaves)
  - Multi-wave distortion
  - Chromatic aberration
  - Edge glow calculation
  - Reveal mask with wave offset

### Configuration Options

```typescript
{
  distortionStrength: 0.15,    // Intensity of liquid distortion (0-1)
  revealDuration: 2000,         // Duration of reveal animation in ms
  scrollSensitivity: 0.5,       // How much scroll affects the animation (0-1)
  enableParticles: true         // Future feature flag
}
```

### Browser Support
- Modern browsers with WebGL support
- Graceful fallback for older browsers
- Mobile-optimized performance settings

## Usage

The effect is automatically applied to any element with the `.banner-image` class.

### Customizing Effects

Modify the configuration in [`Post.astro`](../layouts/Post.astro:277):

```typescript
initBannerWebGLEffects({
  distortionStrength: 0.2,      // Increase for more distortion
  revealDuration: 3000,          // Slower reveal
  scrollSensitivity: 0.8,        // More scroll response
});
```

### Disabling for Specific Posts

Remove the `.banner-image` class from images where you don't want the effect:

```astro
<Image
  class="full-width flow u-photo"  <!-- Removed banner-image class -->
  src={cover_full_width}
  alt={title}
/>
```

## Files

1. **[`bannerWebGLEffect.ts`](./bannerWebGLEffect.ts)** - Main WebGL implementation
2. **[`Post.astro`](../layouts/Post.astro)** - Integration and styles
3. **[`banner-webgl.css`](../styles/banner-webgl.css)** - Standalone CSS (optional)

## Performance Considerations

- Effects only run when images are visible (Intersection Observer)
- Animation stops when scrolled out of view
- Optimized shader code for mobile devices
- Automatic canvas resolution adjustment based on device pixel ratio

## Troubleshooting

### Effect Not Appearing
1. Check browser console for WebGL errors
2. Verify the image has the `.banner-image` class
3. Ensure WebGL is enabled in browser settings

### Performance Issues
1. Reduce `distortionStrength` value
2. Decrease canvas resolution (modify devicePixelRatio multiplier)
3. Check if other WebGL content is competing for GPU resources

### Visual Glitches
1. Clear browser cache
2. Update graphics drivers
3. Try disabling browser extensions that modify page rendering

## Future Enhancements

Potential additions:
- Particle system overlay
- Mouse interaction effects
- Different distortion modes (plasma, ripple, etc.)
- Custom color grading
- Performance monitoring and auto-adjustment

## Credits

Created using WebGL and GLSL shaders, inspired by modern web design trends and high-tech visual effects.
