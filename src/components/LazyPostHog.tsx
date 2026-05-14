import { useEffect, useState } from 'react';
import { POSTHOG_CONFIG } from './posthogConfig';

interface LazyPostHogProps {
  apiKey?: string;
  host?: string;
  children?: React.ReactNode;
}

/**
 * Lazy loading wrapper for PostHog analytics
 * Only loads analytics scripts after user interaction
 */
export function LazyPostHog({ apiKey, host, children }: LazyPostHogProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded || !apiKey) return;

    let interactionOccurred = false;

    const loadAnalytics = async () => {
      if (interactionOccurred) return;
      interactionOccurred = true;

      try {
        const { default: posthogLib } = await import('posthog-js/dist/module.no-external');

        posthogLib.init(apiKey, {
          ...POSTHOG_CONFIG,
          api_host: host || POSTHOG_CONFIG.api_host,
        });

        setIsLoaded(true);

        // Make available globally for backward compatibility
        (window as any).posthog = posthogLib;

      } catch (error) {
        console.error('Failed to load PostHog:', error);
      }
    };

    // Load on first user interaction
    const events = ['scroll', 'click', 'keydown', 'touchstart'];
    const handleInteraction = () => {
      loadAnalytics();
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { 
        once: true, 
        passive: true 
      });
    });

    // Fallback: load after 3 seconds if no interaction
    const fallbackTimer = setTimeout(loadAnalytics, 3000);

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [apiKey, host, isLoaded]);

  return (
    <>
      {children}
      {isLoaded && <div style={{ display: 'none' }} data-analytics="loaded" />}
    </>
  );
}

export default LazyPostHog;
