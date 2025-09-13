import { useEffect, useState } from 'react';

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
  const [posthog, setPosthog] = useState<any>(null);

  useEffect(() => {
    if (isLoaded || !apiKey) return;

    let interactionOccurred = false;

    const loadAnalytics = async () => {
      if (interactionOccurred) return;
      interactionOccurred = true;

      try {
        // Dynamic import reduces initial bundle size
        const { default: posthogLib } = await import('posthog-js/dist/module.no-external');
        
        // Initialize PostHog
        posthogLib.init(apiKey, {
          api_host: host || 'https://app.posthog.com',
          // Defer heavy features
          disable_session_recording: true,
          disable_web_vitals: true,
          disable_exception_autocapture: true,
          // Enable basic tracking
          capture_pageview: true,
          capture_pageleave: true
        });

        // Load additional features after a delay
        setTimeout(async () => {
          try {
            await Promise.all([
              import('posthog-js/dist/exception-autocapture'),
              import('posthog-js/dist/web-vitals')
            ]);
            
            // Enable features that were deferred
            posthogLib.opt_in_capturing();
          } catch (error) {
            console.warn('Failed to load additional PostHog features:', error);
          }
        }, 2000);

        // Load session recording even later (heavy feature)
        setTimeout(async () => {
          try {
            await import('posthog-js/dist/recorder');
            posthogLib.startSessionRecording();
          } catch (error) {
            console.warn('Failed to load PostHog session recording:', error);
          }
        }, 5000);

        setPosthog(posthogLib);
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